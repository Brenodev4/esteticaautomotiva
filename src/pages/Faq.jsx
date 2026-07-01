import Navbar from '../components/Navbar.jsx'

function Faq({ usuario, setUsuario }) {

  const perguntas = [
    {
      pergunta: 'Quanto tempo demora uma lavagem completa?',
      resposta: 'O serviço leva em média de 1 a 2 horas.'
    },
    {
      pergunta: 'A vitrificação protege a pintura?',
      resposta: 'Sim. A vitrificação cria uma camada de proteção e brilho na pintura.'
    },
    {
      pergunta: 'Precisa agendar horário?',
      resposta: 'Sim, recomendamos realizar o agendamento antecipadamente.'
    },
    {
      pergunta: 'Quais formas de pagamento são aceitas?',
      resposta: 'Aceitamos PIX, cartão de crédito, débito e dinheiro.'
    },
    {
      pergunta: 'Fazem higienização interna?',
      resposta: 'Sim. Trabalhamos com higienização completa interna.'
    },
    {
      pergunta: 'O polimento remove riscos?',
      resposta: 'Riscos superficiais podem ser removidos com polimento técnico.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <Navbar usuario={usuario} setUsuario={setUsuario} />

      <div className="max-w-4xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold mb-2">
          FAQ
        </h1>

        <p className="text-gray-400 mb-8">
          Perguntas frequentes dos clientes
        </p>

        <div className="space-y-4">

          {perguntas.map((item, index) => (
            <div
              key={index}
              className="
                bg-gray-900
                border border-gray-800
                rounded-2xl
                p-6
                hover:border-yellow-500
                transition
              "
            >
              <h2 className="text-lg font-bold text-yellow-400">
                {item.pergunta}
              </h2>

              <p className="text-gray-300 mt-3">
                {item.resposta}
              </p>
            </div>
          ))}

        </div>

      </div>
    </div>
  )
}

export default Faq