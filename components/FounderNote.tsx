import Image from "next/image";
import { Quote } from "lucide-react";

export function FounderNote() {
    return (
        <section className="w-full max-w-5xl px-4 py-24 mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-sm">
                {/* Ambient background glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-ps-blue/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
                    {/* Image Column */}
                    <div className="shrink-0 relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-ps-blue to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                        <div className="relative w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-2xl border-2 border-white/10 shadow-2xl rotate-3 transition-transform duration-500 group-hover:rotate-0">
                            <Image
                                src="/jay-founder.jpg"
                                alt="JP Holecka"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 192px, 224px"
                            />
                        </div>
                    </div>

                    {/* Text Column */}
                    <div className="flex-1 text-center md:text-left space-y-6">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <div className="bg-ps-blue/20 p-2 rounded-full">
                                <Quote className="w-5 h-5 text-ps-blue" />
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">
                                Why I built this
                            </h2>
                        </div>

                        <div className="space-y-4 text-lg text-neutral-300 font-light leading-relaxed">
                            <p>
                                After 20 years of shipping products for global brands, I've seen too many great ideas fail—not because they weren't brilliant, but because they were built blindly.
                            </p>
                            <p>
                                We created this validator to give you the honest, data-backed signal I wish I had starting out. No fluff, just the execution reality check you need before writing that first line of code.
                            </p>
                        </div>

                        <div className="pt-2 flex flex-col md:flex-row items-center gap-4">
                            <div className="text-left">
                                <div className="text-white font-semibold text-lg">JP Holecka</div>
                                <div className="text-ps-blue text-sm font-medium">Founder & CEO</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
