import React from "react";
import { TopNav } from "../TopNav";
import { Footer } from "../Footer";
import { CustomInput } from "../CustomInput";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export const Login = () => {
  const inputs = [
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
  ];
  return (
    <div>
      <TopNav />
      <Container className="main" fluid>
        <Row>
          <Col
            md={6}
            className="bg-primary vh-md-100 d-flex justify-content-center align-items-center"
          >
            <div className="shadow-lg rounded p-3">
              <h1>Welcome Back</h1>
              <p>Login to your account and take controll of your finance</p>
            </div>
          </Col>

          <Col
            md={6}
            className="d-flex justify-content-center align-items-center mt-5 mb-5"
          >
            <div className="shadow-lg rounded border p-5 w-75">
              <h2>Login</h2>
              <hr />
              <Form>
                {inputs.map((item, i) => (
                  <CustomInput key={i} {...item} />
                ))}

                <div className="d-grid">
                  <Button className="btn-primary">Login</Button>
                </div>
              </Form>

              <p className="text-center mt-3">
                New Customer? <a href="/signup">Signup</a> Now
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
