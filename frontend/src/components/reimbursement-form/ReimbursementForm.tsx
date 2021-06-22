import React, { ChangeEvent, FormEvent, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import User from "../../models/user";
import { sendForm } from "../../remote/trms.api";

type Props = {
  currentUser: User | undefined;
}

const Register: React.FC<Props> = ({ currentUser }) => {
  
  const [employeeName, setEmployeeName] = useState<string>('');
  const [employeeEmail, setemployeeEmail] = useState<string>('');
  const [eventStartDate, seteventStartDate] = useState<string>('');
  const [eventStartTime, seteventStartTime] = useState<string>('');
  const [eventLocation, seteventLocation] = useState<string>('');
  const [eventDescription, seteventDescription] = useState<string>('');
  const [eventCost, seteventCost] = useState<string>('');
  const [gradingFormat, setgradingFormat] = useState<string>('');
  const [passingGrade, setpassingGrade] = useState<string>('');
  const [eventType, seteventType] = useState<string>('');
  const [attachments, setattachments] = useState<File | null | string>(null);

  const handleEmployeeNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmployeeName(e.target.value);
  };

  const handleEmployeeEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setemployeeEmail(e.target.value);
  };

  const handleEventStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    seteventStartDate(e.target.value);
  };

  const handleEventStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    seteventStartTime(e.target.value);
  };

  const handleEventLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    seteventLocation(e.target.value);
  };

  const handleEventDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    seteventDescription(e.target.value);
  };

  const handleEventCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    seteventCost(e.target.value);
  };

  const handleGradingFormatChange = (e: ChangeEvent<HTMLInputElement>) => {
    setgradingFormat(e.target.value);
  };

  const handlePassingGradeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setpassingGrade(e.target.value);
  };

  const handleEventTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    seteventType(e.target.value);
  };

  const handleAttachmentsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      setattachments(e.target.files[0].name)
    }
  };


  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendForm(
      employeeName, 
      employeeEmail, 
      eventStartDate, 
      eventStartTime, 
      eventLocation, 
      eventDescription, 
      eventCost, 
      gradingFormat, 
      passingGrade,
      eventType,
      attachments,
    )
  }
  
  return (
    <div className="container mt-4">

      <h2>Tuition Reimbursement Request</h2>
      
      <Form onSubmit={handleFormSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="employeeName">
            <Form.Label>Username</Form.Label>
            <Form.Control  type="username" placeholder="Enter Username" required onChange={handleEmployeeNameChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="employeeEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" required onChange={handleEmployeeEmailChange} />
          </Form.Group>
        </Form.Row>

        <hr />

        <Form.Row>
        <Form.Group controlId="eventType">
          <Form.Label>Select Event Type</Form.Label>
          <Form.Control as="select" custom required onChange={handleEventTypeChange}>
            <option> </option>
            <option>University Course</option>
            <option>Seminar</option>
            <option>Certification Prep</option>
            <option>Certification</option>
            <option>Technical</option>
            <option>Other</option>
          </Form.Control>
        </Form.Group>

          <Form.Group as={Col} controlId="eventStartDate">
          <Form.Label>Event Start</Form.Label>
              <Form.Control type="date" required onChange={handleEventStartDateChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="eventStartTime">
          <Form.Label>Event Time</Form.Label>
              <Form.Control type="time" required onChange={handleEventStartTimeChange} />
          </Form.Group>
          
          <Form.Group as={Col} controlId="eventCost">
          <Form.Label>Event Cost</Form.Label>
              <Form.Control type="number" required onChange={handleEventCostChange} />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="desciption">
          <Form.Label>Event Description</Form.Label>
          <Form.Control placeholder="Briefly describe the event" required onChange={handleEventDescriptionChange} />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Location</Form.Label>
          <Form.Control placeholder="123 Main St. Las Vegas, NV" required onChange={handleEventLocationChange} />
        </Form.Group>

        <hr />

        <Form.Row>
        <Form.Group as={Col} controlId="exampleForm.SelectCustom">
          <Form.Label>Grade Format</Form.Label>
          <Form.Control as="select" custom required onChange={handleGradingFormatChange}>
            <option> </option>
            <option>Grade</option>
            <option>Presentation</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="passingGrade">
          <Form.Label>Passing Grade</Form.Label>
          <Form.Control placeholder="A, 80%, N/A, etc." required onChange={handlePassingGradeChange} />
        </Form.Group>
        </Form.Row>

        <Form.Group>
          <Form.File type="file" id="exampleFormControlFile1" label="Add document about the event" onChange={handleAttachmentsChange} />
        </Form.Group>

        <Button variant="dark" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Register;