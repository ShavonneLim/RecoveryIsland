import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MaiaGuide from '../components/MaiaGuide'

const ASSESS_CARDS = [
  {
    id: 'pss',
    shortName: 'PSS-10',
    name: 'Perceived Stress Scale',
    icon: '🌊',
    color: '#8b5cf6',
    desc: 'Measures perceived stress over the past month.',
    maxScore: 40,
    getSeverity: s =>
      s < 14  ? { label: 'Low',      color: '#10b981' } :
      s <= 26 ? { label: 'Moderate', color: '#f59e0b' } :
                { label: 'High',     color: '#ef4444' },
  },
  {
    id: 'phq',
    shortName: 'PHQ-9',
    name: 'Patient Health Questionnaire',
    icon: '💭',
    color: '#6366f1',
    desc: 'Screens for depression over the past two weeks.',
    maxScore: 27,
    getSeverity: s =>
      s <= 4  ? { label: 'None',           color: '#10b981' } :
      s <= 9  ? { label: 'Mild',           color: '#84cc16' } :
      s <= 14 ? { label: 'Moderate',       color: '#f59e0b' } :
      s <= 19 ? { label: 'Mod. Severe',    color: '#f97316' } :
                { label: 'Severe',         color: '#ef4444' },
  },
  {
    id: 'gad',
    shortName: 'GAD-7',
    name: 'General Anxiety Disorder',
    icon: '🫀',
    color: '#06b6d4',
    desc: 'Screens for generalised anxiety over the past two weeks.',
    maxScore: 21,
    getSeverity: s =>
      s <= 4  ? { label: 'None-Minimal', color: '#10b981' } :
      s <= 9  ? { label: 'Mild',         color: '#84cc16' } :
      s <= 14 ? { label: 'Moderate',     color: '#f59e0b' } :
                { label: 'Severe',       color: '#ef4444' },
  },
  {
    id: 'cdrisc',
    shortName: 'CD-RISC 5',
    name: 'Resilience Scale',
    icon: '🌱',
    color: '#10b981',
    desc: 'Measures your resilience and ability to adapt to challenges.',
    maxScore: 20,
    getSeverity: s =>
      s >= 14 ? { label: 'High',     color: '#10b981' } :
      s >= 7  ? { label: 'Moderate', color: '#f59e0b' } :
                { label: 'Low',      color: '#ef4444' },
  },
]

const MOODS = [
  { value: 5, emoji: '😄', label: 'Great',      color: '#10b981' },
  { value: 4, emoji: '😊', label: 'Good',       color: '#84cc16' },
  { value: 3, emoji: '😐', label: 'Okay',       color: '#f59e0b' },
  { value: 2, emoji: '😔', label: 'Low',        color: '#f97316' },
  { value: 1, emoji: '😢', label: 'Struggling', color: '#ef4444' },
]

function todayStr() {
  return new Date().toDateString()
}

function readLS(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback } catch { return fallback }
}

export default function MoodDiaryCentre() {
  const navigate = useNavigate()

  // Assessment scores saved by EmotionScales page
  const savedScores = readLS('ri_scores', {})

  // Mood entries
  const [entries, setEntries] = useState(() => readLS('ri_moods', []))

  const todayEntry = entries.find(e => new Date(e.ts).toDateString() === todayStr())
  const [selectedMood, setSelectedMood] = useState(
    todayEntry ? MOODS.find(m => m.value === todayEntry.value) ?? null : null
  )
  const [note, setNote] = useState(todayEntry?.note ?? '')
  const [saved, setSaved] = useState(!!todayEntry)

  function saveMood() {
    if (!selectedMood) return
    const entry = { ts: Date.now(), value: selectedMood.value, emoji: selectedMood.emoji, label: selectedMood.label, note }
    const updated = [...entries.filter(e => new Date(e.ts).toDateString() !== todayStr()), entry]
    setEntries(updated)
    localStorage.setItem('ri_moods', JSON.stringify(updated))
    setSaved(true)
  }

  // Last 7 days for insights
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const ds = d.toDateString()
    const entry = entries.find(e => new Date(e.ts).toDateString() === ds)
    return { ds, day: d.toLocaleDateString('en', { weekday: 'short' }), entry }
  })

  const filledDays = last7.filter(d => d.entry)
  const avgMood = filledDays.length
    ? (filledDays.reduce((s, d) => s + d.entry.value, 0) / filledDays.length).toFixed(1)
    : null

  const topMood = filledDays.length
    ? MOODS.map(m => ({ ...m, count: filledDays.filter(d => d.entry.value === m.value).length }))
        .sort((a, b) => b.count - a.count)[0]
    : null

  const trend = filledDays.length >= 2
    ? filledDays[filledDays.length - 1].entry.value - filledDays[0].entry.value
    : null

  return (
    <div className="villa-page" style={{ '--villa-color': '#8b5cf6', '--villa-color-light': '#c4b5fd' }}>
      <div className="villa-bg">
        <div className="villa-bg-orb orb1" />
        <div className="villa-bg-orb orb2" />
        <div className="villa-bg-orb orb3" />
      </div>

      <button className="back-btn" onClick={() => navigate('/')}>← Back to Island</button>

      <div className="villa-hero">
        <div className="villa-emoji">📓</div>
        <div className="villa-tag">Villa 2</div>
        <h1 className="villa-title">Mood Diary Centre</h1>
        <p className="villa-subtitle">Every emotion tells a story. Here, you write yours.</p>
      </div>

      <div className="mdc-page">

        {/* ── Assessment Cards ── */}
        <p className="mdc-label">My Emotion Assessments</p>
        <div className="mdc-assess-grid">
          {ASSESS_CARDS.map(card => {
            const s = savedScores[card.id]
            const sev = s != null ? card.getSeverity(s.score) : null
            return (
              <div key={card.id} className="mdc-assess-card" style={{ '--ac': card.color }}>
                <div className="mdc-assess-top">
                  <span className="mdc-assess-icon">{card.icon}</span>
                  <div>
                    <div className="mdc-assess-short">{card.shortName}</div>
                    <div className="mdc-assess-name">{card.name}</div>
                  </div>
                </div>
                <p className="mdc-assess-desc">{card.desc}</p>
                <div className="mdc-assess-score-row">
                  {sev ? (
                    <>
                      <span className="mdc-assess-score-val" style={{ color: card.color }}>
                        {s.score}<span className="mdc-assess-max">/{card.maxScore}</span>
                      </span>
                      <span className="mdc-sev-pill" style={{ background: sev.color + '22', color: sev.color }}>
                        {sev.label}
                      </span>
                    </>
                  ) : (
                    <span className="mdc-not-taken">Not taken yet</span>
                  )}
                </div>
                <button className="mdc-assess-btn" onClick={() => navigate('/emotion-scales')}>
                  {sev ? 'Retake →' : 'Take Assessment →'}
                </button>
              </div>
            )
          })}
        </div>

        {/* ── Track Your Emotions ── */}
        <p className="mdc-label">Track Your Emotions</p>
        <div className="mdc-card">
          <div className="mdc-card-header">
            <span className="mdc-card-icon">🎭</span>
            <div>
              <h3 className="mdc-card-title">How are you feeling today?</h3>
              <p className="mdc-card-sub">
                {new Date().toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>

          {saved && todayEntry ? (
            <div className="mdc-saved-state">
              <span className="mdc-saved-emoji">{todayEntry.emoji}</span>
              <div>
                <p className="mdc-saved-text">
                  You logged <strong style={{ color: '#c4b5fd' }}>{todayEntry.label}</strong> today
                </p>
                {todayEntry.note && <p className="mdc-saved-note">"{todayEntry.note}"</p>}
                <button className="mdc-update-btn" onClick={() => setSaved(false)}>Update entry</button>
              </div>
            </div>
          ) : (
            <>
              <div className="mdc-mood-row">
                {MOODS.map(m => (
                  <button
                    key={m.value}
                    className={`mdc-mood-btn ${selectedMood?.value === m.value ? 'mdc-mood-btn--on' : ''}`}
                    style={{ '--mc': m.color }}
                    onClick={() => { setSelectedMood(m); setSaved(false) }}
                  >
                    <span className="mdc-mood-emoji">{m.emoji}</span>
                    <span className="mdc-mood-label">{m.label}</span>
                  </button>
                ))}
              </div>

              {selectedMood && (
                <>
                  <textarea
                    className="mdc-note-input"
                    placeholder="Add a note about your day (optional)…"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    rows={2}
                  />
                  <button className="mdc-save-btn" onClick={saveMood}>
                    Save Today's Mood
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* ── Mood Insights ── */}
        <p className="mdc-label">Mood Insights</p>
        <div className="mdc-card">
          <div className="mdc-card-header">
            <span className="mdc-card-icon">📊</span>
            <div>
              <h3 className="mdc-card-title">Your Past 7 Days</h3>
              <p className="mdc-card-sub">
                {avgMood
                  ? <>Average mood: <strong style={{ color: '#c4b5fd' }}>{avgMood}/5</strong> across {filledDays.length} {filledDays.length === 1 ? 'entry' : 'entries'}</>
                  : 'Start logging daily to see your patterns here'}
              </p>
            </div>
          </div>

          <div className="mdc-week-row">
            {last7.map((day, i) => {
              const mood = day.entry ? MOODS.find(m => m.value === day.entry.value) : null
              return (
                <div key={i} className="mdc-day-col">
                  <div
                    className="mdc-day-circle"
                    style={mood
                      ? { background: mood.color + '2a', border: `2px solid ${mood.color}`, color: mood.color }
                      : {}}
                    title={mood ? `${day.day}: ${mood.label}` : day.day}
                  >
                    {mood ? mood.emoji : '·'}
                  </div>
                  <span className="mdc-day-label">{day.day}</span>
                </div>
              )
            })}
          </div>

          {filledDays.length > 0 && (
            <div className="mdc-insight-summary">
              {topMood && (
                <p className="mdc-insight-line">
                  Most common: <span style={{ color: topMood.color }}>{topMood.emoji} {topMood.label}</span>
                </p>
              )}
              {trend !== null && (
                <p className="mdc-insight-line">
                  Trend:{' '}
                  <span style={{ color: trend > 0 ? '#10b981' : trend < 0 ? '#ef4444' : '#f59e0b' }}>
                    {trend > 0 ? '↑ Improving' : trend < 0 ? '↓ Declining' : '→ Stable'}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── Wellbeing Practices (static) ── */}
        <p className="mdc-label">Wellbeing Practices</p>
        <div className="mdc-static-grid">
          <div className="villa-card" style={{ animation: 'none' }}>
            <div className="card-icon">✍️</div>
            <h3 className="card-title">Reflective Journalling</h3>
            <p className="card-text">Go beyond mood tracking with guided journalling prompts designed by psychologists to help you process and understand your inner world.</p>
          </div>
          <div className="villa-card" style={{ animation: 'none' }}>
            <div className="card-icon">🌱</div>
            <h3 className="card-title">Growth Milestones</h3>
            <p className="card-text">Celebrate your progress. Every entry is a step forward. Look back and see just how far your emotional journey has taken you.</p>
          </div>
        </div>

      </div>

      <MaiaGuide villaId={2} />
    </div>
  )
}
