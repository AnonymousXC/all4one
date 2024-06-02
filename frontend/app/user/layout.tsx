import "./global.css";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "@/components/global/sidebar/Sidebar";
import "./global.css"
import NavBar from "@/components/global/navbar/NavigationBar";
import getUser from "@/database/getUser";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getUser()

  if(user.data.user === null)
    redirect('/login')

  return (
      <main className="flex">
        <Sidebar />
        <div className="flex-1">
          <NavBar />
          {children}
        </div>
      </main>
  );
}
