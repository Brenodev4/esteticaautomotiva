import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import QuemSomos from './pages/QuemSomos.jsx'
import Servicos from './pages/Servicos.jsx'
import Clientes from './pages/Clientes.jsx'
import Produtos from './pages/Produtos.jsx'
import Agendamentos from './pages/Agendamentos.jsx'
import Faq from './pages/Faq.jsx'

// arquivo principal com as rotas do site
function App() {
  const [usuario, setUsuario] = useState(null)

  return (
    <Routes>
      <Route path="/" element={usuario ? <Navigate to="/dashboard" /> : <Login setUsuario={setUsuario} />} />
      <Route path="/dashboard"    element={usuario ? <Dashboard usuario={usuario} setUsuario={setUsuario} /> : <Navigate to="/" />} />
      <Route path="/quem-somos"   element={usuario ? <QuemSomos usuario={usuario} setUsuario={setUsuario} /> : <Navigate to="/" />} />
      <Route path="/servicos"     element={usuario ? <Servicos  usuario={usuario} setUsuario={setUsuario} /> : <Navigate to="/" />} />
      <Route path="/clientes"     element={usuario ? <Clientes  usuario={usuario} setUsuario={setUsuario} /> : <Navigate to="/" />} />
      <Route path="/produtos"    element={usuario ? <Produtos usuario={usuario} setUsuario={setUsuario} /> : <Navigate to="/" />} />
      <Route path="/agendamentos" element={usuario ? <Agendamentos usuario={usuario} setUsuario={setUsuario} /> : <Navigate to="/" />} />
     <Route path="/faq" element={usuario ? <Faq usuario={usuario} setUsuario={setUsuario} /> : <Navigate to="/" />} />
    </Routes>
  )
}

export default App

