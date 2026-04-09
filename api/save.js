export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': process.env.JSONBIN_KEY,
        'X-Bin-Name': 'roma-ses-entries'
      },
      body: JSON.stringify({ entry: req.body, saved_at: new Date().toISOString() })
    });
    const data = await response.json();
    return res.status(200).json({ id: data.metadata?.id || Date.now() });
  } catch(err) {
    return res.status(500).json({ error: err.message });
  }
}
