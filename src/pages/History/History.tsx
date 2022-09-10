import { HistoryListStyled, HistoryStyled, StatusStyled } from "./styles";

export function History(){
  return (
		<HistoryStyled>
			<h1>
				Meu Histórico
			</h1>
			<HistoryListStyled>
				<table>
					<thead>
						<tr>
							<th>
								Tarefa
							</th>
							<th>
								Duração
							</th>
							<th>
								Início
							</th>
							<th>
								Status
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								Tarefa
							</td>
							<td>
								20 Minutos
							</td>
							<td>
								Há cerca de 2 mesess
							</td>
							<td>
								<StatusStyled statusColor="red">
									Concluido
								</StatusStyled>
							</td>
						</tr>
						<tr>
							<td>
								Tarefa
							</td>
							<td>
								20 Minutos
							</td>
							<td>
								Há cerca de 2 mesess
							</td>
							<td>
								<StatusStyled statusColor="green">
									Concluido
								</StatusStyled>
							</td>
						</tr>
						<tr>
							<td>
								Tarefa
							</td>
							<td>
								20 Minutos
							</td>
							<td>
								Há cerca de 2 mesess
							</td>
							<td>
								<StatusStyled statusColor="yellow">
									Concluido
								</StatusStyled>
							</td>
						</tr>
						<tr>
							<td>
								Tarefa
							</td>
							<td>
								20 Minutos
							</td>
							<td>
								Há cerca de 2 mesess
							</td>
							<td>
								<StatusStyled statusColor="red">
									Concluido
								</StatusStyled>
							</td>
						</tr>
					</tbody>
				</table>
			</HistoryListStyled>
		</HistoryStyled>
	)
}