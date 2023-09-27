export default defineNitroPlugin((nitroApp) => {
  // This will run every time the server starts
  logger.info("Hello world");

  // Access env variables
  const config = useRuntimeConfig();
  logger.info(config);
});
