import { useMemo, useState } from 'react'
import Footer from '../components/Footer.jsx'
import ChatWidget from '../components/ChatWidget.jsx'
import { buildVoucherCheckoutOrder, goToCheckout } from '../lib/checkoutOrder.js'
import './Vouchers.css'

const VOUCHER_MODELS = [
    {
        id: 'porsche-911-gt3-rs',
        name: 'PORSCHE 911 GT3 RS',
        experience: 'GT3 RS TRACK',
        price: 2450,
        image: '/images/cars/porsche-911.jpg',
    },
    {
        id: 'lamborghini-sto',
        name: 'LAMBORGHINI HURACÁN STO',
        experience: 'HURACÁN STO TRACK',
        price: 1800,
        image: '/images/cars/lamborghini-huracan-STO.jpg',
    },
]

const OPEN_VOUCHER = {
    experience: 'ELITE TRACK DAY',
    price: 3200,
    image: '/images/hero-track.jpg',
}

const QR_PATTERN = [
    1, 1, 1, 0, 1, 1, 1,
    1, 0, 1, 1, 0, 1, 0,
    1, 0, 1, 0, 1, 0, 1,
    0, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 1, 0,
    1, 1, 0, 0, 1, 0, 1,
    1, 1, 1, 0, 1, 1, 1,
]

function formatPrice(value) {
    return value.toLocaleString('pl-PL')
}

function CarIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M5 15h14l-1.5-5.5a2 2 0 0 0-1.9-1.5H8.4a2 2 0 0 0-1.9 1.5L5 15z" strokeLinejoin="round" />
            <circle cx="7.5" cy="17.5" r="1.5" />
            <circle cx="16.5" cy="17.5" r="1.5" />
            <path d="M5 15h-1.5M19 15h1.5" strokeLinecap="round" />
        </svg>
    )
}

function CalendarIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
        </svg>
    )
}

function Vouchers({ onNavigate }) {
    const [voucherType, setVoucherType] = useState('specific')
    const [recipientName, setRecipientName] = useState('JAN KOWALSKI')
    const [message, setMessage] = useState(
        'Janie, spełnij swoje marzenie o jeździe GT3. Do zobaczenia na torze!',
    )
    const [selectedModel, setSelectedModel] = useState(VOUCHER_MODELS[0].id)

    const activeModel = useMemo(() => {
        if (voucherType === 'open') return OPEN_VOUCHER
        return VOUCHER_MODELS.find((m) => m.id === selectedModel) ?? VOUCHER_MODELS[0]
    }, [voucherType, selectedModel])

    const displayName = recipientName.trim() || 'JAN KOWALSKI'
    const displayMessage = message.trim() || 'Twoja dedykacja pojawi się tutaj...'

    const handlePurchase = () => {
        if (!onNavigate) return

        goToCheckout(
            buildVoucherCheckoutOrder({
                voucherType,
                activeModel,
                recipientName: displayName,
                selectedModelId: selectedModel,
            }),
            onNavigate,
        )
    }

    return (
        <>
            <main className="vouchers-page">
                <header className="vouchers-page__hero">
                    <p className="vouchers-page__eyebrow">ELITE DRIVING EXPERIENCES</p>
                    <h1 className="vouchers-page__title">GIFT VOUCHERS</h1>
                    <p className="vouchers-page__lead">
                        Podaruj emocje na torze. Wybierz konkretny model z naszej floty lub pozwól
                        obdarowanemu zdecydować o terminie i aucie.
                    </p>
                </header>

                <div className="vouchers-page__layout">
                    <div className="vouchers-page__form">
                        <div className="vouchers-page__type-toggle">
                            <button
                                type="button"
                                className={`vouchers-page__type-btn${voucherType === 'specific' ? ' vouchers-page__type-btn--active' : ''}`}
                                onClick={() => setVoucherType('specific')}
                            >
                                <CarIcon />
                                KONKRETNE AUTO
                            </button>
                            <button
                                type="button"
                                className={`vouchers-page__type-btn${voucherType === 'open' ? ' vouchers-page__type-btn--active' : ''}`}
                                onClick={() => setVoucherType('open')}
                            >
                                <CalendarIcon />
                                OTWARTY TERMIN
                            </button>
                        </div>

                        <span className="vouchers-page__step-label">STEP 01: PERSONALIZATION</span>

                        <div className="vouchers-page__field">
                            <label className="vouchers-page__field-label" htmlFor="recipient-name">
                                IMIĘ I NAZWISKO ODBIORCY
                            </label>
                            <input
                                id="recipient-name"
                                className="vouchers-page__input"
                                type="text"
                                placeholder="NP. JAN KOWALSKI"
                                value={recipientName}
                                onChange={(e) => setRecipientName(e.target.value)}
                            />
                        </div>

                        <div className="vouchers-page__field">
                            <label className="vouchers-page__field-label" htmlFor="voucher-message">
                                WIADOMOŚĆ (OPCJONALNIE)
                            </label>
                            <textarea
                                id="voucher-message"
                                className="vouchers-page__textarea"
                                placeholder="TWOJA DEDYKACJA TUTAJ..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>

                        {voucherType === 'specific' && (
                            <div className="vouchers-page__models">
                                <span className="vouchers-page__models-label">WYBIERZ MODEL</span>
                                <div className="vouchers-page__model-list">
                                    {VOUCHER_MODELS.map((model) => (
                                        <button
                                            key={model.id}
                                            type="button"
                                            className={`vouchers-page__model${selectedModel === model.id ? ' vouchers-page__model--active' : ''}`}
                                            onClick={() => setSelectedModel(model.id)}
                                        >
                                            <span className="vouchers-page__model-name">{model.name}</span>
                                            <span className="vouchers-page__model-meta">
                                                {selectedModel === model.id
                                                    ? 'SELECTED'
                                                    : `PLN ${formatPrice(model.price)}`}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="vouchers-page__checkout">
                            <span className="vouchers-page__total-label">TOTAL AMOUNT</span>
                            <span className="vouchers-page__total-value">
                                {formatPrice(activeModel.price)} PLN
                            </span>
                            <div className="vouchers-page__total-notes">
                                <span>INCLUDES VAT 23%</span>
                                <span>INSURANCE COVERED</span>
                            </div>
                            <button
                                type="button"
                                className="vouchers-page__purchase-btn"
                                onClick={handlePurchase}
                            >
                                PURCHASE VOUCHER
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="vouchers-page__preview">
                        <div className="vouchers-page__preview-head">
                            <h2 className="vouchers-page__preview-title">
                                <span className="vouchers-page__preview-dot" aria-hidden="true" />
                                LIVE PDF PREVIEW
                            </h2>
                            <div className="vouchers-page__preview-actions">
                                <button type="button" aria-label="Powiększ podgląd">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                                        <circle cx="11" cy="11" r="7" />
                                        <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" strokeLinecap="round" />
                                    </svg>
                                </button>
                                <button type="button" aria-label="Pobierz PDF">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                                        <path d="M12 4v10M8 10l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4 18h16" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <article className="vouchers-page__voucher" aria-label="Podgląd vouchera">
                            <div className="vouchers-page__voucher-bg">
                                <img src={activeModel.image} alt="" />
                            </div>
                            <div className="vouchers-page__voucher-overlay" />
                            <div className="vouchers-page__voucher-content">
                                <div className="vouchers-page__voucher-top">
                                    <span className="vouchers-page__voucher-brand">
                                        VELOCITY PERFORMANCE
                                        <br />
                                        DRIVING GIFT
                                    </span>
                                    <span className="vouchers-page__voucher-code">#VLC-2024-882</span>
                                </div>

                                <div className="vouchers-page__voucher-fields">
                                    <div>
                                        <span className="vouchers-page__voucher-field-label">DRIVER NAME</span>
                                        <span className="vouchers-page__voucher-field-value">{displayName}</span>
                                    </div>
                                    <div>
                                        <span className="vouchers-page__voucher-field-label">EXPERIENCE</span>
                                        <span className="vouchers-page__voucher-field-value">
                                            {activeModel.experience}
                                        </span>
                                    </div>
                                    <div className="vouchers-page__voucher-field--wide">
                                        <span className="vouchers-page__voucher-field-label">PERSONAL MESSAGE</span>
                                        <span className="vouchers-page__voucher-field-value vouchers-page__voucher-field-value--sm">
                                            {displayMessage}
                                        </span>
                                    </div>
                                </div>

                                <div className="vouchers-page__voucher-bottom">
                                    <div className="vouchers-page__voucher-details">
                                        <div>
                                            <span className="vouchers-page__voucher-field-label">LOCATION</span>
                                            <span className="vouchers-page__voucher-field-value">TOR POZNAŃ</span>
                                        </div>
                                        <div>
                                            <span className="vouchers-page__voucher-field-label">DURATION</span>
                                            <span className="vouchers-page__voucher-field-value">5 LAPS + INTRO</span>
                                        </div>
                                    </div>
                                    <div className="vouchers-page__qr" aria-hidden="true">
                                        <div className="vouchers-page__qr-grid">
                                            {QR_PATTERN.map((cell, i) => (
                                                <span
                                                    key={i}
                                                    className={`vouchers-page__qr-cell vouchers-page__qr-cell--${cell ? 'on' : 'off'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <div className="vouchers-page__features">
                            <div className="vouchers-page__feature">
                                <svg className="vouchers-page__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div>
                                    <p className="vouchers-page__feature-title">INSTANT DELIVERY</p>
                                    <p className="vouchers-page__feature-desc">PDF sent in seconds</p>
                                </div>
                            </div>
                            <div className="vouchers-page__feature">
                                <svg className="vouchers-page__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="3" y="5" width="18" height="16" rx="2" />
                                    <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
                                </svg>
                                <div>
                                    <p className="vouchers-page__feature-title">12 MONTHS</p>
                                    <p className="vouchers-page__feature-desc">Validity period</p>
                                </div>
                            </div>
                            <div className="vouchers-page__feature">
                                <svg className="vouchers-page__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" strokeLinejoin="round" />
                                </svg>
                                <div>
                                    <p className="vouchers-page__feature-title">SECURE</p>
                                    <p className="vouchers-page__feature-desc">Encrypted payment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <ChatWidget />
        </>
    )
}

export default Vouchers
