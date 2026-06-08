import './Footer.css'

function Footer({ onNavigate }) {
    const handleAboutClick = (event, hash = '') => {
        event.preventDefault()

        const currentPath = window.location.pathname || '/'
        const target = hash ? `/about${hash}` : '/about'

        if (currentPath === '/about') {
            if (hash) {
                window.history.replaceState({}, '', `/about${hash}`)
                document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
            } else {
                window.history.replaceState({}, '', '/about')
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            return
        }

        if (onNavigate) {
            onNavigate(target)
            return
        }

        window.location.href = target
    }

    return (
        <footer className="home-footer" id="bezpieczenstwo">
            <span className="home-footer__logo">
                VELOCITY PERFORMANCE.
            </span>
            <div className="home-footer__end">
                <nav className="home-footer__nav" aria-label="Stopka">
                    <a href="/about" onClick={(e) => handleAboutClick(e)}>
                        O NAS
                    </a>
                    <a href="#regulamin">REGULAMIN</a>
                    <a href="#polityka">POLITYKA PRYWATNOŚCI</a>
                    <a href="/about#kontakt" onClick={(e) => handleAboutClick(e, '#kontakt')}>
                        KONTAKT
                    </a>
                    <a href="#faq">FAQ</a>
                </nav>
                <p className="home-footer__copy">© 2024 VELOCITY PERFORMANCE. ENGINEERED FOR SPEED.</p>
            </div>
        </footer>
    )
}

export default Footer
