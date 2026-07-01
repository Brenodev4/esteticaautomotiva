import Navbar from '../components/Navbar.jsx'

function QuemSomos({ usuario, setUsuario }) {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar usuario={usuario} setUsuario={setUsuario} />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-white mb-2">Quem Somos</h1>
        <p className="text-gray-400 mb-8">Conheça nossa empresa e nossa equipe</p>

        {/* sobre a empresa */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-yellow-400 mb-3">AutoShine Estética Automotiva</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            A AutoShine é uma empresa especializada em estética automotiva de alta qualidade.
            Oferecemos serviços de lavagem, polimento, higienização interna e cristalização,
            sempre com produtos premium e mão de obra especializada.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mt-3">
            Nossa missão é devolver o brilho e a beleza ao seu veículo, proporcionando
            uma experiência única de cuidado e atenção aos detalhes.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-yellow-400 font-bold text-2xl">500+</div>
              <div className="text-gray-400 text-xs mt-1">Clientes Atendidos</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-yellow-400 font-bold text-2xl">5★</div>
              <div className="text-gray-400 text-xs mt-1">Avaliação Média</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-yellow-400 font-bold text-2xl">3 anos</div>
              <div className="text-gray-400 text-xs mt-1">No mercado</div>
            </div>
          </div>
        </div>

        {/* equipe — desenvolvedor */}
        <h2 className="text-lg font-bold text-white mb-4">Especialista em Estética</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl mb-4">B</div>
            <h3 className="text-white font-bold text-lg">Breno</h3>
            <p className="text-yellow-400 text-sm">Especialista em Estética</p>
            <div className="mt-3 bg-gray-800 rounded-lg px-3 py-2 inline-block">
              <span className="text-gray-400 text-xs">RA: </span>
              <span className="text-white text-sm font-mono font-bold">221417</span>
            </div>
            <p className="text-gray-400 text-xs mt-3">UniSalesiano — Tecnologia de Desenvolvimento de Sistemas</p>
          </div>

          
          </div>
        </div>
      </div>
    
  )
}

export default QuemSomos
