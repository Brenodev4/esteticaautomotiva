import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar.jsx'

function Servicos({ usuario, setUsuario }) {
  const [servicos, setServicos] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')

  // busca todos os serviços ao abrir a tela
  useEffect(() => {
    buscarServicos()
  }, [])

  async function buscarServicos() {
    try {
      const res = await axios.get('/api/servicos.php')
      setServicos(res.data)
    } catch (e) {
      setErro('Erro ao carregar serviços.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar usuario={usuario} setUsuario={setUsuario} />

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">
            Serviços
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            {servicos.length} serviço(s) cadastrado(s)
          </p>
        </div>

        {erro && (
          <div className="bg-red-900 border border-red-600 text-red-300 px-4 py-3 rounded mb-4 text-sm">
            {erro}
          </div>
        )}

        {loading ? (
          <p className="text-gray-400 text-center py-10">
            Carregando...
          </p>
        ) : (
          <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">

            <table className="w-full text-sm">
              <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Nome</th>
                  <th className="px-4 py-3 text-left">Descrição</th>
                  <th className="px-4 py-3 text-left">Preço</th>
                  <th className="px-4 py-3 text-left">Duração</th>
                </tr>
              </thead>

              <tbody>
                {servicos.map((s, i) => (
                  <tr
                    key={s.id}
                    className={
                      i % 2 === 0
                        ? 'bg-gray-900'
                        : 'bg-gray-850'
                    }
                  >
                    <td className="px-4 py-3 text-gray-500">
                      {s.id}
                    </td>

                    <td className="px-4 py-3 text-white font-medium">
                      {s.nome}
                    </td>

                    <td className="px-4 py-3 text-gray-400">
                      {s.descricao}
                    </td>

                    <td className="px-4 py-3 text-yellow-400 font-bold">
                      R$ {parseFloat(s.preco).toFixed(2)}
                    </td>

                    <td className="px-4 py-3 text-gray-400">
                      {s.duracao}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}
      </div>
    </div>
  )
}

export default Servicos