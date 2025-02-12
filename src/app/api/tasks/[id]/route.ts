import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // Ensure correct import path
import connectDB from "@/lib/dbConnect";
import Task from "@/models/Task";

// ✅ PATCH: Update a Task
export async function PATCH(
  req: NextRequest,
  context: { params:Promise< { id: string } >} // ✅ Corrected function signature
) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params; // ✅ Extract params from context
  const { title, description, status, dueDate, priority } = await req.json();

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, user: session.user.id }, // Ensure only the task owner can update
      { title, description, status, dueDate, priority },
      { new: true }
    );

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }// ✅ Correct type definition
) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;// ✅ No need to await

  try {
    const task = await Task.findOneAndDelete({ _id: id, user: session.user.id });

    if (!task) {
      return NextResponse.json({ error: "Task not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}


