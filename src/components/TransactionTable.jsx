import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

import { DoughnutChart } from "./DoughnutChart";
import { deleteTransaction } from "../axios/axiosHelper";
import { toast } from "react-toastify";
import { useUser } from "../Context/UserContext";

export const TransactionTable = () => {
  const {
    transactions,
    getTrans,
    setShowForm,
    filteredTrans,
    setFilteredTrans,
    transType,
    setTransType,
    idsToDelete, setIdsToDelete
  } = useUser();


  useEffect(() => {
    getTrans();
  }, []);

  const handleOnCheckBox = (e) => {
    const { checked, value } = e.target;
    if (value === "all") {
      return checked
        ? setIdsToDelete(filteredTrans.map((trans) => trans._id))
        : setIdsToDelete([]);
    }
    return checked
      ? setIdsToDelete([...idsToDelete, value])
      : setIdsToDelete(idsToDelete.filter((id) => id !== value));
  };

  const handleOnDelete = async () => {
    if (idsToDelete.length == 0) {
      return toast.error("Select Transactions to Delete ");
    }

    if (
      window.confirm(
        `Are you sure you want to delete ${idsToDelete.length} transactions?`
      )
    ) {
      const { status, message } = await deleteTransaction(idsToDelete);
      toast[status](message);

      if (status === "success") {
        getTrans();
      }
    }
  };

  const total = filteredTrans.reduce((acc, curr) => {
    return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
  }, 0);

  const handleOnFilter = (e) => {
    const { value } = e.target;
    setTransType(value);
    setIdsToDelete([]);

    if (value === "all") {
      return setFilteredTrans(transactions);
    }

    return value === "income"
      ? setFilteredTrans(
          transactions.filter((trans) => trans.type === "income")
        )
      : setFilteredTrans(
          transactions.filter((trans) => trans.type === "expenses")
        );
  };

  return (
    <>
      <Row className="d-flex justify-content-around h-20">
        <Col
          md={6}
          className="mb-2 border shadow-lg d-flex justify-content-center"
        >
          <DoughnutChart />
        </Col>

        <Col md={6} className="mb-2 d-block align-content-end">
          <div className="d-flex justify-content-end gap-2">
            <Button onClick={() => setShowForm(true)} className=" shadow-lg">
              Add Transaction
            </Button>
            <Button
              variant="danger"
              onClick={handleOnDelete}
              className="shadow-lg"
            >
              Delete {idsToDelete.length > 0 && idsToDelete.length} Transactions
            </Button>
          </div>
        </Col>
      </Row>
      <hr />

      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-around gap-5">
          <Form.Check
            type="checkbox"
            label="Select All"
            value="all"
            onChange={handleOnCheckBox}
            checked={
              filteredTrans.length > 0 &&
              filteredTrans.every((item) => idsToDelete.includes(item._id))
            }
          />
          <div>{filteredTrans.length} Transactions found!</div>
        </div>

        <div className="d-flex gap-2 filterButtons">
          <Button className="btn-warning" onClick={handleOnFilter} value="all">
            Show All
          </Button>
          <Button
            className="btn-warning"
            onClick={handleOnFilter}
            value="income"
          >
            Income
          </Button>
          <Button
            className="btn-warning"
            onClick={handleOnFilter}
            value="expenses"
          >
            Expenses
          </Button>
        </div>
      </div>
      <hr />

      {transactions.length > 0 && (
        <Table striped bordered hover variant="info shadow-lg mt-2">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Income</th>
              <th>Expense</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrans.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Form.Check
                      onChange={handleOnCheckBox}
                      type="checkbox"
                      value={item._id}
                      checked={idsToDelete.includes(item._id)}
                      label={item.date.slice(0, 10)}
                    />
                  </td>
                  <td>{item.title}</td>
                  {item.type === "income" ? (
                    <td className="text-success">+ {item.amount}</td>
                  ) : (
                    <td></td>
                  )}
                  {item.type === "expenses" ? (
                    <td className="text-danger">- {item.amount}</td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              );
            })}
            <tr>
              <td colSpan={3} className="fw-bold fs-4">
                Total Balance
              </td>
              <td className={total < 0 ? "text-danger" : "text-success"}>
                {total}
              </td>
            </tr>
          </tbody>
        </Table>
      )}
    </>
  );
};
