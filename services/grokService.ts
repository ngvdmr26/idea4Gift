export async function generateGiftIdeas(userInput: string, apiKey: string) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "xai/grok-2-1212", // актуальный быстрый Grok (бывший 4.1 fast)
        messages: [
          {
            role: "user",
            content: `Сгенерируй 10 идей подарков на основе описания: ${userInput}.
                      Верни JSON массив вида:
                      [
                        { "title": "...", "description": "..." }
                      ]`
          }
        ]
      })
    });

    const data = await response.json();

    const raw = data.choices?.[0]?.message?.content;

    // Попытка парсинга JSON сразу
    try {
      return JSON.parse(raw);
    } catch {
      // Если модель прислала текст вокруг JSON → вырезаем
      const match = raw.match(/\[[\s\S]*\]/);
      return match ? JSON.parse(match[0]) : [];
    }

  } catch (err) {
    console.error("Ошибка Grok API:", err);
    return [];
  }
}
