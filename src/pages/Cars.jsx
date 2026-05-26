import './Start.css'
import { useMemo, useState } from 'react'
import CarCard from '../components/CarCard.jsx'
import Footer from '../components/Footer.jsx'

const CARS = [
    {
        badge: 'AVAILABLE',
        brand: 'PORSCHE',
        category: 'GT3 PERFORMANCE',
        name: 'PORSCHE 911 GT3 RS',
        power: 525,
        powerText: '525 KM',
        acceleration: '3.2S DO 100KM/H',
        image: '/images/cars/porsche-911.jpg',
        price: '1 200 PLN',
        type: 'GT3',
    },
    {
        badge: 'LIMITED',
        brand: 'FERRARI',
        category: 'HYBRID EXCELLENCE',
        name: 'FERRARI F8',
        power: 700,
        powerText: '700 KM',
        acceleration: '2.9S DO 100KM/H',
        image: '/images/cars/ferrari-f8.jpg',
        price: '2 500 PLN',
        type: 'TRACK DAY',
    },
    {
        badge: 'TRENDING',
        brand: 'MCLAREN',
        category: 'SURGICAL PRECISION',
        name: 'MCLAREN 720S',
        power: 720,
        powerText: '720 KM',
        acceleration: '2.9S DO 100KM/H',
        image: '/images/cars/mclaren-720s.jpg',
        price: '1 650 PLN',
        type: 'GT3',
    },
]

function Cars() {
    const [search, setSearch] = useState('')
    const [brand, setBrand] = useState('WSZYSTKIE')
    const [minPower, setMinPower] = useState(0)

    const brands = useMemo(() => ['WSZYSTKIE', ...Array.from(new Set(CARS.map((c) => c.brand)))], [])

    const filtered = useMemo(() => {
        return CARS.filter((c) => {
            if (brand !== 'WSZYSTKIE' && c.brand !== brand) return false
            if (minPower && c.power < minPower) return false
            if (search && !`${c.name} ${c.category} ${c.brand}`.toLowerCase().includes(search.toLowerCase())) return false
            return true
        })
    }, [search, brand, minPower])

    return (
        <>
            <main className="home">
                <section className="section cars-section">
                    <div className="section__head">
                        <h2 className="section__title">
                            <span className="section__title-text">FLOTA POJAZDÓW</span>
                            <span className="section__title-line" aria-hidden="true" />
                        </h2>
                    </div>

                    <div style={{ maxWidth: '1200px', margin: '0 auto 20px' }}>
                        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                            <input
                                aria-label="Szukaj pojazdu"
                                placeholder="Wyszukaj model lub parametry..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ flex: 1, padding: '12px 16px', background: '#111', border: '1px solid #2a2a2a', color: '#fff' }}
                            />
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button className={`btn ${minPower === 400 ? 'btn--gold' : ''}`} onClick={() => setMinPower(minPower === 400 ? 0 : 400)}>
                                    400+ KM
                                </button>
                                <button className={`btn ${minPower === 600 ? 'btn--gold' : ''}`} onClick={() => setMinPower(minPower === 600 ? 0 : 600)}>
                                    600+ KM
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                            {brands.map((b) => (
                                <button key={b} type="button" className={`btn ${brand === b ? 'btn--gold' : ''}`} onClick={() => setBrand(b)}>
                                    {b}
                                </button>
                            ))}
                        </div>

                        <div className="cars-grid">
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
                                    onReserve={() => alert(`Rezerwacja: ${car.name}`)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Cars
