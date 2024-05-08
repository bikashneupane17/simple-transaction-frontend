import React from "react";
import { TopNav } from "../components/TopNav";
import { Footer } from "../components/Footer";
import { Container, Button, Row, Col } from "react-bootstrap";
import { AuthComponent } from "../components/AuthComponent";
import { NewTransactioForm } from "../components/NewTransactioForm";
import { TransactionTable } from "../components/TransactionTable";
import { CustomModal } from "../components/CustomModal";
import { useUser } from "../Context/UserContext";

export const Dashboard = () => {
  const { loggedInUser, setShowForm } = useUser();

  return (
    <div>
      <AuthComponent>
        <TopNav />

        <Container className="main pt-2">
          <h4>Dashboard | Welcome Back {loggedInUser?.name}</h4>
          <hr />

          <CustomModal>
            <NewTransactioForm />
          </CustomModal>

          <Row>
            <Col className="text-end">
              <Button onClick={() => setShowForm(true)}>Add Transaction</Button>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <TransactionTable />
            </Col>
          </Row>
        </Container>

        <Footer />
      </AuthComponent>
    </div>
  );
};
