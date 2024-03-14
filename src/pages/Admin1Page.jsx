// Kræver installation "npm install --save react-firebase-hooks"
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

export default function Admin1Page() {

    const userInSession = sessionStorage.getItem('user');
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

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


    const [nummer, setNummer] = useState('');
    const [navn, setNavn] = useState('');
    const [ingrediense, setIngrediense] = useState('');
    const [pris, setPris] = useState('');
    const[status, setStatus] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const url ="https://pizzaprojects-default-rtdb.europe-west1.firebasedatabase.app/Pizza.json";


    const formData = {
        nummer: nummer,
        navn: navn,
        ingrediense: ingrediense,
        pris: pris,
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers:{
            'Content-type':'application/json',
        },
    })

    .then((response) => {
        if(!response.ok) {
            throw new Error('Fejl ved gemning af formulardata');
        }
        setStatus('Pizza gemt i Firebase Realtime Database.')
        //console.log('formulardata gemt i Firebase Realtime Database.');
    })
    .catch((error) => {
        setStatus('fejl ved gemning af formulardata:', error)
        //console.error ('Fejl ved gemning af formulardata:',error);
    });
    }


    return (
        <section className="page">
            <h1 className="altfont">Bruger side</h1>

        <h2>OPRET NY PIZZA</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Nummer:
                <input type="number" value={nummer} name="nummer" onChange={(e) => setNummer(e.target.value)} required/>
            </label>
            <br />
            <label>
                Navn:
                <input type="text" value={navn} name="navn" onChange={(e) => setNavn(e.target.value)} required/>
            </label>
            <br />
            <label>
                Ingredienser:
                <input type="text" value={ingrediense} name="ingrediense" onChange={(e) => setIngrediense(e.target.value)} required/>
            </label>
            <br />
            <label>
                Pris:
                <input type="number" value={pris} name="pris" onChange={(e) => setPris(e.target.value)} required/>
            </label>
            {status}
            <br />
            <button type="submit">Opret</button>
        </form>
        
            <h2>Du er logget på som {user&&userInSession && user.email}</h2>
            <button className='login-button' onClick={handleLogout}>Logout</button>
        </section>
    )

}
