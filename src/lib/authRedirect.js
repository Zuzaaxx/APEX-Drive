const AUTH_REDIRECT_KEY = 'apex-auth-redirect'

function isSafeRedirectPath(path) {
    return typeof path === 'string' && path.startsWith('/') && !path.startsWith('//')
}

export function setAuthRedirect(path) {
    if (isSafeRedirectPath(path)) {
        sessionStorage.setItem(AUTH_REDIRECT_KEY, path)
    }
}

export function getAuthRedirectTarget(fallback = '/account') {
    const fromQuery = new URLSearchParams(window.location.search).get('redirect')
    if (isSafeRedirectPath(fromQuery)) {
        return fromQuery
    }

    const stored = sessionStorage.getItem(AUTH_REDIRECT_KEY)
    if (isSafeRedirectPath(stored)) {
        return stored
    }

    return fallback
}

export function clearAuthRedirect() {
    sessionStorage.removeItem(AUTH_REDIRECT_KEY)
}

export function completeAuthRedirect(onNavigate, fallback = '/account') {
    const target = getAuthRedirectTarget(fallback)
    clearAuthRedirect()
    onNavigate(target)
}
