import { useMemo, useState } from 'react'
import {
    EVENT_CATEGORIES,
    EVENT_PERIODS,
    EVENTS,
    formatEventPrice,
} from '../data/events.js'
import { buildEventCheckoutOrder, goToCheckout } from '../lib/checkoutOrder.js'
import Footer from '../components/Footer.jsx'
import ChatWidget from '../components/ChatWidget.jsx'
import './Events.css'

function PinIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" strokeLinejoin="round" />
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

function CalendarIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
        </svg>
    )
}

function ChevronIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function EventCard({ event, onNavigate }) {
    const filledRatio = ((event.spotsTotal - event.spotsLeft) / event.spotsTotal) * 100

    const handleTrackClick = () => {
        if (event.trackSlug) {
            onNavigate?.('/track')
        }
    }

    return (
        <article className={`event-card event-card--${event.variant}`}>
            <div className="event-card__date">
                <span className="event-card__month">{event.month}</span>
                <span className="event-card__day">{event.day}</span>
            </div>

            <div className="event-card__media">
                <img src={event.image} alt="" loading="lazy" />
                <span className={`event-card__tag event-card__tag--${event.variant}`}>
                    {event.categoryLabel}
                </span>
            </div>

            <div className="event-card__body">
                <h3 className="event-card__title">{event.title}</h3>
                <ul className="event-card__meta">
                    <li>
                        <PinIcon />
                        {event.trackSlug ? (
                            <button
                                type="button"
                                className="event-card__track-link"
                                onClick={handleTrackClick}
                            >
                                {event.track}
                            </button>
                        ) : (
                            <span>{event.track}</span>
                        )}
                    </li>
                    <li>
                        <UserIcon />
                        <span>LEAD: {event.lead}</span>
                    </li>
                </ul>
                <div className="event-card__availability">
                    <div className="event-card__bar" aria-hidden="true">
                        <span
                            className={`event-card__bar-fill event-card__bar-fill--${event.variant}`}
                            style={{ width: `${filledRatio}%` }}
                        />
                    </div>
                    <span className="event-card__spots">
                        {event.spotsLeft}/{event.spotsTotal} MIEJSC PUSTE
                    </span>
                </div>
            </div>

            <div className="event-card__action">
                <div className="event-card__price">
                    <span className="event-card__price-label">OD</span>
                    <span className="event-card__price-value">{formatEventPrice(event.price)}</span>
                </div>
                <button
                    type="button"
                    className={`event-card__book event-card__book--${event.variant}`}
                    onClick={() => goToCheckout(buildEventCheckoutOrder(event), onNavigate)}
                >
                    REZERWUJ
                    <ChevronIcon />
                </button>
            </div>
        </article>
    )
}

function Events({ onNavigate }) {
    const [category, setCategory] = useState('all')
    const [period, setPeriod] = useState('mar-nov-2026')

    const filtered = useMemo(() => {
        return EVENTS.filter((event) => {
            if (period && event.period !== period) return false
            if (category !== 'all' && event.category !== category) return false
            return true
        })
    }, [category, period])

    return (
        <div className="events-page">
            <section className="events-hero" aria-labelledby="events-heading">
                <div className="events-hero__media" aria-hidden="true">
                    <img src="/images/hero-track.jpg" alt="" fetchPriority="high" decoding="async" />
                </div>
                <div className="events-hero__overlay" aria-hidden="true" />
                <div className="events-hero__content">
                    <p className="events-hero__eyebrow">KALENDARZ / 2026</p>
                    <h1 id="events-heading" className="events-hero__title">
                        KALENDARZ WYDARZEŃ 2026
                    </h1>
                    <p className="events-hero__desc">
                        Zarezerwuj miejsce na sesjach na torze APEX Drive w Skawinie i na torach
                        partnerskich w Polsce. Profesjonalni instruktorzy, telemetria i flota GT.
                    </p>
                </div>
            </section>

            <div className="events-toolbar">
                <div className="events-toolbar__inner">
                    <div className="events-tabs" role="tablist" aria-label="Filtr kategorii wydarzeń">
                        {EVENT_CATEGORIES.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={category === tab.id}
                                className={`events-tab${category === tab.id ? ' events-tab--active' : ''}`}
                                onClick={() => setCategory(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <label className="events-period">
                        <CalendarIcon />
                        <select
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                            aria-label="Wybierz okres"
                        >
                            {EVENT_PERIODS.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>

            <section className="events-list-section" aria-label="Lista wydarzeń">
                <div className="events-list-section__inner">
                    {filtered.length > 0 ? (
                        <ul className="events-list">
                            {filtered.map((event) => (
                                <li key={event.id}>
                                    <EventCard event={event} onNavigate={onNavigate} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="events-empty">
                            Brak wydarzeń w wybranej kategorii i okresie. Spróbuj zmienić filtry.
                        </p>
                    )}
                </div>
            </section>

            <section className="events-custom" aria-labelledby="events-custom-heading">
                <div className="events-custom__inner">
                    <div className="events-custom__copy">
                        <h2 id="events-custom-heading" className="events-custom__title">
                            PERSONALIZOWANE SESJE
                        </h2>
                        <p className="events-custom__desc">
                            Żaden z terminów nie pasuje? Skontaktuj się z naszym zespołem concierge —
                            przygotujemy program dopasowany do Twojego poziomu, floty i preferowanego toru.
                        </p>
                        <button
                            type="button"
                            className="events-custom__btn"
                            onClick={() => onNavigate?.('/about#kontakt')}
                        >
                            ZAPYTANIE OFERTOWE
                        </button>
                    </div>
                    <div className="events-custom__media" aria-hidden="true">
                        <img src="/images/cars/lamborghini-huracan-STO.jpg" alt="" loading="lazy" />
                    </div>
                </div>
            </section>

            <Footer onNavigate={onNavigate} />
            <ChatWidget />
        </div>
    )
}

export default Events
