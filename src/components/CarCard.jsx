import '../pages/Start.css'

function CarCard({ badge, category, name, power, acceleration, image, price, onReserve }) {
    return (
        <article className="car-card">
            <div className="car-card__media">
                <img src={image} alt={name} loading="lazy" />
                {badge && <span className="car-card__badge">{badge}</span>}
            </div>
            <div className="car-card__body">
                <p className="car-card__category">{category}</p>
                <h3 className="car-card__name">{name}</h3>
                <div className="car-card__specs">
                    <span>{power}</span>
                    <span>{acceleration}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button type="button" className="btn btn--card" onClick={onReserve}>
                        REZERWUJ
                    </button>
                    {price && <div style={{ marginLeft: 'auto', fontWeight: 700 }}>{price}</div>}
                </div>
            </div>
        </article>
    )
}

export default CarCard
