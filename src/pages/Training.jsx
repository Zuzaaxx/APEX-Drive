import { useEffect, useRef } from 'react'
import Footer from '../components/Footer.jsx'
import ChatWidget from '../components/ChatWidget.jsx'
import {
    getTrainingInstructorById,
    TRAINING_INSTRUCTORS,
    TRAINING_PROGRAMS,
} from '../data/trainingPrograms.js'
import './Training.css'

const EQUIPMENT = [
    {
        title: 'SYMULATORY DIRECT-DRIVE',
        desc: 'Feedback 1:1 z rzeczywistą siłą na kierownicy — trening techniki hamowania i wejścia w zakręt.',
        accent: 'gold',
    },
    {
        title: 'LOGOWANIE DANYCH MOTEC',
        desc: 'Pełna telemetria: czasy sektorów, nacisk na pedały, kąt skrętu i temperatura opon.',
        accent: 'red',
    },
    {
        title: 'ANALIZA WIDEO Z TORU',
        desc: 'Nagrania z kamer narożnych i pokładowych z omówieniem każdego okrążenia z instruktorem.',
        accent: 'white',
    },
]

function formatPrice(value) {
    return `${value.toLocaleString('pl-PL')} PLN`
}

function ClockIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
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

function TelemetryIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4 18h16M6 14l3-4 3 2 4-6 2 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function ProgramCard({ program, onSelect }) {
    return (
        <article className="training-program">
            <div className="training-program__media">
                <img src={program.image} alt="" loading="lazy" />
                <span className="training-program__level">{program.level}</span>
            </div>
            <div className="training-program__body">
                <div className="training-program__head">
                    <h3 className="training-program__title">{program.title}</h3>
                    <span className="training-program__price">{formatPrice(program.price)}</span>
                </div>
                <div className="training-program__meta">
                    <span>
                        <ClockIcon />
                        {program.duration}
                    </span>
                    <span>
                        <UserIcon />
                        {getTrainingInstructorById(program.instructorId)?.title ?? 'INSTRUKTOR'}
                    </span>
                </div>
                <button
                    type="button"
                    className="training-program__btn"
                    onClick={() => onSelect(program)}
                >
                    WYBIERZ PAKIET
                </button>
            </div>
        </article>
    )
}

function Training({ onNavigate }) {
    const equipmentCopyRef = useRef(null)
    const equipmentVisualsRef = useRef(null)

    useEffect(() => {
        const copyEl = equipmentCopyRef.current
        const visualsEl = equipmentVisualsRef.current
        if (!copyEl || !visualsEl) return undefined

        const syncEquipmentHeight = () => {
            const isDesktop = window.matchMedia('(min-width: 1025px)').matches
            if (!isDesktop) {
                visualsEl.style.height = ''
                return
            }
            visualsEl.style.height = `${copyEl.offsetHeight}px`
        }

        syncEquipmentHeight()

        const observer = new ResizeObserver(syncEquipmentHeight)
        observer.observe(copyEl)
        window.addEventListener('resize', syncEquipmentHeight)

        return () => {
            observer.disconnect()
            window.removeEventListener('resize', syncEquipmentHeight)
        }
    }, [])

    const scrollToPrograms = () => {
        document.getElementById('programy-szkoleniowe')?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleSelectProgram = (program) => {
        if (!onNavigate) return
        onNavigate(`/szkolenia/${program.id}`)
    }

    return (
        <>
            <main className="training-page">
                <section className="training-hero" aria-labelledby="training-hero-title">
                    <div className="training-hero__media" aria-hidden="true">
                        <img src="/images/hero-track.jpg" alt="" fetchPriority="high" />
                    </div>
                    <div className="training-hero__overlay" aria-hidden="true" />
                    <div className="training-hero__content">
                        <p className="training-hero__eyebrow">
                            <span className="training-hero__eyebrow-line" aria-hidden="true" />
                            INŻYNIERIA PRECYZJI KINETYCZNEJ
                        </p>
                        <h1 id="training-hero-title" className="training-hero__title">
                            AKADEMIA APEX
                        </h1>
                        <p className="training-hero__desc">
                            Profesjonalne szkolenia torowe oparte na telemetrii i metodologii
                            wyścigowej. Od pierwszego okrążenia po mistrzowską linię — każdy pakiet
                            łączy czas na torze, analizę danych i pracę z instruktorem klasy GT.
                        </p>
                        <div className="training-hero__actions">
                            <button type="button" className="training-btn training-btn--red" onClick={scrollToPrograms}>
                                ROZPOCZNIJ SZKOLENIE
                            </button>
                            <button type="button" className="training-btn training-btn--outline-gold" onClick={scrollToPrograms}>
                                ZOBACZ PAKIETY
                            </button>
                        </div>
                    </div>
                </section>

                <section
                    id="programy-szkoleniowe"
                    className="training-section training-programs"
                    aria-labelledby="training-programs-title"
                >
                    <div className="training-section__head">
                        <div>
                            <p className="training-section__eyebrow">PROGRAMY SZKOLENIOWE</p>
                            <h2 id="training-programs-title" className="training-section__title">
                                PRECYZYJNY PROGRAM V4.0
                            </h2>
                        </div>
                        <p className="training-programs__telemetry">
                            <TelemetryIcon />
                            TELEMETRIA W CZASIE RZECZYWISTYM
                        </p>
                    </div>

                    <div className="training-programs__grid">
                        {TRAINING_PROGRAMS.map((program) => (
                            <ProgramCard
                                key={program.id}
                                program={program}
                                onSelect={handleSelectProgram}
                            />
                        ))}
                    </div>
                </section>

                <section className="training-section training-cadre" aria-labelledby="training-cadre-title">
                    <h2 id="training-cadre-title" className="training-cadre__title">
                        ELITARNY ZESPÓŁ
                    </h2>
                    <div className="training-cadre__grid">
                        {TRAINING_INSTRUCTORS.map((person) => (
                            <article
                                key={person.name}
                                className={`training-instructor training-instructor--${person.accent}`}
                            >
                                <div className="training-instructor__photo">
                                    <img src={person.image} alt="" loading="lazy" />
                                </div>
                                <h3 className="training-instructor__name">{person.name}</h3>
                                <p className="training-instructor__role">{person.role}</p>
                                {person.cadreStats.map((stat) => (
                                    <p key={stat} className="training-instructor__stat">
                                        {stat}
                                    </p>
                                ))}
                            </article>
                        ))}
                    </div>
                </section>

                <section className="training-section training-equipment" aria-labelledby="training-equipment-title">
                    <div ref={equipmentCopyRef} className="training-equipment__copy">
                        <h2 id="training-equipment-title" className="training-equipment__title">
                            <span className="training-equipment__title-line training-equipment__title-line--pro">
                                PRO
                            </span>
                            <span className="training-equipment__title-line training-equipment__title-line--gear">
                                SPRZĘT
                            </span>
                        </h2>
                        <p className="training-equipment__lead">
                            Każde szkolenie w Akademii APEX odbywa się na profesjonalnym sprzęcie
                            motorsportowym — od symulatorów po systemy logowania danych używane w
                            stawkach GT i Formuły.
                        </p>
                        <ul className="training-equipment__list">
                            {EQUIPMENT.map((item) => (
                                <li
                                    key={item.title}
                                    className={`training-equipment__item training-equipment__item--${item.accent}`}
                                >
                                    <p className="training-equipment__item-title">{item.title}</p>
                                    <p className="training-equipment__item-desc">{item.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div ref={equipmentVisualsRef} className="training-equipment__visuals">
                        <div className="training-equipment__visual training-equipment__visual--main">
                            <img src="/images/equipment/equipment1.png" alt="" loading="lazy" />
                        </div>
                        <div className="training-equipment__visual-row">
                            <div className="training-equipment__visual">
                                <img src="/images/equipment/equipment2.png" alt="" loading="lazy" />
                            </div>
                            <div className="training-equipment__visual">
                                <img src="/images/equipment/equipment3.png" alt="" loading="lazy" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <ChatWidget />
        </>
    )
}

export default Training
