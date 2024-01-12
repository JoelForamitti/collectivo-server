<!-- This section will be available under /example -->

<script setup lang="ts">
import { readItem, readItems, deleteItem } from "@directus/sdk";

setCollectivoTitle("Termine auswählen");
const eventIsOpen = ref(false);

const directus = useDirectus();
const user = useCollectivoUser();
const viewType = ref("");
const innerWidth = ref("");
const loaded = ref(false);
interface Event {
  id: number;
  tafel_date: string;
}

const events: Ref<Event[]> = ref([]);
loadEvents();

async function loadEvents() {
  await user.value.load();
  console.log("user ID", user.value.data?.id);

  events.value = (await directus.request(
    readItems("tafel_events", {}),
  )) as any[];

  console.log("events", events.value);
  loaded.value = true;
}
</script>

<template>
  <CollectivoContainer v-if="loaded">
    <UButton
      label="Zurück zu meinen Terminen"
      size="md"
      icon="i-mi-arrow-left"
      class="mt-5"
      @click="navigateTo('/tafel/events')"
    />
    <TafelCalendar :events="events"> </TafelCalendar>
  </CollectivoContainer>
</template>
