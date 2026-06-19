'use client'

import { useState } from 'react'
import { Plus, Minus, ShoppingCart, Eye, Star, Badge, CheckCircle, Filter, Search } from 'lucide-react'

const PRODUCTS = [
  {
    id: '6305-2Z-C3',
    sku: 'SKF-6305-2Z/C3',
    name: 'Deep Groove Ball Bearing 6305-2Z/C3',
    series: '6300 Series',
    bore: '25 mm',
    od: '62 mm',
    width: '17 mm',
    sealing: 'Metal Shield (2Z)',
    clearance: 'C3 (Greater)',
    load: '11.9 kN',
    speed: '12,000 rpm',
    inStock: true,
    moq: 10,
    tag: 'Best Seller',
    tagColor: 'bg-skf-orange',
  },
  {
    id: '6205-2RS1',
    sku: 'SKF-6205-2RS1',
    name: 'Deep Groove Ball Bearing 6205-2RS1',
    series: '6200 Series',
    bore: '25 mm',
    od: '52 mm',
    width: '15 mm',
    sealing: 'Contact Seal (2RS1)',
    clearance: 'CN (Normal)',
    load: '7.80 kN',
    speed: '9,500 rpm',
    inStock: true,
    moq: 10,
    tag: 'High Demand',
    tagColor: 'bg-skf-red',
  },
  {
    id: '22316-E',
    sku: 'SKF-22316-E/C3',
    name: 'Spherical Roller Bearing 22316 E',
    series: '22000 Series',
    bore: '80 mm',
    od: '170 mm',
    width: '58 mm',
    sealing: 'Open (No Seal)',
    clearance: 'C3 (Greater)',
    load: '304 kN',
    speed: '2,400 rpm',
    inStock: true,
    moq: 4,
    tag: 'Heavy Duty',
    tagColor: 'bg-skf-blue',
  },
  {
    id: '7210-BECBP',
    sku: 'SKF-7210-BECBP',
    name: 'Angular Contact Ball Bearing 7210',
    series: '7200 Series',
    bore: '50 mm',
    od: '90 mm',
    width: '20 mm',
    sealing: 'Open (No Seal)',
    clearance: 'CN (Normal)',
    load: '19.5 kN',
    speed: '8,000 rpm',
    inStock: false,
    moq: 5,
    tag: 'Precision',
    tagColor: 'bg-purple-600',
  },
  {
    id: '32215-J2',
    sku: 'SKF-32215-J2',
    name: 'Tapered Roller Bearing 32215',
    series: '30000 Series',
    bore: '75 mm',
    od: '130 mm',
    width: '33.25 mm',
    sealing: 'Open (No Seal)',
    clearance: 'CN (Normal)',
    load: '101 kN',
    speed: '3,400 rpm',
    inStock: true,
    moq: 6,
    tag: null,
    tagColor: '',
  },
  {
    id: 'NJ2306-ECP',
    sku: 'SKF-NJ2306-ECP',
    name: 'Cylindrical Roller Bearing NJ2306',
    series: 'NJ Series',
    bore: '30 mm',
    od: '72 mm',
    width: '27 mm',
    sealing: 'Open (No Seal)',
    clearance: 'CN (Normal)',
    load: '46.5 kN',
    speed: '6,700 rpm',
    inStock: true,
    moq: 8,
    tag: 'New Stock',
    tagColor: 'bg-green-600',
  },
]

interface RFQGridProps {
  onAddToCart: (id: string, name: string, qty: number) => void
}

export default function RFQGrid({ onAddToCart }: RFQGridProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(PRODUCTS.map(p => [p.id, p.moq]))
  )
  const [added, setAdded] = useState<Record<string, boolean>>({})
  const [search, setSearch] = useState('')

  const setQty = (id: string, delta: number, moq: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(moq, (prev[id] ?? moq) + delta) }))
  }

  const handleAdd = (product: typeof PRODUCTS[0]) => {
    onAddToCart(product.id, product.name, quantities[product.id])
    setAdded(prev => ({ ...prev, [product.id]: true }))
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 2000)
  }

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section id="rfq" className="py-14 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="section-label">Live Product Catalogue</span>
            <h2 className="mt-2 text-2xl lg:text-3xl font-black text-skf-blue tracking-tight">
              Build Your <span className="text-skf-red">RFQ Instantly</span>
            </h2>
            <p className="mt-2 text-skf-muted text-sm">Set quantities, add to cart, and submit bulk enquiry in one step.</p>
          </div>

          {/* Search & Filter */}
          <div className="flex gap-2">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-skf-muted" />
              <input
                type="text"
                placeholder="Search SKU or name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field pl-9 w-56 text-xs py-2.5"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-skf-border rounded-sm text-xs font-medium text-skf-muted hover:border-skf-blue hover:text-skf-blue transition-colors">
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(product => (
            <div
              key={product.id}
              className="card-base flex flex-col hover:shadow-skf hover:border-skf-blue/30 group"
            >
              {/* Card Top */}
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    {product.tag && (
                      <span className={`inline-block text-white text-[10px] font-bold px-2 py-0.5 rounded-sm mb-1.5 ${product.tagColor}`}>
                        {product.tag}
                      </span>
                    )}
                    <h3 className="font-bold text-skf-text text-sm leading-tight">{product.name}</h3>
                    <p className="text-skf-muted text-xs mt-0.5 font-mono">{product.sku}</p>
                  </div>
                  <div className={`flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-sm ${
                    product.inStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                  }`}>
                    {product.inStock ? '● In Stock' : '○ Indent'}
                  </div>
                </div>

                {/* Spec Grid */}
                <div className="grid grid-cols-2 gap-1.5 bg-skf-grey rounded-sm p-3 mb-3">
                  {[
                    ['Bore (ID)', product.bore],
                    ['Outer Dia', product.od],
                    ['Width', product.width],
                    ['Sealing', product.sealing],
                    ['Clearance', product.clearance],
                    ['Dyn. Load', product.load],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-[10px] text-skf-muted uppercase tracking-wide">{k}</p>
                      <p className="text-xs font-semibold text-skf-text mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Qty + Add */}
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between gap-3">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-0">
                    <span className="text-xs text-skf-muted mr-2">Qty:</span>
                    <button
                      onClick={() => setQty(product.id, -product.moq, product.moq)}
                      className="w-8 h-8 flex items-center justify-center border border-skf-border rounded-l-sm hover:bg-skf-grey transition-colors"
                    >
                      <Minus size={12} className="text-skf-muted" />
                    </button>
                    <span className="w-12 h-8 flex items-center justify-center border-y border-skf-border text-sm font-bold text-skf-text bg-white">
                      {quantities[product.id]}
                    </span>
                    <button
                      onClick={() => setQty(product.id, product.moq, product.moq)}
                      className="w-8 h-8 flex items-center justify-center border border-skf-border rounded-r-sm hover:bg-skf-grey transition-colors"
                    >
                      <Plus size={12} className="text-skf-muted" />
                    </button>
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={() => handleAdd(product)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-sm text-xs font-bold transition-all duration-300 ${
                      added[product.id]
                        ? 'bg-green-500 text-white border border-green-500'
                        : 'bg-skf-blue text-white hover:bg-skf-blue-mid border border-skf-blue'
                    }`}
                  >
                    {added[product.id] ? (
                      <><CheckCircle size={13} /> Added!</>
                    ) : (
                      <><ShoppingCart size={13} /> Add to Enquiry</>
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-skf-muted mt-1.5">MOQ: {product.moq} pcs &nbsp;|&nbsp; Max speed: {product.speed}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
