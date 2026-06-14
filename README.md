# APEX Drive — TPF Projekt 3

Aplikacja SPA (React + Vite) dla platformy wynajmu supersamochodów i rezerwacji toru wyścigowego **APEX Drive** w Skawinie. Projekt obejmuje pełny flow użytkownika: przeglądanie floty, rezerwację toru, szkolenia, vouchery, logowanie oraz analitykę zachowań.

## Linki

| Zasób | Adres |
|-------|-------|
| **Aplikacja (produkcja)** | https://apexdrive-b91d4.web.app |
| **Hosting** | Firebase Hosting |
| **Autentykacja** | Firebase Authentication |
| **Analityka** | Google Analytics 4 (Firebase Analytics) |
| **Hotjar** | Contentsquare / Hotjar |

---

## Spis treści

1. [Opis projektu](#opis-projektu)
2. [Technologie](#technologie)
3. [Uruchomienie lokalne](#uruchomienie-lokalne)
4. [Deploy](#deploy)
5. [Routing — mapa ekranów](#routing--mapa-ekranów)
6. [Struktura projektu](#struktura-projektu)
7. [Komponenty wielokrotnego użytku](#komponenty-wielokrotnego-użytku)
8. [Logowanie (Firebase Auth)](#logowanie-firebase-auth)
9. [Google Analytics](#google-analytics)
10. [Hotjar](#hotjar)
11. [Screeny aplikacji](#screeny-aplikacji)
12. [Checklist laboratorium](#checklist-laboratorium)

---

## Opis projektu

APEX Drive to responsywna aplikacja webowa odwzorowująca makietę produktu premium w branży motorsportowej. Użytkownik może:

- przeglądać flotę supersamochodów i konfigurować wynajem,
- rezerwować tor APEX Drive w Skawinie,
- zapisywać się na szkolenia i wydarzenia,
- kupować vouchery prezentowe,
- logować się i zarządzać kontem,
- korzystać z powiadomień o dostępności aut.

Interfejs utrzymany jest w spójnym stylu dark (czarny, czerwień `#be0000`, złoto), z fontem Rajdhani.

---

## Technologie

| Warstwa | Stack |
|---------|-------|
| Frontend | React 19, Vite 8 |
| Routing | SPA — `history.pushState` + warunkowy render w `App.jsx` |
| Stylowanie | CSS (osobne pliki per strona/komponent) |
| Auth | Firebase Authentication (e-mail/hasło, Google) |
| Analityka | Firebase Analytics → GA4 |
| Hotjar | Skrypt Contentsquare w `index.html` |
| Deploy | Firebase Hosting |

---

## Uruchomienie lokalne

### Wymagania

- Node.js 18+
- npm
- projekt Firebase z włączonym Authentication i Analytics

### Kroki

```bash
# 1. Instalacja zależności
npm install

# 2. Konfiguracja środowiska
cp .env.example .env
# Uzupełnij klucze Firebase, Measurement ID i Hotjar Script ID

# 3. Uruchomienie dev servera
npm run dev
```

Aplikacja domyślnie startuje pod adresem `http://localhost:5173`.

---

## Deploy

Aplikacja jest wdrożona na **Firebase Hosting**:

```bash
npm run deploy
```

Polecenie buduje projekt (`vite build`) i publikuje folder `dist` na Firebase.

**Produkcyjny URL:** https://apexdrive-b91d4.web.app

Konfiguracja hostingu: `firebase.json` (rewrite wszystkich ścieżek do `index.html` — obsługa SPA).

![Firebase Hosting — historia wdrożeń](docs/Zrzut%20ekranu%202026-06-14%20120604.png)

![Firebase Console — sekcja Build / Hosting](docs/Zrzut%20ekranu%202026-06-14%20120618.png)

---

## Routing — mapa ekranów

Każdy ekran z makiety ma przypisaną trasę. Nawigacja odbywa się bez przeładowania strony (`pushState` / `popstate`). Nieznane ścieżki wyświetlają stronę **404**.

| Trasa | Komponent (`pages/`) | Opis |
|-------|----------------------|------|
| `/` | `Start.jsx` | Strona główna — hero, oferta, auta, voucher, terminy |
| `/cars` | `Cars.jsx` | Lista samochodów z filtrami |
| `/cars/:slug` | `CarDetail.jsx` | Szczegóły auta, galeria, konfigurator wynajmu |
| `/track` | `TrackDetail.jsx` | Tor APEX Drive — specyfikacja, rezerwacja |
| `/kalendarz`, `/events` | `Events.jsx` | Kalendarz wydarzeń |
| `/szkolenia` | `Training.jsx` | Lista programów szkoleniowych |
| `/szkolenia/:slug` | `TrainingDetail.jsx` | Szczegóły szkolenia, rezerwacja |
| `/vouchers` | `Vouchers.jsx` | Vouchery prezentowe |
| `/login` | `Login.jsx` | Logowanie |
| `/register` | `Register.jsx` | Rejestracja |
| `/account` | `Account.jsx` | Panel użytkownika (chroniony) |
| `/checkout` | `Checkout.jsx` | Płatność / podsumowanie |
| `/potwierdzenie` | `Confirmation.jsx` | Potwierdzenie rezerwacji |
| `/about` | `About.jsx` | O nas, kontakt |
| `/bezpieczenstwo` | `Safety.jsx` | Bezpieczeństwo i FAQ |
| `/notify` | `Notify.jsx` | Powiadomienia o dostępności aut |
| `*` | `NotFound.jsx` | Strona 404 — „Wypadłeś z toru” |

---

## Struktura projektu

```
src/
├── pages/           # Widoki przypisane do routingu
├── components/      # Elementy UI wielokrotnego użytku
├── context/         # AuthContext — stan logowania
├── data/            # cars.js, events.js, tracks.js, trainingPrograms.js
├── lib/             # firebase, googleAnalytics, hotjar, authRedirect
├── App.jsx          # Router + layout (Navbar)
└── main.jsx         # Entry point + AuthProvider
docs/                # Screeny do dokumentacji
public/images/       # Assety graficzne
```

---

## Komponenty wielokrotnego użytku

| Komponent | Plik | Użycie |
|-----------|------|--------|
| `Navbar` | `components/Navbar.jsx` | Nawigacja na każdej stronie |
| `Footer` | `components/Footer.jsx` | Stopka |
| `CarCard` | `components/CarCard.jsx` | Karta auta — Start, Cars |
| `BookingCalendar` | `components/BookingCalendar.jsx` | Kalendarz rezerwacji — tor, auto, szkolenia |
| `GoogleAuthButton` | `components/GoogleAuthButton.jsx` | Logowanie Google |
| `ChatWidget` | `components/ChatWidget.jsx` | Widget czatu |

Komponenty przyjmują props (np. `CarCard`: `name`, `image`, `price`, `onClick`).

---

## Logowanie (Firebase Auth)

### Konfiguracja

1. Projekt Firebase z aplikacją webową
2. Włączone metody: **Email/Password** i **Google**
3. Zmienne środowiskowe w `.env` (patrz `.env.example`)
4. Inicjalizacja w `src/lib/firebase.js` — `getAuth()`, `GoogleAuthProvider`

### Flow użytkownika

- **Rejestracja** (`/register`) — e-mail, hasło, imię; opcjonalnie Google
- **Logowanie** (`/login`) — e-mail/hasło, Google, tryb gościa
- **Wylogowanie** — przycisk w Navbar
- **Chronione trasy** — `/account` wymaga zalogowania (`AuthContext`)

![Logowanie](docs/Zrzut%20ekranu%202026-06-14%20115625.png)

![Rejestracja](docs/Zrzut%20ekranu%202026-06-14%20115642.png)

![Panel użytkownika — Moje konto](docs/Zrzut%20ekranu%202026-06-14%20120312.png)

![Rezerwacje, vouchery i preferencje konta](docs/Zrzut%20ekranu%202026-06-14%20120327.png)

---

## Google Analytics

Integracja przez **Firebase Analytics** (GA4). Przy każdej zmianie trasy wysyłany jest event `page_view` z aktualizacją tytułu dokumentu.

**Pliki:** `src/lib/firebase.js`, `src/lib/googleAnalytics.js`, `src/App.jsx`

### Wyniki — Firebase Analytics Dashboard

![Przegląd aktywności użytkowników](docs/Zrzut%20ekranu%202026-06-14%20114039.png)

W okresie testów zarejestrowano m.in. **17 aktywnych użytkowników** (30 dni) oraz **297 zdarzeń `page_view`**.

### Realtime — śledzenie tras SPA

![Realtime — mapa użytkowników](docs/Zrzut%20ekranu%202026-06-14%20114157.png)

![Realtime — wyświetlenia stron](docs/Zrzut%20ekranu%202026-06-14%20114217.png)

![Realtime — zdarzenia page_view](docs/Zrzut%20ekranu%202026-06-14%20114233.png)

### Raporty — najpopularniejsze widoki

![Wyświetlenia stron i zdarzenia](docs/Zrzut%20ekranu%202026-06-14%20114521.png)

Najczęściej odwiedzane: strona główna, flota, logowanie, szczegóły aut (Porsche, Ferrari), bezpieczeństwo.

![Aktywni użytkownicy wg kraju](docs/Zrzut%20ekranu%202026-06-14%20114600.png)

---

## Hotjar

Skrypt inicjalizowany w `index.html`. Przy nawigacji SPA wywoływane jest `hj('stateChange', path)` (`src/lib/hotjar.js`, `src/App.jsx`).

### Panel Contentsquare / Hotjar

![APEX Drive at a glance — sesje, bounce rate, czas sesji](docs/Zrzut%20ekranu%202026-06-14%20114637.png)

W okresie 7 dni: **25 sesji**, bounce rate **24%**, średni czas sesji **4 min 08 s**, LCP **0,98 s**.

### Session Replay — lista nagrań

![Session Replay — lista sesji użytkowników](docs/Zrzut%20ekranu%202026-06-14%20120931.png)

Nagrania obejmują nawigację po trasach SPA (`/about`, `/login`, `/vouchers`, `/track`, `/cars`…).

![Session Replay — szczegóły sesji (pageviews)](docs/Zrzut%20ekranu%202026-06-14%20121001.png)

Pełna ścieżka użytkownika: flota → szczegóły auta → konto → szkolenia → checkout → potwierdzenie.

![Odtwarzacz nagrania — sesja mobile (iOS, Polska)](docs/Zrzut%20ekranu%202026-06-14%20125658.png)

Nagranie sesji 22 s — nawigacja po `/bezpieczenstwo`, `/szkolenia`, `/cars` z widokiem interakcji użytkownika (tap/click).

---

## Screeny aplikacji

### Strona główna (`/`)

![Hero — POCZUJ MOC NA TORZE](docs/Zrzut%20ekranu%202026-06-14%20114809.png)

![Sekcja — Twój tor. Twoje zasady.](docs/Zrzut%20ekranu%202026-06-14%20114829.png)

![Najpopularniejsze auta i voucher](docs/Zrzut%20ekranu%202026-06-14%20114850.png)

![Wydarzenia i precyzja w każdym szczególe](docs/Zrzut%20ekranu%202026-06-14%20114923.png)

### Konto użytkownika (`/account`)

Chroniony widok dostępny po zalogowaniu — rezerwacje, vouchery, statystyki jazdy, edycja profilu.

### Vouchery (`/vouchers`)

![Gift Vouchers — voucher na konkretne auto](docs/Zrzut%20ekranu%202026-06-14%20120346.png)

![Gift Vouchers — otwarty termin](docs/Zrzut%20ekranu%202026-06-14%20120404.png)

### Kalendarz wydarzeń (`/kalendarz`)

![Kalendarz wydarzeń 2026 — hero i lista](docs/Zrzut%20ekranu%202026-06-14%20120443.png)

![Filtry kategorii i rezerwacja wydarzeń](docs/Zrzut%20ekranu%202026-06-14%20120530.png)

### Samochody (`/cars`, `/cars/:slug`)

![Lista floty z filtrami](docs/Zrzut%20ekranu%202026-06-14%20114949.png)

![Szczegóły Ferrari SF90 — galeria i konfigurator](docs/Zrzut%20ekranu%202026-06-14%20115358.png)

![Szczegóły auta — specyfikacja i rezerwacja](docs/Zrzut%20ekranu%202026-06-14%20115411.png)

### Tor (`/track`)

![Tor APEX Drive — specyfikacja](docs/Zrzut%20ekranu%202026-06-14%20115011.png)

![Rezerwacja terminu na torze](docs/Zrzut%20ekranu%202026-06-14%20115027.png)

![Opinie kierowców i dojazd](docs/Zrzut%20ekranu%202026-06-14%20115044.png)

### Szkolenia (`/szkolenia`, `/szkolenia/:slug`)

![Akademia APEX — hero](docs/Zrzut%20ekranu%202026-06-14%20115100.png)

![Programy szkoleniowe](docs/Zrzut%20ekranu%202026-06-14%20115118.png)

![Elitarny zespół instruktorów](docs/Zrzut%20ekranu%202026-06-14%20115133.png)

![Szczegóły szkolenia — Podstawy na torze](docs/Zrzut%20ekranu%202026-06-14%20115505.png)

![Rezerwacja szkolenia](docs/Zrzut%20ekranu%202026-06-14%20115538.png)

### O nas (`/about`)

![O nas — hero](docs/Zrzut%20ekranu%202026-06-14%20115203.png)

![Formularz kontaktowy](docs/Zrzut%20ekranu%202026-06-14%20115309.png)

### Bezpieczeństwo (`/bezpieczenstwo`)

![Bezpieczeństwo i FAQ](docs/Zrzut%20ekranu%202026-06-14%20115322.png)

### Powiadomienia (`/notify`)

![Powiadom mnie o dostępności auta](docs/Zrzut%20ekranu%202026-06-14%20115432.png)

### Checkout (`/checkout`)

![Podsumowanie i płatność](docs/Zrzut%20ekranu%202026-06-14%20115553.png)

### 404 (`NotFound`)

![Wypadłeś z toru — strona 404](docs/Zrzut%20ekranu%202026-06-14%20115611.png)

---

## Checklist laboratorium

| Wymaganie | Status | Uwagi |
|-----------|--------|-------|
| Odwzorowanie prototypu | ✅ | Dark theme, sekcje zgodne z makietą APEX Drive |
| Routing wszystkich ekranów | ✅ | SPA routing w `App.jsx`, fallback 404 |
| Podział na `pages/` | ✅ | 18+ widoków w folderze `pages/` |
| Komponenty reużywalne | ✅ | Navbar, Footer, CarCard, BookingCalendar… |
| CSS / stylowanie | ✅ | Spójny dark theme, responsywność |
| Logowanie Firebase | ✅ | E-mail, Google, rejestracja, wylogowanie |
| Hotjar | ✅ | Contentsquare + `stateChange` przy nawigacji |
| Google Analytics | ✅ | Firebase Analytics / GA4, event `page_view` |
| Deploy | ✅ | https://apexdrive-b91d4.web.app |
| Dokumentacja ze screenami | ✅ | Ten plik + folder `docs/` |

---

## Autorzy

Projekt zespołowy — TPF, SEM VIII.

- Zuzanna Kacprzak
- Andrzej Brzeziński
- Szymon Dral


---
