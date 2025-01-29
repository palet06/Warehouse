"use client"
import { useState } from "react";

const users = [
  { id: 1, name: "Mahmut Karaahmetoglu", email: "mahmut.karaahmetoglu@csgb.gov.tr" },
  { id: 2, name: "Ahmet Gökdemir", email: "ahmet.gokdemir@csgb.gov.tr" },
  { id: 3, name: "Ahmet Murat Kalem", email: "ahmet.kalem@csgb.gov.tr" },
  { id: 4, name: "Uğur Eren", email: "ugur.eren@csgb.gov.tr" },
  { id: 5, name: "Murat Hayaloğlu", email: "murat.hayaloglu@csgb.gov.tr" },
];

export default function LdapUsersList2() {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchTerm, setSelectedSearchTerm] = useState("");

  const addUser = (user) => {
    setSelectedUsers((prev) => [...prev, user]);
  };

  const removeUser = (user) => {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  return (
    <div className="flex gap-4 p-6">
      {/* Kullanıcı Listesi */}
      <div className="w-1/2 border p-4 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-2">Tüm UİGM Kullanıcıları</h2>   
        <div className="relative mb-2 ">
          <input
            type="text"
            placeholder="Ara..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          {searchTerm && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setSearchTerm("")}
            >
              ✖
            </button>
          )}
        </div>
        <ul>
          {users
            .filter((user) => 
              !selectedUsers.some((u) => u.id === user.id) &&
              user.name.toLowerCase().includes(searchTerm)
            )
            .map((user) => (
              <li key={user.id} className="flex justify-between p-2">
                <div>
                  <b>{user.name}</b> - {user.email} 
                </div>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => addUser(user)}
                >
                  Ekle
                </button>
              </li>
            ))}
        </ul>
      </div>

      {/* Seçili Kullanıcılar */}
      <div className="w-1/2 border p-4 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-2 flex justify-between">
          Yetkili UİGM KullanıcılarI
          <button
            className={`px-4 text-base font-normal rounded ${selectedUsers.length ? "bg-green-500 text-white" : "bg-gray-400 text-gray-200"}`}
            disabled={!selectedUsers.length}
          >
            Kaydet
          </button>
        </h2>
        <div className="relative mb-2 ">
          <input
            type="text"
            placeholder="Ara..."
            className="w-full p-2 border rounded"
            value={selectedSearchTerm}
            onChange={(e) => setSelectedSearchTerm(e.target.value.toLowerCase())}
          />
          {selectedSearchTerm && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setSelectedSearchTerm("")}
            >
              ✖
            </button>
          )}
        </div>
        <ul>
          {selectedUsers
            .filter((user) => user.name.toLowerCase().includes(selectedSearchTerm))
            .map((user) => (
              <li key={user.id} className="flex justify-between p-2">
                <div>
                  <b>{user.name}</b> - {user.email}   
                </div>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => removeUser(user)}
                >
                  Çıkar
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
