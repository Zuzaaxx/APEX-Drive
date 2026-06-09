export const TRACKS = [
    {
        slug: 'silesia-ring',
        location: 'KAMIEŃ ŚLĄSKI, POLSKA',
        name: 'SILESIA RING',
        tag: 'DOŚWIADCZENIE JAZDY',
        heroImage: '/images/hero-track.jpg',
        length: '3.635 KM',
        corners: '15',
        maxSpeed: '240 KM/H',
        level: 3,
        levelMax: 5,
        proNotes:
            'Najszybszy tor w Polsce — idealny dla kierowców szukających maksymalnej prędkości na prostych i technicznych sekcjach łączonych z podjazdami. Doskonały do sesji GT i supersamochodów.',
        pricing: {
            trackRental: 2400,
            instructor: 1200,
            fuelVariable: true,
            videoRecording: 450,
        },
        included: [
            'Spersonalizowany briefing torowy',
            'Dostęp do VIP Paddock Lounge',
            'Profesjonalna analiza danych telemetrycznych',
            'Pełna obsługa medyczna i techniczna',
        ],
        access: [
            {
                icon: 'pin',
                title: 'LOKALIZACJA',
                text: 'ul. Wyścigowa 1, 47-350 Kamień Śląski. Dojazd autostradą A4 — 15 min od centrum Opola, 45 min od Katowic.',
            },
            {
                icon: 'parking',
                title: 'PARKING',
                text: 'Bezpłatny, strzeżony parking z dedykowaną strefą Performance Zone dla supersamochodów.',
            },
            {
                icon: 'bolt',
                title: 'ŁADOWANIE EV',
                text: 'Stacje szybkiego ładowania EV na terenie obiektu — dostępne dla gości APEX Drive.',
            },
        ],
        reviews: [
            {
                name: 'ADAM K.',
                date: '12.09.2024',
                rating: 5,
                text: 'Najlepszy tor w Polsce. Proste dają ogromną satysfakcję, a techniczne zakręty wymagają pełnej koncentracji. Instruktor pomógł poprawić czasy o 3 sekundy.',
            },
            {
                name: 'JULIA S.',
                date: '28.08.2024',
                rating: 5,
                text: 'Profesjonalna obsługa od pierwszej minuty. Briefing, telemetria i strefa VIP — wszystko na najwyższym poziomie. Wrócę na kolejną sesję z GT3.',
            },
            {
                name: 'MARCIN W.',
                date: '05.07.2024',
                rating: 5,
                text: 'Wynajęliśmy tor na wyłączność na event firmowy. Infrastruktura, catering i obsługa techniczna — bez zarzutu. Polecam każdemu fanowi motoryzacji.',
            },
        ],
        rating: 4.9,
        reviewCount: 120,
        mapLink:
            'https://www.google.com/maps/search/?api=1&query=Silesia+Ring+Kamie%C5%84+%C5%9Al%C4%85ski',
    },
]

export function getTrackBySlug(slug) {
    return TRACKS.find((track) => track.slug === slug)
}
