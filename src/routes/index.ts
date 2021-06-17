import express, { Router } from 'express';
import User from '../models/user';
import userRouter from './user.routers';
import reimbursementRouter from './reimbursement.router';
import UserService from '../services/user/user.service';
import log from '../utils/log';

const baseRouter = Router();

/**
 * This route will:
 * send home/sign-in page
 */
baseRouter.get('/', async (req, res) => {
  res.sendFile('index.html', { root: 'src/public/views/' });
});

/**
 * This route will:
 * 1. verify user in DB
 * 2. log user into the API and start a session
 * --- TODO --- 3. redirct to user's workstation
 */
baseRouter.post('/', async (req: express.Request<unknown, unknown, { username: string, password: string }, unknown, {}>, res) => {
  // get user info from frontend
  const { username, password } = req.body;

  // verify user from database
  const user = await UserService.verifyCredentials(username, password);
  req.session.isLoggedIn = true;
  req.session.user = user;
  // res.json(req.session.user);
  res.json(req.session.user)
});

baseRouter.use('/api/v1/:user', userRouter);
baseRouter.use('/api/v1/:user/reimbursement-requests', reimbursementRouter);

export default baseRouter;
