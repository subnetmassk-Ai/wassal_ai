import { NextResponse } from "next/server";
import { findConversation } from "../store";

const allowedStatuses = [
  "new",
  "open",
  "pending",
  "human",
  "closed",
];

export async function GET(request, { params }) {
  const { id } = await params;

  const conversation = findConversation(id);

  if (!conversation) {
    return NextResponse.json(
      { error: "Conversation not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    conversation,
  });
}

export async function PATCH(request, { params }) {
  const { id } = await params;

  const conversation = findConversation(id);

  if (!conversation) {
    return NextResponse.json(
      { error: "Conversation not found" },
      { status: 404 }
    );
  }

  const body = await request.json();

  if (
    body.status !== undefined &&
    !allowedStatuses.includes(body.status)
  ) {
    return NextResponse.json(
      {
        error: "Invalid status",
        allowedStatuses,
      },
      { status: 400 }
    );
  }

  if (body.status !== undefined) {
    conversation.status = body.status;
  }

  if (body.assignedTo !== undefined) {
    conversation.assignedTo = body.assignedTo;
  }

  if (body.priority !== undefined) {
    conversation.priority = body.priority;
  }

  if (body.markRead === true) {
    conversation.unread = 0;

    for (const message of conversation.messages) {
      if (message.sender === "customer") {
        message.read = true;
      }
    }
  }

  if (body.customer) {
    conversation.customer = {
      ...conversation.customer,
      ...body.customer,
    };
  }

  conversation.updatedAt = new Date().toISOString();

  return NextResponse.json({
    ok: true,
    conversation,
  });
}
