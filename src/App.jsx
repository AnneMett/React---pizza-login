import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import Admin1Side from "./pages/Admin1Page";
import Admin2Side from "./pages/Admin2Page";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from './firebase-config';
import PizzaPlace from "./pages/PizzaPlace";

function App() {

    // Sætter en eventlistener for at registrerer, når brugeren lukker
    // browseren/fanebladet. Hvis det sker, logges brugeren ud.
    useEffect(() => {
        async function handleTabClose() {
          await signOut(auth);
        }
    
        // Sætter eventlistener
        window.addEventListener('beforeunload', handleTabClose);
    
        // Fjerner eventlistener
        return () => {
          window.removeEventListener('beforeunload', handleTabClose);
        };
      }, []);

    return (
        <>
            <Nav />
            <main>
                <Routes>
                    <Route path="/" element={<PizzaPlace />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin1" element={<Admin1Side />} />
                    <Route path="/admin2" element={<Admin2Side />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
