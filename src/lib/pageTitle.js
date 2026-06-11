import { getCarBySlug } from '../data/cars.js'
import { getTrainingProgramById } from '../data/trainingPrograms.js'

export const APP_NAME = 'APEX Drive'

const STATIC_TITLES = {
    '/': APP_NAME,
    '/login': 'Logowanie',
    '/register': 'Rejestracja',
    '/kalendarz': 'Kalendarz wydarzeń',
    '/events': 'Kalendarz wydarzeń',
    '/szkolenia': 'Akademia APEX',
    '/track': 'Tor APEX Drive',
    '/cars': 'Flota',
    '/vouchers': 'Gift Vouchery',
    '/bezpieczenstwo': 'Bezpieczeństwo i FAQ',
    '/checkout': 'Podsumowanie zamówienia',
    '/potwierdzenie': 'Potwierdzenie rezerwacji',
    '/account': 'Moje konto',
    '/about': 'O nas',
    '/notify': 'Powiadom mnie',
}

function getCarSlug(path) {
    if (!path.startsWith('/cars/')) {
        return null
    }

    return path.slice('/cars/'.length) || null
}

function getTrainingSlug(path) {
    if (!path.startsWith('/szkolenia/')) {
        return null
    }

    return path.slice('/szkolenia/'.length) || null
}

export function formatPageTitle(pageTitle) {
    if (!pageTitle || pageTitle === APP_NAME) {
        return APP_NAME
    }

    return `${pageTitle} | ${APP_NAME}`
}

export function getPageTitle(path) {
    const staticTitle = STATIC_TITLES[path]
    if (staticTitle) {
        return formatPageTitle(staticTitle === APP_NAME ? APP_NAME : staticTitle)
    }

    const carSlug = getCarSlug(path)
    if (carSlug) {
        const car = getCarBySlug(carSlug)
        return formatPageTitle(car ? car.detailTitle : 'Strona nie znaleziona')
    }

    const trainingSlug = getTrainingSlug(path)
    if (trainingSlug) {
        const program = getTrainingProgramById(trainingSlug)
        return formatPageTitle(program ? program.title : 'Strona nie znaleziona')
    }

    return formatPageTitle('Strona nie znaleziona')
}
