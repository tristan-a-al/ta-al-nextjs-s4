import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import React from "react";
import { useRouter } from "next/router";

function AllEventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  function searchEventsHandler(selectedYear, selectedMonth) {
    const fullPath = `/events/${selectedYear}/${selectedMonth}/`;
    router.push(fullPath);
  }

  return (
    <React.Fragment>
      <EventsSearch onSearch={searchEventsHandler} />
      <EventList items={events} />
    </React.Fragment>
  );
}

export default AllEventsPage;
