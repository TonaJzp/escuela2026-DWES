import { FilePenLineIcon, PlusIcon, TrashIcon } from "lucide-react"



export const IconoInsertar = () => <PlusIcon size={32}
    className='text-green-500 border border-green-500 rounded-full bg-green-200 p-1 cursor-pointer hover:text-white hover:bg-green-500'
/>


export const IconoModificar = () => <FilePenLineIcon size={32}
    className='text-indigo-500 border border-indigo-500 rounded-full bg-indigo-200 p-1 cursor-pointer hover:text-white hover:bg-indigo-500'
/>


export const IconoEliminar = () => <TrashIcon size={32}
    className='text-red-500 border border-red-500 rounded-full bg-red-200 p-1 cursor-pointer hover:text-white hover:bg-red-500'
/>
