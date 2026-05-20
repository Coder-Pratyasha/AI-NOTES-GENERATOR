import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Message } from "@/models/Message";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { chatId, role, content } = body;

    const message = await Message.create({
      chatId,
      role,
      content,
    });

    return NextResponse.json(message);

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const chatId = searchParams.get("chatId");

    const messages = await Message.find({
      chatId,
    }).sort({
      createdAt: 1,
    });

    return NextResponse.json(messages);

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}