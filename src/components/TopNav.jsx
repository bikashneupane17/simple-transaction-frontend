import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useUser } from "../Context/UserContext";

export const TopNav = () => {
  const { loggedInUser } = useUser();

  const handleOnLoggedOut = () => {
    localStorage.removeItem("user");
  };

  return (
    <Navbar expand="md" className="bg-info shadow-lg  ">
      <Container>
        <Navbar.Brand href="#home">Simple-Transaction</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {loggedInUser?._id ? (
              <>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/" onClick={handleOnLoggedOut}>
                  Sign Out {loggedInUser?.name}?
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
