import { Col, Container, Row } from "react-bootstrap";

import { AuthComponent } from "../components/AuthComponent";
import { CustomModal } from "../components/CustomModal";
import { DoughnutChart } from "../components/DoughnutChart";
import { Footer } from "../components/Footer";
import { NewTransactioForm } from "../components/NewTransactioForm";
import { TopNav } from "../components/TopNav";
import { TransactionTable } from "../components/TransactionTable";
import { useUser } from "../Context/UserContext";

export const Dashboard = () => {
  const { loggedInUser } = useUser();

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
