import React, { useState } from "react";
import { TopNav } from "../TopNav";
import { Footer } from "../Footer";
import { CustomInput } from "../CustomInput";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const initialState = {
  name: "",
  number: null,
  email: "",
  password: "",
  confirmPassword: "",
};

export const Signup = () => {
  const [form, setForm] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const inputs = [
    {
      label: "Name",
      name: "name",
      type: "name",
      placeholder: "Jon Doe",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "user@email.com",
      required: true,
    },

    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "********",
      required: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "********",
      required: true,
    },
  ];
  return (
    <div>
      <TopNav />
      <Container className="main" fluid>
        <Row>
          <Col
            md={6}
            className="bg-info vh-md-100 d-flex justify-content-center align-items-center"
          >
            <div className="shadow-lg rounded p-3 text-light">
              <h1>Join Our Community</h1>
              <p>Are you ready to take controll of your finance</p>
            </div>
          </Col>

          <Col
            md={6}
            className="d-flex justify-content-center align-items-center mt-5 mb-5"
          >
            <div className="shadow-lg rounded border p-5 w-75 ">
              <h2>Sign Up</h2>
              <hr />
              <Form onSubmit={handleOnSubmit}>
                {inputs.map((item, i) => (
                  <CustomInput key={i} {...item} onChange={handleOnChange} />
                ))}

                <div className="d-grid">
                  <Button className="btn-primary">Sign Up</Button>
                </div>
              </Form>

              <p className="text-center mt-3">
                Already have an account? <a href="/">Login</a> Now
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      {/* header */}
      {/* main  */}
      {/* footer */}
      <Footer />
    </div>
  );
};
