export interface Product {
  id: string
  title: string
  category: string
  categoryLabel: string
  price: number
  oldPrice: number
  rating: number
  reviews: number
  desc: string
  features: string[]
  sizes: string[]
  graphic: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'MC-W01',
    title: 'Morecare Carbon X Electric Wheelchair',
    category: 'wheelchair',
    categoryLabel: 'Electric Wheelchairs',
    price: 139999,
    oldPrice: 155000,
    rating: 4.9,
    reviews: 124,
    desc: 'Ultra-lightweight aerospace carbon fiber frame. One-click folding, dual brushless motors, smart electromagnetic braking, and intelligent joystick controller with speed dial.',
    features: ['Aviation Grade Carbon Fiber', '14.2 kg Net Weight', '18 km Battery Range', 'Anti-tip Safety Wheels'],
    sizes: ['Standard Seat (18")', 'Wide Seat (20")'],
    graphic: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="40" cy="70" r="18" stroke-width="4" /><circle cx="75" cy="70" r="10" stroke-width="3" /><rect x="25" y="30" width="30" height="25" rx="4" /><path d="M25 45h35M40 70l20-30M30 20h25M75 70l-15-30" stroke-linecap="round"/><circle cx="45" cy="70" r="4" fill="currentColor"/><circle cx="75" cy="70" r="3" fill="currentColor"/></svg>`
  },
  {
    id: 'MC-C01',
    title: 'Morecare Ergo-Air Seat Cushion',
    category: 'cushion',
    categoryLabel: 'Comfort Cushions',
    price: 4999,
    oldPrice: 5999,
    rating: 4.8,
    reviews: 342,
    desc: 'Advanced air-inflatable support featuring 36 interconnected contour cells. Promotes tailbone pressure relief, pelvic alignment, and prevents long-sitting tailbone sores.',
    features: ['Adjustable Inflation Valve', 'Anti-Slip Silica Base', 'Breathable Cool-Mesh Cover', 'Precision Hand Pump Included'],
    sizes: ['Standard (18" x 16")', 'Compact (16" x 16")'],
    graphic: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="20" y="25" width="60" height="50" rx="8" stroke-width="3" /><path d="M30 35h40M30 45h40M30 55h40M30 65h40M50 25v50" stroke-opacity="0.2"/><path d="M80 50h8M88 45v10" stroke-linecap="round"/></svg>`
  },
  {
    id: 'MC-I01',
    title: 'Morecare Cloud-Gel Orthotic Insoles',
    category: 'insoles',
    categoryLabel: 'Foot Wellness',
    price: 1499,
    oldPrice: 1999,
    rating: 4.7,
    reviews: 580,
    desc: 'Physiotherapist-approved dual gel shoe inserts. Features targeted heel shock absorption, reinforced high-arch cradle, and dynamic alignment support for physical activity.',
    features: ['Medical Grade PU Gel', 'Deep Heel Cradle', 'Arch Support Structure', 'Odor-Resistant Fabric'],
    sizes: ['Small (UK 4-6)', 'Medium (UK 7-9)', 'Large (UK 10-12)'],
    graphic: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M45 15c-10 20-5 35-15 50s5 20 20 20c15 0 20-10 20-25S55 35 45 15z" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="70" r="6" stroke-dasharray="2 2" /><path d="M40 50c5 5 15 5 20 0" /></svg>`
  },
  {
    id: 'MC-W02',
    title: 'Morecare Transit Lite Wheelchair',
    category: 'wheelchair',
    categoryLabel: 'Manual Wheelchairs',
    price: 12500,
    oldPrice: 15000,
    rating: 4.6,
    reviews: 98,
    desc: 'Ultra-portable manual attendant wheelchair. Extremely light weight, folds completely flat in seconds. Ideal for travel, doctor visits, and restaurant excursions.',
    features: ['Aerospace Aluminum Alloy', '8.9 kg Total Weight', 'Attendant Loop Brakes', 'Foldable Backrest & Footplates'],
    sizes: ['Standard (17" width)'],
    graphic: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="35" cy="65" r="15" /><circle cx="68" cy="65" r="8" /><path d="M20 25h15M35 25v40M35 45h30M65 45v20M25 45h20" stroke-linecap="round"/><rect x="30" y="42" width="10" height="5" fill="currentColor"/></svg>`
  },
  {
    id: 'MC-C02',
    title: 'Morecare Contoured Cervical Pillow',
    category: 'cushion',
    categoryLabel: 'Comfort Cushions',
    price: 2999,
    oldPrice: 3999,
    rating: 4.8,
    reviews: 215,
    desc: 'Ergonomic neck support pillow molded from premium slow-rebound memory foam. Unique wave shape matches cervical curve to eliminate morning neck and shoulder stiffness.',
    features: ['Premium Density Memory Foam', 'Contoured Neck Cradle', 'Side-Sleeper Flat Zones', 'Washable Bamboo Fiber Cover'],
    sizes: ['Standard (23" x 14")', 'Queen (25" x 15")'],
    graphic: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="15" y="30" width="70" height="40" rx="10" stroke-width="3"/><path d="M15 50q17.5-10 35 0t35 0" stroke-width="2"/></svg>`
  },
  {
    id: 'MC-I02',
    title: 'Morecare Arch-Active Sports Insoles',
    category: 'insoles',
    categoryLabel: 'Foot Wellness',
    price: 1799,
    oldPrice: 2299,
    rating: 4.9,
    reviews: 112,
    desc: 'High-performance running and fitness orthotics. Semi-rigid plastic shell gives structural support while forefoot gel padding maximizes energy rebound.',
    features: ['Vibe-Guard Shock Shell', 'Aerated Forefoot Breathing', 'Heel Pad Cushioning', 'Moisture-Wicking Top Mesh'],
    sizes: ['Medium (UK 7-9)', 'Large (UK 10-12)'],
    graphic: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M40 10c-5 15-5 30-10 45s5 25 15 25 15-5 20-15-5-35-10-45-5-10-15-10z" stroke-width="3"/><path d="M35 55c10 0 15 10 20 20M32 40h12" stroke-linecap="round"/></svg>`
  }
]
