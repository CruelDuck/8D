export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { text?: string } | null;

  // Text vstupu zatím nijak nevyužíváme – jde jen o testovací "fake" odpověď
  const inputPreview = body?.text?.slice(0, 80) ?? "";

  const result = {
    D2: `Popis problému na základě vstupu: ${inputPreview || "[žádný text nezadán]"}`,
    D3: "Okamžitá opatření: blokace potenciálně vadných dílů, třídění skladu, informování zákazníka.",
    D4: "Analýza příčin (5x PROČ):\n1) Proč vznikla vada? – Nastavení stroje nebylo v toleranci.\n2) Proč nebylo v toleranci? – Nebyl proveden pravidelný přeseřizovací úkon.\n3) Proč nebyl proveden? – Operátor neměl v instrukci jasně definovaný interval.\n4) Proč nebyl interval definován? – V pracovní instrukci chyběla kapitola pro údržbu.\n5) Proč chyběla kapitola? – Změna procesu nebyla promítnuta do dokumentace.",
    D5: "Trvalá opatření: úprava pracovní instrukce, doplnění intervalu seřízení, školení operátorů, aktualizace kontrolního plánu.",
  };

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
