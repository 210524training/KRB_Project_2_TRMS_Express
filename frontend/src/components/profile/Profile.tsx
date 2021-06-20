import React from 'react';
import { Table } from 'react-bootstrap';
import User from '../../models/user';

type Props = {
  currentUser: User | undefined;
}

const Profile: React.FC<Props> = ({ currentUser }) => {
  return (
    <div className="mt-4 container-sm">
      <Table hover size="sm">
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{currentUser?.username}</td>
          </tr>
          <tr>
            <td>Title:</td>
            <td>{currentUser?.role}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{currentUser?.email}</td>
          </tr>
          <tr>
            <td>Remaining Funds:</td>
            <td>${currentUser?.availableAmount}</td>
          </tr>
        </tbody>
      </Table>
    </div>
    
    
  )
}

export default Profile;