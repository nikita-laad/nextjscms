import { STATUSCODE } from "@/helper/constants";
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const authenticate = async(req: NextRequest) => {
    const authorizationHeader = req.headers.get('authorization');
    if(!authorizationHeader){
        return {
            error: 'Unauthorized',
            status: STATUSCODE.HTTPUNAUTHORIZED,
          };
    }
    try {
        const token = authorizationHeader.replace(/^Bearer\s/, '');
        const decoded = jwt.verify(token, 'your-secret-key');
        return {
            message: 'Valid token',
            status: STATUSCODE.HTTPOK,
            user: decoded
        };
            
    } catch (error: any) {
        return{
            error: 'Invalid token',
            status: STATUSCODE.HTTPINTERNALSERVERERROR,
        };   
    }

}