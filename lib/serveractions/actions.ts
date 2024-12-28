"use server";
import { ApiResponseType } from "@/app/types/data-types/dataTypes";
import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";


export const getdata = async (): Promise<ApiResponseType> => {
	const response: ApiResponseType = await new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				message: "Data fetched successfully",
				data: {
					content: [
						{
							id: "3546547",
							name: "Murat",
							surname: "Hayaloğlu",
							age: 30,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3657896",
							name: "ddd",
							surname: "dfdf",
							age: 51,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3654786",
							name: "Murat",
							surname: "Hayaloğlu",
							age: 30,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3657896",
							name: "ddd",
							surname: "dfdf",
							age: 51,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3654786",
							name: "Murat",
							surname: "Hayaloğlu",
							age: 30,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3657896",
							name: "ddd",
							surname: "dfdf",
							age: 51,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3654786",
							name: "Murat",
							surname: "Hayaloğlu",
							age: 30,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3657896",
							name: "ddd",
							surname: "dfdf",
							age: 51,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3654786",
							name: "Murat",
							surname: "Hayaloğlu",
							age: 30,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3657896",
							name: "ddd",
							surname: "dfdf",
							age: 51,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3654786",
							name: "Murat",
							surname: "Hayaloğlu",
							age: 30,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3657896",
							name: "ddd",
							surname: "dfdf",
							age: 51,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3654786",
							name: "Murat",
							surname: "Hayaloğlu",
							age: 30,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3657896",
							name: "ddd",
							surname: "dfdf",
							age: 51,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3654786",
							name: "Murat",
							surname: "Hayaloğlu",
							age: 30,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3657896",
							name: "ddd",
							surname: "dfdf",
							age: 51,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3654786",
							name: "Murat",
							surname: "Hayaloğlu",
							age: 30,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3657896",
							name: "ddd",
							surname: "dfdf",
							age: 51,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3654786",
							name: "Murat",
							surname: "Hayaloğlu",
							age: 30,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3657896",
							name: "ddd",
							surname: "dfdf",
							age: 51,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3654786",
							name: "Murat",
							surname: "Hayaloğlu",
							age: 30,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3657896",
							name: "ddd",
							surname: "dfdf",
							age: 51,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3654786",
							name: "Murat",
							surname: "Hayaloğlu",
							age: 30,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3657896",
							name: "ddd",
							surname: "dfdf",
							age: 51,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3654786",
							name: "Murat",
							surname: "Hayaloğlu",
							age: 30,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3657896",
							name: "ddd",
							surname: "dfdf",
							age: 51,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3654786",
							name: "Murat",
							surname: "Hayaloğlu",
							age: 30,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3657896",
							name: "ddd",
							surname: "dfdf",
							age: 51,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
						{
							id: "3654786",
							name: "Murat",
							surname: "Hayaloğlu",
							age: 30,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
					],
				},
			});
		}, 1000);
	});

	return response;
};

export const getdata2 = async (basvuruNo: string): Promise<ApiResponseType> => {
	const response: ApiResponseType = await new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				message: `${basvuruNo} numaralı başvuru verileri başarıyla getirildi`,
				data: {
					content: [
						{
							id: basvuruNo,
							name: "Murat",
							surname: "Hayaloğlu",
							age: 30,
							email: "murat.hayaloglu@csgb.gov.tr",
						},
					],
				},
			});
		}, 1000);
	});

	return response;
};

const testUser = {
	id: "1",
	email: "murath31@gmail.com",
	password: "12345678",
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
