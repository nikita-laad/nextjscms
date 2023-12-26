import { PrismaClient } from '@prisma/client';
import { validateUser } from '../validation/userValidations';
import { STATUSCODE } from '../../src/helper/constants';
import { USERMESSAGES } from '@/helper/message';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
// Get User List
export const getList = async ({page = 1, perPage = 8, sortBy = 'id', sortOrder = 'desc', search = '', status = null }: any) => {
  try {
      const skip = (page - 1) * perPage;
  
        // Define case-insensitive search condition if a search term is provided
        const searchCondition: any = search ? {
            OR: [
                { name: { contains: search } },
                { email: { contains: search } },
                { mobile: { contains: search } },
            ],
        } : {};
  
         // Add status to the search condition if it is provided and valid
        if (status !== null && (status === 0 || status === 1)) {
            searchCondition.status= status;
        }
  
        // Check if sortBy and sortOrder are provided; otherwise, use default sorting
        const orderBy: any = sortBy && sortOrder ? { [sortBy]: sortOrder.toLowerCase() } : { id: 'desc' };
  
        const users = await prisma.user.findMany({
            where: searchCondition,
            orderBy,
            skip,
            take: perPage,
            select: {
                id: true,
                name: true,
                email: true,
                mobile: true,
                status: true
            },
        });
  
        const totalUsersCount = await prisma.user.count({
            where: searchCondition,
        });
  
        return {
            data: users,
            total: totalUsersCount,
            page,
            perPage,
            status: STATUSCODE.HTTPNOTFOUND,
            message: USERMESSAGES.USERRECEIVEDSUCCESSFULLY,

        };
    } catch (error: any) {
      throw new Error(`Error while fetching data: ${error.message}`);
    }
};

export const create = async(body: any) => {
  console.log(body,':validationErrorsvalidationErrors::::::::')

    try {
        const validationErrors = await validateUser(body)
        if(validationErrors.length>0){
            return {
                errors: validationErrors,
                status: STATUSCODE.HTTPVALIDATE,
            };
        }
        console.log(validationErrors, 'createcreate')
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const user = await prisma.user.create({
          data: {
            ...body,
            password: hashedPassword,
          },
        });
  

        return {
            message: USERMESSAGES.USERCREATEDSUCCESSFULLY,
            user,
            status: STATUSCODE.HTTPCREATED,
        };
        
    } catch (error: any) {
        throw new Error(`Error while fetching data: ${error.message}`);
    }
}

export const details = async (id: any) => {
    try {
      const userId = parseInt(id, 10);
      if (isNaN(userId)) {
          return{
              error: USERMESSAGES.INVALIDUSERID,
              status: STATUSCODE.HTTPBADREQUEST,
          };
      }
      
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        return {
          error: USERMESSAGES.USERNOTFOUND,
          status: STATUSCODE.HTTPNOTFOUND,
        };
      }
  
      return {
        user,
        message: USERMESSAGES.USERRECEIVEDSUCCESSFULLY,
        status: STATUSCODE.HTTPOK,
      };
    } catch (error: any) {
      return {
        error: error.message,
        status: STATUSCODE.HTTPINTERNALSERVERERROR,
      };
    }
};

export const update = async (id: any, body: any) => {
  try {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      return {
        status: STATUSCODE.HTTPBADREQUEST,
        message: USERMESSAGES.INVALIDUSERID,
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        message: USERMESSAGES.USERNOTFOUND,
        status: STATUSCODE.HTTPNOTFOUND,
      };
    }

    // Validate password only if it is provided in the update
    
      const validationErrors = await validateUser({ ...body, id: userId });
      if (validationErrors.length > 0) {
        return {
          errors: validationErrors,
          status: STATUSCODE.HTTPVALIDATE,
        };
      }
      if (body.password) {
          // Hash the password before storing it in the database
          const hashedPassword = await bcrypt.hash(body.password, 10);
          body.password = hashedPassword;
      }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { ...body },
    });

    return {
      message: USERMESSAGES.USERUPDATEDSUCCESSFULLY,
      updatedUser,
      status: STATUSCODE.HTTPOK,
    };
  } catch (error: any) {
    throw new Error(`Error while fetching data: ${error.message}`);
  }
};

export const deleteUser = async(id: any) => {
  try {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
        return{
            error: 'Invalid user ID',
            status: STATUSCODE.HTTPBADREQUEST,
        };
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        error: 'User not found',
        status: STATUSCODE.HTTPNOTFOUND,
      };
    }
    await prisma.user.delete({
      where: { id: userId },
    });


    return {
      message: 'User deleted successfully',
      status: STATUSCODE.HTTPOK,
    };
  } catch (error: any) {
    return {
      error: error.message,
      status: STATUSCODE.HTTPINTERNALSERVERERROR,
    };
  }
};