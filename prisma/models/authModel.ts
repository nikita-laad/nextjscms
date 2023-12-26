import { STATUSCODE } from "@/helper/constants";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authLoginValidation } from "../validation/authValidation";


export const login = async(body: any) => {
    try {
        const validationErrors = await authLoginValidation(body);
        if(validationErrors.length > 0){
            return{
                errors: validationErrors,
                status: STATUSCODE.HTTPVALIDATE
            }
        }
        const {email, password} = body;
        const user = await prisma.user.findUnique({
            where: {email}
        })
        if(!user){
            return{
                error: 'Invalid credentials',
                status: STATUSCODE.HTTPNOTFOUND
            }
        }
        const passwordMath = await bcrypt.compare(password, user.password);
        if(!passwordMath){
            return{
                error: 'Invalid credentials',
                status: STATUSCODE.HTTPNOTFOUND
            }
        }
        const token = jwt.sign({ id: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

        const userDetails = {
            name: user.name,
            email: user.email,
            mobile: user.mobile
        }
        return{
            message: 'User login successfully',
            status: STATUSCODE.HTTPOK,
            token,
            userDetails
        }
    } catch (error: any) {
        throw new Error(`Error while fetching data: ${error.message}`);
    }

}