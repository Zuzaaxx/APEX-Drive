import '../pages/Start.css'

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
                VELOCITY PERFORMANCE.
            </span>
            <div className="home-footer__end">
                <nav className="home-footer__nav" aria-label="Stopka">
                    <a href="#regulamin">REGULAMIN</a>
                    <a href="#polityka">POLITYKA PRYWATNOŚCI</a>
                    <a href="#kontakt">KONTAKT</a>
                    <a href="/bezpieczenstwo" onClick={handleFaqClick}>
                        FAQ
                    </a>
                </nav>
                <p className="home-footer__copy">© 2024 VELOCITY PERFORMANCE. ENGINEERED FOR SPEED.</p>
            </div>
        </footer>
    )
}

export default Footer
