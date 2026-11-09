import { Link } from "react-router-dom";
// import { Logo } from "../ui/Logo";

import { ROUTES, landingAnchors } from "../../constants/site";

const columns = [
    {
        title: 'Untuk pencari kerja',
        links: [
            { to: ROUTES.register, label: 'Buat CV'},
            { to: ROUTES.register, label: 'Buat Portofolio'},
            { to: ROUTES.jobs, label: 'Cari lowongan'},
        ],
    },
    {
        title: 'Untuk perusahaan',
        links: [
            { to: ROUTES.register, label: 'Pasang lowongan'},
            { to: landingAnchors.trust, label: 'Verifikasi perusahaan'},
            { to: landingAnchors.pricing, label: 'Harga'},
        ],
    },
    {
        title: 'Bantuan',
        links: [
            { to: landingAnchors.faq, label: 'Pertanyaan umum'},
            { to: ROUTES.privacy, label: 'Kebijakan privasi'},
            { to: ROUTES.terms, label: 'Syarat dan ketentuan'},
        ],
    },
]

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer__inner">
                <div className="footer__brand">
                    {/* <Logo light/> */}
                    <p>CV, portofolio dan lowongan kerja dalam satu tempat.</p>
                </div>

                {columns.map((col) => (
                    <nav 
                        key={col.title}
                        className="footer__col"
                        aria-label={col.title}
                    >
                        <h2 className="footer__title">{col.title}</h2>
                        <ul>
                            {col.links.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.to}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}
            </div>
            <div className="container footer__legal">
                <p>© {new Date().getFullYear()} ByBee Career. Semua hak dilindungi.</p>
            </div>
        </footer>
    )
}