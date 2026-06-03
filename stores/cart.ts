import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { PRODUCTS, type Product } from '~/utils/products'

export interface CartItem {
  id: string
  title: string
  price: number
  selectedSize: string | null
  quantity: number
  graphic: string
}

export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartItem[]>([])
  const cartDrawerOpen = ref(false)
  const mobileSidebarOpen = ref(false)
  
  // Quick View
  const quickViewOpen = ref(false)
  const quickViewProduct = ref<Product | null>(null)
  const quickViewSelectedSize = ref<string | null>(null)

  // Toast
  const toast = ref({
    message: '',
    visible: false
  })

  // Load from localStorage
  const loadCart = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('morecare_cart')
      if (saved) {
        try {
          cart.value = JSON.parse(saved)
        } catch (e) {
          cart.value = []
        }
      }
    }
  }

  const saveCart = () => {
    if (import.meta.client) {
      localStorage.setItem('morecare_cart', JSON.stringify(cart.value))
    }
  }

  const addToCart = (productId: string, qty = 1, size: string | null = null) => {
    const product = PRODUCTS.find(p => p.id === productId)
    if (!product) return

    const selectedSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : null)
    const existingIndex = cart.value.findIndex(item => item.id === productId && item.selectedSize === selectedSize)

    if (existingIndex > -1) {
      cart.value[existingIndex].quantity += qty
    } else {
      cart.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        selectedSize,
        quantity: qty,
        graphic: product.graphic
      })
    }

    saveCart()
    showToast(`Added ${product.title} to cart!`)
    openCart()
  }

  const updateCartQty = (productId: string, size: string | null, delta: number) => {
    const index = cart.value.findIndex(item => item.id === productId && item.selectedSize === size)
    if (index === -1) return

    cart.value[index].quantity += delta

    if (cart.value[index].quantity <= 0) {
      cart.value.splice(index, 1)
    }

    saveCart()
  }

  const removeFromCart = (productId: string, size: string | null) => {
    cart.value = cart.value.filter(item => !(item.id === productId && item.selectedSize === size))
    saveCart()
  }

  // Setters for UI
  const openCart = () => {
    cartDrawerOpen.value = true
  }

  const closeCart = () => {
    cartDrawerOpen.value = false
  }

  const openMobileSidebar = () => {
    mobileSidebarOpen.value = true
  }

  const closeMobileSidebar = () => {
    mobileSidebarOpen.value = false
  }

  const openQuickView = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId)
    if (!product) return
    quickViewProduct.value = product
    quickViewSelectedSize.value = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
    quickViewOpen.value = true
  }

  const closeQuickView = () => {
    quickViewOpen.value = false
    quickViewProduct.value = null
  }

  const showToast = (message: string) => {
    toast.value.message = message
    toast.value.visible = true
    setTimeout(() => {
      toast.value.visible = false
    }, 3000)
  }

  // Getters
  const totalItems = computed(() => cart.value.reduce((acc, item) => acc + item.quantity, 0))
  const subtotal = computed(() => cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0))
  
  const threshold = 4999
  const qualifiesForFreeShipping = computed(() => subtotal.value >= threshold)
  const remainingForFreeShipping = computed(() => threshold - subtotal.value)
  const shippingProgress = computed(() => Math.min((subtotal.value / threshold) * 100, 100))

  return {
    cart,
    cartDrawerOpen,
    mobileSidebarOpen,
    quickViewOpen,
    quickViewProduct,
    quickViewSelectedSize,
    toast,
    loadCart,
    addToCart,
    updateCartQty,
    removeFromCart,
    openCart,
    closeCart,
    openMobileSidebar,
    closeMobileSidebar,
    openQuickView,
    closeQuickView,
    showToast,
    totalItems,
    subtotal,
    qualifiesForFreeShipping,
    remainingForFreeShipping,
    shippingProgress
  }
})
