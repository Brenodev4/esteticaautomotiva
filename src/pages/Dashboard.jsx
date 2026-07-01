import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

function Dashboard({ usuario, setUsuario }) {

 const cards = [
  {
    titulo: 'Quem Somos',
    icone: 'QS',
    desc: 'Conheça nossa equipe e estrutura',
    link: '/quem-somos',
    cor: 'from-purple-600/30 to-transparent border-purple-500/40'
  },
  {
    titulo: 'Serviços',
    icone: 'SV',
    desc: 'Todos os serviços disponíveis',
    link: '/servicos',
    cor: 'from-yellow-500/30 to-transparent border-yellow-500/40'
  },
  {
    titulo: 'Clientes',
    icone: 'CL',
    desc: 'Gerencie seus clientes',
    link: '/clientes',
    cor: 'from-blue-500/30 to-transparent border-blue-500/40'
  },
  {
    titulo: 'Produtos',
    icone: 'PD',
    desc: 'Controle de estoque e materiais',
    link: '/produtos',
    cor: 'from-cyan-500/30 to-transparent border-cyan-500/40'
  },
  {
    titulo: 'Agendamentos',
    icone: 'AG',
    desc: 'Controle de horários e serviços',
    link: '/agendamentos',
    cor: 'from-emerald-500/30 to-transparent border-emerald-500/40'
  },
  {
    titulo: 'FAQ',
    icone: 'FAQ',
    desc: 'Perguntas frequentes dos clientes',
    link: '/faq',
    cor: 'from-pink-500/30 to-transparent border-pink-500/40'
  },
]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      <Navbar usuario={usuario} setUsuario={setUsuario} />

      {/* HERO */}
      <div className="relative w-full h-[520px] overflow-hidden">

        {/* IMAGEM DE FUNDO */}
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
          alt="Carro"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        {/* ESCURECIMENTO */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60"></div>

        {/* EFEITO AZUL */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(29,78,216,0.25),transparent_55%)]"></div>

        <div className="relative max-w-7xl mx-auto h-full flex items-center px-6">

          <div className="max-w-2xl">

            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-4 py-2 rounded-full text-sm mb-6 backdrop-blur-sm">
               Sistema Premium AutoShine
            </div>

            <h1 className="text-6xl font-black leading-tight">
              Bem-vindo, <span className="text-yellow-400">{usuario?.nome}</span>
            </h1>

            <p className="text-gray-300 mt-6 text-xl leading-relaxed">
              Sistema moderno de gestão para estética automotiva,
              agendamentos, clientes e serviços premium.
            </p>

            <div className="mt-8 flex gap-4">

              <Link
                to="/servicos"
                className="
                  bg-yellow-500 hover:bg-yellow-400
                  text-black font-bold
                  px-8 py-4 rounded-2xl
                  transition duration-300
                  shadow-lg shadow-yellow-500/20
                  hover:scale-105
                "
              >
                Ver Serviços
              </Link>

              <Link
                to="/agendamentos"
                className="
                  border border-white/20
                  bg-white/5
                  backdrop-blur-md
                  hover:border-yellow-500
                  px-8 py-4 rounded-2xl
                  transition duration-300
                  hover:bg-white/10
                "
              >
                Agendar agora
              </Link>

            </div>

          </div>
        </div>
      </div>

      {/* CARDS */}
      <div className="relative max-w-7xl mx-auto px-6 py-20">

        <div className="mb-12">
          <h2 className="text-5xl font-black">
            Acesso rápido
          </h2>

          <p className="text-gray-400 mt-3 text-lg">
            Atalhos para as principais áreas do sistema
          </p>

          <div className="w-24 h-1 bg-yellow-500 rounded-full mt-5"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {cards.map((card) => (
            <Link
              key={card.link}
              to={card.link}
              className={`
                group relative overflow-hidden
                rounded-3xl border
                ${card.cor}
                bg-white/[0.03]
                backdrop-blur-md
                p-8 min-h-[240px]
                transition-all duration-500
                hover:-translate-y-3
                hover:shadow-2xl
              `}
            >

              {/* brilho */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/10 to-transparent"></div>

              {/* bolinhas decorativas */}
              <div className="absolute right-0 top-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>

              <div className="relative z-10">

                <div className="w-16 h-16 rounded-full border border-yellow-500 text-yellow-400 flex items-center justify-center font-bold text-lg mb-6">
                  {card.icone}
                </div>

                <h3 className="text-3xl font-bold">
                  {card.titulo}
                </h3>

                <p className="text-gray-400 mt-4 text-base leading-relaxed">
                  {card.desc}
                </p>

                <div className="mt-10 flex items-center justify-between">

                  <span className="text-yellow-400 font-bold text-lg">
                    Acessar 
                  </span>

                  <div className="
                    w-14 h-14 rounded-full
                    bg-white/10
                    flex items-center justify-center
                    text-2xl
                    group-hover:translate-x-1
                    transition
                  ">
                    ›
                  </div>

                </div>

              </div>

            </Link>
          ))}

        </div>
      </div>

      {/* BENEFÍCIOS */}
      <div className="border-t border-white/10 bg-black/40 backdrop-blur-md">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="flex items-center gap-5">
              <div className="
                w-16 h-16 rounded-full
                border border-yellow-500
                flex items-center justify-center
                text-2xl
                text-yellow-400
              ">
                &gt;&gt;
              </div>

              <div>
                <p className="font-bold text-2xl">
                  Agilidade
                </p>

                <p className="text-gray-400">
                  Processos rápidos e simples
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="
                w-16 h-16 rounded-full
                border border-yellow-500
                flex items-center justify-center
                text-2xl
                text-yellow-400
              ">
                ✓
              </div>

              <div>
                <p className="font-bold text-2xl">
                  Segurança
                </p>

                <p className="text-gray-400">
                  Dados protegidos e confiáveis
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="
                w-16 h-16 rounded-full
                border border-yellow-500
                flex items-center justify-center
                text-2xl
                text-yellow-400
              ">
                MAX
              </div>

              <div>
                <p className="font-bold text-2xl">
                  Performance
                </p>

                <p className="text-gray-400">
                  Sistema rápido e moderno
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default Dashboard
