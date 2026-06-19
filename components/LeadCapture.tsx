'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, User, Building2, Phone, MessageSquare, ShieldCheck } from 'lucide-react'
import type { CartItem } from '@/app/page'

interface LeadCaptureProps {
  cart: CartItem[]
}

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function LeadCapture({ cart }: LeadCaptureProps) {
  const [form, setForm] = useState({
    name: '', company: '', whatsapp: '', message: '',
    dpdpa: false, marketing: false
  })
  const [formState, setFormState] = useState<FormState>('idle')

  const hasCart = cart.length > 0
  const generatedMessage = hasCart
    ? `Hi, I'd like to enquire about the following SKF products:\n${cart.map(i => `- ${i.name} (Qty: ${i.quantity})`).join('\n')}`
    : form.message

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.dpdpa) return
    setFormState('loading')
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500))
    setFormState('success')
  }

  return (
    <section className="bg-skf-blue py-16 lg:py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-skf-red/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-skf-orange/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Copy */}
          <div className="pt-2">
            <span className="section-label text-skf-orange">Direct Procurement</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
              Talk to a
              <span className="block text-skf-orange">Bearing Specialist</span>
              in 60 Minutes.
            </h2>
            <p className="mt-4 text-white/60 text-base leading-relaxed">
              Submit your enquiry and get a response from a certified SKF application engineer
              within one business hour. Bulk RFQ support available for OEM and plant procurement.
            </p>

            {/* Trust Signals */}
            <div className="mt-8 space-y-3">
              {[
                ['ISO 9001:2015 certified supply chain', 'All products shipped with factory certification docs'],
                ['60-minute RFQ response guarantee', 'For queries submitted between 9 AM – 6 PM IST'],
                ['Bulk pricing available from 50+ pcs', 'Volume discounts automatically applied for OEMs'],
                ['Pan-India delivery network', 'Same-day dispatch from Mumbai, Chennai, Delhi hubs'],
              ].map(([title, sub]) => (
                <div key={title} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-skf-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-semibold">{title}</p>
                    <p className="text-white/50 text-xs mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            {hasCart && (
              <div className="mt-8 bg-white/8 border border-white/15 rounded-sm p-4">
                <p className="text-xs font-bold text-skf-orange uppercase tracking-wider mb-3">Items in Your Enquiry Cart</p>
                <div className="space-y-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <p className="text-white/80 text-xs truncate max-w-[200px]">{item.name}</p>
                      <span className="text-skf-orange text-xs font-bold ml-2">{item.quantity} pcs</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-sm shadow-skf-lg overflow-hidden">
            <div className="bg-skf-grey border-b border-skf-border px-6 py-4">
              <h3 className="text-skf-blue font-bold text-base">Submit Your Enquiry</h3>
              <p className="text-skf-muted text-xs mt-0.5">All fields marked * are required</p>
            </div>

            {formState === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 gap-4">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <div className="text-center">
                  <h4 className="font-black text-skf-blue text-xl">Enquiry Received!</h4>
                  <p className="text-skf-muted text-sm mt-2">Our team will contact you within 60 minutes via WhatsApp or email.</p>
                </div>
                <button
                  onClick={() => { setFormState('idle'); setForm({ name: '', company: '', whatsapp: '', message: '', dpdpa: false, marketing: false }) }}
                  className="btn-outline mt-2"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-skf-text mb-1.5">Full Name *</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-skf-muted" />
                    <input name="name" required value={form.name} onChange={handleChange}
                      placeholder="e.g. Rajesh Kumar" className="input-field pl-9" />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-semibold text-skf-text mb-1.5">Company Name *</label>
                  <div className="relative">
                    <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-skf-muted" />
                    <input name="company" required value={form.company} onChange={handleChange}
                      placeholder="e.g. Tata Steel Ltd." className="input-field pl-9" />
                  </div>
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-semibold text-skf-text mb-1.5">WhatsApp Number *</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-skf-muted" />
                    <input name="whatsapp" required type="tel" value={form.whatsapp} onChange={handleChange}
                      placeholder="+91 98765 43210" className="input-field pl-9" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-skf-text mb-1.5">Enquiry Message *</label>
                  <div className="relative">
                    <MessageSquare size={14} className="absolute left-3 top-3 text-skf-muted" />
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={hasCart ? generatedMessage : form.message}
                      onChange={handleChange}
                      placeholder="Describe your requirement, product quantities, application..."
                      className="input-field pl-9 resize-none"
                    />
                  </div>
                  {hasCart && (
                    <p className="text-[10px] text-skf-orange mt-1 flex items-center gap-1">
                      <ShieldCheck size={11} /> Auto-populated from your enquiry cart
                    </p>
                  )}
                </div>

                {/* Compliance Checkboxes */}
                <div className="space-y-3 pt-2 border-t border-skf-border">
                  <p className="text-[10px] font-bold text-skf-muted uppercase tracking-wider">Data Privacy & Consent</p>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input type="checkbox" name="dpdpa" required checked={form.dpdpa} onChange={handleChange} className="sr-only" />
                      <div className={`w-4.5 h-4.5 w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-colors ${
                        form.dpdpa ? 'bg-skf-blue border-skf-blue' : 'border-skf-border group-hover:border-skf-blue'
                      }`}>
                        {form.dpdpa && <svg viewBox="0 0 10 8" className="w-3 h-3 text-white fill-current"><path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                    </div>
                    <p className="text-xs text-skf-muted leading-relaxed">
                      <span className="font-semibold text-skf-text">DPDPA / GDPR Consent *: </span>
                      I consent to SKF India processing my personal data to respond to this enquiry, as per the
                      Digital Personal Data Protection Act 2023 and applicable privacy regulations.
                    </p>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input type="checkbox" name="marketing" checked={form.marketing} onChange={handleChange} className="sr-only" />
                      <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-colors ${
                        form.marketing ? 'bg-skf-blue border-skf-blue' : 'border-skf-border group-hover:border-skf-blue'
                      }`}>
                        {form.marketing && <svg viewBox="0 0 10 8" className="w-3 h-3 text-white fill-current"><path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                    </div>
                    <p className="text-xs text-skf-muted leading-relaxed">
                      <span className="font-semibold text-skf-text">Marketing Opt-In (Optional): </span>
                      I agree to receive product updates, pricing alerts, and technical bulletins via WhatsApp and email.
                    </p>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!form.dpdpa || formState === 'loading'}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-sm font-bold text-sm transition-all duration-300 ${
                    !form.dpdpa
                      ? 'bg-skf-border text-skf-muted cursor-not-allowed'
                      : 'btn-primary w-full justify-center'
                  }`}
                >
                  {formState === 'loading' ? (
                    <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" /></svg> Submitting...</>
                  ) : (
                    <><Send size={15} /> Submit Enquiry{hasCart ? ` (${cart.length} products)` : ''}</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
