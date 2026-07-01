import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar.jsx'

const formVazio = { cliente_id: '', servico_id: '', data_agendamento: '', hora: '', placa: '', status: 'pendente' }

const statusCores = {
  pendente:   'bg-yellow-900 text-yellow-300',
  confirmado: 'bg-blue-900 text-blue-300',
  concluido:  'bg-green-900 text-green-300',
  cancelado:  'bg-red-900 text-red-300',
}

function Agendamentos({ usuario, setUsuario }) {
  const [agendamentos, setAgendamentos] = useState([])
  const [clientes, setClientes]         = useState([])
  const [servicos, setServicos]         = useState([])
  const [loading, setLoading]           = useState(true)
  const [mostrarForm, setMostrarForm]   = useState(false)
  const [editando, setEditando]         = useState(null)
  const [form, setForm]                 = useState(formVazio)
  const [erro, setErro]                 = useState('')

  useEffect(() => {
    buscarTudo()
  }, [])

  async function buscarTudo() {
    try {
      const [resAg, resCl, resSv] = await Promise.all([
        axios.get('/api/agendamentos.php'),
        axios.get('/api/clientes.php'),
        axios.get('/api/servicos.php'),
      ])
      setAgendamentos(resAg.data)
      setClientes(resCl.data)
      setServicos(resSv.data)
    } catch (e) {
      setErro('Erro ao carregar dados.')
    }
    setLoading(false)
  }

  function abrirForm(ag = null) {
    if (ag) {
      setForm({ cliente_id: ag.cliente_id, servico_id: ag.servico_id, data_agendamento: ag.data_agendamento, hora: ag.hora, placa: ag.placa, status: ag.status })
      setEditando(ag.id)
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
        await axios.put('/api/agendamentos.php', { ...form, id: editando })
      } else {
        await axios.post('/api/agendamentos.php', form)
      }
      setMostrarForm(false)
      buscarTudo()
    } catch (e) {
      setErro('Erro ao salvar agendamento.')
    }
  }

  async function handleDeletar(id) {
    if (!confirm('Deseja excluir este agendamento?')) return
    try {
      await axios.delete('/api/agendamentos.php', { data: { id } })
      buscarTudo()
    } catch (e) {
      setErro('Erro ao excluir.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar usuario={usuario} setUsuario={setUsuario} />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Agendamentos</h1>
            <p className="text-gray-400 text-sm mt-1">{agendamentos.length} agendamento(s)</p>
          </div>
          <button onClick={() => abrirForm()} className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg text-sm">
            + Novo Agendamento
          </button>
        </div>

        {erro && <div className="bg-red-900 border border-red-600 text-red-300 px-4 py-3 rounded mb-4 text-sm">{erro}</div>}

        {mostrarForm && (
          <div className="bg-gray-900 border border-yellow-500 rounded-xl p-6 mb-6">
            <h2 className="text-white font-bold mb-4">{editando ? 'Editar Agendamento' : 'Novo Agendamento'}</h2>
            <form onSubmit={handleSalvar} className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm block mb-1">Cliente</label>
                <select className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.cliente_id} onChange={e => setForm({ ...form, cliente_id: e.target.value })} required>
                  <option value="">Selecione...</option>
                  {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Serviço</label>
                <select className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.servico_id} onChange={e => setForm({ ...form, servico_id: e.target.value })} required>
                  <option value="">Selecione...</option>
                  {servicos.map(s => <option key={s.id} value={s.id}>{s.nome} — R$ {parseFloat(s.preco).toFixed(2)}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Data</label>
                <input type="date" className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.data_agendamento} onChange={e => setForm({ ...form, data_agendamento: e.target.value })} required />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Hora</label>
                <input type="time" className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.hora} onChange={e => setForm({ ...form, hora: e.target.value })} required />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Placa</label>
                <input className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  placeholder="Ex: ABC-1234" value={form.placa} onChange={e => setForm({ ...form, placa: e.target.value })} />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Status</label>
                <select className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option value="pendente">Pendente</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
              <div className="col-span-2 flex gap-3">
                <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-5 py-2 rounded text-sm">Salvar</button>
                <button type="button" onClick={() => setMostrarForm(false)} className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded text-sm">Cancelar</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-gray-400 text-center py-10">Carregando...</p>
        ) : (
          <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Cliente</th>
                  <th className="px-4 py-3 text-left">Serviço</th>
                  <th className="px-4 py-3 text-left">Data</th>
                  <th className="px-4 py-3 text-left">Hora</th>
                  <th className="px-4 py-3 text-left">Placa</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {agendamentos.map((a, i) => (
                  <tr key={a.id} className={i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                    <td className="px-4 py-3 text-gray-500">{a.id}</td>
                    <td className="px-4 py-3 text-white">{a.cliente_nome}</td>
                    <td className="px-4 py-3 text-gray-300">{a.servico_nome}</td>
                    <td className="px-4 py-3 text-gray-400">{a.data_agendamento}</td>
                    <td className="px-4 py-3 text-gray-400">{a.hora}</td>
                    <td className="px-4 py-3 text-gray-400">{a.placa}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${statusCores[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={() => abrirForm(a)} className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded">Editar</button>
                      <button onClick={() => handleDeletar(a.id)} className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1 rounded">Excluir</button>
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

export default Agendamentos
