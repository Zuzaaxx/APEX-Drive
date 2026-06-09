import { useMemo, useState } from 'react'
import { getTrackBySlug } from '../data/tracks.js'
import BookingCalendar from '../components/BookingCalendar.jsx'
import Footer from '../components/Footer.jsx'
import ChatWidget from '../components/ChatWidget.jsx'
import './TrackDetail.css'

function formatPrice(value) {
    return `${value.toLocaleString('pl-PL')} PLN`
}

function StarRating({ count = 5 }) {
    return (
        <span className="track-detail__stars" aria-label={`Ocena: ${count} z 5`}>
            {Array.from({ length: 5 }, (_, i) => (
                <svg
                    key={i}
                    viewBox="0 0 24 24"
                    fill={i < count ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                >
                    <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 18.5 5.8 22l1.7-7.3L2 10l7.1-1.1L12 2z" />
                </svg>
            ))}
        </span>
    )
}

function LevelBars({ level, max }) {
    return (
        <span className="track-detail__level-bars" aria-label={`Poziom trudności: ${level} z ${max}`}>
            {Array.from({ length: max }, (_, i) => (
                <span
                    key={i}
                    className={`track-detail__level-bar${i < level ? ' track-detail__level-bar--active' : ''}`}
                />
            ))}
        </span>
    )
}

function TrackMap() {
    return (
        <div className="track-detail__map">
            <svg
                className="track-detail__map-svg"
                viewBox="0 0 400 280"
                fill="none"
                aria-label="Schemat toru APEX Drive"
            >
                <path
                    d="M 80 140 C 80 80, 140 40, 200 50 C 260 60, 320 40, 340 90 C 360 140, 340 200, 280 220 C 220 240, 180 260, 140 230 C 100 200, 60 190, 50 160 C 40 130, 55 100, 80 90 C 105 80, 130 100, 120 130 C 110 160, 85 170, 80 140 Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                />
                <circle cx="200" cy="50" r="6" fill="currentColor" opacity="0.6" />
                <text x="200" y="38" textAnchor="middle" fill="currentColor" fontSize="10" opacity="0.5">
                    START
                </text>
            </svg>
            <div className="track-detail__map-controls">
                <button type="button" aria-label="Powiększ mapę">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="7" />
                        <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
                    </svg>
                </button>
                <button type="button" aria-label="Pełny ekran">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

function TrackDetail({ slug, onNavigate }) {
    const track = getTrackBySlug(slug)
    const [selectedDays, setSelectedDays] = useState([15])
    const [videoRecording, setVideoRecording] = useState(true)

    const unavailableDays = [7, 8, 14, 21, 28]

    const toggleDay = (day) => {
        if (unavailableDays.includes(day)) return

        setSelectedDays((prev) => {
            if (prev.includes(day)) {
                return prev.filter((d) => d !== day)
            }
            return [...prev, day].sort((a, b) => a - b)
        })
    }

    const total = useMemo(() => {
        if (!track) return 0
        const { trackRental, instructor, videoRecording: videoPrice } = track.pricing
        return trackRental + instructor + (videoRecording ? videoPrice : 0)
    }, [track, videoRecording])

    if (!track) {
        return null
    }

    return (
        <>
            <main className="track-detail">
                <section className="track-detail__hero" aria-labelledby="track-heading">
                    <div className="track-detail__hero-media" aria-hidden="true">
                        <img src={track.heroImage} alt="" decoding="async" />
                    </div>
                    <div className="track-detail__hero-overlay" aria-hidden="true" />
                    <div className="track-detail__hero-content">
                        <p className="track-detail__location">{track.location}</p>
                        <h1 id="track-heading" className="track-detail__name">
                            {track.name}
                        </h1>
                        <span className="track-detail__tag">
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
                            </svg>
                            {track.tag}
                        </span>
                    </div>
                </section>

                <section className="track-detail__section" aria-labelledby="track-specs-heading">
                    <h2 id="track-specs-heading" className="track-detail__section-title">
                        SPECYFIKACJA TECHNICZNA
                    </h2>
                    <div className="track-detail__specs-grid">
                        <div className="track-detail__specs-data">
                            <div className="track-detail__spec-row">
                                <span className="track-detail__spec-label">DŁUGOŚĆ TORU</span>
                                <span className="track-detail__spec-value">{track.length}</span>
                            </div>
                            <div className="track-detail__spec-row">
                                <span className="track-detail__spec-label">ZAKRĘTY</span>
                                <span className="track-detail__spec-value">{track.corners} JEDNOSTEK</span>
                            </div>
                            <div className="track-detail__spec-row">
                                <span className="track-detail__spec-label">PRĘDKOŚĆ MAKS.</span>
                                <span className="track-detail__spec-value">{track.maxSpeed}</span>
                            </div>
                            <div className="track-detail__spec-row">
                                <span className="track-detail__spec-label">POZIOM</span>
                                <LevelBars level={track.level} max={track.levelMax} />
                            </div>
                            <div className="track-detail__pro-notes">
                                <span className="track-detail__pro-notes-label">PRO NOTES</span>
                                <p>{track.proNotes}</p>
                            </div>
                        </div>
                        <TrackMap />
                    </div>
                </section>

                <section className="track-detail__section" aria-labelledby="track-booking-heading">
                    <h2 id="track-booking-heading" className="track-detail__section-title">
                        ZAREZERWUJ TERMIN
                    </h2>
                    <div className="track-detail__booking-grid">
                        <div className="track-detail__booking-panel">
                            <BookingCalendar
                                selectedDays={selectedDays}
                                unavailableDays={unavailableDays}
                                onToggleDay={toggleDay}
                            />
                            <p className="track-detail__booking-hint">
                                Szukasz konkretnej maszyny?{' '}
                                <button
                                    type="button"
                                    className="track-detail__link-btn"
                                    onClick={() => onNavigate?.('/cars')}
                                >
                                    Zobacz pełną flotę
                                </button>
                            </p>
                        </div>

                        <aside className="track-detail__cost-card" aria-label="Kalkulacja kosztów">
                            <h3 className="track-detail__cost-title">KALKULACJA KOSZTÓW</h3>
                            <div className="track-detail__cost-rows">
                                <div className="track-detail__cost-row">
                                    <span>Wynajem toru (cały dzień)</span>
                                    <span>{formatPrice(track.pricing.trackRental)}</span>
                                </div>
                                <div className="track-detail__cost-row">
                                    <span>Instruktor (poziom II)</span>
                                    <span>{formatPrice(track.pricing.instructor)}</span>
                                </div>
                                <div className="track-detail__cost-row">
                                    <span>Obsługa paliwowa (Premium 98)</span>
                                    <span className="track-detail__cost-variable">Zmienna</span>
                                </div>
                                <label className="track-detail__cost-addon">
                                    <span>
                                        <span className="track-detail__cost-addon-name">
                                            Nagranie wideo z toru
                                        </span>
                                        <span className="track-detail__cost-addon-price">
                                            {formatPrice(track.pricing.videoRecording)}
                                        </span>
                                    </span>
                                    <input
                                        type="checkbox"
                                        checked={videoRecording}
                                        onChange={(e) => setVideoRecording(e.target.checked)}
                                    />
                                </label>
                            </div>
                            <div className="track-detail__cost-total">
                                <span>Szacunkowy koszt</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            <button type="button" className="track-detail__book-btn" onClick={() => onNavigate?.('/account')}>
                                ZAREZERWUJ DOŚWIADCZENIE
                            </button>
                            <div className="track-detail__cost-footer">
                                <span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                        <circle cx="12" cy="12" r="9" />
                                        <path d="M12 7v5l3 2" strokeLinecap="round" />
                                    </svg>
                                    WSPARCIE 24/7
                                </span>
                                <span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                        <rect x="5" y="11" width="14" height="10" rx="2" />
                                        <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
                                    </svg>
                                    BEZPIECZEŃSTWO DANYCH
                                </span>
                            </div>
                        </aside>
                    </div>
                </section>

                <section className="track-detail__section track-detail__info-section">
                    <div className="track-detail__info-grid">
                        <div className="track-detail__info-block">
                            <h2 className="track-detail__info-title">CO ZAWIERA CENA</h2>
                            <ul className="track-detail__included-list">
                                {track.included.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="track-detail__info-block">
                            <h2 className="track-detail__info-title">DOJAZD I PARKING</h2>
                            <ul className="track-detail__access-list">
                                {track.access.map((item) => (
                                    <li key={item.title}>
                                        <span className="track-detail__access-icon" aria-hidden="true">
                                            {item.icon === 'pin' && (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                    <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
                                                    <circle cx="12" cy="10" r="2.5" />
                                                </svg>
                                            )}
                                            {item.icon === 'parking' && (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                    <rect x="4" y="4" width="16" height="16" rx="2" />
                                                    <path d="M9 16V8h4a2.5 2.5 0 0 1 0 5H9" strokeLinecap="round" />
                                                </svg>
                                            )}
                                            {item.icon === 'bolt' && (
                                                <svg viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
                                                </svg>
                                            )}
                                        </span>
                                        <div>
                                            <p className="track-detail__access-title">{item.title}</p>
                                            <p className="track-detail__access-text">{item.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={track.mapLink}
                                className="track-detail__map-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                SPRAWDŹ TRASĘ DOJAZDU →
                            </a>
                        </div>
                    </div>
                </section>

                <section className="track-detail__section" aria-labelledby="track-reviews-heading">
                    <div className="track-detail__reviews-head">
                        <h2 id="track-reviews-heading" className="track-detail__section-title">
                            OPINIE KIEROWCÓW
                        </h2>
                        <div className="track-detail__reviews-summary">
                            <StarRating count={5} />
                            <span>
                                {track.rating} ({track.reviewCount} OPINII)
                            </span>
                        </div>
                    </div>
                    <div className="track-detail__reviews-grid">
                        {track.reviews.map((review) => (
                            <article key={review.name} className="track-detail__review-card">
                                <div className="track-detail__review-head">
                                    <span className="track-detail__review-name">{review.name}</span>
                                    <span className="track-detail__review-date">{review.date}</span>
                                </div>
                                <p className="track-detail__review-text">{review.text}</p>
                                <StarRating count={review.rating} />
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            <Footer onNavigate={onNavigate} />
            <ChatWidget />
        </>
    )
}

export default TrackDetail
