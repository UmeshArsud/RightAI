import React from "react";
// 1. Make sure the import path is correct
import { useSignInForm } from "./useSignInFrom"; 
import "./SignIn.css"
import { Link } from "react-router-dom";

const SignIn: React.FC = () => {
  const {
    signInData,
    errors,
    // --- 2. Get the new states from the hook ---
    isLoading,
    apiError,
    // ---
    signInHandleChange,
    signInHandleSubmit
  } = useSignInForm();

  return (
    <>
      <div className="sign-in-page">
        <h2 className="sign-in-heading">Log In</h2>
        <form className="sign-in-form" onSubmit={signInHandleSubmit} noValidate>
          
          <div className="sign-in-token">
            <label htmlFor="username" className="sign-in-lable">Username</label>
            <input 
              type="text"
              id="username" // Added for accessibility
              name="username"
              className="input" 
              value={signInData.username}
              onChange={signInHandleChange} 
            />
            {errors.username && (<p className="sign-in-error-text">{errors.username}</p>)}
          </div>

          <div className="sign-in-token">
            <label htmlFor="password" className="sign-in-lable">Password</label>
            <input 
              type="password" // Changed from "text" to "password"
              id="password" // Added for accessibility
              name="password"
              className="input"
              value={signInData.password}
              onChange={signInHandleChange} 
            />
            {errors.password && (<p className="sign-in-error-text">{errors.password}</p>)}
          </div>

          {/* --- 3. Display the API error --- */}
          {/* This will show errors from the server, like "Bad credentials" */}
          {apiError && (
            <p className="sign-in-error-text" style={{ fontWeight: 'bold' }}>
              {apiError}
            </p>
          )}

          {/* --- 4. Update the button --- */}
          <button 
            className="sign-in-button" 
            type="submit" 
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Signing In...' : 'Submit'}
          </button>

          <div className="forget-pass">forget password?</div>
          <Link to="/signup" className="sign-up-bt">Create Account</Link>
          <Link to="/" className="sign-in-back-home" style={{ alignSelf: 'flex-start' }}>Back to Home</Link>
        </form>
      </div>
    </>
  )
}
export default SignIn;