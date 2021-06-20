import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Reimbursement from '../../models/reimbursement';
import User from '../../models/user';
import { getUserRequests } from '../../remote/trms.api';

type Props = {
  setRequest: Dispatch<SetStateAction<undefined | Reimbursement>>;
  currentUser: User | undefined;
}

const RequestsTable: React.FC<Props> = ({ currentUser, setRequest }) => {

  const [tableData, setTableData] = useState<Reimbursement[]>([]);

  const history = useHistory();

  useEffect(() => {
    (async function populateTable(): Promise<void> {
      if(currentUser) {
        const data =  await getUserRequests(currentUser)
        setTableData(data)
      }
    })();
  },[currentUser])

  const handleClick = (request: any): void => {
    setRequest(request);
    console.log(request)
    history.push(`/workstation/${request.docid}`)
  }
  
  const tableRows = tableData.map((item: any, index) => (
    <tr key={index} onClick={() => handleClick(item)}>
      <td>{(item.urgent ? 'Yes' : '')}</td>
      <td>{item.submissionDate}</td>
      <td>{item.status}</td>
      <td>{item.employeeName}</td>
      <td>{(item.urgent ? 'Yes' : '')}</td>
      <td>{item.submissionDate}</td>
      <td>{item.status}</td>
      <td>{item.employeeName}</td>
      <td>{item.employeeEmail}</td>
      <td>{item.eventType}</td>
      <td>{item.eventDescription}</td>
      <td>{item.eventLocation}</td>
      <td>{item.eventCost}</td>
      <td>{item.eventStartDate}</td>
      <td>{item.eventStartTime}</td>
      <td>{item.gradingFormat}</td>
      <td>{item.finalgrade}</td>
      <td>{item.finalGradeSatisfactory}</td>
      <td>{item.attachments}</td>
    </tr>
  ))

  return(
    <Table responsive striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Urgent</th>
          <th>Submitted</th>
          <th>Status</th>
          <th>Username</th>
          <th>Email</th>
          <th>Event</th>
          <th>Description</th>
          <th>Location</th>
          <th>Cost</th>
          <th>Start</th>
          <th>Time</th>
          <th>Format</th>
          <th>Final</th>
          <th>Satisfactory</th>
          <th>Attached</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </Table>
  )
}

export default RequestsTable;
