import { GoogleGenAI } from "@google/genai";
import { Animal, Crop } from './types';

// FIX: The API key must be obtained from `process.env.API_KEY` as per the coding guidelines.
// This resolves the TypeScript error "Property 'env' does not exist on type 'ImportMeta'".
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("API_KEY is not set. AI features will not work. Please set it in your environment variables.");
}

const generatePrompt = (animals: Animal[], crops: Crop[]): string => {
  let prompt = `
أنت مستشار زراعي خبير للمزارعين الأفراد. بناءً على بيانات المزرعة التالية، قدم توصيات عملية وقابلة للتنفيذ باللغة العربية الفصحى والمبسطة. اجعل التوصيات واضحة ومقسمة حسب كل حيوان أو محصول.

**بيانات المزرعة الحالية:**

`;

  if (animals.length > 0) {
    prompt += "**الحيوانات:**\n";
    animals.forEach(a => {
      prompt += `- **${a.name} (${a.type} - ${a.class || 'غير مصنف'})**: الدور: ${a.role}, الصحة: ${a.healthStatus}, الإنتاج اليومي: ${a.dailyOutput}. ملاحظات: ${a.notes || 'لا يوجد'}\n`;
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
  if (!ai) {
    // FIX: Updated the user-facing error message to be more generic and not expose implementation details like environment variable names.
    return Promise.resolve("عذراً، خدمة التوصيات الذكية غير متاحة حالياً. يرجى التأكد من أن مفتاح API الخاص بالخدمة قد تم إعداده بشكل صحيح.");
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
