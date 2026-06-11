import { useEffect, useMemo, useRef, useState } from 'react'
import { CARS } from '../data/cars.js'
import Footer from '../components/Footer.jsx'
import ChatWidget from '../components/ChatWidget.jsx'
import './Notify.css'

const NOTIFY_META = {
    'porsche-911-gt3-rs': { code: '911_GT3_RS', waitlist: 42, eta: '48–72h' },
    'ferrari-sf90-stradale': { code: 'SF90', waitlist: 31, eta: '36–60h' },
    'lamborghini-sto': { code: 'STO', waitlist: 24, eta: '24–48h' },
    'mclaren-720s': { code: '720S', waitlist: 27, eta: '36–60h' },
}

const NOTIFY_CARS = CARS.map((car) => ({
    id: car.slug,
    name: car.name,
    image: car.image,
    ...NOTIFY_META[car.slug],
}))

const DATE_PREFS = [
    { id: 'weekdays', label: 'DNI ROBOCZE' },
    { id: 'weekend', label: 'WEEKENDY' },
    { id: 'first', label: 'NAJBLIŻSZY WOLNY TERMIN' },
]

function getInitialCarId() {
    const carParam = new URLSearchParams(window.location.search).get('car')
    if (carParam && NOTIFY_CARS.some((car) => car.id === carParam)) {
        return carParam
    }
    return NOTIFY_CARS[0]?.id ?? 'porsche-911-gt3-rs'
}

function isValidEmail(value) {
    const trimmed = value.trim()
    if (!trimmed) return false
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)
}

function getWaitlistLabel(count) {
    const abs = Math.abs(count)
    const mod10 = abs % 10
    const mod100 = abs % 100

    if (abs === 1) {
        return { noun: 'osoba', verb: 'oczekuje' }
    }

    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
        return { noun: 'osoby', verb: 'oczekują' }
    }

    return { noun: 'osób', verb: 'oczekuje' }
}

function InfoIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 10v6M12 7h.01" strokeLinecap="round" />
        </svg>
    )
}

function SettingsIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path
                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                strokeLinecap="round"
            />
        </svg>
    )
}

function BoltIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
    )
}

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12l5 5L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function ChevronLeftIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function ChevronRightIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function Notify({ onNavigate }) {
    const carouselRef = useRef(null)
    const [email, setEmail] = useState('')
    const [selectedCar, setSelectedCar] = useState(getInitialCarId)
    const [datePrefs, setDatePrefs] = useState(['weekend'])
    const [alertCode, setAlertCode] = useState('')
    const [emailError, setEmailError] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [codeChecked, setCodeChecked] = useState(false)

    const selectedIndex = useMemo(
        () => Math.max(0, NOTIFY_CARS.findIndex((car) => car.id === selectedCar)),
        [selectedCar],
    )

    const activeCar = useMemo(
        () => NOTIFY_CARS[selectedIndex] ?? NOTIFY_CARS[0],
        [selectedIndex],
    )

    const waitlistLabel = useMemo(
        () => getWaitlistLabel(activeCar.waitlist),
        [activeCar.waitlist],
    )

    const scrollToCarIndex = (index) => {
        const carousel = carouselRef.current
        if (!carousel) return
        const card = carousel.children[index]
        card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }

    const selectCarByIndex = (index) => {
        const car = NOTIFY_CARS[index]
        if (!car) return
        setSelectedCar(car.id)
        scrollToCarIndex(index)
    }

    const goToPrevCar = () => {
        const nextIndex = (selectedIndex - 1 + NOTIFY_CARS.length) % NOTIFY_CARS.length
        selectCarByIndex(nextIndex)
    }

    const goToNextCar = () => {
        const nextIndex = (selectedIndex + 1) % NOTIFY_CARS.length
        selectCarByIndex(nextIndex)
    }

    useEffect(() => {
        scrollToCarIndex(selectedIndex)
    }, [])

    const demandPercent = 98

    const toggleDatePref = (id) => {
        setDatePrefs((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
        )
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        if (emailError) {
            setEmailError('')
        }
        if (submitted) {
            setSubmitted(false)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const trimmedEmail = email.trim()

        if (!trimmedEmail) {
            setEmailError('Podaj adres e-mail.')
            setSubmitted(false)
            return
        }

        if (!isValidEmail(trimmedEmail)) {
            setEmailError('Wprowadź poprawny adres e-mail, np. twoj@email.pl')
            setSubmitted(false)
            return
        }

        setEmailError('')
        setSubmitted(true)
    }

    const handleCheckCode = (event) => {
        event.preventDefault()
        setCodeChecked(true)
    }

    return (
        <>
            <main className="notify-page">
                <header className="notify-page__hero">
                    <p className="notify-page__eyebrow">
                        <span className="notify-page__eyebrow-dot" aria-hidden="true" />
                        PRIORYTETOWY DOSTĘP
                    </p>
                    <h1 className="notify-page__title">POWIADOM MNIE</h1>
                    <p className="notify-page__lead">
                        System powiadomień o dostępności terminów w czasie rzeczywistym. Subskrybenci
                        techniczni otrzymują priorytetowy dostęp do zwolnionych slotów floty.
                    </p>
                </header>

                <div className="notify-page__layout">
                    <form className="notify-page__form" onSubmit={handleSubmit} noValidate>
                        <div className="notify-page__step">
                            <label className="notify-page__step-label" htmlFor="notify-email">
                                01 // ADRES E-MAIL
                            </label>
                            <input
                                id="notify-email"
                                className={`notify-page__input${emailError ? ' notify-page__input--error' : ''}`}
                                type="email"
                                placeholder="TWOJ@EMAIL.PL"
                                value={email}
                                onChange={handleEmailChange}
                                aria-invalid={emailError ? 'true' : undefined}
                                aria-describedby={emailError ? 'notify-email-error' : undefined}
                                autoComplete="email"
                                required
                            />
                            {emailError && (
                                <p id="notify-email-error" className="notify-page__input-error" role="alert">
                                    {emailError}
                                </p>
                            )}
                        </div>

                        <div className="notify-page__step">
                            <span className="notify-page__step-label">02 // WYBÓR MASZYNY</span>
                            <div className="notify-page__carousel">
                                <button
                                    type="button"
                                    className="notify-page__carousel-btn notify-page__carousel-btn--prev"
                                    onClick={goToPrevCar}
                                    aria-label="Poprzedni samochód"
                                >
                                    <ChevronLeftIcon />
                                </button>
                                <div className="notify-page__carousel-viewport">
                                    <div
                                        ref={carouselRef}
                                        className="notify-page__cars"
                                        role="radiogroup"
                                        aria-label="Wybór maszyny"
                                    >
                                        {NOTIFY_CARS.map((car, index) => {
                                            const isActive = selectedCar === car.id
                                            return (
                                                <button
                                                    key={car.id}
                                                    type="button"
                                                    role="radio"
                                                    aria-checked={isActive}
                                                    className={`notify-page__car${isActive ? ' notify-page__car--active' : ''}`}
                                                    onClick={() => selectCarByIndex(index)}
                                                >
                                                    <span className="notify-page__car-image">
                                                        <img
                                                            src={car.image}
                                                            alt={car.name}
                                                            loading="lazy"
                                                        />
                                                    </span>
                                                    <span className="notify-page__car-info">
                                                        <span className="notify-page__car-name">{car.name}</span>
                                                        <span className="notify-page__car-code">{car.code}</span>
                                                    </span>
                                                    {isActive && (
                                                        <span className="notify-page__car-check" aria-hidden="true">
                                                            <CheckIcon />
                                                        </span>
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="notify-page__carousel-btn notify-page__carousel-btn--next"
                                    onClick={goToNextCar}
                                    aria-label="Następny samochód"
                                >
                                    <ChevronRightIcon />
                                </button>
                            </div>
                            <div className="notify-page__carousel-dots" role="tablist" aria-label="Nawigacja karuzeli">
                                {NOTIFY_CARS.map((car, index) => (
                                    <button
                                        key={car.id}
                                        type="button"
                                        role="tab"
                                        className={`notify-page__carousel-dot${index === selectedIndex ? ' notify-page__carousel-dot--active' : ''}`}
                                        aria-label={car.name}
                                        aria-selected={index === selectedIndex}
                                        onClick={() => selectCarByIndex(index)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="notify-page__step">
                            <span className="notify-page__step-label">03 // PREFEROWANE DATY</span>
                            <div className="notify-page__dates">
                                {DATE_PREFS.map((pref) => {
                                    const isChecked = datePrefs.includes(pref.id)
                                    return (
                                        <label
                                            key={pref.id}
                                            className={`notify-page__date${isChecked ? ' notify-page__date--checked' : ''}`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => toggleDatePref(pref.id)}
                                            />
                                            <span className="notify-page__date-box" aria-hidden="true">
                                                {isChecked && <CheckIcon />}
                                            </span>
                                            <span className="notify-page__date-label">{pref.label}</span>
                                        </label>
                                    )
                                })}
                            </div>
                        </div>

                        <button type="submit" className="notify-page__submit">
                            AKTYWUJ POWIADOMIENIE
                            <BoltIcon />
                        </button>

                        {submitted && (
                            <p className="notify-page__success" role="status">
                                Powiadomienie aktywowane. Sprawdź skrzynkę e-mail w ciągu kilku minut.
                            </p>
                        )}

                        <p className="notify-page__disclaimer">
                            Klikając przycisk, wyrażasz zgodę na otrzymywanie powiadomień elektronicznych
                            dotyczących dostępności terminów APEX Drive.
                        </p>
                    </form>

                    <aside className="notify-page__sidebar">
                        <div className="notify-page__panel notify-page__panel--info">
                            <span className="notify-page__panel-icon notify-page__panel-icon--gold">
                                <InfoIcon />
                            </span>
                            <div>
                                <h2 className="notify-page__panel-title">JAK TO DZIAŁA?</h2>
                                <p className="notify-page__panel-text">
                                    System monitoruje status floty co 60 sekund. Gdy pojawi się wolny termin
                                    pasujący do Twoich preferencji, otrzymasz powiadomienie SMS lub e-mail w ciągu
                                    2 minut od zwolnienia terminu.
                                </p>
                            </div>
                        </div>

                        <div className="notify-page__panel">
                            <span className="notify-page__panel-icon">
                                <SettingsIcon />
                            </span>
                            <div>
                                <h2 className="notify-page__panel-title">ZARZĄDZAJ POWIADOMIENIAMI</h2>
                                <p className="notify-page__panel-text">
                                    Nie potrzebujesz konta — zarządzaj powiadomieniami za pomocą kodu lub linku
                                    wysłanego na e-mail po aktywacji.
                                </p>
                                <form className="notify-page__code-form" onSubmit={handleCheckCode}>
                                    <input
                                        className="notify-page__code-input"
                                        type="text"
                                        placeholder="KOD_POWIADOMIENIA"
                                        value={alertCode}
                                        onChange={(event) => setAlertCode(event.target.value)}
                                        aria-label="Kod powiadomienia"
                                    />
                                    <button type="submit" className="notify-page__code-btn">
                                        SPRAWDŹ
                                    </button>
                                </form>
                                {codeChecked && (
                                    <p className="notify-page__code-result" role="status">
                                        {alertCode.trim()
                                            ? `Powiadomienie ${alertCode.trim().toUpperCase()} — status: AKTYWNE`
                                            : 'Wprowadź kod powiadomienia, aby sprawdzić status.'}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="notify-page__panel notify-page__panel--feed">
                            <div className="notify-page__feed-head">
                                <span className="notify-page__feed-label">DOSTĘPNOŚĆ NA ŻYWO</span>
                                <span className="notify-page__feed-demand">{demandPercent}% WYSOKIE ZAPOTRZEBOWANIE</span>
                            </div>
                            <div className="notify-page__feed-bar" aria-hidden="true">
                                <span className="notify-page__feed-segment notify-page__feed-segment--full" />
                                <span className="notify-page__feed-segment notify-page__feed-segment--full" />
                                <span className="notify-page__feed-segment notify-page__feed-segment--full" />
                                <span className="notify-page__feed-segment notify-page__feed-segment--partial" />
                            </div>
                            <p className="notify-page__feed-status">
                                Aktualnie{' '}
                                <strong>
                                    {activeCar.waitlist} {waitlistLabel.noun}
                                </strong>{' '}
                                {waitlistLabel.verb} na {activeCar.name}. Przewidywany czas powiadomienia:{' '}
                                <strong>{activeCar.eta}</strong>.
                            </p>
                        </div>
                    </aside>
                </div>

                <section className="notify-page__banner" aria-label="Nadchodzące modele">
                    <img
                        className="notify-page__banner-img"
                        src={activeCar.image}
                        alt={activeCar.name}
                        loading="lazy"
                    />
                    <div className="notify-page__banner-overlay" />
                    <div className="notify-page__banner-content">
                        <p className="notify-page__banner-eyebrow">WKÓRCE DOSTĘPNE</p>
                        <h2 className="notify-page__banner-title">WYDAJNOŚĆ NOWEJ GENERACJI</h2>
                    </div>
                </section>
            </main>
            <Footer onNavigate={onNavigate} />
            <ChatWidget />
        </>
    )
}

export default Notify
