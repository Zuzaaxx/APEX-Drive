import { useEffect, useMemo, useState } from 'react'
import Footer from '../components/Footer.jsx'
import ChatWidget from '../components/ChatWidget.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import './Account.css'

const LAP_BARS = [
    { height: 42, highlight: false },
    { height: 58, highlight: false },
    { height: 71, highlight: true },
    { height: 55, highlight: false },
    { height: 48, highlight: false },
    { height: 62, highlight: false },
    { height: 44, highlight: false },
    { height: 53, highlight: false },
]

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
    )
}

function DownloadIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M12 3v12M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 20h16" strokeLinecap="round" />
        </svg>
    )
}

function GearWatermark() {
    return (
        <svg className="account-voucher__watermark" viewBox="0 0 120 120" fill="currentColor" aria-hidden="true">
            <path d="M60 38a22 22 0 1 0 0 44 22 22 0 0 0 0-44zm-32 22a32 32 0 0 1 1.2-8.6l-8.4-4.9 6-10.4 9.7 2.8a32 32 0 0 1 7.4-4.3V22h12v14.6a32 32 0 0 1 7.4 4.3l9.7-2.8 6 10.4-8.4 4.9a32 32 0 0 1 1.2 8.6 32 32 0 0 1-1.2 8.6l8.4 4.9-6 10.4-9.7-2.8a32 32 0 0 1-7.4 4.3V98h-12V83.4a32 32 0 0 1-7.4-4.3l-9.7 2.8-6-10.4 8.4-4.9a32 32 0 0 1-1.2-8.6z" />
        </svg>
    )
}

function Toggle({ id, checked, onChange, label }) {
    return (
        <label className="account-toggle" htmlFor={id}>
            <span className="account-toggle__label">{label}</span>
            <span className="account-toggle__switch">
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => onChange(event.target.checked)}
                />
                <span className="account-toggle__track" aria-hidden="true">
                    <span className="account-toggle__thumb" />
                </span>
            </span>
        </label>
    )
}

function getFirstName(fullName) {
    if (!fullName) return 'KIEROWCO'
    return fullName.trim().split(/\s+/)[0].toUpperCase()
}

function Account({ onNavigate }) {
    const { user, isAuthenticated, updateProfile } = useAuth()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [smsNotifications, setSmsNotifications] = useState(false)
    const [saveMessage, setSaveMessage] = useState('')

    useEffect(() => {
        if (!isAuthenticated) {
            onNavigate('/login')
        }
    }, [isAuthenticated, onNavigate])

    useEffect(() => {
        if (!user) return
        setName(user.name ?? '')
        setEmail(user.email ?? '')
        setEmailNotifications(user.preferences?.emailNotifications ?? true)
        setSmsNotifications(user.preferences?.smsNotifications ?? false)
    }, [user])

    const firstName = useMemo(() => getFirstName(user?.name), [user?.name])

    const handleProfileSubmit = (event) => {
        event.preventDefault()
        updateProfile({
            name: name.trim() || user.name,
            email: email.trim() || user.email,
            preferences: {
                emailNotifications,
                smsNotifications,
            },
        })
        setSaveMessage('Profil zaktualizowany.')
        window.setTimeout(() => setSaveMessage(''), 3000)
    }

    if (!isAuthenticated || !user) {
        return null
    }

    return (
        <>
            <main className="account-page">
                <section className="account-hero" aria-labelledby="account-hero-heading">
                    <div className="account-hero__main">
                        <p className="account-hero__status">
                            <span className="account-hero__accent account-hero__accent--gold" aria-hidden="true" />
                            PRO STATUS: ELITE
                        </p>
                        <h1 id="account-hero-heading" className="account-hero__title">
                            WITAJ, {firstName}!
                        </h1>
                        <p className="account-hero__session">
                            <span className="account-hero__accent account-hero__accent--red" aria-hidden="true" />
                            OSTATNIA SESJA: TOR POZNAŃ | 01:42.342
                        </p>
                    </div>
                    <div className="account-hero__visual">
                        <img
                            src="/images/account-helmet.png"
                            alt=""
                            decoding="async"
                        />
                        <div className="account-hero__visual-overlay" aria-hidden="true" />
                        <div className="account-hero__stats">
                            <div className="account-hero__stat">
                                <span className="account-hero__stat-label">PUNKTY APEX</span>
                                <span className="account-hero__stat-value account-hero__stat-value--gold">
                                    12,450
                                </span>
                            </div>
                            <span className="account-hero__stat-divider" aria-hidden="true" />
                            <div className="account-hero__stat">
                                <span className="account-hero__stat-label">RANGA</span>
                                <span className="account-hero__stat-value account-hero__stat-value--tier">
                                    S-TIER
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="account-page__layout">
                    <div className="account-page__col account-page__col--left">
                        <section className="account-panel" aria-labelledby="account-reservations-heading">
                            <header className="account-panel__header">
                                <h2 id="account-reservations-heading" className="account-panel__title">
                                    TWOJE REZERWACJE
                                </h2>
                                <button type="button" className="account-panel__link">
                                    ZOBACZ ARCHIWUM
                                </button>
                            </header>

                            <article className="account-reservation account-reservation--upcoming">
                                <p className="account-reservation__label account-reservation__label--gold">
                                    NADCHODZĄCA SESJA
                                </p>
                                <h3 className="account-reservation__car">Porsche 911 GT3 RS</h3>
                                <p className="account-reservation__meta">
                                    TOR POZNAŃ | 24.10.2024 | 14:30
                                </p>
                                <button type="button" className="account-reservation__cancel">
                                    <CloseIcon />
                                    ANULUJ
                                </button>
                            </article>

                            <article className="account-reservation account-reservation--completed">
                                <p className="account-reservation__label">ZAKOŃCZONA</p>
                                <h3 className="account-reservation__car">Lamborghini Huracán STO</h3>
                                <p className="account-reservation__meta">SILESIA RING | 12.09.2024</p>
                                <button type="button" className="account-reservation__report">
                                    <DownloadIcon />
                                    POBIERZ RAPORT
                                </button>
                            </article>
                        </section>

                        <section className="account-panel" aria-labelledby="account-vouchers-heading">
                            <header className="account-panel__header">
                                <h2 id="account-vouchers-heading" className="account-panel__title">
                                    AKTYWNE VOUCHERY
                                </h2>
                            </header>

                            <article className="account-voucher account-voucher--active">
                                <div className="account-voucher__body">
                                    <p className="account-voucher__code">KOD: APEX-GT3-FAST</p>
                                    <p className="account-voucher__package">Pakiet Pro: 10 Okrążeń</p>
                                    <p className="account-voucher__expiry">WAŻNE DO: 31.12.2024</p>
                                </div>
                                <div className="account-voucher__action">
                                    <GearWatermark />
                                    <button
                                        type="button"
                                        className="account-voucher__book"
                                        onClick={() => onNavigate('/vouchers')}
                                    >
                                        REZERWUJ
                                    </button>
                                </div>
                            </article>

                            <article className="account-voucher account-voucher--used">
                                <p className="account-voucher__status">WYKORZYSTANY</p>
                                <p className="account-voucher__package">Pakiet Intro: 3 Okrążenia</p>
                                <p className="account-voucher__expiry">ZREALIZOWANO: 12.09.2024</p>
                            </article>
                        </section>
                    </div>

                    <div className="account-page__col account-page__col--right">
                        <section className="account-panel" aria-labelledby="account-performance-heading">
                            <header className="account-panel__header">
                                <h2 id="account-performance-heading" className="account-panel__title">
                                    MOJE OSIĄGI
                                </h2>
                            </header>

                            <div className="account-perf">
                                <div className="account-perf__vmax">
                                    <div className="account-perf__vmax-head">
                                        <span className="account-perf__vmax-label">V-MAX (KM/H)</span>
                                        <span className="account-perf__vmax-value">284</span>
                                    </div>
                                    <div className="account-perf__bar" aria-hidden="true">
                                        <span className="account-perf__bar-fill" style={{ width: '82%' }} />
                                    </div>
                                </div>

                                <div className="account-perf__chart">
                                    <p className="account-perf__chart-label">KONSYSTENCJA OKRĄŻEŃ</p>
                                    <div className="account-perf__bars" role="img" aria-label="Wykres konsystencji okrążeń">
                                        {LAP_BARS.map((bar, index) => (
                                            <span
                                                key={index}
                                                className={`account-perf__bar-col${bar.highlight ? ' account-perf__bar-col--highlight' : ''}`}
                                                style={{ height: `${bar.height}%` }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="account-perf__footer">
                                    <p>G-FORCE MAX: <strong>1.42 G</strong></p>
                                    <p>TOTAL TRACK TIME: <strong>12h 45m</strong></p>
                                </div>
                            </div>
                        </section>

                        <section className="account-panel" aria-labelledby="account-preferences-heading">
                            <header className="account-panel__header">
                                <h2 id="account-preferences-heading" className="account-panel__title">
                                    PREFERENCJE
                                </h2>
                            </header>

                            <div className="account-prefs">
                                <div className="account-prefs__group">
                                    <p className="account-prefs__group-title">POWIADOMIENIA O TERMINACH</p>
                                    <Toggle
                                        id="account-email-notifications"
                                        label="Kanał Email"
                                        checked={emailNotifications}
                                        onChange={setEmailNotifications}
                                    />
                                    <Toggle
                                        id="account-sms-notifications"
                                        label="SMS Alert (Last Minute)"
                                        checked={smsNotifications}
                                        onChange={setSmsNotifications}
                                    />
                                </div>

                                <form className="account-prefs__group" onSubmit={handleProfileSubmit}>
                                    <p className="account-prefs__group-title">TWOJE DANE</p>
                                    <label className="account-field">
                                        <span className="visually-hidden">Imię i nazwisko</span>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                            autoComplete="name"
                                        />
                                    </label>
                                    <label className="account-field">
                                        <span className="visually-hidden">E-mail</span>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            autoComplete="email"
                                        />
                                    </label>
                                    {saveMessage ? (
                                        <p className="account-prefs__feedback" role="status">
                                            {saveMessage}
                                        </p>
                                    ) : null}
                                    <button type="submit" className="account-prefs__submit">
                                        AKTUALIZUJ PROFIL
                                    </button>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
            <ChatWidget />
        </>
    )
}

export default Account
