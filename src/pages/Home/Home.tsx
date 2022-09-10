import { Play } from "phosphor-react";
import { CountdownStyled, FormStyled, HomeStyled, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { useState } from "react";

// Controlled Form = Form monitorado em tempo real {formulario de login, formularios simples}
// Uncontroled Form = Busco as informações somente quando necessário  {quando houver muitos inputs}
// onChange evento utilizado para monitorar a mudança do input
// passa o estado em value, para poder atualizar o valor do input em tempo real

const newCicleFormValidationSchema = zod.object({
	task: zod.string().min(1, "Informe a tarefa"),
	minutesAmount: zod.number()
	.min(5,"O ciclo precisa ser de no mínimo 5 minutos")
	.max(60, "O ciclo precisa ser de no máximo 60 minutos")

})

type NewCycleFormData = zod.infer<typeof newCicleFormValidationSchema>

interface Cycle {
	id: string,
	task: string,
	minutesAmount: number

}

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([])
  
	const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
		resolver: zodResolver(newCicleFormValidationSchema),
		defaultValues: {
			task: "",
			minutesAmount: 0
		}
	})

	function handleCreateNewCicle(data: NewCycleFormData){
		const newCycle: Cycle = {
			id: String(new Date().getTime()),
			minutesAmount: data.minutesAmount,
			task: data.task

		}

		setCycles([...cycles, newCycle])

		reset()
	}

	const task = watch("task")
	const isSubmitDisbled = !task
	
	return (
		<HomeStyled>
			<form action="" onSubmit={handleSubmit(handleCreateNewCicle)}>
				<FormStyled>
					<label htmlFor="task">Vou trabalhar em</label>
					<TaskInput 
					list="task-suggestions"
					type="text" id="task" 
					placeholder="De um nome para o seu projeto"
					{...register("task")}/>
					<datalist id="task-suggestions">
						<option value="Projeto 1"/>
						<option value="Projeto 2"/>
						<option value="Projeto 3"/>
						<option value="Projeto 4"/>
					</datalist>
					<label htmlFor="minutesAmount">durante</label>
					<MinutesAmountInput 
					type="number" 
					id="minutesAmount" 
					placeholder="00" 
					step={5} 
					min={5} 
					max={60} 
					{...register("minutesAmount", {valueAsNumber: true})}/>
					<span>minutos.</span>
				</FormStyled>
				<CountdownStyled>
					<span>0</span>
					<span>0</span>
					<Separator>:</Separator>
					<span>0</span>
					<span>0</span>
				</CountdownStyled>
				<StartCountdownButton disabled={isSubmitDisbled} type="submit">
					<Play size={24}/>Começar
				</StartCountdownButton> 
			</form>
		</HomeStyled>
	)
}
