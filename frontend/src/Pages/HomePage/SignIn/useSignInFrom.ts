import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 --- 1. IMPORT useNavigate
import { signIn } from './apiService'; 

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const navigate = useNavigate(); // 👈 --- 2. GET the navigate function

  const signInHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setSignInData(prev => ({
      ...prev,
      [name as keyof SignInFormData]: value
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const signInHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setErrors({});
    setApiError(null);

    let tempErrors: FormErrors = {};
    if (!signInData.username) {
        tempErrors.username = "Username is required";
    }
    if (!signInData.password) {
        tempErrors.password = "Password is required";
    }
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      setIsLoading(true);

      try {
        // This 'signIn' is from apiService.ts
        // It will return { token: "...", ... } on success
        const userData = await signIn(signInData.username, signInData.password);
        
        // --- 3. THIS IS THE SUCCESS LOGIC ---
        
        // a. Save the token
        localStorage.setItem('authToken', userData.token); 
        
        // b. Redirect to the dashboard
        navigate('/dashboard'); 
        // ---

      } catch (error: any) {
        // This catches errors from apiService (e.g., "Bad credentials")
        console.error('Login Failed:', error.message);
        setApiError(error.message); // Show the error to the user
      
      } finally {
        setIsLoading(false); // Stop loading, even if it failed
      }
    }
  };

  return {
    signInData,
    errors,
    isLoading,
    apiError,
    signInHandleChange,
    signInHandleSubmit
  };
}


// //prev
// import { useState } from 'react';
// import type { ChangeEvent, FormEvent } from 'react';
// import { useNavigate } from 'react-router-dom'; // 👈 --- 1. IMPORT useNavigate
// import { signIn } from './apiService'; 

// interface SignInFormData {
//   username: string;
//   password: string;
// }

// type FormErrors = {
//   [key in keyof SignInFormData]?: string;
// };

// export function useSignInForm() {
//   const [signInData, setSignInData] = useState<SignInFormData>({
//     username: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [apiError, setApiError] = useState<string | null>(null);
  
//   const navigate = useNavigate(); // 👈 --- 2. GET the navigate function

//   const signInHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
    
//     setSignInData(prev => ({
//       ...prev,
//       [name as keyof SignInFormData]: value
//     }));

//     if (errors[name as keyof FormErrors]) {
//       setErrors(prev => ({ ...prev, [name]: undefined }));
//     }
//   };

//   const signInHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
//     setErrors({});
//     setApiError(null);

//     let tempErrors: FormErrors = {};
//     if (!signInData.username) {
//         tempErrors.username = "Username is required";
//     }
//     if (!signInData.password) {
//         tempErrors.password = "Password is required";
//     }
//     setErrors(tempErrors);

//     if (Object.keys(tempErrors).length === 0) {
//       setIsLoading(true);

//       try {
//         // This 'signIn' is from apiService.ts
//         // It will return { token: "...", ... } on success
//         const userData = await signIn(signInData.username, signInData.password);
        
//         // --- 3. THIS IS THE SUCCESS LOGIC ---
        
//         // a. Save the token
//         localStorage.setItem('authToken', userData.token); 
        
//         // b. Redirect to the dashboard
//         navigate('/dashboard'); 
//         // ---

//       } catch (error: any) {
//         // This catches errors from apiService (e.g., "Bad credentials")
//         console.error('Login Failed:', error.message);
//         setApiError(error.message); // Show the error to the user
      
//       } finally {
//         setIsLoading(false); // Stop loading, even if it failed
//       }
//     }
//   };

//   return {
//     signInData,
//     errors,
//     isLoading,
//     apiError,
//     signInHandleChange,
//     signInHandleSubmit
//   };
// }