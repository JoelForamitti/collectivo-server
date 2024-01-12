// This function creates an empty schema for version 0.0.1 of the example extension
// A schema can be used to declaratively define the structure of the database
const schema = initSchema("tafel", "0.0.1");

export default schema;

// Here you can define collections for your database
// See https://docs.directus.io/reference/system/collections.html
schema.collections = [
  {
    collection: "tafel_events",
    schema: {
      schema: "schema",
      name: "schema",
      comment: null,
    },
    meta: {
      icon: "calendar_month",
    },
  },
];

// Here you can define fields for your collections
// See https://docs.directus.io/reference/system/fields.html
schema.fields = [
  ...directusSystemFields("tafel_events"),
  {
    collection: "tafel_events",
    field: "tafel_date",
    type: "date",
    meta: {
      interface: "datetime",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Datum" },
        { language: "en-US", translation: "Date" },
      ],
    },
  },
];

// Here you can define custom translations
// See https://docs.directus.io/reference/system/translations.html
schema.translations = [
  { language: "de-DE", key: "example", value: "Beispiel" },
];

// To create relations, you can use the following helper functions
// schema.createM2ORelation();
schema.createM2MRelation("tafel_events", "directus_users", {
  m2mFieldType2: "uuid",
  field1: {
    field: "tafel_users_registered",
    type: "alias",
    meta: {
      special: ["m2m"],
      sort: 30,
      interface: "list-m2m",
      translations: [
        { language: "en-US", translation: "Registrations" },
        { language: "de-DE", translation: "Anmeldungen" },
      ],
      display: "related-values",
      display_options: {
        template:
          "{{directus_users_id.first_name}} {{directus_users_id.last_name}}",
      },
    },
  },
  // field2: {
  //   field: "tafel_events_registered",
  // },
});
// schema.createM2ARelation();
