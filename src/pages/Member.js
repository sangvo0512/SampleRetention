import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { Form, Button, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import '../style/Member.css'; // Đảm bảo bạn đã nhập tệp CSS

const Member = () => {
    const { users, addUser, updateUser, deleteUser } = useContext(UserContext);
    const [editMember, setEditMember] = useState(null);
    const [formState, setFormState] = useState({
        username: '',
        password: '',
        role: 'user',
        ID: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('role');
    const [showForm, setShowForm] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (editMember) {
            setFormState(editMember);
        } else {
            setFormState({ username: '', password: '', role: 'user', ID: '' });
        }
    }, [editMember]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMember) {
            updateUser(formState);
        } else {
            addUser(formState);
        }
        setFormState({ username: '', password: '', role: 'user', ID: '' });
        setEditMember(null);
        setShowForm(false);
    };

    const handleEditUser = (user) => {
        setEditMember(user);
        setShowForm(true);
    };

    const handleAddUser = () => {
        setEditMember(null);
        setShowForm(true);
    };

    const filteredUsers = users.filter(user =>
        user[searchType].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2 className="mem-title">{t('Member.title')}</h2>
            <div className="container mt-3">

                {!showForm && (
                    <div>
                        <div className="search-form">
                            <Form.Control
                                type="text"
                                placeholder={`Search by ${searchType}`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Form.Select
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value)}
                            >
                                <option value="role">{t('Member.searchByRole')}</option>
                                <option value="ID">{t('Member.searchByID')}</option>
                            </Form.Select>
                        </div>
                        <div className="button-group">
                            <Button variant="primary" onClick={handleAddUser}>
                                {t('Member.add')}
                            </Button>
                            <Form.Check
                                type="checkbox"
                                label={t('Member.showPassword')}
                                checked={showPasswords}
                                onChange={(e) => setShowPasswords(e.target.checked)}
                            />
                        </div>
                        <div className="table-container">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>{t('Member.username')}</th>
                                        <th>{t('Member.password')}</th>
                                        <th>{t('Member.id')}</th>
                                        <th>{t('Member.role')}</th>
                                        <th>{t('Member.action')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map(user => (
                                        <tr key={user.ID}>
                                            <td>{user.username}</td>
                                            <td>{showPasswords ? user.password : '••••••••'}</td>
                                            <td>{user.ID}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEditUser(user)}
                                                >
                                                    {t('Member.modify')}
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => deleteUser(user.ID)}
                                                >
                                                    {t('Member.delete')}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                )}

                {showForm && (
                    <Form onSubmit={handleSubmit} className="mb-4">
                        <Form.Group controlId="formBasicUsername" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={formState.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formState.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicID" className="mb-3">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter ID"
                                name="ID"
                                value={formState.ID}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicRole" className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                name="role"
                                value={formState.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {editMember ? 'Update Member' : 'Add Member'}
                        </Button>
                        <Button variant="secondary" className="ms-2" onClick={() => setShowForm(false)}>
                            Cancel
                        </Button>
                    </Form>
                )}
            </div>
        </div>

    );
};

export default Member;
