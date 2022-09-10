import { HeaderStyle } from "./styles";
import LogoImg from "../../assets/logo.svg"
import { Timer, Scroll} from "phosphor-react"
import { NavLink } from "react-router-dom";

export function Header(){
  return(
    <HeaderStyle>
      <img src={LogoImg} alt=""/>
      <nav>
        <NavLink to="/" title="Timer"><Timer size={24}/></NavLink>
        <NavLink to="/history" title="Histórico"><Scroll size={24}/></NavLink>
      </nav>
      
    </HeaderStyle>
  )
}