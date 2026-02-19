'use client'

import { useState } from 'react'
import Estado from '@/components/users/estado'
import UserForm from '@/components/users/form'


export default function UserList({ users }) {
    const [selectedUser, setSelectedUser] = useState(null)
    const [showNew, setShowNew] = useState(false)

    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold'>Lista de usuarios</h2>
                <button
                    onClick={() => { setShowNew(!showNew); setSelectedUser(null) }}
                    className='px-4 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600'
                >
                    {showNew ? 'Cancelar' : 'Nuevo usuario'}
                </button>
            </div>

            {showNew && (
                <div className='mb-4'>
                    <UserForm />
                </div>
            )}

            {selectedUser && (
                <div className='mb-4'>
                    <UserForm user={selectedUser} />
                </div>
            )}

            <table className='w-full border-collapse'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='p-2 text-left'>Estado</th>
                        <th className='p-2 text-left'>Nombre</th>
                        <th className='p-2 text-left'>Email</th>
                        <th className='p-2 text-left'>Rol</th>
                        <th className='p-2 text-left'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className='border-b hover:bg-gray-50'>
                            <td className='p-2'>
                                <Estado user={user} editable={true} />
                            </td>
                            <td className='p-2'>{user.name}</td>
                            <td className='p-2'>{user.email}</td>
                            <td className='p-2'>{user.role}</td>
                            <td className='p-2'>
                                <button
                                    onClick={() => { setSelectedUser(user); setShowNew(false) }}
                                    className='px-3 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 text-sm'
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
