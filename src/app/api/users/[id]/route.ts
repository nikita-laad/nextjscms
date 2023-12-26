import { NextRequest, NextResponse } from "next/server";
import { deleteUser, details, update } from "../../../../../prisma/models/userModel";
import { STATUSCODE } from "@/helper/constants";
import { authenticate } from "../../../../../prisma/middleware/authenticate";

export async function GET(req: NextRequest, {params}:any){
    const checkAuth = await authenticate(req);
    try {
        if(checkAuth.status === STATUSCODE.HTTPOK){
        
            const user = await details(params.id);
        
            return NextResponse.json({
                ...user
            });
        }
        return NextResponse.json({
            ...checkAuth
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: STATUSCODE.HTTPINTERNALSERVERERROR,
        });
    }
}


export async function PUT(req: NextRequest, {params}:any){
    const checkAuth = await authenticate(req);
    try {
        if(checkAuth.status === STATUSCODE.HTTPOK){
            const body = await req.json();
            const user = await update(params.id, body);
        
            return NextResponse.json({
                ...user,
            });
        }
        return NextResponse.json({
            ...checkAuth,
        });
        
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: STATUSCODE.HTTPINTERNALSERVERERROR,
        });
    }
}

export async function DELETE(req: NextRequest, {params}:any){
    const checkAuth = await authenticate(req);

    try {
        if(checkAuth.status === STATUSCODE.HTTPOK){
 
            const user = await deleteUser(params.id);
            return NextResponse.json({
                ...user
            });
        }
        return NextResponse.json({
            ...checkAuth,
        });
        
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: STATUSCODE.HTTPINTERNALSERVERERROR,
        });
    }
}