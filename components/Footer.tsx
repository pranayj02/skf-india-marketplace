import { MapPin, Phone, Mail, Linkedin, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-skf-text text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-skf-red rounded-sm flex-shrink-0">
                <span className="text-white font-black text-sm">SKF</span>
              </div>
              <div>
                <span className="text-white font-bold text-base">Industrial</span>
                <span className="block text-white/40 text-[10px] tracking-[0.15em] uppercase">India Division</span>
              </div>
            </div>
            <p className="text-white/50 text-xs leading-relaxed">
              Official B2B procurement portal for SKF India\'s industrial bearing and sealing solutions.
            </p>
            <div className="flex gap-2 mt-5">
              {[Linkedin, Twitter, Youtube].map((Icon, i) => (
                <button key={i} className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-skf-red rounded-sm transition-colors">
                  <Icon size={14} className="text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 mb-4">Products</h4>
            <ul className="space-y-2">
              {['Deep Groove Ball Bearings', 'Spherical Roller Bearings', 'Tapered Roller Bearings', 'Cylindrical Roller Bearings', 'Industrial Seals', 'Bearing Housings'].map(item => (
                <li key={item}><a href="#" className="text-white/60 hover:text-white text-xs transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 mb-4">Industries</h4>
            <ul className="space-y-2">
              {['Metals & Steel', 'Mining & Minerals', 'Food & Beverage', 'Renewable Energy', 'Automotive & OEM', 'Marine & Offshore'].map(item => (
                <li key={item}><a href="#" className="text-white/60 hover:text-white text-xs transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 mb-4">Contact</h4>
            <div className="space-y-3">
              {[
                [MapPin, 'SKF India Ltd., Pune – 411 013, Maharashtra'],
                [Phone, '+91 20 2710 9200'],
                [Mail, 'industrial@skfindia.com'],
              ].map(([Icon, text], i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Icon size={14} className="text-skf-orange flex-shrink-0 mt-0.5" />
                  <span className="text-white/60 text-xs leading-relaxed">{text as string}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 p-3 bg-white/5 border border-white/10 rounded-sm">
              <p className="text-[10px] font-bold text-skf-orange uppercase tracking-wide mb-1">Support Hours</p>
              <p className="text-white/60 text-xs">Mon – Sat: 9:00 AM – 6:00 PM IST</p>
              <p className="text-white/40 text-[10px] mt-0.5">Emergency: 24×7 WhatsApp hotline</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © 2025 SKF India Ltd. All rights reserved. CIN: L29130MH1961PLC011977
          </p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Use', 'DPDPA Notice'].map(item => (
              <a key={item} href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
