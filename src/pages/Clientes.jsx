import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar.jsx'

const formVazio = { nome: '', telefone: '', email: '', cep: '', logradouro: '', bairro: '', cidade: '', uf: '' }

function Clientes({ usuario, setUsuario }) {
  const [clientes, setClientes]       = useState([])
  const [loading, setLoading]         = useState(true)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [editando, setEditando]       = useState(null)
  const [form, setForm]               = useState(formVazio)
  const [erro, setErro]               = useState('')
  const [buscandoCep, setBuscandoCep] = useState(false)

  useEffect(() => {
    buscarClientes()
  }, [])

  async function buscarClientes() {
    try {
      const res = await axios.get('/api/clientes.php')
      setClientes(res.data)
    } catch (e) {
      setErro('Erro ao carregar clientes.')
    }
    setLoading(false)
  }

  // busca o endereço pelo CEP usando ViaCEP via axios
  async function buscarCep(cep) {
    const cepLimpo = cep.replace(/\D/g, '')
    if (cepLimpo.length !== 8) return

    setBuscandoCep(true)
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      if (!res.data.erro) {
        setForm(f => ({
          ...f,
          logradouro: res.data.logradouro,
          bairro: res.data.bairro,
          cidade: res.data.localidade,
          uf: res.data.uf
        }))
      }
    } catch (e) {
      console.log('CEP não encontrado')
    }
    setBuscandoCep(false)
  }

  function abrirForm(cliente = null) {
    if (cliente) {
      setForm(cliente)
      setEditando(cliente.id)
    } else {
      setForm(formVazio)
      setEditando(null)
    }
    setMostrarForm(true)
  }

  async function handleSalvar(e) {
    e.preventDefault()
    try {
      if (editando) {
        await axios.put('/api/clientes.php', { ...form, id: editando })
      } else {
        await axios.post('/api/clientes.php', form)
      }
      setMostrarForm(false)
      buscarClientes()
    } catch (e) {
      setErro('Erro ao salvar cliente.')
    }
  }

  async function handleDeletar(id) {
    if (!confirm('Deseja excluir este cliente?')) return
    try {
      await axios.delete('/api/clientes.php', { data: { id } })
      buscarClientes()
    } catch (e) {
      setErro('Erro ao excluir cliente.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar usuario={usuario} setUsuario={setUsuario} />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Clientes</h1>
            <p className="text-gray-400 text-sm mt-1">{clientes.length} cliente(s) cadastrado(s)</p>
          </div>
          <button onClick={() => abrirForm()} className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg text-sm">
            + Novo Cliente
          </button>
        </div>

        {erro && <div className="bg-red-900 border border-red-600 text-red-300 px-4 py-3 rounded mb-4 text-sm">{erro}</div>}

        {/* formulário */}
        {mostrarForm && (
          <div className="bg-gray-900 border border-yellow-500 rounded-xl p-6 mb-6">
            <h2 className="text-white font-bold mb-4">{editando ? 'Editar Cliente' : 'Novo Cliente'}</h2>
            <form onSubmit={handleSalvar} className="grid grid-cols-2 gap-4">

              <div>
                <label className="text-gray-400 text-sm block mb-1">Nome</label>
                <input className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Telefone</label>
                <input className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">E-mail</label>
                <input type="email" className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>

              {/* CEP com busca automática */}
              <div>
                <label className="text-gray-400 text-sm block mb-1">CEP {buscandoCep && <span className="text-yellow-400 text-xs ml-1">buscando...</span>}</label>
                <input className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  placeholder="Ex: 01001-000"
                  value={form.cep}
                  onChange={e => setForm({ ...form, cep: e.target.value })}
                  onBlur={e => buscarCep(e.target.value)}
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-1">Logradouro</label>
                <input className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.logradouro} onChange={e => setForm({ ...form, logradouro: e.target.value })} />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Bairro</label>
                <input className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.bairro} onChange={e => setForm({ ...form, bairro: e.target.value })} />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Cidade</label>
                <input className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.cidade} onChange={e => setForm({ ...form, cidade: e.target.value })} />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">UF</label>
                <input maxLength={2} className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.uf} onChange={e => setForm({ ...form, uf: e.target.value })} />
              </div>

              <div className="col-span-2 flex gap-3">
                <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-5 py-2 rounded text-sm">Salvar</button>
                <button type="button" onClick={() => setMostrarForm(false)} className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded text-sm">Cancelar</button>
              </div>
            </form>
          </div>
        )}

        {/* tabela */}
        {loading ? (
          <p className="text-gray-400 text-center py-10">Carregando...</p>
        ) : (
          <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Nome</th>
                  <th className="px-4 py-3 text-left">Telefone</th>
                  <th className="px-4 py-3 text-left">E-mail</th>
                  <th className="px-4 py-3 text-left">Cidade/UF</th>
                  <th className="px-4 py-3 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((c, i) => (
                  <tr key={c.id} className={i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                    <td className="px-4 py-3 text-gray-500">{c.id}</td>
                    <td className="px-4 py-3 text-white font-medium">{c.nome}</td>
                    <td className="px-4 py-3 text-gray-400">{c.telefone}</td>
                    <td className="px-4 py-3 text-gray-400">{c.email}</td>
                    <td className="px-4 py-3 text-gray-400">{c.cidade} / {c.uf}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={() => abrirForm(c)} className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded">Editar</button>
                      <button onClick={() => handleDeletar(c.id)} className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1 rounded">Excluir</button>
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

export default Clientes
