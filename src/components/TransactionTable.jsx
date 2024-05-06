import React, { useState } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";

export const TransactionTable = ({ transactions, handleOnClick }) => {
  const total = transactions.reduce((acc, curr) => {
    return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
  }, 0);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <>
      <Row>
        <Col
          className="border rounded shadow-lg"
          onClick={() => handleOnClick("All")}
        >
          All
        </Col>
      </Row>

      <Row className="mb-3">
        {months.map((mth, index) => {
          return (
            <Col
              key={index}
              onClick={() => handleOnClick(index + 1)}
              className="border rounded shadow-lg"
            >
              {mth}
            </Col>
          );
        })}
      </Row>

      <div>{transactions.length} Transactions found!</div>

      {transactions.length > 0 && (
        <Table striped bordered hover variant="info shadow-lg">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Income</th>
              <th>Expense</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.date.slice(0, 10)}</td>
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
