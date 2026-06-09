import './Footer.css'

function Footer({ onNavigate }) {
    const handleLinkClick = (event, href) => {
        event.preventDefault()

        if (!onNavigate) {
            window.location.href = href
            return
        }

        const hashIndex = href.indexOf('#')
        const path = hashIndex >= 0 ? href.slice(0, hashIndex) : href
        const hash = hashIndex >= 0 ? href.slice(hashIndex) : ''
        const target = hash ? `${path}${hash}` : path
        const currentPath = window.location.pathname || '/'

        if (currentPath === path && hash) {
            window.history.replaceState({}, '', target)
            document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
            return
        }

        onNavigate(target)
    }

    return (
        <footer className="home-footer">
            <span className="home-footer__logo">
                APEX DRIVE
            </span>
            <div className="home-footer__end">
                <nav className="home-footer__nav" aria-label="Stopka">
                    <a href="/about" onClick={(e) => handleLinkClick(e, '/about')}>
                        O NAS
                    </a>
                    <a href="/track" onClick={(e) => handleLinkClick(e, '/track')}>
                        TOR
                    </a>
                    <a href="/kalendarz" onClick={(e) => handleLinkClick(e, '/kalendarz')}>
                        KALENDARZ
                    </a>
                    <a href="/about#kontakt" onClick={(e) => handleLinkClick(e, '/about#kontakt')}>
                        KONTAKT
                    </a>
                    <a href="/bezpieczenstwo" onClick={(e) => handleLinkClick(e, '/bezpieczenstwo')}>
                        BEZPIECZEŃSTWO
                    </a>
                    <a href="/bezpieczenstwo" onClick={(e) => handleLinkClick(e, '/bezpieczenstwo')}>
                        FAQ
                    </a>
                </nav>
                <p className="home-footer__copy">© 2026 APEX DRIVE. ENGINEERED FOR SPEED.</p>
            </div>
        </footer>
    )
}

export default Footer
