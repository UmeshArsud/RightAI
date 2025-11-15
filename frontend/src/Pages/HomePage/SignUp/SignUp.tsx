import React from "react";
import { useSignUpForm } from "./useSignUpForm";
import "./SignUp.css"
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const {
    formData,
    errors,
    handleChange,
    handleSubmit
  } = useSignUpForm();
  return (
    <>
      <div className="sign-page">
        <h2 className="heading">Create Account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="name-token">
            <div className="token">
              <label htmlFor="" className="full-name">First Name</label>
              <input 
                type="text"
                name="firstName"
                className="name-input"
                placeholder="first name"
                value={formData.firstName}
                onChange={handleChange} />
                {errors.firstName && (<p className="error-text">{errors.firstName}</p>)}
            </div>
            <div className="token">
              <label htmlFor="" className="full-name">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="name-input"
                placeholder="last name"
                value={formData.lastName}
                onChange={handleChange} />
                {errors.lastName && (<p className="error-text">{errors.lastName}</p>)}
            </div>
          </div>
          <div className="token">
            <label htmlFor="" className="lable">Email</label>
            <input 
              type="text"
              name="email"
              className="input"
              placeholder="email id"
              value={formData.email}
              onChange={handleChange} />
              {errors.email && (<p className="error-text">{errors.email}</p>)}
          </div>
          <div className="token">
            <label htmlFor="" className="lable">Mobile No.</label>
            <input 
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              name="mobile"
              className="input"
              placeholder="mobile no."
              value={formData.mobile}
              onChange={handleChange} />
            {errors.mobile && (<p className="error-text">{errors.mobile}</p>)}
          </div>
          <div className="token">
            <label htmlFor="" className="lable">Create_User_Name</label>
            <input 
              type="text"
              name="username"
              className="input"
              placeholder="username"
              value={formData.username}
              onChange={handleChange} />
              {errors.username && (<p className="error-text">{errors.username}</p>)}
          </div>
          <div className="token">
            <label htmlFor="" className="lable">Password</label>
            <input 
              type="text"
              name="password"
              className="input"
              placeholder="password"
              value={formData.password}
              onChange={handleChange} />
              {errors.password && (<p className="error-text">{errors.password}</p>)}
          </div>
          <div className="token">
            <label htmlFor="" className="lable">Conf Pass</label>
            <input 
              type="text"
              name="confirmPassword"
              className="input"
              placeholder="coferm password"
              value={formData.confirmPassword}
              onChange={handleChange} />
              {errors.confirmPassword && (<p className="error-text">{errors.confirmPassword}</p>)}
          </div>
          <button className="signup-button" type="submit" >Submit</button>
          <Link to="/signin" className="sign-in-bt">Sign In</Link>
          <Link to="/" className="sign-up-back-home" style={{ alignSelf: 'flex-start' }}>Back to Home</Link>
        </form>
      </div>
    </>
  );
};
export default SignUp;
