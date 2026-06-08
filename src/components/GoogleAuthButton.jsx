import { useEffect, useState } from 'react'
import { MOCK_GOOGLE_ACCOUNTS, mockGoogleLogin } from '../lib/googleAuth'
import { useAuth } from '../context/AuthContext'
import './GoogleAuthButton.css'

function GoogleIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
        </svg>
    )
}

function GoogleAccountPicker({ accounts, loading, onSelect, onClose }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose])

    return (
        <div className="google-picker" role="presentation">
            <button
                type="button"
                className="google-picker__backdrop"
                onClick={onClose}
                aria-label="Zamknij wybór konta"
            />
            <div
                className="google-picker__panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="google-picker-title"
            >
                <header className="google-picker__header">
                    <span className="google-picker__brand">
                        <GoogleIcon />
                        Zaloguj się przez Google
                    </span>
                    <h2 id="google-picker-title" className="google-picker__title">
                        Wybierz konto
                    </h2>
                    <p className="google-picker__subtitle">kontynuuj do APEX DRIVE</p>
                </header>

                <ul className="google-picker__list">
                    {accounts.map((account) => (
                        <li key={account.sub}>
                            <button
                                type="button"
                                className="google-picker__account"
                                onClick={() => onSelect(account)}
                                disabled={loading}
                            >
                                <span
                                    className="google-picker__avatar"
                                    style={{ backgroundColor: account.accent }}
                                    aria-hidden="true"
                                >
                                    {account.initials}
                                </span>
                                <span className="google-picker__details">
                                    <span className="google-picker__name">{account.name}</span>
                                    <span className="google-picker__email">{account.email}</span>
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>

                {loading ? (
                    <p className="google-picker__loading" role="status">
                        Łączenie z kontem Google...
                    </p>
                ) : null}
            </div>
        </div>
    )
}

function GoogleAuthButton({ onSuccess, label = 'KONTYNUUJ Z GOOGLE', className = '' }) {
    const { loginWithGoogle } = useAuth()
    const [pickerOpen, setPickerOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleAccountSelect = async (account) => {
        setLoading(true)
        setError('')

        try {
            const profile = await mockGoogleLogin(account)
            loginWithGoogle(profile)
            setPickerOpen(false)
            onSuccess?.()
        } catch {
            setError('Logowanie przez Google nie powiodło się. Spróbuj ponownie.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className={`google-auth ${className}`.trim()}>
                <button
                    type="button"
                    className="google-auth__button"
                    onClick={() => setPickerOpen(true)}
                    disabled={loading}
                >
                    <span className="google-auth__icon" aria-hidden="true">
                        <GoogleIcon />
                    </span>
                    {loading ? 'ŁĄCZENIE...' : label}
                </button>
                {error ? (
                    <p className="google-auth__error" role="alert">
                        {error}
                    </p>
                ) : null}
            </div>

            {pickerOpen ? (
                <GoogleAccountPicker
                    accounts={MOCK_GOOGLE_ACCOUNTS}
                    loading={loading}
                    onSelect={handleAccountSelect}
                    onClose={() => {
                        if (!loading) {
                            setPickerOpen(false)
                        }
                    }}
                />
            ) : null}
        </>
    )
}

export function AuthDivider({ label = 'LUB' }) {
    return (
        <div className="auth-divider" aria-hidden="true">
            <span className="auth-divider__line" />
            <span className="auth-divider__label">{label}</span>
            <span className="auth-divider__line" />
        </div>
    )
}

export default GoogleAuthButton
