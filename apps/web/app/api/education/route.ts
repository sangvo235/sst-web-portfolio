import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await prisma.education.findMany({
        orderBy: { id: "desc" },
    });

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function POST(req: Request) {
    const formData = await req.formData();

    const imageUrl = formData.get("imageUrl") as string;
    const title = formData.get("title") as string;
    const name = formData.get("name") as string;
    const dateStart = formData.get("dateStart") as string;
    const dateEnd = formData.get("dateEnd") as string | null;
    const content = formData.get("content") as string;

    await prisma.education.create({
        data: {
            imageUrl,
            title,
            name,
            dateStart: new Date(dateStart),
            dateEnd: dateEnd ? new Date(dateEnd) : null,
            content,
        },
    });

  return NextResponse.json({ created: true });
}

// TODO: ERROR HANDLING & SS VALIDATION
