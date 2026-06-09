export const EVENT_CATEGORIES = [
    { id: 'all', label: 'WSZYSTKIE' },
    { id: 'open-track', label: 'OPEN TRACK' },
    { id: 'akademia', label: 'AKADEMIA' },
    { id: 'night-sessions', label: 'NIGHT SESSIONS' },
]

export const EVENT_PERIODS = [
    { id: 'mar-nov-2026', label: 'MARZEC – LISTOPAD 2026' },
    { id: 'dec-2026-feb-2027', label: 'GRUDZIEŃ 2026 – LUTY 2027' },
]

export const EVENTS = [
    {
        id: 'open-track-day',
        month: 'KWI',
        day: '24',
        title: 'OPEN TRACK DAY',
        category: 'open-track',
        categoryLabel: 'OPEN TRACK',
        track: 'APEX DRIVE — SKAWINA',
        trackSlug: 'apex-drive',
        lead: 'TOMASZ NOWAK',
        spotsTotal: 8,
        spotsLeft: 4,
        price: 3800,
        period: 'mar-nov-2026',
        image: '/images/hero-track.jpg',
        variant: 'red',
        sortOrder: 1,
    },
    {
        id: 'gt4-training',
        month: 'MAJ',
        day: '15',
        title: 'GT4 TRAINING DAY',
        category: 'akademia',
        categoryLabel: 'AKADEMIA',
        track: 'TOR POZNAŃ',
        trackSlug: null,
        lead: 'ELENA ROSSI',
        spotsTotal: 10,
        spotsLeft: 2,
        price: 3400,
        period: 'mar-nov-2026',
        image: '/images/cars/mclaren-720s.jpg',
        variant: 'red',
        sortOrder: 2,
    },
    {
        id: 'telemetry-masterclass',
        month: 'CZE',
        day: '07',
        title: 'TELEMETRY MASTERCLASS',
        category: 'akademia',
        categoryLabel: 'AKADEMIA',
        track: 'APEX DRIVE — SKAWINA',
        trackSlug: 'apex-drive',
        lead: 'ELENA ROSSI',
        spotsTotal: 12,
        spotsLeft: 12,
        price: 2900,
        period: 'mar-nov-2026',
        image: '/images/login-cockpit.jpg',
        variant: 'red',
        sortOrder: 3,
    },
    {
        id: 'night-attack',
        month: 'LIP',
        day: '12',
        title: 'NIGHT ATTACK: ADRENALINE SESSIONS',
        category: 'open-track',
        categoryLabel: 'OPEN TRACK',
        track: 'AUTODROM SŁOMCZYNO',
        trackSlug: null,
        lead: 'MARKUS WEBER',
        spotsTotal: 10,
        spotsLeft: 2,
        price: 4500,
        period: 'mar-nov-2026',
        image: '/images/hero-track.jpg',
        variant: 'red',
        sortOrder: 4,
    },
    {
        id: 'gt-academy-pro',
        month: 'SIE',
        day: '28',
        title: 'GT ACADEMY PRO',
        category: 'night-sessions',
        categoryLabel: 'NIGHT SESSIONS',
        track: 'TOR KIELCE',
        trackSlug: null,
        lead: 'ADAM KOWALSKI',
        spotsTotal: 15,
        spotsLeft: 15,
        price: 3200,
        period: 'mar-nov-2026',
        image: '/images/cars/lamborghini-huracan-STO.jpg',
        variant: 'gold',
        sortOrder: 5,
    },
    {
        id: 'vip-hot-lap',
        month: 'PAŹ',
        day: '02',
        title: 'VIP HOT LAP SESSION',
        category: 'night-sessions',
        categoryLabel: 'NIGHT SESSIONS',
        track: 'APEX DRIVE — SKAWINA',
        trackSlug: 'apex-drive',
        lead: 'MARKUS WEBER',
        spotsTotal: 6,
        spotsLeft: 6,
        price: 5200,
        period: 'mar-nov-2026',
        image: '/images/cars/lamborghini-huracan-STO.jpg',
        variant: 'gold',
        sortOrder: 6,
    },
]

export function formatEventPrice(value) {
    return `${value.toLocaleString('pl-PL')} PLN`
}

export function getEventBookPath(event) {
    if (event.trackSlug === 'apex-drive') {
        return '/track'
    }
    return '/account'
}

export function getHomepageEvents(limit = 3) {
    return [...EVENTS]
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .slice(0, limit)
        .map((event) => ({
            id: event.id,
            day: event.day,
            month: event.month,
            title: event.title,
            track: event.track,
            slots: `${event.spotsLeft} ${event.spotsLeft === 1 ? 'SLOT' : 'SLOTY'}`,
            status: event.spotsLeft <= 3 ? 'OSTATNIE MIEJSCA' : 'WOLNE MIEJSCA',
            urgent: event.spotsLeft <= 3,
            bookPath: getEventBookPath(event),
        }))
}
