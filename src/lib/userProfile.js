const PROFILE_STORAGE_PREFIX = 'apex-drive-profile-'

function profileStorageKey(userId) {
    return `${PROFILE_STORAGE_PREFIX}${userId}`
}

export function readProfileExtras(userId) {
    if (!userId) {
        return {}
    }

    try {
        const stored = localStorage.getItem(profileStorageKey(userId))
        return stored ? JSON.parse(stored) : {}
    } catch {
        return {}
    }
}

export function writeProfileExtras(userId, extras) {
    if (!userId) {
        return
    }

    localStorage.setItem(profileStorageKey(userId), JSON.stringify(extras))
}

export function getUserInitials(name) {
    if (!name) {
        return ''
    }

    const parts = name.trim().split(/\s+/).filter(Boolean)

    if (parts.length === 0) {
        return ''
    }

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase()
    }

    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function mapFirebaseUser(firebaseUser, extras = {}) {
    const provider = firebaseUser.providerData[0]?.providerId ?? 'password'

    return {
        id: firebaseUser.uid,
        name: extras.name ?? firebaseUser.displayName ?? firebaseUser.email?.split('@')[0] ?? 'Użytkownik',
        email: firebaseUser.email ?? '',
        picture: firebaseUser.photoURL ?? null,
        provider: provider === 'google.com' ? 'google' : provider,
        preferences: extras.preferences ?? {
            emailNotifications: true,
            smsNotifications: false,
        },
    }
}
