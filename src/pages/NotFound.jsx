import Footer from '../components/Footer.jsx'
import './NotFound.css'

const NAV_CARDS = [
    {
        number: '01',
        icon: 'home',
        title: 'POWRÓT NA START',
        desc: 'Strona główna i aktualne promocje.',
        href: '/',
    },
    {
        number: '02',
        icon: 'calendar',
        title: 'REZERWACJE',
        desc: 'Twoje nadchodzące sesje na torze.',
        href: '/account',
    },
    {
        number: '03',
        icon: 'car',
        title: 'FLOTA',
        desc: 'Zobacz nasze maszyny wyścigowe.',
        href: '/cars',
    },
]

function CardIcon({ type }) {
    if (type === 'home') {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z" strokeLinejoin="round" />
            </svg>
        )
    }
    if (type === 'calendar') {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
            </svg>
        )
    }
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M5 15h14l-1.5-5.5a2 2 0 0 0-1.9-1.5H8.4a2 2 0 0 0-1.9 1.5L5 15z" strokeLinejoin="round" />
            <circle cx="7.5" cy="15" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="16.5" cy="15" r="1.5" fill="currentColor" stroke="none" />
        </svg>
    )
}

function NotFound({ onNavigate }) {
    const handleNav = (event, href) => {
        event.preventDefault()
        onNavigate?.(href)
    }

    return (
        <div className="not-found">
            <section className="not-found__hero" aria-labelledby="not-found-heading">
                <div className="not-found__media" aria-hidden="true">
                    <img src="/images/hero-track.jpg" alt="" decoding="async" />
                </div>
                <div className="not-found__overlay" aria-hidden="true" />

                <div className="not-found__content">
                    <p className="not-found__status">
                        <span className="not-found__status-line" aria-hidden="true" />
                        STATUS: 404 — ERROR
                    </p>

                    <h1 id="not-found-heading" className="not-found__title">
                        WYPADŁEŚ
                        <span className="not-found__title-accent">Z TORU</span>
                    </h1>

                    <p className="not-found__desc">
                        SYSTEM TELEMETRII ZGŁASZA BŁĄD LOKALIZACJI. WYBRANA SEKCJA TORU NIE ISTNIEJE
                        LUB ZOSTAŁA TYMCZASOWO WYŁĄCZONA Z UŻYTKU. POWRÓT DO BAZY, ABY ODZYSKAĆ
                        KONTROLĘ.
                    </p>

                    <div className="not-found__cards">
                        {NAV_CARDS.map((card) => (
                            <a
                                key={card.number}
                                href={card.href}
                                className="not-found-card"
                                onClick={(e) => handleNav(e, card.href)}
                            >
                                <span className="not-found-card__icon">
                                    <CardIcon type={card.icon} />
                                </span>
                                <span className="not-found-card__number">{card.number}</span>
                                <span className="not-found-card__title">{card.title}</span>
                                <span className="not-found-card__desc">{card.desc}</span>
                            </a>
                        ))}
                    </div>

                    <div className="not-found__telemetry" aria-label="Status telemetryczny">
                        <div className="not-found-telemetry">
                            <span className="not-found-telemetry__label">LATENCY</span>
                            <span className="not-found-telemetry__value not-found-telemetry__value--gold">
                                14ms
                            </span>
                        </div>
                        <div className="not-found-telemetry">
                            <span className="not-found-telemetry__label">SECTOR</span>
                            <span className="not-found-telemetry__value">UNKNOWN</span>
                        </div>
                        <div className="not-found-telemetry not-found-telemetry--load">
                            <span className="not-found-telemetry__label">ENGINE_LOAD</span>
                            <span className="not-found-telemetry__bar" aria-hidden="true">
                                <span className="not-found-telemetry__segment not-found-telemetry__segment--active" />
                                <span className="not-found-telemetry__segment not-found-telemetry__segment--active" />
                                <span className="not-found-telemetry__segment not-found-telemetry__segment--active" />
                                <span className="not-found-telemetry__segment not-found-telemetry__segment--active" />
                                <span className="not-found-telemetry__segment" />
                                <span className="not-found-telemetry__segment" />
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer onNavigate={onNavigate} />
        </div>
    )
}

export default NotFound
