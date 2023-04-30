import { ToastContainer } from "react-toastify";

function Layout({ children }) {
  return (
    <>
      <h1>Navbar</h1>

      <div className="bg-gray-100 h-screen p-10">
        <div className="container mx-auto h-full">{children}</div>
      </div>

      <ToastContainer />
    </>
  );
}

export default Layout;
