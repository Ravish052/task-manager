import { signOut } from "next-auth/react";

export async function POST() {
  await signOut();
  return new Response(JSON.stringify({ message: "Logged out" }), { status: 200 });
}
