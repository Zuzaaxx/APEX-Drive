import './Start.css'
import { useMemo, useState } from 'react'
import { CARS } from '../data/cars.js'
import CarCard from '../components/CarCard.jsx'
import Footer from '../components/Footer.jsx'
import ChatWidget from '../components/ChatWidget.jsx'

const EVENTS = [
    {
        date: 'NOVEMBER 8',
        title: 'NIGHT ATTACK: NÜRBURGRING',
        desc: 'High-intensity telemetry sessions under the lights.',
        image: '/images/hero-track.jpg',
    },
    {
        date: 'NOVEMBER 12',
        title: 'TELEMETRY MASTERCLASS',
        desc: 'Analyze your lap times with professional engineers.',
        image: '/images/cars/mclaren-720s.jpg',
    },
    {
        date: 'DECEMBER 05',
        title: 'WINTER STAGE: FINLAND',
        desc: 'Ice driving experience at the limit of grip.',
        image: '/images/cars/porsche-911.jpg',
    },
]

function Cars({ onNavigate }) {
    const [search, setSearch] = useState('')
    const [brand, setBrand] = useState('WSZYSTKIE')
    const [minPower, setMinPower] = useState(0)
    const [type, setType] = useState('WSZYSTKIE')

    const brands = useMemo(() => ['WSZYSTKIE', ...Array.from(new Set(CARS.map((c) => c.brand)))], [])
    const types = useMemo(() => ['WSZYSTKIE', ...Array.from(new Set(CARS.map((c) => c.type)))], [])

    const filtered = useMemo(() => {
        return CARS.filter((c) => {
            if (brand !== 'WSZYSTKIE' && c.brand !== brand) return false
            if (type !== 'WSZYSTKIE' && c.type !== type) return false
            if (minPower && c.power < minPower) return false
            if (search && !`${c.name} ${c.category} ${c.brand}`.toLowerCase().includes(search.toLowerCase())) return false
            return true
        })
    }, [search, brand, minPower, type])

    return (
        <>
            <main className="home">
                <section className="section cars-page">
                    <div className="cars-page__controls">
                        <label className="cars-page__search">
                            <span className="cars-page__search-icon" aria-hidden="true">
                                🔍
                            </span>
                            <input
                                aria-label="Wyszukaj model lub parametry"
                                placeholder="WYSZUKAJ MODEL LUB PARAMETRY..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </label>

                        <div className="cars-page__filters-row">
                            <div className="cars-page__filter-group">
                                <span className="cars-page__filter-label">MARKA:</span>
                                {brands.map((b) => (
                                    <button
                                        key={b}
                                        type="button"
                                        className={`cars-page__chip ${brand === b ? 'cars-page__chip--active' : ''}`}
                                        onClick={() => setBrand(b)}
                                    >
                                        {b}
                                    </button>
                                ))}
                            </div>

                            <div className="cars-page__filter-group">
                                <span className="cars-page__filter-label">MOC:</span>
                                <button
                                    type="button"
                                    className={`cars-page__chip ${minPower === 400 ? 'cars-page__chip--active' : ''}`}
                                    onClick={() => setMinPower(minPower === 400 ? 0 : 400)}
                                >
                                    400+ KM
                                </button>
                                <button
                                    type="button"
                                    className={`cars-page__chip ${minPower === 600 ? 'cars-page__chip--active' : ''}`}
                                    onClick={() => setMinPower(minPower === 600 ? 0 : 600)}
                                >
                                    600+ KM
                                </button>
                            </div>

                            <div className="cars-page__filter-group">
                                <span className="cars-page__filter-label">TYP:</span>
                                {types.map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        className={`cars-page__chip ${type === item ? 'cars-page__chip--active' : ''}`}
                                        onClick={() => setType(item)}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="cars-grid cars-grid--cars-page">
                        {filtered.map((car) => (
                            <CarCard
                                key={car.name}
                                badge={car.badge}
                                category={car.category}
                                name={car.name}
                                power={car.powerText}
                                acceleration={car.acceleration}
                                image={car.image}
                                price={car.price}
                                highlightedReserve={car.badge === 'LIMITED'}
                                onClick={() => onNavigate?.(`/cars/${car.slug}`)}
                            />
                        ))}
                    </div>
                </section>

                <section className="section cars-events">
                    <div className="cars-events__head">
                        <h2 className="cars-events__title">UPCOMING EVENTS</h2>
                        <span className="cars-events__line" aria-hidden="true" />
                    </div>
                    <div className="cars-events__grid">
                        {EVENTS.map((event) => (
                            <article key={event.title} className="cars-event-tile">
                                <img src={event.image} alt={event.title} loading="lazy" />
                                <div className="cars-event-tile__overlay" />
                                <div className="cars-event-tile__content">
                                    <p className="cars-event-tile__date">{event.date}</p>
                                    <h3 className="cars-event-tile__title">{event.title}</h3>
                                    <p className="cars-event-tile__desc">{event.desc}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
            <ChatWidget />
        </>
    )
}

export default Cars
