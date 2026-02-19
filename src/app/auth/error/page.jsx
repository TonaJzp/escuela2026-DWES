const errors = new Map([
    ["OAuthAccountNotLinked", "El email ya se usó con otro proveedor."],
    ["Configuration", "Error de configuración del servidor."],
    ["AccessDenied", "Acceso denegado."],
    ["Verification", "Error en la verificación."],
    ["Default", "Error desconocido al iniciar sesión."],
])


export default async function ErrorPage({ searchParams }) {
    const { error } = await searchParams

    return (
        <section className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-2xl font-bold text-red-500">Error</h1>
            <h3 className="text-lg">{errors.get(error) || errors.get("Default")}</h3>
        </section>
    )
}
