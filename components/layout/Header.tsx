import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={120}
                        height={32}
                        className="h-8 w-auto"
                        priority
                    />
                    <span className="text-sm font-medium text-neutral-400 border-l border-neutral-800 pl-3 ml-1">
                        Rapid MVP Validator
                    </span>
                </Link>
            </div>
        </header>
    );
}
