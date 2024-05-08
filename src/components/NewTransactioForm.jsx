import { Row, Col, Form } from "react-bootstrap";
import { CustomInput, CustomSelect } from "./CustomInput";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { postTransaction } from "../axios/axiosHelper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../Context/UserContext";

export const NewTransactioForm = () => {
  const { getTrans, setShowForm } = useUser();

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

    toast[status](message);
    status === "success" && (getTrans(), setShowForm(false));
  };

  return (
    <Form className="p-3 border rounded shadow-lg" onSubmit={handleOnSubmit}>
      <Row>
        <Col>
          {inputs.map(({ elemType, ...item }, i) =>
            elemType === "select" ? (
              <CustomSelect key={i} {...item} onChange={handleOnChange} />
            ) : (
              <CustomInput key={i} {...item} onChange={handleOnChange} />
            )
          )}
          <Button variant="primary" type="submit">
            Add Transaction
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
