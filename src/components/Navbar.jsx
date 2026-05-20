import './Navbar.css'

export const DEFAULT_NAV_ITEMS = [
    { label: 'VOUCHERY', href: '#vouchery' },
    { label: 'SAMOCHODY', href: '#samochody' },
    { label: 'SZKOLENIA', href: '#szkolenia' },
    { label: 'BEZPIECZEŃSTWO', href: '#bezpieczenstwo' },
]

function UserIcon() {
    return (
        <svg
            className="navbar__user-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
        >
            <circle cx="12" cy="8" r="4" />
            <path d="M5 20c0-4 3.5-6 7-6s7 2 7 6" strokeLinecap="round" />
        </svg>
    )
}

function Navbar({ onNavigate, navItems = DEFAULT_NAV_ITEMS, currentPath = '/' }) {
    const handleLogoClick = (event) => {
        event.preventDefault()
        onNavigate('/')
    }

    const handleNavClick = (event, href) => {
        if (!href.startsWith('#')) {
            return
        }

        event.preventDefault()

        if (currentPath !== '/') {
            onNavigate('/')
            window.setTimeout(() => {
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
            }, 50)
            return
        }

        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleLoginClick = () => {
        onNavigate('/login')
    }

    return (
        <header className="navbar">
            <a
                href="/"
                className="navbar__logo"
                aria-label="APEX DRIVE — strona główna"
                onClick={handleLogoClick}
            >
                <span className="navbar__logo-apex">APEX</span>
                <span className="navbar__logo-drive">DRIVE</span>
            </a>

            <nav className="navbar__nav" aria-label="Główne">
                <ul className="navbar__list">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <a
                                href={item.href}
                                onClick={(event) => handleNavClick(event, item.href)}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <button
                type="button"
                className="navbar__login"
                onClick={handleLoginClick}
                aria-current={currentPath === '/login' ? 'page' : undefined}
            >
                LOGIN
                <UserIcon />
            </button>
        </header>
    )
}

export default Navbar
