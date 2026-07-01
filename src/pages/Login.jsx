import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login({ setUsuario }) {
  const [login, setLogin]   = useState('')
  const [senha, setSenha]   = useState('')
  const [erro, setErro]     = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setLoading(true)

    try {
      // usando axios para chamar o PHP
      const resposta = await axios.post('/api/login.php', { login, senha })

      if (resposta.data.sucesso) {
        setUsuario(resposta.data.usuario)
        navigate('/dashboard')
      } else {
        setErro(resposta.data.mensagem)
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* logo */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-3 w-16 h-16 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold text-xl">
            AS
        </div>
          <h1 className="text-3xl font-bold text-white">AutoShine</h1>
          <p className="text-gray-400 mt-1">Estética Automotiva</p>
        </div>

        {/* card login */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Acesso Restrito: Colaboradores</h2>

          {erro && (
            <div className="bg-red-900 border border-red-600 text-red-300 px-4 py-3 rounded mb-4 text-sm">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Login</label>
              <input
                type="text"
                placeholder="Digite seu login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2.5 rounded-lg mt-2 disabled:opacity-50"
            >
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-gray-700">
            <p className="text-gray-500 text-xs text-center mb-2">Usuários para teste:</p>
            <div className="flex gap-2 justify-center flex-wrap">
              <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded">breno / 1</span>
              <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded">eduardo / 1</span>
              <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded">admin / admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
