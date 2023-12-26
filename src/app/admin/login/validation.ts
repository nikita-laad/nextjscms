import { ValidateRules } from "@/validation-rules/ValidateRules";

const Validation = (formData: any) => {
    const ValidationRules = {
     password: [
       { rule: 'required', message: 'Password is required' }
     ],
       email: [
         { rule: 'required', message: 'Email is required' },
       ],
     };
    const  errors=  ValidateRules(formData, ValidationRules);
    return errors
}
export default Validation