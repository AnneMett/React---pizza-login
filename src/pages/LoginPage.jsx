import { useState } from 'react'
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            const user = userCredential.user;
            sessionStorage.setItem('user', user.email);
            navigate("/admin1");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1 style={{ marginTop: "155px" }}>Login side</h1>
            <form onSubmit={handleSubmit} className='login-form'>
                <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="useremail"
                />
                <input
                    type="password"
                    placeholder="Your Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="userpassword"
                />
                <button type="submit" className='login-button'>Login</button>
            </form>
            
        </div>
    )
}