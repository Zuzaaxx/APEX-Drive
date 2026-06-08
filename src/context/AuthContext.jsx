import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const AUTH_STORAGE_KEY = 'apex-drive-auth'

const AuthContext = createContext(null)

function readStoredUser() {
    try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY)
        return stored ? JSON.parse(stored) : null
    } catch {
        return null
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(readStoredUser)

    const loginWithGoogle = useCallback((profile) => {
        const nextUser = {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            picture: profile.picture,
            provider: 'google',
        }

        setUser(nextUser)
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
    }, [])

    const logout = useCallback(() => {
        setUser(null)
        localStorage.removeItem(AUTH_STORAGE_KEY)
    }, [])

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            loginWithGoogle,
            logout,
        }),
        [user, loginWithGoogle, logout],
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }

    return context
}
