import { USERMESSAGES } from '@/helper/message';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const validateUser = async (user: any) => {
    // Perform validation checks here
    const errors = [];
  
    // Check if email is provided and is unique
    if (!user.email || !user.email.trim()) {
      errors.push(USERMESSAGES.EMAILISREQUIRED);
    } else if (!isValidEmail(user.email)) {
      errors.push(USERMESSAGES.INVALIDEMAILFORMAT);
    } else if (await isEmailAlreadyTaken(user.email)) {
      errors.push(USERMESSAGES.EMAILISALREADYINUSE);
    }
  
    // Check if mobile is provided and is unique
    if (!user.mobile || !user.mobile.trim()) {
      errors.push(USERMESSAGES.MOBILEISREQUIRED);
    } else if (!isValidMobile(user.mobile)) {
      errors.push(USERMESSAGES.INVALIDMOBILENUMBER);
    } else if (await isMobileAlreadyTaken(user.mobile)) {
      errors.push(USERMESSAGES.MOBILENUMBERISALREADYINUSE);
    }
  
    if (!user.password || !user.password.trim()) {
      errors.push(USERMESSAGES.PASSWORDISREQUIRED);
    } else if (!isValidPassword(user.password)) {
      errors.push(USERMESSAGES.INVALIDPASSWORDFORMAT);
    }
    return errors;
  };
  
  const isValidEmail = (email: any) => {
    // A simple regex for email validation, adjust as needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const isValidMobile = (mobile: any) => {
    // A simple regex for mobile validation, adjust as needed
    const mobileRegex = /^\d{10}$/; // Assuming a 10-digit mobile number
    return mobileRegex.test(mobile);
  };
  
  const isValidPassword = (password: any) => {
    // Regex for a strong password (minimum 8 characters, with at least one uppercase letter, one lowercase letter, one digit, and one special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  const isEmailAlreadyTaken = async (email: any) => {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return !!existingUser;
  };
  
  const isMobileAlreadyTaken = async (mobile: any) => {
    const existingUser = await prisma.user.findUnique({
      where: {
        mobile: mobile,
      },
    });
    return !!existingUser;
  };
  