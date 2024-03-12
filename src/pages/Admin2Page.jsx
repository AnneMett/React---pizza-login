import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase-config';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function Admin2Page() {

    const userInSession = sessionStorage.getItem('user');

    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
            if (loading) return;
            if (!user) return navigate("/login");
    }, [user, loading, navigate]);

    async function handleLogout() {
        try {
            await signOut(auth);
            sessionStorage.removeItem('user');
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="page">
            <h1>Admin2 side</h1>
            <h2>Du er logget på som {userInSession && user.email}</h2>
            <button onClick={handleLogout}>Logout</button>
        </section>
    )
}
