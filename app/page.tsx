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
  },
]

const PRODUCT_TYPES = [
  { id: 'dgbb', label: 'Deep Groove Ball Bearings', series: '6000 / 6200 / 6300', active: true },
  { id: 'sph', label: 'Spherical Roller Bearings', series: '22000 / 23000', active: false },
  { id: 'tpr', label: 'Tapered Roller Bearings', series: '30000 / 32000', active: false },
  { id: 'sls', label: 'Industrial Seals & Shields', series: 'HMSA / HMS5', active: false },
]

const METRICS = [
  { label: 'Plant Utilization Gain', value: 40, suffix: '%', icon: TrendingUp },
  { label: 'Reduction in Downtime', value: 65, suffix: '%', icon: Zap },
  { label: 'OEM-Certified Products', value: 12000, suffix: '+', icon: ShieldCheck },
  { label: 'Industries Served', value: 28, suffix: '+', icon: BarChart3 },
]

type Product = (typeof products)[number]
type CartItem = Product & { quantity: number }

export default function Page() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [activeIndustry, setActiveIndustry] = useState('steel')
  const [activeProduct, setActiveProduct] = useState('dgbb')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [compare, setCompare] = useState<string[]>([])
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    whatsapp: '',
    message: '',
    consent: true,
    updates: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesIndustry = activeIndustry === 'all' ? true : product.industry === activeIndustry
      const query = search.toLowerCase()
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.family.toLowerCase().includes(query)
      return matchesIndustry && matchesSearch
    })
  }, [activeIndustry, search])

  const totalCartQty = cart.reduce((sum, item) => sum + item.quantity, 0)

  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...prev, { ...product, quantity }]
    })
    setCartOpen(true)
  }

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item
          const nextQty = item.quantity + delta
          return { ...item, quantity: nextQty }
        })
        .filter((item) => item.quantity > 0),
    )
  }

  const toggleCompare = (id: string) => {
    setCompare((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : prev.length < 3 ? [...prev, id] : prev,
    )
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
    <div className="min-h-screen bg-[#020617] text-slate-100">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#020617]/80 text-white backdrop-blur-xl">
        <div className="border-b border-white/[0.04]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-slate-500 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#CC0000]" /> ISO-aligned sourcing workflow</span>
              <span className="hidden md:inline">Bulk RFQ desk active | 09:00–18:00 IST</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span>Industrial Division</span>
              <span>India procurement experience</span>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#CC0000] text-sm font-black tracking-[0.16em] text-white">
              SKF
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.12em] text-white">SKF India</p>
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Industrial E-Marketplace</p>
            </div>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {['Products', 'Industries', 'Applications', 'Support', 'Resources'].map((item) => (
              <button
                key={item}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white sm:inline-flex">
              Talk to Sales
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-[#CC0000] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(204,0,0,0.22)] transition hover:bg-[#b30000]">
              Request RFQ
            </button>
            <button
              onClick={() => setCartOpen((prev) => !prev)}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
              aria-label="Open enquiry cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalCartQty > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#CC0000] px-1 text-[10px] font-bold text-white">
                  {totalCartQty}
                </span>
              )}
            </button>
            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden"
              onClick={() => setMobileMenu((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="border-t border-white/10 px-4 py-3 lg:hidden">
            <div className="grid gap-2">
              {['Products', 'Industries', 'Applications', 'Support', 'Resources'].map((item) => (
                <button
                  key={item}
                  className="rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ===== CART DROPDOWN ===== */}
      {cartOpen && (
        <div className="fixed right-4 top-24 z-50 w-[calc(100%-2rem)] max-w-md rounded-xl border border-white/10 bg-[#0f172a] shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-white">Enquiry Workspace</p>
              <p className="text-xs text-slate-500">Selected products ready for RFQ routing</p>
            </div>
            <button onClick={() => setCartOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-white/5">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-[360px] overflow-auto">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
                <Package className="h-10 w-10 text-slate-600" />
                <div>
                  <p className="text-sm font-medium text-slate-300">No products shortlisted yet</p>
                  <p className="mt-1 text-xs text-slate-500">Use the RFQ grid to add SKUs and build a technical enquiry.</p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4 px-5 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">{item.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">{item.sku}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateCartQty(item.id, -1)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:bg-white/5">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-white">{item.quantity}</span>
                      <button onClick={() => updateCartQty(item.id, 1)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:bg-white/5">
                        <ArrowRight className="h-3.5 w-3.5 rotate-[-90deg]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="border-t border-white/10 px-5 py-4">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#CC0000] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#b30000]">
              Move to RFQ Form <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <main>
        {/* ===== HERO SECTION ===== */}
        <section className="relative overflow-hidden">
          {/* Deep Midnight Navy Radial Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#1e293b_0%,#0f172a_40%,#020617_100%)]" />
          {/* Ultra-Faint Engineering Grid */}
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          {/* Subtle Glow */}
          <div className="absolute -top-[20%] left-[50%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[120px]" />

          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
            {/* Left */}
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#CC0000]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">SKF India — Industrial Division 2025</span>
              </div>

              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
                  Engineered for <span className="text-white/90">Zero Friction.</span>
                  <br />
                  Built for India&apos;s <span className="text-white/50">Heavy Industries.</span>
                </h1>
                <p className="max-w-lg text-[15px] leading-[1.7] text-slate-400">
                  Direct-to-plant procurement of SKF-certified bearings, seals, and components. Instant RFQ. Bulk pricing. Real-time stock visibility.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a href="#rfq" className="group inline-flex items-center gap-2.5 rounded-lg bg-[#CC0000] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(204,0,0,0.25)] transition-all hover:bg-[#b30000] hover:shadow-[0_12px_40px_rgba(204,0,0,0.35)]">
                  Request Instant RFQ Bulk Pricing <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#catalog" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3.5 text-sm font-medium text-white/80 transition hover:border-white/30 hover:bg-white/5 hover:text-white">
                  Browse Digital Catalog <ChevronRight className="h-4 w-4" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {METRICS.map(({ label, value, suffix, icon: Icon }) => (
                  <div key={label} className="rounded-lg border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm transition hover:border-white/10 hover:bg-white/[0.04]">
                    <div className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-slate-500" />
                      <div>
                        <p className="text-2xl font-black tracking-tight text-white lg:text-[28px]"><AnimatedCounter target={value} suffix={suffix} /></p>
                        <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500">{label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Glassmorphic Configurator */}
            <div className="relative">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-1 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between rounded-lg bg-white/[0.04] px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#CC0000]" />
                    <div className="h-2 w-2 rounded-full bg-white/20" />
                    <div className="h-2 w-2 rounded-full bg-white/20" />
                  </div>
                  <span className="font-mono text-[11px] tracking-wider text-white/30">skf-product-configurator.in</span>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-medium text-emerald-500/80">Live</span>
                  </div>
                </div>
                <div className="space-y-4 p-5">
                  <div className="flex flex-col gap-2">
                    {PRODUCT_TYPES.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setActiveProduct(p.id)}
                        className={`flex items-center justify-between rounded-lg border border-transparent p-3.5 text-left transition-all duration-200 ${activeProduct === p.id ? 'border-l-4 border-l-[#CC0000] bg-white/5' : 'border-l-4 border-l-transparent hover:bg-white/[0.03]'}`}
                      >
                        <div>
                          <p className="text-[13px] font-semibold text-white">{p.label}</p>
                          <p className="mt-0.5 text-[11px] font-medium text-slate-500">Series: {p.series}</p>
                        </div>
                        {activeProduct === p.id && <ChevronRight className="h-4 w-4 shrink-0 text-[#CC0000]" />}
                      </button>
                    ))}
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Selected Product Preview</p>
                    <p className="mt-2 text-sm font-bold text-white">SKF 6305-2Z/C3 Deep Groove</p>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[
                        ['Bore', '25 mm'],
                        ['OD', '62 mm'],
                        ['Width', '17 mm'],
                      ].map(([k, v]) => (
                        <div key={k} className="rounded border border-white/5 bg-white/[0.03] px-3 py-3 text-center">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">{k}</p>
                          <p className="mt-1 font-mono text-[13px] font-semibold text-white">{v}</p>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white px-5 py-3 text-[13px] font-semibold text-slate-900 transition hover:bg-slate-100">
                      Quick Add to RFQ <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 px-1">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                      <Check className="h-3 w-3 text-emerald-500" />
                      <span className="text-[11px] font-medium text-slate-400">ISO 9001:2015</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                      <Check className="h-3 w-3 text-emerald-500" />
                      <span className="text-[11px] font-medium text-slate-400">All products certified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>

        {/* ===== TRUST STRIP ===== */}
        <section className="border-b border-white/[0.04] bg-[#0B1120]">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
            <div className="grid gap-3 md:grid-cols-4">
              {([
                ['OEM-aligned product families', 'Bearing, sealing, lubrication, and reliability flows', Building2],
                ['Application support', 'Technical review for complex duty and replacement fitment', ClipboardList],
                ['Operational trust signals', 'Lead time, stock tone, MOQ, and RFQ readiness at a glance', BadgeCheck],
                ['Distributed industrial coverage', 'Built for multi-plant procurement and service routing', Globe2],
              ] as const).map(([title, copy, Icon]) => (
                <div key={title} className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#CC0000]/10 text-[#CC0000]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== INDUSTRIES ===== */}
        <section className="border-b border-white/[0.04] bg-[#020617]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#CC0000]">Industry entry points</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-white">Navigate through operational context</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                  Engineers and buyers rarely start from the same point. This layout supports sector-led discovery with visible application context and replacement cues.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-400">
                <Clock3 className="h-4 w-4 text-[#CC0000]" /> Prioritised for fast scan and low-friction qualification
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-4">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => setActiveIndustry(industry.id)}
                  className={`rounded-xl border p-5 text-left transition ${activeIndustry === industry.id ? 'border-[#CC0000]/30 bg-[#CC0000]/[0.04] text-white shadow-[0_16px_40px_rgba(204,0,0,0.08)]' : 'border-white/5 bg-white/[0.02] text-white hover:border-white/10 hover:bg-white/[0.04]'}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <Factory className={`h-5 w-5 ${activeIndustry === industry.id ? 'text-[#CC0000]' : 'text-slate-500'}`} />
                    <span className={`text-[11px] uppercase tracking-[0.18em] ${activeIndustry === industry.id ? 'text-white/55' : 'text-slate-600'}`}>{industry.stat}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{industry.title}</h3>
                  <p className={`mt-2 text-sm leading-6 ${activeIndustry === industry.id ? 'text-white/74' : 'text-slate-500'}`}>{industry.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {industry.applications.map((application) => (
                      <span key={application} className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${activeIndustry === industry.id ? 'border-white/10 bg-white/5 text-white/60' : 'border-white/5 bg-white/[0.02] text-slate-500'}`}>
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
        <section className="border-b border-white/[0.04] bg-[#020617]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#CC0000]">RFQ explorer</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-white">Product discovery built like procurement software</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                  Replace ornamental cards with scan-friendly product modules: stock state, application use, dimensional cues, and clear enquiry actions.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-400 hover:bg-white/5">
                  <SlidersHorizontal className="h-4 w-4" /> Advanced filters
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-400 hover:bg-white/5">
                  <LineChart className="h-4 w-4" /> Compare ({compare.length}/3)
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0B1120] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <div className="hidden grid-cols-[2.3fr_1fr_1fr_1fr_1.2fr_1.2fr] gap-4 border-b border-white/10 bg-white/[0.02] px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 lg:grid">
                <div>Product</div>
                <div>Dimensions</div>
                <div>Sealing</div>
                <div>Application</div>
                <div>Commercial</div>
                <div>Actions</div>
              </div>
              <div className="divide-y divide-white/5">
                {filteredProducts.map((product) => (
                  <ProductRow key={product.id} product={product} inCompare={compare.includes(product.id)} onToggleCompare={toggleCompare} onAddToCart={addToCart} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== LEAD CAPTURE ===== */}
        <section className="border-b border-white/[0.04] bg-[#0B1120]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:py-16">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#CC0000]">Trust architecture</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-white">Industrial buyers need visible certainty</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                  High-performing B2B marketplaces reduce risk in the interface itself: support clarity, documentation pathways, response expectations, and structured commercial signals.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {([
                  ['Technical RFQ desk', 'Engineering-aligned triage for variant selection and replacement mapping', Headphones],
                  ['Structured quote intake', 'Commercial and application context captured before a sales call', ClipboardList],
                  ['Documentation-first flow', 'Catalogs, dimensional cues, and compliance context integrated early', FileText],
                  ['Response transparency', 'Clear handling of ready stock, factory lead times, and regional checks', Clock3],
                ] as const).map(([title, copy, Icon]) => (
                  <div key={title} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                    <Icon className="h-5 w-5 text-[#CC0000]" />
                    <p className="mt-4 text-base font-semibold text-white">{title}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-500">{copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#020617] shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
              <div className="border-b border-white/10 bg-white/[0.02] px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">RFQ form</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">Route a procurement-ready enquiry</h3>
              </div>
              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 px-6 py-14 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <Check className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-white">Enquiry captured</p>
                    <p className="mt-2 text-sm leading-7 text-slate-500">The workspace is now structured for a follow-up from sales or technical support.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" required>
                      <input value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[#CC0000]" placeholder="Rajesh Kumar" required />
                    </Field>
                    <Field label="Company name" required>
                      <input value={formState.company} onChange={(e) => setFormState({ ...formState, company: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[#CC0000]" placeholder="Plant / OEM / EPC" required />
                    </Field>
                  </div>
                  <Field label="WhatsApp number" required>
                    <input value={formState.whatsapp} onChange={(e) => setFormState({ ...formState, whatsapp: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[#CC0000]" placeholder="+91 98xxxxxxx" required />
                  </Field>
                  <Field label="Enquiry context" required>
                    <textarea value={cart.length ? enquiryMessage : formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className="min-h-[156px] w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[#CC0000]" placeholder="Share product, application, shutdown window, quantity, or replacement context" required />
                  </Field>
                  <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                    <label className="flex items-start gap-3 text-sm leading-6 text-slate-400">
                      <input type="checkbox" checked={formState.consent} onChange={(e) => setFormState({ ...formState, consent: e.target.checked })} className="mt-1 h-4 w-4 rounded border-slate-600 bg-transparent text-[#CC0000]" />
                      <span>I consent to processing of this enquiry for commercial and technical response workflows.</span>
                    </label>
                    <label className="mt-3 flex items-start gap-3 text-sm leading-6 text-slate-400">
                      <input type="checkbox" checked={formState.updates} onChange={(e) => setFormState({ ...formState, updates: e.target.checked })} className="mt-1 h-4 w-4 rounded border-slate-600 bg-transparent text-[#CC0000]" />
                      <span>I would like product, pricing, and service updates over WhatsApp or email.</span>
                    </label>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button type="submit" className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#CC0000] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#b30000]">
                      Submit RFQ <ArrowRight className="h-4 w-4" />
                    </button>
                    <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5">
                      <PhoneCall className="h-4 w-4 text-[#CC0000]" /> Talk to a specialist
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white">{label} {required ? <span className="text-[#CC0000]">*</span> : null}</span>
      {children}
    </label>
  )
}

function ProductRow({ product, inCompare, onToggleCompare, onAddToCart }: { product: Product; inCompare: boolean; onToggleCompare: (id: string) => void; onAddToCart: (product: Product, quantity: number) => void }) {
  const [qty, setQty] = useState(product.moq)
  const stockToneClass = product.stockTone === 'success' ? 'bg-emerald-500/10 text-emerald-400' : product.stockTone === 'warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-white/5 text-slate-400'
  return (
    <div className="grid gap-4 px-5 py-5 lg:grid-cols-[2.3fr_1fr_1fr_1fr_1.2fr_1.2fr] lg:items-center">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{product.family}</span>
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${stockToneClass}`}>{product.stock}</span>
        </div>
        <p className="mt-3 text-base font-semibold tracking-tight text-white">{product.name}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{product.sku}</p>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm lg:block lg:space-y-1">
        <Metric label="ID" value={product.bore} />
        <Metric label="OD" value={product.outer} />
        <Metric label="W" value={product.width} />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">Sealing</p>
        <p className="mt-1 text-sm font-medium text-slate-300">{product.sealing}</p>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">Use case</p>
        <p className="mt-1 text-sm font-medium text-slate-300">{product.application}</p>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">Commercial cue</p>
        <p className="mt-1 text-sm font-medium text-slate-300">MOQ {product.moq}</p>
        <p className="mt-1 text-sm text-slate-500">{product.bulk}</p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <button onClick={() => setQty((prev) => Math.max(product.moq, prev - product.moq))} className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:bg-white/5">
            <Minus className="h-4 w-4" />
          </button>
          <div className="flex h-10 min-w-[56px] items-center justify-center rounded-lg border border-white/10 px-3 text-sm font-semibold text-white">{qty}</div>
          <button onClick={() => setQty((prev) => prev + product.moq)} className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:bg-white/5">
            <ArrowRight className="h-4 w-4 rotate-[-90deg]" />
          </button>
        </div>
        <button onClick={() => onAddToCart(product, qty)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#CC0000] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#b30000]">
          <ShoppingCart className="h-4 w-4" /> Add to RFQ
        </button>
        <button onClick={() => onToggleCompare(product.id)} className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition ${inCompare ? 'border-[#CC0000]/30 bg-[#CC0000]/5 text-[#CC0000]' : 'border-white/10 text-slate-400 hover:bg-white/5'}`}>
          <Filter className="h-4 w-4" /> {inCompare ? 'Shortlisted' : 'Add to compare'}
        </button>
      </div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
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
