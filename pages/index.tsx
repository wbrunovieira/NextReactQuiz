import Head from 'next/head';
import { useEffect, useState } from 'react';
import Questionario  from '../components/Questionario';
import questao from '../model/questao';
import QuestaoModel from '../model/questao';
import { useRouter } from 'next/router';

import styles from '../styles/Home.module.css'


const BASE_URL = 'http://localhost:3000/api'

export default function Home() {
  const router = useRouter();
  
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>();
  const [respostaCertas, setRespostasCertas] = useState<number>(0);

  async function carregarIdsDasQuestoes(){
      const resp = await fetch(`${BASE_URL}/questionario`);
      const idsDasQuestoes = await resp.json();
      setIdsDasQuestoes(idsDasQuestoes);
  }
   
  async function carregarQuestao(idQuestao: number){
      const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`);
      const json = await resp.json();
      const novaQuestao = QuestaoModel.criarUsandoObjeto(json);
      setQuestao(novaQuestao);
      console.log(QuestaoModel.criarUsandoObjeto(json))
  }

  useEffect(() => {
      carregarIdsDasQuestoes()
      
  }, []);

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])

    function questaoRespondida(questaoRespondida: QuestaoModel){
      setQuestao(questaoRespondida);
      const acertou = questaoRespondida.acertou;
      setRespostasCertas(respostaCertas + (acertou ? 1 : 0));
      
    }

    function idProximaPergunta() {
      if(questao) {

        const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1
        return idsDasQuestoes[proximoIndice]
      }
    }

    function irPraProximoPasso(){
      const proximoId = idProximaPergunta()
      proximoId ? irParaProximaQuestao(proximoId) : finalizar()
    }

    function irParaProximaQuestao(proximoId: number) {
      carregarQuestao(proximoId);
    }
    
    function finalizar() {
      router.push({
        pathname: "/resultado",
        query: {
          total: idsDasQuestoes.length,
          certas: respostaCertas
        }
      })

    }

  return questao ? (
   
    
    <Questionario 
    questao={questao}
    ultima={idProximaPergunta() === undefined}
    questaoRespondida={questaoRespondida}
    irPraProximoPasso={irPraProximoPasso}
     />
   
    
  ) : false
}
