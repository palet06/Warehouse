"use server";
import { ldapUsersReturnType } from "@/app/allowed-users/LdapUsersList";
import { prisma } from "../prisma";

export const saveAuthorizedPersonel = async (users: ldapUsersReturnType[]) => {
  const deletedRecords = await prisma.user.deleteMany({});
  if (deletedRecords) {
    if (users?.length == 1) {
      const user = await prisma.user.create({
        data: {
          ldapUserId: users[0].userId,
          email: users[0].mail,
          name: users[0].cn,
          role: users[0].userRole,
          createdDate: new Date(Date.now()),
        },
      });
      return user.id;
    }

    if (users?.length > 1) {
      const manyUsers = await prisma.user.createMany({
        data: users.map((user) => ({
          ldapUserId: user.userId,
          email: user.mail,
          name: user.cn,
          role: user.userRole,

          createdDate: new Date(Date.now()),
        })),
      });
      return manyUsers.count;
    }
  }
};

export const getAuthorizedUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUserByLdapUserId = async (ldapUserId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        ldapUserId: ldapUserId,
      },
    });
    return user;
  } catch (error) {
    return { message: "Veritabanı hatası" + error };
  }
};

export const createJob = async (
  schedule: string,
  name: string,
  isRunning: boolean
) => {
  const jobToSave = await prisma.job.create({
    data: { schedule: schedule, name: name, isRunning: isRunning },
  });
  if (jobToSave) {
    return 1;
  } else {
    return 0;
  }
};

export const creageLog = async (
  jobName: string,
  message: string,
  dataCount: number
) => {
  const currentTime = new Date(Date.now()).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    hourCycle: "h24",
    minute: "2-digit",
    second: "2-digit",
  });

  try {
    await prisma.log.create({
      data: {
        job: jobName,
        message: message,
        dataCount: dataCount,
        time: currentTime,
      },
    });

    

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/globalstate`, {
      method: "POST",
      cache: "no-store",
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {}
};

export const getLogs = async () => {
  try {
    const allLogs = await prisma.log.findMany({
      select: { job: true, message: true, time: true, dataCount: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    return allLogs;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {}
};
