import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { obtenerUsuarios, obtenerUsuarioPorId } from "@/lib/data/users"
import UserList from "@/components/users/lista"


export default async function DashboardPage() {
    const session = await auth()

    if (!session) redirect('/auth/login')

    const usuario = await obtenerUsuarioPorId(session.user.id)

    return (
        <section className="p-4">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="border rounded p-4 bg-white shadow mb-6">
                <h2 className="text-xl font-bold mb-2">Tu información</h2>
                <p><strong>Nombre:</strong> {usuario.name}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Rol:</strong> {usuario.role}</p>
            </div>

            {session.user.role === 'ADMIN' && (
                <div className="border rounded p-4 bg-white shadow">
                    <UserListSection />
                </div>
            )}
        </section>
    )
}


async function UserListSection() {
    const users = await obtenerUsuarios()
    return <UserList users={users} />
}
