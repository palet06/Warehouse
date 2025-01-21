"use client"

import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LdapUsersList = () => {
 

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/ldapusers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
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
          <li key={index}>
            {user.cn} - {user.mail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LdapUsersList;