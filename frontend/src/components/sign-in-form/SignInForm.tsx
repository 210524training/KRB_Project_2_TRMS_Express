import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import User from "../../models/user";
import { sendLogin } from "../../remote/trms.api";
import RegisterButton from "../register-button/RegistorButton";

type Props = {
  currentUser: User | undefined;
  toggleRegister: Dispatch<SetStateAction<boolean>>
  showRegister: boolean
  setCurrentUser: Dispatch<SetStateAction<undefined | User>>
}

const SignInForm: React.FC<Props> = ({ currentUser, toggleRegister, showRegister, setCurrentUser }) => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const history = useHistory();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await sendLogin(username, password);
    setCurrentUser(user);
    history.push('/workstation')
  }
  
  return (
    <>
    <div>
      <h2>Sign In</h2>
      <Form onSubmit={handleFormSubmit} >
        <Form.Group controlId="username">
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