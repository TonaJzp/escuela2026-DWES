'use client'
import { RefreshCwIcon } from "lucide-react";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";
import InputAvatar from "@/components/input-avatar";


export default function UserForm({ action, isAdminSession, user, disabled = false, labelSubmit = <span className="bg-blue-500 text-white px-4 py-2 rounded-md">Guardar</span> }) {
    const formId = useId()
    const [state, faction, isPending] = useActionState(action, {})


    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
        }
        if (state?.error) toast.error(state.error)
        if (state?.ok) {
            // toast(<div className="text-4xl flex justify-end text-green-600">🙂 OK</div>, { duration: 800 })
            document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
        }

    }, [state])



    return (
        <>
            <form id={formId} action={faction} className="grid lg:grid-cols-[300px_1fr] gap-4">
                <input type="hidden" name="id" defaultValue={user?.id} />

                <div className="flex flex-col gap-2">

                    {disabled
                        ? <img src={user?.image || '/images/avatar-80.png'} alt="Imagen de usuario" className='h-[200px] w-full lg:h-full object-contain' />
                        : < InputAvatar name='image' user={user} />
                    }

                    {isAdminSession
                        ?
                        <div className="flex items-center gap-2 self-center">
                            <input
                                key={`active-${user?.active}`}
                                type="checkbox"
                                name='active'
                                defaultChecked={user?.active == true}
                                disabled={disabled}
                                id={`active-${formId}`}
                            />
                            <label htmlFor={`active-${formId}`} className="text-sm">
                                {user?.active ? 'Cuenta activa' : 'Cuenta no activa'}
                            </label>
                        </div>
                        : <input type="hidden" name="active" defaultValue={user?.active} />
                    }

                </div>

                <div className="p-4 flex flex-col w-full gap-2 bg-gray-100">

                    <button
                        type="submit"
                        className="w-full h-12 flex justify-center items-center rounded-md hover:cursor-pointer hover:opacity-80 disabled:bg-slate-300 disabled:cursor-not-allowed"
                        disabled={isPending}
                    >
                        {isPending
                            ? <RefreshCwIcon size={20} className="animate-spin" />
                            : labelSubmit
                        }
                    </button>


                    <input
                        name='name'
                        defaultValue={user?.name}
                        placeholder="Nombre"
                        className="appearance-none text-4xl bg-white disabled:bg-white focus:outline-none focus:border-blue-400"
                        disabled={disabled}
                        required
                    />

                    <input
                        name='email'
                        defaultValue={user?.email}
                        placeholder="Email"
                        className="appearance-none text-2xl bg-white disabled:bg-white focus:outline-none focus:border-blue-400"
                        disabled={disabled}
                        required
                    />

                    <input
                        name='password'
                        type='password'
                        // defaultValue={user?.password}
                        // placeholder="Password"
                        placeholder='no cambiar contraseña'
                        className="appearance-none text-2xl bg-white disabled:bg-white focus:outline-none focus:border-blue-400"
                        disabled={disabled}
                        required={!user}
                    />


                    {isAdminSession
                        ?
                        <select
                            key={user?.role}
                            name="role"
                            defaultValue={user?.role}
                            size={2}
                            className="w-full text-md px-3 py-2 rounded-lg focus:outline-none bg-gray-100"
                            disabled={disabled}
                            required
                        >
                            <option value='USER' className="p-2 text-center text-xl"> USER </option>
                            <option value='ADMIN' className="p-2 text-center text-xl"> ADMIN </option>
                        </select>
                        :
                        <input type="hidden" name="role" defaultValue={user?.role} />
                    }
                </div>
            </form>

        </>
    )
}
