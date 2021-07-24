# Tuition Reimbursement Management System

## Project Description

TRMS, or Tuition Reimbursement Management System is a full-stack web application that allows employees to submit requests for reimbursements for courses, events, and certifications. These requests can then be approved or rejected by the employee's direct supervisor, department head, and a benefits coordinator while the employee is able to track the status of their requests.

## Technologies Used

### Frontend

* TypeScript
* [React](https://reactjs.org/)
* [Jest](https://jestjs.io/)

### Backend

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [DynamoDB](https://aws.amazon.com/dynamodb/)

## Features

List of features ready and TODOs for future development
* Employees can submit for tuition reimbursements
* Supervisors, Department Heads, and Benco can approve / reject requests
* Send requests back to employees for more information
* Reimbursement limits automatically reset every January 1st

To-do list:
* Expand test coverage
* Send email notifications to users if request approvals are not timely
* Auto-approve requests after set time 
* Upload / display files for review

## Getting Started
   
> First, you will need to clone the repository to your system, inside a terminal run:
- `git clone https://github.com/210524training/KRB_Project_2_TRMS_Express.git`
> Then the navigate to the backend directory and create a .env with the following variables:
- AWS_PROFILE=YOUR_AWS_PROFILE
- ENVIROMENT=env
- PORT=3001
- SUPER_SECRET_KEY=CREATE_YOUR_OWN
- WEB_CLIENT_ORIGIN=https://localhost:3000
> Then, to start the backend run:
- `npm install`
- `cd dynamo_scripts`
- `ts-node createReimbursementTable`
- `ts-node createUsersTable`
- `npm start`
> Finally, navigate to the frontend directory and run
- `npm install`
- `npm start`
> Notice that your will need to manually add users to the DynamoDB users table on the AWS console, I intend to add a script to auto populate the table in the future.

## Usage

> WIP

<img src="https://trms-screenshots.s3.us-west-1.amazonaws.com/signin.JPG" width="200" height="400" />

## License

This project uses the following license: [MIT](./LICENSE).

