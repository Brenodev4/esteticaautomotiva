import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar({ usuario, setUsuario }) {
  const navigate  = useNavigate()
  const location  = useLocation()

  function handleSair() {
    setUsuario(null)
    navigate('/')
  }

  // verifica se o link está ativo
  function ativo(path) {
    return location.pathname === path
      ? 'bg-yellow-500 text-black font-bold'
      : 'text-gray-300 hover:text-yellow-400'
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-3 flex items-center justify-between">
      {/* logo */}
      <Link to="/dashboard" className="flex items-center gap-2">
        <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
          AS
        </span>
        <span className="text-white font-bold text-lg">AutoShine</span>
      </Link>

      {/* menu com 5 opções */}
      <div className="flex items-center gap-1">
        <Link to="/quem-somos"   className={`px-3 py-2 rounded text-sm ${ativo('/quem-somos')}`}>Quem Somos</Link>
        <Link to="/servicos"     className={`px-3 py-2 rounded text-sm ${ativo('/servicos')}`}>Serviços</Link>
        <Link to="/clientes"     className={`px-3 py-2 rounded text-sm ${ativo('/clientes')}`}>Clientes</Link>
        <Link to="/produtos"    className={`px-3 py-2 rounded text-sm ${ativo('/produtos')}`}>Produtos</Link>
        <Link to="/agendamentos" className={`px-3 py-2 rounded text-sm ${ativo('/agendamentos')}`}>Agendamentos</Link>
      <Link to="/faq" className={`px-3 py-2 rounded text-sm ${ativo('/faq')}`}>
  FAQ
</Link>
      </div>

      {/* usuario logado + sair */}
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-sm">Usuário: {usuario?.nome}</span>
        <button onClick={handleSair} className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1.5 rounded">
          Sair
        </button>
      </div>
    </nav>
  )
}

export default Navbar

