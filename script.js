const eventsList = document.getElementById('events-list');

async function loadEvents() {
  try {
    const response = await fetch('events.json');
    if (!response.ok) {
      throw new Error('Unable to load starred repositories.');
    }

    const events = await response.json();
    renderEvents(events);
  } catch (error) {
    eventsList.innerHTML = `<li class="event-item">${error.message}</li>`;
  }
}

function renderEvents(events) {
  if (!events.length) {
    eventsList.innerHTML = '<li class="event-item">No starred repositories to show yet.</li>';
    return;
  }

  eventsList.innerHTML = '';

  events.forEach((event) => {
    const item = document.createElement('li');
    item.className = 'event-item';

    item.innerHTML = `
      <strong>${event.title}</strong>
      <div>${event.description}</div>
      <div class="event-meta">Repository: ${event.name} · Language: ${event.language} · Stars: ${event.stars.toLocaleString()} · Starred: ${event.date}</div>
    `;

    eventsList.appendChild(item);
  });
}

loadEvents();
