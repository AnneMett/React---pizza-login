import { NavLink } from "react-router-dom";

export default function Nav() {
    return (
        <nav>
            <NavLink to="/">Hjem</NavLink>
            <NavLink to="/admin1">Ejer</NavLink>
            <NavLink to="/admin2">Pizzabager</NavLink>
        </nav>
    );
}
