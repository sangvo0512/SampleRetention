// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function Dashboard() {
    const role = localStorage.getItem('role');

    return (
        <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}>
            <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
            </Nav.Item>
            {role === 'admin' && (
                <>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/member">Member</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/dept">Dept</Nav.Link>
                    </Nav.Item>
                </>
            )}
            <Nav.Item>
                <Nav.Link as={Link} to="/material">Material</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/inventory">Inventory</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/catalog">Catalog</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default Dashboard;
