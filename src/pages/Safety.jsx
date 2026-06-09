import { useState } from 'react'
import Footer from '../components/Footer.jsx'
import ChatWidget from '../components/ChatWidget.jsx'
import './Safety.css'

const FAQ_SECTIONS = [
    {
        id: 'insurance',
        title: 'UBEZPIECZENIE',
        icon: 'shield',
        content: (
            <>
                <div className="safety-card__highlight">
                    <span className="safety-card__highlight-label">ZAKRES ODPOWIEDZIALNOŚCI</span>
                    <p className="safety-card__highlight-text">
                        Każda sesja na torze obejmuje ubezpieczenie OC/AC uczestnika oraz assistance
                        medyczny na miejscu. Kaucja zwrotna jest blokowana przed jazdą i zwalniana po
                        bezszkodowym zakończeniu przejazdu.
                    </p>
                </div>
                <div className="safety-card__stats">
                    <div className="safety-card__stat">
                        <span className="safety-card__stat-label">LIMIT WŁASNEJ SKŁADKI</span>
                        <span className="safety-card__stat-value">20 000 PLN</span>
                    </div>
                    <div className="safety-card__stat">
                        <span className="safety-card__stat-label">OCHRONA MEDYCZNA</span>
                        <span className="safety-card__stat-value">BEZ LIMITU</span>
                    </div>
                </div>
            </>
        ),
    },
    {
        id: 'rules',
        title: 'ZASADY TORU',
        icon: 'flag',
        content: (
            <ul className="safety-card__rules">
                <li>
                    <strong>Sygnały flagowe</strong> — żółta: uwaga, nie wyprzedzaj. Czerwona: zakończ
                    okrążenie i wróć do boksu. Niebieska: pozwól na wyprzedzenie szybszemu pojazdowi.
                </li>
                <li>
                    <strong>Kask i wyposażenie</strong> — kask homologowany FIA, rękawice i buty
                    obowiązkowe. Kombinezon zalecany przy sesjach powyżej 30 minut.
                </li>
                <li>
                    <strong>Wyprzedzanie</strong> — tylko na prostej, po sygnale instruktora lub
                    niebieskiej fladze. Zakaz wyprzedzania w zakrętach i na dojeździe do boksu.
                </li>
                <li>
                    <strong>Substancje</strong> — absolutny zakaz alkoholu i środków odurzających przed
                    i w trakcie sesji. Kontrola przed wejściem na tor.
                </li>
            </ul>
        ),
    },
    {
        id: 'liability',
        title: 'ODPOWIEDZIALNOŚĆ',
        icon: 'document',
        content: (
            <>
                <div className="safety-card__protocol">
                    <p>
                        UCZESTNIK POTWIERDZA, ŻE ZNA ZASADY TORU POZNAŃ ORAZ REGULAMIN APEX DRIVE.
                        KIEROWCA PONOSI ODPOWIEDZIALNOŚĆ ZA SZKODY WYNIKŁE Z RAŻĄCEGO NARUSZENIA
                        PROCEDUR, IGNOROWANIA SYGNAŁÓW FLAGOWYCH LUB JAZDY POD WPŁYWEM ŚRODKÓW
                        ZABRONIONYCH. ODPOWIEDZIALNOŚĆ OBEJMUJE RÓWNIEŻ KOSZTY PRZESTOJU TORU
                        ORAZ USZKODZENIA INFRASTRUKTURY POZA STANDARDOWYM ZAKRESEM UBEZPIECZENIA.
                    </p>
                </div>
                <button
                    type="button"
                    className="safety-card__download"
                    onClick={() => alert('Pobieranie pełnego protokołu PDF...')}
                >
                    <DownloadIcon />
                    POBIERZ PEŁNY PROTOKÓŁ PDF
                </button>
            </>
        ),
    },
]

const INSTRUCTOR = {
    name: 'MARCIN WÓJTOWICZ',
    role: 'GŁÓWNY INSTRUKTOR',
    image: '/images/drivers/instructor.png',
    stats: [
        {
            icon: 'trophy',
            label: 'LICENCJA FIA GRADE A',
            value: '12 SEZONÓW W SERIACH GT',
        },
        {
            icon: 'timer',
            label: 'REKORD OKRĄŻENIA',
            value: '1:34.22 — TOR POZNAŃ',
        },
    ],
    quote:
        'Precyzja nie polega na prędkości. Prędkość jest efektem ubocznym precyzji, dyscypliny i znajomości toru.',
}

function ShieldIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" strokeLinejoin="round" />
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function FlagIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M5 4v16M5 4l12 4-6 4 6 4H5" strokeLinejoin="round" />
        </svg>
    )
}

function DocumentIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M8 4h8l4 4v12H8z" strokeLinejoin="round" />
            <path d="M16 4v4h4M10 13h6M10 17h4" strokeLinecap="round" />
        </svg>
    )
}

function DownloadIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M12 4v10M8 10l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 18h16" strokeLinecap="round" />
        </svg>
    )
}

function TrophyIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M8 5h8v3a4 4 0 0 1-8 0V5z" />
            <path d="M6 5H4v1a3 3 0 0 0 3 3M18 5h2v1a3 3 0 0 1-3 3" strokeLinecap="round" />
            <path d="M12 12v3M9 21h6M10 18h4" strokeLinecap="round" />
        </svg>
    )
}

function TimerIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="12" cy="13" r="8" />
            <path d="M12 9v4l2.5 2M10 3h4" strokeLinecap="round" />
        </svg>
    )
}

function ChevronIcon({ open }) {
    return (
        <svg
            className={`safety-card__chevron${open ? ' safety-card__chevron--open' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
        >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function SectionIcon({ type }) {
    if (type === 'flag') return <FlagIcon />
    if (type === 'document') return <DocumentIcon />
    return <ShieldIcon />
}

function FaqCard({ section, isOpen, onToggle }) {
    return (
        <article id={section.id} className={`safety-card${isOpen ? ' safety-card--open' : ''}`}>
            <button
                type="button"
                className="safety-card__head"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <span className={`safety-card__icon safety-card__icon--${section.icon}`}>
                    <SectionIcon type={section.icon} />
                </span>
                <span className="safety-card__title">{section.title}</span>
                <ChevronIcon open={isOpen} />
            </button>
            {isOpen && <div className="safety-card__body">{section.content}</div>}
        </article>
    )
}

function Safety() {
    const [openSections, setOpenSections] = useState(() => new Set(['insurance']))

    const toggleSection = (id) => {
        setOpenSections((prev) => {
            const next = new Set(prev)
            if (next.has(id)) {
                next.delete(id)
            } else {
                next.add(id)
            }
            return next
        })
    }

    return (
        <>
            <main className="safety-page">
                <header className="safety-page__hero">
                    <p className="safety-page__eyebrow">PROTOKÓŁ MISJI</p>
                    <h1 className="safety-page__title">BEZPIECZEŃSTWO I FAQ</h1>
                    <p className="safety-page__lead">
                        Precyzja jest obowiązkowa. Ryzyko jest kontrolowane. Informacje o
                        profesjonalnej eksploatacji toru, protokołach bezpieczeństwa kierowcy oraz
                        obowiązujących zasadach jazdy.
                    </p>
                </header>

                <div className="safety-page__layout">
                    <div className="safety-page__faq">
                        {FAQ_SECTIONS.map((section) => (
                            <FaqCard
                                key={section.id}
                                section={section}
                                isOpen={openSections.has(section.id)}
                                onToggle={() => toggleSection(section.id)}
                            />
                        ))}
                    </div>

                    <aside className="safety-page__aside">
                        <article className="safety-instructor">
                            <div className="safety-instructor__photo">
                                <img src={INSTRUCTOR.image} alt={INSTRUCTOR.name} loading="lazy" />
                                <div className="safety-instructor__overlay">
                                    <h2 className="safety-instructor__name">{INSTRUCTOR.name}</h2>
                                    <p className="safety-instructor__role">{INSTRUCTOR.role}</p>
                                </div>
                            </div>
                            <div className="safety-instructor__body">
                                {INSTRUCTOR.stats.map((stat) => (
                                    <div key={stat.label} className="safety-instructor__stat">
                                        <span className="safety-instructor__stat-icon" aria-hidden="true">
                                            {stat.icon === 'trophy' ? <TrophyIcon /> : <TimerIcon />}
                                        </span>
                                        <div>
                                            <span className="safety-instructor__stat-label">{stat.label}</span>
                                            <span className="safety-instructor__stat-value">{stat.value}</span>
                                        </div>
                                    </div>
                                ))}
                                <blockquote className="safety-instructor__quote">
                                    „{INSTRUCTOR.quote}"
                                </blockquote>
                                <button
                                    type="button"
                                    className="safety-instructor__cta"
                                    onClick={() => {
                                        setOpenSections((prev) => new Set(prev).add('insurance'))
                                        document.getElementById('insurance')?.scrollIntoView({ behavior: 'smooth' })
                                    }}
                                >
                                    ZOBACZ PROTOKÓŁ BEZPIECZEŃSTWA
                                </button>
                            </div>
                        </article>

                        <div className="safety-emergency">
                            <span className="safety-emergency__icon" aria-hidden="true">
                                !
                            </span>
                            <div>
                                <p className="safety-emergency__label">LINIA AWARYJNA</p>
                                <a className="safety-emergency__phone" href="tel:+48600123456">
                                    +48 600 123 456
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
            <ChatWidget />
        </>
    )
}

export default Safety
