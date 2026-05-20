import { useEffect, useId, useRef, useState } from 'react'
import './ChatWidget.css'

function ChatIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2z" />
        </svg>
    )
}

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
    )
}

function ChatWidget() {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const titleId = useId()
    const inputRef = useRef(null)

    const closeChat = () => setOpen(false)

    const toggleChat = () => {
        setOpen((isOpen) => !isOpen)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!message.trim()) {
            return
        }
        setMessage('')
    }

    useEffect(() => {
        if (!open) {
            return undefined
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setOpen(false)
            }
        }

        inputRef.current?.focus()
        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [open])

    return (
        <div className="chat-widget">
            {open && (
                <div
                    className="chat-popup"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                >
                    <header className="chat-popup__header">
                        <div className="chat-popup__title-wrap">
                            <p className="chat-popup__label">APEX DRIVE</p>
                            <h2 id={titleId} className="chat-popup__title">
                                Czat z obsługą
                            </h2>
                        </div>
                        <button
                            type="button"
                            className="chat-popup__close"
                            onClick={closeChat}
                            aria-label="Zamknij czat"
                        >
                            <CloseIcon />
                        </button>
                    </header>

                    <div className="chat-popup__messages">
                        <div className="chat-popup__bubble chat-popup__bubble--bot">
                            <p>
                                Cześć! Masz pytanie o jazdę na torze, voucher lub rezerwację?
                                Napisz — odpowiemy najszybciej jak to możliwe.
                            </p>
                        </div>
                    </div>

                    <form className="chat-popup__form" onSubmit={handleSubmit}>
                        <input
                            ref={inputRef}
                            type="text"
                            className="chat-popup__input"
                            placeholder="Napisz wiadomość…"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            autoComplete="off"
                        />
                        <button type="submit" className="chat-popup__send">
                            WYŚLIJ
                        </button>
                    </form>
                </div>
            )}

            <button
                type="button"
                className={`chat-fab${open ? ' chat-fab--open' : ''}`}
                onClick={toggleChat}
                aria-expanded={open}
                aria-label={open ? 'Zamknij czat' : 'Otwórz czat'}
            >
                <ChatIcon />
            </button>
        </div>
    )
}

export default ChatWidget
