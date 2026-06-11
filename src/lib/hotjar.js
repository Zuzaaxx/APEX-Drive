function getScriptId() {
    const scriptId = import.meta.env.VITE_HOTJAR_SCRIPT_ID

    return typeof scriptId === 'string' ? scriptId.trim() : ''
}

export function trackHotjarPageView(path) {
    if (!getScriptId() || typeof window === 'undefined' || typeof window.hj !== 'function') {
        return
    }

    window.hj('stateChange', path)
}
