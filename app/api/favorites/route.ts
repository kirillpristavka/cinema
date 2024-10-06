import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();

        const favoriteMovies = await prisma.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds
                }
            }
        });
        
        return NextResponse.json(favoriteMovies);
    } catch (error: any) {
        console.log(error);
        return new NextResponse('Error', { status: 400 });
    }
}