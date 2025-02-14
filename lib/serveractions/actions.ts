"use server";
import { ApiResponseType } from "@/app/types/WhApiDataTypes";
import { Prisma } from "@prisma/client";

import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

import { EgmDataTypes } from "@/app/types/EgmDataTypes";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getUserByLdapUserId } from "./prismaActions";
import { PTTResponseType } from "@/app/types/PTTDataTypes";

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
    cache: "no-cache",
    body: kriter,
  })
    .then((resp) => resp.json())
    .catch(function (error) {
      console.log(error);
    });

  return response;
};
export const getGoc = async () => {
  
}

export const GetPTTinformation = async (
  basvuruId: string,
  tokenData: string
): Promise<PTTResponseType> => {
  if (!basvuruId) {
    throw Error("Başvuru numarası gereklidir");
  }

  const url = `https://eizin.csgb.gov.tr/api/kargoTakip1?basvuruId=${basvuruId}`;
  const response = fetch(url, {
    method: "GET",

    headers: {
      authorization: tokenData,
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  })
    .then((resp) => resp.json())
    .catch(function (error) {
      console.log(error);
    });

  return response;
};

export const GetBorderInfoFromEgm = async (
  basvuruId: string,
  tokenData: string
): Promise<EgmDataTypes> => {
  if (!basvuruId) {
    throw Error("ülke kodu ya da pasaport numarası boş olamaz");
  }

  const url = `https://eizin.csgb.gov.tr/api/emniyetGirisCikisSorgula?basvuruId=${basvuruId}`;
  const response = fetch(url, {
    method: "GET",

    headers: {
      authorization: tokenData,
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  })
    .then((resp) => resp.json())
    .catch(function (error) {
      console.log(error);
    });

  return response;
};

const loginSchema = z.object({
  email: z.string().regex(new RegExp("^[a-zçğıöşü]+(?:.[a-zçğıöşü]+)+$"), {
    message: "Kullanıcı adı geçerli formatta değil",
  }),
  password: z
    .string()
    .min(8, { message: "Şifre en az 8 karakter olmalıdır." })
    .trim(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let token;

  let tmpEmail;
  let isUserAuthorized;
  try {
    const { email, password } = result.data;
    tmpEmail = email;

    token = await getToken(email, password);

    if (token == 401) {
      return {
        errors: {
          email: ["Kullanıcı adı ya da şifre hatalı!"],
        },
      };
    } else if (token == 500) {
      return {
        errors: {
          email: ["Bağlantı hatası!"],
        },
      };
    }

    isUserAuthorized = (await getUserByLdapUserId(
      formData.get("email")!.toString()
    )) as Prisma.UserCreateInput;

    if (!isUserAuthorized) {
      return {
        errors: {
          email: ["Warehouse'u kullanmaya yetkili değilsiniz."],
        },
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (error: any) {
    return {
      errors: {
        email: ["Bağlantı hatası! "],
      },
    };
  }

  try {
    await createSession(
      tmpEmail,
      token.responseTokenExpires,
      token.responseToken,
      isUserAuthorized!.role!
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      errors: {
        email: ["Session hatası" + error],
      },
    };
  }

  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function getToken(email: string, password: string) {
  try {
    const response = await axios.post(
      "https://eizin.csgb.gov.tr/api/authentication",
      {
        username: email,
        password: password,
      }
    );

    if (response.headers["authorization"] === undefined) {
      return 500;
    }

    const tokenExpires = jwtDecode(response.headers["authorization"]);
    const sonuc = {
      responseToken: response.headers["authorization"],
      responseTokenExpires: tokenExpires.exp,
    };
    return sonuc;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.status;
  }
}
