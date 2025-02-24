import React, { useState, useEffect } from 'react';
import './ListUsers.css';
import cross_icon from '../assets/cross_icon.png';

const ListUsers = () => {
    const [allusers, setAllUsers] = useState([]);

    // Fonction pour récupérer les utilisateurs
    const fetchUsers = async () => {
        try {
            const resp = await fetch('http://localhost:4000/users');
            const data = await resp.json();
            setAllUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Fonction pour supprimer un utilisateur
    const deleteUser = async (userId) => {
        try {
            const resp = await fetch('http://localhost:4000/deleteUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: userId }),
            });

            const result = await resp.json();
            if (result.success) {
                alert(`User ${result.name} has been removed.`);
                // Mettre à jour la liste après suppression
                setAllUsers(allusers.filter(user => user._id !== userId));
            } else {
                alert('Failed to remove user.');
            }
        } catch (error) {
            console.error('Error removing user:', error);
            alert('An error occurred while trying to remove the user.');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className='list-user'>
            <h1>Liste des utilisateurs</h1>
            <div className='listproduct-format-main'>
                <p>Nom</p>
                <p>Email</p>
                <p>Consommation</p>
                <p>Remove</p>
            </div>
            <div className='listproduct-allproducts'>
                <hr />
                {allusers.map((user) => (
                    <React.Fragment key={user._id}>
                        <div className='listproduct-format-main listproduct-format'>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>Consommation de l'utilisateur</p>
                            <img 
                                src={cross_icon} 
                                alt="Remove User" 
                                className="listproduct-product-remove" 
                                onClick={() => deleteUser(user._id)} 
                            />
                        </div>
                        <hr />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default ListUsers;
