import { NextRequest, NextResponse } from "next/server";
import { STATUSCODE } from '@/helper/constants';
import { create } from '../../../../prisma/models/userModel'
import { authenticate } from "../../../../prisma/middleware/authenticate";
export async function POST(req: NextRequest) {
    const checkAuth = await authenticate(req);
    try {
      if(checkAuth.status === STATUSCODE.HTTPOK){
        const body = await req.json();
        const createdUser = await create(body);
    
        if (createdUser.errors) {
          return NextResponse.json({
            ...createdUser,
          });
        }
    
        return NextResponse.json({
          ...createdUser,
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
  