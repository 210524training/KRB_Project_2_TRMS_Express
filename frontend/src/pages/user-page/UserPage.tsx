import React, { Dispatch, SetStateAction } from 'react';
import { Button, Navbar, Tab, Tabs } from 'react-bootstrap';
import { Switch, useHistory } from 'react-router-dom';
import GetAllRequests from '../../components/get-all-requests/GetAllRequests';
import MyRequestsTable from '../../components/my-requests-table/MyRequestsTable';
import Profile from '../../components/profile/Profile';
import ReimbursementForm from '../../components/reimbursement-form/ReimbursementForm';
import RequestsTable from '../../components/requests-table/RequestsTable';
import Reimbursement from '../../models/reimbursement';
import User from '../../models/user';

type Props = {
  currentUser: User | undefined;
  setCurrentUser: Dispatch<SetStateAction<undefined | User>>;
  setRequest: Dispatch<SetStateAction<undefined | Reimbursement>>;
}

const UserPage: React.FC<Props> = ({ currentUser, setCurrentUser, setRequest }) => {


  const history = useHistory();

  if(!currentUser) {
    history.push('/');
  }

  const handleClick = (): void => {
    setCurrentUser(undefined);
    history.push('/')
  }

  return (
    <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home"><h1>Welcome, </h1></Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="mr-sm-4">
          Signed in as: {`${currentUser?.username}   `}
        </Navbar.Text>
        <Navbar.Text>
          <Button variant="dark" onClick={handleClick}>Logout</Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
    <div className="m-4">
      <Switch>
        <Tabs defaultActiveKey="profile" id="tabs">
          <Tab eventKey="create" title="Create New Reimbursement Request">
            <ReimbursementForm currentUser={currentUser} />
          </Tab>
          <Tab eventKey="myrequests" title="My Reimbursement Requests">
            <MyRequestsTable currentUser={currentUser} setRequest={setRequest} />
          </Tab>
          <Tab eventKey="inbox" title="Reimbursement Inbox">
            <RequestsTable currentUser={currentUser} setRequest={setRequest} />
          </Tab>
          {
          currentUser?.role === "Benefits Coordinator" ? 
          <Tab eventKey="allRequests" title="All Requests">
            <GetAllRequests currentUser={currentUser} setRequest={setRequest} />
          </Tab> : null
          }
          <Tab eventKey="myprofile" title="My Profile">
            <Profile currentUser={currentUser} />
          </Tab>
        </Tabs>
      </Switch>
      
    </div>
  </>
  )
}

export default UserPage;

