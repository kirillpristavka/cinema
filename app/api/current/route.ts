import getCurrentUser from "@/app/actions/getCurrentUser";

import { NextResponse } from "next/server";

export async function GET(
    request: Request
) {
    try {
        const currenUser = await getCurrentUser();

        return NextResponse.json(currenUser);
    } catch (error: any) {
        console.log(error);
        return new NextResponse('Error', { status: 400 });
    }
}