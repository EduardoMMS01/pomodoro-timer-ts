import { HeaderContainer } from "./styles";
import { Student, Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header () {
    return (
        <HeaderContainer>
            <Student size={26} />
            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={26} />
                </NavLink>
                <NavLink to="/history" title="History">
                    <Scroll size={26} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}