import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await prisma.experience.findMany({
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

    const imageUrl = formData.get('imageUrl');
    const title = formData.get('title');
    const company = formData.get('company');
    const type = formData.get('type');
    const dateStart = formData.get('dateStart');
    const dateEnd = formData.get('dateEnd');
    const location = formData.get('location');
    const content = formData.get('content');
    const skill = formData.get('skill');

    const skills = typeof skill === 'string'
    ? skill.split(',').map(s => s.trim()).filter(Boolean)
    : [];

    await prisma.experience.create({
        data: {
            imageUrl: imageUrl as string,
            title: title as string,
            company: company as string,
            type: type as string,
            dateStart: new Date(dateStart as string),
            dateEnd: dateEnd ? new Date(dateEnd as string) : null,
            location: location as string,
            content: content as string,
            skills: skills as string[],
        }
    })

  return NextResponse.json({ created: true });
}

// TODO: ERROR HANDLING & SS VALIDATION
