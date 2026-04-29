export default async function handler(req, res) {
  try {
    const r = await fetch("https://rubinot.com.br/deaths", {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "text/html"
      }
    });

    const html = await r.text();

    res.status(200).json({
      status: r.status,
      length: html.length,
      first1000: html.slice(0,1000)
    });

  } catch (e) {
    res.status(500).json({
      error: e.toString()
    });
  }
}
