import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from "date-fns"
import { HandPalm, Play } from "phosphor-react"
import { 
    CountDownContainer, 
    FormContainer, HomeContainer, 
    TwoPointsContainer, 
    StartCountDownButton, 
    StopCountDownButton,
    TextInput, 
    NumberInput 
} from "./styles"


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1),
    minutesAmount: zod.number().min(5).max(60)
})

// O typeof precisa ser inserido no generics pois o Typescript 
// não consegue ler um código Javascript.
// Alternativamente, uma interface poderia ser criada sem problema algum.

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

export function Home () {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmoutSecondsPassed] = useState(0)

    const { handleSubmit, register, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    function handleCreateNewCycle (data: NewCycleFormData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }
        
        setCycles(state => [...state, newCycle])
        setActiveCycleId(newCycle.id)
        setAmoutSecondsPassed(0)
        
        reset()
    }

    function handleInterruptCycle () {
        setCycles((state) => 
            state.map(item => {
                if (item.id === activeCycleId) {
                    return {...item, interruptedDate: new Date()}
                } else {
                    return item
                }
            })
        )

        document.title = 'Pomodoro Timer'

        setActiveCycleId(null)
    }
    
    const activeCycle = cycles.find(item => item.id === activeCycleId)
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)
                
                if (secondsDifference >= totalSeconds) {
                    setCycles((state) => 
                        state.map(item => {
                            if (item.id === activeCycleId) {
                                return {...item, finishedDate: new Date()}
                            } else {
                                return item
                            }
                        })
                    )

                    setAmoutSecondsPassed(totalSeconds)
                    clearInterval(interval)
                    
                } else {
                    setAmoutSecondsPassed(secondsDifference)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds])

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds} (${activeCycle.task})`
        }
    }, [activeCycle, minutes, seconds])

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TextInput id="task" 
                        list="task-suggestions"
                        // !! Converte para boolean. Se tiver algum 
                        // valor dentro será true, senão false.
                        disabled={!!activeCycle}
                        placeholder="Dê um nome para seu projeto"
                        {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="Opção 1" />
                        <option value="Opção 1" />
                        <option value="Opção 3" />
                        <option value="Churros" />
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <NumberInput id="minutesAmount" 
                        type="number" 
                        disabled={!!activeCycle}
                        placeholder="00"
                        min={5}
                        max={60}
                        step={5}
                        {...register('minutesAmount', {valueAsNumber: true})}
                    />

                    <span>minutos.</span>
                </FormContainer>
            

                <CountDownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <TwoPointsContainer>:</TwoPointsContainer>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountDownContainer>

                {
                    activeCycle ? (
                        <StopCountDownButton onClick={handleInterruptCycle} type="button">
                            <HandPalm size={24} />
                            Interromper
                        </StopCountDownButton>
                    ) : (
                        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                            <Play size={24} />
                            Começar
                        </StartCountDownButton>
                    )
                }
                
            </form>
        </HomeContainer>
    )
}