import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header>
            <div className="nav">
                <Link href="/" className="brand">
                    <Image
                        src="/logo.svg"
                        alt="Power Shifter"
                        width={150}
                        height={30}
                        className="h-[26px] w-auto"
                        priority
                    />
                    <span className="sep" />
                    <span className="label">Rapid MVP Validator</span>
                </Link>
                <Link href="/validate" className="cta">Validate my MVP</Link>
            </div>
        </header>
    );
}
