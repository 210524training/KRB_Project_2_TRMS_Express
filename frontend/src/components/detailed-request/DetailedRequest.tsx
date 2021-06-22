import React, { ChangeEvent, useState } from 'react';
import { Button, Col, Form, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Reimbursement, { ReimbursementStatus } from '../../models/reimbursement';
import User from '../../models/user';
import { sendStatusUpdate } from '../../remote/trms.api';

type Props = {
  request: Reimbursement | undefined;
  currentUser: User | undefined;
}

type ReRoute = 'Send to Employee' | 'Send to Direct Supervisor' | 'Send to Department Head' | 'Send to Benefits Coordinator'

const DetailedRequest: React.FC<Props> = ({request, currentUser}) => {

  const [showReroute, setShowReroute] = useState<boolean>(false);
  const [returnMessage, setReturnMessage] = useState<string>('');
  const [grade, setGrade] = useState<string>('');

  const history = useHistory();

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
      comments,
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
          <td>Is Final Assessment Acceptable?</td>
          <td>{finalGradeSatisfactory ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <td>Comments:</td>
          <td>{comments}</td>
        </tr>
        <tr>
          <td>Attachments:</td>
          <td>{`${attachments}`}</td>
        </tr>
      </>
    )
  }

  const handleOnApproveOrReject = (docid: string | undefined, status: ReimbursementStatus | undefined | string) => {

    let newStatus: ReimbursementStatus;

    switch(status) {
      case 'Reject':
        newStatus = 'Reimbursement Rejected';
        break;
      case 'Awaiting Employee':
        newStatus = 'Awaiting Direct Supervisor';
        break;
      case 'Awaiting Direct Supervisor':
        newStatus = 'Direct Supervisor Approval';
        break;
      case 'Awaiting Department Head':
        newStatus = 'Department Head Approval';
        break;
      case 'Awaiting Benefits Coordinator':
        newStatus = 'Pending Reimbursement';
        break;
      case 'Pending Reimbursement':
        newStatus = 'Reimbursement Approved'
        break;
      default:
      throw new Error('Could not update status of request')
    }
    // send up the chain
    sendStatusUpdate(docid, newStatus, returnMessage);
    history.goBack()
  }


  const handleOnReturn = (docid: string | undefined, sendTo: ReRoute | undefined, comments: string) => {
    
    let newStatus: ReimbursementStatus;

    switch(sendTo) {
      case 'Send to Employee':
        newStatus = 'Returned to Employee';
        break;
      case 'Send to Direct Supervisor':
        newStatus = 'Returned to Direct Supervisor';
        break;
      case 'Send to Department Head':
        newStatus = 'Returned to Department Head';
        break;
      case 'Send to Benefits Coordinator':
        newStatus = 'Awaiting Benefits Coordinator';
        break;
      default:
      throw new Error('Could not update status of request')
    }
    // send up the chain
    sendStatusUpdate(docid, newStatus, comments);
    history.goBack()
  }

  const handleReturnMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const message = e.target.value;
    setReturnMessage(message);
  }

  const handleUpdateGradeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const gradeUpdate = e.target.value;
    setGrade(gradeUpdate);
  }

  const handleUpdateGrade = (grade: string, request: Reimbursement | undefined) => {
    // call axios
    history.goBack()
  }

  const goBack = () => {
    history.goBack()
  }

  return (
    <>
    <div className="mt-4 container-sm">
    <Button className="mt-4 container-sm" onClick={() => goBack()}>Go Back</Button>
    </div>
    
      <div className="mt-4 container-sm">
        <Table hover size="sm">
          <tbody>
            {populateTable(request)}
          </tbody>
        </Table>
      </div>

        {
          currentUser?.username === request?.employeeName ?
          (<>
            <div className="mt-2 container">
                <Form.Group controlId="username">
                  <Form.Control type="text" placeholder="Enter Final Grade" onChange={handleUpdateGradeChange} />
                  <Button 
                    className="mt-2"
                    variant="dark" 
                    size="lg" 
                    onClick={() => handleUpdateGrade(grade, request
                    )}>
                    Update Final Grade
                  </Button>{' '}
                </Form.Group>
            </div>
          </> )

          :
          
          (<>
            <div className="mt-2 container">
              <Button variant="dark" 
                size="lg" 
                onClick={() => handleOnApproveOrReject(request?.docid, request?.status
                )}>
                Approve
              </Button>{' '}
            
              <Button 
                variant="danger" 
                size="lg"
                onClick={() => setShowReroute(true)}>
                Return
              </Button>{' '}
            </div>
            
            </>)

          
        }
        {
          (currentUser?.role === 'Benefits Coordinator') ? 
          (<>
          <div className="mt-2 container">
            <Button variant="danger" 
              size="lg" 
              onClick={() => handleOnApproveOrReject(request?.docid, 'Reject'
              )}>
                Reject
            </Button>{' '}
          </div>
          </> )

          : 
          
          <></>
        }

      {
      showReroute ? 
      <div className="mt-4 container">
        <h2 className="mb-2" >Where do you want to return the request to?</h2>

        <Form>
          <Form.Group as={Col} controlId="employeeName">
            <Form.Label>Send a Return Message</Form.Label>
            <Form.Control type="username" placeholder="Enter message here..." required onChange={handleReturnMessageChange} />
          </Form.Group>
        </Form>

        <div className="ml-3">
          <Button 
            className="mb-2" 
            variant="dark" 
            onClick={() => handleOnReturn(request?.docid, 'Send to Employee', returnMessage)}>
            Employee
          </Button> {' '}
        </div>
        
        <div className="ml-3">
          <Button 
            className="mb-2" 
            variant="dark" 
            onClick={() => handleOnReturn(request?.docid, 'Send to Direct Supervisor', returnMessage)}>
            Direct Supervisor
          </Button> {' '}
        </div>

        <div className="ml-3">
          <Button 
            className="mb-2" 
            variant="dark" 
            onClick={() => handleOnReturn(request?.docid, 'Send to Department Head', returnMessage)}>
            Department Head
          </Button> {' '}
        </div>

        <div className="ml-3">
          <Button 
            className="mb-2" 
            variant="dark" 
            onClick={() => handleOnReturn(request?.docid, 'Send to Benefits Coordinator', returnMessage)}>
            Benefits Coordinator
          </Button> {' '}
        </div>

      </div> 
      : 
      <></>
      }
    </>
  )
}

export default DetailedRequest;