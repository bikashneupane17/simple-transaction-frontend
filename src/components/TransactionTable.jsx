import React, { useEffect, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useUser } from "../Context/UserContext";
import { deleteTransaction } from "../axios/axiosHelper";
import { toast } from "react-toastify";

export const TransactionTable = () => {
  const { transactions, getTrans } = useUser();
  const [idsToDelete, setIdsToDelete] = useState([]);

  const handleOnCheckBox = (e) => {
    const { checked, value } = e.target;

    if (value === "all") {
      return checked
        ? setIdsToDelete(transactions.map((trans) => trans._id))
        : setIdsToDelete([]);
    }

    return checked
      ? setIdsToDelete([...idsToDelete, value])
      : setIdsToDelete(idsToDelete.filter((id) => id !== value));
  };

  const handleOnDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${idsToDelete.length} transactions?`
      )
    ) {
      const { status, message } = await deleteTransaction(idsToDelete);
      toast[status](message);
    }
  };

  useEffect(() => {
    getTrans();
  }, [transactions]);

  const total = transactions.reduce((acc, curr) => {
    return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
  }, 0);

  return (
    <>
      <div className="d-flex justify-content-between">
        <div>{transactions.length} Transactions found!</div>
        <Button variant="danger" onClick={handleOnDelete}>
          Delete {idsToDelete.length > 0 && idsToDelete.length} Transactions
        </Button>
      </div>

      <Form.Check
        type="checkbox"
        label="Select All"
        value="all"
        onChange={handleOnCheckBox}
        checked={
          transactions.length > 0 &&
          transactions.every((item) => idsToDelete.includes(item._id))
        }
      />
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
