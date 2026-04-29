export default async function handler(req, res) {

  try {

    const r = await fetch("https://rubinot.com.br/deaths");
    const html = await r.text();

    const txt = html
      .replace(/<script[\s\S]*?<\/script>/gi," ")
      .replace(/<style[\s\S]*?<\/style>/gi," ")
      .replace(/<[^>]+>/g,"\n");

    const linhas = txt.split("\n").map(l=>l.trim()).filter(Boolean);

    const mortes = [];

    for (let linha of linhas) {

      const nome = linha.match(/^(.+?) died/i);
      const level = linha.match(/level\s*(\d+)/i);
      const tempo = linha.match(/(\d+)\s*(minute|min)/i);

      if (nome && level && tempo) {
        mortes.push({
          name: nome[1],
          level: parseInt(level[1]),
          minutes: parseInt(tempo[1])
        });
      }
    }

    res.status(200).json(mortes);

  } catch (e) {

    res.status(500).json({ error: "fail" });
  }
}
