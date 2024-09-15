import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Login.css';

const Login = () => {
    const [hospitalID, setHospitalID] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/hospitalLogin', {
                hospitalID,
                password
            });

            if (response.data.success) {
                navigate(`/dashboard?hospitalID=${hospitalID}&hospitalName=${response.data.hospitalName}`);
            } else {
                setError('Hospital ID or Password is incorrect');
                Swal.fire({
                    title: 'Error!',
                    text: 'Hospital ID or Password is incorrect',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            //  setError('Error logging in. Please try again.');
            Swal.fire({
                title: 'Error!',
                text: 'Error logging in. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="login-container">
            <h2>Hospital Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Hospital ID</label>
                    <input
                        type="text"
                        value={hospitalID}
                        onChange={(e) => setHospitalID(e.target.value)}
                        placeholder="Enter Hospital ID"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
