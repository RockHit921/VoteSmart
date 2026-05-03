export const updatesData = {
  important: [
    {
      id: 'imp_1',
      title: 'Electoral Roll Revision 2024',
      source: 'Election Commission of India',
      date: new Date().toISOString(),
      summary: 'The final electoral roll for the upcoming assembly elections has been published. Check your name online or via the Voter Helpline app.',
      url: '#',
      category: 'Deadline',
      isImportant: true,
      region: 'National'
    },
    {
      id: 'imp_2',
      title: 'Maharashtra Assembly Elections Announced',
      source: 'State Election Commission',
      date: new Date(Date.now() - 86400000).toISOString(),
      summary: 'Polling for all 288 constituencies in Maharashtra will be held in a single phase. Model Code of Conduct comes into immediate effect.',
      url: '#',
      category: 'Announcement',
      isImportant: true,
      region: 'Maharashtra'
    },
    {
      id: 'imp_3',
      title: 'Last Date for Voter Registration',
      source: 'ECI Notification',
      date: new Date(Date.now() - 172800000).toISOString(),
      summary: 'New voters must submit Form 6 before the deadline to be eligible to vote in the upcoming phase.',
      url: '#',
      category: 'Deadline',
      isImportant: true,
      region: 'National'
    }
  ],
  tips: [
    {
      id: 'tip_1',
      title: 'Valid ID Proofs at Polling Station',
      source: 'Voter Education',
      date: new Date().toISOString(),
      summary: 'You can use your EPIC (Voter ID), Aadhaar Card, PAN Card, Driving License, or Indian Passport to cast your vote. Carry the original document.',
      url: '#',
      category: 'Tip',
      isImportant: false,
      region: 'National'
    },
    {
      id: 'tip_2',
      title: 'How to use EVM & VVPAT',
      source: 'VoteSmart Guide',
      date: new Date(Date.now() - 259200000).toISOString(),
      summary: 'Press the blue button against your chosen candidate. Wait for the beep and check the printed slip in the VVPAT window for 7 seconds.',
      url: '#',
      category: 'Guide',
      isImportant: false,
      region: 'National'
    },
    {
      id: 'tip_3',
      title: 'Finding Your Polling Booth',
      source: 'Voter Services',
      date: new Date(Date.now() - 345600000).toISOString(),
      summary: 'SMS <ECIPS> <EPIC No> to 1950 or visit the NVSP portal to instantly locate your designated polling booth.',
      url: '#',
      category: 'Tip',
      isImportant: false,
      region: 'National'
    }
  ],
  fallbackNews: [
    {
      id: 'news_1',
      title: 'ECI Deploys Additional Observers for Fair Elections',
      source: 'The Hindu',
      date: new Date().toISOString(),
      summary: 'The Election Commission has ramped up security and deployed special expenditure observers across sensitive constituencies.',
      url: '#',
      category: 'News',
      isImportant: false,
      region: 'National'
    },
    {
      id: 'news_2',
      title: 'Record Youth Voter Turnout Expected',
      source: 'Times of India',
      date: new Date(Date.now() - 43200000).toISOString(),
      summary: 'Over 18 million first-time voters have registered for the upcoming phase, signaling strong youth participation in the democratic process.',
      url: '#',
      category: 'News',
      isImportant: false,
      region: 'National'
    },
    {
      id: 'news_3',
      title: 'Delhi Updates Local Polling Stations List',
      source: 'Hindustan Times',
      date: new Date(Date.now() - 90000000).toISOString(),
      summary: 'Voters in Delhi are advised to check the revised list of polling stations, as several locations have been shifted to larger school compounds.',
      url: '#',
      category: 'News',
      isImportant: false,
      region: 'Delhi'
    }
  ]
};
