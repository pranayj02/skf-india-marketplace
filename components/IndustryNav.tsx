'use client'

import { useState } from 'react'
import { Cog, Mountain, Leaf, Zap, Factory, Ship, ChevronRight } from 'lucide-react'

const INDUSTRIES = [
  {
    id: 'metals',
    label: 'Metals & Steel',
    icon: Factory,
    desc: 'Rolling mills, continuous casting, hot/cold rolling lines',
    products: '3,200+',
    color: 'from-slate-600 to-slate-800',
    accent: '#64748B',
  },
  {
    id: 'mining',
    label: 'Mining & Minerals',
    icon: Mountain,
    desc: 'Crushers, conveyors, vibrating screens, excavators',
    products: '2,800+',
    color: 'from-amber-700 to-amber-900',
    accent: '#B45309',
  },
  {
    id: 'food',
    label: 'Food & Beverage',
    icon: Leaf,
    desc: 'Hygienic bearings, food-grade grease, washdown solutions',
    products: '1,400+',
    color: 'from-green-600 to-green-800',
    accent: '#16A34A',
  },
  {
    id: 'renewable',
    label: 'Renewable Energy',
    icon: Zap,
    desc: 'Wind turbine main shafts, gearboxes, generators',
    products: '900+',
    color: 'from-sky-500 to-sky-700',
    accent: '#0284C7',
  },
  {
    id: 'auto',
    label: 'Automotive & OEM',
    icon: Cog,
    desc: 'Wheel hub units, gearbox bearings, driveline solutions',
    products: '5,100+',
    color: 'from-skf-blue to-skf-blue-mid',
    accent: '#003366',
  },
  {
    id: 'marine',
    label: 'Marine & Offshore',
    icon: Ship,
    desc: 'Corrosion-resistant, high-load marine drive trains',
    products: '640+',
    color: 'from-teal-600 to-teal-800',
    accent: '#0D9488',
  },
]

export default function IndustryNav() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="catalog" className="bg-skf-grey border-y border-skf-border py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="section-label">Industries We Serve</span>
            <h2 className="mt-2 text-2xl lg:text-3xl font-black text-skf-blue tracking-tight">
              Built for Every <span className="text-skf-red">Critical Application</span>
            </h2>
            <p className="mt-2 text-skf-muted text-sm max-w-md">
              Precision-engineered solutions across India&apos;s most demanding industrial sectors.
            </p>
          </div>
          <button className="btn-outline whitespace-nowrap self-start sm:self-auto">View All Industries <ChevronRight size={14} /></button>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {INDUSTRIES.map(({ id, label, icon: Icon, desc, products, color, accent }) => (
            <button
              key={id}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative text-left overflow-hidden rounded-sm border transition-all duration-300 ${
                hovered === id
                  ? 'border-transparent shadow-skf-lg scale-[1.02] -translate-y-0.5'
                  : 'border-skf-border shadow-skf-card hover:border-transparent'
              } bg-white`}
            >
              {/* Top accent bar */}
              <div
                className={`h-1 bg-gradient-to-r ${color} transition-all duration-300 ${
                  hovered === id ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'
                }`}
              />

              <div className="p-5">
                {/* Icon */}
                <div
                  className="w-11 h-11 flex items-center justify-center rounded-sm mb-4 transition-colors duration-300"
                  style={{ backgroundColor: hovered === id ? accent + '18' : '#F4F6F9' }}
                >
                  <Icon size={22} style={{ color: hovered === id ? accent : '#6B7A99' }} className="transition-colors duration-300" />
                </div>

                <h3 className="font-bold text-skf-text text-sm lg:text-base">{label}</h3>
                <p className="text-skf-muted text-xs mt-1.5 leading-relaxed line-clamp-2">{desc}</p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-skf-border">
                  <span className="text-xs font-bold" style={{ color: accent }}>{products} SKUs</span>
                  <span
                    className={`text-xs font-semibold flex items-center gap-1 transition-all duration-300 ${
                      hovered === id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                    }`}
                    style={{ color: accent }}
                  >
                    Browse <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
