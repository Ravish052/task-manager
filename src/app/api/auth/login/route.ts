import { signIn } from "next-auth/react";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    const res = await signIn("credentials", { email, password, redirect: false });
    console.log("API response",res)
    if (res?.error) throw new Error(res.error);
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "An unknown error occurred" }),
      { status: 401 }
    );
  }
  
}
