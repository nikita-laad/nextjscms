// This function validates form data based on provided validation rules.
export const ValidateRules = (formData: any, validationRules: any) => {
  const errors: any = {};

  for (const field in validationRules) {
    const rules = validationRules[field];

    for (const rule of rules) {
      if (rule.rule === 'required') {
        // Check if the field has square brackets and it is an array
        if (field.includes('[]') && Array.isArray(formData[field]) && formData[field].length === 0) {
            errors[field] = rule.message;
            break;
        }

        // Check for normal "required" condition
        if (!formData[field]) {
            errors[field] = rule.message;
            break;
        }
    } else if (rule.rule === 'min' && formData[field]?.length < parseInt(rule.value)) {
        errors[field] = rule.message;
        break;
      } else if (rule.rule === 'max' && formData[field]?.length > parseInt(rule.value)) {
        errors[field] = rule.message;
        break;
      } else if (rule.rule === 'email' && formData[field] && !validateEmail(formData[field])) {
        errors[field] = rule.message;
        break;
      } else if (rule.rule === 'password' && formData[field]) {
        const passwordValidation = validatePassword(formData[field], rule.min, rule.max);
        if (!passwordValidation.isValid) {
          errors[field] = passwordValidation.errorMessage;
          break;
        }
      } else if (rule.rule === 'match:password' && formData[field] !== formData['password']) {
        errors[field] = rule.message;
        break;
      } else if (rule.rule === 'number' && formData[field] && !validateNumber(formData[field])) {
        errors[field] = rule.message;
        break;
      } else if (rule.rule === 'decimal' && formData[field] && !validateDecimal(formData[field])) {
        errors[field] = rule.message;
        break;
      } else if (rule.rule === 'url' && formData[field] && !validateUrl(formData[field])) {
        errors[field] = rule.message;
        break;
      } else if (rule.rule === 'extension' && formData[field] && !validateFileExtension(formData[field].name, rule.value)) {
        errors[field] = rule.message;
        break;
      } else if (rule.rule === 'fax' && formData[field] && !validateFax(formData[field])) {
        errors[field] = rule.message;
        break;
      }
    }
  }

  return errors;
};

// This function validates if a number is in decimal format.
const validateDecimal = (number: any) => {
  const re = /^\d+(\.\d+)?$/;
  return re.test(number);
};

// This function validates if an email address is in a valid format.
const validateEmail = (email: any) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// This function validates a password based on certain criteria.
const validatePassword = (password: any, minLength: any, maxLength: any) => {
  const rePattern = `^(?=.*\\d)(?=.*[a-zA-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\\[\\]:;<>,.?~\\/-]).{${minLength},}${maxLength > 0 ? `,${maxLength}` : ''}$`;
  const re = new RegExp(rePattern);
  if (password.length < minLength) {
    return {
      isValid: false,
      errorMessage: `Password must be at least ${minLength} characters.`,
    };
  } else if (password.length > maxLength) {
    return {
      isValid: false,
      errorMessage: `Password cannot exceed ${maxLength} characters.`,
    };
  } else if (!re.test(password)) {
    return {
      isValid: false,
      errorMessage: 'Password must include at least one numeric, one alphabetic, one lowercase, and one special character.',
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
};

// This function validates if a string contains only numeric characters.
const validateNumber = (number: any) => {
const re = /^\d+$/;
return re.test(number);
};

// This function validates if a string is a valid URL.
const validateUrl = (url: any) => {
const pattern = /^((http|https)?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(:\d{1,5})?([/?#].*)?$/;
return pattern.test(url);
};

// This function checks if a file name has an allowed extension.
const validateFileExtension = (fileName: any, allowedExtensions: any) => {
const fileExtension = fileName.split('.').pop().toLowerCase();
return allowedExtensions.includes(fileExtension);
};

// This function validates if a string is in a valid fax number format.
const validateFax = (fax: any) => {
const re = /^[+]?[\d\s()-]*$/;
return re.test(fax);
};