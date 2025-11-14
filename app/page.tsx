"use client";

import { useState } from "react";

type GenerateResponse = {
  D2: string;
  D3: string;
  D4: string;
  D5: string;
};

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResponse | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setResult(null);

    if (!inputText.trim()) {
      setError("Zadej prosím text reklamace nebo popis problému.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!res.ok) {
        throw new Error("Chyba při volání /api/generate");
      }

      const data = (await res.json()) as GenerateResponse;
      setResult(data);
    } catch (e: any) {
      setError(e.message ?? "Nastala neznámá chyba");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <h1>AI 8D generátor – MVP</h1>
        <p>
          Zadej text reklamace nebo popis problému. Tato verze (kroky 1–4)
          používá jednoduché API s &quot;fake&quot; daty, bez skutečné AI.
        </p>

        <label htmlFor="input">
          Text reklamace / popis problému:
        </label>
        <br />
        <textarea
          id="input"
          rows={8}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Sem vlož text reklamace nebo popis problému..."
        />

        <div>
          <button onClick={handleGenerate} disabled={loading}>
            {loading ? "Generuji..." : "Vygeneruj 8D návrh"}
          </button>
        </div>

        {error && (
          <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>
        )}

        {result && (
          <section className="output-block">
            <h2>Návrh 8D (fake data z API)</h2>

            <h3>D2 – Popis problému</h3>
            <div className="output-box">{result.D2}</div>

            <h3>D3 – Okamžitá nápravná opatření</h3>
            <div className="output-box">{result.D3}</div>

            <h3>D4 – Analýza příčin</h3>
            <div className="output-box">{result.D4}</div>

            <h3>D5 – Trvalá nápravná opatření</h3>
            <div className="output-box">{result.D5}</div>
          </section>
        )}
      </div>
    </main>
  );
}
