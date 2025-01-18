
import React from 'react'
import axios from 'axios';


import { jwtDecode } from "jwt-decode";
import MyTimer from '@/components/MyTimer';

const getToken = async () => {
  const response = await axios.post('https://eizin.csgb.gov.tr/api/authentication', {
    username: 'murat.hayaloglu',
    password: 'Mh2159[]*',
  });
  
  return response.headers['authorization']
};

const parseToken = async (tt) => {
    if (!tt) { return; }
    const base64Url = tt.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}




const page = async () => {
    const token = await getToken()
    const ptoken =  jwtDecode(token);
    
    
  return (
   <>
   
    <div className='flex p-5 max-w-80 text-wrap'>Token = {token} parse hali {ptoken.exp ? new Date(ptoken.exp * 1000).toLocaleDateString("tr-TR",{hour:"2-digit",minute:"numeric"}) : 'Invalid token'}</div>
    <MyTimer  expiryTimestamp={ptoken.exp} />
  
   </>
  )
}

export default page