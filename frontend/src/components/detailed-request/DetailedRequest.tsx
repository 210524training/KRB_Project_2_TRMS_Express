import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Col, Form, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Reimbursement from '../../models/reimbursement';
import User from '../../models/user';
import { sendDeleteRequest, sendRefund, sendStatusUpdate, sendUpdateAmount, sendUpdateFinalGrade } from '../../remote/trms.api';

type Props = {
  request: Reimbursement | undefined;
  currentUser: User | undefined;
}

type ReRoute = 'Send to Employee' | 'Send to Direct Supervisor' | 'Send to Department Head' | 'Send to Benefits Coordinator'

const DetailedRequest: React.FC<Props> = ({request, currentUser}) => {

  const [showReroute, setShowReroute] = useState<boolean>(false);
  const [returnMessage, setReturnMessage] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

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
      finalGrade,
      finalGradeSatisfactory,
      attachments,
      comments,
      exceedingFunds,
      projectedAmount,
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
          <td>{finalGrade}</td>
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
          <td>Amount to Fund:</td>
          <td>{`$${projectedAmount}`}</td>
        </tr>
        <tr>
          <td>Funds Exceeded:</td>
          <td>{exceedingFunds ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <td>Attachments:</td>
          <td><iframe title='file' src={`${attachments}`}/>{attachments}</td>
        </tr>
      </>
    )
  }

  const sendReimbursementToUser = async (request: Reimbursement | undefined): Promise<void> => {
    const user = request?.employeeName;
    const refund = request?.projectedAmount;
    await sendRefund(user, refund);
  }

  const handleOnApproveOrReject = (docid: string | undefined, status: undefined | string, request: Reimbursement | undefined) => {

    let newStatus: string;

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
        // check if grade was submitted 
        // if true call refund method, set status to approved
        // else Pending
        console.log(request?.finalGrade)
        if(!request?.finalGrade) {
          newStatus = 'Awaiting Benefits Coordinator';
        } else {
          sendReimbursementToUser(request);
          newStatus = 'Reimbursement Approved'
        }
        break;
      case 'Pending Reimbursement':
        if(!request?.finalGrade) {
          newStatus = 'Awaiting Benefits Coordinator';
        } else {
          sendReimbursementToUser(request);
          newStatus = 'Reimbursement Approved'
        }
        break;
      default:
      throw new Error('Could not update status of request')
    }
    // send up the chain
    sendStatusUpdate(docid, newStatus, returnMessage);
    history.goBack()
  }


  const handleOnReturn = (docid: string | undefined, sendTo: ReRoute | undefined, comments: string) => {
    
    let newStatus: string;

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

  const handleUpdateGrade = async (grade: string, request: Reimbursement | undefined) => {
    // call axios
    await sendUpdateFinalGrade(grade, request?.docid, request?.comments)
    history.goBack()
  }

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  }

  const handleChangeReimbursement = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amt: number = amount;
    const cmt: string = returnMessage;
    const isExceedingFunds = () => {
      if(request) {
        if(amt > request.projectedAmount) {
          return true;
        }
      }
      return false;
    }  
    sendUpdateAmount(request?.docid, amt, cmt, isExceedingFunds());
    history.goBack();
  }

  const handleDeleteRequest = (form: Reimbursement | undefined) => {
    sendDeleteRequest(form);
    history.goBack();
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
            <div className="mt-4 container">
              <hr />
                <Form.Group controlId="username">
                  <Form.Control type="text" placeholder="Enter Final Grade" onChange={handleUpdateGradeChange} />
                  <Button 
                    className="mt-2"
                    variant="dark" 
                    size="lg" 
                    onClick={() => handleUpdateGrade(grade, request)}>
                    Update Final Grade
                  </Button>{' '}
                </Form.Group>

                <Form.Group controlId="username">
                  <hr />
                  <br />
                  <p>THIS WILL DELETE YOUR REQUEST!</p>
                  <Button 
                    className="mt-2"
                    variant="dark" 
                    size="lg" 
                    onClick={() => handleDeleteRequest(request)}>
                    Cancel Request
                  </Button>{' '}
                </Form.Group>
            </div>
          </> )

          :
          
          (<>
            <div className="mt-2 container">
              <hr />
              <Button variant="dark" 
                size="lg" 
                onClick={() => handleOnApproveOrReject(request?.docid, request?.status, request)}>
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
            <hr />
            <h4>Update Reimbursement Amount</h4>
            <Form onSubmit={handleChangeReimbursement}>
              <Form.Row>
                <Form.Group as={Col} controlId="amount">
                  <Form.Label>New Amount</Form.Label>
                  <Form.Control  type="number" placeholder="Enter New Amount" required onChange={handleAmountChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="amount">
                  <Form.Label>Comments</Form.Label>
                  <Form.Control  type="text" placeholder="Enter Reason" required onChange={handleReturnMessageChange} />
                </Form.Group>
                
              </Form.Row>
              <Button 
                  type='submit'
                  variant="dark" 
                  size="lg">
                    Change Reimbursement Amount
                </Button>{' '}
            </Form>
            
          </div>

          <div className="mt-4 container">
            <hr />
            <h4>Reject Request</h4>
            <Button variant="danger" 
              className="mt-4"
              size="lg" 
              onClick={() => handleOnApproveOrReject(request?.docid, 'Reject', request)}>
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