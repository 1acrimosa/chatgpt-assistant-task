import { useState, useRef, useEffect } from "react";
import styles from "./App.module.css";

const SUGGESTIONS = [
  "Explain quantum computing simply",
  "Write a short poem about the sea",
  "What are the best practices in React?",
  "Give me a recipe for banana bread",
];

const MicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const BotIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7H4a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7 14v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2H7M9 15h1v1H9v-1m4 0h1v1h-1v-1z"/>
  </svg>
);

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (hasMessages) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || loading) return;

    setInput("");
    setError("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err.message || "Failed to get a response. Please try again.");
      setMessages((prev) => prev.slice(0, -1)); // remove optimistic user message on error
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleVoice = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setError("Voice input is not supported in your browser. Try Chrome.");
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  return (
    <div className={styles.app}>
      {/* Background gradient orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.layout}>
        {/* Header icon */}
        <div className={styles.iconWrap}>
          <div className={styles.iconBox}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
          </div>
        </div>

        {/* Hero or chat area */}
        {!hasMessages ? (
          <div className={styles.hero}>
            <p className={styles.greeting}>Hi there!</p>
            <h1 className={styles.headline}>What would you like to know?</h1>
            <p className={styles.sub}>
              Use one of the most common prompts below<br />
              or ask your own question
            </p>

            <div className={styles.suggestions}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className={styles.chip}
                  onClick={() => sendMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.message} ${msg.role === "user" ? styles.userMsg : styles.botMsg}`}
                style={{ animationDelay: `${0}ms` }}
              >
                {msg.role === "assistant" && (
                  <div className={styles.avatar}><BotIcon /></div>
                )}
                <div className={styles.bubble}>{msg.content}</div>
              </div>
            ))}
            {loading && (
              <div className={`${styles.message} ${styles.botMsg}`}>
                <div className={styles.avatar}><BotIcon /></div>
                <div className={`${styles.bubble} ${styles.loading}`}>
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className={styles.error}>
            ⚠ {error}
            <button onClick={() => setError("")} className={styles.errorClose}>✕</button>
          </div>
        )}

        {/* Input bar */}
        <div className={styles.inputWrap}>
          <div className={styles.inputBar}>
            <button
              className={`${styles.micBtn} ${listening ? styles.micActive : ""}`}
              onClick={toggleVoice}
              title={listening ? "Stop recording" : "Voice input"}
            >
              <MicIcon />
            </button>
            <textarea
              ref={inputRef}
              className={styles.textarea}
              placeholder="Ask whatever you want"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={loading}
            />
            <button
              className={`${styles.sendBtn} ${(!input.trim() || loading) ? styles.sendDisabled : ""}`}
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              title="Send"
            >
              {loading ? <div className={styles.spinner} /> : <SendIcon />}
            </button>
          </div>
          <p className={styles.hint}>Press Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  );
}
