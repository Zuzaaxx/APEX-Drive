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

function navigateTo(path) {
    if (window.location.pathname === path) {
        return
    }

    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
}

function Footer() {
    const handleFaqClick = (event) => {
        event.preventDefault()
        navigateTo('/bezpieczenstwo')
    }

    return (
        <footer className="home-footer">
            <span className="home-footer__logo">
                APEX DRIVE
            </span>
            <div className="home-footer__end">
                <nav className="home-footer__nav" aria-label="Stopka">
                    <a href="/about" onClick={(e) => handleAboutClick(e)}>
                        O NAS
                    </a>
                    <a href="#regulamin">REGULAMIN</a>
                    <a href="#polityka">POLITYKA PRYWATNOŚCI</a>
                    <a href="#kontakt">KONTAKT</a>
                    <a href="/bezpieczenstwo" onClick={handleFaqClick}>
                        FAQ
                    </a>
                    <a href="/about#kontakt" onClick={(e) => handleAboutClick(e, '#kontakt')}>
                        KONTAKT
                    </a>
                    <a href="#faq">FAQ</a>
                </nav>
                <p className="home-footer__copy">© 2026 APEX DRIVE. ENGINEERED FOR SPEED.</p>
            </div>
        </footer>
  );    
}

export default Footer;
