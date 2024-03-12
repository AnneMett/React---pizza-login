export default function Pizzakort({pizza}) {
return(
    <p>
    {pizza.nummer}. {pizza.navn} til {pizza.pris}kr. stk. <br />
    {pizza.ingrediense} <input type="checkbox" /> </p>
)

}