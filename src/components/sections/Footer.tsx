import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black py-16 text-zinc-400 border-t border-zinc-900">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand & Address */}
                    <div>
                        <Link href="/" className="mb-6 block text-2xl font-bold text-white">
                            NICHPPF <span className="text-red-600">.</span>
                        </Link>
                        <address className="not-italic">
                            <p className="mb-2">123 Automotive Blvd,</p>
                            <p className="mb-2">Ulaanbaatar, Mongolia</p>
                            <p className="mb-2">+976 9911-2345</p>
                            <p>contact@nickppf.mn</p>
                        </address>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Products</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="hover:text-white transition-colors">Paint Protection Film</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Window Films</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Vinyl Wraps</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Ceramic Coating</Link></li>
                        </ul>
                    </div>

                    {/* Services/Company */}
                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Company</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Installers</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Warranty Info</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-zinc-900 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} NickPPF Mongolia. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
