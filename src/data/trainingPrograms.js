export const TRAINING_INSTRUCTORS = [
    {
        id: 'marcin',
        name: 'MARCIN WÓJTOWICZ',
        role: 'FIA GRADE A',
        title: 'GŁÓWNY INSTRUKTOR',
        bio: 'Były kierowca serii GT z ponad dekadą doświadczenia torowego. Specjalizuje się w budowaniu pewności za kierownicą i bezpiecznym wyciskaniu limitów na mokrym i suchym torze.',
        stats: [
            { value: '1200+', label: 'PRZEANALIZOWANYCH OKRĄŻEŃ' },
            { value: 'GT3', label: 'POZIOM DOŚWIADCZENIA' },
        ],
        image: '/images/drivers/driver1.png',
        accent: 'red',
        cadreStats: ['REKORD OKRĄŻENIA: 1:34.22', 'INSTRUKTOR ELITE'],
    },
    {
        id: 'anna',
        name: 'ANNA KOWALSKA',
        role: 'BYŁA KIEROWCA GT3',
        title: 'INSTRUKTORKA LINII JAZDY',
        bio: 'Absolwentka akademii APEX z 24 startami w wyścigach GT. Uczy precyzyjnego wchodzenia w zakręty, hamowania progowego i utrzymania spójnej linii na całym okrążeniu.',
        stats: [
            { value: '24', label: 'WYŚCIGI GT' },
            { value: 'ELITE', label: 'CERTYFIKACJA' },
        ],
        image: '/images/drivers/driver2.png',
        accent: 'gold',
        cadreStats: ['24 WYŚCIGI GT', 'INSTRUKTORKA ELITE'],
    },
    {
        id: 'tomasz',
        name: 'TOMASZ NOWAK',
        role: 'INŻYNIER TELEMETRII',
        title: 'LEAD ANALITYK MOTEC',
        bio: 'Inżynier danych z paddocku GT i Formuły. Prowadzi moduły telemetrii, interpretację wykresów MoTeC i przekładanie teorii na realne zyski czasowe na torze.',
        stats: [
            { value: '500+', label: 'SESJI NA TORZE' },
            { value: 'MOTEC', label: 'CERYFIKACJA PRO' },
        ],
        image: '/images/drivers/driver3.png',
        accent: 'red',
        cadreStats: ['ANALIZA DANYCH MOTEC', '500+ SESJI NA TORZE'],
    },
]

export const TRAINING_PROGRAMS = [
    {
        id: 'podstawy-torowe',
        series: 'SERIA WPROWADZAJĄCA',
        level: 'POZIOM: WPROWADZENIE',
        title: 'PODSTAWY NA TORZE',
        price: 1850,
        duration: '8 GODZIN',
        image: '/images/cars/porsche-911.jpg',
        instructorId: 'marcin',
        heroDesc:
            'Pierwszy kontakt z torem wyścigowym w kontrolowanych warunkach. Poznaj linię jazdy, sygnały flagowe i podstawy bezpiecznej jazdy z instruktorem u boku.',
        modules: [
            {
                time: '09:00 - 10:30',
                number: 'MODUŁ 01',
                title: 'BRIEFING I BEZPIECZEŃSTWO',
                desc: 'Omówienie toru, wyposażenia ochronnego, sygnałów flagowych i procedur awaryjnych.',
            },
            {
                time: '10:45 - 12:30',
                number: 'MODUŁ 02',
                title: 'PIERWSZE OKRĄŻENIA',
                desc: 'Jazda adaptacyjna za samochodem szkoleniowym, nauka linii i punktów hamowania.',
            },
            {
                time: '13:30 - 15:00',
                number: 'MODUŁ 03',
                title: 'TECHNIKA ZAKRĘTÓW',
                desc: 'Ćwiczenie wejścia, apexu i wyjścia z zakrętu na stałym odcinku toru.',
            },
            {
                time: '15:15 - 17:00',
                number: 'MODUŁ 04',
                title: 'SESJA WOLNA + DEBRIEF',
                desc: 'Samodzielne okrążenia pod nadzorem i podsumowanie z instruktorem.',
            },
        ],
        requirements: [
            'Wiek minimum 18 lat',
            'Ważne prawo jazdy kat. B',
            'Obuwie z cienką podeszwą',
            'Kask homologowany (możliwość wypożyczenia)',
        ],
        costBreakdown: [
            { label: 'WYNAJEM TORU', amount: 650 },
            { label: 'PALIWO I EKSPOLOATACJA', amount: 280 },
            { label: 'INSTRUKTOR PRO', amount: 520 },
            { label: 'RAPORT Z SESJI', amount: 400 },
        ],
        maxPerSession: 4,
        location: 'TOR WYŚCIGOWY',
    },
    {
        id: 'linia-perfekcyjna',
        series: 'SERIA PERFORMANCE',
        level: 'POZIOM: ŚREDNIOZAAWANSOWANY',
        title: 'LINIA PERFEKCYJNA',
        price: 2650,
        duration: '12 GODZIN',
        image: '/images/login-cockpit.jpg',
        instructorId: 'anna',
        heroDesc:
            'Zaawansowany trening linii jazdy i zarządzania przyczepnością. Sesja dla kierowców, którzy znają tor i chcą wyciąć kolejne sekundy bez kompromisów w bezpieczeństwie.',
        modules: [
            {
                time: '08:30 - 10:30',
                number: 'MODUŁ 01',
                title: 'ANALIZA WIDEO',
                desc: 'Przegląd nagrań z poprzednich sesji i wyznaczenie celów na dzień szkoleniowy.',
            },
            {
                time: '10:45 - 13:00',
                number: 'MODUŁ 02',
                title: 'SEKTORY TORU',
                desc: 'Praca sektor po sektorze: hamowanie, trail braking i optymalizacja apexu.',
            },
            {
                time: '14:00 - 16:00',
                number: 'MODUŁ 03',
                title: 'RHYTM OKRĄŻENIA',
                desc: 'Budowanie spójności czasowej i eliminacja błędów na powtarzalnych odcinkach.',
            },
            {
                time: '16:15 - 18:30',
                number: 'MODUŁ 04',
                title: 'SESJA STARSZA + RAPORT',
                desc: 'Długa sesja torowa z telemetrią pokładową i raportem końcowym.',
            },
        ],
        requirements: [
            'Minimum 10 okrążeń torowych',
            'Znajomość sygnałów flagowych',
            'Kombinezon lub ubranie bawełniane',
            'Kask homologowany FIA',
        ],
        costBreakdown: [
            { label: 'WYNAJEM TORU', amount: 900 },
            { label: 'PALIWO WYŚCIGOWE', amount: 420 },
            { label: 'INSTRUKTOR PRO', amount: 780 },
            { label: 'TELEMETRIA POKŁADOWA', amount: 550 },
        ],
        maxPerSession: 3,
        location: 'TOR WYŚCIGOWY',
    },
    {
        id: 'nocna-sesja',
        series: 'SERIA ELITE NIGHT',
        level: 'POZIOM: ZAAWANSOWANY',
        title: 'NOCNA SESJA TOROWA',
        price: 2200,
        duration: '6 GODZIN',
        image: '/images/hero-track.jpg',
        instructorId: 'marcin',
        heroDesc:
            'Jazda po zmroku pod reflektorami toru. Trening percepcji, ograniczonej widoczności i precyzyjnego czucia auta w warunkach nocnych.',
        modules: [
            {
                time: '18:00 - 19:00',
                number: 'MODUŁ 01',
                title: 'PROCEDURY NOCNE',
                desc: 'Briefing bezpieczeństwa, oświetlenie toru i specyfika jazdy po zmroku.',
            },
            {
                time: '19:15 - 20:45',
                number: 'MODUŁ 02',
                title: 'ADAPTACJA WZROKOWA',
                desc: 'Okrążenia rozgrzewkowe i budowanie referencji punktów na torze.',
            },
            {
                time: '21:00 - 22:30',
                number: 'MODUŁ 03',
                title: 'SESJA NOCNA',
                desc: 'Jazda w pełnym tempie z analizą telemetrii między seriami.',
            },
            {
                time: '22:30 - 23:00',
                number: 'MODUŁ 04',
                title: 'PODSUMOWANIE',
                desc: 'Debrief, omówienie nagrania i rekomendacje na kolejne sesje.',
            },
        ],
        requirements: [
            'Ukończone szkolenie podstawowe',
            'Minimum 20 okrążeń na torze',
            'Sprawny wzrok korekcyjny',
            'Kask z homologacją nocną',
        ],
        costBreakdown: [
            { label: 'WYNAJEM TORU (NOC)', amount: 780 },
            { label: 'OŚWIETLENIE I LOGISTYKA', amount: 320 },
            { label: 'INSTRUKTOR ELITE', amount: 650 },
            { label: 'NAGRANIE WIDEO', amount: 450 },
        ],
        maxPerSession: 2,
        location: 'TOR WYŚCIGOWY',
    },
    {
        id: 'telemetria-pro',
        series: 'SERIA ZAAWANSOWANA',
        level: 'POZIOM: MISTRZOWSKI',
        title: 'TELEMETRIA PRO',
        price: 2950,
        duration: '10 GODZIN',
        image: '/images/cars/mclaren-720s.jpg',
        instructorId: 'tomasz',
        heroDesc:
            'Opanuj sztukę analizy danych w czasie rzeczywistym. Zrozum dynamikę pojazdu poprzez wykresy MoTeC i przełóż teorię na sekundy urwane na torze.',
        modules: [
            {
                time: '09:00 - 11:00',
                number: 'MODUŁ 01',
                title: 'FUNDAMENTY TEORETYCZNE',
                desc: 'Czujniki, kanały danych, GPS i podstawowa interpretacja wykresów MoTeC.',
            },
            {
                time: '11:15 - 13:00',
                number: 'MODUŁ 02',
                title: 'SESJA REFERENCYJNA',
                desc: 'Okrążenia referencyjne z pełnym logowaniem danych pokładowych.',
            },
            {
                time: '14:00 - 16:00',
                number: 'MODUŁ 03',
                title: 'ANALIZA LIVE',
                desc: 'Praca przy laptopie w boksie — korekty linii i hamowania na żywo.',
            },
            {
                time: '16:15 - 18:00',
                number: 'MODUŁ 04',
                title: 'WERYFIKACJA NA TORZE',
                desc: 'Sesja końcowa z wdrożeniem poprawek i raportem PDF.',
            },
        ],
        requirements: [
            'Doświadczenie torowe 30+ okrążeń',
            'Laptop (opcjonalnie — dostępny na miejscu)',
            'Podstawowa znajomość telemetrii',
            'Kask homologowany FIA',
        ],
        costBreakdown: [
            { label: 'WYNAJEM TORU', amount: 820 },
            { label: 'STACJA MOTEC PRO', amount: 680 },
            { label: 'INŻYNIER DANYCH', amount: 900 },
            { label: 'RAPORT TELEMETRYCZNY', amount: 550 },
        ],
        maxPerSession: 2,
        location: 'TOR WYŚCIGOWY',
    },
]

export function getTrainingProgramById(id) {
    return TRAINING_PROGRAMS.find((program) => program.id === id) ?? null
}

export function getTrainingInstructorById(id) {
    return TRAINING_INSTRUCTORS.find((instructor) => instructor.id === id) ?? null
}
