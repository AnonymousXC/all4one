import "./global.css";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "@/components/global/sidebar/Sidebar";
import "./global.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="flex">
        <Sidebar />
        {children}
      </main>
  );
}
