import Head from 'next/head'
import { useState } from 'react'
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

export default function Home() {

  const [questao, setQuestao] = useState(questaoMock);

    function questaoRespondida(questao: QuestaoModel){

    }

    function irPraProximoPasso(){

    }

  return (
    <div style={{
      display:'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
    
    <Questionario 
    questao={questao}
    ultima={true}
    questaoRespondida={questaoRespondida}
    irPraProximoPasso ={irPraProximoPasso}
     />
   
    </div>
  )
}
