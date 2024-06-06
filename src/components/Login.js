// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Dropdown } from 'react-bootstrap';
import { UserContext } from '../UserContext';
import { useTranslation } from 'react-i18next';
import '../style/login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [language, setLanguage] = useState('en');
    const { t, i18n } = useTranslation();

    const handleLogin = (e) => {
        e.preventDefault();
        //Login success simulation
        let role;
        if (username === 'admin' && password === 'admin') {
            role = 'admin';
            navigate('/home');
        } else if (username === 'user' && password === 'user') {
            role = 'user';
            navigate('/home');
        } else {
            alert('Invalid username or password');
        }
        setUser({ username, role });
    };

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('i18nextLng', lang); // Lưu ngôn ngữ vào localStorage
    };

    return (
        <div className="login-container">

            <div className="language-dropdown">
                <Dropdown onSelect={handleLanguageChange}>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {t(i18n.language === 'en' ? 'English' : i18n.language === 'vi' ? 'Tiếng Việt' : '中國人')}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="en">English</Dropdown.Item>
                        <Dropdown.Item eventKey="vi">Tiếng Việt</Dropdown.Item>
                        <Dropdown.Item eventKey="cn">中國人</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="login-image"></div>
            <div className="login-form-container">

                <Form className="login-form" onSubmit={handleLogin}>
                    <div className="login-logo" alt="Logo"></div>
                    {/* <img src='/image/logo.jpg' alt="Logo" className="login-logo" /> */}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className='txtLogin'>{t('Login.username')}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className='txtLogin'>{t('Login.password')}</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="login-button">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;
