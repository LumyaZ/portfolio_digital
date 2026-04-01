import {useTranslations} from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Image from "next/image";
import { SKILLS } from "@/data/skill";

export default function PresentationHero() {
  const t = useTranslations("presentation");

  return (
    <section className="flex items-start">
        <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:py-12 lg:py-16">
            <div className="grid items-start gap-10 sm:grid-cols-[6fr_4fr]">
                <div className="space-y-6 lg:space-y-8 min-w-0">
                    <div className="animate-slide-in-left">
                        <div className="flex justify-start">
                            <LanguageSwitcher />
                        </div>
                    </div>

                    <div className="animate-slide-in-left" style={{ animationDelay: "0.33s" }}>
                        <p className="text-sm font-medium tracking-[0.35em] text-zinc-500">
                            {t("kicker")}
                        </p>
                    </div>

                    <div className="animate-slide-in-left" style={{ animationDelay: "0.66s" }}>
                        <div className="space-y-1">
                            <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-[#0F6B78] sm:text-6xl md:text-7xl">
                                {t("name")}
                            </h1>
                            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#0F6B78] sm:text-4xl">
                                {t("role")}
                            </h2>
                        </div>
                    </div>

                    <div className="animate-slide-in-left" style={{ animationDelay: "0.99s" }}>
                        <p className="max-w-xl text-xl leading-7 text-zinc-700">
                            {t("bio")}
                        </p>
                    </div>

                    <div className="animate-slide-in-left" style={{ animationDelay: "1.33s" }}>
                        <a
                            href="/THOMAS_CORNU_CV.pdf"
                            download="THOMAS_CORNU_CV.pdf"
                            className="inline-flex items-center justify-center rounded-md bg-[#0F6B78] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                            {t("downloadCv")}
                        </a>
                    </div>

                </div>

                <div className="order-last md:order-last min-w-0">
                    <div className="flex flex-col gap-4">
                        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {SKILLS.map((skill) => (
                            <li key={skill.id}>
                                <div className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 bg-white px-2 py-3 text-center transition hover:border-[#0F6B78]/40 hover:shadow-sm">
                                    <img
                                        src={skill.iconSrc}
                                        alt=""
                                        width={64}
                                        height={64}
                                        className="h-16 w-16 object-contain"
                                        loading="lazy"
                                        aria-hidden
                                    />
                                </div>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}