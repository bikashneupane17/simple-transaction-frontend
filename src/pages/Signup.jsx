import React, { useState } from "react";
import { TopNav } from "../components/TopNav";
import { Footer } from "../components/Footer";
import { CustomInput } from "../components/CustomInput";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { postSignup } from "../axios/axiosHelper";

const initialState = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export const Signup = () => {
  const [form, setForm] = useState(initialState);
  const [response, setResponse] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      window.alert("Password did not match, try again");
    }

    const result = await postSignup(rest);
    setResponse(result);
    setForm(initialState);
  };

  const inputs = [
    {
      label: "Full Name",
      name: "name",
      type: "name",
      placeholder: "Jon Doe",
      required: true,
      value: form.name,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "user@email.com",
      required: true,
      value: form.email,
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "number",
      placeholder: "555-5555-555",
      required: true,
      value: form.phone,
    },

    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "********",
      required: true,
      value: form.password,
    },
    {
      label: "Re-enter Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "********",
      required: true,
      value: form.confirmPassword,
    },
  ];
  return (
    <div>
      {/* header */}
      <TopNav />

      {/* main  body*/}
      <Container className="main" fluid>
        <Row>
          <Col
            md={6}
            className="bg-info vh-md-100 p-5 d-flex justify-content-center align-items-center"
          >
            <div className="shadow-lg rounded p-3 text-white">
              <h1>Join Our Community</h1>
              <p>Track transactions, controll the finance</p>
            </div>
          </Col>

          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="shadow-lg rounded border p-5 w-75 mt-5 mb-5">
              <h2>Sign Up</h2>
              <hr />

              {response?.message && (
                <Alert
                  variant={
                    response?.status === "success" ? "success" : "danger"
                  }
                >
                  {response.message}
                </Alert>
              )}

              <Form onSubmit={handleOnSubmit}>
                {inputs.map((item, i) => (
                  <CustomInput key={i} {...item} onChange={handleOnChange} />
                ))}

                <div className="d-grid">
                  <Button className="btn-primary" type="submit">
                    Sign Up
                  </Button>
                </div>
              </Form>

              <p className="text-end mt-3">
                Already have an account? <a href="/">Login</a> Now
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* footer */}
      <Footer />
    </div>
  );
};
