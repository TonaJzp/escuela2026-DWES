'use server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { signIn, signOut } from '@/auth'
import { obtenerUsuarioPorEmail } from '@/lib/data/users'





// --------------------------------- REGISTER ------------------------------------

async function register(prevState, formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario ya está registrado
    const user = await obtenerUsuarioPorEmail(email);

    if (user) {
        return { error: 'El email ya está registrado' }
    }

    // Encriptamos password 
    const hashedPassword = await bcrypt.hash(password, 10)

    const avatarIndex = Math.floor(Math.random() * 80)
    const image = `/images/avatar-${String(avatarIndex).padStart(2, '0')}.png`

    // Guardamos credenciales en base datos
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            image
        }
    })

    return { success: "Registro correcto" }
}





// --------------------------------- LOGIN ------------------------------------

async function login(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario está registrado
    const user = await obtenerUsuarioPorEmail(email);

    if (!user) {
        return { error: 'Usuario no registrado.' }
    }

    // Comprobamos si el usuario está activo 
    if (!user.active) {
        return { error: 'Usuario deshabilitado. Consulte al administrador de esta app.' }
    }

    // Comparamos password 
    let matchPassword = false

    if (user.password == null)  // Si no hay contraseña almacenada en BD
        matchPassword = true
    else
        matchPassword = await bcrypt.compare(password, user.password)



    if (user && matchPassword)  // && user.emailVerified
    {
        await signIn('credentials',
            {
                email, password,
                redirectTo: '/dashboard'
            })
        return { success: "Inicio de sesión correcto" }
    } else {
        return { error: 'Credenciales incorrectas.' }
    }

}



// --------------------------------- LOGOUT ------------------------------------

async function logout() {
    try {
        await signOut({ redirectTo: '/' })
    } catch (error) {
        throw error
    }
}



// --------------------------------- LOGIN OAUTH ------------------------------------

async function loginGoogle() {
    try {
        await signIn('google', { redirectTo: '/dashboard' })
    } catch (error) {
        throw error
    }
}

async function loginGithub() {
    try {
        await signIn('github', { redirectTo: '/dashboard' })
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function loginDiscord() {
    try {
        await signIn('discord', { redirectTo: '/dashboard' })
    } catch (error) {
        console.log(error);
        throw error
    }
}


export {
    register,
    login,
    logout,
    loginGoogle,
    loginGithub,
    loginDiscord
}
