import Link from 'next/link'
import { Button } from '@/components/ui'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Página no encontrada
          </h2>
          <p className="text-gray-600 mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/">
            <Button variant="primary" size="lg" className="w-full">
              Volver al inicio
            </Button>
          </Link>
          
          <Link href="/generalidades">
            <Button variant="outline" size="lg" className="w-full">
              Ver generalidades
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
