import React, { Dispatch, SetStateAction, useState } from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import DetailedRequest from "../components/detailed-request/DetailedRequest";
import Reimbursement from "../models/reimbursement";
import User from "../models/user";
import LoginPage from "../pages/login-page/LoginPage";
import UserPage from "../pages/user-page/UserPage";

type Props = {
  currentUser: User | undefined;
  setCurrentUser: Dispatch<SetStateAction<undefined | User>>
}

const AppRoutes: React.FC<Props> = ({ currentUser, setCurrentUser }) => {

  const [request, setRequest] = useState<Reimbursement>()

  return (
    <Switch>
      <Route exact path='/'>
        <LoginPage setCurrentUser={setCurrentUser} currentUser={currentUser} />
      </Route>
      <Route exact path='/workstation'>
        <UserPage setCurrentUser={setCurrentUser} currentUser={currentUser} setRequest={setRequest} />
      </Route>
      <Route exact path='/workstation/:request'>
        <DetailedRequest request={request} currentUser={currentUser} />
      </Route>
      <Route path='/'>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
};

export default AppRoutes;