import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative mt-32 pb-16 overflow-hidden">
      {/* Decorative Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-sm shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                🪶
              </div>
              <h4 className="text-2xl font-bold divine-serif gold-text">Krishna AI</h4>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
              Bridging ancient wisdom with modern technology. Receive divine guidance from the Shrimad Bhagavad Gita, anytime, anywhere.
            </p>
            <div className="flex gap-4">
              {['🐦', '💻', '📷', '✉️'].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 transition-all text-sm grayscale hover:grayscale-0">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Navigation</h5>
            <nav className="flex flex-col gap-4">
              {[
                { name: 'Divine Chat', href: '/chat' },
                { name: 'Gita Chapters', href: '/chapter' },
                { name: 'Meditation', href: '/meditation' },
                { name: 'Daily Wisdom', href: '/shlokas' }
              ].map((link) => (
                <Link key={link.name} href={link.href} className="text-sm text-slate-400 hover:text-[#D4AF37] transition-colors font-light">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Resources</h5>
            <nav className="flex flex-col gap-4">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <Link key={link.name} href={link.href} className="text-sm text-slate-400 hover:text-[#D4AF37] transition-colors font-light">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
            © {new Date().getFullYear()} Krishna AI — Built with devotion
          </p>
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></div>
             <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Sacred Digital Presence</span>
          </div>
        </div>
      </div>
      
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-t from-[#D4AF37]/[0.02] to-transparent pointer-events-none"></div>
    </footer>
  )
}
