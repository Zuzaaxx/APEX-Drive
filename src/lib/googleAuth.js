export const MOCK_GOOGLE_ACCOUNTS = [
    {
        sub: 'google-demo-jan-kowalski',
        name: 'Jan Kowalski',
        email: 'kierowca@apexdrive.pl',
        picture: null,
        initials: 'JK',
        accent: '#be0000',
    },
    {
        sub: 'google-demo-anna-nowak',
        name: 'Anna Nowak',
        email: 'pilot@apexdrive.pro',
        picture: null,
        initials: 'AN',
        accent: '#1a73e8',
    },
]

const MOCK_LOGIN_DELAY_MS = 700

export function mockGoogleLogin(account) {
    return new Promise((resolve) => {
        window.setTimeout(() => {
            resolve({
                sub: account.sub,
                name: account.name,
                email: account.email,
                picture: account.picture,
            })
        }, MOCK_LOGIN_DELAY_MS)
    })
}
