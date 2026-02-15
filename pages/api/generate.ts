import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { prompt, apiKey } = req.body;

    if (!prompt || !apiKey) {
        return res.status(400).json({ error: "Missing prompt or API key" });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: `You are a vector drawing assistant.
                                    You will receive a prompt and you must generate a drawing composed of vector strokes.
                                    Output ONLY valid JSON.
                                    The JSON format must be:
                                    {
                                    "strokes": [
                                        {
                                        "color": "#000000",
                                        "points": [[x, y], [x, y], ...]
                                        }
                                    ]
                                    }
                                    Rules:
                                    1. The canvas is roughly 500x500.
                                    1. The canvas is roughly 500x500.
                                    2. Coordinates must be between 0 and 500.
                                    3. DRAW HIGH QUALITY, ARTISTIC, AND DETAILED LINE ART.
                                    4. PAY CLOSE ATTENTION TO COLORS requested in the prompt. Use specific hex codes for requested colors (e.g., #FF0000 for red).
                                    5. If no color is specified, use black (#000000).
                                    6. Create recognized, complete objects with MULTIPLE strokes (at least 10+).
                                    7. Avoid simple, single-line abstract scribbles. Make it look like a skilled artist drew it.
                                    8. Keep "points" arrays moderately dense for smooth curves.
                                    9. Output ONLY valid JSON.`,
                    },
                    {
                        role: "user",
                        content: `Draw this: ${prompt}`,
                    },
                ],
                temperature: 0.7,
                max_tokens: 4000,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            return res.status(response.status).json({ error: error.error?.message || "OpenAI API error" });
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        // Clean up content if it contains markdown code blocks
        const cleanedContent = content.replace(/```json/g, "").replace(/```/g, "").trim();

        const json = JSON.parse(cleanedContent);
        return res.status(200).json(json);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
