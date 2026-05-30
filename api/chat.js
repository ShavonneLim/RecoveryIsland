export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { messages, system } = req.body

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system,
        messages
      })
    })

    const data = await response.json()
    res.status(200).json({ reply: data.content[0].text })
  } catch (err) {
    res.status(500).json({ reply: 'Something went wrong. Please try again.' })
  }
}
```

**Step 4 — Create your `.env` file** in the root of your project:
```
ANTHROPIC_API_KEY=your_key_here