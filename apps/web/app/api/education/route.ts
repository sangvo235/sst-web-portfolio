import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.education.findMany({
    orderBy: { dateEnd: "desc" },
  });

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/register");
  }

  const formData = await req.formData();

  const imageUrl = formData.get("imageUrl");
  const title = formData.get("title");
  const name = formData.get("name");
  const dateStart = formData.get("dateStart");
  const dateEnd = formData.get("dateEnd");
  const content = formData.get("content");

  await prisma.education.create({
    data: {
      imageUrl: imageUrl as string,
      title: title as string,
      name: name as string,
      dateStart: new Date(dateStart as string),
      dateEnd: dateEnd ? new Date(dateEnd as string) : null,
      content: content as string,
    },
  });

  return NextResponse.json({ created: true });
}

// TODO: ERROR HANDLING & SS VALIDATION
