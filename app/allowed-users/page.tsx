import React from "react";
import LdapUsersList from "./LdapUsersList";
import { getUserByLdapUserId } from "@/lib/serveractions/prismaActions";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { redirect } from "next/navigation";

const AllowedUsers = async () => {
  const cookie = (await cookies()).get("session")?.value;

  const session = await decrypt(cookie);
  const user = (await getUserByLdapUserId(
    session?.userId!.toString()
  )) as Prisma.UserCreateInput;
  if (user.role != "Admin") {
    redirect("/");
  }
  return (
    <div>
      <LdapUsersList userName={session?.userId!.toString()} />
    </div>
  );
};

export default AllowedUsers;
