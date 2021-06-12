import { Router } from 'express';

const reimbursementRouter = Router();

/**
 * This route will:
 * retrieve logged in user's bin
 */
reimbursementRouter.get('/', async (req, res) => {
  console.log('This route will retrieve reimbursement requests from the user\'s bin');
  res.send(200);
});

/**
 * This route will:
 * create logged in user's reimburement request
 */
reimbursementRouter.post('/', async (req, res) => {
  console.log('This route will create new reimbursement requests');
  res.send(201);
});

/**
 * This route will:
 * update logged a user's reimburement request
 */
reimbursementRouter.put('/', async (req, res) => {
  console.log('This route will update reimbursment requests');
  res.send(202);
});

export default reimbursementRouter;
