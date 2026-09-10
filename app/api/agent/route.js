import { executeTool } from "@/lib/agent-tools";

function arabicNumbers(text) {
  const arabic = "٠١٢٣٤٥٦٧٨٩";
  const persian = "۰۱۲۳۴۵۶۷۸۹";

  return String(text)
    .replace(/[٠-٩]/g, ch => arabic.indexOf(ch))
    .replace(/[۰-۹]/g, ch => persian.indexOf(ch));
}

function normalizeCalculation(text) {
  let value = arabicNumbers(text)
    .toLowerCase()
    .trim();

  value = value
    .replace(/،/g, ".")
    .replace(/,/g, ".")
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/اضرب/g, "*")
    .replace(/ضرب/g, "*")
    .replace(/في/g, "*")
    .replace(/زائد/g, "+")
    .replace(/جمع/g, "+")
    .replace(/ناقص/g, "-")
    .replace(/طرح/g, "-")
    .replace(/تقسيم/g, "/")
    .replace(/على/g, "/")
    .replace(/احسب لي/g, "")
    .replace(/احسب/g, "")
    .replace(/كم يساوي/g, "")
    .replace(/يساوي/g, "")
    .trim();

  return value;
}

function isCalculation(text) {
  const value = normalizeCalculation(text);

  if (!/[0-9]/.test(value)) return false;

  return /^[0-9+\-*/().%\s]+$/.test(value);
}

function detectIntent(text) {
  const value = String(text || "").trim();
  const lower = value.toLowerCase();

  if (isCalculation(value)) {
    return {
      tool: "calculator",
      input: normalizeCalculation(value),
    };
  }

  if (
    /الساعة|كم الساعة|الوقت|time|what time/i.test(value)
  ) {
    return {
      tool: "time",
      input: "",
    };
  }

  if (
    /مهمة|تذكير|ذكرني|اعمل task|create task/i.test(value)
  ) {
    return {
      tool: "task",
      input: value,
    };
  }

  const urlMatch = value.match(
    /(https?:\/\/[^\s]+|www\.[^\s]+|google\.com|youtube\.com|facebook\.com|instagram\.com)/
  );

  if (
    urlMatch ||
    /افتح|فتح صفحة|افتح صفحة|الموقع|صفحة الانترنت|صفحة الإنترنت|open|website/i.test(lower)
  ) {
    let url = urlMatch?.[1] || "";

    if (!url) {
      if (/يوتيوب|youtube/i.test(value)) {
        url = "https://www.youtube.com";
      } else if (/فيسبوك|facebook/i.test(value)) {
        url = "https://www.facebook.com";
      } else if (/انستغرام|instagram/i.test(value)) {
        url = "https://www.instagram.com";
      } else if (/غوغل|جوجل|google/i.test(value)) {
        url = "https://www.google.com";
      }
    }

    if (url) {
      return {
        tool: "open_url",
        input: url,
      };
    }
  }

  return null;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const text = String(body?.message || body?.input || "").trim();

    if (!text) {
      return Response.json(
        {
          success: false,
          error: "اكتب طلبًا أولًا.",
        },
        { status: 400 }
      );
    }

    const intent = detectIntent(text);

    if (!intent) {
      return Response.json({
        success: true,
        handled: false,
        reply:
          "🤖 فهمت طلبك، لكن هذه المهمة تحتاج إلى ربط WASSAL AI بمحرك الذكاء الاصطناعي والأدوات الخارجية حتى أستطيع تنفيذها فعليًا.",
      });
    }

    const result = await executeTool(intent.tool, intent.input);

    if (intent.tool === "calculator") {
      return Response.json({
        success: true,
        handled: true,
        tool: intent.tool,
        result,
        reply: `🧮 النتيجة: ${result}`,
      });
    }

    if (intent.tool === "time") {
      return Response.json({
        success: true,
        handled: true,
        tool: intent.tool,
        result,
        reply: `🕐 الوقت الآن: ${new Date(result).toLocaleString("ar-LB")}`,
      });
    }

    if (intent.tool === "task") {
      return Response.json({
        success: true,
        handled: true,
        tool: intent.tool,
        result,
        reply: `✅ تم إنشاء المهمة: ${result.task}`,
      });
    }

    if (intent.tool === "open_url") {
      return Response.json({
        success: true,
        handled: true,
        tool: intent.tool,
        result,
        reply: `🌐 جهزت لك الصفحة: ${result.url}`,
      });
    }

    return Response.json({
      success: true,
      handled: true,
      tool: intent.tool,
      result,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error?.message || "حدث خطأ في WASSAL AI.",
      },
      { status: 400 }
    );
  }
}
