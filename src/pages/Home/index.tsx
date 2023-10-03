import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Play } from "phosphor-react"
import { 
    CountDownContainer, 
    FormContainer, HomeContainer, 
    TwoPointsContainer, 
    CountDownButton, 
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
            minutesAmount: data.minutesAmount
        }

        setCycles(state => [...state, newCycle])
        setActiveCycleId(newCycle.id)

        reset()
    }

    const activeCycle = cycles.find(item => item.id === activeCycleId)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TextInput id="task" 
                        list="task-suggestions" 
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

                <CountDownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Começar
                </CountDownButton>
            </form>
        </HomeContainer>
    )
}