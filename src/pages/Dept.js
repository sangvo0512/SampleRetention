import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
const Dept = () => {
    const [depts, setDepts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentDept, setCurrentDept] = useState({ id: '', name: '' });
    const [isEditing, setIsEditing] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        // Giả sử chúng ta có một danh sách bộ phận mẫu để hiển thị
        const initialDepts = [
            { id: 'D001', name: 'HR' },
            { id: 'D002', name: 'Finance' },
            { id: 'D003', name: 'IT' },
        ];
        setDepts(initialDepts);
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAddDept = () => {
        setCurrentDept({ id: '', name: '' });
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEditDept = (dept) => {
        setCurrentDept(dept);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDeleteDept = (id) => {
        if (window.confirm('Are you sure you want to delete this part?')) {
            setDepts(depts.filter(dept => dept.id !== id));
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalSave = () => {
        if (isEditing) {
            setDepts(depts.map(dept => (dept.id === currentDept.id ? currentDept : dept)));
        } else {
            setDepts([...depts, currentDept]);
        }
        setShowModal(false);
    };

    const filteredDepts = depts.filter(dept =>
        dept.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>{t('Departments.title')}</h2>
                <Button variant="primary" onClick={handleAddDept}>{t('Departments.add')}</Button>
            </div>
            <Form.Control
                type="text"
                placeholder={t('Departments.search')}
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>{t('Departments.id')}</th>
                        <th>{t('Departments.name')}</th>
                        <th>{t('Departments.action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDepts.map(dept => (
                        <tr key={dept.id}>
                            <td>{dept.id}</td>
                            <td>{dept.name}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEditDept(dept)}>{t('Departments.modify')}</Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteDept(dept.id)}>{t('Departments.delete')}</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Department Editing' : 'Add a Department'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDeptId">
                            <Form.Label>{t('Departments.id')}</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentDept.id}
                                onChange={(e) => setCurrentDept({ ...currentDept, id: e.target.value })}
                                readOnly={isEditing}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDeptName">
                            <Form.Label>{t('Departments.name')}</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentDept.name}
                                onChange={(e) => setCurrentDept({ ...currentDept, name: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>Close</Button>
                    <Button variant="primary" onClick={handleModalSave}>
                        {isEditing ? 'Save changes' : 'Add a Department'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dept;
