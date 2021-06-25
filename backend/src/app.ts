import expressSession from 'express-session';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import path from 'path';
import StatusCodes from 'http-status-codes';
import endOfYear from 'date-fns/endOfYear';
import endOfDay from 'date-fns/endOfDay';

import dotenv from 'dotenv';
import cors from 'cors';
import log from './utils/log';
import baseRouter from './routes';
import { IncorrectCredentialsError, UserNotFoundError } from './errors';
import userService from './services/user/user.service';

dotenv.config({ path: `${__dirname}/.env` });

const app = express();

app.use(cors({
  credentials: true,
  origin: [
    process.env.WEB_CLIENT_ORIGIN || 'http://localhost:3000',
  ],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

/**
 * The following is needed to turn on sessions for logged in users.
 *  disable for development.
 */

app.use(expressSession({
  secret: 'my-super-secret-squirrel-key',
  cookie: {},
}));

app.use('/', baseRouter);

const { BAD_REQUEST } = StatusCodes;

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof UserNotFoundError) {
    log.error(err);
    res.status(BAD_REQUEST).json({
      error: err.message,
    });

    return;
  }

  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof IncorrectCredentialsError) {
    log.error(err);
    res.status(BAD_REQUEST).json({
      error: err.message,
    });

    return;
  }

  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // TODO: Refactor later that sends back more than just a 400
  // Because not all requests that fail are the fault of the client
  console.log('Error handler: ', err);
  log.error(err);
  res.status(BAD_REQUEST).json({
    error: err.message,
  });

  next(err);
});

// Checks for the new year once per day, if true, resets users funds
setInterval(userService.shouldResetReimbursementAmount, 8.64e+7);

// Check for reimbursement age once per day, and automatically approves requests after 3? days
setInterval(() => {
  //TODO: Implement actual logic
  console.log("testing")
}, 8.64e+7)

userService.resetAllReimbursementsAmounts();
export default app;
