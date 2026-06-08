import '../pages/Start.css'

function CarCard({ badge, category, name, power, acceleration, image, price, onClick, highlightedReserve = false }) {
    const handleKeyDown = (event) => {
        if (!onClick) return
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onClick()
        }
    }

    return (
        <article
            className={`car-card${onClick ? ' car-card--clickable' : ''}`}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            role={onClick ? 'link' : undefined}
            tabIndex={onClick ? 0 : undefined}
            aria-label={onClick ? `Zobacz szczegóły: ${name}` : undefined}
        >
            <div className="car-card__media">
                <img src={image} alt={name} loading="lazy" />
                {badge && <span className="car-card__badge">{badge}</span>}
            </div>
            <div className="car-card__body">
                <p className="car-card__category">{category}</p>
                <h3 className="car-card__name">{name}</h3>
                <div className="car-card__specs">
                    <span className="car-card__spec">
                        <span className="car-card__spec-label">POWER</span>
                        <span className="car-card__spec-value">{power}</span>
                    </span>
                    <span className="car-card__spec">
                        <span className="car-card__spec-label">0-100</span>
                        <span className="car-card__spec-value">{acceleration}</span>
                    </span>
                </div>
                <div className="car-card__footer">
                    {price && <div className="car-card__price">{price}</div>}
                    <span
                        className={`car-card__reserve ${highlightedReserve ? 'car-card__reserve--hot' : ''}`}
                        aria-hidden="true"
                    >
                        RESERVE
                    </span>
                </div>
            </div>
        </article>
    )
}

export default CarCard
