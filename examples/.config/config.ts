interface Config {
  redirects?: Record<string, string>;
  landing?: {
    title?: string;
  };
}

const config = {
  redirects: {},
  landing: {
    title: "Notes",
  },
} satisfies Config;

export default config;
