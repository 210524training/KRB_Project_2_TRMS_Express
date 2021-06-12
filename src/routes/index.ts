import { Router } from 'express';
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
baseRouter.post('/', async (req, res) => {
  // get user info from frontend
  const { username, password } = req.body;

  // verify user from database
  try {
    const user = await UserService.verifyCredentials(username, password);
    if(user) {
      req.session.isLoggedIn = true;
      req.session.user = new User(user.username, user.password, user.email, user.role, []);
      // res.json(req.session.user);
      res.sendStatus(202); // - sending status code after res.json() causes error
    }
  } catch(err) {
    log.error(err);
    res.sendStatus(401);
  }
});

baseRouter.use('/api/v1/:user', userRouter);
baseRouter.use('/api/v1/:user/reimbursement-requests', reimbursementRouter);

export default baseRouter;
