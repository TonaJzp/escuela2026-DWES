'use client'

import { useActionState, useEffect } from 'react'
import { newUser, editUser, deleteUser } from '@/lib/actions/users'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'



function RemoveButton({ user }) {

    async function handleDelete() {
        const result = await deleteUser(user)
        if (result?.success) toast.success(result.success)
        if (result?.error) toast.error(result.error)
    }

    return (
        <button
            onClick={handleDelete}
            className='rounded bg-red-500 text-white p-2 cursor-pointer hover:bg-red-600'
            title='Eliminar usuario'
        >
            <Trash2 size={16} />
        </button>
    )
}


export default function UserForm({ user }) {
    const action = user?.id ? editUser : newUser
    const [state, formAction, pending] = useActionState(action, {})

    useEffect(() => {
        if (state?.success) toast.success(state.success)
        if (state?.error) toast.error(typeof state.error === 'string' ? state.error : 'Error al procesar')
    }, [state])

    return (
        <div className='border rounded p-4 bg-white shadow'>
            <form action={formAction} className='flex flex-col gap-3'>
                {user?.id && <input type="hidden" name="id" value={user.id} />}
                <div>
                    <label className='block text-sm font-medium'>Nombre</label>
                    <input type='text' name='name' defaultValue={user?.name || ''} className='w-full p-2 border rounded' required />
                </div>
                <div>
                    <label className='block text-sm font-medium'>Email</label>
                    <input type='email' name='email' defaultValue={user?.email || ''} className='w-full p-2 border rounded' required />
                </div>
                <div>
                    <label className='block text-sm font-medium'>Contraseña</label>
                    <input type='password' name='password' placeholder={user?.id ? '(dejar vacío para no cambiar)' : '******'} className='w-full p-2 border rounded' {...(!user?.id && { required: true })} />
                </div>
                <div>
                    <label className='block text-sm font-medium'>Imagen (URL)</label>
                    <input type='url' name='image' defaultValue={user?.image || ''} className='w-full p-2 border rounded' />
                </div>
                <div>
                    <label className='block text-sm font-medium'>Rol</label>
                    <select name='role' defaultValue={user?.role || 'USER'} className='w-full p-2 border rounded'>
                        <option value='USER'>USER</option>
                        <option value='ADMIN'>ADMIN</option>
                    </select>
                </div>
                <div className='flex items-center gap-2'>
                    <input type='checkbox' name='active' defaultChecked={user?.active !== false} id='active' />
                    <label htmlFor='active' className='text-sm'>Activo</label>
                </div>
                <div className='flex gap-2'>
                    <button
                        disabled={pending}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-600 rounded disabled:bg-gray-400"
                    >
                        {pending ? 'Guardando...' : (user?.id ? 'Modificar' : 'Crear usuario')}
                    </button>
                    {user?.id && <RemoveButton user={user} />}
                </div>
            </form>
        </div>
    )
}
