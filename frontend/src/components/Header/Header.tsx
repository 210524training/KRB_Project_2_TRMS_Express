import React from 'react';
import { Jumbotron } from 'react-bootstrap';

type Props = {
}

const Footer: React.FC<Props> = () => {
  return (
    <header>
      <Jumbotron style={{ backgroundImage: "linear-gradient(to right bottom, #ffffff, #f2f5ff, #dfecff, #c5e5fe, #a7dff9, #96dbf7, #83d6f4, #6dd2f0, #66cdf3, #60c9f6, #5ec3f9, #5fbefb)" }}>
        <h1>Tuition Reimbursement Mangagement System</h1>
        <p>
          Helping you grow, to make us more profit.
        </p>
      </Jumbotron>
    </header>
  )
}

export default Footer;