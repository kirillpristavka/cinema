import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request
) {
    try {
        //await getCurrentUser();

        const movies = await prisma.movie.findMany();

        return NextResponse.json(movies);
    } catch (error: any) {
        console.log(error);
        return new NextResponse('Error', { status: 400});
    }
}