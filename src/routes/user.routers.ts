import { Router } from 'express';
import reimbursementService from '../services/reimbursement/reimbursement.service';
import log from '../utils/log';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  console.log('Reached User Router');

  if(!req.session.isLoggedIn || !req.session.user) {
    res.send(401);
    throw new Error('Not Authorized: You must be logged in.');
  }

  // Pretend that we have some actual data
  // This is an array of just this 1 user
  // But this should instead use our DynamoDB DocumentClient to fetch data
  res.json([req.session.user]);
});

/**
 * This route will:
 * Allow the user to update the final grade for their requests
 * May want to force user to wait until the end of the course to do so, However,
 * Data is not currently tracking end of course
 */
userRouter.put('/', async (req, res) => {
  const { docid, finalgrade } = req.body;
  try {
    const isUpdated = await reimbursementService.updateFinalGrade(docid, finalgrade);
    if(isUpdated) {
      res.sendStatus(200);
    }
  } catch(err) {
    log.error(err);
    res.sendStatus(400);
  }
});

export default userRouter;
