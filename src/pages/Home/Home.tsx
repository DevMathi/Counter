import { HandPalm, Play } from "phosphor-react";
import {  HomeStyled,StartCountdownButton, StopCountdownButton} from "./styles";
import { createContext,useState } from "react";
import { NewCycleForm } from "./Components/NewCycleForm/NewCycleForm";
import { Countdown } from "./Components/Countdown/Countdown";
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

// Controlled Form = Form monitorado em tempo real {formulario de login, formularios simples}
// Uncontroled Form = Busco as informações somente quando necessário  {quando houver muitos inputs}
// onChange evento utilizado para monitorar a mudança do input
// passa o estado em value, para poder atualizar o valor do input em tempo real



interface Cycle {
	id: string,
	task: string,
	minutesAmount: number,
	startDate: Date,
	interruptedDate?: Date,
	finishedDate?: Date

}

interface CyclesContextType {
	activeCycle: Cycle | undefined
	activeCycleId: string | null
	amountSecondsPassed: number
	markCurrentCycleAsFinished: () => void
	setSecondsPassed: (seconds: number) => void

}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([])
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
	const [amountSecondsPassed, setAmountSecondsPassed ] = useState(0)

	function setSecondsPassed(seconds: number){
		setAmountSecondsPassed(seconds)
	}

	const newCicleFormValidationSchema = zod.object({
		task: zod.string().min(1, "Informe a tarefa"),
		minutesAmount: zod.number()
		.min(5,"O ciclo precisa ser de no mínimo 5 minutos")
		.max(60, "O ciclo precisa ser de no máximo 60 minutos")
	})

	type NewCycleFormData = zod.infer<typeof newCicleFormValidationSchema>
	const newCycleForm = useForm<NewCycleFormData>({
		resolver: zodResolver(newCicleFormValidationSchema),
		defaultValues: {
			task: "",
			minutesAmount: 0
		}
	})
	const {handleSubmit, watch, reset} = newCycleForm
	
	const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

	function markCurrentCycleAsFinished(){
		setCycles(state =>
			state.map(cycle => {
				if(cycle.id === activeCycleId){
					return { ...cycle, finishedDate: new Date()}
				}else {
					return cycle
				}
			})
		)
	}
	
	function handleCreateNewCicle(data: NewCycleFormData){
		const newCycle: Cycle = {
			id: String(new Date().getTime()),
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date()
		}
		 
		setCycles(state => [...state, newCycle])
		setActiveCycleId(newCycle.id)
		setAmountSecondsPassed(0)
		reset()
	}

	function handleInterruptCycle(){
		setCycles(state =>
			state.map(cycle => {
				if(cycle.id === activeCycleId){
					return { ...cycle, interruptedDate: new Date()}
				}else {
					return cycle
				}
			})
		)
		setActiveCycleId(null)
	}

	const task = watch("task")
	const isSubmitDisbled = !task
	
	return (
		<HomeStyled>
			<form   onSubmit={handleSubmit(handleCreateNewCicle)}  action="">
				<CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished, setSecondsPassed, amountSecondsPassed}}>
					 <FormProvider {...newCycleForm}>
							<NewCycleForm/> 
					 </FormProvider>
					<Countdown/>
				</CyclesContext.Provider>
				{activeCycle ? (
				<StopCountdownButton  type="button" onClick={handleInterruptCycle}>
					<HandPalm size={24}/>Interromper
				</StopCountdownButton>): (
				<StartCountdownButton  disabled={isSubmitDisbled}  type="submit">
					<Play size={24}/>Play
				</StartCountdownButton>) }
			</form>
		</HomeStyled>
	)
}
