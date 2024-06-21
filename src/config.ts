import json from "@/config/config.json";

type Config = typeof json;

const config: Partial<Config> = { ...json };

export default config;
