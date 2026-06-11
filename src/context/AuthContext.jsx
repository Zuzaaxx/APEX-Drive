import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile as updateFirebaseProfile,
} from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import { mapFirebaseUser, readProfileExtras, writeProfileExtras } from '../lib/userProfile'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const extras = readProfileExtras(firebaseUser.uid)
                setUser(mapFirebaseUser(firebaseUser, extras))
            } else {
                setUser(null)
            }

            setLoading(false)
        })

        return unsubscribe
    }, [])

    const loginWithEmail = useCallback(async (email, password) => {
        await signInWithEmailAndPassword(auth, email.trim(), password)
    }, [])

    const registerWithEmail = useCallback(async (email, password, displayName) => {
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password)
        const trimmedName = displayName.trim()

        if (trimmedName) {
            await updateFirebaseProfile(credential.user, { displayName: trimmedName })
            writeProfileExtras(credential.user.uid, { name: trimmedName })
        }
    }, [])

    const loginWithGoogle = useCallback(async () => {
        await signInWithPopup(auth, googleProvider)
    }, [])

    const logout = useCallback(async () => {
        await signOut(auth)
    }, [])

    const updateProfile = useCallback(async (updates) => {
        const firebaseUser = auth.currentUser

        if (!firebaseUser) {
            return
        }

        const currentExtras = readProfileExtras(firebaseUser.uid)
        const nextExtras = {
            ...currentExtras,
            ...(updates.name ? { name: updates.name } : {}),
            ...(updates.preferences ? { preferences: updates.preferences } : {}),
        }

        writeProfileExtras(firebaseUser.uid, nextExtras)

        if (updates.name && updates.name !== firebaseUser.displayName) {
            await updateFirebaseProfile(firebaseUser, { displayName: updates.name })
        }

        setUser(mapFirebaseUser(firebaseUser, nextExtras))
    }, [])

    const value = useMemo(
        () => ({
            user,
            loading,
            isAuthenticated: Boolean(user),
            loginWithEmail,
            registerWithEmail,
            loginWithGoogle,
            logout,
            updateProfile,
        }),
        [user, loading, loginWithEmail, registerWithEmail, loginWithGoogle, logout, updateProfile],
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
