import { useMemo, useState } from 'react'
import { getCarBySlug } from '../data/cars.js'
import BookingCalendar from '../components/BookingCalendar.jsx'
import Footer from '../components/Footer.jsx'
import ChatWidget from '../components/ChatWidget.jsx'
import { buildCarCheckoutOrder, goToCheckout } from '../lib/checkoutOrder.js'
import './CarDetail.css'

const WAVE_HEIGHTS = [4, 8, 12, 6, 16, 10, 20, 14, 8, 18, 12, 22, 16, 10, 24, 18, 12, 8, 14, 20, 10, 6, 12, 16]

const NOTIFY_CAR_BY_SLUG = {
    'porsche-911-gt3-rs': 'porsche-911-gt3-rs',
    'ferrari-sf90-stradale': 'ferrari-sf90-stradale',
    'lamborghini-sto': 'lamborghini-sto',
    'mclaren-720s': 'mclaren-720s',
}

function getNotifyPath(slug) {
    const carId = NOTIFY_CAR_BY_SLUG[slug]
    return carId ? `/notify?car=${carId}` : '/notify'
}

function formatPrice(value) {
    return `${value.toLocaleString('pl-PL')} PLN`
}

function formatSessionDate(selectedDays) {
    const year = 2024
    const month = 11
    const monthName = MONTHS[month]

    if (selectedDays.length === 0) {
        return `${monthName} ${year}`
    }
    if (selectedDays.length === 1) {
        return `${selectedDays[0]} ${monthName} ${year}`
    }

    const sorted = [...selectedDays].sort((a, b) => a - b)
    return `${sorted[0]}–${sorted[sorted.length - 1]} ${monthName} ${year}`
}

function buildLineItems(pricing, trackPackage, driveVideo) {
    const items = []

    if (trackPackage) {
        items.push({
            label: 'WYNAJEM TORU I INSTRUKTOR',
            amount: pricing.base + pricing.insurance,
        })
    } else {
        items.push({
            label: `WYNAJEM POJAZDU (${pricing.days} ${pricing.days === 1 ? 'DZIEŃ' : 'DNI'})`,
            amount: pricing.base,
        })
        if (pricing.insurance > 0) {
            items.push({ label: 'UBEZPIECZENIE', amount: pricing.insurance })
        }
    }

    if (pricing.video > 0) {
        items.push({
            label: driveVideo ? 'PAKIET TELEMETRYCZNY' : 'FILM Z PRZEJAZDU',
            amount: pricing.video,
        })
    }

    return items
}

function Calendar({ selectedDays, unavailableDays, onToggleDay }) {
    const year = 2024
    const month = 11
    const daysInMonth = 31
    const firstDayOffset = 6

    const days = useMemo(() => {
        const cells = []
        for (let i = 0; i < firstDayOffset; i += 1) {
            cells.push({ empty: true, key: `e-${i}` })
        }
        for (let day = 1; day <= daysInMonth; day += 1) {
            cells.push({ day, key: `d-${day}` })
        }
        return cells
    }, [])

    return (
        <div className="car-detail__calendar">
            <span className="car-detail__section-label">WYBIERZ TERMIN</span>
            <div className="car-detail__calendar-head">
                <span className="car-detail__calendar-month">
                    {MONTHS[month]} {year}
                </span>
                <div className="car-detail__calendar-nav">
                    <button type="button" aria-label="Poprzedni miesiąc">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button type="button" aria-label="Następny miesiąc">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="car-detail__calendar-weekdays">
                {WEEKDAYS.map((day) => (
                    <span key={day}>{day}</span>
                ))}
            </div>
            <div className="car-detail__calendar-days">
                {days.map((cell) => {
                    if (cell.empty) {
                        return <span key={cell.key} className="car-detail__calendar-day car-detail__calendar-day--empty" />
                    }

                    const isUnavailable = unavailableDays.includes(cell.day)
                    const isSelected = selectedDays.includes(cell.day)

                    return (
                        <button
                            key={cell.key}
                            type="button"
                            disabled={isUnavailable}
                            className={[
                                'car-detail__calendar-day',
                                isSelected ? 'car-detail__calendar-day--selected' : '',
                                isUnavailable ? 'car-detail__calendar-day--unavailable' : '',
                            ].filter(Boolean).join(' ')}
                            onClick={() => onToggleDay(cell.day)}
                        >
                            {cell.day}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

function CarDetail({ slug, onNavigate }) {
    const car = getCarBySlug(slug)
    const [activeImage, setActiveImage] = useState(0)
    const [selectedDays, setSelectedDays] = useState([3, 4])
    const [trackPackage, setTrackPackage] = useState(true)
    const [driveVideo, setDriveVideo] = useState(false)
    const [audioPlaying, setAudioPlaying] = useState(false)

    const unavailableDays = [7, 8]

    const pricing = useMemo(() => {
        if (!car) return null

        const days = selectedDays.length || 1
        const base = car.dailyRate * days
        const insurance = car.insuranceRate
        const track = trackPackage ? 0 : 0
        const video = driveVideo ? 300 : 0
        const total = base + insurance + track + video

        return { days, base, insurance, track, video, total }
    }, [car, selectedDays, trackPackage, driveVideo])

    const toggleDay = (day) => {
        if (unavailableDays.includes(day)) return

        setSelectedDays((prev) => {
            if (prev.includes(day)) {
                return prev.filter((d) => d !== day)
            }
            return [...prev, day].sort((a, b) => a - b)
        })
    }

    const handleReserve = () => {
        if (!pricing) return

        goToCheckout(
            buildCarCheckoutOrder({
                car,
                selectedDays,
                pricing,
                trackPackage,
                driveVideo,
                formatSessionDate,
                buildLineItems,
            }),
            onNavigate,
        )
    }

    if (!car) {
        return (
            <>
                <main className="car-detail">
                    <div className="car-detail__not-found">
                        <h1>Samochód nie znaleziony</h1>
                        <p>Nie udało się znaleźć pojazdu o podanym identyfikatorze.</p>
                        <button type="button" className="car-detail__back-btn" onClick={() => onNavigate('/cars')}>
                            Wróć do listy
                        </button>
                    </div>
                </main>
                <Footer onNavigate={onNavigate} />
                <ChatWidget />
            </>
        )
    }

    const activeGalleryImage = car.gallery[activeImage] ?? car.image

    return (
        <>
            <main className="car-detail">
                <div className="car-detail__layout">
                    <div className="car-detail__main">
                        <div className="car-detail__gallery-main">
                            <img src={activeGalleryImage} alt={car.name} />
                            <div className="car-detail__gallery-actions">
                                <button type="button" className="car-detail__video-btn">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    OBEJRZYJ FILM
                                </button>
                                <button type="button" className="car-detail__fullscreen-btn" aria-label="Pełny ekran">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                                        <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {car.gallery.length > 1 && (
                        <div className="car-detail__thumbs">
                            {car.gallery.map((src, index) => (
                                <button
                                    key={`${src}-${index}`}
                                    type="button"
                                    className={`car-detail__thumb${activeImage === index ? ' car-detail__thumb--active' : ''}`}
                                    onClick={() => setActiveImage(index)}
                                >
                                    <img src={src} alt="" loading="lazy" />
                                </button>
                            ))}
                        </div>
                        )}

                        <section className="car-detail__audio" aria-label="Telemetria dźwięku">
                            <p className="car-detail__audio-label">TELEMETRIA DŹWIĘKU</p>
                            <div className="car-detail__audio-player">
                                <button
                                    type="button"
                                    className="car-detail__audio-play"
                                    aria-label={audioPlaying ? 'Pauza' : 'Odtwórz'}
                                    onClick={() => setAudioPlaying((p) => !p)}
                                >
                                    {audioPlaying ? (
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )}
                                </button>
                                <div className="car-detail__audio-info">
                                    <p className="car-detail__audio-track">{car.audioTitle}</p>
                                    <div className="car-detail__audio-wave" aria-hidden="true">
                                        {WAVE_HEIGHTS.map((h, i) => (
                                            <span
                                                key={i}
                                                className={`car-detail__audio-bar${audioPlaying && i < 14 ? ' car-detail__audio-bar--active' : ''}`}
                                                style={{ height: `${h}px` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className="car-detail__audio-time">
                                    {car.audioCurrent} / {car.audioTotal}
                                </span>
                            </div>
                        </section>

                        <div className="car-detail__specs">
                            <div className="car-detail__spec">
                                <span className="car-detail__spec-label">MOC</span>
                                <span className="car-detail__spec-value">{car.powerText}</span>
                            </div>
                            <div className="car-detail__spec">
                                <span className="car-detail__spec-label">0-100 KM/H</span>
                                <span className="car-detail__spec-value">{car.acceleration}</span>
                            </div>
                            <div className="car-detail__spec">
                                <span className="car-detail__spec-label">V-MAX</span>
                                <span className="car-detail__spec-value">{car.vmax}</span>
                            </div>
                            <div className="car-detail__spec car-detail__spec--accent-red">
                                <span className="car-detail__spec-label">WAGA</span>
                                <span className="car-detail__spec-value">{car.weight}</span>
                            </div>
                        </div>

                        <div className="car-detail__info">
                            <h1 className="car-detail__title">{car.detailTitle}</h1>
                            {car.trackName && (
                                <p className="car-detail__track-note">
                                    TOR:{' '}
                                    <button
                                        type="button"
                                        className="car-detail__track-link"
                                        onClick={() => onNavigate?.('/track')}
                                    >
                                        {car.trackName}
                                    </button>
                                </p>
                            )}
                            <p className="car-detail__desc">{car.description}</p>
                        </div>
                    </div>

                    <aside className="car-detail__sidebar">
                        <h2 className="car-detail__sidebar-title">KONFIGURATOR WYNAJMU</h2>

                        <BookingCalendar
                            selectedDays={selectedDays}
                            unavailableDays={unavailableDays}
                            onToggleDay={toggleDay}
                        />

                        <div className="car-detail__addons">
                            <span className="car-detail__section-label">DODATKI</span>

                            <div className="car-detail__addon">
                                <div className="car-detail__addon-info">
                                    <p className="car-detail__addon-name">PAKIET TOROWY</p>
                                    <p className="car-detail__addon-desc">
                                        Instruktor, paliwo wyścigowe i sesja telemetrii na torze APEX Drive.{' '}
                                        <button
                                            type="button"
                                            className="car-detail__track-link"
                                            onClick={() => onNavigate?.('/track')}
                                        >
                                            Zobacz tor
                                        </button>
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={trackPackage}
                                    className={`car-detail__toggle${trackPackage ? ' car-detail__toggle--on' : ''}`}
                                    onClick={() => setTrackPackage((v) => !v)}
                                >
                                    <span className="car-detail__toggle-knob" />
                                </button>
                            </div>

                            <div className="car-detail__addon">
                                <div className="car-detail__addon-info">
                                    <p className="car-detail__addon-name">FILM Z PRZEJAZDU</p>
                                    <p className="car-detail__addon-desc">
                                        Profesjonalny montaż z kamer pokładowych.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={driveVideo}
                                    className={`car-detail__toggle${driveVideo ? ' car-detail__toggle--on' : ''}`}
                                    onClick={() => setDriveVideo((v) => !v)}
                                >
                                    <span className="car-detail__toggle-knob" />
                                </button>
                            </div>
                        </div>

                        {pricing && (
                            <div className="car-detail__pricing">
                                <div className="car-detail__price-row">
                                    <span>Base ({pricing.days} {pricing.days === 1 ? 'dzień' : 'dni'})</span>
                                    <span>{formatPrice(pricing.base)}</span>
                                </div>
                                <div className="car-detail__price-row">
                                    <span>Ubezpieczenie</span>
                                    <span>{formatPrice(pricing.insurance)}</span>
                                </div>
                                {pricing.video > 0 && (
                                    <div className="car-detail__price-row">
                                        <span>Film z przejazdu</span>
                                        <span>{formatPrice(pricing.video)}</span>
                                    </div>
                                )}
                                <div className="car-detail__price-row car-detail__price-row--total">
                                    <span>SUMA</span>
                                    <span>{formatPrice(pricing.total)}</span>
                                </div>
                            </div>
                        )}

                        <button
                            type="button"
                            className="car-detail__reserve-btn"
                            onClick={() => onNavigate?.('/account')}
                        >
                            REZERWUJ TERMIN
                        </button>
                        <button
                            type="button"
                            className="car-detail__notify-btn"
                            onClick={() => onNavigate(getNotifyPath(slug))}
                        >
                            POWIADOM MNIE
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
                            </svg>
                        </button>
                        <p className="car-detail__payment-note">
                            Bezpieczna płatność przez Stripe. Kaucja zwrotna: 20 000 PLN.
                        </p>
                    </aside>
                </div>
            </main>
            <Footer onNavigate={onNavigate} />
            <ChatWidget />
        </>
    )
}

export default CarDetail
