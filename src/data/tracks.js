export const TRACKS = [
    {
        slug: 'apex-drive',
        location: 'SKAWINA, POLSKA',
        name: 'APEX DRIVE',
        tag: 'DOŚWIADCZENIE JAZDY',
        heroImage: '/images/hero-track.jpg',
        length: '2.4 KM',
        corners: '12',
        maxSpeed: '220 KM/H',
        level: 3,
        levelMax: 5,
        proNotes:
            'Profesjonalny tor wyścigowy zaledwie 20 minut od centrum Krakowa. Mix szybkich prostych i technicznych zakrętów — idealny na sesje GT, szkolenia i wynajem toru na wyłączność.',
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
                text: 'ul. Torowa 1, 32-050 Skawina. Dojazd drogą S7 / autostradą A4 — 22 min od Rynku Głównego w Krakowie.',
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
                date: '12.09.2025',
                rating: 5,
                text: 'Tor tuż obok Krakowa — zero kompromisów. Proste dają satysfakcję, a techniczne sekcje wymagają pełnej koncentracji. Instruktor pomógł poprawić czasy o 3 sekundy.',
            },
            {
                name: 'JULIA S.',
                date: '28.08.2025',
                rating: 5,
                text: 'Profesjonalna obsługa od pierwszej minuty. Briefing, telemetria i strefa VIP — wszystko na najwyższym poziomie. Wrócę na kolejną sesję z GT3.',
            },
            {
                name: 'MARCIN W.',
                date: '05.07.2025',
                rating: 5,
                text: 'Wynajęliśmy tor na wyłączność na event firmowy. Infrastruktura, catering i obsługa techniczna — bez zarzutu. Polecam każdemu fanowi motoryzacji.',
            },
        ],
        rating: 4.9,
        reviewCount: 120,
        mapLink:
            'https://www.google.com/maps/search/?api=1&query=Skawina+tor+wy%C5%9Bcigowy',
    },
]

export function getTrackBySlug(slug) {
    return TRACKS.find((track) => track.slug === slug)
}
