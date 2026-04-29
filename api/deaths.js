export default async function handler(req, res) {
  try {

    const r = await fetch("https://rubinot.com.br/deaths", {
      headers:{
        "User-Agent":"Mozilla/5.0"
      }
    });

    const html = await r.text();

    const matches = [
      ...html.matchAll(
        /([A-Za-z0-9 ]+)\s+died[\s\S]{0,120}?Level\s*(\d+)[\s\S]{0,120}?(\d+)\s*(minute|min)/gi
      )
    ];

    const mortes = matches.map(m => ({
      name: m[1].trim(),
      level: parseInt(m[2]),
      minutes: parseInt(m[3])
    }));

    res.status(200).json(mortes);

  } catch (e) {

    res.status(500).json({
      error:"fail",
      msg:e.toString()
    });

  }
}
