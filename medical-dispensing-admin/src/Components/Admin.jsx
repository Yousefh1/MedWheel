// src/components/AdminDashboard.jsx
import React, { useState } from 'react';
import { Table, Button, Form, Modal, Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext'; // Import auth context for logout
import MedWheelLogo from '../assets/MedWheel_LargeLogo.png'; // Import logo image
import './AdminDashboard.css';

const Admin = () => {
  const [medications, setMedications] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentMedication, setCurrentMedication] = useState(null);
  const { logout } = useAuth(); // Get logout function from AuthContext
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Redirect to login page after logout
  };

  // Handle adding a new medication
  const handleAddMedication = (e) => {
    e.preventDefault();
    const newMedication = {
      id: medications.length + 1,
      name: e.target.name.value,
      dosage: {
        amount: e.target.dosageAmount.value,
        unit: e.target.dosageUnit.value,
      },
      schedule: e.target.schedule.value,
    };
    setMedications([...medications, newMedication]);
    setShowAddModal(false);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={MedWheelLogo}
              alt="MedWheel Logo"
              height="40"
              className="d-inline-block align-top"
            />{' '}
            MedWheel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <Button variant="outline-light" onClick={handleLogout}>
              Log Out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Dashboard Content */}
      <Container className="admin-dashboard py-5">
        <Row className="mb-4">
          <Col>
            <h1 className="dashboard-title">Medication Management Dashboard</h1>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              + Add Medication
            </Button>
          </Col>
        </Row>

        {/* Medication Table */}
        <Table striped bordered hover responsive className="medication-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Medication Name</th>
              <th>Dosage</th>
              <th>Schedule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med) => (
              <tr key={med.id}>
                <td>{med.id}</td>
                <td>{med.name}</td>
                <td>
                  {med.dosage.amount} {med.dosage.unit}
                </td>
                <td>{new Date(med.schedule).toLocaleString()}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEditMedication(med)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDeleteMedication(med.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Add Medication Modal */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Medication</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddMedication}>
              <Form.Group controlId="name">
                <Form.Label>Medication Name</Form.Label>
                <Form.Control type="text" placeholder="Enter medication name" required />
              </Form.Group>
              <Form.Group controlId="dosageAmount" className="mt-3">
                <Form.Label>Dosage Amount</Form.Label>
                <Form.Control type="number" placeholder="Enter dosage amount" required />
              </Form.Group>
              <Form.Group controlId="dosageUnit" className="mt-3">
                <Form.Label>Dosage Unit</Form.Label>
                <Form.Control as="select" required>
                  <option value="mg">mg</option>
                  <option value="ml">ml</option>
                  <option value="tablets">tablets</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="schedule" className="mt-3">
                <Form.Label>Schedule</Form.Label>
                <Form.Control type="datetime-local" required />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-4 w-100">
                Add Medication
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default Admin;
