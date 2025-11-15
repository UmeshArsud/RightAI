import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { signUp } from '../SignIn/apiService'; // 👈 --- 1. Import the API function

// (Interfaces are the same)
interface SignUpFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

type FormErrors = {
  [key in keyof SignUpFormData]?: string; 
};

export function useSignUpForm() {
  
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  
  // --- 2. Add loading and API error state ---
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    // (Your validation logic is perfect)
    if (name === 'mobile') {
      const regex = /^[0-9]*$/;
      if (!regex.test(value) || value.length > 10) {
        return;
      }
    }
    if (name === 'username') {
      value = value.replace(/[^a-zA-Z0-9_@]/g, '');
    }
    if (name === 'firstName' || name === 'lastName') {
      value = value.replace(/[^a-zA-Z]/g, '');
    }

    setFormData(prev => ({
      ...prev,
      [name as keyof SignUpFormData]: value
    }));

    // --- 3. Clear errors on change ---
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    // Also clear the main API error when user types
    if (apiError) {
      setApiError(null);
    }
  };

  // --- 4. Make submit function async ---
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // --- 5. Clear old errors ---
    setErrors({});
    setApiError(null);
    
    // (Your validation logic is perfect)
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    let tempErrors: FormErrors = {};
    if (!formData.firstName) tempErrors.firstName = "Full name is required";
    if (!formData.lastName) tempErrors.lastName = "Last name is required";
    if (!formData.username) {
        tempErrors.username = "Username is required";
    } else if (!/^[a-zA-Z@]/.test(formData.username)) {
        tempErrors.username = "Username must start with a letter or @ (not a number or underscore)";
    } else if (!/[a-zA-Z0-9@]$/.test(formData.username)) {
        tempErrors.username = "Username cannot end with an underscore";
    } else if (/__/.test(formData.username)) {
        tempErrors.username = "Underscore cannot be repeated (e.g., user__name)";
    } else if (/[0-9@]_/.test(formData.username) || /_[0-9@]/.test(formData.username)) {
        tempErrors.username = "Underscore must be between letters (e.g., 'user_name' not 'user_1')";
    }
    if (!formData.email) {
        tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        tempErrors.email = "invalid email address";
    }
    if (!formData.mobile) {
        tempErrors.mobile = "Mobile number is required";
    }else if (formData.mobile.length !== 10) {
        tempErrors.mobile = "Mobile number must be exactly 10 digits";
    }
    if (!formData.password) {
        tempErrors.password = "Password is required";
    } else if (!strongPasswordRegex.test(formData.password)) {
        tempErrors.password = "Password must be at least 8 characters long and include one uppercase letter, one number, and one special character.";
    }
    if (!formData.confirmPassword) {
        tempErrors.confirmPassword = "Password is required";
    } else if (formData.password !== formData.confirmPassword) {
        tempErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(tempErrors);

    // --- 6. Call the API if validation passes ---
    if (Object.keys(tempErrors).length === 0) {
      setIsLoading(true); // Start loading

      try {
        // Remove 'confirmPassword' before sending to the backend
        const { confirmPassword, ...apiData } = formData;
        
        // This 'signUp' is from apiService.ts
        const successMessage = await signUp(apiData);

        console.log('Registration Successful!', successMessage);
        alert('Sign up successful! Please log in.');
        
        // TODO: You can navigate to the login page here
        // e.g., navigate('/signin');

      } catch (error: any) {
        // This catches errors from Spring (e.g., "Username is already taken")
        console.error('Registration Failed:', error.message);
        setApiError(error.message); // Show the error to the user
      
      } finally {
        setIsLoading(false); // Stop loading, even if it failed
      }
    }
  };

  // --- 7. Return new state ---
  return {
    formData,
    errors,
    isLoading,  // So your component can show a spinner
    apiError,   // So your component can show server errors
    handleChange,
    handleSubmit
  };
}