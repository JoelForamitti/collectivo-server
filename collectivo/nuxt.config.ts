// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  extends: ["@collectivo/collectivo", "@collectivo/coop"],
  runtimeConfig: {
    public: {},
  },
});
