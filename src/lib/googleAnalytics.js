import { logEvent } from 'firebase/analytics'
import { analytics } from './firebase.js'

function getMeasurementId() {
    const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID

    return typeof measurementId === 'string' ? measurementId.trim() : ''
}

export function trackGoogleAnalyticsPageView(path) {
    if (!getMeasurementId() || !analytics || typeof window === 'undefined') {
        return
    }

    logEvent(analytics, 'page_view', {
        page_path: path,
        page_location: `${window.location.origin}${path}`,
        page_title: document.title,
    })
}
