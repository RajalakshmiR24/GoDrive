// validation.js

// Validate password and confirm password
export const validatePassword = (password, confirmPassword) => {
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (password !== confirmPassword) {
    return { isValid: false, message: "Passwords do not match" };
  }

  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      message:
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character",
    };
  }

  return { isValid: true, message: "" };
};

// Define validation rules for other fields if needed
export const validationSchema = {
  name: {
    required: "Name is required",
    maxLength: { value: 50, message: "Name must be less than 50 characters" },
  },
  phoneNumber: {
    required: "Phone number is required",
    pattern: { value: /^[0-9]{10}$/, message: "Phone number must be 10 digits" },
  },
  address: {
    required: "Address is required",
    maxLength: { value: 100, message: "Address must be less than 100 characters" },
  },
  vehicle: {
    required: "Vehicle is required",
    maxLength: { value: 50, message: "Vehicle must be less than 50 characters" },
  },
  licensePlate: {
    required: "License plate is required",
    pattern: { value: /^[A-Z0-9]{1,7}$/, message: "License plate is invalid" },
  },
  bankAccount: {
    required: "Bank account is required",
    pattern: { value: /^[0-9]{8,20}$/, message: "Bank account must be between 8 and 20 digits" },
  },
  taxInfo: {
    required: "Tax info is required",
    maxLength: { value: 50, message: "Tax info must be less than 50 characters" },
  },
};
