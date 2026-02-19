'use client'

import { useActionState, useEffect } from 'react';
import { login } from '@/lib/actions/auth'
import { toast } from 'sonner';


export default function LoginForm() {

    const [state, action, pending] = useActionState(login, {})

    useEffect(() => {
        if (state?.success) toast.success(state.success)
        if (state?.error) toast.error(state.error)
    }, [state])

    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>Iniciar sesión</h1>
            <form action={action} className='flex flex-col gap-4'>
                <div>
                    <label>Email</label>
                    <input type='email' name='email' placeholder="name@mail.com" className='w-full p-3' required />
                    <p className='text-xs text-gray-400'>Por favor, introduce un email válido.</p>
                </div>
                <div>
                    <label>Contraseña</label>
                    <input type="password" name='password' placeholder="******" className='w-full p-3' required />
                </div>

                <button
                    disabled={pending}
                    className="px-8 py-4 bg-blue-500 text-white cursor-pointer hover:font-bold" >
                    {pending ? "Cargando..." : "Iniciar sesión"}
                </button>
            </form>
        </div>
    );
};
