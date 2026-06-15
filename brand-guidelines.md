# Morecare Brand Guidelines

This document details the official visual identity assets, colors, and typography for the Morecare Mobility & Rehabilitation Solutions project. Refer to these guidelines for all design and styling changes.

---

## 1. Brand Colours (Primary Palette)

| Color Name | Sample / Hex Code | Usage / Purpose |
| :--- | :--- | :--- |
| **Morecare Green** | `#C2DF07` | Brand Accent, Highlights, CTAs |
| **Morecare Blue** | `#069DE9` | Logo, Primary Brand Colour, Key Elements |
| **Neutral Grey** | `#4D4D4D` | Text, Icons, Supporting Elements |

---

## 2. Supporting Graphic Colours

| Color Name | Hex Code | Usage / Purpose |
| :--- | :--- | :--- |
| **Light Blue Background** | `#E6F2F8` | Page background and sections |
| **Deep Blue Accent** | `#1476AF` | Headings, buttons, emphasis |

---

## 3. Typography

### Primary Typeface (Logo & Special Use)
* **Arial Rounded MT Bold**
  * *Usage:* Used for the logo and select brand communications where appropriate.

### Core Font Stacks
* **Montserrat**
  * *Usage:* Headlines / Section Titles (Clean, modern, and authoritative)
* **Poppins**
  * *Usage:* Sub-headings / Product Names (Friendly, rounded, and highly readable)
* **Open Sans**
  * *Usage:* Body Text / Descriptions (Clear, neutral, and easy to read for long-form content)
* **Articulat CF**
  * *Usage:* Premium Use / Special Materials (For high-impact communications)

---

## 4. CSS Variable Mapping (`variables.css`)

These values are mapped in [variables.css](file:///d:/Semester%20Workflow/Summer%20Internship'26/Morecare/Morecare%20WebDev/src/styles/variables.css):

```css
:root {
  /* Brand Colors */
  --mc-primary: #069DE9;        /* Morecare Blue */
  --mc-primary-dark: #1476AF;   /* Deep Blue Accent */
  --mc-accent: #1476AF;         /* Deep Blue Accent */
  --mc-lime: #C2DF07;           /* Morecare Green */
  --mc-bg: #E6F2F8;             /* Light Blue Background */
  --mc-text-body: #4D4D4D;      /* Neutral Grey body text */
  --mc-text-muted: #4D4D4D;
  --mc-text-light: #4D4D4D;
  --mc-white: #ffffff;
  --mc-navy: #0B1B2B;           /* Base Navy */

  /* Font Families */
  --font-display: 'Montserrat', system-ui, -apple-system, sans-serif;
  --font-subheading: 'Poppins', system-ui, -apple-system, sans-serif;
  --font-body: 'Open Sans', system-ui, -apple-system, sans-serif;
  --font-articulate: 'Articulat CF Italic', 'Articulate CF Italic', 'Articulat CF', sans-serif;
  --font-logo: 'Arial Rounded MT Bold', sans-serif;
}
```
