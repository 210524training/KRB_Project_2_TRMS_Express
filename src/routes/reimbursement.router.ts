import { Router } from 'express';
import reimbursementService from '../services/reimbursement/reimbursement.service';
import log from '../utils/log';

const reimbursementRouter = Router();

/**
 * This route will:
 * retrieve logged in user's bin
 */
reimbursementRouter.get('/', async (req, res) => {
  console.log('This route will retrieve reimbursement requests from the user\'s bin');
  res.sendStatus(200);
});

/**
 * This route will:
 * create logged in user's reimburement request
 */
reimbursementRouter.post('/', async (req, res) => {
  console.log('This route will create new reimbursement requests');

  const {
    employeeName,
    employeeEmail,
    eventStartDate,
    eventStartTime,
    eventLocation,
    eventDescription,
    eventCost,
    gradingFormat,
    eventType,
    justification,
    attachments,
  } = req.body;

  try {
    const isSubmissionSuccessful = await reimbursementService.constructNewReimbursementRequest(
      employeeName,
      employeeEmail,
      eventStartDate,
      eventStartTime,
      eventLocation,
      eventDescription,
      eventCost,
      gradingFormat,
      eventType,
      justification,
      attachments,
    );

    if(isSubmissionSuccessful) {
      res.send(201);
    } else {
      res.send(400);
    }
  } catch(err) {
    log.error(err);
    res.sendStatus(400);
  }
});

/**
 * This route will:
 * update logged a user's reimburement request
 */
reimbursementRouter.put('/', async (req, res) => {
  console.log('This route will update reimbursment requests');
  res.sendStatus(202);
});

export default reimbursementRouter;
