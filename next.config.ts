import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const BASE_PATH = "/portfolio";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: BASE_PATH,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
