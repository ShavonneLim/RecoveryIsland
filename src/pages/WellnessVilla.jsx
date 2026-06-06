import { useState } from 'react'
import VillaLayout from '../components/VillaLayout'

const MOVEMENTS = [
  { id: 'walk',    label: 'Walk / Stroll',   emoji: '\u{1F6B6}', mins: 15 },
  { id: 'stretch', label: 'Stretching',       emoji: '\u{1F646}', mins: 10 },
  { id: 'yoga',    label: 'Yoga',             emoji: '\u{1F9D8}', mins: 20 },
  { id: 'run',     label: 'Run / Jog',        emoji: '\u{1F3C3}', mins: 20 },
  { id: 'swim',    label: 'Swimming',          emoji: '\u{1F3CA}', mins: 30 },
  { id: 'dance',   label: 'Dance',             emoji: '\u{1F483}', mins: 15 },
  { id: 'gym',     label: 'Strength Training', emoji: '\u{1F3CB}', mins: 30 },
  { id: 'cycle',   label: 'Cycling',           emoji: '\u{1F6B4}', mins: 20 },
]

const NUTRITION_TIPS = [
  { mood: 'Anxious',   emoji: '\u{1F630}', color: '#8b5cf6', foods: ['Magnesium-rich foods: dark chocolate, almonds, spinach', 'Chamomile tea or warm lemon water', 'Omega-3s: salmon, walnuts, chia seeds', 'Avoid excess caffeine and refined sugar'], why: 'Magnesium calms the nervous system. Omega-3s reduce cortisol levels.' },
  { mood: 'Low / Sad', emoji: '\u{1F614}', color: '#6366f1', foods: ['Tryptophan-rich: turkey, eggs, banana, oats', 'Dark leafy greens for folate (B9)', 'Complex carbs: sweet potato, brown rice', 'Fermented foods: yoghurt, kefir for gut health'], why: 'Tryptophan helps produce serotonin. 95% of serotonin is made in the gut.' },
  { mood: 'Fatigued',  emoji: '\u{1F634}', color: '#f59e0b', foods: ['Iron-rich: lentils, spinach, red meat', 'Hydration: aim for 8 glasses of water', 'B12: eggs, dairy, or a supplement if needed', 'Avoid heavy, processed meals mid-day'], why: 'Dehydration and low B12 are common, overlooked causes of persistent fatigue.' },
  { mood: 'Stressed',  emoji: '\u{1F624}', color: '#ef4444', foods: ['Vitamin C: citrus, strawberries, bell peppers', 'Magnesium: pumpkin seeds, black beans', 'Herbal teas: lavender, passionflower, lemon balm', 'Dark chocolate (70%+) in moderation'], why: "Vitamin C blunts cortisol spikes. Magnesium supports the body's stress response." },
  { mood: 'Unfocused', emoji: '\u{1F300}', color: '#10b981', foods: ['Blueberries -- rich in flavonoids for cognition', 'Eggs: choline supports memory and focus', 'Avocado: healthy fats for brain function', 'Stay hydrated -- even mild dehydration affects focus'], why: 'The brain is 75% water. Healthy fats are essential for neurotransmitter function.' },
]

const ROUTINE_ITEMS = {
  morning: [
    { id: 'water',     label: 'Drink a glass of water',      emoji: '\u{1F4A7}' },
    { id: 'stretch',   label: '5-min morning stretch',        emoji: '\u{1F646}' },
    { id: 'journal',   label: 'Write 3 intentions',           emoji: '\u{270D}' },
    { id: 'breakfast', label: 'Nourishing breakfast',         emoji: '\u{1F963}' },
    { id: 'sunlight',  label: 'Step outside for sunlight',    emoji: '\u{2600}' },
    { id: 'breathe',   label: 'Breathing exercise',           emoji: '\u{1F32C}' },
    { id: 'gratitude', label: 'Note one thing to appreciate', emoji: '\u{1F338}' },
    { id: 'noscreen',  label: 'No phone for 30 min',          emoji: '\u{1F4F5}' },
  ],
  evening: [
    { id: 'unwind',    label: 'Start winding down',           emoji: '\u{1F319}' },
    { id: 'noscreen2', label: 'Put phone down by 9pm',        emoji: '\u{1F4F5}' },
    { id: 'reflect',   label: 'Reflect on the day',           emoji: '\u{1F4AD}' },
    { id: 'tea',       label: 'Herbal tea',                   emoji: '\u{1F375}' },
    { id: 'stretch2',  label: 'Gentle evening stretch',       emoji: '\u{1F9D8}' },
    { id: 'read',      label: 'Read for 15 minutes',          emoji: '\u{1F4DA}' },
    { id: 'grateful2', label: "Write one thing you're proud of", emoji: '✨' },
    { id: 'sleep',     label: 'Consistent sleep time',        emoji: '\u{1F634}' },
  ],
}

const SLEEP_QUALITY = [
  { val: 3, label: 'Great', emoji: '\u{1F634}', color: '#10b981' },
  { val: 2, label: 'Okay',  emoji: '\u{1F610}', color: '#f59e0b' },
  { val: 1, label: 'Poor',  emoji: '\u{1F635}', color: '#ef4444' },
]

function todayKey() { return new Date().toDateString() }
function readLS(k, fb) { try { return JSON.parse(localStorage.getItem(k) || 'null') ?? fb } catch { return fb } }

function MovementTracker() {
  const key = `ri_movement_${todayKey()}`
  const [done, setDone] = useState(() => readLS(key, []))

  function toggle(id) {
    const next = done.includes(id) ? done.filter(d => d !== id) : [...done, id]
    setDone(next)
    try { localStorage.setItem(key, JSON.stringify(next)) } catch {}
  }

  const totalMins = done.reduce((s, id) => s + (MOVEMENTS.find(m => m.id === id)?.mins || 0), 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 8 }}>
        {MOVEMENTS.map(m => {
          const active = done.includes(m.id)
          return (
            <button key={m.id} onClick={() => toggle(m.id)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
              padding: '12px 8px', borderRadius: 12,
              border: active ? '1.5px solid rgba(74,222,128,0.6)' : '1.5px solid rgba(255,215,150,0.15)',
              background: active ? 'rgba(74,222,128,0.12)' : 'rgba(255,245,220,0.04)',
              cursor: 'pointer', transition: 'all 0.18s', color: 'white',
            }}>
              <span style={{ fontSize: 22 }}>{active ? '✅' : m.emoji}</span>
              <span style={{ fontSize: '0.78rem', textAlign: 'center', color: active ? 'rgba(74,222,128,0.9)' : 'rgba(255,240,200,0.6)' }}>{m.label}</span>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,240,200,0.35)' }}>{m.mins} min</span>
            </button>
          )
        })}
      </div>
      {done.length > 0 && (
        <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 10, padding: '10px 14px', fontSize: '0.85rem', color: 'rgba(74,222,128,0.85)', textAlign: 'center' }}>
          {done.length} {done.length === 1 ? 'activity' : 'activities'} today -- {totalMins} minutes of movement!
        </div>
      )}
    </div>
  )
}

function NourishmentGuide() {
  const [selected, setSelected] = useState(null)
  const tip = selected !== null ? NUTRITION_TIPS[selected] : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ fontSize: '0.82rem', color: 'rgba(255,240,200,0.5)' }}>How are you feeling? Select a mood for personalised food guidance.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {NUTRITION_TIPS.map((t, i) => (
          <button key={i} onClick={() => setSelected(selected === i ? null : i)} style={{
            display: 'flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 999,
            border: selected === i ? `1.5px solid ${t.color}` : '1.5px solid rgba(255,215,150,0.15)',
            background: selected === i ? `${t.color}20` : 'rgba(255,245,220,0.04)',
            color: selected === i ? 'white' : 'rgba(255,240,200,0.65)', cursor: 'pointer',
            fontSize: '0.82rem', transition: 'all 0.18s',
          }}>
            <span>{t.emoji}</span> {t.mood}
          </button>
        ))}
      </div>
      {tip && (
        <div style={{ background: `${tip.color}12`, border: `1px solid ${tip.color}40`, borderRadius: 14, padding: '16px 18px' }}>
          <p style={{ fontSize: '0.78rem', color: tip.color, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
            Foods that help when feeling {tip.mood.toLowerCase()}
          </p>
          <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {tip.foods.map((f, i) => (
              <li key={i} style={{ fontSize: '0.85rem', color: 'rgba(255,240,200,0.8)', lineHeight: 1.5 }}>{f}</li>
            ))}
          </ul>
          <div style={{ marginTop: 12, padding: '10px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, fontSize: '0.78rem', color: 'rgba(255,240,200,0.5)', fontStyle: 'italic' }}>
            {tip.why}
          </div>
        </div>
      )}
    </div>
  )
}

function RoutineBuilder() {
  const [tab, setTab] = useState('morning')
  const [selected, setSelected] = useState(() => readLS('ri_routine_morning', []))

  function toggleItem(id) {
    const next = selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]
    setSelected(next)
    try { localStorage.setItem(`ri_routine_${tab}`, JSON.stringify(next)) } catch {}
  }

  function switchTab(t) {
    setTab(t)
    setSelected(readLS(`ri_routine_${t}`, []))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {['morning', 'evening'].map(t => (
          <button key={t} onClick={() => switchTab(t)} style={{
            padding: '8px 20px', borderRadius: 999, cursor: 'pointer', fontSize: '0.85rem',
            border: tab === t ? '1.5px solid #f43f5e' : '1.5px solid rgba(255,215,150,0.15)',
            background: tab === t ? 'rgba(244,63,94,0.15)' : 'rgba(255,245,220,0.04)',
            color: tab === t ? '#fda4af' : 'rgba(255,240,200,0.55)', transition: 'all 0.18s',
          }}>
            {t === 'morning' ? 'Morning' : 'Evening'}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(145px, 1fr))', gap: 8 }}>
        {ROUTINE_ITEMS[tab].map(item => {
          const on = selected.includes(item.id)
          return (
            <button key={item.id} onClick={() => toggleItem(item.id)} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 12,
              border: on ? '1.5px solid rgba(244,63,94,0.5)' : '1.5px solid rgba(255,215,150,0.12)',
              background: on ? 'rgba(244,63,94,0.1)' : 'rgba(255,245,220,0.03)',
              cursor: 'pointer', color: on ? '#fda4af' : 'rgba(255,240,200,0.6)',
              fontSize: '0.8rem', textAlign: 'left', transition: 'all 0.18s',
            }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{on ? '✅' : item.emoji}</span>
              {item.label}
            </button>
          )
        })}
      </div>
      {selected.length > 0 && (
        <div style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: '0.82rem', color: 'rgba(253,164,175,0.85)', textAlign: 'center' }}>
          Your {tab} routine has {selected.length} {selected.length === 1 ? 'habit' : 'habits'}. Consistency is everything.
        </div>
      )}
    </div>
  )
}

function SleepTracker() {
  const key = `ri_sleep_${todayKey()}`
  const [entry, setEntry] = useState(() => readLS(key, null))
  const [hours, setHours] = useState(entry?.hours ?? 7)
  const [quality, setQuality] = useState(entry?.quality ?? null)
  const [saved, setSaved] = useState(!!entry)

  function save() {
    if (!quality) return
    const e = { hours, quality }
    setEntry(e)
    setSaved(true)
    try { localStorage.setItem(key, JSON.stringify(e)) } catch {}
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {saved && entry ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 40 }}>{SLEEP_QUALITY.find(q => q.val === entry.quality)?.emoji}</span>
          <div>
            <p style={{ color: 'rgba(255,240,200,0.85)', fontSize: '0.95rem' }}>
              You logged <strong style={{ color: '#c4b5fd' }}>{entry.hours}h</strong> of <strong style={{ color: '#c4b5fd' }}>{SLEEP_QUALITY.find(q => q.val === entry.quality)?.label}</strong> sleep
            </p>
            <button onClick={() => setSaved(false)} style={{ marginTop: 6, background: 'none', border: '1px solid rgba(255,215,150,0.2)', borderRadius: 999, color: 'rgba(255,240,200,0.45)', fontSize: '0.75rem', padding: '4px 12px', cursor: 'pointer' }}>Update</button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,240,200,0.5)', marginBottom: 10 }}>Hours of sleep last night</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <input type="range" min="3" max="12" step="0.5" value={hours} onChange={e => setHours(parseFloat(e.target.value))} style={{ flex: 1, accentColor: '#8b5cf6' }} />
              <span style={{ color: '#c4b5fd', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', minWidth: 40, textAlign: 'right' }}>{hours}h</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,240,200,0.5)', marginBottom: 10 }}>Sleep quality</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {SLEEP_QUALITY.map(q => (
                <button key={q.val} onClick={() => setQuality(q.val)} style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                  padding: '12px 8px', borderRadius: 12,
                  border: quality === q.val ? `1.5px solid ${q.color}` : '1.5px solid rgba(255,215,150,0.12)',
                  background: quality === q.val ? `${q.color}18` : 'rgba(255,245,220,0.04)',
                  cursor: 'pointer', color: quality === q.val ? q.color : 'rgba(255,240,200,0.55)',
                  fontSize: '0.8rem', transition: 'all 0.18s',
                }}>
                  <span style={{ fontSize: 22 }}>{q.emoji}</span>
                  {q.label}
                </button>
              ))}
            </div>
          </div>
          {quality && (
            <button onClick={save} style={{ padding: '11px', borderRadius: 999, background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', border: 'none', color: 'white', fontFamily: "'Jost', sans-serif", fontSize: '0.9rem', cursor: 'pointer' }}>
              Save Sleep Log
            </button>
          )}
        </>
      )}
      <div style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, fontSize: '0.78rem', color: 'rgba(255,240,200,0.45)', lineHeight: 1.6 }}>
        Adults need 7-9 hours. Consistent sleep times improve mood, focus, and resilience more than any supplement.
      </div>
    </div>
  )
}

export default function WellnessVilla() {
  return (
    <VillaLayout villa={{
      id: 5,
      name: 'Wellness Villa',
      emoji: '\u{1F49A}',
      color: '#f43f5e',
      colorLight: '#fda4af',
      tagline: 'Whole-person wellness -- mind, body, and soul in harmony.',
      sections: [
        {
          icon: '\u{1F3C3}',
          title: 'Movement Tracker',
          text: "Mindful movement is one of the most powerful things you can do for your mental health. Tick off what you've done today -- any movement counts.",
          component: <MovementTracker />
        },
        {
          icon: '\u{1F957}',
          title: 'Nourishment & Mood',
          text: 'What you eat directly affects how you feel. Select a mood to discover which foods support your brain and body right now.',
          component: <NourishmentGuide />
        },
        {
          icon: '\u{1F4C5}',
          title: 'Routine Builder',
          text: 'Build a personalised morning or evening routine. Small consistent rituals reduce decision fatigue and create emotional stability.',
          component: <RoutineBuilder />
        },
        {
          icon: '\u{1F4A4}',
          title: 'Sleep Tracker',
          text: 'Sleep is the foundation of mental health. Log your sleep to build awareness of how rest shapes your mood and energy.',
          component: <SleepTracker />
        },
        {
          icon: '\u{1F4A7}',
          title: 'The Basics That Change Everything',
          text: "Before supplements, apps, or routines -- these fundamentals have the biggest impact: drink water before anything else each morning, spend 10 minutes in natural light daily, eat something warm and nourishing for breakfast, and protect the first and last 30 minutes of your day from screens.",
        }
      ]
    }} />
  )
}
