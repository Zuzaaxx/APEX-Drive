import { useMemo, useState } from 'react'
import Footer from '../components/Footer.jsx'
import ChatWidget from '../components/ChatWidget.jsx'
import {
    getTrainingInstructorById,
    getTrainingProgramById,
} from '../data/trainingPrograms.js'
import { buildTrainingCheckoutOrder, goToCheckout } from '../lib/checkoutOrder.js'
import './TrainingDetail.css'

const WEEKDAYS = ['PN', 'WT', 'ŚR', 'CZ', 'PT', 'SB', 'ND']
const MONTHS = [
    'STYCZEŃ', 'LUTY', 'MARZEC', 'KWIECIEŃ', 'MAJ', 'CZERWIEC',
    'LIPIEC', 'SIERPIEŃ', 'WRZESIEŃ', 'PAŹDZIERNIK', 'LISTOPAD', 'GRUDZIEŃ',
]

function formatPrice(value) {
    return `${value.toLocaleString('pl-PL')} PLN`
}

function formatSessionDate(day, monthIndex = 2, year = 2024) {
    return `${day} ${MONTHS[monthIndex]} ${year}`
}

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
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

function Calendar({ selectedDay, unavailableDays, onSelectDay }) {
    const year = 2024
    const month = 2
    const daysInMonth = 31
    const firstDayOffset = 4

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
        <div className="training-detail__calendar">
            <div className="training-detail__calendar-head">
                <span className="training-detail__calendar-month">
                    {MONTHS[month]} {year}
                </span>
                <div className="training-detail__calendar-nav">
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
            <div className="training-detail__calendar-weekdays">
                {WEEKDAYS.map((day) => (
                    <span key={day}>{day}</span>
                ))}
            </div>
            <div className="training-detail__calendar-days">
                {days.map((cell) => {
                    if (cell.empty) {
                        return (
                            <span
                                key={cell.key}
                                className="training-detail__calendar-day training-detail__calendar-day--empty"
                            />
                        )
                    }

                    const isUnavailable = unavailableDays.includes(cell.day)
                    const isSelected = selectedDay === cell.day

                    return (
                        <button
                            key={cell.key}
                            type="button"
                            disabled={isUnavailable}
                            className={[
                                'training-detail__calendar-day',
                                isSelected ? 'training-detail__calendar-day--selected' : '',
                                isUnavailable ? 'training-detail__calendar-day--unavailable' : '',
                            ].filter(Boolean).join(' ')}
                            onClick={() => onSelectDay(cell.day)}
                        >
                            {cell.day}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

function TrainingDetail({ slug, onNavigate }) {
    const program = getTrainingProgramById(slug)
    const instructor = program ? getTrainingInstructorById(program.instructorId) : null
    const [selectedDay, setSelectedDay] = useState(12)
    const unavailableDays = [5, 6, 19, 26]

    if (!program || !instructor) {
        return (
            <>
                <main className="training-detail">
                    <div className="training-detail__not-found">
                        <h1>Szkolenie nie znalezione</h1>
                        <p>Nie udało się znaleźć pakietu o podanym identyfikatorze.</p>
                        <button
                            type="button"
                            className="training-detail__back-btn"
                            onClick={() => onNavigate('/szkolenia')}
                        >
                            Wróć do szkoleń
                        </button>
                    </div>
                </main>
                <Footer />
                <ChatWidget />
            </>
        )
    }

    const sessionDate = formatSessionDate(selectedDay)

    const handleReserve = () => {
        goToCheckout(
            buildTrainingCheckoutOrder({
                program,
                instructor,
                sessionDate,
            }),
            onNavigate,
        )
    }

    return (
        <>
            <main className="training-detail">
                <section className="training-detail__hero" aria-labelledby="training-detail-title">
                    <div className="training-detail__hero-media" aria-hidden="true">
                        <img src={program.image} alt="" />
                    </div>
                    <div className="training-detail__hero-overlay" aria-hidden="true" />
                    <div className="training-detail__hero-content">
                        <p className="training-detail__hero-series">{program.series}</p>
                        <h1 id="training-detail-title" className="training-detail__hero-title">
                            {program.title}
                        </h1>
                        <p className="training-detail__hero-desc">{program.heroDesc}</p>
                    </div>
                </section>

                <section className="training-detail__section" aria-labelledby="training-detail-program">
                    <h2 id="training-detail-program" className="training-detail__section-title">
                        PROGRAM SZKOLENIA
                    </h2>
                    <div className="training-detail__program-layout">
                        <div className="training-detail__modules">
                            {program.modules.map((module) => (
                                <article key={module.number} className="training-detail__module">
                                    <div className="training-detail__module-time">{module.time}</div>
                                    <div className="training-detail__module-body">
                                        <span className="training-detail__module-number">{module.number}</span>
                                        <h3 className="training-detail__module-title">{module.title}</h3>
                                        <p className="training-detail__module-desc">{module.desc}</p>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <aside className="training-detail__sidebar">
                            <div className="training-detail__panel">
                                <h3 className="training-detail__panel-title">WYMAGANIA TECHNICZNE</h3>
                                <ul className="training-detail__requirements">
                                    {program.requirements.map((item) => (
                                        <li key={item}>
                                            <CheckIcon />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="training-detail__panel">
                                <h3 className="training-detail__panel-title">SPECYFIKACJA KOSZTÓW</h3>
                                <div className="training-detail__cost-lines">
                                    {program.costBreakdown.map((line) => (
                                        <div key={line.label} className="training-detail__cost-line">
                                            <span>{line.label}</span>
                                            <span>{formatPrice(line.amount)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="training-detail__cost-total">
                                    <span>SUMA BRUTTO</span>
                                    <span>{formatPrice(program.price)}</span>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>

                <section className="training-detail__instructor" aria-labelledby="training-detail-instructor">
                    <div className="training-detail__instructor-media" aria-hidden="true">
                        <img src="/images/hero-track.jpg" alt="" />
                    </div>
                    <div className="training-detail__instructor-overlay" aria-hidden="true" />
                    <div className="training-detail__instructor-layout">
                        <div className="training-detail__instructor-photo">
                            <img src={instructor.image} alt={instructor.name} loading="lazy" />
                        </div>
                        <div className="training-detail__instructor-copy">
                            <p className="training-detail__instructor-eyebrow">TWÓJ INSTRUKTOR</p>
                            <h2 id="training-detail-instructor" className="training-detail__instructor-name">
                                {instructor.name}
                            </h2>
                            <p className="training-detail__instructor-role">{instructor.title}</p>
                            <p className="training-detail__instructor-bio">{instructor.bio}</p>
                            <div className="training-detail__instructor-stats">
                                {instructor.stats.map((stat) => (
                                    <div key={stat.label} className="training-detail__instructor-stat">
                                        <span className="training-detail__instructor-stat-value">{stat.value}</span>
                                        <span className="training-detail__instructor-stat-label">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="training-detail__section training-detail__booking" aria-labelledby="training-detail-booking">
                    <div className="training-detail__booking-head">
                        <h2 id="training-detail-booking" className="training-detail__section-title">
                            ZAREZERWUJ TERMIN
                        </h2>
                        <p className="training-detail__booking-note">
                            OGRANICZONA DOSTĘPNOŚĆ: MAX {program.maxPerSession}{' '}
                            {program.maxPerSession === 1 ? 'OSOBA' : 'OSOBY'} NA SESJĘ
                        </p>
                    </div>

                    <div className="training-detail__booking-layout">
                        <Calendar
                            selectedDay={selectedDay}
                            unavailableDays={unavailableDays}
                            onSelectDay={setSelectedDay}
                        />

                        <aside className="training-detail__booking-summary">
                            <h3 className="training-detail__booking-summary-title">SZCZEGÓŁY WYBORU</h3>
                            <div className="training-detail__booking-meta">
                                <div>
                                    <span className="training-detail__booking-label">DATA SESJI</span>
                                    <span className="training-detail__booking-value">{sessionDate}</span>
                                </div>
                                <div>
                                    <span className="training-detail__booking-label">LOKALIZACJA</span>
                                    <span className="training-detail__booking-value">{program.location}</span>
                                </div>
                            </div>
                            <p className="training-detail__booking-status">
                                <span className="training-detail__booking-dot" aria-hidden="true" />
                                POTWIERDZONA DOSTĘPNOŚĆ
                            </p>
                            <button type="button" className="training-detail__reserve-btn" onClick={handleReserve}>
                                <BoltIcon />
                                REZERWUJĘ TERAZ
                            </button>
                        </aside>
                    </div>
                </section>
            </main>
            <Footer />
            <ChatWidget />
        </>
    )
}

export default TrainingDetail
