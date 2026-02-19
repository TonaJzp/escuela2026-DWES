import { loginGoogle, loginGithub, loginDiscord } from '@/lib/actions/auth'


export default function OAuthForm() {
    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>Iniciar sesión OAuth</h1>
            <form className='flex flex-col gap-2'>
                <button formAction={loginGoogle} className="flex items-center gap-4 border rounded-lg px-8 py-4 cursor-pointer bg-gray-800 text-white hover:bg-gray-700">
                    <img src="/images/google.svg" width={24} height={24} alt='google' />
                    Iniciar sesión con Google
                </button>
                <button formAction={loginGithub} className="flex items-center gap-4 border rounded-lg px-8 py-4 cursor-pointer bg-gray-800 text-white hover:bg-gray-700">
                    <img src="/images/github.svg" width={24} height={24} alt='github' />
                    Iniciar sesión con Github
                </button>
                <button formAction={loginDiscord} className="flex items-center gap-4 border rounded-lg px-8 py-4 cursor-pointer bg-gray-800 text-white hover:bg-gray-700">
                    <img src="/images/discord.svg" width={24} height={24} alt='discord' />
                    Iniciar sesión con Discord
                </button>
            </form>
        </div>
    )
}
