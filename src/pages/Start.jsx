function Start({ onNavigate }) {
    return (
        <main className="page-shell">
            <section className="panel hero-panel">
                <p className="eyebrow">Routing skeleton</p>
                <h1>Strona startowa</h1>
                <p className="lead">
                    To jest prosty punkt wejścia do aplikacji. Na razie prowadzi tylko do
                    ekranu logowania.
                </p>
                <button
                    type="button"
                    className="button button-primary"
                    onClick={() => onNavigate('/login')}
                >
                    Zaloguj się
                </button>
            </section>
        </main>
    )
}

export default Start
