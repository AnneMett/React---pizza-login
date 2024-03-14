import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import Pizzakort from "../components/Pizzakort";

export default function PizzaPlace() {

// "posts" kommer til at indeholde listen af pizzaer
const [posts, setPosts] = useState([]);
/* "isPosts" kan være enten "true" (hvis der er pizzaer), eller
"false" hvis ingen pizzaer der er. */
const [isPosts, setIsPosts]= useState(true);


const[navn, setNavn]=useState("");
const[email, setEmail] =useState("");
const[mobilnummer, setMobilnummer]=useState("");
const [status, setStatus]=useState("");

const[pizzaer, setPizzaer]=useState([]);


// data hentes fra firebase go gemmes i "post" variabel
useEffect(()=>{
    async function getPosts(){
        const url = 'https://pizzaprojects-default-rtdb.europe-west1.firebasedatabase.app/Pizza.json';


        // vent indtil response modatger positivtt scar fra firebase
        const response = await fetch(url);
        // læs json data (listen af pizzaer) over i variablen "data"
        const data = await response.json();


        /* tjek om der faktisk er pizzaer på listen (positiv hvis forskellig fra null) */  
        if(data!== null){
            const postsArray = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            setPosts(postsArray)
        } else {
            setIsPosts(false);
        }
    }
    getPosts();
},[]);


function handleInputChange(event){
    const {value, checked} = event.target;

    if(checked) {
        setPizzaer([...pizzaer, value])
    }
    else{
        const index = pizzaer.indexOf(value);
        pizzaer.splice(index, 1);
        setPizzaer(pizzaer);
    }
}

function handleSubmit(e) {
    e.preventDefault();

    if (pizzaer.length > 0) { // det følgende sker kun, hvis brugeren har valgt en pizza
    const url = 'https://pizzaprojects-default-rtdb.europe-west1.firebasedatabase.app/bestilling.json';

    const formData ={
        navn: navn,
        email: email, 
        mobilnummer: mobilnummer, 
        pizzaer: pizzaer,
        status: "Ny bestilling"
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type': 'application/json',
    },
    })
        .then((response) =>{
            if (!response.ok){
                throw new Error('Fejl ved gemning af formulardata');
            }
            setStatus('Bestillingen blev sendt.')
            // console.log('Formulardata gemt i Firebase Realtime Database.');
        })
        .catch((error) => {
            setStatus('Fejl ved afsendelse af bestilling' , error)
            // console.error8'Fejl ved gemning af fomulardata', error);       
        });
     } else { //hvis ikke brugeren har valgt en pizza:
    setStatus("Du skal vælge mindst én pizza fra menuen")
}
}





    return (
        <section className="page">
        <h1>	&#127829; PIZZA MENU 	<span>&#127829;</span></h1>
        {isPosts ? (
            <form onSubmit={handleSubmit}> 
                {posts.map((pizzaobjekt) => (
                    <Pizzakort key={pizzaobjekt.id} pizza={pizzaobjekt} 
                    handleInput={handleInputChange}/>
                ))}
            <input 
                type="text"
                name="navn"
                placeholder="Dit navn"
                value={navn}
                onChange={(e)=> setNavn(e.target.value)}
                required
            />
            <input 
                type="email"
                name="email"
                placeholder="Din email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
            />

            <input 
                type="number"
                name="mobilnummer"
                placeholder="Dit mobilnummer"
                value={mobilnummer}
                onChange={(e)=> setMobilnummer(e.target.value)}
                required
                />

            {status}
            <button className='login-button btn' type="submit">Send bestilling</button>
            </form>
        ) : (
            <p>der er ingen pizzaer at se &#128534; </p>
        )}
        <p><Link to="/login">Login</Link></p>
        </section>
    )
}