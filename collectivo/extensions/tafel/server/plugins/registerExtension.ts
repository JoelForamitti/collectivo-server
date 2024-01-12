import pkg from "../../package.json";
import s001_example_migration from "../schemas/001_schema_example";
import examples from "../examples/examples";

// Register extension on startup
export default defineNitroPlugin(() => {
  console.log("TAFEL REGISTERED");

  registerExtension({
    name: "tafel",
    description: pkg.description,
    version: pkg.version,
    schemas: [s001_example_migration],
    examples: examples,
  });
});
