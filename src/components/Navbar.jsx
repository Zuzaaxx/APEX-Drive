import { useEffect, useId, useState } from 'react'
import './Navbar.css'

const DEFAULT_NAV_ITEMS = [
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

function MenuIcon({ open }) {
    return (
        <svg
            className="navbar__menu-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
        >
            {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
                <>
                    <path d="M4 7h16" strokeLinecap="round" />
                    <path d="M4 12h16" strokeLinecap="round" />
                    <path d="M4 17h16" strokeLinecap="round" />
                </>
            )}
        </svg>
    )
}

function Navbar({ onNavigate, navItems = DEFAULT_NAV_ITEMS, currentPath = '/' }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const mobileMenuId = useId()

    const closeMenu = () => setMenuOpen(false)

    const handleLogoClick = (event) => {
        event.preventDefault()
        closeMenu()
        onNavigate('/')
    }

    const handleNavClick = (event, href) => {
        if (!href.startsWith('#')) {
            closeMenu()
            return
        }

        event.preventDefault()
        closeMenu()

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
        closeMenu()
        onNavigate('/login')
    }

    const isAuthPage = currentPath === '/login' || currentPath === '/register'

    useEffect(() => {
        if (!menuOpen) {
            return undefined
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false)
            }
        }

        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [menuOpen])

    const renderNavLinks = (linkClassName) => (
        <ul className="navbar__list">
            {navItems.map((item) => (
                <li key={item.label}>
                    <a
                        href={item.href}
                        className={linkClassName}
                        onClick={(event) => handleNavClick(event, item.href)}
                    >
                        {item.label}
                    </a>
                </li>
            ))}
        </ul>
    )

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

            <nav className="navbar__nav navbar__nav--desktop" aria-label="Główne">
                {renderNavLinks()}
            </nav>

            <div className="navbar__actions">
                <button
                    type="button"
                    className={
                        isAuthPage
                            ? 'navbar__login navbar__login--desktop navbar__login--cta'
                            : 'navbar__login navbar__login--desktop'
                    }
                    onClick={handleLoginClick}
                    aria-current={currentPath === '/login' ? 'page' : undefined}
                >
                    {isAuthPage ? 'ZALOGUJ' : 'LOGIN'}
                    {!isAuthPage && <UserIcon />}
                </button>

                <button
                    type="button"
                    className="navbar__menu-toggle"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-expanded={menuOpen}
                    aria-controls={mobileMenuId}
                    aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
                >
                    <MenuIcon open={menuOpen} />
                </button>
            </div>

            <div
                className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}
                aria-hidden={!menuOpen}
            >
                <button
                    type="button"
                    className="navbar__backdrop"
                    onClick={closeMenu}
                    tabIndex={menuOpen ? 0 : -1}
                    aria-label="Zamknij menu"
                />

                <nav
                    id={mobileMenuId}
                    className="navbar__mobile-panel"
                    aria-label="Menu mobilne"
                >
                    <div className="navbar__mobile-header">
                        <button
                            type="button"
                            className="navbar__mobile-close"
                            onClick={closeMenu}
                            aria-label="Zamknij menu"
                        >
                            <MenuIcon open />
                        </button>
                    </div>

                    {renderNavLinks('navbar__mobile-link')}
                    <button
                        type="button"
                        className={
                            isAuthPage
                                ? 'navbar__mobile-login navbar__mobile-login--cta'
                                : 'navbar__mobile-login'
                        }
                        onClick={handleLoginClick}
                        aria-current={currentPath === '/login' ? 'page' : undefined}
                    >
                        {isAuthPage ? 'ZALOGUJ' : 'LOGIN'}
                        {!isAuthPage && <UserIcon />}
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
