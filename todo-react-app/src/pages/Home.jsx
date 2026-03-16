export default function Home({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 mb-8">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-slate-800 bg-clip-text text-transparent">
              Todo App
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Modern React tabanlı TODO uygulamanız. Tüm CRUD işlemlerini 
            <span className="font-semibold text-blue-600"> kolayca </span>
            gerçekleştirin.
          </p>
        </div>
        
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="p-8 lg:p-12">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>React + Vite + Tailwind CSS • LocalStorage ile veri saklama</p>
        </div>
      </div>
    </div>
  );
}