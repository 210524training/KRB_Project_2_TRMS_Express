import { Router } from 'express';
import User from '../models/user';
import userRouter from './user.routers';
import reimbursementRouter from './reimbursement.router';

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
 * 2. log user into the API
 * 3. redirct to user's workstation
 */
baseRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  req.session.isLoggedIn = true;

  // May need user from DB
  req.session.user = new User(username, password, 'email@email.email', 'Employee', []);

  res.json(req.session.user);

  console.log(username, password);
});

baseRouter.use('/api/v1/:user', userRouter);
baseRouter.use('/api/v1/:user/reimbursement-requests', reimbursementRouter);

export default baseRouter;
