import { NextRequest, NextResponse } from "next/server";
import { getList } from "../../../../../prisma/models/userModel";
import { STATUSCODE } from "@/helper/constants";
import { authenticate } from "../../../../../prisma/middleware/authenticate";

export async function POST(req: NextRequest) {
  const checkAuth = await authenticate(req);

    try {
      if(checkAuth.status === STATUSCODE.HTTPOK){
        const body = await req.json();
        const { page, perPage, sortBy, sortOrder, search, status } = body;
  
        const usersData = await getList({
          page: parseInt(page),
          perPage: parseInt(perPage),
          sortBy,
          sortOrder,
          search,
          status
        });
    
        return NextResponse.json({
          ...usersData,
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