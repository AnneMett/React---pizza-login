import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase-config';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Bestillingskort from "../components/Bestillingskort";

export default function Admin2Page() {

    const userInSession = sessionStorage.getItem('user');

    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [isPosts, setItPosts]= useState(true);
    const [status, setStatus] =useState("");
    const [aktiveBestillinger, setAktiveBestillinger]=useState([]);
    const [nyeBestillinger, setNyeBestillinger]=useState([]);

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

    useEffect(() => {
        async function getPosts(){
            const url ='https://pizzaprojects-default-rtdb.europe-west1.firebasedatabase.app/bestilling.json';

            // vent indtil response modtager positivt svar fra firebase
            const response = await fetch(url);
            // læs json data (listen af pizzaer) over i variablen "data"
            const data = await response.json();

            /* tjek om der faktisk er pizzaer på listen (positiv hvis
                forskellig fra null) */
            if (data !==null){
                const postArray = Object.keys(data).map((key)=>
                ({
                    id: key,
                    ...data[key],
                }));
                setPosts(postArray)
                //console.log(postArray);
            } else {
                setItPosts(false);
            }
        }

    getPosts();

    // Filtrering af bestillinger efter "i gang" eller "ny bestilling"
    setAktiveBestillinger(posts.filter(bestilling => bestilling.status === "I gang"));
    setNyeBestillinger(posts.filter(bestilling => bestilling.status === "Ny bestilling"));

    }, [status, posts]);


function handleButton(event) {
    const id = event.target.value;
    const handling = event.target.dataset.knap;
    const url =`https://pizzaprojects-default-rtdb.europe-west1.firebasedatabase.app/bestilling/${id}.json`;
 


    if (handling === "skiftstatus") {
        fetch(url, {
            method: 'PATCH', //brug PATCH til at opdatere eksisterende data 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({status: 'I gang'}), // ny status værdi
        })
            .then((response)=>{
            if (!response.ok) {
                throw new Error('Fejl ved ændring af status');
            }
                setStatus('status blev ændret for bestilling til "i gang" ')
        })
        .catch((error) =>{
            setStatus ('Fejl ved ændring af satus', error)
        });
    } else { //gør det her når handling = "slet"
        fetch(url, {
            method: 'DELETE'
        })

            .then((response) =>{
                if(!response.ok) {
                    throw new Error('Fejl ved sletning af bestilling');
                }
                setStatus('Bestillingen blev slettet')
            })
            .catch((error)=>{
                setStatus('Fejl ved sletning af bestilling', error)
            });
        }
}

    return (
        <section className="page">
            <h1 className="altfont">Bestillinger</h1>
            <p>{status}</p>
            {nyeBestillinger.length > 0 && isPosts ? (
                <div>
                    {nyeBestillinger.map((bestillingsobjekt)=>(
                        <Bestillingskort key={bestillingsobjekt.id} bestilling={bestillingsobjekt}
                        handleButton={handleButton} />
                    ))}
                </div>
            ):(
                <p>Ingen nye bestillinger at vise</p>
            )}
            <hr />
            {aktiveBestillinger.length > 0 && isPosts ? (
                 <div>
                 {aktiveBestillinger.map((bestillingsobjekt)=>(
                     <Bestillingskort key={bestillingsobjekt.id} bestilling={bestillingsobjekt}
                     handleButton={handleButton} />
                 ))}
             </div>
            ) : (
                <p>Ingen igangværende bestillinger at vise</p>
            )}
            
            <h2> Du er logget på som {user&&userInSession && user.email}</h2>
            <button className='login-button' onClick={handleLogout}>Logout</button>
        </section>

    )}
