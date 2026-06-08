export const ORDER_STORAGE_KEY = 'apex-checkout-order'

const DEFAULT_INFO = {
    title: 'BRAK UKRYTYCH KOSZTÓW',
    desc: 'Cena obejmuje ubezpieczenie OC/AC, paliwo wyścigowe oraz wsparcie techniczne na torze.',
}

const SOURCE_PATHS = {
    car: '/cars',
    voucher: '/vouchers',
    event: '/',
    training: '/szkolenia',
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
 * @property {'car' | 'voucher' | 'event' | 'training'} type
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
            { label: 'LOKALIZACJA', value: 'TOR POZNAŃ' },
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

export function buildEventCheckoutOrder(event) {
    return {
        type: 'event',
        eyebrow: 'WYDARZENIE',
        title: event.title,
        image: event.image ?? '/images/hero-track.jpg',
        badge: event.urgent ? 'OSTATNIE MIEJSCA' : 'WOLNE MIEJSCA',
        meta: [
            { label: 'DATA', value: `${event.day} ${event.month} 2024` },
            { label: 'LOKALIZACJA', value: event.track },
        ],
        lineItems: [
            { label: `REZERWACJA — ${event.slots}`, amount: event.price },
        ],
        total: event.price,
        sourcePath: '/',
        infoTitle: DEFAULT_INFO.title,
        infoDesc: 'Cena obejmuje dostęp do toru, wsparcie techniczne i ubezpieczenie uczestnika.',
    }
}
