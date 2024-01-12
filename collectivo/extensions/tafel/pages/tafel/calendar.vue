<!-- This section will be available under /example -->

<script setup lang="ts">
setCollectivoTitle("Tafel Events");
const eventIsOpen = ref(false);
</script>

<template>
  <CollectivoContainer>
    <TafelCalendar> </TafelCalendar>
  </CollectivoContainer>
  <UModal v-model="eventIsOpen"> EVENT </UModal>
</template>
