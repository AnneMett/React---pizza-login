import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import Pizzakort from "../components/Pizzakort";

export default function PizzaPlace() {

// "posts" kommer til at indeholde listen af pizzaer
const [posts, setPosts] = useState([]);
/* "isPosts" kan være enten "true" (hvis der er pizzer), eller
"false" hvis ingen pizzer der er. */
const [isPosts, setIsPosts]= useState(true);


// data hentes fra firebase go gemmes i "post" variabel
useEffect(()=>{
    async function getPosts(){
        const url = "https://pizzaprojects-default-rtdb.europe-west1.firebasedatabase.app/Pizza.json";


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




    return (
        <section className="page">
        <h1>	&#127829; PIZZA MENU 	<span>&#127829;</span></h1>
        {isPosts ? (
            <form>
                {posts.map((pizzaobjekt) => (
                    <Pizzakort key={pizzaobjekt.id} pizza={pizzaobjekt} />
                ))}
            </form>
        ) : (
            <p>der er ingen pizzaer at se &#128534; </p>
        )}
        <p><Link to="/login">Login</Link></p>
        </section>
    )
}