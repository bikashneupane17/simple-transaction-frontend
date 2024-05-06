import { Row, Col, Form } from "react-bootstrap";
import { CustomInput, CustomSelect } from "./CustomInput";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { postTransaction } from "../axios/axiosHelper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NewTransactioForm = ({ getTrans }) => {
  const [form, setForm] = useState({});

  const inputs = [
    // type,title,amount,data
    {
      name: "type",
      placeholder: "type",
      required: true,
      elemType: "select",
      options: [
        {
          value: "income",
          text: "Income",
        },
        {
          value: "expenses",
          text: "Expenses",
        },
      ],
    },
    {
      name: "title",
      type: "text",
      placeholder: "title",
      required: true,
    },
    {
      name: "amount",
      type: "number",
      placeholder: "2345",
      required: true,
    },
    {
      name: "date",
      type: "date",
      required: true,
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { status, message } = await postTransaction(form);
    // console.log(result.trans);

    toast[status](message);
    status === "success" && getTrans();
  };

  return (
    <Form className="p-3 border rounded shadow-lg" onSubmit={handleOnSubmit}>
      <Row>
        {inputs.map(({ elemType, ...item }, i) => (
          <Col md={2} key={i}>
            {elemType === "select" ? (
              <CustomSelect {...item} onChange={handleOnChange} />
            ) : (
              <CustomInput {...item} onChange={handleOnChange} />
            )}
          </Col>
        ))}
        <Col className="mb-3">
          <Button variant="primary w-100" type="submit">
            Add Transaction
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
