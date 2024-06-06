import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../UserContext';
import { FaUser, FaBuilding, FaCubes, FaBoxes, FaBook, FaSignOutAlt } from 'react-icons/fa';
import '../style/Home.css';

const Home = () => {
    const { t } = useTranslation();
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div className="home-container">
            <ButtonGroup className="home-button-group">
                {user && user.role === 'admin' && (
                    <>
                        <Button variant="primary" onClick={() => navigateTo('/Member')}>
                            <FaUser className="icon" /> {t('Home.Member')}
                        </Button>
                        <Button variant="primary" onClick={() => navigateTo('/Dept')}>
                            <FaBuilding className="icon" /> {t('Home.Department')}
                        </Button>
                    </>
                )}
                <Button variant="primary" onClick={() => navigateTo('/Material')}>
                    <FaCubes className="icon" /> {t('Home.Material')}
                </Button>
                <Button variant="primary" onClick={() => navigateTo('/Inventory')}>
                    <FaBoxes className="icon" /> {t('Home.Inventory')}
                </Button>
                <Button variant="primary" onClick={() => navigateTo('/Catalog')}>
                    <FaBook className="icon" /> {t('Home.Catalog')}
                </Button>
                <Button variant="danger" onClick={handleLogout}>
                    <FaSignOutAlt className="icon" /> {t('Home.Logout')}
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default Home;
