import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { sendLogin } from "../../remote/trms.api";
import RegisterButton from "../register-button/RegistorButton";

type Props = {
  toggleRegister: Dispatch<SetStateAction<boolean>>
  showRegister: boolean
}

const SignInForm: React.FC<Props> = ({ toggleRegister, showRegister }) => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(e)
    e.preventDefault();
    const user = await sendLogin(username, password);
    console.log(user)
  }
  
  return (
    <>
    <div>
      <h2>Sign In</h2>
      <Form onSubmit={handleFormSubmit} >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="My Name" onChange={handleUsernameChange} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="My Password" onChange={handlePasswordChange} />
        </Form.Group>
        <Button variant="dark" type="submit">
          Submit
        </Button>
        <RegisterButton showRegister ={showRegister} toggleRegister={toggleRegister} />
      </Form>
    </div>
    </>
  )
}

export default SignInForm;