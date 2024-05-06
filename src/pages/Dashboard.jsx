import React, { useEffect, useState } from "react";
import { TopNav } from "../components/TopNav";
import { Footer } from "../components/Footer";
import { Container, Form, Navbar, Button, Row, Col } from "react-bootstrap";
import { AuthComponent } from "../components/AuthComponent";
import { NewTransactioForm } from "../components/NewTransactioForm";
import { TransactionTable } from "../components/TransactionTable";
import { getTransaction } from "../axios/axiosHelper";
import { toast } from "react-toastify";

export const Dashboard = ({ loggedInUser }) => {
  const [transactions, setTransactions] = useState([]);
  const [originalTransaction, setOriginalTransaction] = useState([]);

  useEffect(() => {
    getTrans();
  }, []);

  const getTrans = async () => {
    const { status, message, trans } = await getTransaction();
    if (status === "error") {
      toast.error(message);
    } else {
      setOriginalTransaction(trans);
      setTransactions(trans);
    }
  };

  const handleOnClick = (mth) => {
    mth === "All"
      ? setTransactions(originalTransaction)
      : setTransactions(
          originalTransaction.filter((trans) => {
            const [year, month, date] = trans.date.split("-");
            return month === "0" + mth;
          })
        );
  };

  return (
    <div>
      <AuthComponent loggedInUser={loggedInUser}>
        <TopNav loggedInUser={loggedInUser} />

        <Container className="main pt-2">
          <h4>Dashboard | Welcome Back {loggedInUser?.name}</h4>
          <hr />

          <NewTransactioForm getTrans={getTrans} />

          <Row className="mt-5">
            <Col>
              <TransactionTable
                transactions={transactions}
                handleOnClick={handleOnClick}
              />
            </Col>
          </Row>
        </Container>

        <Footer />
      </AuthComponent>
    </div>
  );
};
