export default defineNuxtPlugin(() => {
  const menu = useCollectivoMenus();
  const user = useCollectivoUser();
  const runtimeConfig = useRuntimeConfig();

  const items: CollectivoMenuItem[] = [
    {
      label: "Events",
      icon: "i-system-uicons-calendar-month",
      to: "/tafel/events",
      order: 99,
    },
  ];

  menu.value.main.push(...items);

  const profileInputs: CollectivoFormField[] = [
    {
      type: "section",
      order: 100,
      title: "Account details",
    },
    {
      label: "First name",
      key: "first_name",
      type: "text",
      order: 101,
      disabled: true,
    },
    {
      label: "Last name",
      key: "last_name",
      type: "text",
      order: 102,
      disabled: true,
    },
    {
      label: "Email",
      key: "email",
      type: "text",
      order: 103,
      disabled: true,
    },
  ];

  user.value.fields = Object.assign(profileInputs, user.value.fields);
});
