import { Router } from 'express';

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

export default userRouter;
