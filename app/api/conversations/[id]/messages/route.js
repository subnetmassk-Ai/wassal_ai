import {
  findConversation,
  createId,
} from "../../store";

export async function GET(request, context) {
  const { id } = await context.params;

  const conversation = findConversation(id);

  if (!conversation) {
    return Response.json(
      {
        ok: false,
        error: "Conversation not found",
      },
      { status: 404 }
    );
  }

  return Response.json({
    ok: true,
    messages: conversation.messages,
  });
}

export async function POST(request, context) {
  const { id } = await context.params;

  const conversation = findConversation(id);

  if (!conversation) {
    return Response.json(
      {
        ok: false,
        error: "Conversation not found",
      },
      { status: 404 }
    );
  }

  const body = await request.json();

  const text = String(body.text || "").trim();

  if (!text) {
    return Response.json(
      {
        ok: false,
        error: "Message text is required",
      },
      { status: 400 }
    );
  }

  const message = {
    id: createId("msg"),
    sender: body.sender || "human",
    text,
    type: body.type || "text",
    attachment: body.attachment || null,
    createdAt: new Date().toISOString(),
    read: body.sender !== "customer",
  };

  conversation.messages.push(message);

  if (message.sender === "customer") {
    conversation.unread += 1;
    conversation.status = "open";
  }

  conversation.updatedAt = message.createdAt;

  return Response.json({
    ok: true,
    message,
    conversation,
  });
}
