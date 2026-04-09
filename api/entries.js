export default async function handler(req, res) {
  try {
    const today = new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
    const sbRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/Entries?entry_date=eq.${encodeURIComponent(today)}&order=logged_time.desc`, {
      headers: {
        'apikey': process.env.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`
      }
    });
    const data = await sbRes.json();
    return res.status(200).json(data);
  } catch(err) {
    return res.status(500).json({ error: err.message });
  }
}
