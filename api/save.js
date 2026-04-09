export default async function handler(req, res) {
  try {
    const url = `${process.env.SUPABASE_URL}/rest/v1/Entries`;
    const key = process.env.SUPABASE_ANON_KEY;
    
    const sbRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(req.body)
    });

    const text = await sbRes.text();
    return res.status(200).json({ 
      status: sbRes.status, 
      url: url.replace(process.env.SUPABASE_URL, 'HIDDEN'),
      hasKey: !!key,
      keyStart: key ? key.slice(0,10) : 'MISSING',
      response: text.slice(0, 500)
    });
  } catch(err) {
    return res.status(200).json({ error: err.message });
  }
}
