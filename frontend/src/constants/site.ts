// Konstanta global aplikasi.
// Ubah disini agar nama aplikasi, tagline, dan lainnya konsisten di seluruh halaman (page)

export const APP_NAME = "ByBee Career";

export interface NavItem {
    label: string;
    href: string;
}

export const ROUTES = {
    // PUBLIC ROUTES
    landing: "/",
    login: "/login",
    register: "/registrasi",
    terms: "/terms",

    // PROTECTED ROUTES
    home: "/beranda",
}
