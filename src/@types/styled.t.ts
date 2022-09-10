import "styled-components"
import { defaultTheme } from "../styles/themes/default"

type Themetype = typeof defaultTheme


//criando um tipagem para o módulo styled-components
declare module "styled-components" {
  export interface DefaultTheme extends Themetype {}
}