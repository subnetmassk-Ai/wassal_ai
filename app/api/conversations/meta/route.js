import { NextResponse } from "next/server";

const agents = [
  {
    id: "AI",
    name: "WASSAL AI",
    role: "AI Assistant",
    type: "ai",
    online: true,
  },
  {
    id: "agent-001",
    name: "Ahmad",
    role: "Sales",
    type: "human",
    online: true,
  },
  {
    id: "agent-002",
    name: "Sara",
    role: "Support",
    type: "human",
    online: true,
  },
  {
    id: "agent-003",
    name: "Omar",
    role: "Customer Success",
    type: "human",
    online: false,
  },
];

const quickReplies = [
  {
    id: "welcome",
    title: "Welcome",
    text: "مرحباً! أهلاً وسهلاً فيك. كيف فينا نساعدك اليوم؟",
  },
  {
    id: "followup",
    title: "Follow-up",
    text: "مرحباً، حبيت تابع معك بخصوص طلبك. هل ما زلت بحاجة للمساعدة؟",
  },
  {
    id: "thanks",
    title: "Thank you",
    text: "شكراً لتواصلك معنا. نحن جاهزون دائماً لمساعدتك.",
  },
  {
    id: "human",
    title: "Human agent",
    text: "رح حوّل محادثتك لأحد أعضاء فريقنا ليساعدك بشكل مباشر.",
  },
];

export async function GET() {
  return NextResponse.json({
    agents,
    quickReplies,
    channels: [
      {
        id: "whatsapp",
        name: "WhatsApp",
        icon: "◉",
      },
      {
        id: "instagram",
        name: "Instagram",
        icon: "◎",
      },
      {
        id: "web",
        name: "Web Chat",
        icon: "◌",
      },
    ],
  });
}
