import { History } from 'history';
import React, { Dispatch, SetStateAction } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

type Props = {
  show: boolean
  projectedAmount: number
  setShow: Dispatch<SetStateAction<boolean>>
}

const handleOnClick = (setShow: Dispatch<SetStateAction<boolean>>, history: History): void => {
  
  setShow(false);
  history.push('/workstation')
}

const AlertDismiss: React.FC<Props> = ({ show, setShow, projectedAmount }) => {

  const history = useHistory();

  return (
    <Alert show={show} variant="success">
      <Alert.Heading>Success!</Alert.Heading>
      <p>
        We have recieved your request, your projected reimbursement is ${`${projectedAmount}`}
      </p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button onClick={() => handleOnClick(setShow, history)} variant="outline-success">
          Dismiss
        </Button>
      </div>
    </Alert>
  )
  
}

export default AlertDismiss;