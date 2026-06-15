import { setAuthRedirect } from './authRedirect.js'

export const ORDER_STORAGE_KEY = 'apex-checkout-order'
export const CONFIRMATION_STORAGE_KEY = 'apex-confirmation'
export const TRACK_VENUE = 'TOR KRAKÓW, WYŚCIGOWA 3'
export const TRACK_VENUE_MAP = 'TOR KRAKÓW — WYŚCIGOWA 3'

const PAYMENT_LABELS = {
    blik: 'BLIK',
    card: 'KARTA PŁATNICZA',
    transfer: 'PRZELEW ONLINE',
}

const DEFAULT_INFO = {
    title: 'BRAK UKRYTYCH KOSZTÓW',
    desc: 'Cena obejmuje ubezpieczenie OC/AC, paliwo wyścigowe oraz wsparcie techniczne na torze.',
}

const SOURCE_PATHS = {
    car: '/cars',
    voucher: '/vouchers',
    event: '/kalendarz',
    training: '/szkolenia',
    track: '/track',
}

/**
 * @typedef {Object} CheckoutMetaItem
 * @property {string} label
 * @property {string} value
 */

/**
 * @typedef {Object} CheckoutLineItem
 * @property {string} label
 * @property {number} amount
 */

/**
 * @typedef {Object} CheckoutOrder
 * @property {'car' | 'voucher' | 'event' | 'training' | 'track'} type
 * @property {string} eyebrow
 * @property {string} title
 * @property {string} image
 * @property {string} [badge]
 * @property {CheckoutMetaItem[]} meta
 * @property {CheckoutLineItem[]} lineItems
 * @property {number} total
 * @property {string} [infoTitle]
 * @property {string} [infoDesc]
 * @property {string} [sourcePath]
 */

export function saveCheckoutOrder(order) {
    sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order))
}

export function readCheckoutOrder() {
    try {
        const raw = sessionStorage.getItem(ORDER_STORAGE_KEY)
        if (!raw) return null
        return normalizeOrder(JSON.parse(raw))
    } catch {
        return null
    }
}

export function goToCheckout(order, onNavigate) {
    saveCheckoutOrder(order)
    onNavigate('/checkout')
}

export function goToCheckoutWithAuth(order, onNavigate, isAuthenticated) {
    saveCheckoutOrder(order)

    if (isAuthenticated) {
        onNavigate('/checkout')
        return
    }

    setAuthRedirect('/checkout')
    onNavigate('/login')
}

/** Obsługa starszego formatu zapisu (wynajem auta). */
export function normalizeOrder(raw) {
    if (!raw) return null

    if (raw.title && raw.type) {
        return {
            ...raw,
            infoTitle: raw.infoTitle ?? DEFAULT_INFO.title,
            infoDesc: raw.infoDesc ?? DEFAULT_INFO.desc,
            sourcePath: raw.sourcePath ?? SOURCE_PATHS[raw.type] ?? '/',
        }
    }

    if (raw.carName) {
        return {
            type: 'car',
            eyebrow: 'POJAZD',
            title: raw.carName,
            image: raw.carImage,
            badge: 'TRACK READY',
            meta: [
                { label: 'DATA SESJI', value: raw.sessionDate },
                { label: 'LOKALIZACJA', value: raw.location },
            ],
            lineItems: raw.lineItems ?? [],
            total: raw.total,
            sourcePath: raw.carSlug ? `/cars/${raw.carSlug}` : '/cars',
            infoTitle: DEFAULT_INFO.title,
            infoDesc: DEFAULT_INFO.desc,
        }
    }

    return null
}

export function buildCarCheckoutOrder({
    car,
    selectedDays,
    pricing,
    trackPackage,
    driveVideo,
    formatSessionDate,
    buildLineItems,
}) {
    return {
        type: 'car',
        eyebrow: 'POJAZD',
        title: car.name,
        image: car.image,
        badge: 'TRACK READY',
        meta: [
            { label: 'DATA SESJI', value: formatSessionDate(selectedDays) },
            { label: 'LOKALIZACJA', value: TRACK_VENUE },
        ],
        lineItems: buildLineItems(pricing, trackPackage, driveVideo),
        total: pricing.total,
        sourcePath: `/cars/${car.slug}`,
        infoTitle: DEFAULT_INFO.title,
        infoDesc: DEFAULT_INFO.desc,
    }
}

export function buildVoucherCheckoutOrder({
    voucherType,
    activeModel,
    recipientName,
    selectedModelId,
}) {
    const isOpen = voucherType === 'open'
    const lineLabel = isOpen
        ? 'VOUCHER — ELITE TRACK DAY'
        : `VOUCHER — ${activeModel.name}`

    return {
        type: 'voucher',
        eyebrow: 'VOUCHER',
        title: isOpen ? 'ELITE TRACK DAY' : activeModel.name,
        image: activeModel.image,
        badge: isOpen ? 'OTWARTY TERMIN' : 'KONKRETNE AUTO',
        meta: [
            { label: 'ODBIORCA', value: recipientName.trim() || 'JAN KOWALSKI' },
            { label: 'DOŚWIADCZENIE', value: activeModel.experience },
        ],
        lineItems: [{ label: lineLabel, amount: activeModel.price }],
        total: activeModel.price,
        sourcePath: '/vouchers',
        infoTitle: DEFAULT_INFO.title,
        infoDesc: 'Cena obejmuje VAT 23% oraz ubezpieczenie. Voucher ważny 12 miesięcy.',
        voucherType,
        selectedModelId: isOpen ? null : selectedModelId,
    }
}

export function buildTrainingCheckoutOrder({ program, instructor, sessionDate }) {
    const instructorName = instructor?.name ?? program.instructor
    const lineItems = program.costBreakdown?.length
        ? program.costBreakdown.map((line) => ({ label: line.label, amount: line.amount }))
        : [{ label: `PAKIET — ${program.title}`, amount: program.price }]

    return {
        type: 'training',
        eyebrow: 'SZKOLENIE',
        title: program.title,
        image: program.image,
        badge: program.level,
        meta: [
            { label: 'DATA SESJI', value: sessionDate ?? program.duration },
            { label: 'INSTRUKTOR', value: instructorName },
        ],
        lineItems,
        total: program.price,
        sourcePath: program.id ? `/szkolenia/${program.id}` : '/szkolenia',
        infoTitle: DEFAULT_INFO.title,
        infoDesc:
            'Cena obejmuje czas na torze, pracę z instruktorem, analizę telemetrii oraz ubezpieczenie uczestnika.',
    }
}

function slugify(value) {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
}

function generateReservationId(order) {
    const prefix = order.type?.slice(0, 2).toUpperCase() ?? 'AX'
    const slug = slugify(order.title).slice(0, 24).toUpperCase()
    return `${prefix}-${slug}-2024`
}

function getMetaValue(order, label) {
    return order.meta?.find((item) => item.label === label)?.value ?? null
}

export function buildConfirmationFromOrder(order, paymentMethod) {
    const sessionDate =
        getMetaValue(order, 'DATA SESJI') ??
        getMetaValue(order, 'DATA') ??
        getMetaValue(order, 'DOŚWIADCZENIE') ??
        'DO USTALENIA'

    return {
        ...order,
        reservationId: generateReservationId(order),
        sessionDate,
        location: TRACK_VENUE,
        locationMap: TRACK_VENUE_MAP,
        instructor: getMetaValue(order, 'INSTRUKTOR') ?? 'ZESPÓŁ APEX DRIVE',
        paymentMethod,
        paymentLabel: PAYMENT_LABELS[paymentMethod] ?? paymentMethod,
        productLabel: order.eyebrow,
        subtitle: order.badge ?? order.type?.toUpperCase(),
    }
}

export function saveConfirmation(confirmation) {
    sessionStorage.setItem(CONFIRMATION_STORAGE_KEY, JSON.stringify(confirmation))
}

export function readConfirmation() {
    try {
        const raw = sessionStorage.getItem(CONFIRMATION_STORAGE_KEY)
        if (!raw) return null
        return JSON.parse(raw)
    } catch {
        return null
    }
}

export function completeCheckout(order, paymentMethod, onNavigate) {
    const confirmation = buildConfirmationFromOrder(order, paymentMethod)
    saveConfirmation(confirmation)
    onNavigate('/potwierdzenie')
}

export function buildEventCheckoutOrder(event) {
    const spotsLeft = event.spotsLeft ?? null
    const slotsLabel =
        event.slots ??
        (spotsLeft != null
            ? `${spotsLeft} ${spotsLeft === 1 ? 'SLOT' : 'SLOTY'}`
            : '1 SLOT')
    const urgent = event.urgent ?? (spotsLeft != null && spotsLeft <= 3)

    return {
        type: 'event',
        eyebrow: 'WYDARZENIE',
        title: event.title,
        image: event.image ?? '/images/hero-track.jpg',
        badge: urgent ? 'OSTATNIE MIEJSCA' : 'WOLNE MIEJSCA',
        meta: [
            { label: 'DATA', value: `${event.day} ${event.month} 2026` },
            { label: 'LOKALIZACJA', value: event.track },
            ...(event.lead ? [{ label: 'LEAD', value: event.lead }] : []),
        ],
        lineItems: [{ label: `REZERWACJA — ${slotsLabel}`, amount: event.price }],
        total: event.price,
        sourcePath: '/kalendarz',
        infoTitle: DEFAULT_INFO.title,
        infoDesc: 'Cena obejmuje dostęp do toru, wsparcie techniczne i ubezpieczenie uczestnika.',
    }
}

export function buildTrackCheckoutOrder({ track, sessionDate, total, videoRecording }) {
    const lineItems = [
        { label: 'WYNAJEM TORU (CAŁY DZIEŃ)', amount: track.pricing.trackRental },
        { label: 'INSTRUKTOR (POZIOM II)', amount: track.pricing.instructor },
    ]

    if (videoRecording) {
        lineItems.push({
            label: 'NAGRANIE WIDEO Z TORU',
            amount: track.pricing.videoRecording,
        })
    }

    return {
        type: 'track',
        eyebrow: 'TOR',
        title: track.name,
        image: track.heroImage,
        badge: track.tag,
        meta: [
            { label: 'DATA SESJI', value: sessionDate },
            { label: 'LOKALIZACJA', value: TRACK_VENUE },
        ],
        lineItems,
        total,
        sourcePath: '/track',
        infoTitle: DEFAULT_INFO.title,
        infoDesc: 'Cena obejmuje wynajem toru, obsługę techniczną, briefing i wsparcie na miejscu.',
    }
}
