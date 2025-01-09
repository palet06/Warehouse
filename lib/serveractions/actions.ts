"use server";
import { ApiResponseType } from "@/app/types/data-types/dataTypes";
import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const GetAllDataFromWarehouse = async (): Promise<ApiResponseType> => {
	const url =
    "https://services.csgb.gov.tr/workpernet/get-filtered-work-permit-data";
  const response = fetch(url, {
    method: "POST",

    headers: {
      ApiKey: "d8994824-a876-458c-bae6-44g58c357aa9",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pageSize: 300,
      pageNumber: 1,
      allHistories: false,
    }),
  })
    .then((resp) => resp.json())
    .catch(function (error) {
      console.log(error);
    });

  return response;
};

export const GetSpesificDataFromWarehouse = async (basvuruNo: string): Promise<ApiResponseType> => {
 
	let kriter
  if (basvuruNo.length == 11) {
      kriter = JSON.stringify({
      pageSize: 1000,
      pageNumber: 1,
      allHistories: false,
      yabanciKimlikNo:basvuruNo
      
    })
  } else {
    kriter = JSON.stringify({
      pageSize: 1000,
      pageNumber: 1,
      allHistories: false,
      inBasvuruNoList:[...basvuruNo.split(" ")]
    })

  }
  const url =
    "https://services.csgb.gov.tr/workpernet/get-filtered-work-permit-data";
  const response = fetch(url, {
    method: "POST",

    headers: {
      ApiKey: "d8994824-a876-458c-bae6-44g58c357aa9",
      "Content-Type": "application/json",
    },    
    body:kriter
  })
    .then((resp) => resp.json())
    .catch(function (error) {
      console.log(error);
    });

  return response;
};

const testUser = {
	id: "1",
	email: "murath31@gmail.com",
	password: "123456789",
};

const loginSchema = z.object({
	email: z.string().email({ message: "Geçersiz e-posta adresi" }).trim(),
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

	const { email, password } = result.data;

	if (email !== testUser.email || password !== testUser.password) {
		return {
			errors: {
				email: ["Kullanıcı adı ya da şifre geçersiz!"],

			},
		};
	}

	await createSession(testUser.id);

	redirect("/");
}

export async function logout() {
	await deleteSession();
	redirect("/login");
}
