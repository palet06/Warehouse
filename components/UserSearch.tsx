import React, { useState } from 'react';

const UserSearch = () => {
  const [samAccountName, setSamAccountName] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    setUserData(null);
    try {
      const response = await fetch('/api/ldapusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ samAccountName }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Arama başarısız');
      }
      setUserData(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Kullanıcı Ara</h1>
      <input
        type="text"
        value={samAccountName}
        onChange={(e) => setSamAccountName(e.target.value)}
        placeholder="Kullanıcı Adı"
      />
      <button onClick={handleSearch}>Ara</button>
      {error && <p style={{ color: 'red' }}>Hata: {error}</p>}
      {userData && (
        <div>
          <h2>Kullanıcı Bilgileri:</h2>
          <p>Ad: {userData.cn}</p>
          <p>Soyad: {userData.sn}</p>
          <p>E-posta: {userData.mail}</p>
        </div>
      )}
    </div>
  );
};

export default UserSearch; 