import { useEffect, useState } from 'react'
import Footer from '../components/Footer.jsx'
import ChatWidget from '../components/ChatWidget.jsx'
import './About.css'

const TRACK_FEATURES = [
    'Tor 2,4 km na wyłączność',
    'Obsługa techniczna i medyczna',
    'Strefa VIP i catering',
    'Nagranie wideo z okrążeń',
]

const FLEET_FEATURES = [
    'Ponad 12 supersamochodów',
    'Ubezpieczenie w cenie',
    'Instruktor przy każdej jeździe',
    'Pełne wyposażenie bezpieczeństwa',
]

const LOCATION_ITEMS = [
    {
        icon: 'pin',
        label: 'ADRES',
        lines: ['ul. Torowa 1', '32-050 Skawina', 'woj. małopolskie'],
    },
    {
        icon: 'car',
        label: 'DOJAZD',
        lines: ['22 min od Rynku Głównego', 'Droga S7 / A4', 'Dojazd oznakowany'],
    },
    {
        icon: 'parking',
        label: 'PARKING',
        lines: ['Bezpłatny parking', '150 miejsc', 'Strefa VIP dla gości'],
    },
]

const STEPS = [
    {
        number: '01',
        title: 'WYBIERZ OPCJĘ',
        text: 'Wynajmij cały tor na wyłączność albo wybierz supersamochód z naszej floty i poczuj prawdziwą moc na asfalcie.',
    },
    {
        number: '02',
        title: 'ZAREZERWUJ TERMIN',
        text: 'Wybierz datę, godzinę i pakiet online. Potwierdzenie otrzymasz natychmiast — bez zbędnej biurokracji.',
    },
    {
        number: '03',
        title: 'PRZYJEDŹ I JEDŹ',
        text: 'Przyjedź 30 minut wcześniej na briefing. Instruktor poprowadzi Cię przez tor — reszta to czysta adrenalina.',
    },
]

const CONTACT_CHANNELS = [
    {
        icon: 'phone',
        label: 'TELEFON',
        lines: ['+48 12 345 67 89', 'Pn–Nd: 8:00 – 20:00'],
        href: 'tel:+48123456789',
    },
    {
        icon: 'mail',
        label: 'E-MAIL',
        lines: ['kontakt@apexdrive.pl', 'rezerwacje@apexdrive.pl'],
        href: 'mailto:kontakt@apexdrive.pl',
    },
    {
        icon: 'clock',
        label: 'GODZINY OTWARCIA',
        lines: ['Tor: codziennie 8:00 – 20:00', 'Biuro: Pn–Pt 9:00 – 17:00'],
    },
]

const MAP_LINK =
    'https://www.google.com/maps/search/?api=1&query=Skawina+tor+wy%C5%9Bcigowy'

function PhoneIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path
                d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5L15.5 12.5 19.5 14v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 6.2 2 2 0 0 1 6.5 4z"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function MailIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function ClockIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function PinIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" strokeLinejoin="round" />
            <circle cx="12" cy="10" r="2.5" />
        </svg>
    )
}

function CarIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M5 15h14l-1.5-5.5a2 2 0 0 0-1.9-1.5H8.4a2 2 0 0 0-1.9 1.5L5 15z" strokeLinejoin="round" />
            <circle cx="7.5" cy="17.5" r="1.5" />
            <circle cx="16.5" cy="17.5" r="1.5" />
        </svg>
    )
}

function ParkingIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M9 8h3.5a2.5 2.5 0 0 1 0 5H9V8z" strokeLinejoin="round" />
        </svg>
    )
}

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12l5 5L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

const LOCATION_ICONS = {
    pin: PinIcon,
    car: CarIcon,
    parking: ParkingIcon,
}

const CONTACT_ICONS = {
    phone: PhoneIcon,
    mail: MailIcon,
    clock: ClockIcon,
}

function About({ onNavigate }) {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const hash = window.location.hash
        if (hash) {
            const timer = window.setTimeout(() => {
                document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
            }, 80)
            return () => window.clearTimeout(timer)
        }

        window.scrollTo(0, 0)
        return undefined
    }, [])

    const handleChange = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmitted(true)
        setForm({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <div className="about-page">
            <section className="about-hero" aria-labelledby="about-hero-heading">
                <div className="about-hero__inner">
                    <div className="about-hero__content">
                        <p className="about-hero__eyebrow">
                            <span className="about-hero__eyebrow-line" aria-hidden="true" />
                            O NAS – TOR WYŚCIGOWY
                        </p>
                        <h1 id="about-hero-heading" className="about-hero__title">
                            TWÓJ TOR.
                            <span className="about-hero__title-line">TWOJE ZASADY.</span>
                        </h1>
                        <p className="about-hero__desc">
                            APEX Drive to profesjonalny tor wyścigowy zaledwie 20 minut od centrum
                            Krakowa. Oferujemy wynajem toru na wyłączność, flotę supersamochodów
                            i szkolenia prowadzone przez certyfikowanych instruktorów GT.
                        </p>
                        <p className="about-hero__tagline">
                            <span>PRECYZJA</span>
                            <span className="about-hero__tagline-dash" aria-hidden="true" />
                            <span>PRĘDKOŚĆ</span>
                            <span className="about-hero__tagline-dash" aria-hidden="true" />
                            <span>LUKSUS</span>
                        </p>
                    </div>
                    <div className="about-hero__media">
                        <div className="about-hero__frame">
                            <img
                                src="/images/cars/lamborghini-huracan-STO.jpg"
                                alt="Lamborghini Huracán STO na torze APEX Drive"
                                loading="eager"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section id="o-nas" className="about-section about-services">
                <div className="about-services__grid">
                    <article className="about-service-card">
                        <div className="about-service-card__media about-service-card__media--bw">
                            <img
                                src="/images/hero-track.jpg"
                                alt="Widok na tor wyścigowy APEX Drive"
                                loading="lazy"
                            />
                        </div>
                        <div className="about-service-card__body">
                            <p className="about-service-card__label">WYNAJEM TORU</p>
                            <h2 className="about-service-card__title">CAŁY TOR DLA CIEBIE.</h2>
                            <p className="about-service-card__desc">
                                Zamknij tor na prywatny event, sesję treningową lub spotkanie firmowe.
                                Pełna infrastruktura, obsługa techniczna i strefa VIP w cenie.
                            </p>
                            <ul className="about-service-card__list">
                                {TRACK_FEATURES.map((item) => (
                                    <li key={item}>
                                        <CheckIcon />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button type="button" className="about-btn about-btn--red about-btn--full">
                                ZAREZERWUJ TOR
                            </button>
                        </div>
                    </article>

                    <article className="about-service-card">
                        <div className="about-service-card__media">
                            <img
                                src="/images/cars/porsche-911.jpg"
                                alt="Porsche 911 GT3 RS z floty APEX Drive"
                                loading="lazy"
                            />
                        </div>
                        <div className="about-service-card__body">
                            <p className="about-service-card__label">FLOTA APEX DRIVE</p>
                            <h2 className="about-service-card__title">WSIĄDŹ ZA KIEROWNICĘ MARZENIA.</h2>
                            <p className="about-service-card__desc">
                                Porsche, Lamborghini, Ferrari, McLaren — wybierz maszynę i poczuj moc
                                na profesjonalnym asfalcie pod okiem doświadczonego instruktora.
                            </p>
                            <ul className="about-service-card__list">
                                {FLEET_FEATURES.map((item) => (
                                    <li key={item}>
                                        <CheckIcon />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                type="button"
                                className="about-btn about-btn--outline-gold about-btn--full"
                                onClick={() => onNavigate?.('/cars')}
                            >
                                WYBIERZ SAMOCHÓD
                            </button>
                        </div>
                    </article>
                </div>
            </section>

            <section className="about-section about-location">
                <div className="about-location__head">
                    <h2 className="about-location__title">20 MINUT OD CENTRUM KRAKOWA</h2>
                    <p className="about-location__lead">
                        Tor APEX Drive znajduje się w Skawinie — dogodny dojazd drogą ekspresową
                        S7 i autostradą A4. Zapraszamy na oględziny i konsultacje.
                    </p>
                </div>

                <div className="about-location__info">
                    {LOCATION_ITEMS.map((item) => {
                        const Icon = LOCATION_ICONS[item.icon]
                        return (
                            <div key={item.label} className="about-info-card">
                                <span className="about-info-card__icon">
                                    <Icon />
                                </span>
                                <p className="about-info-card__label">{item.label}</p>
                                {item.lines.map((line) => (
                                    <p key={line} className="about-info-card__line">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        )
                    })}
                </div>
            </section>

            <section className="about-map-section" aria-label="Mapa dojazdu do toru APEX Drive">
                <div className="about-map">
                    <div className="about-map__canvas" aria-hidden="true">
                        <svg className="about-map__roads" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice">
                            <rect width="1200" height="420" fill="#0a0a0a" />
                            <path d="M0 210 Q300 190 600 210 T1200 210" stroke="#252525" strokeWidth="4" fill="none" />
                            <path d="M300 0 Q320 180 340 420" stroke="#222" strokeWidth="3" fill="none" />
                            <path d="M750 0 Q730 140 710 420" stroke="#222" strokeWidth="3" fill="none" />
                            <path d="M900 0 L880 420" stroke="#1a1a1a" strokeWidth="2" fill="none" />
                            <path d="M150 0 L170 420" stroke="#1a1a1a" strokeWidth="2" fill="none" />
                            <path d="M500 80 L700 340" stroke="#2a2a2a" strokeWidth="2" fill="none" />
                            <circle cx="600" cy="210" r="10" fill="#be0000" />
                            <circle cx="600" cy="210" r="22" fill="none" stroke="#be0000" strokeWidth="1.5" opacity="0.45" />
                            <circle cx="600" cy="210" r="36" fill="none" stroke="#be0000" strokeWidth="1" opacity="0.2" />
                        </svg>
                    </div>
                    <div className="about-map__overlay">
                        <a
                            href={MAP_LINK}
                            className="about-btn about-btn--red"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            SPRAWDŹ TRASĘ
                        </a>
                    </div>
                </div>
            </section>

            <section className="about-section about-steps" aria-labelledby="about-steps-heading">
                <div className="about-steps__head">
                    <h2 id="about-steps-heading" className="about-steps__title">
                        W TRZECH KROKACH NA TOR
                    </h2>
                </div>
                <div className="about-steps__grid">
                    {STEPS.map((step, index) => (
                        <article
                            key={step.number}
                            className={`about-step${index < STEPS.length - 1 ? ' about-step--divider' : ''}`}
                        >
                            <span className="about-step__number" aria-hidden="true">
                                {step.number}
                            </span>
                            <h3 className="about-step__title">{step.title}</h3>
                            <p className="about-step__text">{step.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section id="kontakt" className="about-section about-contact">
                <div className="about-contact__head">
                    <p className="about-contact__label">KONTAKT</p>
                    <h2 className="about-contact__title">NAPISZ DO NAS</h2>
                    <p className="about-contact__lead">
                        Masz pytanie o rezerwację, voucher lub wynajem toru? Skorzystaj z formularza
                        albo zadzwoń — odpowiadamy w ciągu 24 godzin.
                    </p>
                </div>

                <div className="about-contact__channels">
                    {CONTACT_CHANNELS.map((item) => {
                        const Icon = CONTACT_ICONS[item.icon]
                        const content = (
                            <>
                                <span className="about-info-card__icon">
                                    <Icon />
                                </span>
                                <p className="about-info-card__label">{item.label}</p>
                                {item.lines.map((line) => (
                                    <p key={line} className="about-info-card__line">
                                        {line}
                                    </p>
                                ))}
                            </>
                        )

                        return item.href ? (
                            <a
                                key={item.label}
                                href={item.href}
                                className="about-info-card about-info-card--link"
                            >
                                {content}
                            </a>
                        ) : (
                            <div key={item.label} className="about-info-card">
                                {content}
                            </div>
                        )
                    })}
                </div>

                <form className="about-form" onSubmit={handleSubmit} noValidate>
                    <div className="about-form__row">
                        <div className="about-form__field">
                            <label className="about-form__label" htmlFor="contact-name">
                                IMIĘ I NAZWISKO
                            </label>
                            <input
                                id="contact-name"
                                className="about-form__input"
                                type="text"
                                value={form.name}
                                onChange={handleChange('name')}
                                placeholder="Jan Kowalski"
                                required
                            />
                        </div>
                        <div className="about-form__field">
                            <label className="about-form__label" htmlFor="contact-email">
                                ADRES E-MAIL
                            </label>
                            <input
                                id="contact-email"
                                className="about-form__input"
                                type="email"
                                value={form.email}
                                onChange={handleChange('email')}
                                placeholder="jan@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="about-form__field">
                        <label className="about-form__label" htmlFor="contact-subject">
                            TEMAT
                        </label>
                        <input
                            id="contact-subject"
                            className="about-form__input"
                            type="text"
                            value={form.subject}
                            onChange={handleChange('subject')}
                            placeholder="Rezerwacja / Voucher / Wynajem toru"
                            required
                        />
                    </div>

                    <div className="about-form__field">
                        <label className="about-form__label" htmlFor="contact-message">
                            WIADOMOŚĆ
                        </label>
                        <textarea
                            id="contact-message"
                            className="about-form__textarea"
                            rows={5}
                            value={form.message}
                            onChange={handleChange('message')}
                            placeholder="Opisz, czego potrzebujesz..."
                            required
                        />
                    </div>

                    {submitted && (
                        <p className="about-form__success" role="status">
                            Dziękujemy! Twoja wiadomość została wysłana — odezwiemy się wkrótce.
                        </p>
                    )}

                    <button type="submit" className="about-btn about-btn--red about-form__submit">
                        WYŚLIJ WIADOMOŚĆ
                    </button>
                </form>
            </section>

            <Footer onNavigate={onNavigate} />
            <ChatWidget />
        </div>
    )
}

export default About
