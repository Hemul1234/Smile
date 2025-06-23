import "./globals.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ModalProvider } from "./context/ModalContext";
import AuthModal from "./components/Modals/AuthModal";
import BookingModal from "./components/Modals/BoockingModal";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Smile",
  description: "Modern dental clinic",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <AuthProvider>
          <ModalProvider>
            <Header />
            {children}
            <Footer />
            <AuthModal />
            <BookingModal />
          </ModalProvider>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}