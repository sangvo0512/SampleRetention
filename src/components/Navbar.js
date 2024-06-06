import React, { useContext } from 'react'; // Thêm useContext vào import
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { FaUser, FaBuilding, FaCubes, FaBoxes, FaBook, FaSignOutAlt } from 'react-icons/fa';
import '../style/Navbar.css';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand" to="/home">
            </Link>
            <div className="collapse navbar-collapse justify-content-center">
                <ul className="navbar-nav">
                    {user?.role === 'admin' && <li className="nav-item">
                        <Link className="nav-link" to="/member"><FaUser className="icon" />{t('Nav.Member')}</Link></li>}
                    {user?.role === 'admin' && <li className="nav-item">
                        <Link className="nav-link" to="/dept"><FaBuilding className="icon" />{t('Nav.Department')}</Link></li>}
                    <li className="nav-item">
                        <Link className="nav-link" to="/material"><FaCubes className="icon" />{t('Nav.Material')}</Link></li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/inventory"><FaBoxes className="icon" />{t('Nav.Inventory')}</Link></li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/catalog"><FaBook className="icon" />{t('Nav.Catalog')}</Link></li>
                </ul>
                <button onClick={handleLogout} className="btn btn-outline-danger my-2 my-sm-0  ml-auto">
                    <FaSignOutAlt className="icon-logout" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
