import Head from 'next/head'
import { useEffect, useState } from 'react'
import Questionario  from '../components/Questionario'
import questao from '../model/questao'
import QuestaoModel from '../model/questao'
import RespostaModel from '../model/resposta'
import styles from '../styles/Home.module.css'

const questaoMock = new QuestaoModel(1, 'Melhor cor',[
  RespostaModel.errada('Verde'),
  RespostaModel.errada('Vermelha'),
  RespostaModel.errada('Azul'),
  RespostaModel.certa('Preta'),

  ])

  const BASE_URL = 'http://localhost:3000/api'

export default function Home() {

  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>(questaoMock);

  async function carregarIdsDasQuestoes(){
    const resp = await fetch(`${BASE_URL}/questionatio`);
    const idsDasQuestoes = await resp.json();
    setIdsDasQuestoes(idsDasQuestoes);
  }
  async function carregarQuestao(idQuestao: number){
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`);
    const json = await resp.json();
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json);
    setQuestao(novaQuestao);
  }

  useEffect(() => {
    carregarIdsDasQuestoes()
    console.log(idsDasQuestoes)
  }, []);

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes]);

    function questaoRespondida(questao: QuestaoModel){

    }

    function irPraProximoPasso(){

    }

  return questao ? (
   
    
    <Questionario 
    questao={questao}
    ultima={false}
    questaoRespondida={questaoRespondida}
    irPraProximoPasso={irPraProximoPasso}
     />
   
    
  ) : false
}
