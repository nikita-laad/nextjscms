import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest){
        const path = req.nextUrl.pathname
        const isPublicPath = path === '/admin/login'
        if(isPublicPath){
            // return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl))
        }
        if(!isPublicPath){
            // return NextResponse.redirect(new URL('/admin/login', req.nextUrl))
        }
        
}
export const config = {
    matcher: [
        '/admin/login',
        '/admin/dashboard',
        '/admin/users/:path*'
    ]
}