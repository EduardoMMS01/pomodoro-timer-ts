import { HistoryContainer, HistoryList } from "./styles";

export function History () {
    return (
        <HistoryContainer>
            <h1>Histórico de atividades</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td>Concluído</td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td>Concluído</td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td>Concluído</td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td>Concluído</td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td>Concluído</td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}