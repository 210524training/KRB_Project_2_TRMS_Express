import React from 'react';
import { Button, Table } from 'react-bootstrap';
import Reimbursement from '../../models/reimbursement';
import User from '../../models/user';

type Props = {
  request: Reimbursement | undefined;
  currentUser: User | undefined;
}

const DetailedRequest: React.FC<Props> = (request, currentUser) => {

  const populateTable = (request: Reimbursement | undefined) => {
    if(!request) {
      return <h2>No Request Selected</h2>
    }
    const {
      docid,
      urgent,
      submissionDate,
      status,
      employeeName,
      employeeEmail,
      eventType,
      eventDescription,
      eventLocation,
      eventCost,
      eventStartDate,
      eventStartTime,
      gradingFormat,
      finalgrade,
      finalGradeSatisfactory,
      attachments,
    } = request;

    return (
      <>
        <tr>
          <td>Document ID:</td>
          <td>{docid}</td>
        </tr>
        <tr>
          <td>Urgent:</td>
          <td>{(urgent ? 'Yes' : '')}</td>
        </tr>
        <tr>
          <td>Sumbitted On:</td>
          <td>{submissionDate}</td>
        </tr>
        <tr>
          <td>Status:</td>
          <td>{status}</td>
        </tr>
        <tr>
          <td>Name:</td>
          <td>{employeeName}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{employeeEmail}</td>
        </tr>
        <tr>
          <td>Event Type:</td>
          <td>{eventType}</td>
        </tr>
        <tr>
          <td>Description:</td>
          <td>{eventDescription}</td>
        </tr>
        <tr>
          <td>Location:</td>
          <td>{eventLocation}</td>
        </tr>
        <tr>
          <td>Price:</td>
          <td>{eventCost}</td>
        </tr>
        <tr>
          <td>Start:</td>
          <td>{eventStartDate}</td>
        </tr>
        <tr>
          <td>Start Time:</td>
          <td>{eventStartTime}</td>
        </tr>
        <tr>
          <td>Assessed By:</td>
          <td>{`${gradingFormat}`}</td>
        </tr>
        <tr>
          <td>Employee's Final Grade/Results:</td>
          <td>{finalgrade}</td>
        </tr>
        <tr>
          <td>Is Final Assessment Acceptable?:</td>
          <td>{finalGradeSatisfactory ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <td>Attachments:</td>
          <td>{`${attachments}`}</td>
        </tr>
      </>
    )
  }

  const handleOnApprove = () => {
    // send up the chain
  }

  const handleOnReturn = () => {
    // send back down the chain
  }


  return (
    <>
      <div className="mt-4 container-sm">
        <Table hover size="sm">
          <tbody>
            {populateTable(request.request)}
          </tbody>
        </Table>
      </div>
      <div className="mt-2 container">
        <Button variant="dark" size="lg">
          Approve
        </Button>{' '}
        <Button variant="danger" size="lg">
          Return
        </Button>{' '}
      </div>
    </>
  )
}

export default DetailedRequest;