// lib/sentiment.ts

export async function analyzeSentiment(text: string): Promise<number> {
  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment-latest/pipeline/text-classification",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: text }),
      },
    );

    if (!response.ok) {
      console.error(
        "Hugging Face API error:",
        response.status,
        await response.text(),
      );
      return 0;
    }

    const result = await response.json();

    // result = [[{label:"positive",score},{label:"neutral",score},{label:"negative",score}]]
    const scores = result?.[0];
    if (!Array.isArray(scores)) return 0;

    const posScore =
      scores.find((s: any) => s.label === "positive")?.score ?? 0;
    const negScore =
      scores.find((s: any) => s.label === "negative")?.score ?? 0;

    return posScore - negScore; // ~ -1 (very negative) to 1 (very positive)
  } catch (error) {
    console.error("Sentiment analysis failed:", error);
    return 0;
  }
}
