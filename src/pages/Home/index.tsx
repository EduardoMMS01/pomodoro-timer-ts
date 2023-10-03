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
// não consegue ler um código Javascript

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

// interface NewCycleFormData {
//     task: string,
//     minutesAmount: number
// }

// Poderia usar dessa maneira para a tipagem, mas o zod já infere
// a tipagem através da função .infer


export function Home () {

    const { handleSubmit, register, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    function handleCreateNewCycle (data: any) {
        console.log(data)
        reset()
    }

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
                    <span>0</span>
                    <span>0</span>
                    <TwoPointsContainer>:</TwoPointsContainer>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <CountDownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Começar
                </CountDownButton>
            </form>
        </HomeContainer>
    )
}