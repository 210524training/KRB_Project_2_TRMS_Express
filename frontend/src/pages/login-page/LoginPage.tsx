import React, { Dispatch, SetStateAction } from 'react';
import SignInRegisterContainer from '../../components/sign-in-register-container/SignInRegisterContainer';
import User from '../../models/user';

type Props = {
  currentUser: User | undefined;
  setCurrentUser: Dispatch<SetStateAction<undefined | User>>;
}

const LoginPage: React.FC<Props> = ({ currentUser, setCurrentUser }) => {
  return (
    <>
      <SignInRegisterContainer currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </>
  )
}

export default LoginPage;