import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Reimbursement from '../../models/reimbursement';
import User from '../../models/user';
import { getUserOwnedRequests } from '../../remote/trms.api';

type Props = {
  currentUser: User | undefined;
}

const RequestsTable: React.FC<Props> = ({ currentUser }) => {

  const [tableData, setTableData] = useState<Reimbursement[]>([]);

  useEffect(() => {
    (async function populateTable(): Promise<void> {
      if(currentUser) {
        const data =  await getUserOwnedRequests(currentUser)
        setTableData(data)
      }
    })();
  },[currentUser])

  const handleClick = (): void => {
    alert("Click")
  }
  
  const tableRows = tableData.map((item: any, index) => (
    <tr key={index} onClick={handleClick}>
      <td>{(item.urgent ? 'Yes' : '')}</td>
      <td>{item.submissionDate}</td>
      <td>{item.employeeName}</td>
      <td>{item.employeeEmail}</td>
      <td>{item.eventType}</td>
      <td>{item.eventDescription}</td>
      <td>{item.eventLocation}</td>
      <td>{item.eventCost}</td>
      <td>{item.eventStartDate}</td>
      <td>{item.eventStartTime}</td>
      <td>{item.gradingFormat}</td>
      <td>{item.comments}</td>
    </tr>
  ))

  return(
    <Table responsive striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Urgent</th>
          <th>Submitted</th>
          <th>Username</th>
          <th>Email</th>
          <th>Event</th>
          <th>Description</th>
          <th>Location</th>
          <th>Cost</th>
          <th>Start Date</th>
          <th>Start Time</th>
          <th>Graded By</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </Table>
  )
}

export default RequestsTable;
