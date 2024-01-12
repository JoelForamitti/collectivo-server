<script setup>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";

const viewType = ref("");
const innerWidth = ref("");

const calendarOptions = ref({
  plugins: [dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  headerToolbar: false,
  fixedWeekCount: false,
  // contentHeight: 'auto',
  views: {
    dayGrid: {
      dayMaxEventRows: 2,
    },
  },
  events: [
    {
      id: 1,
      title: "Team Meeting",
      start: "2024-01-08",
    },
    {
      id: 2,
      title: "Marketing strategy",
      start: "2024-01-08",
    },
    {
      id: 3,
      title: "Web development",
      start: "2024-01-15",
      backgroundColor: "#FFF7E3",
      textColor: "#D36D29",
    },
    {
      id: 4,
      title: "Team Meeting",
      start: "2024-01-15",
      textColor: "#D36D29",
      backgroundColor: "#FFF7E3",
    },
    {
      id: 5,
      title: "Public relation",
      start: "2024-01-11",
      backgroundColor: "#EAFFF8",
      textColor: "#2CB3A5",
    },
    {
      id: 6,
      title: "Team Meeting",
      start: "2024-01-11",
      backgroundColor: "#EAFFF8",
      textColor: "#2CB3A5",
    },

    {
      id: 7,
      title: "Team Meeting",
      start: "2024-01-21",
    },
    {
      id: 8,
      title: "Marketing strategy",
      start: "2024-01-21",
    },
    {
      id: 9,
      title: "Team Meeting",
      start: "2024-01-20",
      backgroundColor: "#EAFFF8",
      textColor: "#2CB3A5",
    },
    {
      id: 10,
      title: "Marketing strategy",
      start: "2024-01-12",
      backgroundColor: "#EAFFF8",
      textColor: "#2CB3A5",
    },
  ],
});

const calendarRef = ref(null);

const calendarComputed = () => {
  return calendarRef;
};

onMounted(() => {
  resize();
  window.addEventListener("resize", resize);
});

const resize = async () => {
  const deviceWidth = window.matchMedia("(max-width: 767px)");
  const calendar = await calendarRef.value.getApi();

  if (deviceWidth.matches) {
    innerWidth.value = `${window.innerWidth}px`;
    calendar.changeView("listWeek");
    calendar.setHeight(585);
    viewType.value = "listWeek";
  } else {
    calendar.changeView("dayGridMonth");
    viewType.value = "";
  }
};
</script>

<template>
  <div id="tafel-calendar" class="calendar">
    <TafelCalendarHeader :calendar-ref="calendarComputed()" />
    <full-calendar ref="calendarRef" :options="calendarOptions">
      <template #eventContent="arg">
        <div
          :class="viewType === 'listWeek' ? 'list-week-view' : 'day-grid-view'"
        >
          {{ arg.event.title }}
        </div>
      </template>
    </full-calendar>
  </div>
</template>

<style lang="scss">
.calendar {
  @apply mt-10;
}

#tafel-calendar {
  .fc-view-harness {
    @apply rounded-xl bg-white overflow-x-auto;
    box-shadow: 0px 6px 48px 0px rgba(220, 226, 239, 0.5);

    .fc-timeGridWeek-view,
    .fc-dayGridMonth-view,
    .fc-listWeek-view {
      @apply p-6 overflow-auto;

      .fc-scrollgrid {
        @apply rounded-2xl border-t-0 border-l-0;

        .fc-scrollgrid-section-header {
          th {
            @apply border-none text-sm p-0 leading-4 font-semibold uppercase -mt-1;

            a {
              @apply p-0 pb-4;
            }
          }
        }
      }
    }

    .fc-timeGridWeek-view,
    .fc-dayGridMonth-view {
      tbody {
        tr {
          td {
            @apply border-gray-300;
          }
        }
      }
    }
  }

  .fc-listWeek-view {
    @apply border-none;

    th {
      @apply bg-[#F4F7FE] rounded-xl font-medium text-sm text-primary;
      .fc-cell-shaded {
        @apply bg-transparent py-3 px-5;
      }
    }

    .fc-list-day-text {
      @apply uppercase;
    }
  }

  .fc-scrollgrid-section {
    > td {
      @apply border-[1px] border-solid border-gray-300 rounded-2xl;
    }
  }

  .fc-header-toolbar {
    .fc-toolbar-chunk {
      > div {
        @apply flex items-center;
      }

      .fc-toolbar-title {
        @apply mr-6 font-urbanist font-semibold text-2xl;
      }

      .fc-next-button {
        @apply ml-2.5;
      }

      .fc-next-button,
      .fc-prev-button {
        @apply p-0.5 bg-primary-500 rounded-lg border-none focus:shadow-none;
        &:hover {
          @apply bg-primary-500/70;
        }

        .fc-icon {
          @apply h-6 w-6 text-primary;
        }
      }
    }
  }

  a.fc-daygrid-day-number {
    @apply text-left absolute bottom-0 left-0 px-3 py-2 text-sm  text-primary tracking-[0.24px] font-semibold leading-4;
  }

  .fc-day-past {
    a.fc-daygrid-day-number {
      @apply text-[#A1A6AC];
    }
  }

  .fc-col-header {
    tbody {
      tr {
        th {
          //
          //a {
          //  text-decoration: none;
          //}
          //
          //h6 {
          //  margin-bottom: 0;
          //}
          //
          //h3 {
          //  margin-bottom: 0;
          //}
        }
      }
    }
  }

  .fc-daygrid-day-events {
  }

  .fc-daygrid-body {
    tr {
      @apply h-[100px] overflow-hidden;
    }

    .fc-daygrid-day {
      .fc-daygrid-day-frame {
      }

      .fc-daygrid-day-number {
        &:hover {
          //text-decoration: none;
        }
      }

      &.fc-day-today {
        @apply bg-blue-50;
      }
    }
  }

  .list-week-view,
  .day-grid-view {
    @apply overflow-x-hidden overflow-ellipsis;
  }

  .fc-daygrid-day-events {
    @apply mt-0;
  }

  .fc-daygrid-event {
    @apply font-semibold text-xs bg-primary-100 border-none py-2 px-3 rounded-lg transition-all cursor-pointer mt-1 mr-[5px] mb-[3px] ml-1;

    .fc-event-main {
      @apply text-primary-500;
    }

    //&:hover {
    //  @apply bg-primary-500/60;
    //}
  }

  .fc-daygrid-day-bottom {
    @apply flex justify-end font-medium text-gray-500 text-xs mr-1.5;
  }

  .fc-list {
    @apply border-0;

    .fc-list-event + .fc-list-event:not(.fc-list-day) {
      @apply border-t-[1px] border-gray-300;
    }

    .fc-list-event {
      td {
        @apply px-5 py-2.5 pr-0 border-0;
      }

      th {
        @apply border-none border-b-0;
      }

      &:hover {
        td {
          @apply bg-transparent;
        }
      }

      td.fc-list-event-time {
        @apply text-sm font-medium text-primary/60 leading-8;
      }

      td .fc-list-event-dot {
        @apply hidden;
      }

      td .list-week-view {
        @apply font-semibold text-xs bg-primary-500 border-none py-2 px-3 rounded-lg transition-all cursor-pointer text-primary-500;
      }
    }

    .fc-list-table {
      th {
        @apply border-y-0;
      }
    }

    //.fc-list-day-cushion {
    //  background-color: #fff;
    //}
  }
}

#dashboard-calendar.calendar-v2 {
  .fc-scroller-harness {
    @apply overflow-visible;
    .fc-scroller {
      @apply overflow-visible #{!important};
    }
  }

  .fc-view-harness {
    .fc-dayGridMonth-view {
      @apply p-6 pl-[54px] overflow-auto;

      .fc-daygrid-body {
        table {
          tbody {
            tr {
              @apply overflow-visible;

              td:first-child {
                @apply relative;
                &:before {
                  @apply bg-[#EFF9FF] text-blue-500 text-sm font-semibold text-center border border-blue-500 border-t-4 rounded-[3px] absolute top-1/2 -left-10 transform -translate-y-1/2 w-6 h-[22px] font-urbanist leading-[18px];
                }
              }

              &:nth-child(1) {
                td:first-child {
                  &:before {
                    content: "A";
                  }
                }
              }

              &:nth-child(2) td:first-child:before {
                content: "B";
              }

              &:nth-child(3) td:first-child:before {
                content: "C";
              }

              &:nth-child(4) td:first-child:before {
                content: "D";
              }

              &:nth-child(5) td:first-child:before {
                content: "E";
              }

              &:nth-child(6) td:first-child:before {
                content: "F";
              }
            }
          }
        }
      }
    }
  }
}
</style>
