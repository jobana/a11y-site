export default function FasesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Ciclo de Desarrollo
        </h1>
        <p className="text-xl text-gray-80 max-w-3xl mx-auto mb-8">
          Las fases del ciclo de desarrollo están disponibles directamente desde el menú de navegación. 
          Puedes acceder a cada fase individual desde el menú lateral.
        </p>
        <div className="bg-primary-10 border border-primary-20 rounded-lg p-6">
          <p className="text-primary-80">
            🔄 Navega directamente a las fases desde el menú: Planeación, Diseño, Desarrollo, Pruebas y Despliegue.
          </p>
        </div>
      </div>
    </div>
  )
}