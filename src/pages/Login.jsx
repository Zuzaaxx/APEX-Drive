import { useEffect, useState } from 'react'
import Footer from '../components/Footer.jsx'
import GoogleAuthButton, { AuthDivider } from '../components/GoogleAuthButton.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getFirebaseErrorMessage } from '../lib/firebaseErrors.js'
import './Login.css'

function KeyIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <circle cx="8" cy="8" r="4" />
            <path d="M12 8h10M18 8v4M14 8v3" strokeLinecap="round" strokeLinejoin="round" />
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

function GuestIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12h8" strokeLinecap="round" />
        </svg>
    )
}

function Login({ onNavigate }) {
    const { isAuthenticated, loading, loginWithEmail } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        if (!email.trim() || !password) {
            setError('Podaj adres e-mail i hasło.')
            return
        }

        setSubmitting(true)

        try {
            await loginWithEmail(email, password)
            onNavigate('/account')
        } catch (authError) {
            setError(getFirebaseErrorMessage(authError, 'Logowanie nie powiodło się. Spróbuj ponownie.'))
        } finally {
            setSubmitting(false)
        }
    }

    const handleGuest = () => {
        onNavigate('/')
    }

    const handleAuthSuccess = () => {
        onNavigate('/account')
    }

    useEffect(() => {
        if (!loading && isAuthenticated) {
            onNavigate('/account')
        }
    }, [loading, isAuthenticated, onNavigate])

    if (loading) {
        return null
    }

    return (
        <div className="login-page">
            <main className="login-main">
                <section className="login-visual" aria-labelledby="login-visual-heading">
                    <div className="login-visual__media">
                        <img
                            src="/images/login-cockpit.jpg"
                            alt=""
                            decoding="async"
                        />
                        <div className="login-visual__overlay" aria-hidden="true" />
                        <span className="login-visual__accent" aria-hidden="true" />
                    </div>
                    <div className="login-visual__copy">
                        <h2 id="login-visual-heading" className="login-visual__title">
                            <span className="login-visual__title-line">LIMITLESS</span>
                            <span className="login-visual__title-line login-visual__title-line--red">
                                PRECISION
                            </span>
                        </h2>
                        <p className="login-visual__desc">
                            Zaloguj się do swojego terminala telemetrycznego i przejmij kontrolę
                            nad osiągami.
                        </p>
                    </div>
                </section>

                <section className="login-terminal" aria-labelledby="login-terminal-heading">
                        <div className="login-terminal__card">
                            <header className="login-terminal__header">
                                <span className="login-terminal__icon" aria-hidden="true">
                                    <KeyIcon />
                                </span>
                                <div>
                                    <h1 id="login-terminal-heading" className="login-terminal__title">
                                        TERMINAL LOGOWANIA
                                    </h1>
                                    <p className="login-terminal__subtitle">
                                        WYMAGANA AUTORYZACJA PILOTA
                                    </p>
                                </div>
                            </header>

                            <GoogleAuthButton onSuccess={handleAuthSuccess} />

                            <AuthDivider />

                            <form className="login-form" onSubmit={handleSubmit} noValidate>
                                {error ? (
                                    <p className="login-form__error" role="alert">
                                        {error}
                                    </p>
                                ) : null}

                                <div className="login-form__field">
                                    <label className="login-form__label" htmlFor="driver-email">
                                        EMAIL
                                    </label>
                                    <input
                                        id="driver-email"
                                        className="login-form__input"
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        placeholder="pilot@apexdrive.pro"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </div>

                                <div className="login-form__field">
                                    <div className="login-form__label-row">
                                        <label className="login-form__label" htmlFor="security-key">
                                            HASŁO
                                        </label>
                                        <a className="login-form__forgot" href="#zapomniane-haslo">
                                            ZAPOMNIAŁEM HASŁA
                                        </a>
                                    </div>
                                    <input
                                        id="security-key"
                                        className="login-form__input"
                                        type="password"
                                        name="password"
                                        autoComplete="current-password"
                                        placeholder="••••••••••••"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </div>

                                <button type="submit" className="login-form__submit" disabled={submitting}>
                                    {submitting ? 'LOGOWANIE...' : 'ZALOGUJ'}
                                    <BoltIcon />
                                </button>

                                <button
                                    type="button"
                                    className="login-form__guest"
                                    onClick={handleGuest}
                                >
                                    <GuestIcon />
                                    KONTYNUUJ JAKO GOŚĆ
                                </button>
                            </form>

                            <p className="login-terminal__register">
                                <span className="login-terminal__register-muted">BRAK PROFILU?</span>{' '}
                                <button
                                    type="button"
                                    className="login-terminal__register-link"
                                    onClick={() => onNavigate('/register')}
                                >
                                    ZAREJESTRUJ SIĘ
                                </button>
                            </p>
                        </div>
                </section>
            </main>

            <Footer onNavigate={onNavigate} />
        </div>
    )
}

export default Login
