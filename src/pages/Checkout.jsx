import { useMemo, useState } from 'react'
import Footer from '../components/Footer.jsx'
import ChatWidget from '../components/ChatWidget.jsx'
import { completeCheckout, readCheckoutOrder } from '../lib/checkoutOrder.js'
import './Checkout.css'

const PAYMENT_METHODS = [
    {
        id: 'blik',
        title: 'BLIK',
        description: 'Szybka płatność mobilna',
        icon: 'blik',
    },
    {
        id: 'card',
        title: 'KARTA PŁATNICZA',
        description: 'Visa, Mastercard, Maestro',
        icon: 'card',
    },
    {
        id: 'transfer',
        title: 'PRZELEW ONLINE',
        description: 'Przelew z Twojego banku',
        icon: 'transfer',
    },
]

const BANKS = [
    'mBank',
    'PKO BP',
    'ING Bank Śląski',
    'Santander',
    'Bank Pekao',
    'Millennium',
]

function formatPrice(value) {
    return `${value.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PLN`
}

function PaymentIcon({ type }) {
    if (type === 'blik') {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="5" y="3" width="14" height="18" rx="2" />
                <path d="M9 17h6" strokeLinecap="round" />
                <circle cx="12" cy="11" r="2.5" />
            </svg>
        )
    }

    if (type === 'card') {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
                <path d="M6 15h4" strokeLinecap="round" />
            </svg>
        )
    }

    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M3 10h18v10H3z" />
            <path d="M3 10l3-6h12l3 6" />
            <path d="M10 14h4" strokeLinecap="round" />
        </svg>
    )
}

function ShieldIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path
                d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"
                strokeLinejoin="round"
            />
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function PaymentMethodTile({ method, selected, onSelect }) {
    return (
        <button
            type="button"
            className={`checkout__method${selected ? ' checkout__method--selected' : ''}`}
            onClick={() => onSelect(method.id)}
            aria-pressed={selected}
        >
            <span className={`checkout__method-radio${selected ? ' checkout__method-radio--selected' : ''}`} />
            <span className="checkout__method-text">
                <span className="checkout__method-title">{method.title}</span>
                <span className="checkout__method-desc">{method.description}</span>
            </span>
            <span className="checkout__method-icon">
                <PaymentIcon type={method.icon} />
            </span>
        </button>
    )
}

function PaymentForm({ method }) {
    if (method === 'blik') {
        return (
            <div className="checkout__form">
                <label className="checkout__field checkout__field--full">
                    <span className="checkout__field-label">KOD BLIK</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="______"
                        autoComplete="one-time-code"
                    />
                </label>
            </div>
        )
    }

    if (method === 'card') {
        return (
            <div className="checkout__form">
                <label className="checkout__field checkout__field--full">
                    <span className="checkout__field-label">NUMER KARTY</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        placeholder="**** **** **** ****"
                        autoComplete="cc-number"
                    />
                </label>
                <div className="checkout__form-row">
                    <label className="checkout__field">
                        <span className="checkout__field-label">DATA WAŻNOŚCI</span>
                        <input type="text" placeholder="MM / YY" autoComplete="cc-exp" />
                    </label>
                    <label className="checkout__field">
                        <span className="checkout__field-label">CVC</span>
                        <input type="text" inputMode="numeric" placeholder="***" autoComplete="cc-csc" />
                    </label>
                </div>
            </div>
        )
    }

    return (
        <div className="checkout__form">
            <label className="checkout__field checkout__field--full">
                <span className="checkout__field-label">WYBIERZ BANK</span>
                <select className="checkout__select" defaultValue="">
                    <option value="" disabled>
                        Wybierz bank...
                    </option>
                    {BANKS.map((bank) => (
                        <option key={bank} value={bank}>
                            {bank}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    )
}

function Checkout({ onNavigate }) {
    const order = useMemo(() => readCheckoutOrder(), [])
    const [paymentMethod, setPaymentMethod] = useState('card')

    if (!order) {
        return (
            <>
                <main className="checkout">
                    <div className="checkout__empty">
                        <h1>Brak zamówienia</h1>
                        <p>Nie znaleziono danych zamówienia. Wróć i wybierz produkt do zakupu.</p>
                        <button type="button" className="checkout__back-btn" onClick={() => onNavigate('/cars')}>
                            Wróć do samochodów
                        </button>
                    </div>
                </main>
                <Footer />
                <ChatWidget />
            </>
        )
    }

    const handlePay = () => {
        completeCheckout(order, paymentMethod, onNavigate)
    }

    return (
        <>
            <main className="checkout">
                <div className="checkout__layout">
                    <section className="checkout__summary" aria-labelledby="checkout-summary-title">
                        <h1 id="checkout-summary-title" className="checkout__heading">
                            PODSUMOWANIE
                        </h1>

                        <article className="checkout__summary-card">
                            <div className="checkout__vehicle-head">
                                <div>
                                    <span className="checkout__eyebrow">{order.eyebrow}</span>
                                    <h2 className="checkout__vehicle-name">{order.title}</h2>
                                </div>
                                {order.badge && <span className="checkout__badge">{order.badge}</span>}
                            </div>

                            <div className="checkout__vehicle-image">
                                <img src={order.image} alt={order.title} />
                            </div>

                            <div className="checkout__meta">
                                {order.meta.map((item) => (
                                    <div key={item.label} className="checkout__meta-item">
                                        <span className="checkout__meta-label">{item.label}</span>
                                        <span className="checkout__meta-value">{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="checkout__lines">
                                {order.lineItems.map((item) => (
                                    <div key={item.label} className="checkout__line">
                                        <span>{item.label}</span>
                                        <span>{formatPrice(item.amount)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="checkout__total">
                                <span>SUMA</span>
                                <span>{formatPrice(order.total)}</span>
                            </div>
                        </article>

                        <aside className="checkout__info-card">
                            <span className="checkout__info-icon">
                                <ShieldIcon />
                            </span>
                            <div>
                                <p className="checkout__info-title">{order.infoTitle}</p>
                                <p className="checkout__info-desc">{order.infoDesc}</p>
                            </div>
                        </aside>
                    </section>

                    <section className="checkout__payment" aria-labelledby="checkout-payment-title">
                        <div className="checkout__payment-head">
                            <h1 id="checkout-payment-title" className="checkout__heading checkout__heading--plain">
                                PŁATNOŚĆ
                            </h1>
                            <span className="checkout__step">KROK 2 Z 2</span>
                        </div>

                        <div className="checkout__methods">
                            <span className="checkout__eyebrow checkout__eyebrow--methods">WYBIERZ METODĘ</span>
                            <div className="checkout__method-list">
                                {PAYMENT_METHODS.map((method) => (
                                    <PaymentMethodTile
                                        key={method.id}
                                        method={method}
                                        selected={paymentMethod === method.id}
                                        onSelect={setPaymentMethod}
                                    />
                                ))}
                            </div>
                        </div>

                        <PaymentForm method={paymentMethod} />

                        <button type="button" className="checkout__pay-btn" onClick={handlePay}>
                            ZAPŁAĆ {formatPrice(order.total)} &gt;&gt;
                        </button>

                        <p className="checkout__ssl-note">
                            BEZPIECZNA TRANSAKCJA SZYFROWANA SSL 256-BIT
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
            <ChatWidget />
        </>
    )
}

export default Checkout
