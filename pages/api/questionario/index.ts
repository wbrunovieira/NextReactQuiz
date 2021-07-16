import { embaralhar } from "../../../functions/arrays";
import questao from "../../../model/questao";
import questoes from "../bancoDeQuestoes";

export default (req, res) => {
    
    const ids = questoes.map(questao => questao.id);
    res.status(200).json(embaralhar(ids));
}