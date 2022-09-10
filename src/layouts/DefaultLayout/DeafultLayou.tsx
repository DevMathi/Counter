import { Header } from "../../components/Header/Header";
import {Outlet} from "react-router-dom"
import { LayoutStyle } from "./styles";
export function DefaultLayout(){
  return(
    <LayoutStyle>
      <Header/>
      <Outlet/>
    </LayoutStyle>
  )
}