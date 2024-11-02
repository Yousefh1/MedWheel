// src/components/Login.jsx
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../Components/firebaseConfig.js"; // Adjust path as needed
import "./login.css"; // Ensure this file has your custom styling
import { Link, useNavigate} from "react-router-dom";
import {useAuth} from './AuthContext'




const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
      console.log("Successfully logged in!");
      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      setError("Failed to log in: " + error.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Successfully logged in with Google!");
    } catch (error) {
      console.error("Google login error:", error.code, error.message);
      setError("Google Sign-In failed: " + error.message);
    }
  };

  return (
    <div
      className="sign-in__wrapper"
    >
      <div className="sign-in__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <img
          className="img-thumbnail mx-auto d-block mb-2"
        />
        <div className="h4 mb-2 text-center">Sign In</div>

        {error && (
          <Alert className="mb-2" variant="danger" onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        )}

        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={inputEmail}
            placeholder="Email"
            onChange={(e) => setInputEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}

        <Button
          className="w-100 mt-2"
          variant="outline-primary"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>

        <div className="d-grid justify-content-end">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={() => console.log("Password reset link triggered")}
          >
            Forgot password?
          </Button>
          <p className="mt-3 text-center">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
