"use client"
import React, { useEffect, useState } from 'react';
import UserSearch from './UserSearch';

const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/ldapusers');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <UserSearch />
      <h1>Kullanıcı Listesi</h1>
      <ul>
        {users.map((user, index) => (
          user ? (
            <li key={index}>
              {user.cn} - {user.mail}
            </li>
          ) : (
            <li key={index}>Kullanıcı bilgisi mevcut değil</li>
          )
        ))}
      </ul>
    </div>
  );
};

export default UserList; 