import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;

const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(
  userId: string,
  expires: number,
  tokdenData: string,
  userRole: string
) {
  const session = await encrypt({ userId, expires, tokdenData, userRole });
  //const isProduction = process.env.NODE_ENV === "production";

  (await cookies()).set("session", session, {
    httpOnly: false, //deploy ederken true yapabiliriz (isProduction)
    secure: false, // https olacaksa true yapacağız

    expires: new Date(expires * 1000),
  });
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

type SessionPayload = {
  userId: string;
  expires: number;
  tokdenData: string;
  userRole: string;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setAudience(payload.tokdenData)
    .setExpirationTime(payload.expires)
    .setSubject(payload.userRole)
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log("Session doğrulanırken hata oluştu.");
  }
}
