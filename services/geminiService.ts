

import { GoogleGenAI } from "@google/genai";
// FIX: Corrected import path for types.
import { Animal, Crop } from './types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const generatePrompt = (animals: Animal[], crops: Crop[]): string => {
  let prompt = `
أنت مستشار زراعي خبير للمزارعين الأفراد. بناءً على بيانات المزرعة التالية، قدم توصيات عملية وقابلة للتنفيذ باللغة العربية الفصحى والمبسطة. اجعل التوصيات واضحة ومقسمة حسب كل حيوان أو محصول.

**بيانات المزرعة الحالية:**

`;

  if (animals.length > 0) {
    prompt += "**الحيوانات:**\n";
    animals.forEach(a => {
      prompt += `- **${a.name} (${a.type})**: الدور: ${a.role}, الصحة: ${a.healthStatus}, الإنتاج اليومي: ${a.dailyOutput}. ملاحظات: ${a.notes || 'لا يوجد'}\n`;
    });
  }

  if (crops.length > 0) {
    prompt += "\n**المحاصيل:**\n";
    crops.forEach(c => {
      prompt += `- **${c.name} (${c.type})**: المرحلة: ${c.stage}. ملاحظات: ${c.notes || 'لا يوجد'}\n`;
    });
  }

  prompt += `
**المطلوب:**

1.  **توصيات للحيوانات:**
    *   لكل حيوان حالته الصحية ليست "صحة جيدة"، قدم نصائح محددة حول التغذية والرعاية الطارئة.
    *   قدم توصيات عامة للحيوانات السليمة بشأن التحصينات الوقائية، أفضل أوقات التكاثر، وتحسين الإنتاج.

2.  **توصيات للمحاصيل:**
    *   لكل محصول، قدم نصائح حول الري، والتسميد، ومكافحة الآفات المناسبة لمرحلته الحالية.
    *   اقترح بوضوح المرحلة التالية المتوقعة في دورة حياة المحصول وتوقيتها التقريبي (مثال: "الطماطم ستكون جاهزة للحصاد خلال 7-10 أيام").

قدم الإجابة بتنسيق Markdown مع استخدام العناوين والنقاط لتسهيل القراءة. ابدأ بعنوان "توصيات الراعي الذكي".
`;

  return prompt;
};

export const getFarmRecommendations = async (animals: Animal[], crops: Crop[]): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("عذراً، خدمة التوصيات الذكية غير متاحة حالياً. يرجى التأكد من إعداد مفتاح API.");
  }
  
  try {
    const prompt = generatePrompt(animals, crops);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching recommendations from Gemini API:", error);
    return "حدث خطأ أثناء الحصول على التوصيات. يرجى المحاولة مرة أخرى لاحقاً.";
  }
};
