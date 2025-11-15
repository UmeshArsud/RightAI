import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { signIn } from './apiService'; // 👈 --- 1. IMPORT the API function

interface SignInFormData {
  username: string;
  password: string;
}

type FormErrors = {
  [key in keyof SignInFormData]?: string;
};

export function useSignInForm() {
  const [signInData, setSignInData] = useState<SignInFormData>({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  
  // --- 2. ADD new state for loading and server errors ---
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const signInHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setSignInData(prev => ({
      ...prev,
      [name as keyof SignInFormData]: value
    }));

    // Clear validation error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // --- 3. MAKE the submit function async ---
  const signInHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear old errors
    setErrors({});
    setApiError(null);

    // --- Client-side validation ---
    let tempErrors: FormErrors = {};
    if (!signInData.username) {
        tempErrors.username = "Username is required";
    }
    if (!signInData.password) {
        tempErrors.password = "Password is required";
    }
    setErrors(tempErrors);

    // --- 4. IF validation passes, call the API ---
    if (Object.keys(tempErrors).length === 0) {
      setIsLoading(true); // Start loading

      try {
        // This 'signIn' is from apiService.ts
        const userData = await signIn(signInData.username, signInData.password);
        
        console.log('Login Successful!', userData);
        alert('Sign in successful!');
        
        // TODO: Save the token and update auth context
        // Example: localStorage.setItem('userToken', userData.token);
        
        // Optionally reset form
        setSignInData({ username: '', password: '' });

      } catch (error: any) {
        // This catches errors from the API (e.g., "Bad credentials")
        console.error('Login Failed:', error.message);
        setApiError(error.message); // Show the error to the user
      
      } finally {
        setIsLoading(false); // Stop loading, even if it failed
      }
    }
  };

  // --- 5. RETURN the new state values ---
  return {
    signInData,
    errors,
    isLoading,   // So your component can show a spinner
    apiError,    // So your component can show the server error
    signInHandleChange,
    signInHandleSubmit
  };
}