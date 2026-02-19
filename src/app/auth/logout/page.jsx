import { logout } from '@/lib/actions/auth'


export default function LogoutPage() {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-2xl font-bold">Cerrar sesión</h1>
            <form>
                <button formAction={logout} className="px-8 py-4 bg-red-500 text-white cursor-pointer hover:font-bold">
                    Confirmar cierre de sesión
                </button>
            </form>
        </section>
    )
}
