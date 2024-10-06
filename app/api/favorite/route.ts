import { without } from "lodash";
import prisma from '@/app/libs/prismadb';
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return null;
        }

        const { movieId } = await request.json();
        
        const existingMovie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if(!existingMovie) {
            throw new Error('Invalid ID');
        }

        const user = await prisma.user.update({
            where: {
                email: currentUser.email as string
            },
            data: {
                favoriteIds: {
                    push: movieId
                }
            }
        });

        return NextResponse.json(user);
    } catch (error: any) {
        console.log(error);
        return new NextResponse('Error', { status: 400 });
    }
}

export async function DELETE(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return null;
        }

        const { movieId } = await request.json();

        const existingMovie = prisma.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if(!existingMovie) {
            throw new Error('Invalid ID');
        }

        const updatedFavoriteIds = without(currentUser?.favoriteIds, movieId);

        const updatedUser = await prisma.user.update({
            where: {
                email: currentUser.email as string
            },
            data: {
                favoriteIds: updatedFavoriteIds
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error: any) {
        console.log(error);
        return new NextResponse('Error', { status: 400 });
    }
}