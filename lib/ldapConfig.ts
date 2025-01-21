import ldap, { Client, SearchOptions, SearchEntry } from 'ldapjs';

const ldapUrl = 'ldap://calisma.local:389';
const baseDN = 'OU=UluslarArasiIsgucuGM,OU=Merkez,OU=Kullanicilar,OU=CalismaBakanligi,DC=calisma,DC=local';
const username = 'AdControlUser@calisma.local';
const password = '123456!';

export const authenticate = (): Promise<Client> => {
    return new Promise((resolve, reject) => {
      const client: Client = ldap.createClient({ url: ldapUrl });
  
      client.bind(username, password, (err) => {
        if (err) {
          console.error('LDAP bind error:', err);
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
        filter: '(objectClass=user)', // Kullanıcıları almak için filtre
        // filter:"(samAccountName=murat.hayaloglu)",
        scope: 'sub', // Alt düzeyde arama
        attributes: ['dn', 'sn', 'cn', 'mail'], // İstediğiniz özellikler
      };
  
      client.search(baseDN, opts, (err, search) => {
        if (err) {
          console.error('LDAP arama hatası:', err);
          return reject(err);
        }
  
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const users: any[] = [];
  
        search.on('searchEntry', (entry: SearchEntry) => {
          const user = {
            //dn: entry.dn,
            sn: entry.attributes.find(attr => attr.type === 'sn')?.values[0] || '', // soyadı
            cn: entry.attributes.find(attr => attr.type === 'cn')?.values[0] || '', // ad
            mail: entry.attributes.find(attr => attr.type === 'mail')?.values[0] || '', // e-posta
          };
          users.push(user); // Kullanıcıyı listeye ekle
        });
  
        search.on('searchReference', (referral) => {
          console.log('Referral:', referral.uris.join());
        });
  
        search.on('error', (err) => {
          console.error('Arama hatası:', err);
          return reject(err);
        });
  
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        search.on('end', (result:any) => {
          console.log('Arama durumu:', result.status);
          client.unbind(); // Bağlantıyı kapat
          resolve(users); // Kullanıcı listesini döndür
        });
      });
    });
  };



  export const searchBySamAccountName = async (samAccountName: string): Promise<any[]> => {
    const client = await authenticate();
  
    return new Promise((resolve, reject) => {
      const opts: SearchOptions = {
        filter: `(samAccountName=${samAccountName})`, // Kullanıcı adı ile arama
        scope: 'sub',
        attributes: ['dn', 'sn', 'cn', 'mail'],
      };
  
      client.search(baseDN, opts, (err, search) => {
        if (err) {
          console.error('LDAP search error:', err);
          return reject(err);
        }
  
        const users: any[] = [];
  
        search.on('searchEntry', (entry: SearchEntry) => {
          const user = {
            dn: entry.dn.toString(),
            sn: entry.attributes.find(attr => attr.type === 'sn')?.values[0] || '',
            cn: entry.attributes.find(attr => attr.type === 'cn')?.values[0] || '',
            mail: entry.attributes.find(attr => attr.type === 'mail')?.values[0] || '',
          };
          users.push(user);
        });
  
        search.on('end', (result) => {
          client.unbind();
          resolve(users);
        });
      });
    });
  };

