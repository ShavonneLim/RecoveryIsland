import { useState } from 'react'

const AFFIRMATIONS = [
  { category: 'Morning', text: 'Today is a new beginning. I welcome it with an open heart.' },
  { category: 'Morning', text: 'I give myself permission to move slowly and still move forward.' },
  { category: 'Morning', text: 'I do not need to have it all figured out to take one small step today.' },
  { category: 'Morning', text: 'I choose to be present in this moment, just as it is.' },
  { category: 'Self-Worth', text: 'I am worthy of love — not because of what I achieve, but because I exist.' },
  { category: 'Self-Worth', text: 'I am enough, exactly as I am right now.' },
  { category: 'Self-Worth', text: 'My worth is not determined by my productivity or my struggles.' },
  { category: 'Self-Worth', text: 'I deserve the same compassion I would give a friend.' },
  { category: 'Healing', text: 'Healing is not linear, and neither am I. That is okay.' },
  { category: 'Healing', text: 'I honour the progress I cannot yet see.' },
  { category: 'Healing', text: 'I am allowed to take up space in my own life.' },
  { category: 'Healing', text: 'I release the pressure to be fully healed right now.' },
  { category: 'Strength', text: 'I have survived every difficult day before this one.' },
  { category: 'Strength', text: 'I carry more resilience than I give myself credit for.' },
  { category: 'Strength', text: 'This feeling is temporary. I am not.' },
  { category: 'Strength', text: 'I am becoming someone I am proud of — one day at a time.' },
]

const GOAL_PHASES = [
  {
    number: '01',
    heading: 'Set Your Intention',
    items: [
      'Choose one goal at a time — not five. One focused step beats scattered effort.',
      'Make it specific: "Go for a 10-minute walk on Tuesday" beats "exercise more".',
      'Ask yourself: is this goal from fear, or from hope? Aim for hope.',
      'Write it down. Naming your intention out loud makes it real.',
    ]
  },
  {
    number: '02',
    heading: 'Build the Habit',
    items: [
      'Pair your goal with something you already do — stack new habits onto existing ones.',
      'Start smaller than feels necessary. Tiny and consistent outlasts big and irregular.',
      "Track progress lightly — celebrate streaks, but don't let missing one end everything.",
      'Tell one person you trust. Accountability is a gift, not a burden.',
    ]
  },
  {
    number: '03',
    heading: 'When You Fall Off Track',
    items: [
      'Missing a day is normal. Missing a week is normal. What matters is coming back.',
      'Ask: what made this hard? Change the plan, not your opinion of yourself.',
      '"If I miss a day, then I will restart the next morning — without guilt."',
      'Progress is rarely a straight line. Trust the direction, not the pace.',
    ]
  }
]

const GRATITUDE_PROMPTS = [
  'Name three things that brought you even a moment of peace today.',
  'Who is someone — past or present — who believed in you? What would you want to say to them?',
  'What is one thing your body did today that you can appreciate, however small?',
  'What is a challenge you\'ve faced that has quietly shaped who you are?',
  'What simple pleasure did you experience today — a taste, a sound, a texture, a colour?',
  'What is one thing about yourself you are grateful for, right now in this moment?',
  'Notice something beautiful in your environment right now. Sit with it for 30 seconds.',
]

export function AffirmationDeck() {
  const [index, setIndex] = useState(0)
  const current = AFFIRMATIONS[index]

  const prev = () => setIndex(i => (i - 1 + AFFIRMATIONS.length) % AFFIRMATIONS.length)
  const next = () => setIndex(i => (i + 1) % AFFIRMATIONS.length)
  const shuffle = () => {
    let n
    do { n = Math.floor(Math.random() * AFFIRMATIONS.length) } while (n === index)
    setIndex(n)
  }

  return (
    <div className="affirmation-deck">
      <span className="affirmation-category">{current.category}</span>
      <p className="affirmation-text" key={index}>"{current.text}"</p>
      <div className="affirmation-nav">
        <button className="affirmation-arrow" onClick={prev} aria-label="Previous">←</button>
        <button className="affirmation-shuffle" onClick={shuffle}>✦ Shuffle</button>
        <button className="affirmation-arrow" onClick={next} aria-label="Next">→</button>
      </div>
      <p className="affirmation-count">{index + 1} / {AFFIRMATIONS.length}</p>
    </div>
  )
}

export function GoalStepper() {
  const [open, setOpen] = useState(0)

  return (
    <div className="goal-stepper">
      {GOAL_PHASES.map((phase, i) => (
        <div key={i} className={`goal-phase ${open === i ? 'goal-phase--open' : ''}`}>
          <button className="goal-phase-header" onClick={() => setOpen(open === i ? -1 : i)}>
            <span className="goal-phase-number">{phase.number}</span>
            <span className="goal-phase-title">{phase.heading}</span>
            <span className="goal-phase-chevron">{open === i ? '▲' : '▼'}</span>
          </button>
          {open === i && (
            <ul className="goal-phase-items">
              {phase.items.map((item, ii) => <li key={ii}>{item}</li>)}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

const STORIES = [
  {
    name: 'Aisha, 24',
    tag: 'Anxiety & University',
    color: '#8b5cf6',
    quote: 'I spent my first semester pretending I was fine. The day I walked into the counselling centre and said "I need help" was the hardest and best thing I ever did.',
    story: "Aisha transferred universities in her second year and felt like she was starting from zero — new city, no friends, overwhelming coursework. She stopped sleeping, started skipping classes, and kept telling herself it would pass. It didn't. After finally reaching out to her university wellness centre, she was diagnosed with generalised anxiety. Therapy, a small study group, and mood tracking slowly gave her tools she still uses today. She's now in her final year and volunteers as a peer mentor for first-year students.",
  },
  {
    name: 'Daniel, 31',
    tag: 'Depression & Loss',
    color: '#6366f1',
    quote: "I didn't recognise depression in myself — I just thought I was becoming a worse version of who I used to be. Someone else saw it before I did.",
    story: "After losing his father, Daniel withdrew from everyone and stopped doing things that used to bring him joy. He told himself he just needed time. Two years passed. A friend quietly mentioned he seemed different — not in a judgmental way, just with love. That conversation led to his first appointment with a GP, then a therapist. 'Grief and depression can look the same from the outside, but they're different. I needed help with both.' He now runs a quiet online community for men going through loss.",
  },
  {
    name: 'Priya, 27',
    tag: 'Burnout & Recovery',
    color: '#f59e0b',
    quote: "I thought burnout was just tiredness. I didn't know it could hollow you out completely — until it did.",
    story: "Priya built her career fast and worked harder than anyone around her. At 25, she collapsed — not physically, but everything stopped feeling meaningful. She couldn't concentrate, lost her appetite, and cried in the work bathroom every morning. A doctor told her she had clinical burnout. She took six weeks off — the first extended break of her adult life. She relearned how to rest, rebuilt slowly, and found that the version of herself she'd been neglecting was still there, waiting. 'Recovery isn't going back to who you were. It's meeting who you actually are.'",
  },
  {
    name: 'Marcus, 22',
    tag: 'OCD & Stigma',
    color: '#10b981',
    quote: "I thought having OCD meant something was deeply wrong with me as a person. I didn't know it was a medical condition I could treat.",
    story: "Marcus had intrusive thoughts from childhood but never named them. He developed rituals to manage the anxiety — checking, counting, replaying — and hid them completely. When he started therapy at 20 and heard the words 'this is OCD', he cried with relief. 'I thought I was dangerous. I wasn't. I was struggling.' With ERP therapy and support, he learned to live alongside the noise rather than be controlled by it. He now speaks openly about OCD online to counter the myths around it.",
  },
  {
    name: 'Selin, 35',
    tag: 'Postpartum & Identity',
    color: '#ec4899',
    quote: "Everyone told me I should be happy. I was terrified. I thought something was wrong with me as a mother.",
    story: "Selin adored her baby and also struggled with a darkness she hadn't expected. She didn't recognise the symptoms of postpartum depression — she thought she was just adjusting. When she told her midwife at a routine appointment how she was really feeling, she was met with immediate support instead of judgment. 'That moment changed everything.' She spent four months in a mother-baby therapy program and rebuilt her sense of self alongside her new role. 'Asking for help made me a better mother — not a worse one.'",
  },
]

export function StoriesOfHope() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {STORIES.map((s, i) => {
        const open = expanded === i
        return (
          <div key={i} style={{
            border: `1px solid ${open ? s.color + '60' : 'rgba(255,215,150,0.12)'}`,
            background: open ? `${s.color}10` : 'rgba(255,245,220,0.04)',
            borderRadius: 14, overflow: 'hidden', transition: 'all 0.25s',
          }}>
            <button onClick={() => setExpanded(open ? null : i)} style={{
              width: '100%', display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px',
              background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'white',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${s.color}30`, border: `2px solid ${s.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                {s.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'rgba(255,240,200,0.9)' }}>{s.name}</span>
                  <span style={{ fontSize: '0.7rem', background: `${s.color}25`, color: s.color, borderRadius: 6, padding: '2px 8px', fontWeight: 600 }}>{s.tag}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,240,200,0.55)', fontStyle: 'italic', lineHeight: 1.5 }}>"{s.quote}"</p>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255,240,200,0.3)', flexShrink: 0, marginTop: 2 }}>{open ? '▲' : '▼'}</span>
            </button>
            {open && (
              <div style={{ padding: '0 16px 16px 68px', fontSize: '0.85rem', color: 'rgba(255,240,200,0.7)', lineHeight: 1.8 }}>
                {s.story}
              </div>
            )}
          </div>
        )
      })}
      <p style={{ fontSize: '0.75rem', color: 'rgba(255,240,200,0.3)', textAlign: 'center', marginTop: 4 }}>
        Stories are fictional composites created to represent common lived experiences.
      </p>
    </div>
  )
}

export function GratitudePromptPicker() {
  const [index, setIndex] = useState(0)
  const next = () => setIndex(i => (i + 1) % GRATITUDE_PROMPTS.length)

  return (
    <div className="gratitude-prompt">
      <p className="gratitude-label">Today's Prompt</p>
      <p className="gratitude-text" key={index}>{GRATITUDE_PROMPTS[index]}</p>
      <div className="gratitude-footer">
        <span className="gratitude-count">{index + 1} of {GRATITUDE_PROMPTS.length}</span>
        <button className="gratitude-next" onClick={next}>Next Prompt →</button>
      </div>
    </div>
  )
}
