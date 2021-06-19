import React, { useState } from 'react';
import RegisterForm from '../register-form/RegisterForm';
import SignInForm from '../sign-in-form/SignInForm';

type Props = {
}

const SignInRegisterContainer: React.FC<Props>  = () => {

  const [showRegister, toggleRegister] = useState(false)

  return (
    <>
      <div className="container col-md-4">
        {
        showRegister ? 
        <RegisterForm showRegister ={showRegister} toggleRegister={toggleRegister} /> : 
        <SignInForm showRegister ={showRegister} toggleRegister={toggleRegister} />
        }
      </div>
    </>
  )
}

export default SignInRegisterContainer;