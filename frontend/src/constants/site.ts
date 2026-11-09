// Konstanta global aplikasi.
// Ubah disini agar nama aplikasi, tagline, dan lainnya konsisten di seluruh halaman (page)
export const APP_NAME = "ByBee Career";

export interface NavItem {
    label: string;
    href: string;
}

// Routes
export const ROUTES = {
    // PUBLIC ROUTES
    landing: "/",
    login: "/login",
    register: "/registrasi",
    privacy: "/kebijakan-privasi",
    terms: "/syarat-ketentuan",
    jobs: "/lowongan",
    job: (id: string) => `/lowongan/${id}`,

    // PROTECTED ROUTES
    home: "/beranda",
}

// Anchor di landing page.
export const landingAnchors = {
    features: '/#fitur',
    howItWorks: '/#cara-kerja',
    trust: '/#keamanan',
    pricing: '/#harga',
    faq: '/#faq',
} as const