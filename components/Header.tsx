'use client'

import { useState } from 'react'
import { ShoppingCart, ChevronDown, Menu, X, Package, Trash2 } from 'lucide-react'
import type { CartItem } from '@/app/page'

interface HeaderProps {
  cartCount: number
  cart: CartItem[]
}

export default function Header({ cartCount, cart }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-skf-blue border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-skf-red rounded-sm">
              <span className="text-white font-black text-sm tracking-tight">SKF</span>
            </div>
            <div>
              <span className="text-white font-bold text-base tracking-tight">Industrial</span>
              <span className="block text-white/50 text-[10px] tracking-[0.15em] uppercase">India Division</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {['Products', 'Industries', 'Solutions', 'Support'].map(item => (
              <button key={item} className="flex items-center gap-1 px-4 py-2 text-white/80 hover:text-white text-sm font-medium hover:bg-white/10 rounded-sm transition-colors">
                {item} <ChevronDown size={14} className="opacity-60" />
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex btn-primary text-xs px-4 py-2">
              Request RFQ
            </button>

            {/* Cart Button */}
            <div className="relative">
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-sm transition-colors"
                aria-label={`Enquiry cart, ${cartCount} items`}
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-skf-orange text-white text-[10px] font-bold rounded-full animate-bounce">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              {cartOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-skf-border rounded-sm shadow-skf-lg z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-skf-border bg-skf-grey">
                    <span className="text-sm font-bold text-skf-blue">Enquiry Cart</span>
                    <button onClick={() => setCartOpen(false)}><X size={16} className="text-skf-muted" /></button>
                  </div>
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 gap-3">
                      <Package size={36} className="text-skf-border" />
                      <p className="text-sm text-skf-muted">No items added yet</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-skf-border max-h-64 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between px-4 py-3">
                          <div>
                            <p className="text-xs font-semibold text-skf-text truncate max-w-[180px]">{item.name}</p>
                            <p className="text-xs text-skf-muted mt-0.5">Qty: {item.quantity}</p>
                          </div>
                          <span className="text-xs font-bold text-skf-orange bg-orange-50 px-2 py-1 rounded">{item.quantity} pcs</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {cart.length > 0 && (
                    <div className="p-4 border-t border-skf-border">
                      <button className="btn-primary w-full justify-center text-xs py-2.5">Submit Enquiry ({cartCount} items)</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-sm"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden py-3 border-t border-white/10 flex flex-col gap-1">
            {['Products', 'Industries', 'Solutions', 'Support'].map(item => (
              <button key={item} className="text-left px-3 py-2.5 text-white/80 hover:text-white text-sm font-medium hover:bg-white/10 rounded-sm transition-colors">
                {item}
              </button>
            ))}
            <button className="btn-primary mt-2 justify-center">Request RFQ</button>
          </nav>
        )}
      </div>
    </header>
  )
}
