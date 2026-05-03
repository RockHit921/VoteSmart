// Add future dates dynamically relative to current date so the countdown is always active for demonstration

export const upcomingElections = [
  {
    id: 1,
    state: 'Maharashtra',
    type: 'Assembly Elections',
    // 32 days from now
    date: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 45 * 60 * 1000).toISOString(),
    mapIcon: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Maharashtra_locator_map.svg'
  },
  {
    id: 2,
    state: 'Jharkhand',
    type: 'Assembly Elections',
    // 15 days from now
    date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000).toISOString(),
    mapIcon: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Jharkhand_locator_map.svg'
  },
  {
    id: 3,
    state: 'Delhi',
    type: 'Assembly Elections',
    // 90 days from now
    date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    mapIcon: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Delhi_locator_map.svg'
  },
  {
    id: 4,
    state: 'Bihar',
    type: 'Assembly Elections',
    // 120 days from now
    date: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
    mapIcon: ''
  },
  {
    id: 5,
    state: 'West Bengal',
    type: 'Assembly Elections',
    // 150 days from now
    date: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toISOString(),
    mapIcon: ''
  }
];
