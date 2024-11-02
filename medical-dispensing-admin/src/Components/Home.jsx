// src/components/Home.jsx
import React from 'react';
import { Container, Nav, Navbar, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import MedWheelLogo from '../assets/MedWheel_LargeLogo.png';

// import './components/Home.css';

const style = {
    root: {
        '--text-color': '#ebe9fc',
        '--background-color': '#ffffff',
        '--primary-color': '#2f27ce',
        '--accent-color': '#443dff'
    },
    body: {
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)',
        fontFamily: "'Inter', sans-serif",
        margin: 0,
        padding: 0
    }
};

const Home = () => {
  return (

    <div style={style.root}>
        <div style={style.body}></div>
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="shadow-sm">
        <Container>
        <Navbar.Brand href="/">
            <img
              src={MedWheelLogo}
              alt="MedWheel Logo"
              height="40" // Adjust the size as needed
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
      <section className="hero-section text-white text-center py-5" style={{ background: 'linear-gradient(135deg, #3a31d8, #7367f0)' }}>
        <Container>
          <h1 className="display-4 font-weight-bold">Welcome to MedWheel</h1>
          <p className="lead"> MedWheel's focus on reliable medication management and accessibility.</p>
          <Button variant="light" size="lg" href="/about" className="mt-3">Learn More</Button>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-light">
        <Container>
          <h2 className="text-center text-primary mb-5">Our Features</h2>
          <Row>
            <Col md={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">Precision and Compassion in Every Prescription</Card.Title>
                  <Card.Text>With customizable scheduling and secure dispensing, MedWheel empowers caregivers and healthcare providers to deliver precise, compassionate care, ensuring patients receive the right medication at the right time</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">Ensuring Timely Care, One Dose at a Time</Card.Title>
                  <Card.Text>MedWheel is committed to supporting patients and caregivers by providing timely medication reminders and automated dispensing, making adherence to treatment simpler, safer, and more reliable</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">Empowering Independence Through Accessible Medication Management</Card.Title>
                  <Card.Text>Designed for accessibility and ease, MedWheel enables individuals with diverse needs to manage their medication schedules confidently, fostering greater independence and health autonomy</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section text-center py-5">
        <Container>
          <h2 className="text-primary mb-5">What Our Clients Say</h2>
          <Row>
            <Col md={4}>
              <blockquote className="blockquote">
                <p className="mb-0">"The best service we've ever used. Highly recommended!"</p>
                <footer className="blockquote-footer">John Doe, CEO</footer>
              </blockquote>
            </Col>
            <Col md={4}>
              <blockquote className="blockquote">
                <p className="mb-0">"A remarkable team that exceeded all our expectations."</p>
                <footer className="blockquote-footer">Jane Smith, COO</footer>
              </blockquote>
            </Col>
            <Col md={4}>
              <blockquote className="blockquote">
                <p className="mb-0">"Reliable and innovative solutions that keep us ahead."</p>
                <footer className="blockquote-footer">Robert Brown, CTO</footer>
              </blockquote>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section text-white text-center py-5" style={{ backgroundColor: '#3a31d8' }}>
        <Container>
          <h2 className="font-weight-bold">Ready to help people live easier?</h2>
          <p className="lead">Contact us today and see how we can make a difference for you.</p>
          <Button variant="light" size="lg" href="/contact" className="mt-3">Get in Touch</Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer bg-primary text-white text-center py-4">
        <Container>
          <p className="mb-0">&copy; 2024 MyBrand. All rights reserved.</p>
          <p>Follow us on 
            <a href="https://twitter.com" className="text-white mx-2">Twitter</a> | 
            <a href="https://facebook.com" className="text-white mx-2">Facebook</a>
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
