"use server";
import { ApiResponseType } from "@/app/types/WhApiDataTypes";

import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

import { EgmDataTypes } from "@/app/types/EgmDataTypes";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

//import { dummyData } from "../dummy";

// export const GetAllDataFromWarehouse = async (): Promise<ApiResponseType> => {
//   const url =
//     "https://services.csgb.gov.tr/workpernet/get-filtered-work-permit-data";
//   const response = fetch(url, {
//     method: "POST",

//     headers: {
//       ApiKey: "d8994824-a876-458c-bae6-44g58c357aa9",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       pageSize: 300,
//       pageNumber: 1,
//       allHistories: false,
//     }),
//   })
//     .then((resp) => resp.json())
//     .catch(function (error) {
//       console.log(error);
//     });

//   return response;
// };

export const GetSpesificDataFromWarehouse = async (
  basvuruNo: string
): Promise<ApiResponseType> => {
  let kriter;
  if (basvuruNo.length == 11) {
    kriter = JSON.stringify({
      pageSize: 1000,
      pageNumber: 1,
      allHistories: false,
      yabanciKimlikNo: basvuruNo,
    });
  } else {
    kriter = JSON.stringify({
      pageSize: 1000,
      pageNumber: 1,
      allHistories: false,
      inBasvuruNoList: [...basvuruNo.split(" ")],
    });
  }
  const url =
    "https://services.csgb.gov.tr/workpernet/get-filtered-work-permit-data";
  const response = fetch(url, {
    method: "POST",

    headers: {
      ApiKey: "d8994824-a876-458c-bae6-44g58c357aa9",
      "Content-Type": "application/json",
    },
    body: kriter,
  })
    .then((resp) => resp.json())
    .catch(function (error) {
      console.log(error);
    });

  return response;
};

export const GetBorderInfoFromEgm = async (
  countryCode: string,
  passportNo: string
): Promise<EgmDataTypes> => {
  

  if (!countryCode || !passportNo) {
    throw Error ("ülke kodu ya da pasaport numarası boş")
  }
  const myBody = JSON.stringify({egmCountryCode:countryCode, passportNo:passportNo})
  

  const url =
    "http://gate.apps.ocp.csgb.gov.tr/egm-service/egm/query-border-information";
  const response = fetch(url, {
    method: "POST",

    headers: {
      ApiKey: "r89bgtws-t4l6-25ot-sz844-9833ne684527",
      "Content-Type": "application/json",
    },
    body: myBody,
  })
    .then((resp) => resp.json())
    .catch(function (error) {
      console.log(error);
    });
 

  return response;
};



// const testUser = {
//   id: "1",
//   email: "murath31@gmail.com",
//   password: "123456789",
// };

const loginSchema = z.object({
  email: z.string().regex(new RegExp("^[a-zçğıöşü]+(?:\.[a-zçğıöşü]+)+$"),{message:"Kullanıcı adı geçerli formatta değil"}),
  password: z
    .string()
    .min(8, { message: "Şifre en az 8 karakter olmalıdır." })
    .trim(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function login(prevState: any, formData: FormData) {
//   const result = loginSchema.safeParse(Object.fromEntries(formData));

//   if (!result.success) {
//     return {
//       errors: result.error.flatten().fieldErrors,
//     };
//   }

//   const { email, password } = result.data;

//   if (email !== testUser.email || password !== testUser.password) {
//     return {
//       errors: {
//         email: ["Kullanıcı adı ya da şifre geçersiz!"],
//       },
//     };
//   }

//   await createSession(testUser.email);

//   redirect("/");
// }


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;


  
  const token = await getToken(email,password)

  
  
  
  if (token==401) {
    return {
      errors: {
        email: ["Kullanıcı adı ya da şifre hatalı!"],
      },
    };

  }


  await createSession(email,token.responseTokenExpires);

  redirect("/");
}





export async function logout() {
  await deleteSession();
  redirect("/login");
}


export async function getToken (email:string,password:string) {
  try {
    const response = await axios.post('https://eizin.csgb.gov.tr/api/authentication', {
      username: email,
      password: password,
    });
    const tokenExpires =  jwtDecode(response.headers['authorization'])
    const sonuc = {
      responseToken:response.headers['authorization'],
      responseTokenExpires:tokenExpires.exp

    }
    return sonuc
    
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.status;
  }
};
