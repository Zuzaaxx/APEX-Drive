import '../pages/Start.css'

function Footer() {
    return (
        <footer className="home-footer" id="bezpieczenstwo">
            <span className="home-footer__logo">
                <span className="home-footer__logo-apex">APEX</span> DRIVE
            </span>
            <div className="home-footer__end">
                <nav className="home-footer__nav" aria-label="Stopka">
                    <a href="#regulamin">REGULAMIN</a>
                    <a href="#polityka">POLITYKA PRYWATNOŚCI</a>
                    <a href="#kontakt">KONTAKT</a>
                    <a href="#faq">FAQ</a>
                </nav>
                <p className="home-footer__copy">© 2024 APEX DRIVE. WSZYSTKIE PRAWA ZASTRZEŻONE.</p>
            </div>
        </footer>
    )
}

export default Footer
