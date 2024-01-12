<!-- This section will be available under /example -->

<script setup lang="ts">
import { readItem, readItems, deleteItem } from "@directus/sdk";

setCollectivoTitle("Tafel Termine");
const calendarIsOpen = ref(false);
const eventIsOpen = ref(false);
const directus = useDirectus();
const user = useCollectivoUser();

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
    readItems("tafel_events", {
      filter: {
        tafel_users_registered: {
          directus_users_id: {
            _eq: user.value.data?.id,
          },
        },
      },
    }),
  )) as any[];

  console.log("events", events.value);
}

async function cancelEvent(eventId: number) {
  console.log("event ID", eventId);

  await user.value.load();
  console.log("user ID", user.value.data?.id);

  const relationID = (
    await directus.request(
      readItems("tafel_events_directus_users", {
        filter: {
          tafel_events_id: {
            _eq: eventId,
          },
          directus_users_id: {
            _eq: user.value.data?.id,
          },
        },
      }),
    )
  )[0].id;

  console.log("relation ID", relationID);

  await directus.request(deleteItem("tafel_events_directus_users", relationID));

  loadEvents();
}
</script>

<template>
  <CollectivoContainer>
    <p>Demo für Tafel Termin System</p>
    <UButton
      label="Neue Termine aussuchen"
      icon="i-mi-circle-add"
      size="md"
      class="mt-5"
      @click="navigateTo('/tafel/calendar')"
    />
  </CollectivoContainer>
  <div v-if="events.length > 0">
    <h1 class="my-5">Meine Termine</h1>
    <div v-for="(event, i) in events" :key="i" class="mb-5">
      <CollectivoCard>
        <template #content>
          <h4>{{ event.tafel_date }} - Angemeldet</h4>
          <p>Beschreibungstext für den Termin</p>
          <UButton
            label="Teilnahme absagen"
            color="red"
            class="mt-2"
            size="md"
            @click="cancelEvent(event.id)"
          />
        </template>
      </CollectivoCard>
    </div>
  </div>
</template>
