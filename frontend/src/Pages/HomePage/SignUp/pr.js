import { useState } from 'react';

// This is a "custom hook". It's just a function that uses other hooks.
// We pass in the logic we want to run on a successful submit.
export function useSignUpForm() {
  
  // All the state logic is moved here
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  // The change handler is moved here
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // The validation and submit logic is moved here
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = "Full name is required";
    if (!formData.username) tempErrors.username = "Username is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email address is invalid";
    }
    if (!formData.mobile) tempErrors.mobile = "Mobile number is required";
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      // Logic for successful submission
      console.log('Form data submitted from the hook:', formData);
      alert('Sign up successful!');
    }
  };

  // We return everything the component needs to *display* the form
  return {
    formData,
    errors,
    handleChange,
    handleSubmit
  };
}