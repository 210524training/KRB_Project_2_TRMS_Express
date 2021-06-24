import { Router } from 'express';
import ReimbursementService from '../services/reimbursement/reimbursement.service';
import log from '../utils/log';

const reimbursementRouter = Router();

/**
 * This route will:
 * retrieve logged in user's bin
 */
reimbursementRouter.get('/', async (req, res) => {
  const { user } = req.session;

  try {
    if(user) {
      const didPopulateBin = await ReimbursementService.populateUserBin(user);
      if(didPopulateBin) {
        log.debug(didPopulateBin);
        res.send(didPopulateBin);
      }
    }
  } catch(err) {
    log.error(err);
    res.sendStatus(400);
  }
});

/**
 * This route will:
 * create logged in user's reimburement request
 */
reimbursementRouter.post('/', async (req, res) => {
  let currentUserRole: string = '';

  if(req.session.user) {
    currentUserRole = req.session.user.role;
  }

  const {
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
    comments,
    projectedAmount,

  } = req.body;

  try {
    const isSubmissionSuccessful = await ReimbursementService.constructNewReimbursementRequest(
      currentUserRole,
      employeeName,
      employeeEmail,
      eventStartDate,
      eventStartTime,
      eventLocation,
      eventDescription,
      Number(eventCost),
      gradingFormat,
      passingGrade,
      eventType,
      attachments,
      comments,
      projectedAmount,
    );

    if(isSubmissionSuccessful) {
      res.json(201);
    } else {
      res.sendStatus(400);
    }
  } catch(err) {
    log.error(err);
    res.sendStatus(400);
  }
});

/**
 * This route will:
 * update logged a user's reimburement request's grade
 */
reimbursementRouter.put('/:docid', async (req, res) => {
  const { docid } = req.body;
  const { grade } = req.body;
  console.log(docid, grade, req.body);
  res.json(await ReimbursementService.updateFinalGrade(docid, grade));
});

reimbursementRouter.put('/:docid/status', async (req, res) => {
  const { docid } = req.body;
  const { status } = req.body;
  const { comments } = req.body;
  res.json(await ReimbursementService.updateStatus(docid, status, comments));
});

reimbursementRouter.get('/pending', async (req, res) => {
  res.json(await ReimbursementService.getPendingReimbursements());
});

export default reimbursementRouter;
