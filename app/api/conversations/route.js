import {
  conversations,
  createId,
} from "./store";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const status = searchParams.get("status");
  const channel = searchParams.get("channel");
  const search = searchParams.get("search");

  let result = [...conversations];

  if (status && status !== "all") {
    result = result.filter((item) => item.status === status);
  }

  if (channel && channel !== "all") {
    result = result.filter((item) => item.channel === channel);
  }

  if (search) {
    const q = search.toLowerCase();

    result = result.filter((item) => {
      return (
        item.customer.name.toLowerCase().includes(q) ||
        item.customer.phone.includes(q) ||
        item.messages.some((message) =>
          message.text?.toLowerCase().includes(q)
        )
      );
    });
  }

  result.sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() -
      new Date(a.updatedAt).getTime()
  );

  return Response.json({
    ok: true,
    conversations: result.map(({ messages, ...conversation }) => ({
      ...conversation,
      lastMessage: messages[messages.length - 1] || null,
    })),
    total: result.length,
  });
}

export async function POST(request) {
  try {
    const body = await request.json();

    const now = new Date().toISOString();

    const conversation = {
      id: createId("conv"),
      customer: {
        id: body.customer?.id || createId("customer"),
        name: body.customer?.name || "New Customer",
        phone: body.customer?.phone || "",
        avatar: body.customer?.avatar || "",
      },
      channel: body.channel || "web",
      status: "new",
      assignedTo: "AI",
      unread: 0,
      createdAt: now,
      updatedAt: now,
      messages: [],
    };

    conversations.unshift(conversation);

    return Response.json(
      {
        ok: true,
        conversation,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error.message || "Failed to create conversation",
      },
      { status: 400 }
    );
  }
}
