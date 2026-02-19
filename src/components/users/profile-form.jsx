'use client'

import { useActionState, useEffect } from 'react'
import { editUser } from '@/lib/actions/users'
import { toast } from 'sonner'

export default function ProfileForm({ user }) {
    const [state, formAction, pending] = useActionState(editUser, {})

    useEffect(() => {
        if (state?.success) toast.success(state.success)
        if (state?.error) toast.error(typeof state.error === 'string' ? state.error : 'Error al procesar')
    }, [state])

    return (
        <div>
            <h2 className='text-xl font-bold mb-4'>Editar perfil</h2>
            <form action={formAction} className='flex flex-col gap-3'>
                <input type="hidden" name="id" value={user.id} />
                <input type="hidden" name="role" value={user.role} />
                <input type="hidden" name="active" value={user.active ? 'on' : ''} />
                <input type="hidden" name="image" value={user.image || ''} />
                <div>
                    <label className='block text-sm font-medium'>Nombre</label>
                    <input type='text' name='name' defaultValue={user.name || ''} className='w-full p-2 border rounded' required />
                </div>
                <div>
                    <label className='block text-sm font-medium'>Email</label>
                    <input type='email' name='email' defaultValue={user.email || ''} className='w-full p-2 border rounded' required />
                </div>
                <div>
                    <label className='block text-sm font-medium'>Contraseña</label>
                    <input type='password' name='password' placeholder='(dejar vacío para no cambiar)' className='w-full p-2 border rounded' />
                </div>
                <button
                    disabled={pending}
                    className="px-4 py-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-600 rounded disabled:bg-gray-400"
                >
                    {pending ? 'Guardando...' : 'Guardar cambios'}
                </button>
            </form>
        </div>
    )
}
