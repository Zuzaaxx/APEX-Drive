import ChatWidget from '../components/ChatWidget.jsx'
import Footer from '../components/Footer.jsx'
import { buildEventCheckoutOrder, goToCheckout } from '../lib/checkoutOrder.js'
import './Start.css'

const FEATURED_CARS = [
    {
        badge: 'MOC: 510 KM',
        category: 'GT3 PERFORMANCE',
        name: '911 GT3 RS',
        power: '510 KM',
        acceleration: '3.2S DO 100KM/H',
        image: '/images/cars/porsche-911.jpg',
    },
    {
        badge: 'MOC: 650 KM',
        category: 'SUPERCAR',
        name: 'MCLAREN 720S',
        power: '650 KM',
        acceleration: '2.9S DO 100KM/H',
        image: '/images/cars/mclaren-720s.jpg',
    },
    {
        badge: 'MOC: 700 KM',
        category: 'ITALIAN EXOTIC',
        name: 'FERRARI F8',
        power: '700 KM',
        acceleration: '2.9S DO 100KM/H',
        image: '/images/cars/ferrari-f8.jpg',
    },
]

const UPCOMING_EVENTS = [
    {
        day: '24',
        month: 'PAŹ',
        title: 'OPEN TRACK DAY',
        track: 'Autodrom Słomczyno',
        slots: '4 SLOTY',
        status: 'OSTATNIE MIEJSCA',
        urgent: true,
        featured: true,
        price: 890,
        image: '/images/hero-track.jpg',
    },
    {
        day: '31',
        month: 'PAŹ',
        title: 'VIP HOT LAP SESSION',
        track: 'Tor Kielce',
        slots: '6 SLOTÓW',
        status: 'WOLNE MIEJSCA',
        urgent: false,
        featured: false,
        price: 1250,
        image: '/images/cars/mclaren-720s.jpg',
    },
    {
        day: '07',
        month: 'LIS',
        title: 'GT4 TRAINING DAY',
        track: 'Autodrom Poznań',
        slots: '2 SLOTY',
        status: 'OSTATNIE MIEJSCA',
        urgent: true,
        featured: false,
        price: 1490,
        image: '/images/cars/porsche-911.jpg',
    },
]

function ChevronIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
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

function Start({ onNavigate }) {
    const handleEventReserve = (event) => {
        if (!onNavigate) return
        goToCheckout(buildEventCheckoutOrder(event), onNavigate)
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
                        <button type="button" className="btn btn--red">
                            ZAREZERWUJ PRZEJAZD
                        </button>
                        <button type="button" className="btn btn--outline-gold">
                            ZOBACZ FLOTĘ
                        </button>
                    </div>
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
                    {FEATURED_CARS.map((car) => (
                        <article key={car.name} className="car-card">
                            <div className="car-card__media">
                                <img src={car.image} alt={car.name} loading="lazy" />
                                <span className="car-card__badge">{car.badge}</span>
                            </div>
                            <div className="car-card__body">
                                <p className="car-card__category">{car.category}</p>
                                <h3 className="car-card__name">{car.name}</h3>
                                <div className="car-card__specs">
                                    <span>{car.power}</span>
                                    <span>{car.acceleration}</span>
                                </div>
                                <button type="button" className="btn btn--card">
                                    WYBIERZ MASZYNĘ
                                </button>
                            </div>
                        </article>
                    ))}
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
                            <button
                                type="button"
                                className="btn btn--gold"
                                onClick={() => onNavigate?.('/vouchers')}
                            >
                                SKONFIGURUJ VOUCHER
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

            <section id="szkolenia" className="section events-section">
                <div className="events-grid">
                    <div className="events-intro">
                        <h2 className="events-intro__title">NADCHODZĄCE WOLNE TERMINY</h2>
                        <p className="events-intro__desc">
                            Sprawdź najbliższe wolne sloty na torze. Rezerwuj z wyprzedzeniem —
                            najlepsze terminy znikają w kilka dni.
                        </p>
                        <p className="events-intro__season">
                            <CalendarIcon />
                            SEZON: MARZEC – LISTOPAD
                        </p>
                    </div>

                    <ul className="events-list">
                        {UPCOMING_EVENTS.map((event) => (
                            <li key={`${event.day}-${event.month}`} className="event-row">
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
                                        event.featured
                                            ? 'event-row__action event-row__action--featured'
                                            : 'event-row__action'
                                    }
                                    aria-label={`Rezerwuj: ${event.title}`}
                                    onClick={() => handleEventReserve(event)}
                                >
                                    <ChevronIcon />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <Footer onNavigate={onNavigate} />
            <ChatWidget />
        </div>
    )
}

export default Start
