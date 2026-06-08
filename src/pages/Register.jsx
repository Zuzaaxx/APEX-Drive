import { useState } from 'react'
import './Register.css'

function UserIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M5 20c0-4 3.5-6 7-6s7 2 7 6" strokeLinecap="round" />
        </svg>
    )
}

function AtIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4v4" strokeLinecap="round" />
            <path d="M8 12h8" strokeLinecap="round" />
        </svg>
    )
}

function LockIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <rect x="5" y="11" width="14" height="10" rx="1" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
        </svg>
    )
}

function ShieldIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" strokeLinejoin="round" />
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function BoltIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13 2L4 14h7l-1 8 10-14h-7l0-6z" />
        </svg>
    )
}

const FEATURES = [
    { num: '01', label: 'DOSTĘP DO TORÓW', accent: 'red' },
    { num: '02', label: 'ANALIZA TELEMETRII', accent: 'gold' },
    { num: '03', label: 'EKSKLUZYWNE FLOTY', accent: 'grey' },
]

function Register({ onNavigate }) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [acceptedTerms, setAcceptedTerms] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <div className="register-page">
            <div className="register-bg" aria-hidden="true">
                <img src="/images/login-cockpit.jpg" alt="" decoding="async" />
                <div className="register-bg__overlay" />
            </div>

            <main className="register-main">
                <section className="register-card" aria-labelledby="register-heading">
                    <header className="register-card__header">
                        <h1 id="register-heading" className="register-card__title">
                            DOŁĄCZ DO ELITY
                        </h1>
                        <p className="register-card__subtitle">
                            ZAREJESTRUJ SIĘ W PROGRAMIE KINETIC PRECISION
                        </p>
                    </header>

                    <form className="register-form" onSubmit={handleSubmit} noValidate>
                        <div className="register-form__field">
                            <label className="register-form__label" htmlFor="register-name">
                                IMIĘ I NAZWISKO
                            </label>
                            <div className="register-form__input-wrap">
                                <span className="register-form__icon" aria-hidden="true">
                                    <UserIcon />
                                </span>
                                <input
                                    id="register-name"
                                    className="register-form__input"
                                    type="text"
                                    name="fullName"
                                    autoComplete="name"
                                    placeholder="Jan Kowalski"
                                    value={fullName}
                                    onChange={(event) => setFullName(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="register-form__field">
                            <label className="register-form__label" htmlFor="register-email">
                                EMAIL
                            </label>
                            <div className="register-form__input-wrap">
                                <span className="register-form__icon" aria-hidden="true">
                                    <AtIcon />
                                </span>
                                <input
                                    id="register-email"
                                    className="register-form__input"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="kierowca@apexdrive.pl"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="register-form__row">
                            <div className="register-form__field">
                                <label className="register-form__label" htmlFor="register-password">
                                    HASŁO
                                </label>
                                <div className="register-form__input-wrap">
                                    <span className="register-form__icon" aria-hidden="true">
                                        <LockIcon />
                                    </span>
                                    <input
                                        id="register-password"
                                        className="register-form__input"
                                        type="password"
                                        name="password"
                                        autoComplete="new-password"
                                        placeholder="••••••••••••"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="register-form__field">
                                <label className="register-form__label" htmlFor="register-confirm">
                                    POWTÓRZ HASŁO
                                </label>
                                <div className="register-form__input-wrap">
                                    <span className="register-form__icon" aria-hidden="true">
                                        <ShieldIcon />
                                    </span>
                                    <input
                                        id="register-confirm"
                                        className="register-form__input"
                                        type="password"
                                        name="confirmPassword"
                                        autoComplete="new-password"
                                        placeholder="••••••••••••"
                                        value={confirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <label className="register-form__terms">
                            <input
                                type="checkbox"
                                name="terms"
                                checked={acceptedTerms}
                                onChange={(event) => setAcceptedTerms(event.target.checked)}
                            />
                            <span>
                                Akceptuję{' '}
                                <a href="#regulamin">Regulamin</a> oraz{' '}
                                <a href="#polityka">Politykę Prywatności</a> APEX DRIVE.
                            </span>
                        </label>

                        <button type="submit" className="register-form__submit">
                            ZAŁÓŻ KONTO
                            <BoltIcon />
                        </button>

                        <p className="register-form__login">
                            <span className="register-form__login-muted">MASZ JUŻ KONTO?</span>{' '}
                            <button
                                type="button"
                                className="register-form__login-link"
                                onClick={() => onNavigate('/login')}
                            >
                                ZALOGUJ SIĘ
                            </button>
                        </p>
                    </form>

                    <div className="register-card__progress" aria-hidden="true">
                        <span className="register-card__progress-fill" />
                    </div>
                </section>

                <section className="register-features" aria-label="Korzyści programu">
                    <ul className="register-features__list">
                        {FEATURES.map((feature) => (
                            <li
                                key={feature.num}
                                className={`register-features__item register-features__item--${feature.accent}`}
                            >
                                <span className="register-features__accent" aria-hidden="true" />
                                <span className="register-features__num">{feature.num}</span>
                                <span className="register-features__label">{feature.label}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>

            <footer className="register-footer">
                <div className="register-footer__brand">
                    <span className="register-footer__logo">
                        <span className="register-footer__logo-apex">APEX</span> DRIVE
                    </span>
                    <p className="register-footer__copy">
                        © 2024 APEX DRIVE. KINETIC PRECISION ENGINEERING.
                    </p>
                </div>
                <nav className="register-footer__nav" aria-label="Stopka rejestracji">
                    <a href="#regulamin">REGULAMIN</a>
                    <a href="#polityka">POLITYKA PRYWATNOŚCI</a>
                    <a href="#kontakt">KONTAKT</a>
                    <a href="#faq">FAQ</a>
                </nav>
            </footer>
        </div>
    )
}

export default Register
