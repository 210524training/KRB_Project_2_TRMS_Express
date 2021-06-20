import React, { Dispatch, SetStateAction } from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import User from "../models/user";
import LoginPage from "../pages/login-page/LoginPage";
import UserPage from "../pages/user-page/UserPage";

type Props = {
  currentUser: User | undefined;
  setCurrentUser: Dispatch<SetStateAction<undefined | User>>
}

const AppRoutes: React.FC<Props> = ({ currentUser, setCurrentUser }) => {

  return (
    <Switch>
      <Route exact path='/'>
        <LoginPage setCurrentUser={setCurrentUser} currentUser={currentUser} />
      </Route>
      <Route exact path='/workstation'>
        <UserPage setCurrentUser={setCurrentUser} currentUser={currentUser} />
      </Route>
      <Route path='/'>
        <Redirect to='/' />
      </Route>
    </Switch>
    
    
  );
};

export default AppRoutes;