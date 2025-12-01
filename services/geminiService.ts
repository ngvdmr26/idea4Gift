import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GiftResponse } from "../types";

const giftSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    giftIdeas: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "Название подарка"
          },
          description: {
            type: Type.STRING,
            description: "Краткое, цепляющее описание подарка"
          },
          estimatedPrice: {
            type: Type.STRING,
            description: "Примерная цена или диапазон цен (например, '1500 ₽' или '2000-3000 рублей')"
          },
          reasoning: {
            type: Type.STRING,
            description: "Почему это хороший подарок для описанного человека"
          },
          searchQuery: {
            type: Type.STRING,
            description: "Точный поисковый запрос для маркетплейса. Если подарок дорогой (ювелирка, техника), добавь бренды или материалы (например 'золотые серьги 585', 'наушники Sony'), чтобы отсеять дешевые аналоги."
          }
        },
        required: ["title", "description", "estimatedPrice", "reasoning", "searchQuery"]
      }
    }
  }
};

export const generateGiftIdeas = async (description: string, budget: string): Promise<GiftResponse> => {
  // Initialize lazily to avoid top-level crashes if environment isn't ready immediately
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your configuration.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Мне нужны идеи подарков для человека с таким описанием: "${description}".
    Бюджет: "${budget}".
    
    Предложи 5 уникальных, креативных и строго подходящих идей подарков. 
    Убедись, что они вписываются в бюджет или находятся рядом с ним.
    
    ВАЖНО: Для каждого подарка сформируй 'searchQuery', который позволит найти качественный товар, а не дешевую подделку.
    Если бюджет высокий, добавляй слова "premium", "оригинал" или конкретные бренды в поисковый запрос.
    
    Ответ должен быть на русском языке.
    Для поля estimatedPrice используй валюту, которую указал пользователь (или рубли, если не указано).
    Верни ответ в формате JSON, соответствующем схеме.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: giftSchema,
        systemInstruction: "Ты — эксперт по подбору подарков. Твой тон — полезный, креативный и точный. Ты специализируешься на поиске продуманных подарков в рамках бюджета. Ты умеешь формулировать точные поисковые запросы для e-commerce, чтобы находить именно то, что нужно."
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as GiftResponse;
  } catch (error) {
    console.error("Error generating gifts:", error);
    throw error;
  }
};