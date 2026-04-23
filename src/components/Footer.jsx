import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer glass-card p-4 md:p-8 mt-8 w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
          <div className="footer-brand">
            <h4 className="text-base md:text-lg font-bold divine-serif gold-text">Krishna AI</h4>
            <p className="text-sm text-divine-muted max-w-xs mt-1">Divine guidance from the Bhagavad Gita — ask, read, reflect.</p>
          </div>

          <nav className="footer-links flex flex-wrap gap-4 md:gap-6 justify-center">
            <Link href="/chat" className="text-sm text-divine-muted hover:text-divine-gold">Chat</Link>
            <Link href="/gita" className="text-sm text-divine-muted hover:text-divine-gold">Gita</Link>
            <Link href="/search" className="text-sm text-divine-muted hover:text-divine-gold">Search</Link>
            <Link href="/about" className="text-sm text-divine-muted hover:text-divine-gold">About</Link>
            <Link href="/privacy" className="text-sm text-divine-muted hover:text-divine-gold">Privacy</Link>
          </nav>

          <div className="footer-social text-right">
            <div className="text-sm text-divine-muted">Stay connected</div>
            <div className="flex gap-3 mt-2">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-divine-muted hover:text-divine-gold" aria-label="Twitter">🐦</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-divine-muted hover:text-divine-gold" aria-label="GitHub">💻</a>
              <a href="/manifest.json" className="text-divine-muted hover:text-divine-gold" aria-label="Manifest">🔖</a>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/6 pt-4 text-center text-xs text-divine-muted">© {new Date().getFullYear()} Krishna AI — Built with devotion</div>
      </div>
    </footer>
  )
}
