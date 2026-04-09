export default async function handler(req, res) {
  try {
    const { id, ...fields } = req.body;
    const sbRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/entries?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(fields)
    });
    return res.status(200).json({ ok: sbRes.ok });
  } catch(err) {
    return res.status(500).json({ error: err.message });
  }
}
