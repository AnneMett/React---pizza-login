export default function Bestillingskort({bestilling, handleButton}){
    return(
        <div style={{display: "flex", width: "1200px", justifyContent: "space-between"}}>
        <div>Navn: {bestilling.navn}</div>
        <div>Email: {bestilling.email}</div>
        <div>Mobilnr: {bestilling.mobilnummer}</div>
        <div>Pizzaer: {bestilling.pizzaer.join(", ")}</div>
        {bestilling.status === "Ny bestilling" ?
        
        <div>
            <span style={{fontWeight: "bold"}}>{bestilling.status}</span>
            <button type="button" data-knap="skiftstatus" value={bestilling.id} onClick=
            {handleButton}>I gang</button>
        </div>
        :
        <div>
            <span style={{fontWeight: "bold"}}>{bestilling.status}</span>
            <button type="button" data-knap="slet" value={bestilling.id} onClick=
            {handleButton}>Slet</button>
        </div>
        }           
    </div>
    )
}