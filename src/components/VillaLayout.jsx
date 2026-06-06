import { useNavigate } from 'react-router-dom'
import MaiaGuide from './MaiaGuide'

const VILLA_ORDER = [
  { id: 1, path: '/concierge', name: 'Concierge Villa', emoji: '\u{1F3DD}' },
  { id: 2, path: '/mood-diary', name: 'Mood Diary Centre', emoji: '\u{1F4D3}' },
  { id: 3, path: '/mindfulness', name: 'Mindfulness Villa', emoji: '\u{1F9D8}' },
  { id: 4, path: '/relaxation', name: 'Relaxation Villa', emoji: '\u{1F33F}' },
  { id: 5, path: '/wellness', name: 'Wellness Villa', emoji: '\u{1F49A}' },
  { id: 6, path: '/inspiration', name: 'Inspiration Villa', emoji: '✨' },
  { id: 7, path: '/ai-chatbot', name: 'AI Companion', emoji: '\u{1F916}' },
]

export default function VillaLayout({ villa }) {
  const navigate = useNavigate()
  const vs = { '--villa-color': villa.color, '--villa-color-light': villa.colorLight }
  const currentIdx = VILLA_ORDER.findIndex(v => v.id === villa.id)
  const prevVilla = currentIdx > 0 ? VILLA_ORDER[currentIdx - 1] : null
  const nextVilla = currentIdx >= 0 && currentIdx < VILLA_ORDER.length - 1 ? VILLA_ORDER[currentIdx + 1] : null

  return (
    <div className="villa-page" style={vs}>
      <div className="villa-bg">
        <div className="villa-bg-orb orb1" />
        <div className="villa-bg-orb orb2" />
        <div className="villa-bg-orb orb3" />
      </div>
      <button className="back-btn" onClick={() => navigate('/')}>Back to Island</button>

      <div className="villa-hero">
        <div className="villa-emoji">{villa.emoji}</div>
        <div className="villa-tag">{villa.name}</div>
        <h1 className="villa-title">{villa.name}</h1>
        <p className="villa-subtitle">{villa.tagline}</p>
      </div>

      <div className="villa-content">
        {villa.sections.map((section, i) => (
          <div key={i} className="villa-card" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="card-icon">{section.icon}</div>
            <h3 className="card-title">{section.title}</h3>
            <p className="card-text">{section.text}</p>
            {section.videoUrl && (
              <div className="card-video">
                <iframe
                  src={section.videoUrl}
                  title={section.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            {section.localVideoUrl && (
              <div className="card-video card-video--local">
                <video controls preload="metadata">
                  <source src={section.localVideoUrl} type="video/mp4" />
                </video>
              </div>
            )}
            {section.script && (
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14,
                padding: '18px 20px',
                marginTop: 14,
                color: 'rgba(255,240,200,0.75)',
                fontSize: '0.88rem',
                lineHeight: 1.9,
                whiteSpace: 'pre-line',
                fontStyle: 'italic',
                maxHeight: 320,
                overflowY: 'auto',
              }}>
                {section.script}
              </div>
            )}
            {section.component && (
              <div style={{ marginTop: 16 }}>
                {section.component}
              </div>
            )}
          </div>
        ))}

        <div className="villa-nav-row" style={{ display: 'flex', gap: 12, justifyContent: 'center', margin: '12px 0 32px', padding: '0 20px' }}>
          {prevVilla && (
            <button onClick={() => navigate(prevVilla.path)} style={{
              flex: 1, maxWidth: 200, padding: '12px 16px', borderRadius: 14,
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,240,200,0.7)', cursor: 'pointer', fontSize: '0.85rem', textAlign: 'center',
            }}>
              {'←'} {prevVilla.emoji} {prevVilla.name}
            </button>
          )}
          {nextVilla && villa.id !== 7 && (
            <button onClick={() => navigate(nextVilla.path)} style={{
              flex: 1, maxWidth: 200, padding: '12px 16px', borderRadius: 14,
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,240,200,0.7)', cursor: 'pointer', fontSize: '0.85rem', textAlign: 'center',
            }}>
              {nextVilla.emoji} {nextVilla.name} {'→'}
            </button>
          )}
          {villa.id === 7 && (
            <button onClick={() => navigate('/mood-diary')} style={{
              flex: 1, maxWidth: 260, padding: '13px 20px', borderRadius: 14,
              background: 'linear-gradient(135deg, var(--villa-color), var(--villa-color-light))',
              border: 'none', color: '#1a1a2e', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem',
            }}>
              Return to Mood Diary {'\u{1F4D3}'}
            </button>
          )}
        </div>
      </div>

      <MaiaGuide villaId={villa.id} />
    </div>
  )
}
