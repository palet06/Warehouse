import ldap, { Client, SearchOptions, SearchEntry } from "ldapjs";

const ldapUrl = process.env.LDAP_URL;
const baseDN = process.env.LDAP_BASE_DN;
const username = process.env.LDAP_USERNAME;
const password = process.env.LDAP_PASSWORD;

// const ldapUrl = "ldap://calisma.local:389"
// const baseDN = "OU=UluslarArasiIsgucuGM,OU=Merkez,OU=Kullanicilar,OU=CalismaBakanligi,DC=calisma,DC=local"
// const username = "AdControlUser@calisma.local"
// const password = "123456!"

export const authenticate = (): Promise<Client> => {
  console.log(ldapUrl,baseDN,username,password)



  return new Promise((resolve, reject) => {
    const client: Client = ldap.createClient({ url: ldapUrl! });

    client.bind(username!, password!, (err) => {
      if (err) {
        console.error("LDAP bind error:", err);
        return reject(err);
      }
      resolve(client);
    });
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const searchAllUsers = async (): Promise<any[]> => {
  const client = await authenticate();

  return new Promise((resolve, reject) => {
    const opts: SearchOptions = {
      filter: `(objectClass=user)`, 
      scope: "sub",
      attributes: [
        "sAMAccountName",
        "userPrincipalName",
        "dn",
        "sn",
        "cn",
        "mail",
      ],
    };

    client.search(baseDN!, opts, (err, search) => {
      if (err) {
        console.error("LDAP search error:", err);
        return reject(err);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const users: any[] = [];

      search.on("searchEntry", (entry: SearchEntry) => {
        const user = {
          dn: entry.dn.toString(),
          sn:
            entry.attributes.find((attr) => attr.type === "sn")?.values[0] ||
            "",
          cn:
            entry.attributes.find((attr) => attr.type === "cn")?.values[0] ||
            "",
          mail:
            entry.attributes.find((attr) => attr.type === "mail")?.values[0] ||
            "",
          userId:
            entry.attributes.find((attr) => attr.type === "sAMAccountName")
              ?.values[0] || "",
          userPrincipalName:
            entry.attributes.find((attr) => attr.type === "userPrincipalName")
              ?.values[0] || "",
        };
        users.push(user);
      });
      console.log("ldapconfig deki users değeri",users)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      search.on("end", (result) => {
        client.unbind();
        resolve(users);
      });
    });
  });
};
