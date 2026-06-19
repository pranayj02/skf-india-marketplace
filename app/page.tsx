'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import IndustryNav from '@/components/IndustryNav'
import RFQGrid from '@/components/RFQGrid'
import LeadCapture from '@/components/LeadCapture'
import Footer from '@/components/Footer'

export type CartItem = {
  id: string
  name: string
  quantity: number
}

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (id: string, name: string, qty: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id)
      if (existing) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + qty } : i)
      }
      return [...prev, { id, name, quantity: qty }]
    })
  }

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <>
      <Header cartCount={cartCount} cart={cart} />
      <main>
        <HeroSection />
        <IndustryNav />
        <RFQGrid onAddToCart={addToCart} />
        <LeadCapture cart={cart} />
      </main>
      <Footer />
    </>
  )
}
