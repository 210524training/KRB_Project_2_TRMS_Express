import React, { Dispatch, SetStateAction } from "react";
import { Form, Button } from "react-bootstrap";
import RegisterButton from "../register-button/RegistorButton";

type Props = {
  toggleRegister: Dispatch<SetStateAction<boolean>>
  showRegister: boolean
}

const RegisterForm: React.FC<Props> = ({ toggleRegister, showRegister }) => {
  return (
    <>
      <div>
        <h2>Register</h2>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="My Name" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="username@trms.mail" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="My Password" />
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

export default RegisterForm;