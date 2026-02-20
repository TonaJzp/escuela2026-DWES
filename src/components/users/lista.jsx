'use client'

import Modal from '@/components/modal';
import { deleteUser, editUser, newUser } from "@/lib/actions/users";
import { IconoInsertar, IconoModificar, IconoEliminar } from "@/components/icons";
import UserForm from './form';
import Estado from './estado';




export default function UserList({ session, users }) {
    const isAdminSession = session.user?.role === 'ADMIN'

    const Insertar = () =>
        <Modal openElement={<IconoInsertar />}>
            <UserForm
                action={newUser}
                isAdminSession={isAdminSession}
                labelSubmit={<span className="bg-green-500 text-white px-4 py-2 rounded-md">Insertar</span>}
            />
        </Modal>

    const Modificar = ({ user }) =>
        <Modal openElement={<IconoModificar />}>
            <UserForm
                user={user}
                action={editUser}
                labelSubmit={<span className="bg-indigo-500 text-white px-4 py-2 rounded-md">Modificar</span>}
                isAdminSession={isAdminSession}
            />
        </Modal>


    const Eliminar = ({ user }) =>
        <Modal openElement={<IconoEliminar />}>
            <UserForm
                user={user}
                action={deleteUser.bind(null, user)}
                labelSubmit={<span className="bg-red-500 text-white px-4 py-2 rounded-md">Eliminar</span>}
                isAdminSession={isAdminSession}
                disabled
            />
        </Modal>


    const Mostrar = ({ user }) =>
        <Modal openElement={
            <div className="cursor-pointer flex gap-2 items-center">
                <img src={user?.image || '/images/avatar-80.png'} alt="Imagen de usuario"
                    className={`size-8 ${!user.active && 'grayscale opacity-30'}`}
                />
                {user.name}
            </div>
        }>
            <UserForm
                user={user}
                action={() => { return { ok: true } }}
                labelSubmit={<span className="bg-green-500 text-white px-4 py-2 rounded-md">Aceptar</span>}
                isAdminSession={isAdminSession}
                disabled
            />
        </Modal>


    const Item = ({ user, children }) => {
        return (
            <div key={user.id} className="rounded-full p-2 flex justify-between items-center even:bg-blue-100 odd:bg-slate-100 hover:outline hover:outline-slate-400">

                <div className="relative group flex gap-2 items-center">
                    <Mostrar user={user} />
                    <Popover user={user} />
                </div>

                <div className='flex justify-center items-center gap-1'>
                    {children}
                </div>

            </div>
        )
    }



    const Popover = ({ user }) =>
        <div className="absolute left-10 top-4 z-50 mt-2 hidden group-hover:block bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-2xl p-4 min-w-[320px]">

            <div className="grid grid-cols-[60px_auto] items-center  gap-4 border border-slate-300 rounded-md p-2">
                <img src={user.image} alt="avatar"
                    className={`size-16 ${!user.active && 'grayscale opacity-30'}`} />
                <div>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                </div>
            </div>
        </div>



    return (
        <div>
            <div className='flex justify-end items-center gap-4 pb-4'>
                <Insertar />
            </div>

            {users
                .filter(user => user.id !== session.user.id)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(user =>
                    <Item key={user.id} user={user}>
                        <Estado user={user} editable={isAdminSession} />
                        <Modificar user={user} />
                        <Eliminar user={user} />
                    </Item>
                )
            }
        </div >

    )
}
