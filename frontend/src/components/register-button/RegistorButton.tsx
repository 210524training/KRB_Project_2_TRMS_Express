import React, { Dispatch, SetStateAction } from 'react';
import { Button } from 'react-bootstrap';

type Props = {
  toggleRegister: Dispatch<SetStateAction<boolean>>,
  showRegister: boolean,
}

const RegisterButton: React.FC<Props> = ({ toggleRegister, showRegister }) => {
  return (
    <Button variant="link" onClick={
      () => toggleRegister(!showRegister)
    }>{
      showRegister ? 'Sign In' : 'Register'
      }
      </Button>
  )
}

export default RegisterButton;