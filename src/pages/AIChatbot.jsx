import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SYSTEM_PROMPT = `You are Sage, a warm and empathetic AI wellness companion living on Serenity Island. 

You specialise in:
- Mental wellbeing and emotional support
- Mindfulness and grounding techniques  
- CBT-based thought reframing
- Active listening and reflection
- Stress, anxiety, and mood support
- Positive psychology and resilience building

Your communication style:
- Warm, gentle, and non-judgmental
- Never diagnose or prescribe
- Always validate feelings before offering suggestions
- Use calming, nature-inspired language occasionally
- Keep responses concise but meaningful (3-5 sentences usually)
- Ask one thoughtful follow-up question to keep the conversation going
- If someone is in crisis, always direct them to professional help immediately

You are NOT a replacement for professional therapy. Always remind users of this gently when appropriate.`

export default function AIChatbot() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello, I'm Sage 🌿 Your wellness companion on Serenity Island. This is a safe, gentle space — no judgement, no rush. How are you feeling today?`
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage() {
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: newMessages
        })
      })

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I\'m sorry, I\'m having trouble connecting right now. Please try again in a moment. 🌿'
      }])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chat-page">

      {/* Background */}
      <div className="chat-bg">
        <div className="chat-orb orb1" />
        <div className="chat-orb orb2" />
      </div>

      {/* Back button */}
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Island
      </button>

      {/* Header */}
      <div className="chat-header">
        <div className="sage-avatar">🌿</div>
        <div>
          <h1 className="sage-name">Sage</h1>
          <p className="sage-status">
            <span className="status-dot" /> Wellness Companion · Always here
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="chat-disclaimer">
        ⚠️ Sage is an AI companion, not a licensed therapist. If you are in crisis, please contact a professional helpline immediately.
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message-row ${msg.role}`}>
            {msg.role === 'assistant' && (
              <div className="msg-avatar">🌿</div>
            )}
            <div className={`message-bubble ${msg.role}`}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="message-row assistant">
            <div className="msg-avatar">🌿</div>
            <div className="message-bubble assistant typing">
              <span /><span /><span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <textarea
          className="chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Share how you're feeling... (Enter to send)"
          rows={1}
          disabled={loading}
        />
        <button
          className="chat-send-btn"
          onClick={sendMessage}
          disabled={!input.trim() || loading}
        >
          ✦ Send
        </button>
      </div>

    </div>
  )
}