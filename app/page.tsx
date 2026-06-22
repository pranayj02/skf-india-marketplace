'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Check,
  ChevronRight,
  ClipboardList,
  Clock3,
  Factory,
  FileText,
  Filter,
  Gauge,
  Globe2,
  Headphones,
  LineChart,
  Menu,
  Minus,
  Package,
  PhoneCall,
  Search,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  X,
  Zap,
  TrendingUp,
  Plus,
} from 'lucide-react'

const industries = [
  {
    id: 'steel',
    title: 'Metals & Steel',
    stat: '3,200+ qualified SKUs',
    description: 'Rolling mills, casters, furnace fans, slitting lines, and continuous-duty applications.',
    applications: ['Caster rolls', 'Furnace fans', 'Conveyor drives'],
  },
  {
    id: 'mining',
    title: 'Mining & Minerals',
    stat: 'High-load bearing lines',
    description: 'Crushers, conveyors, vibrating screens, slurry pumps, and abrasive duty environments.',
    applications: ['Jaw crushers', 'Screen decks', 'Bucket elevators'],
  },
  {
    id: 'food',
    title: 'Food & Beverage',
    stat: 'Washdown-ready options',
    description: 'Hygienic sealing, food-grade lubrication, and uptime-led replacement programs.',
    applications: ['Packaging lines', 'Palletisers', 'Agitators'],
  },
  {
    id: 'renewable',
    title: 'Renewable Energy',
    stat: 'Condition-led servicing',
    description: 'Wind, auxiliary rotating systems, gearbox protection, and monitoring-led maintenance.',
    applications: ['Yaw systems', 'Gearboxes', 'Generator supports'],
  },
]

const products = [
  {
    id: '6305-2Z-C3',
    sku: 'SKF-6305-2Z/C3',
    name: 'Deep Groove Ball Bearing 6305-2Z/C3',
    family: 'Deep Groove',
    industry: 'steel',
    stock: 'Ready stock',
    stockTone: 'success',
    bore: '25 mm',
    outer: '62 mm',
    width: '17 mm',
    sealing: '2Z Metal Shield',
    application: 'Motor drives / pump skids',
    moq: 10,
    bulk: 'Bulk RFQ eligible',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/4d7e9c78899f63fdea4ea783fb87b5be26d4d9d6.jpg',
  },
  {
    id: '6205-2RS1',
    sku: 'SKF-6205-2RS1',
    name: 'Deep Groove Ball Bearing 6205-2RS1',
    family: 'Sealed Bearing',
    industry: 'food',
    stock: 'Ready stock',
    stockTone: 'success',
    bore: '25 mm',
    outer: '52 mm',
    width: '15 mm',
    sealing: '2RS1 Contact Seal',
    application: 'Washdown conveyors',
    moq: 12,
    bulk: 'Preferred for repeat maintenance buys',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/d2eb6c164aae11f5808b013486793e8030ff6bfc.jpg',
  },
  {
    id: '22316-E-C3',
    sku: 'SKF-22316-E/C3',
    name: 'Spherical Roller Bearing 22316 E/C3',
    family: 'Spherical Roller',
    industry: 'mining',
    stock: 'Factory lead time',
    stockTone: 'warning',
    bore: '80 mm',
    outer: '170 mm',
    width: '58 mm',
    sealing: 'Open',
    application: 'Crushers / vibrating screens',
    moq: 4,
    bulk: 'Application engineering review suggested',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/640cbf8dc3e729faf5eec7f70c266edca2299a2a.jpg',
  },
  {
    id: '32215-J2-Q',
    sku: 'SKF-32215-J2/Q',
    name: 'Tapered Roller Bearing 32215 J2/Q',
    family: 'Tapered Roller',
    industry: 'steel',
    stock: 'Ready stock',
    stockTone: 'success',
    bore: '75 mm',
    outer: '130 mm',
    width: '33.25 mm',
    sealing: 'Open',
    application: 'Gearboxes / mill stands',
    moq: 6,
    bulk: 'Bulk RFQ eligible',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/f9d3933ad109dd8ffd7397e627c50f2806e26ba7.jpg',
  },
  {
    id: 'NJ2306-ECP',
    sku: 'SKF-NJ2306-ECP',
    name: 'Cylindrical Roller Bearing NJ2306 ECP',
    family: 'Cylindrical Roller',
    industry: 'renewable',
    stock: 'Regional stock check',
    stockTone: 'neutral',
    bore: '30 mm',
    outer: '72 mm',
    width: '27 mm',
    sealing: 'Open',
    application: 'Generator and rotating supports',
    moq: 8,
    bulk: 'Service kit compatible',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/cd271d1a5bf9aabfdb01b27f9bbf4b5f6d28922d.jpg',
  },
  {
    id: 'YAR-208-2F',
    sku: 'SKF-YAR-208-2F',
    name: 'Insert Bearing YAR 208-2F',
    family: 'Mounted Units',
    industry: 'food',
    stock: 'Ready stock',
    stockTone: 'success',
    bore: '40 mm',
    outer: '80 mm',
    width: '49.2 mm',
    sealing: 'Rubberised 2F',
    application: 'Food lines / unit replacements',
    moq: 10,
    bulk: 'Fast-moving maintenance SKU',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/320724ccc28da6290ef947c3185eada656c71a86.jpg',
  },
]

const PRODUCT_TYPES = [
  { id: 'dgbb', label: 'Deep Groove Ball Bearings', series: '6000 / 6200 / 6300', active: true },
  { id: 'sph',  label: 'Spherical Roller Bearings', series: '22000 / 23000',       active: false },
  { id: 'tpr',  label: 'Tapered Roller Bearings',   series: '30000 / 32000',       active: false },
  { id: 'sls',  label: 'Industrial Seals & Shields', series: 'HMSA / HMS5',         active: false },
]

const PRODUCT_IMAGES: Record<string, string> = {
  dgbb: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80',
  sph:  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  tpr:  'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80',
  sls:  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
}

const METRICS = [
  { label: 'Plant Utilization Gain',  value: 40,    suffix: '%', icon: TrendingUp },
  { label: 'Reduction in Downtime',   value: 65,    suffix: '%', icon: Zap },
  { label: 'OEM-Certified Products',  value: 12000, suffix: '+', icon: ShieldCheck },
  { label: 'Industries Served',       value: 28,    suffix: '+', icon: BarChart3 },
]

type Product  = (typeof products)[number]
type CartItem = Product & { quantity: number }

export default function Page() {
  const [mobileMenu,    setMobileMenu]    = useState(false)
  const [activeIndustry, setActiveIndustry] = useState('steel')
  const [activeCategory, setActiveCategory]  = useState<string|null>(null)
  const [search,         setSearch]         = useState('')
  const [catSearch,      setCatSearch]      = useState('')
  const [cart,           setCart]           = useState<CartItem[]>([])
  const [cartOpen,       setCartOpen]       = useState(false)
  const [compare,        setCompare]        = useState<string[]>([])
  const [formState,      setFormState]      = useState({
    name: '', company: '', whatsapp: '', message: '', consent: true, updates: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const filteredCategories = useMemo(() => {
    const q = catSearch.toLowerCase()
    if (!q) return CATEGORIES
    return CATEGORIES.filter((c) =>
      c.label.toLowerCase().includes(q) ||
      c.series.toLowerCase().includes(q) ||
      c.application.toLowerCase().includes(q)
    )
  }, [catSearch])

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesIndustry = activeIndustry === 'all' ? true : p.industry === activeIndustry
      const q = search.toLowerCase()
      const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.family.toLowerCase().includes(q)
      return matchesIndustry && matchesSearch
    })
  }, [activeIndustry, search])

  const totalCartQty = cart.reduce((sum, item) => sum + item.quantity, 0)

  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
      return [...prev, { ...product, quantity }]
    })
    setCartOpen(true)
  }

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) => prev.map((item) => item.id !== id ? item : { ...item, quantity: item.quantity + delta }).filter((item) => item.quantity > 0))
  }

  const toggleCompare = (id: string) => {
    setCompare((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 3 ? [...prev, id] : prev)
  }

  const enquiryMessage = cart.length
    ? `Products selected for RFQ:\n${cart.map((item) => `- ${item.sku} | ${item.name} | Qty ${item.quantity}`).join('\n')}`
    : formState.message

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.consent) return
    setSubmitted(true)
  }


  return (
    <div className="min-h-screen bg-white text-[#1a2535]" style={{ fontFamily: "'SKF Sans', 'Inter', system-ui, sans-serif" }}>

      {/* ===== TOP UTILITY BAR ===== */}
      <div className="border-b border-slate-200 bg-[#003366]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[11px] sm:px-6">
          <div className="flex items-center gap-4 text-white/70">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-white/50" />
              ISO 9001:2015 Certified Sourcing Workflow
            </span>
            <span className="hidden md:inline text-white/50">|</span>
            <span className="hidden md:inline">Bulk RFQ Desk Active &nbsp;·&nbsp; 09:00–18:00 IST</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-white/60">
            <span>Industrial Division</span>
            <span className="text-white/30">|</span>
            <span>India Procurement Platform</span>
          </div>
        </div>
      </div>

      {/* ===== MAIN HEADER ===== */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#003366] text-[13px] font-black tracking-[0.14em] text-white">
              SKF
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight text-[#003366]" style={{ fontFamily: "'SKF Display', 'Segoe UI', sans-serif" }}>SKF India</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Industrial E-Marketplace</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {['Products', 'Industries', 'Applications', 'Support', 'Resources'].map((item) => (
              <button key={item} className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#003366]">
                {item}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-[#003366] transition hover:bg-slate-50 sm:inline-flex">
              Talk to Sales
            </button>
            <a href="#rfq" className="inline-flex items-center gap-2 rounded-md bg-[#E31B23] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c01018]">
              Request Instant RFQ
            </a>
            <button
              onClick={() => setCartOpen((prev) => !prev)}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100"
              aria-label="Open enquiry cart"
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              {totalCartQty > 0 && (
                <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#E31B23] px-1 text-[10px] font-bold leading-none text-white">
                  {totalCartQty}
                </span>
              )}
            </button>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-600 lg:hidden"
              onClick={() => setMobileMenu((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              {mobileMenu ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenu && (
          <div className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
            <div className="grid gap-0.5">
              {['Products', 'Industries', 'Applications', 'Support', 'Resources'].map((item) => (
                <button key={item} className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#003366]">
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ===== CART PANEL ===== */}
      {cartOpen && (
        <div className="fixed right-4 top-24 z-50 w-[calc(100%-2rem)] max-w-md rounded-lg border border-slate-200 bg-white shadow-[0_8px_40px_rgba(0,51,102,0.14)]">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-[#003366]">Enquiry Workspace</p>
              <p className="text-xs text-slate-500">Selected products ready for RFQ routing</p>
            </div>
            <button onClick={() => setCartOpen(false)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-[360px] overflow-auto">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
                <Package className="h-9 w-9 text-slate-300" />
                <div>
                  <p className="text-sm font-semibold text-slate-700">No products shortlisted yet</p>
                  <p className="mt-1 text-xs text-slate-400">Use the RFQ grid to add SKUs and build a technical enquiry.</p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4 px-5 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#003366]">{item.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-400">{item.sku}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateCartQty(item.id, -1)} className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-[#003366]">{item.quantity}</span>
                      <button onClick={() => updateCartQty(item.id, 1)} className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="border-t border-slate-200 px-5 py-4">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#E31B23] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c01018]">
              Move to RFQ Form <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <main>
        {/* ===== HERO ===== */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-20">

            {/* Left */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded border border-slate-200 bg-slate-50 px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E31B23]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">SKF India — Industrial Division 2025</span>
              </div>

              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-[#003366] sm:text-5xl lg:text-[3rem]" style={{ fontFamily: "'SKF Display', 'Segoe UI', sans-serif" }}>
                  Engineered for Zero Friction.
                  <span className="block text-slate-400 mt-1">Built for India&apos;s Heavy Industries.</span>
                </h1>
                <p className="max-w-lg text-base leading-[1.75] text-slate-500">
                  Direct-to-plant procurement of SKF-certified bearings, seals, and components. Instant RFQ. Bulk pricing. Real-time stock visibility.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a href="#rfq" className="group inline-flex items-center gap-2.5 rounded-md bg-[#E31B23] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c01018]">
                  Request Instant RFQ &amp; Bulk Pricing <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#catalog" className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-5 py-3 text-sm font-medium text-[#003366] transition hover:bg-slate-50">
                  Browse Digital Catalog <ChevronRight className="h-4 w-4" />
                </a>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {METRICS.map(({ label, value, suffix, icon: Icon }) => (
                  <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#003366]/8 text-[#003366]">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold tracking-tight text-[#003366]">
                          <AnimatedCounter target={value} suffix={suffix} />
                        </p>
                        <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">{label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product Category Finder */}
            <div className="relative">
              <div className="rounded-xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(0,51,102,0.08)]">

                {/* Panel header */}
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3.5 rounded-t-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Product Categories</p>
                  <span className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                    <ShieldCheck className="h-3 w-3 text-[#003366]" />
                    {CATEGORIES.length} Families
                  </span>
                </div>

                {/* Search */}
                <div className="border-b border-slate-100 px-4 py-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search family, series, or application…"
                      value={catSearch}
                      onChange={(e) => setCatSearch(e.target.value)}
                      className="w-full rounded-md border border-slate-200 bg-white py-2 pl-8.5 pr-3 text-[13px] text-slate-700 placeholder:text-slate-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366]/20 transition"
                    />
                  </div>
                </div>

                {/* Category grid */}
                <div className="grid grid-cols-2 gap-0 divide-x divide-y divide-slate-100 max-h-[340px] overflow-y-auto">
                  {filteredCategories.length === 0 ? (
                    <div className="col-span-2 py-10 text-center text-sm text-slate-400">No categories match &ldquo;{catSearch}&rdquo;</div>
                  ) : filteredCategories.map((cat) => (
                    <a
                      key={cat.id}
                      href="#catalog"
                      onClick={() => { setSearch(cat.label.split(' ').slice(0,2).join(' ')); setActiveCategory(cat.id) }}
                      className="group flex items-start gap-3 p-3.5 transition hover:bg-[#f0f4fa]"
                    >
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-50">
                        <img src={cat.image} alt={cat.label} className="h-full w-full object-cover" loading="lazy" width={40} height={40} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold leading-tight text-[#003366] group-hover:text-[#E31B23] transition">{cat.label}</p>
                        <p className="mt-0.5 text-[10px] text-slate-400 truncate">{cat.series}</p>
                        <p className="mt-1 text-[10px] font-semibold text-slate-500">{cat.skus.toLocaleString()}+ SKUs</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Trending SKUs footer */}
                <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 rounded-b-xl">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Trending SKUs</p>
                  <div className="flex flex-wrap gap-1.5">
                    {TRENDING_SKUS.map((sku) => (
                      <button
                        key={sku}
                        onClick={() => { setSearch(sku.replace('SKF-', '')); document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }) }}
                        className="rounded border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-mono font-medium text-[#003366] transition hover:border-[#E31B23] hover:text-[#E31B23]"
                      >
                        {sku}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TRUST STRIP ===== */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            <div className="grid gap-4 md:grid-cols-4">
              {([
                ['OEM-aligned product families',        'Bearing, sealing, lubrication, and reliability flows',                    Building2],
                ['Application support',                  'Technical review for complex duty and replacement fitment',               ClipboardList],
                ['Operational trust signals',            'Lead time, stock tone, MOQ, and RFQ readiness at a glance',              BadgeCheck],
                ['Distributed industrial coverage',      'Built for multi-plant procurement and service routing',                   Globe2],
              ] as const).map(([title, copy, Icon]) => (
                <div key={title} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#003366]/8 text-[#003366]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#003366]">{title}</p>
                    <p className="mt-1 text-[13px] leading-[1.65] text-slate-500">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== INDUSTRIES ===== */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E31B23]">Industry Entry Points</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#003366]" style={{ fontFamily: "'SKF Display', 'Segoe UI', sans-serif" }}>Navigate through operational context</h2>
                <p className="mt-3 max-w-2xl text-[14px] leading-[1.75] text-slate-500">
                  Engineers and buyers rarely start from the same point. This layout supports sector-led discovery with visible application context and replacement cues.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-500">
                <Clock3 className="h-4 w-4 text-[#003366]" /> Prioritised for fast scan and low-friction qualification
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-4">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => setActiveIndustry(industry.id)}
                  className={`rounded-lg border p-5 text-left transition ${
                    activeIndustry === industry.id
                      ? 'border-[#003366] bg-[#003366]/5 shadow-[0_2px_12px_rgba(0,51,102,0.1)]'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <Factory className={`h-5 w-5 ${ activeIndustry === industry.id ? 'text-[#003366]' : 'text-slate-400'}`} />
                    <span className={`text-[11px] uppercase tracking-[0.16em] ${ activeIndustry === industry.id ? 'text-[#003366]/60' : 'text-slate-400'}`}>{industry.stat}</span>
                  </div>
                  <h3 className={`mt-4 text-[15px] font-semibold ${ activeIndustry === industry.id ? 'text-[#003366]' : 'text-slate-700'}`}>{industry.title}</h3>
                  <p className={`mt-2 text-[13px] leading-[1.65] ${ activeIndustry === industry.id ? 'text-[#003366]/70' : 'text-slate-500'}`}>{industry.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {industry.applications.map((application) => (
                      <span key={application} className={`rounded border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] ${ activeIndustry === industry.id ? 'border-[#003366]/20 bg-[#003366]/8 text-[#003366]/70' : 'border-slate-200 bg-slate-50 text-slate-400'}`}>
                        {application}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PRODUCT EXPLORER ===== */}
        <section id="catalog" className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E31B23]">RFQ Explorer</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#003366]" style={{ fontFamily: "'SKF Display', 'Segoe UI', sans-serif" }}>Product discovery built like procurement software</h2>
                <p className="mt-3 max-w-2xl text-[14px] leading-[1.75] text-slate-500">
                  Scan-friendly product modules with stock state, application use, dimensional cues, and clear enquiry actions.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
                  <SlidersHorizontal className="h-4 w-4" /> Advanced filters
                </button>
                <button className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
                  <LineChart className="h-4 w-4" /> Compare ({compare.length}/3)
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="mb-4">
              <div className="relative max-w-sm">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search SKU, bearing family…"
                  className="w-full rounded-md border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#003366] focus:ring-1 focus:ring-[#003366]/20"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <div className="hidden grid-cols-[72px_2.3fr_1fr_1fr_1fr_1.2fr_1.2fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 lg:grid">
                <div></div>
                <div>Product</div>
                <div>Dimensions</div>
                <div>Sealing</div>
                <div>Application</div>
                <div>Commercial</div>
                <div>Actions</div>
              </div>
              <div className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <ProductRow key={product.id} product={product} inCompare={compare.includes(product.id)} onToggleCompare={toggleCompare} onAddToCart={addToCart} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== LEAD CAPTURE ===== */}
        <section id="rfq" className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:py-16">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E31B23]">Trust Architecture</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#003366]" style={{ fontFamily: "'SKF Display', 'Segoe UI', sans-serif" }}>Industrial buyers need visible certainty</h2>
                <p className="mt-3 max-w-2xl text-[14px] leading-[1.75] text-slate-500">
                  High-performing B2B marketplaces reduce risk in the interface itself: support clarity, documentation pathways, response expectations, and structured commercial signals.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {([
                  ['Technical RFQ desk',        'Engineering-aligned triage for variant selection and replacement mapping', Headphones],
                  ['Structured quote intake',    'Commercial and application context captured before a sales call',           ClipboardList],
                  ['Documentation-first flow',  'Catalogs, dimensional cues, and compliance context integrated early',      FileText],
                  ['Response transparency',      'Clear handling of ready stock, factory lead times, and regional checks',   Clock3],
                ] as const).map(([title, copy, Icon]) => (
                  <div key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#003366]/8 text-[#003366]">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-[#003366]">{title}</p>
                    <p className="mt-2 text-[13px] leading-[1.65] text-slate-500">{copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white shadow-[0_4px_24px_rgba(0,51,102,0.08)]">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">RFQ Form</p>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-[#003366]" style={{ fontFamily: "'SKF Display', 'Segoe UI', sans-serif" }}>Route a procurement-ready enquiry</h3>
              </div>
              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 px-6 py-14 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <Check className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-[#003366]">Enquiry captured</p>
                    <p className="mt-2 text-sm leading-[1.75] text-slate-500">The workspace is now structured for a follow-up from sales or technical support.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" required>
                      <input value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="w-full rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#003366] focus:ring-1 focus:ring-[#003366]/20" placeholder="Rajesh Kumar" required />
                    </Field>
                    <Field label="Company name" required>
                      <input value={formState.company} onChange={(e) => setFormState({ ...formState, company: e.target.value })} className="w-full rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#003366] focus:ring-1 focus:ring-[#003366]/20" placeholder="Plant / OEM / EPC" required />
                    </Field>
                  </div>
                  <Field label="WhatsApp number" required>
                    <input value={formState.whatsapp} onChange={(e) => setFormState({ ...formState, whatsapp: e.target.value })} className="w-full rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#003366] focus:ring-1 focus:ring-[#003366]/20" placeholder="+91 98xxxxxxx" required />
                  </Field>
                  <Field label="Enquiry context" required>
                    <textarea value={cart.length ? enquiryMessage : formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className="min-h-[140px] w-full rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#003366] focus:ring-1 focus:ring-[#003366]/20" placeholder="Share product, application, shutdown window, quantity, or replacement context" required />
                  </Field>
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                    <label className="flex items-start gap-3 text-sm leading-6 text-slate-500">
                      <input type="checkbox" checked={formState.consent} onChange={(e) => setFormState({ ...formState, consent: e.target.checked })} className="mt-1 h-4 w-4 rounded border-slate-300 text-[#003366]" />
                      <span>I consent to processing of this enquiry for commercial and technical response workflows.</span>
                    </label>
                    <label className="mt-3 flex items-start gap-3 text-sm leading-6 text-slate-500">
                      <input type="checkbox" checked={formState.updates} onChange={(e) => setFormState({ ...formState, updates: e.target.checked })} className="mt-1 h-4 w-4 rounded border-slate-300 text-[#003366]" />
                      <span>I would like product, pricing, and service updates over WhatsApp or email.</span>
                    </label>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button type="submit" className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-[#E31B23] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c01018]">
                      Submit RFQ <ArrowRight className="h-4 w-4" />
                    </button>
                    <button type="button" className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-5 py-2.5 text-sm font-semibold text-[#003366] hover:bg-slate-50">
                      <PhoneCall className="h-4 w-4 text-[#E31B23]" /> Talk to a specialist
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#003366] text-[11px] font-black tracking-[0.14em] text-white">SKF</div>
              <div>
                <p className="text-sm font-bold text-[#003366]" style={{ fontFamily: "'SKF Display', 'Segoe UI', sans-serif" }}>SKF India — Industrial Division</p>
                <p className="text-[11px] text-slate-400">B2B E-Marketplace &amp; Procurement Platform</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-500">
                <ShieldCheck className="h-3 w-3 text-[#003366]" />
                ISO 9001:2015 Certified
              </span>
              <span className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-500">
                <BadgeCheck className="h-3 w-3 text-[#003366]" />
                OEM-Certified Products
              </span>
              <span className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-500">
                <Globe2 className="h-3 w-3 text-[#003366]" />
                PAN-India Coverage
              </span>
            </div>
          </div>
          <div className="mt-6 border-t border-slate-200 pt-6 text-[12px] text-slate-400">
            © 2025 SKF Group. All rights reserved. This is a B2B procurement demonstration platform.
          </div>
        </div>
      </footer>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-[#003366]">{label} {required ? <span className="text-[#E31B23]">*</span> : null}</span>
      {children}
    </label>
  )
}

function ProductRow({ product, inCompare, onToggleCompare, onAddToCart }: {
  product: Product
  inCompare: boolean
  onToggleCompare: (id: string) => void
  onAddToCart: (product: Product, quantity: number) => void
}) {
  const [qty, setQty] = useState(product.moq)
  const stockClass =
    product.stockTone === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
    product.stockTone === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-200' :
    'bg-slate-50 text-slate-500 border-slate-200'

  return (
    <div className="grid gap-4 px-5 py-5 lg:grid-cols-[72px_2.3fr_1fr_1fr_1fr_1.2fr_1.2fr] lg:items-center hover:bg-slate-50/60 transition">
      <div className="flex items-center justify-center">
        <div className="h-[72px] w-[72px] overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" width={72} height={72} />
        </div>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">{product.family}</span>
          <span className={`rounded border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${stockClass}`}>{product.stock}</span>
        </div>
        <p className="mt-2.5 text-[15px] font-semibold tracking-tight text-[#003366]">{product.name}</p>
        <p className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-slate-400">{product.sku}</p>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm lg:block lg:space-y-1.5">
        <Metric label="ID" value={product.bore} />
        <Metric label="OD" value={product.outer} />
        <Metric label="W"  value={product.width} />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Sealing</p>
        <p className="mt-1 text-[13px] font-medium text-slate-600">{product.sealing}</p>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Use case</p>
        <p className="mt-1 text-[13px] font-medium text-slate-600">{product.application}</p>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Commercial cue</p>
        <p className="mt-1 text-[13px] font-semibold text-[#003366]">MOQ {product.moq}</p>
        <p className="mt-0.5 text-[12px] text-slate-400">{product.bulk}</p>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <button onClick={() => setQty((prev) => Math.max(product.moq, prev - product.moq))} className="inline-flex h-9 w-9 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100">
            <Minus className="h-3.5 w-3.5" />
          </button>
          <div className="flex h-9 min-w-[52px] items-center justify-center rounded border border-slate-200 px-3 text-sm font-semibold text-[#003366]">{qty}</div>
          <button onClick={() => setQty((prev) => prev + product.moq)} className="inline-flex h-9 w-9 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <button onClick={() => onAddToCart(product, qty)} className="inline-flex items-center justify-center gap-2 rounded-md bg-[#E31B23] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c01018]">
          <ShoppingCart className="h-3.5 w-3.5" /> Add to RFQ
        </button>
        <button onClick={() => onToggleCompare(product.id)} className={`inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-[13px] font-semibold transition ${ inCompare ? 'border-[#003366]/30 bg-[#003366]/5 text-[#003366]' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
          <Filter className="h-3.5 w-3.5" /> {inCompare ? 'Shortlisted' : 'Compare'}
        </button>
      </div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
      <p className="mt-0.5 text-[13px] font-semibold text-[#003366]">{value}</p>
    </div>
  )
}

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1400
        const steps = 60
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, duration / steps)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}
