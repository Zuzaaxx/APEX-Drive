import { useMemo } from 'react'
import './BookingCalendar.css'

const WEEKDAYS = ['PN', 'WT', 'ŚR', 'CZ', 'PT', 'SB', 'ND']
const MONTHS = [
    'STYCZEŃ', 'LUTY', 'MARZEC', 'KWIECIEŃ', 'MAJ', 'CZERWIEC',
    'LIPIEC', 'SIERPIEŃ', 'WRZESIEŃ', 'PAŹDZIERNIK', 'LISTOPAD', 'GRUDZIEŃ',
]

function BookingCalendar({
    selectedDays,
    unavailableDays,
    onToggleDay,
    year = 2024,
    month = 11,
    daysInMonth = 31,
    firstDayOffset = 6,
    label = 'WYBIERZ TERMIN',
}) {
    const days = useMemo(() => {
        const cells = []
        for (let i = 0; i < firstDayOffset; i += 1) {
            cells.push({ empty: true, key: `e-${i}` })
        }
        for (let day = 1; day <= daysInMonth; day += 1) {
            cells.push({ day, key: `d-${day}` })
        }
        return cells
    }, [daysInMonth, firstDayOffset])

    return (
        <div className="booking-calendar">
            <span className="booking-calendar__label">{label}</span>
            <div className="booking-calendar__head">
                <span className="booking-calendar__month">
                    {MONTHS[month]} {year}
                </span>
                <div className="booking-calendar__nav">
                    <button type="button" aria-label="Poprzedni miesiąc">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button type="button" aria-label="Następny miesiąc">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="booking-calendar__weekdays">
                {WEEKDAYS.map((day) => (
                    <span key={day}>{day}</span>
                ))}
            </div>
            <div className="booking-calendar__days">
                {days.map((cell) => {
                    if (cell.empty) {
                        return (
                            <span
                                key={cell.key}
                                className="booking-calendar__day booking-calendar__day--empty"
                            />
                        )
                    }

                    const isUnavailable = unavailableDays.includes(cell.day)
                    const isSelected = selectedDays.includes(cell.day)

                    return (
                        <button
                            key={cell.key}
                            type="button"
                            disabled={isUnavailable}
                            className={[
                                'booking-calendar__day',
                                isSelected ? 'booking-calendar__day--selected' : '',
                                isUnavailable ? 'booking-calendar__day--unavailable' : '',
                            ]
                                .filter(Boolean)
                                .join(' ')}
                            onClick={() => onToggleDay(cell.day)}
                        >
                            {cell.day}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default BookingCalendar
