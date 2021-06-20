import express, { Router } from 'express';
import Reimbursement from '../models/reimbursement';
import User from '../models/user';
import reimbursementService from '../services/reimbursement/reimbursement.service';
import UserService from '../services/user/user.service';
import log from '../utils/log';

const userRouter = Router();

/**
 * This route will get requests that the user submitted
 */
userRouter.get('/', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    res.send(401);
    throw new Error('Not Authorized: You must be logged in.');
  }
  const { user } = req.session;
  try {
    res.json(await UserService.getUserRequests(user.username));
  } catch(err) {
    res.send(err);
  }
});

/**
 * This route will:
 * Allow the user to update the final grade for their requests
 * May want to force user to wait until the end of the course to do so, However,
 * Data is not currently tracking end of course
 */
userRouter.put('/', async (req: express.Request<unknown, unknown, Reimbursement, unknown, {}>, res) => {
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

userRouter.post('/', async (req: express.Request<unknown, unknown, User, unknown, {}>, res) => {
  const { username, password, email } = req.body;
  res.json(await UserService.registorUser(username, password, email));
});

export default userRouter;
