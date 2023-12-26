import { NextRequest, NextResponse } from "next/server";
import { STATUSCODE } from "@/helper/constants";
import { login } from "../../../../prisma/models/authModel";

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const user = await login(body)
        return NextResponse.json({
            ...user
        })
        
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: STATUSCODE.HTTPINTERNALSERVERERROR
        })
    }
}