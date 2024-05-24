import "./global.css";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "@/components/global/sidebar/Sidebar";
import "./global.css"
import NavBar from "@/components/global/navbar/NavigationBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
