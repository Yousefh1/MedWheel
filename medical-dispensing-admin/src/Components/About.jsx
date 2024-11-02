// src/components/About.jsx
import React from 'react';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import MedWheelLogo from '../assets/MedWheel_LargeLogo.png';
const About = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="shadow-sm">
        <Container>
        <Navbar.Brand href="/">
            <img
              src={MedWheelLogo}
              alt="MedWheel Logo"
              height="80" // Adjust the size as needed
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/admin">Admin</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section className="hero-section text-white text-center py-5" style={{ backgroundColor: '#2f27ce' }}>
        <Container>
          <h1 className="display-4">About MedWheel</h1>
          <p className="lead">Empowering Health Through Accessible Medication Management</p>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="mission-section py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="text-primary">Our Mission</h2>
              <p className="text-muted">
                At MedWheel, our mission is to simplify medication management and empower individuals with diverse needs to stay on track with their treatment.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-light">
        <Container>
          <h2 className="text-center text-primary mb-5">What We Do</h2>
          <Row>
            <Col md={6}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">For Patients</Card.Title>
                  <Card.Text>
                    MedWheel’s app provides medication reminders, notifications, and tracking features, empowering patients to manage their health confidently.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">For Caregivers & Providers</Card.Title>
                  <Card.Text>
                    Our platform allows caregivers and healthcare providers to set up and monitor medication schedules, ensuring safe and accurate dispensing.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="core-values-section py-5">
        <Container>
          <h2 className="text-center text-primary mb-5">Our Core Values</h2>
          <Row>
            <Col md={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">Accessibility</Card.Title>
                  <Card.Text>
                    Built to serve individuals with disabilities or limited mobility, MedWheel ensures accessible medication management for everyone.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">Reliability</Card.Title>
                  <Card.Text>
                    Our platform delivers dependable, consistent support to help maintain health routines with confidence and peace of mind.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">Empowerment</Card.Title>
                  <Card.Text>
                    By offering a user-friendly experience, MedWheel empowers users to take control of their medication schedules and health outcomes.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;
