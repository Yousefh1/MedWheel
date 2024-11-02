import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../Components/firebaseConfig.js";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Successfully registered:", userCredential.user);
      alert("Registration successful! Please login.");
      // If using react-router: navigate('/login');
    } catch (error) {
      console.error("Registration error:", error.code, error.message);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('An account with this email already exists');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        default:
          setError(error.message);
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Successfully registered with Google:", result.user);
      // If using react-router: navigate('/dashboard');
    } catch (error) {
      console.error("Google Sign-up error:", error.code, error.message);
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Sign-up cancelled by user');
          break;
        case 'auth/popup-blocked':
          setError('Popup was blocked by the browser');
          break;
        default:
          setError(`Google Sign-up failed: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register with Email</button>
      </form>
      
      <div>
        <button onClick={handleGoogleSignUp}>Register with Google</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      // Add these styles to your buttons
<button 
  type="submit" 
  style={{
    backgroundColor: '#4285f4',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    marginBottom: '10px'
  }}
>
  Register with Email
</button>

<button 
  onClick={handleGoogleSignUp}
  style={{
    backgroundColor: 'white',
    color: '#757575',
    padding: '10px 20px',
    border: '1px solid #757575',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  }}
>
  <img 
    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
    alt="Google logo" 
    style={{ width: '18px', height: '18px' }}
  />
  Register with Google
</button>
    </div>
  );
};

export default Register;