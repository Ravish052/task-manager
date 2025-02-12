import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/dbConnect";
import Task from "@/models/Task";

export async function DELETE(req: NextRequest) {
  await connectDB();
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ Extract params from URL
  const id = req.nextUrl.pathname.split("/").pop();

  try {
    const task = await Task.findOneAndDelete({ _id: id, user: session.user.id });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
