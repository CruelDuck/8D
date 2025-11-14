import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type GenerateBody = {
  text?: string;
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as GenerateBody | null;
  const text = body?.text?.trim();

  if (!text) {
    return new Response(
      JSON.stringify({ error: "Chybí vstupní text." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const systemPrompt = `
Jsi inženýr kvality ve výrobní firmě.
Tvým úkolem je na základě textu reklamace nebo popisu problému vytvořit návrh částí 8D reportu.
Piš česky, stručně a technicky.
Nevymýšlej si konkrétní čísla dílů ani zákazníků, pokud nejsou uvedena.
Výstup vrať JEN jako JSON objekt se 4 poli: D2, D3, D4, D5.
`;

  const userPrompt = `
TEXT PROBLÉMU:
"""
${text}
"""

Na základě tohoto textu vytvoř:

- D2: Stručný, ale jasný popis problému (max. 5 vět).
- D3: Návrh okamžitých nápravných opatření (containment).
- D4: Analýzu příčin ve formátu 5x PROČ (jako souvislý text, ale zřetelně značené).
- D5: Návrh trvalých nápravných opatření.

Výstup vrať POUZE jako JSON:

{
  "D2": "...",
  "D3": "...",
  "D4": "...",
  "D5": "..."
}
`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini", // nebo jiný dostupný model
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Prázdná odpověď od modelu");
    }

    // content už je JSON string ve formátu { D2, D3, D4, D5 }
    return new Response(content, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("AI error:", err);
    return new Response(
      JSON.stringify({
        error: "Chyba při volání AI. Zkus to prosím znovu.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
