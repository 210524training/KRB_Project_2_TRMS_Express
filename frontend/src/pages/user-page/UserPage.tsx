import React, { Dispatch, SetStateAction } from 'react';
import { Button, Navbar, Tab, Tabs } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import MyRequestsTable from '../../components/my-requests-table/MyRequestsTable';
import ReimbursementForm from '../../components/reimbursement-form/ReimbursementForm';
import RequestsTable from '../../components/requests-table/RequestsTable';
import User from '../../models/user';

type Props = {
  currentUser: User | undefined;
  setCurrentUser: Dispatch<SetStateAction<undefined | User>>;
}

const UserPage: React.FC<Props> = ({ currentUser, setCurrentUser }) => {

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
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="create" title="Create New Reimbursement Request">
          <ReimbursementForm currentUser={currentUser} />
        </Tab>
        <Tab eventKey="myrequests" title="My Reimbursement Requests">
          <MyRequestsTable currentUser={currentUser} />
        </Tab>
        <Tab eventKey="inbox" title="Reimbursement Inbox">
          <RequestsTable currentUser={currentUser} />
        </Tab>
      </Tabs>
    </div>
  </>
  )
}

export default UserPage;