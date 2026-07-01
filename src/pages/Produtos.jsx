import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar.jsx'

const produtoVazio = {
  nome: '',
  categoria: '',
  quantidade: '',
  minimo: '',
  custo: '',
  fornecedor: ''
}

function Produtos({ usuario, setUsuario }) {
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState(produtoVazio)
  const [erro, setErro] = useState('')

  useEffect(() => {
    buscarProdutos()
  }, [])

  const resumo = useMemo(() => {
    const valorEstoque = produtos.reduce((total, produto) => {
      return total + Number(produto.quantidade) * Number(produto.custo)
    }, 0)

    const estoqueBaixo = produtos.filter((produto) => {
      return Number(produto.quantidade) <= Number(produto.minimo)
    }).length

    return {
      total: produtos.length,
      estoqueBaixo,
      valorEstoque
    }
  }, [produtos])

  async function buscarProdutos() {
    try {
      const res = await axios.get('/api/produtos.php')
      setProdutos(res.data)
      setErro('')
    } catch (e) {
      setErro('Erro ao carregar produtos.')
    }
    setLoading(false)
  }

  function abrirForm(produto = null) {
    if (produto) {
      setForm({
        nome: produto.nome || '',
        categoria: produto.categoria || '',
        quantidade: produto.quantidade || '',
        minimo: produto.minimo || '',
        custo: produto.custo || '',
        fornecedor: produto.fornecedor || ''
      })
      setEditando(produto.id)
    } else {
      setForm(produtoVazio)
      setEditando(null)
    }
    setMostrarForm(true)
  }

  async function salvarProduto(e) {
    e.preventDefault()

    try {
      const dados = {
        ...form,
        fornecedor: form.fornecedor || 'Não informado'
      }

      if (editando) {
        await axios.put('/api/produtos.php', { ...dados, id: editando })
      } else {
        await axios.post('/api/produtos.php', dados)
      }

      setMostrarForm(false)
      setForm(produtoVazio)
      setEditando(null)
      buscarProdutos()
    } catch (e) {
      setErro('Erro ao salvar produto.')
    }
  }

  async function removerProduto(id) {
    if (!confirm('Deseja excluir este produto?')) return

    try {
      await axios.delete('/api/produtos.php', { data: { id } })
      buscarProdutos()
    } catch (e) {
      setErro('Erro ao excluir produto.')
    }
  }

  function statusProduto(produto) {
    if (Number(produto.quantidade) === 0) {
      return { texto: 'Esgotado', estilo: 'bg-red-900 text-red-300 border-red-700' }
    }

    if (Number(produto.quantidade) <= Number(produto.minimo)) {
      return { texto: 'Baixo', estilo: 'bg-yellow-900 text-yellow-300 border-yellow-700' }
    }

    return { texto: 'OK', estilo: 'bg-green-900 text-green-300 border-green-700' }
  }

  function formatarMoeda(valor) {
    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar usuario={usuario} setUsuario={setUsuario} />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Produtos</h1>
            <p className="text-gray-400 text-sm mt-1">
              Controle de estoque dos produtos usados nos serviços
            </p>
          </div>

          <button onClick={() => abrirForm()} className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg text-sm">
            + Novo Produto
          </button>
        </div>

        {erro && (
          <div className="bg-red-900 border border-red-600 text-red-300 px-4 py-3 rounded mb-4 text-sm">
            {erro}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Produtos cadastrados</p>
            <p className="text-white text-3xl font-bold mt-2">{resumo.total}</p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Estoque baixo</p>
            <p className="text-yellow-400 text-3xl font-bold mt-2">{resumo.estoqueBaixo}</p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Valor em estoque</p>
            <p className="text-green-400 text-3xl font-bold mt-2">{formatarMoeda(resumo.valorEstoque)}</p>
          </div>
        </div>

        {mostrarForm && (
          <div className="bg-gray-900 border border-yellow-500 rounded-xl p-6 mb-6">
            <h2 className="text-white font-bold mb-4">{editando ? 'Editar Produto' : 'Novo Produto'}</h2>

            <form onSubmit={salvarProduto} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm block mb-1">Nome</label>
                <input className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-1">Categoria</label>
                <input className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} required />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-1">Quantidade</label>
                <input type="number" min="0" className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.quantidade} onChange={e => setForm({ ...form, quantidade: e.target.value })} required />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-1">Estoque mínimo</label>
                <input type="number" min="0" className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.minimo} onChange={e => setForm({ ...form, minimo: e.target.value })} required />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-1">Preço de custo</label>
                <input type="number" min="0" step="0.01" className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.custo} onChange={e => setForm({ ...form, custo: e.target.value })} required />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-1">Fornecedor</label>
                <input className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  value={form.fornecedor} onChange={e => setForm({ ...form, fornecedor: e.target.value })} />
              </div>

              <div className="md:col-span-2 flex gap-3">
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
                  <th className="px-4 py-3 text-left">Produto</th>
                  <th className="px-4 py-3 text-left">Categoria</th>
                  <th className="px-4 py-3 text-left">Estoque</th>
                  <th className="px-4 py-3 text-left">Custo</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Ações</th>
                </tr>
              </thead>

              <tbody>
                {produtos.map((produto, index) => {
                  const status = statusProduto(produto)

                  return (
                    <tr key={produto.id} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                      <td className="px-4 py-3">
                        <p className="text-white font-medium">{produto.nome}</p>
                        <p className="text-gray-500 text-xs">Fornecedor: {produto.fornecedor}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-400">{produto.categoria}</td>
                      <td className="px-4 py-3 text-gray-400">
                        {produto.quantidade} un. / mínimo {produto.minimo}
                      </td>
                      <td className="px-4 py-3 text-yellow-400 font-bold">{formatarMoeda(produto.custo)}</td>
                      <td className="px-4 py-3">
                        <span className={`border px-3 py-1 rounded-full text-xs font-bold ${status.estilo}`}>
                          {status.texto}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button onClick={() => abrirForm(produto)} className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded">Editar</button>
                        <button onClick={() => removerProduto(produto.id)} className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1 rounded">Excluir</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Produtos
