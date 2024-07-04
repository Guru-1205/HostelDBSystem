import React, { useState } from 'react';
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail, getAuth } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);
    const navigate = useNavigate(); 

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
          const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
            alert('No user is currently signed in');
            setError('No user is currently signed in');
            return;
        }

        const user_email = user.email;
        if (email !== user_email) {
            alert('Invalid email');
            setError('Invalid email');
        } else {
            setStep(2); // Enable the password component
            setError('');
        }
        } catch (error) {
            console.error('Error checking email: ', error);
            setError('Error checking email');
            alert('Error checking email');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login Successful");
            navigate('/root');
        } catch (error) {
            setError('Invalid email/password');
            alert("Invalid email/password");
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Thiagarajar College of Engineering</h2>
                <h1>Warden</h1>
                {error && <p className="error">{error}</p>}
                {step === 1 ? (
                    <form onSubmit={handleEmailSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Next</button>
                    </form>
                ) : (
                    <form onSubmit={handleLogin}>
                      <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
