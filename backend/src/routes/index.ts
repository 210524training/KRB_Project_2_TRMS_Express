import express, { Router } from 'express';
import userRouter from './user.routers';
import reimbursementRouter from './reimbursement.router';
import UserService from '../services/user/user.service';
import reimbursementService from '../services/reimbursement/reimbursement.service';
import log from '../utils/log';

const baseRouter = Router();

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
  try {
    await reimbursementService.populateUserBin(user);
  } catch(err) {
    log.debug(err);
  }
  // res.json(req.session.user);
  res.json(req.session.user);
});

export async function logout(req: express.Request, res: express.Response): Promise<void> {
  if(req.session.user) {
    const { username } = req.session.user;

    req.session.destroy(() => {
      console.log(`${username} logged out`);
    });
  }

  res.status(202).send();
}

baseRouter.post('/logout', logout);

baseRouter.use('/api/v1/:user', userRouter);
baseRouter.use('/api/v1/:user/reimbursement-requests', reimbursementRouter);

export default baseRouter;
