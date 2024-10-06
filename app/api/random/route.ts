import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

import { NextResponse } from "next/server";

export async function GET(
    request: Request
) {
    try {
        await getCurrentUser();

        const movieCount = await prisma.movie.count();
        const randomIndex = Math.floor(Math.random() * movieCount);

        const randomMovies = await prisma.movie.findMany({
            take: 1,
            skip: randomIndex
        });

        return NextResponse.json(randomMovies[0]);
    } catch (error: any) {
        console.log(error);
        return new NextResponse('Error', { status: 400 });
    }
}