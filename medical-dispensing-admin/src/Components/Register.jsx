// src/components/Register.jsx
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../Components/firebaseConfig.js"; // Adjust the path if needed
import { Link } from "react-router-dom";
import "./login.css"; // Reuse the same CSS for consistent styling



const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Registration successful! You can now log in.");
      setError(""); // Clear any existing errors
    } catch (error) {
      console.error("Registration error:", error);
      setError("Failed to register: " + error.message);
      setSuccess(""); // Clear any success message
    }
    setLoading(false);
  };

  return (
    <div
      className="sign-in__wrapper"
      
    >
      <div className="sign-in__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleRegister}>
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Register</div>

        {/* Show success or error messages */}
        {error && (
          <Alert className="mb-2" variant="danger" onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        )}

        {success && (
          <Alert className="mb-2" variant="success" onClose={() => setSuccess("")} dismissible>
            {success}
          </Alert>
        )}

        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Register
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Registering...
          </Button>
        )}

        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;
