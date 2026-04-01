import {useTranslations} from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function PresentationHero() {
  const t = useTranslations("presentation");

  return (
    <section className="flex items-start">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:py-12 lg:py-16">
        <div className="grid items-center gap-10 md:grid-cols-[7fr_3fr]">
          <div className="space-y-6 lg:space-y-8">
            <div className="flex justify-start">
                <LanguageSwitcher />
            </div>

            <p className="text-sm font-medium tracking-[0.35em] text-zinc-500">
                {t("kicker")}
            </p>

            <div className="space-y-1">
                <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-[#0F6B78] sm:text-6xl md:text-7xl">
                {t("name")}
                </h1>

                <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#0F6B78] sm:text-4xl">
                {t("role")}
                </h2>
            </div>

            <p className="max-w-xl text-xl leading-7 text-zinc-700">
                {t("bio")}
            </p>
          </div>

          <div className="order-last md:order-last">
            <div className="aspect-square w-full max-w-md md:max-w-lg rounded-2xl border bg-gradient-to-br from-zinc-100 to-white" />          
          </div>
          
        </div>
      </div>
    </section>
  );
}