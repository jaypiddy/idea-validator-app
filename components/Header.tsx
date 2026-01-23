'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isWhyUsOpen, setIsWhyUsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#020202] border-b border-white/5 transition-all duration-300">
            <div className="flex items-center justify-between px-6 h-[88px] max-w-[1440px] mx-auto">
                {/* Logo */}
                <Link href="https://powershifter.com" className="w-[180px] hover:opacity-80 transition-opacity">
                    <Image
                        src="https://cdn.prod.website-files.com/62a638e43312dd12f0196165/67a55ca04d21346148c666f6_PS%20Logo%20White.svg"
                        alt="Power Shifter Logo"
                        width={180}
                        height={40}
                        priority
                    />
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    <Link href="https://powershifter.com/studio" className="text-white hover:text-neutral-300 font-medium transition-colors">
                        studio
                    </Link>

                    {/* Why Us Dropdown */}
                    <div
                        className="relative group cursor-pointer h-full flex items-center"
                        onMouseEnter={() => setIsWhyUsOpen(true)}
                        onMouseLeave={() => setIsWhyUsOpen(false)}
                    >
                        <div className="flex items-center gap-1 text-white hover:text-neutral-300 font-medium transition-colors">
                            why us
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isWhyUsOpen ? 'rotate-180' : ''}`} />
                        </div>

                        {/* Dropdown Content */}
                        <AnimatePresence>
                            {isWhyUsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[280px]"
                                >
                                    <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden p-4 shadow-2xl">
                                        <Link href="https://powershifter.com/why-us" className="flex items-center gap-2 text-[#FD2E90] font-semibold mb-4 hover:translate-x-2 transition-transform">
                                            why us
                                            <Image
                                                src="https://cdn.prod.website-files.com/62a638e43312dd12f0196165/62a638e43312dd81c619622f_pink-arrow.svg"
                                                alt="arrow"
                                                width={16}
                                                height={16}
                                            />
                                        </Link>
                                        <div className="flex flex-col space-y-2">
                                            <Link href="https://powershifter.com/rapid-mvp-development" className="text-neutral-400 hover:text-white hover:bg-white/5 p-2 rounded-lg transition-all text-sm">
                                                Rapid MVP Development
                                            </Link>
                                            <Link href="https://powershifter.com/marketing/headless-cms" className="text-neutral-400 hover:text-white hover:bg-white/5 p-2 rounded-lg transition-all text-sm">
                                                Headless CMS
                                            </Link>
                                            <Link href="https://powershifter.com/fastlane" className="text-neutral-400 hover:text-white hover:bg-white/5 p-2 rounded-lg transition-all text-sm">
                                                Low-code with Fastlane
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link href="https://powershifter.com/our-work" className="text-white hover:text-neutral-300 font-medium transition-colors">
                        case studies
                    </Link>
                    <Link href="https://powershifter.com/join-us" className="text-white hover:text-neutral-300 font-medium transition-colors">
                        join us
                    </Link>
                </nav>

                {/* Contact CTA */}
                <Link
                    href="https://powershifter.com/#contact"
                    className="hidden md:flex items-center gap-3 group"
                >
                    <span className="text-white font-medium group-hover:font-semibold transition-all">contact us</span>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#FD2E90] group-hover:border-[#FD2E90] transition-colors duration-300">
                        <Image
                            src="https://cdn.prod.website-files.com/62a638e43312dd12f0196165/656fa342d5879ecf64f1509c_Contact-us-arrow.svg"
                            alt="Arrow"
                            width={14}
                            height={14}
                        />
                    </div>
                </Link>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#020202] fixed inset-0 z-40 pt-24 px-6 flex flex-col gap-8"
                    >
                        <Link href="https://powershifter.com/studio" className="text-2xl text-white font-semibold">studio</Link>
                        <Link href="https://powershifter.com/why-us" className="text-2xl text-white font-semibold">why us</Link>
                        <Link href="https://powershifter.com/our-work" className="text-2xl text-white font-semibold">case studies</Link>
                        <Link href="https://powershifter.com/join-us" className="text-2xl text-white font-semibold">join us</Link>
                        <Link href="https://powershifter.com/#contact" className="text-2xl text-[#FD2E90] font-semibold">contact us</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
