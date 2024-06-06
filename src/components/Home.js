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
        <div>
            <h2 className="home-title">{t('Home.title')}</h2>
            <div className="home-container">
                <ButtonGroup className="home-button-group-up">
                    {user && user.role === 'admin' && (
                        <>
                            <Button className='home-btn' variant="primary" onClick={() => navigateTo('/Member')}>
                                <FaUser className="icon" /> {t('Home.Member')}
                            </Button>
                        </>
                    )}
                    <Button className='home-btn' variant="primary" onClick={() => navigateTo('/Material')}>
                        <FaCubes className="icon" /> {t('Home.Material')}
                    </Button>
                    <Button className='home-btn' variant="primary" onClick={() => navigateTo('/Inventory')}>
                        <FaBoxes className="icon" /> {t('Home.Inventory')}
                    </Button>

                </ButtonGroup>
                <ButtonGroup className="home-button-group-down">
                    {user && user.role === 'admin' && (
                        <>
                            <Button className='home-btn' variant="primary" onClick={() => navigateTo('/Dept')}>
                                <FaBuilding className="icon" /> {t('Home.Department')}
                            </Button>
                        </>
                    )}
                    <Button className='home-btn' variant="primary" onClick={() => navigateTo('/Catalog')}>
                        <FaBook className="icon" /> {t('Home.Catalog')}
                    </Button>
                    <Button className='home-btn' variant="danger" onClick={handleLogout}>
                        <FaSignOutAlt className="icon" /> {t('Home.Logout')}
                    </Button>
                </ButtonGroup>
            </div>
        </div>

    );
};

export default Home;
