import {
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import { ProtectRoute } from "./hooks/protectRoutes";
import { ContactsPage } from "./pages/ContactsPage";
function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleTheme = () => {
    setIsDark((isDark) => !isDark);
  };

  return (
    <div className="h-screen w-screen dark:bg-darkMain">
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectRoute />}>
          <Route path="/contacts" element={<ContactsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
