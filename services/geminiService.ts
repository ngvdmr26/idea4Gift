import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GiftResponse } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize the client
const ai = new GoogleGenAI({ apiKey });

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
            description: "Строка поискового запроса для поиска этого товара на маркетплейсах"
          }
        },
        required: ["title", "description", "estimatedPrice", "reasoning", "searchQuery"]
      }
    }
  }
};

export const generateGiftIdeas = async (description: string, budget: string): Promise<GiftResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const prompt = `
    Мне нужны идеи подарков для человека с таким описанием: "${description}".
    Бюджет: "${budget}".
    
    Предложи 5 уникальных, креативных и строго подходящих идей подарков. 
    Убедись, что они вписываются в бюджет или находятся рядом с ним.
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
        systemInstruction: "Ты — эксперт по подбору подарков. Твой тон — полезный, креативный и точный. Ты специализируешься на поиске продуманных подарков в рамках бюджета. Отвечай всегда на русском языке."
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