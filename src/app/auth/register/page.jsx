import Link from 'next/link'
import RegisterForm from '@/components/auth/register-form'


export default function RegisterPage() {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen gap-4">
            <div className="border p-8 rounded bg-white shadow">
                <RegisterForm />
            </div>
            <p>¿Ya tienes cuenta? <Link href="/auth/login" className="text-blue-500 underline">Inicia sesión</Link></p>
        </section>
    )
}
