import "./globals.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ModalProvider } from "./context/ModalContext";
import AuthModal from "./components/Modals/AuthModal";
import BookingModal from "./components/Modals/BoockingModal";

export const metadata = {
  title: "Smile",
  description: "Modern dental clinic",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <ModalProvider>
          <Header />
          {children}
          <Footer />
          {/* Рендерим глобальные модалки */}
          <AuthModal />
          <BookingModal />
        </ModalProvider>
      </body>
    </html>
  );
}