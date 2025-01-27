"use server";

import { cookies } from "next/headers";

import { decrypt } from "@/lib/session";

export const GetStatistics = async (
  islemTuru: number

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  const url = `https://eizin.csgb.gov.tr/api/ic/basvuruIstatistik/istatistikBilgisleri?islemTuru=${islemTuru}`;

  const response = await fetch(url, {
    method: "GET",

    headers: {
      authorization: session?.aud as string,
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .catch(function (error) {
      console.log(error);
    });

  return response;
};
