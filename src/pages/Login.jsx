import React, { useEffect, useState } from "react";
import { TopNav } from "../components/TopNav";
import { Footer } from "../components/Footer";
import { CustomInput } from "../components/CustomInput";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { postLogin } from "../axios/axiosHelper";
import { useNavigate } from "react-router-dom";

export const Login = ({ setLoggedInUser, loggedInUser }) => {
  const [form, setForm] = useState({});
  const [response, setResponse] = useState({});

  useEffect(() => {
    console.log(loggedInUser);
    loggedInUser?._id && navigate("/dashboard");
  }, []);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const result = await postLogin(form);
    setResponse({ status: result?.status, message: result?.message });

    if (result?.status === "success") {
      setLoggedInUser(result.user);

      localStorage.setItem("user", JSON.stringify(result.user));

      navigate("/dashboard");
      console.log(result.user);
    }
  };

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

      <Container fluid>
        <Row className="main">
          <Col
            md={6}
            className="bg-primary d-flex justify-content-center align-items-center"
          >
            <div className="shadow-lg rounded p-3 text-white">
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

              {response?.message && (
                <Alert
                  variant={response.status === "success" ? "success" : "danger"}
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
                    Login
                  </Button>
                </div>
              </Form>

              <p className="text-center mt-3">
                New Customer? <a href="/signup">Signup</a> Now
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};
