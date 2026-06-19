'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronRight, Zap, Shield, TrendingUp, BarChart3 } from 'lucide-react'

const METRICS = [
  { label: 'Plant Utilization Gain', value: 40, suffix: '%', icon: TrendingUp },
  { label: 'Reduction in Downtime', value: 65, suffix: '%', icon: Zap },
  { label: 'OEM-Certified Products', value: 12000, suffix: '+', icon: Shield },
  { label: 'Industries Served', value: 28, suffix: '+', icon: BarChart3 },
]

const PRODUCTS = [
  { id: 'dgbb', label: 'Deep Groove Ball Bearings', series: '6000 / 6200 / 6300', active: true },
  { id: 'sph', label: 'Spherical Roller Bearings', series: '22000 / 23000', active: false },
  { id: 'tpr', label: 'Tapered Roller Bearings', series: '30000 / 32000', active: false },
  { id: 'sls', label: 'Industrial Seals & Shields', series: 'HMSA / HMS5', active: false },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
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
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function HeroSection() {
  const [activeProduct, setActiveProduct] = useState('dgbb')

  return (
    <section className="relative bg-skf-blue overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-skf-blue-mid/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Value Proposition */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-sm px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-skf-orange animate-pulse" />
              <span className="text-white/80 text-xs font-medium tracking-wider uppercase">SKF India – Industrial Division 2025</span>
            </div>

            <div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight">
                Engineered for
                <span className="block text-skf-orange">Zero Friction.</span>
                Built for India&apos;s
                <span className="block text-white/70">Heavy Industries.</span>
              </h1>
              <p className="mt-5 text-white/60 text-base lg:text-lg leading-relaxed max-w-lg">
                Direct-to-plant procurement of SKF-certified bearings, seals, and components.
                Instant RFQ. Bulk pricing. Real-time stock visibility.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#rfq" className="btn-primary text-sm">
                Request Instant RFQ Bulk Pricing <ArrowRight size={16} />
              </a>
              <a href="#catalog" className="btn-secondary text-sm">
                Browse Digital Catalog <ChevronRight size={16} />
              </a>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {METRICS.map(({ label, value, suffix, icon: Icon }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-sm p-4 hover:bg-white/10 transition-colors">
                  <div className="flex items-start gap-2.5">
                    <Icon size={18} className="text-skf-orange mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-2xl lg:text-3xl font-black text-white">
                        <Counter target={value} suffix={suffix} />
                      </p>
                      <p className="text-white/50 text-xs mt-0.5 leading-tight">{label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Selector */}
          <div className="relative">
            <div className="bg-white/5 border border-white/15 rounded-sm p-1 shadow-skf-lg">
              {/* Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5 rounded-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-skf-red" />
                  <div className="w-2.5 h-2.5 rounded-full bg-skf-orange" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-white/50 text-xs font-mono">skf-product-configurator.in</span>
                <span className="text-xs text-green-400 font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400" />Live</span>
              </div>

              <div className="p-4 space-y-3">
                {/* Product Type Tabs */}
                <div className="flex flex-col gap-2">
                  {PRODUCTS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setActiveProduct(p.id)}
                      className={`flex items-center justify-between p-3 rounded-sm border transition-all duration-200 text-left ${
                        activeProduct === p.id
                          ? 'bg-skf-red border-skf-red text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold">{p.label}</p>
                        <p className={`text-xs mt-0.5 ${activeProduct === p.id ? 'text-white/70' : 'text-white/40'}`}>Series: {p.series}</p>
                      </div>
                      {activeProduct === p.id && <ChevronRight size={16} className="flex-shrink-0" />}
                    </button>
                  ))}
                </div>

                {/* Preview Spec Card */}
                <div className="mt-2 bg-white/8 border border-white/15 rounded-sm p-4">
                  <p className="section-label text-white/60 text-[10px]">Selected Product Preview</p>
                  <p className="text-white font-bold text-sm mt-1">SKF 6305-2Z/C3 Deep Groove</p>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {[['Bore', '25 mm'], ['OD', '62 mm'], ['Width', '17 mm']].map(([k, v]) => (
                      <div key={k} className="text-center bg-white/5 rounded-sm py-2">
                        <p className="text-white/40 text-[10px] uppercase tracking-wide">{k}</p>
                        <p className="text-white font-bold text-sm">{v}</p>
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 w-full bg-skf-orange hover:bg-orange-600 text-white text-xs font-bold py-2 rounded-sm transition-colors">
                    Quick Add to RFQ →
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-sm shadow-skf-lg px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center bg-green-50 rounded-full">
                <Shield size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs font-black text-skf-text">ISO 9001:2015</p>
                <p className="text-[10px] text-skf-muted">All products certified</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-skf-red via-skf-orange to-skf-blue-light" />
    </section>
  )
}
