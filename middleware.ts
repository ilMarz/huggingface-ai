import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    // Ottieni il percorso corrente
    const url = request.nextUrl.clone()
    const { pathname } = url

    // Controlla se siamo già su /chat per evitare redirect infiniti
    if (pathname === "/chat") {
        return NextResponse.next()
    }

    // Reindirizza a /chat
    url.pathname = "/chat"
    return NextResponse.redirect(url)
}

// Configura il middleware per escludere file statici e altre risorse
export const config = {
    matcher: [
        /*
         * Abbina solo i percorsi che sono probabilmente pagine di navigazione
         * ed esclude esplicitamente:
         * - File statici (con estensione)
         * - API routes
         * - Risorse di Next.js
         */
        "/((?!_next|api|.*\\.[^/]*$).*)",
    ],
}

