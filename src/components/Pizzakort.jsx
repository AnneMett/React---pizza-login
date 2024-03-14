export default function Pizzakort({pizza, handleInput}) {
return(
    <p>
    {pizza.nummer}. {pizza.navn} til {pizza.pris}kr. stk. <br />
    {pizza.ingrediense} <input type="checkbox" className='checkbox' name={pizza.nummer}
    value={pizza.nummer} onChange={handleInput}/> 
    </p>
)

}