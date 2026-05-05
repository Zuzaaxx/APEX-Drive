function Login({ onNavigate }) {
    return (
        <main className="page-shell">
            <section className="panel hero-panel">
                <p className="eyebrow">Auth route</p>
                <h1>Logowanie</h1>
                <p className="lead">
                    Tutaj później wyląduje formularz logowania. Na ten moment to tylko
                    czytelna trasa w strukturze aplikacji.
                </p>
                <button
                    type="button"
                    className="button button-ghost"
                    onClick={() => onNavigate('/')}
                >
                    Wróć na start
                </button>
            </section>
        </main>
    )
}

export default Login
