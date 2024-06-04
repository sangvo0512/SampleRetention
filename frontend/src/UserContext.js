import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);

    const addUser = (user) => {
        setUsers([...users, user]);
    };

    const updateUser = (updatedUser) => {
        setUsers(users.map(user => (user.ID === updatedUser.ID ? updatedUser : user)));
    };

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.ID !== id));
    };

    return (
        <UserContext.Provider value={{ user, setUser, users, addUser, updateUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};
