import Link from 'next/link'
import { auth } from "@/auth"
import { logout } from '@/lib/actions/auth'
import { Home } from 'lucide-react';


async function Header() {
    const session = await auth();
    // console.log(session);

    return (
        <header className='bg-indigo-800 text-white flex px-10 py-2 justify-between items-center'>
            <nav className='flex gap-4 items-center'>
                <Link href="/">
                    <Home />
                </Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/grupos">Grupos</Link>
                <Link href="/asignaturas">Asignaturas</Link>
                <Link href="/estudiantes">Estudiantes</Link>
            </nav>
            <div className='flex gap-4'>
                {session
                    ? <form><button className="cursor-pointer" formAction={logout}>Logout</button></form>
                    : <Link href="/auth/login">Login</Link>
                }
            </div>
        </header>
    )
}

export default Header
