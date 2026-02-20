import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { obtenerUsuarios, obtenerUsuarioPorId } from "@/lib/data/users"
import { IconoModificar } from "@/components/icons"
import { editUser } from "@/lib/actions/users"
import UserForm from "@/components/users/form"
import Modal from "@/components/modal"
import UserList from "@/components/users/lista"


export default async function DashboardPage() {
    const session = await auth()

    if (!session) redirect('/auth/login')

    const isAdminSession = session.user?.role === 'ADMIN'

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

            <UserInfo session={session} />

            {isAdminSession &&
                <>
                    <h1 className="text-xl font-bold mt-15">Lista de usuarios</h1>
                    <UserListSection session={session} />
                </>
            }
        </div >
    )
}




async function UserInfo({ session }) {

    const usuario = await obtenerUsuarioPorId(session.user.id)
    const isAdminSession = session.user.role === 'ADMIN'

    return (
        <div className="grid md:grid-cols-[160px_auto] gap-2">

            <img src={usuario?.image || '/images/avatar-80.png'} className="size-36" alt="Imagen de usuario" />

            <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                    <p className="font-bold">{usuario.name}</p>
                    <Modal openElement={<IconoModificar />}>
                        <UserForm action={editUser} isAdminSession={isAdminSession} user={usuario} labelSubmit={<span className="bg-indigo-500 text-white px-4 py-2 rounded-md">Modificar</span>} />
                    </Modal>
                </div>
                <p>{usuario.email}</p>
                <p>{usuario.role}</p>
            </div>
        </div>

    )
}



async function UserListSection({ session }) {
    const users = await obtenerUsuarios()
    return <UserList session={session} users={JSON.parse(JSON.stringify(users))} />
}
