import { useMemo } from 'react'
import Footer from '../components/Footer.jsx'
import ChatWidget from '../components/ChatWidget.jsx'
import { readConfirmation } from '../lib/checkoutOrder.js'
import './Confirmation.css'

const REMINDERS = [
    {
        title: 'WYGODNE BUTY',
        desc: 'Płaska podeszwa dla lepszego czucia pedałów na torze.',
        accent: 'red',
    },
    {
        title: 'PRAWO JAZDY',
        desc: 'Wymagany oryginał dokumentu przy rejestracji w biurze zawodów.',
        accent: 'gold',
    },
    {
        title: 'NASTAWIENIE',
        desc: 'Skupienie i gotowość na przeciążenia boczne podczas sesji.',
        accent: 'amber',
    },
]

const QR_PATTERN = [
    1, 1, 1, 0, 1, 1, 1,
    1, 0, 1, 1, 0, 1, 0,
    1, 0, 1, 0, 1, 0, 1,
    0, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 1, 0,
    1, 1, 0, 0, 1, 0, 1,
    1, 1, 1, 0, 1, 1, 1,
]

function CheckBadgeIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function CalendarIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
        </svg>
    )
}

function PinIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.5" />
        </svg>
    )
}

function UserIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M5 20c0-4 3.5-6 7-6s7 2 7 6" strokeLinecap="round" />
        </svg>
    )
}

function DownloadIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M12 4v10M8 10l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 18h16" strokeLinecap="round" />
        </svg>
    )
}

function HeadsetIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
            <rect x="3" y="14" width="4" height="6" rx="1" />
            <rect x="17" y="14" width="4" height="6" rx="1" />
        </svg>
    )
}

function CompassIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M14.5 9.5L10 14l4.5-4.5z" fill="currentColor" stroke="none" />
        </svg>
    )
}

function Confirmation({ onNavigate }) {
    const confirmation = useMemo(() => readConfirmation(), [])

    if (!confirmation) {
        return (
            <>
                <main className="confirmation">
                    <div className="confirmation__empty">
                        <h1>Brak potwierdzenia</h1>
                        <p>Nie znaleziono danych rezerwacji. Złóż zamówienie, aby zobaczyć potwierdzenie.</p>
                        <button type="button" className="confirmation__back-btn" onClick={() => onNavigate('/cars')}>
                            Wróć do oferty
                        </button>
                    </div>
                </main>
                <Footer />
                <ChatWidget />
            </>
        )
    }

    const handleDownloadPdf = () => {
        alert(`Pobieranie PDF potwierdzenia: ${confirmation.reservationId}`)
    }

    const handleAddToCalendar = () => {
        alert(`Dodawanie do kalendarza: ${confirmation.sessionDate}`)
    }

    return (
        <>
            <main className="confirmation">
                <header className="confirmation__hero">
                    <span className="confirmation__hero-icon" aria-hidden="true">
                        <CheckBadgeIcon />
                    </span>
                    <h1 className="confirmation__hero-title">DZIĘKUJEMY ZA REZERWACJĘ</h1>
                    <p className="confirmation__hero-id">
                        ID REZERWACJI: {confirmation.reservationId}
                    </p>
                </header>

                <div className="confirmation__layout">
                    <section className="confirmation__trip" aria-labelledby="confirmation-trip-title">
                        <h2 id="confirmation-trip-title" className="confirmation__section-label">
                            SZCZEGÓŁY WYJAZDU
                        </h2>

                        <article className="confirmation__trip-card">
                            <div className="confirmation__product">
                                <span className="confirmation__product-label">{confirmation.productLabel}</span>
                                <h3 className="confirmation__product-title">{confirmation.title}</h3>
                                {confirmation.subtitle && (
                                    <p className="confirmation__product-subtitle">{confirmation.subtitle}</p>
                                )}
                            </div>

                            <ul className="confirmation__facts">
                                <li>
                                    <CalendarIcon />
                                    <span>{confirmation.sessionDate}</span>
                                </li>
                                <li>
                                    <PinIcon />
                                    <span>{confirmation.location}</span>
                                </li>
                                <li>
                                    <UserIcon />
                                    <span>Instruktor: {confirmation.instructor}</span>
                                </li>
                            </ul>
                        </article>

                        <div className="confirmation__reminders">
                            <h3 className="confirmation__reminders-title">O CZYM WARTO PAMIĘTAĆ</h3>
                            <div className="confirmation__reminder-list">
                                {REMINDERS.map((item) => (
                                    <article
                                        key={item.title}
                                        className={`confirmation__reminder confirmation__reminder--${item.accent}`}
                                    >
                                        <p className="confirmation__reminder-title">{item.title}</p>
                                        <p className="confirmation__reminder-desc">{item.desc}</p>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <div className="confirmation__map">
                            <img src="/images/hero-track.jpg" alt="" loading="lazy" />
                            <div className="confirmation__map-overlay" aria-hidden="true" />
                            <span className="confirmation__map-badge">
                                <CompassIcon />
                                {confirmation.locationMap}
                            </span>
                        </div>
                    </section>

                    <aside className="confirmation__pass" aria-labelledby="confirmation-pass-title">
                        <article className="confirmation__pass-card">
                            <p className="confirmation__pass-eyebrow">DOSTĘP KIEROWCY / PASAŻERA</p>
                            <h2 id="confirmation-pass-title" className="confirmation__pass-title">
                                TWOJA KARTA WSTĘPU
                            </h2>

                            <div className="confirmation__qr" aria-label={`Kod QR rezerwacji ${confirmation.reservationId}`}>
                                <div className="confirmation__qr-grid">
                                    {QR_PATTERN.map((cell, index) => (
                                        <span
                                            key={index}
                                            className={`confirmation__qr-cell confirmation__qr-cell--${cell ? 'on' : 'off'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <p className="confirmation__pass-note">
                                Okaż ten kod w biurze zawodów na {confirmation.locationMap} przed rozpoczęciem
                                briefingu.
                            </p>

                            <div className="confirmation__pass-actions">
                                <button type="button" className="confirmation__btn confirmation__btn--red" onClick={handleDownloadPdf}>
                                    <DownloadIcon />
                                    POBIERZ PDF
                                </button>
                                <button
                                    type="button"
                                    className="confirmation__btn confirmation__btn--outline"
                                    onClick={handleAddToCalendar}
                                >
                                    <CalendarIcon />
                                    DODAJ DO KALENDARZA
                                </button>
                            </div>
                        </article>

                        <div className="confirmation__support">
                            <span className="confirmation__support-icon" aria-hidden="true">
                                <HeadsetIcon />
                            </span>
                            <div>
                                <p className="confirmation__support-label">MASZ PYTANIA?</p>
                                <a className="confirmation__support-phone" href="tel:+48600123456">
                                    Infolinia APEX: +48 600 123 456
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
            <ChatWidget />
        </>
    )
}

export default Confirmation
