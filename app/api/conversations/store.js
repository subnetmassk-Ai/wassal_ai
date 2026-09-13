const globalStore = globalThis;

if (!globalStore.__WASSAL_CONVERSATIONS__) {
  globalStore.__WASSAL_CONVERSATIONS__ = [
    {
      id: "conv-001",

      customer: {
        id: "customer-001",
        name: "Ahmed",
        phone: "+96170123456",
        email: "ahmed@example.com",
        avatar: "",
        notes: "مهتم بخدمات WASSAL AI",
        tags: ["Lead"],
      },

      channel: "whatsapp",

      status: "open",

      assignedTo: "AI",

      priority: "normal",

      unread: 2,

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

      messages: [
        {
          id: "msg-001",
          sender: "customer",
          text: "مرحبا، بدي أعرف كيف فيني استخدم WASSAL AI؟",
          type: "text",
          createdAt: new Date().toISOString(),
          read: false,
        },
        {
          id: "msg-002",
          sender: "ai",
          text: "مرحباً! أكيد، فيني ساعدك. شو الخدمة اللي بدك تستخدمها؟",
          type: "text",
          createdAt: new Date().toISOString(),
          read: true,
        },
      ],
    },
  ];
}

export const conversations = globalStore.__WASSAL_CONVERSATIONS__;

export function findConversation(id) {
  return conversations.find((conversation) => conversation.id === id);
}

export function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}
