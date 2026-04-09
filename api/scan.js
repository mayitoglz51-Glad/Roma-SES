export default async function handler(req, res) {
  try {
    const image = req.body?.image;
    if (!image) return res.status(400).json({ error: 'No image' });
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: image } },
            { type: 'text', text: 'This is a CBP prefile manifest. Return ONLY this JSON no markdown:\n{"prefile_number":"full entry number","filer_code":"3-char code","date_of_arrival":"date from document"}' }
          ]
        }]
      })
    });
    const text = await anthropicRes.text();
    if (!anthropicRes.ok) return res.status(500).json({ error: 'Anthropic failed' });
    const data = JSON.parse(text);
    const raw = data.content.map(x => x.text || '').join('');
    return res.status(200).json(JSON.parse(raw.replace(/```json|```/g, '').trim()));
  } catch(err) {
    return res.status(500).json({ error: err.message });
  }
}
