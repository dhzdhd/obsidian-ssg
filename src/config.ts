import json from "./config/config.json";

type Config = {
  redirects: Record<string, string>;
  metadata: {
    title: string;
    description: string;
  };
  codeTheme: string;
  links: Record<string, string>;
};

const config: Partial<Config> = json;

export default config;
