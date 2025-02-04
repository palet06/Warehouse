"use client";

import { toast } from "@/hooks/use-toast";
import {
  getAuthorizedUsers,
  saveAuthorizedPersonel,
} from "@/lib/serveractions/prismaActions";
import { ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export interface ldapUsersReturnType {
  cn: string; // kullanıcı tam adı
  mail: string; //email adresi
  userId: string; // kullanıcı adı örn: murat.hayaloglu
  userRole:string;
}

export default function LdapUsersList({userName}:{userName:string}) {
  
  
  const [selectedUsers, setSelectedUsers] = useState<ldapUsersReturnType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchTerm, setSelectedSearchTerm] = useState("");
  const [users, setUsers] = useState<ldapUsersReturnType[]>([]);
  const [loadingAllUsers, setLoadingAllUsers] = useState(true);
  const [loadingAuthorizedUsers, setLoadingAuthorizedUsers] = useState(true);
  const [errorAllUsers, setErrorAllUsers] = useState<string | null>(null);
  const [errorAllAuthorizedUsers, setErrorAllAuthorizedUsers] = useState<
    string | null
  >(null);
  const [saveButton, setSaveButton] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingAllUsers(true);
        const response = await fetch("/api/ldapusers", {
          cache: "no-store",
        });
        if (!response.ok) {
          setErrorAllUsers("Bağlantı Hatası");
          throw Error("Bağlantı Hatası ");
        }
        const data = await response.json();
        setUsers(data.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setErrorAllUsers(error.message);
      } finally {
        setLoadingAllUsers(false);
      }
    };

    const fetchSavedUsers = async () => {
      setLoadingAuthorizedUsers(true);
      try {
        const users = await getAuthorizedUsers();
        const formattedUsers = users.map((user) => ({
          cn: user.name,
          mail: user.email,
          userId: user.ldapUserId,
          userRole:user.role
        }));
        setSelectedUsers(formattedUsers as ldapUsersReturnType[]);
        setLoadingAuthorizedUsers(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setErrorAllAuthorizedUsers(error);
        setLoadingAuthorizedUsers(false);
      }
    };

    fetchUsers();
    fetchSavedUsers();
  }, []);

  const addUser = (user: ldapUsersReturnType) => {
    setSelectedUsers((prev) => [...prev, user]);
    setSaveButton(false);
    setErrorAllAuthorizedUsers(null);
  };

  const removeUser = (user: ldapUsersReturnType) => {
    setSelectedUsers((prev) => prev.filter((u) => u.cn !== user.cn));
    setSaveButton(false);
    if (selectedUsers.length <= 1) {
      setSaveButton(true);
      setErrorAllAuthorizedUsers("En az 1 yetkili kullanıcı olmalıdır.");
    }
  };

  console.log("gelen kullanıcı adı",userName)

  return (
    <div className="flex gap-4 p-6 ">
      {/* Kullanıcı Listesi */}
      <div className="w-1/2 border p-4 rounded-lg shadow ">
        <h2 className="text-lg font-bold mb-2">Tüm UİGM Kullanıcıları</h2>
        {loadingAllUsers ? (
          <p className="text-csgbBgRed">Kullanıcılar getiriliyor</p>
        ) : errorAllUsers ? (
          <p className="text-csgbBgRed">{errorAllUsers}</p>
        ) : (
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
        )}

        <div className="h-[400px] overflow-y-auto">
          <ul>
            {users
              .filter(
                (user) =>
                  !selectedUsers.some((u) => u.cn === user.cn) &&
                  user.cn.toLowerCase().includes(searchTerm)
              )
              .map((user) => (
                <li key={user.userId} className="flex justify-between p-2">
                  <div>
                    <b>{user.cn}</b> - {user.mail}
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
      </div>

      {/* Seçili Kullanıcılar */}
      <div className="w-1/2 border p-4 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-2 flex justify-between">
          Yetkili UİGM KullanıcılarI
          <button
            className={`px-4 text-base font-normal rounded ${
              !saveButton
                ? "bg-green-500 text-white"
                : "bg-gray-400 text-gray-200"
            }`}
            disabled={saveButton}
            onClick={async () => {
              try {
                await saveAuthorizedPersonel(selectedUsers);
                
                toast({
                  title: "Başarılı",
                  description: `Kullanıcı(lar) eklendi.`,
                  variant: "success",
                });
                setSaveButton(true);
              } catch (error) {
                toast({
                  title: "Hata",
                  description: `Kullanıcı(lar) eklenirken hata oluştu. Hata= ${error}`,
                  variant: "destructive",
                });
              }
            }}
          >
            Kaydet
          </button>
        </h2>

        {loadingAuthorizedUsers ? (
          <p className="text-csgbBgRed">Yetkili kullanıcılar getiriliyor</p>
        ) : errorAllAuthorizedUsers ? (
          <p className="text-csgbBgRed">{errorAllAuthorizedUsers}</p>
        ) : (
          <div className="relative mb-2 ">
            <input
              type="text"
              placeholder="Ara..."
              className="w-full p-2 border rounded"
              value={selectedSearchTerm}
              onChange={(e) =>
                setSelectedSearchTerm(e.target.value.toLowerCase())
              }
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
        )}
        <div className="h-[400px] overflow-y-auto">
          <ul>
            {selectedUsers
              .filter((user) =>
                user.cn.toLowerCase().includes(selectedSearchTerm)
              )
              .map((user) => (



                <li key={user.userId} className="flex justify-between p-2">
                  <div className="flex">
                    <b>{user.cn}</b> - {user.mail} {user.userRole==="Admin"&&" - "}  {user.userRole==="Admin"&&<ShieldCheck className="text-green-500"/>
                    }
                  </div>

                  {user.userId != userName&&
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => removeUser(user)}>Çıkar</button>
                  }
                  
                  
                </li>
              ))}
          </ul>
        </div>
      </div>
      
    </div>
  );
}
