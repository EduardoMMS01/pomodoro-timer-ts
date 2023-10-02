import { 
    CountDownContainer, 
    FormContainer, HomeContainer, 
    TwoPointsContainer, 
    CountDownButton, 
    TextInput, 
    NumberInput 
} from "./styles"
import { Play } from "phosphor-react"

export function Home () {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TextInput id="task" 
                        list="task-suggestions" 
                        placeholder="Dê um nome para seu projeto" 
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
                        max={5}
                        step={5}
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

                <CountDownButton disabled type="submit">
                    <Play size={24} />
                    Começar
                </CountDownButton>
            </form>
        </HomeContainer>
    )
}