import ChatWidget from '../components/ChatWidget.jsx'
import Footer from '../components/Footer.jsx'
import CarCard from '../components/CarCard.jsx'
import { CARS } from '../data/cars.js'
import { getHomepageEvents } from '../data/events.js'
import './Start.css'

const STATS = [
    { value: '2 400+', label: 'ZADOWOLONYCH KLIENTÓW' },
    { value: '4', label: 'SUPERSAMOCHODY W FLOCIE' },
    { value: '4.9 / 5', label: 'ŚREDNIA OCENA' },
]

const SERVICE_CARDS = [
    {
        label: 'WYNAJEM TORU',
        title: 'CAŁY TOR DLA CIEBIE',
        desc: 'Zarezerwuj tor na wyłączność — idealne na event firmowy, sesję zdjęciową lub prywatne okrążenia bez limitu.',
        features: [
            'Tor 2,4 km na wyłączność',
            'Obsługa techniczna i medyczna',
            'Strefa VIP i catering',
            'Nagranie wideo z okrążeń',
        ],
        cta: 'SPRAWDŹ SZCZEGÓŁY',
        ctaVariant: 'red',
        link: '/track',
    },
    {
        label: 'FLOTA APEX DRIVE',
        title: 'WSIĄDŹ ZA KIEROWNICĘ MARZENIA',
        desc: 'Porsche, Lamborghini, Ferrari, McLaren — wybierz maszynę i poczuj moc na profesjonalnym asfalcie pod okiem instruktora.',
        features: [
            '4 supersamochody klasy GT',
            'Ubezpieczenie w cenie',
            'Instruktor przy każdej jeździe',
            'Pełne wyposażenie bezpieczeństwa',
        ],
        cta: 'SPRAWDŹ SZCZEGÓŁY',
        ctaVariant: 'outline-gold',
        link: '/cars',
    },
]

const FEATURED_SLUGS = ['porsche-911-gt3-rs', 'lamborghini-sto', 'ferrari-sf90-stradale']
const FEATURED_BADGES = {
    'porsche-911-gt3-rs': { text: 'PROMOCJA', variant: 'red' },
    'lamborghini-sto': { text: 'NOWOŚĆ', variant: 'gold' },
}

const VOUCHER_PERKS = [
    { icon: 'bolt', label: 'NATYCHMIASTOWA WYSYŁKA' },
    { icon: 'calendar', label: 'WAŻNOŚĆ 12 MIESIĘCY' },
    { icon: 'gift', label: 'PERSONALIZACJA PREZENTU' },
]

const PRECISION_FEATURES = [
    {
        icon: 'car',
        title: 'NAJWYŻSZE STANDARDY',
        text: 'Każdy pojazd w flocie przechodzi regularny serwis i kontrolę techniczną przed każdą sesją na torze.',
    },
    {
        icon: 'steering',
        title: 'DOŚWIADCZENI INSTRUKTORZY',
        text: 'Licencjonowani instruktorzy z doświadczeniem wyścigowym poprowadzą Cię od pierwszego okrążenia po pełną prędkość.',
    },
    {
        icon: 'speed',
        title: 'FLOTA PREMIUM',
        text: 'Porsche, Ferrari, Lamborghini i McLaren — maszyny, o których marzy każdy miłośnik motoryzacji.',
    },
    {
        icon: 'wrench',
        title: 'PEŁNA OBSŁUGA',
        text: 'Od rezerwacji online po briefing przed jazdą — dbamy o każdy detal, żebyś mógł skupić się wyłącznie na jeździe.',
    },
]

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12l5 5L19 7" strokeLinecap="round" strokeLinejoin="round" />
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

function ArrowIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function PerkIcon({ type }) {
    if (type === 'bolt') {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" strokeLinejoin="round" />
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
            <rect x="3" y="8" width="18" height="13" rx="2" />
            <path d="M12 8V5M8 5h8M12 12v4M10 14h4" strokeLinecap="round" />
        </svg>
    )
}

function DiamondIcon({ type }) {
    const icons = {
        car: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 15h14l-1.5-5.5a2 2 0 0 0-1.9-1.5H8.4a2 2 0 0 0-1.9 1.5L5 15z" strokeLinejoin="round" />
                <circle cx="7.5" cy="15" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="16.5" cy="15" r="1.5" fill="currentColor" stroke="none" />
            </svg>
        ),
        steering: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeLinecap="round" />
            </svg>
        ),
        speed: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                <path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" strokeLinecap="round" />
                <path d="M12 4v2M12 18v2" strokeLinecap="round" />
            </svg>
        ),
        wrench: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path
                    d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.1 2.1-3.3-3.3 2.1-2.1z"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    }

    return <span className="precision-card__diamond">{icons[type]}</span>
}

function Start({ onNavigate }) {
    const featuredCars = FEATURED_SLUGS.map((slug) => CARS.find((car) => car.slug === slug)).filter(Boolean)
    const upcomingEvents = getHomepageEvents(3)

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="home">
            <section className="hero" aria-labelledby="hero-heading">
                <div className="hero__media" aria-hidden="true">
                    <img
                        src="/images/hero-track.jpg"
                        alt=""
                        fetchPriority="high"
                        decoding="async"
                    />
                </div>
                <div className="hero__overlay" />
                <div className="hero__content">
                    <p className="hero__eyebrow">
                        <span className="hero__eyebrow-line" aria-hidden="true" />
                        ADRENALINA CZEKA
                    </p>
                    <h1 id="hero-heading" className="hero__title">
                        POCZUJ MOC
                        <span className="hero__title-accent">NA TORZE</span>
                    </h1>
                    <p className="hero__desc">
                        Wynajmij supersamochód i poczuj prawdziwą moc na profesjonalnym torze.
                        Doświadczeni instruktorzy poprowadzą Cię przez każdy zakręt — od pierwszego
                        okrążenia po pełną prędkość.
                    </p>
                    <div className="hero__actions">
                        <button
                            type="button"
                            className="btn btn--red"
                            onClick={() => onNavigate?.('/cars')}
                        >
                            ZACZNIJ PRZYGODĘ
                        </button>
                        <button
                            type="button"
                            className="btn btn--outline-gold"
                            onClick={() => onNavigate?.('/track')}
                        >
                            NASZ TOR
                        </button>
                    </div>
                </div>

                <div className="hero__stats" aria-label="Statystyki APEX Drive">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="hero-stat">
                            <span className="hero-stat__value">{stat.value}</span>
                            <span className="hero-stat__label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section id="oferta" className="section rules-section" aria-labelledby="rules-heading">
                <div className="rules-section__head">
                    <h2 id="rules-heading" className="rules-section__title">
                        TWÓJ TOR. TWOJE ZASADY.
                    </h2>
                    <p className="rules-section__desc">
                        Niezależnie od tego, czy chcesz cały tor na wyłączność, czy wsiąść za kierownicę
                        supersamochodu — u nas decydujesz o tempie, intensywności i charakterze jazdy.
                    </p>
                </div>

                <div className="rules-grid">
                    {SERVICE_CARDS.map((card) => (
                        <article key={card.title} className="rules-card">
                            <p className="rules-card__label">{card.label}</p>
                            <h3 className="rules-card__title">{card.title}</h3>
                            <p className="rules-card__desc">{card.desc}</p>
                            <ul className="rules-card__list">
                                {card.features.map((item) => (
                                    <li key={item}>
                                        <CheckIcon />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                type="button"
                                className={`btn btn--${card.ctaVariant} btn--full`}
                                onClick={() => onNavigate?.(card.link)}
                            >
                                {card.cta}
                            </button>
                        </article>
                    ))}
                </div>
            </section>

            <section id="samochody" className="section cars-section">
                <div className="section__head">
                    <h2 className="section__title">
                        <span className="section__title-text">NAJPOPULARNIEJSZE AUTA</span>
                        <span className="section__title-line" aria-hidden="true" />
                    </h2>
                    <a
                        href="/cars"
                        className="section__link"
                        onClick={(e) => {
                            e.preventDefault()
                            onNavigate?.('/cars')
                        }}
                    >
                        ZOBACZ WSZYSTKIE →
                    </a>
                </div>

                <div className="cars-grid">
                    {featuredCars.map((car) => {
                        const badgeInfo = FEATURED_BADGES[car.slug]
                        return (
                            <CarCard
                                key={car.slug}
                                badge={badgeInfo?.text}
                                badgeVariant={badgeInfo?.variant ?? 'gold'}
                                category={car.category}
                                name={car.name}
                                power={car.powerText}
                                acceleration={car.acceleration}
                                image={car.image}
                                price={car.price}
                                highlightedReserve={badgeInfo?.variant === 'red'}
                                actionLabel="ZOBACZ WIĘCEJ"
                                onClick={() => onNavigate?.(`/cars/${car.slug}`)}
                            />
                        )
                    })}
                </div>
            </section>

            <section id="vouchery" className="section voucher-section">
                <div className="voucher-frame">
                    <div className="voucher-grid">
                        <div className="voucher-copy">
                            <p className="voucher-copy__label">EKSKLUZYWNY PODARUNEK</p>
                            <h2 className="voucher-copy__title">KUP VOUCHER NA PREZENT</h2>
                            <p className="voucher-copy__desc">
                                Podaruj niezapomniane wrażenia — voucher na jazdę supersamochodem
                                to prezent, który zostaje na zawsze. Wybierz model, tor i datę.
                            </p>
                            <ul className="voucher-perks">
                                {VOUCHER_PERKS.map((perk) => (
                                    <li key={perk.label} className="voucher-perk">
                                        <span className="voucher-perk__icon">
                                            <PerkIcon type={perk.icon} />
                                        </span>
                                        <span className="voucher-perk__label">{perk.label}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                type="button"
                                className="btn btn--gold"
                                onClick={() => onNavigate?.('/vouchers')}
                            >
                                KUP VOUCHER
                            </button>
                        </div>
                        <div className="voucher-visual" aria-hidden="true">
                            <div className="voucher-card">
                                <span className="voucher-card__brand">APEX DRIVE</span>
                                <span className="voucher-card__type">VOUCHER</span>
                            </div>
                            <div className="voucher-key" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="terminy" className="section events-section">
                <div className="events-grid">
                    <div className="events-intro">
                        <h2 className="events-intro__title">NADCHODZĄCE WOLNE TERMINY</h2>
                        <p className="events-intro__desc">
                            Sprawdź najbliższe wolne sloty na torze i torach partnerskich.
                            Rezerwuj z wyprzedzeniem — najlepsze terminy znikają w kilka dni.
                        </p>
                        <p className="events-intro__season">
                            <CalendarIcon />
                            SEZON: MARZEC – LISTOPAD 2026
                        </p>
                        <button
                            type="button"
                            className="events-intro__calendar"
                            onClick={() => onNavigate?.('/kalendarz')}
                        >
                            ZOBACZ PEŁNY KALENDARZ
                            <ArrowIcon />
                        </button>
                    </div>

                    <ul className="events-list">
                        {upcomingEvents.map((event) => (
                            <li key={event.id} className="event-row">
                                <div className="event-row__date">
                                    <span className="event-row__day">{event.day}</span>
                                    <span className="event-row__month">{event.month}</span>
                                </div>
                                <div className="event-row__info">
                                    <p className="event-row__title">{event.title}</p>
                                    <p className="event-row__track">{event.track}</p>
                                </div>
                                <div className="event-row__slots">
                                    <span>{event.slots}</span>
                                    <span
                                        className={
                                            event.urgent
                                                ? 'event-row__status event-row__status--urgent'
                                                : 'event-row__status'
                                        }
                                    >
                                        {event.status}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className={
                                        event.urgent
                                            ? 'event-row__book event-row__book--urgent'
                                            : 'event-row__book'
                                    }
                                    aria-label={`Rezerwuj: ${event.title}`}
                                    onClick={() => onNavigate?.(event.bookPath)}
                                >
                                    REZERWUJ
                                    <ArrowIcon />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="section precision-section" aria-labelledby="precision-heading">
                <h2 id="precision-heading" className="precision-section__title">
                    PRECYZJA W KAŻDYM{' '}
                    <span className="precision-section__accent">SZCZEGÓLE</span>
                </h2>
                <div className="precision-grid">
                    {PRECISION_FEATURES.map((feature) => (
                        <article key={feature.title} className="precision-card">
                            <DiamondIcon type={feature.icon} />
                            <h3 className="precision-card__title">{feature.title}</h3>
                            <p className="precision-card__text">{feature.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <Footer onNavigate={onNavigate} />

            <button
                type="button"
                className="home-back-top"
                onClick={scrollToTop}
                aria-label="Wróć na górę strony"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 19V5M6 11l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <ChatWidget />
        </div>
    )
}

export default Start
