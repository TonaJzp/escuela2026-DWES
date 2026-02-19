import Link from 'next/link'
import LoginForm from '@/components/auth/login-form'
import OAuthForm from '@/components/auth/oauth-form'

const errors = new Map([
    ["OAuthAccountNotLinked", "El email ya se usó con otro proveedor."],
    ["CredentialsSignin", "Credenciales incorrectas."],
    ["Default", "Error al iniciar sesión."],
])


export default async function LoginPage({ searchParams }) {
    const { error } = await searchParams

    return (
        <section className="flex flex-col items-center justify-center min-h-screen gap-4">
            {error && <h3 className='text-red-400'>{errors.get(error)}</h3>}
            <div className="flex flex-col md:flex-row gap-8 border p-8 rounded bg-white shadow items-start">
                <LoginForm />
                <OAuthForm />
            </div>
            <p>¿No tienes cuenta? <Link href="/auth/register" className="text-blue-500 underline">Regístrate</Link></p>
        </section>
    )
}
