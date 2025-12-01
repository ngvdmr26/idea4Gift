import { GiftResponse } from "./types";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions";

interface OpenRouterMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const callOpenRouter = async (messages: OpenRouterMessage[]): Promise<string> => {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY not configured. Set it in .env.local");
  }

  try {
    const response = await fetch(OPENROUTER_BASE_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.href,
        "X-Title": "Gift Generator"
      },
      body: JSON.stringify({
        model: "grok-2-1212",
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter API call error:", error);
    throw error;
  }
};

export const generateGiftIdeas = async (
  description: string,
  budget: string
): Promise<GiftResponse> => {
  if (!description.trim() || !budget.trim()) {
    throw new Error("Description and budget are required");
  }

  try {
    const systemPrompt = `Ты опытный личный помощник для подбора подарков. Ответь на русском языке. Будь креативен, практичен и позитивен.

Ты должен вернуть валидный JSON массив ровно в таком формате (БЕЗ markdown блоков, только JSON):
[
  {
    "title": "Название подарка",
    "description": "Подробное описание почему этот подарок подойдет",
    "estimatedPrice": "5000-7000 руб",
    "reasoning": "Краткое объяснение логики выбора",
    "searchQuery": "Поисковый запрос для маркетплейса"
  }
]

Верни ровно 3 подарка.`;

    const userPrompt = `Подбери 3 отличных подарка на основе следующей информации:

Описание получателя и повод:
${description}

Бюджет:
${budget}

Требования:
- Каждый подарок должен быть практичным и уместным
- Учти бюджет
- Предложи разнообразные варианты
- Для searchQuery используй именно названия товаров, которые можно найти на маркетплейсах

Верни ТОЛЬКО валидный JSON массив, без какого-либо текста до или после.`;

    const messages: OpenRouterMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ];

    const response = await callOpenRouter(messages);
    
    // Clean response from markdown code blocks if present
    let jsonString = response.trim();
    if (jsonString.startsWith("```json")) {
      jsonString = jsonString.replace(/^```json\n?/, "").replace(/\n?```$/, "");
    } else if (jsonString.startsWith("```")) {
      jsonString = jsonString.replace(/^```\n?/, "").replace(/\n?```$/, "");
    }
    
    const giftIdeas = JSON.parse(jsonString);
    
    if (!Array.isArray(giftIdeas) || giftIdeas.length === 0) {
      throw new Error("Invalid response format from API");
    }

    return { giftIdeas };
  } catch (error) {
    console.error("Error generating gift ideas:", error);
    throw new Error("Failed to generate gift ideas. Please try again.");
  }
};
