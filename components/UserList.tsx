"use client"
import React, { useEffect, useState } from 'react';


const UserList = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/ldapusers');
        
        if (!response.ok) {
          throw new Error('Bağlantı hatası');
        }
        const data = await response.json();
        setUsers(data.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
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