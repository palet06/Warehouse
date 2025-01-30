import { SearchableDataTable } from "@/components/SearchableDataTable";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

const Home = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  
  
  return <SearchableDataTable userName={session?.userId as string}  userToken={session?.aud as string} />;
};

export default Home;
