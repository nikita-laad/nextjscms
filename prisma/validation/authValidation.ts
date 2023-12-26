import { USERMESSAGES } from '@/helper/message';
export const authLoginValidation = async (user: any) => {
    // Perform validation checks here
    const errors = [];
  
    // Check if email is provided and is unique
    if (!user.email || !user.email.trim()) {
      errors.push(USERMESSAGES.EMAILISREQUIRED);
    } else if (!isValidEmail(user.email)) {
      errors.push(USERMESSAGES.INVALIDEMAILFORMAT);
    }
  
  
    if (!user.password || !user.password.trim()) {
      errors.push(USERMESSAGES.PASSWORDISREQUIRED);
    } 
    return errors;
  };
  
  const isValidEmail = (email: any) => {
    // A simple regex for email validation, adjust as needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

 
  