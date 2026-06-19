# SKF India – Industrial B2B Marketplace

A premium, enterprise-focused B2B E-Marketplace and Campaign Landing Page template for **SKF India (Industrial Division)**.

## ✨ Features

- **Hero Campaign Block** — Split layout with animated metric counters, value proposition, and an interactive product selector
- **Industry Sector Navigation** — 6-sector grid (Metals, Mining, Food & Beverage, Renewable Energy, Automotive, Marine) with hover transitions
- **Live RFQ Product Grid** — 6 SKF bearing products with quantity selectors, spec tables, and "Add to Enquiry Cart" with real-time cart counter
- **Lead Capture Form** — Corporate intake form with DPDPA/GDPR compliance checkboxes, auto-populated from cart
- **Functional Enquiry Cart** — Header cart badge with live count, dropdown cart drawer
- **Responsive** — Mobile-first, fluid layout for field engineers on-site

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pranayj02/skf-india-marketplace)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3
- **Language**: TypeScript
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## 📦 Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
app/
  layout.tsx        # Root layout with Inter font + metadata
  globals.css       # Tailwind base + custom component classes
  page.tsx          # Root page — cart state management
components/
  Header.tsx        # Sticky nav + enquiry cart drawer
  HeroSection.tsx   # Split hero + animated counters + product selector
  IndustryNav.tsx   # 6-sector industry grid
  RFQGrid.tsx       # Product listing with qty selectors + add-to-cart
  LeadCapture.tsx   # Lead form with DPDPA compliance
  Footer.tsx        # Brand footer with contact info
```

## 🎨 Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `skf-blue` | `#003366` | Primary brand, header, headings |
| `skf-red` | `#E8001D` | Primary CTA, product tags |
| `skf-orange` | `#FF6B00` | Accent, icons, highlights |
| `skf-grey` | `#F4F6F9` | Section backgrounds |
