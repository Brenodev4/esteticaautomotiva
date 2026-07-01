import { useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar.jsx'

function BuscarCep({ usuario, setUsuario }) {
  const [cep, setCep]           = useState('')
  const [endereco, setEndereco] = useState(null)
  const [loading, setLoading]   = useState(false)
  const [erro, setErro]         = useState('')

  // busca o endereço no ViaCEP usando axios
  async function buscarCep(e) {
    e.preventDefault()
    setErro('')
    setEndereco(null)

    const cepLimpo = cep.replace(/\D/g, '')

    if (cepLimpo.length !== 8) {
      setErro('Digite um CEP válido com 8 dígitos.')
      return
    }

    setLoading(true)

    try {
      const resposta = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`)

      if (resposta.data.erro) {
        setErro('CEP não encontrado.')
      } else {
        setEndereco(resposta.data)
      }
    } catch (error) {
      setErro('Erro ao consultar o CEP. Tente novamente.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar usuario={usuario} setUsuario={setUsuario} />

      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-white mb-2">Buscar CEP</h1>
        <p className="text-gray-400 mb-8">Consulte endereços pelo CEP usando a API ViaCEP</p>

        {/* formulário de busca */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6">
          <form onSubmit={buscarCep} className="flex gap-3">
            <input
              type="text"
              placeholder="Digite o CEP (ex: 01001-000)"
              value={cep}
              onChange={e => setCep(e.target.value)}
              maxLength={9}
              className="flex-1 bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-2.5 rounded-lg text-sm disabled:opacity-50"
            >
              {loading ? 'Buscando...' : '🔍 Buscar'}
            </button>
          </form>
        </div>

        {/* erro */}
        {erro && (
          <div className="bg-red-900 border border-red-600 text-red-300 px-4 py-3 rounded mb-4 text-sm">
            {erro}
          </div>
        )}

        {/* resultado */}
        {endereco && (
          <div className="bg-gray-900 border border-yellow-500 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-2xl">📍</span>
              <h2 className="text-white font-bold text-lg">Endereço encontrado</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">CEP</span>
                <span className="text-yellow-400 font-mono font-bold text-lg">{endereco.cep}</span>
              </div>

              <div className="col-span-2">
                <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Logradouro</span>
                <span className="text-white font-medium">{endereco.logradouro || '—'}</span>
              </div>

              <div>
                <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Bairro</span>
                <span className="text-gray-300">{endereco.bairro || '—'}</span>
              </div>

              <div>
                <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Complemento</span>
                <span className="text-gray-300">{endereco.complemento || '—'}</span>
              </div>

              <div>
                <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Cidade</span>
                <span className="text-gray-300">{endereco.localidade}</span>
              </div>

              <div>
                <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Estado</span>
                <span className="text-gray-300">{endereco.estado} ({endereco.uf})</span>
              </div>

              <div>
                <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">DDD</span>
                <span className="text-gray-300">{endereco.ddd}</span>
              </div>

              <div>
                <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">IBGE</span>
                <span className="text-gray-300 font-mono text-sm">{endereco.ibge}</span>
              </div>
            </div>
          </div>
        )}

        {/* info da API */}
        <div className="mt-6 bg-gray-900 border border-gray-700 rounded-xl p-4">
          <p className="text-gray-500 text-xs">
            <span className="text-yellow-400 font-bold">API utilizada:</span> ViaCEP — 
            <span className="font-mono ml-1">https://viacep.com.br/ws/{'{cep}'}/json/</span>
          </p>
          <p className="text-gray-600 text-xs mt-1">Consulta feita via Axios diretamente no navegador.</p>
        </div>
      </div>
    </div>
  )
}

export default BuscarCep
