const FIREBASE_ERROR_MESSAGES = {
    'auth/invalid-email': 'Podaj prawidłowy adres e-mail.',
    'auth/user-disabled': 'To konto zostało wyłączone.',
    'auth/user-not-found': 'Nie znaleziono użytkownika o podanym adresie e-mail.',
    'auth/wrong-password': 'Nieprawidłowe hasło.',
    'auth/invalid-credential': 'Nieprawidłowy e-mail lub hasło.',
    'auth/email-already-in-use': 'Ten adres e-mail jest już zarejestrowany.',
    'auth/weak-password': 'Hasło musi mieć co najmniej 6 znaków.',
    'auth/too-many-requests': 'Zbyt wiele prób logowania. Spróbuj ponownie później.',
    'auth/popup-closed-by-user': 'Logowanie zostało anulowane.',
    'auth/popup-blocked': 'Okno logowania zostało zablokowane przez przeglądarkę.',
    'auth/network-request-failed': 'Błąd sieci. Sprawdź połączenie z internetem.',
    'auth/operation-not-allowed': 'Ta metoda logowania nie jest włączona w Firebase.',
}

export function getFirebaseErrorMessage(error, fallback = 'Wystąpił błąd. Spróbuj ponownie.') {
    if (!error?.code) {
        return fallback
    }

    return FIREBASE_ERROR_MESSAGES[error.code] ?? fallback
}
