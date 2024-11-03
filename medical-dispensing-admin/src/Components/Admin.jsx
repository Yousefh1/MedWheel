// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';
import MedWheelLogo from '../assets/MedWheel_LargeLogo.png';
import {
  subscribeToMedicationsForPatient,
  addMedication,
  updateMedication,
  deleteMedication,
  subscribeToPatients,
  addPatient,
} from '../utils/firestoreUtils';

const Admin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [medications, setMedications] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showAddMedicationModal, setShowAddMedicationModal] = useState(false);
  const [showEditMedicationModal, setShowEditMedicationModal] = useState(false);
  const [currentMedication, setCurrentMedication] = useState(null);

  useEffect(() => {
    const unsubscribePatients = subscribeToPatients(setPatients);
    return () => unsubscribePatients();
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      const unsubscribeMedications = subscribeToMedicationsForPatient(selectedPatient.id, setMedications);
      return () => unsubscribeMedications();
    }
  }, [selectedPatient]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // CRUD for Patients
  const handleAddPatient = async (e) => {
    e.preventDefault();
    const newPatient = {
      name: e.target.name.value,
      age: e.target.age.value,
      medicalHistory: e.target.medicalHistory.value,
    };
    await addPatient(newPatient);
    setShowAddPatientModal(false);
  };

  // Add Medication
  const handleAddMedication = async (e) => {
    e.preventDefault();
    if (!selectedPatient) return;

    const newMedication = {
      name: e.target.name.value,
      dosage: { amount: e.target.dosageAmount.value, unit: e.target.dosageUnit.value },
      schedule: e.target.schedule.value,
    };
    await addMedication(newMedication, selectedPatient.id);
    setShowAddMedicationModal(false);
  };

  // Edit Medication
  const handleEditMedication = (medication) => {
    setCurrentMedication(medication);
    setShowEditMedicationModal(true);
  };

  // Update Medication
  const handleUpdateMedication = async (e) => {
    e.preventDefault();
    if (!currentMedication) return;

    const updatedData = {
      name: e.target.name.value,
      dosage: { amount: e.target.dosageAmount.value, unit: e.target.dosageUnit.value },
      schedule: e.target.schedule.value,
    };
    await updateMedication(currentMedication.id, updatedData);
    setShowEditMedicationModal(false);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/">
            <img src={MedWheelLogo} alt="MedWheel Logo" height="40" className="d-inline-block align-top" /> MedWheel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <Button variant="outline-light" onClick={handleLogout}>Log Out</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Patient Selection */}
      <Container>
        <Row className="mb-4">
          <Col>
            <h2>Select a Patient</h2>
            <Form.Select onChange={(e) => setSelectedPatient(patients.find(p => p.id === e.target.value))}>
              <option value="">Select Patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>{patient.name}</option>
              ))}
            </Form.Select>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={() => setShowAddPatientModal(true)}>+ Add Patient</Button>
          </Col>
        </Row>

        {/* Medication Management Section */}
        {selectedPatient && (
          <>
            <Row className="mb-4">
              <Col>
                <h2>Medications for {selectedPatient.name}</h2>
              </Col>
              <Col className="text-end">
                <Button variant="primary" onClick={() => setShowAddMedicationModal(true)}>+ Add Medication</Button>
              </Col>
            </Row>

            <Table striped bordered hover responsive className="mb-4">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Dosage</th>
                  <th>Schedule</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {medications.map((med) => (
                  <tr key={med.id}>
                    <td>{med.name}</td>
                    <td>{med.dosage.amount} {med.dosage.unit}</td>
                    <td>{new Date(med.schedule).toLocaleString()}</td>
                    <td>
                      <Button variant="warning" size="sm" onClick={() => handleEditMedication(med)}>Edit</Button>{' '}
                      <Button variant="danger" size="sm" onClick={() => deleteMedication(med.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}

        {/* Add Medication Modal */}
        <Modal show={showAddMedicationModal} onHide={() => setShowAddMedicationModal(false)} centered>
          <Modal.Header closeButton><Modal.Title>Add Medication</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddMedication}>
              <Form.Group controlId="name"><Form.Label>Name</Form.Label><Form.Control type="text" required /></Form.Group>
              <Form.Group controlId="dosageAmount" className="mt-3"><Form.Label>Dosage Amount</Form.Label><Form.Control type="number" required /></Form.Group>
              <Form.Group controlId="dosageUnit" className="mt-3"><Form.Label>Dosage Unit</Form.Label>
                <Form.Control as="select" required>
                  <option value="mg">mg</option>
                  <option value="ml">ml</option>
                  <option value="tablets">tablets</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="schedule" className="mt-3"><Form.Label>Schedule</Form.Label><Form.Control type="datetime-local" required /></Form.Group>
              <Button variant="primary" type="submit" className="mt-4 w-100">Add Medication</Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Edit Medication Modal */}
        <Modal show={showEditMedicationModal} onHide={() => setShowEditMedicationModal(false)} centered>
          <Modal.Header closeButton><Modal.Title>Edit Medication</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateMedication}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" defaultValue={currentMedication?.name} required />
              </Form.Group>
              <Form.Group controlId="dosageAmount" className="mt-3">
                <Form.Label>Dosage Amount</Form.Label>
                <Form.Control type="number" defaultValue={currentMedication?.dosage.amount} required />
              </Form.Group>
              <Form.Group controlId="dosageUnit" className="mt-3">
                <Form.Label>Dosage Unit</Form.Label>
                <Form.Control as="select" defaultValue={currentMedication?.dosage.unit} required>
                  <option value="mg">mg</option>
                  <option value="ml">ml</option>
                  <option value="tablets">tablets</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="schedule" className="mt-3">
                <Form.Label>Schedule</Form.Label>
                <Form.Control type="datetime-local" defaultValue={currentMedication?.schedule} required />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-4 w-100">Update Medication</Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Add Patient Modal */}
        <Modal show={showAddPatientModal} onHide={() => setShowAddPatientModal(false)} centered>
          <Modal.Header closeButton><Modal.Title>Add Patient</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddPatient}>
              <Form.Group controlId="name"><Form.Label>Name</Form.Label><Form.Control type="text" required /></Form.Group>
              <Form.Group controlId="age" className="mt-3"><Form.Label>Age</Form.Label><Form.Control type="number" required /></Form.Group>
              <Form.Group controlId="medicalHistory" className="mt-3"><Form.Label>Medical History</Form.Label><Form.Control as="textarea" rows={3} required /></Form.Group>
              <Button variant="primary" type="submit" className="mt-4 w-100">Add Patient</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default Admin;
