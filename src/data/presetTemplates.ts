import { EventDetails, BudgetItem, TimelineItem, ChecklistItem, SeatingTable, Guest, ColorPalette } from '../types';

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  event: EventDetails;
  budgetItems: BudgetItem[];
  timelineItems: TimelineItem[];
  checklistItems: ChecklistItem[];
  tables: SeatingTable[];
  sampleGuests: Guest[];
}

export const PRESET_PALETTES: Record<string, ColorPalette> = {
  botanical: {
    name: 'Botanical Vineyard',
    primary: '#1E392A', // Deep Forest Pine
    secondary: '#D4AF37', // Antique Gold
    accent: '#E6D7C3', // Champagne Sand
    background: '#0D1A13',
    text: '#F3F4F6',
    description: 'Earthy organic greenery paired with brushed brass and warm candlelight.'
  },
  cyberpunk: {
    name: 'Cyberpunk Neon Nights',
    primary: '#7928CA', // Electric Violet
    secondary: '#FF0080', // Hot Magenta
    accent: '#00DFD8', // Cyan Glow
    background: '#0B0914',
    text: '#F8FAFC',
    description: 'High-energy nocturnal pulse with ultraviolet glow and hyper-contemporary edge.'
  },
  oldmoney: {
    name: 'Old Money Black Tie',
    primary: '#0F172A', // Midnight Slate
    secondary: '#C5A059', // Heritage Gold
    accent: '#FFFFFF', // Pure Crisp White
    background: '#05070A',
    text: '#F8FAFC',
    description: 'Timeless aristocratic grandeur, crystal chandeliers, velvet and pressed linen.'
  },
  minimalist: {
    name: 'Nordic Modern Minimalist',
    primary: '#334155', // Slate Grey
    secondary: '#94A3B8', // Mist Silver
    accent: '#E2E8F0', // Soft Alabaster
    background: '#0F172A',
    text: '#F8FAFC',
    description: 'Sculptural floral silhouettes, clean lines, negative space and understated luxury.'
  },
  celestial: {
    name: 'Celestial Rose Sunset',
    primary: '#881337', // Deep Wine Velvet
    secondary: '#FB7185', // Rose Quartz
    accent: '#FDE047', // Stardust Gold
    background: '#1C060E',
    text: '#FFF1F2',
    description: 'Ethereal twilight hues, shimmering champagne highlights, and starry ambient lighting.'
  }
};

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: 'botanical-wedding',
    name: 'Botanical Vineyard Wedding',
    description: 'Romantic outdoor-indoor winery celebration with acoustic twilight ceremony and farm-to-table banquet.',
    icon: 'HeartHandshake',
    event: {
      id: 'evt-botanical-wedding',
      title: 'Elena & Julian’s Vineyard Wedding',
      vertical: 'wedding',
      date: '2026-11-14',
      startTime: '15:30',
      endTime: '23:30',
      location: 'Mirador Estate Vineyards, Napa Valley',
      isOutdoor: true,
      totalBudget: 35000,
      targetGuestCount: 110,
      vibe: 'Rustic Vineyard',
      primaryNotes: 'Outdoor ceremony on lawn under oak grove, followed by barrel-room banquet dinner and live 5-piece soul band.',
      colorPalette: PRESET_PALETTES.botanical
    },
    budgetItems: [
      { id: 'b1', category: 'Venue', name: 'Vineyard Lawn & Barrel Cellar Hire', allocatedAmount: 11000, actualAmount: 10500, paidAmount: 5000, status: 'deposit_paid', notes: 'Includes ceremony arches and bridal suite' },
      { id: 'b2', category: 'Catering', name: 'Organic 3-Course Plated & Pairing', allocatedAmount: 10500, actualAmount: 10800, paidAmount: 3500, status: 'deposit_paid', notes: '$98/head + estate vintage wine pairing' },
      { id: 'b3', category: 'Photo & Video', name: '8-Hour Golden Hour & Drone Coverage', allocatedAmount: 4200, actualAmount: 4000, paidAmount: 2000, status: 'deposit_paid', notes: 'Includes second shooter and 4k highlight reel' },
      { id: 'b4', category: 'Music & AV', name: 'Acoustic Duo + 5-Piece Soul Band', allocatedAmount: 3200, actualAmount: 3200, paidAmount: 1000, status: 'deposit_paid', notes: 'Duo for ceremony, live band for evening dance' },
      { id: 'b5', category: 'Decor & Floral', name: 'Eucalyptus Garlands, Olive Sprigs & Arches', allocatedAmount: 3500, actualAmount: 3600, paidAmount: 1200, status: 'deposit_paid', notes: 'Seasonal local blooms, brass candelabras' },
      { id: 'b6', category: 'Stationery & Favors', name: 'Letterpress Vellum Invites & Olive Oil Favors', allocatedAmount: 1100, actualAmount: 950, paidAmount: 950, status: 'paid_in_full', notes: 'Custom mini olive oil bottles with wax seals' },
      { id: 'b7', category: 'Contingency', name: 'Weather Backup Tent Deposit & Buffer', allocatedAmount: 1500, actualAmount: 500, paidAmount: 500, status: 'paid_in_full', notes: 'Rain hold on clear-top marquee' }
    ],
    timelineItems: [
      { id: 't1', time: '13:00', endTime: '14:30', title: 'Bridal Party & Groom Prep', description: 'Hair, makeup touch-up, boutonniere pinning and bridal suite toast.', category: 'prep', leadPersonnel: 'Maid of Honor / Best Man', location: 'Estate Manor Suite', isCompleted: false },
      { id: 't2', time: '14:30', endTime: '15:15', title: 'First Look & Golden Portraits', description: 'Private first look in the olive grove followed by wedding party portraits.', category: 'prep', leadPersonnel: 'Lead Photographer', location: 'Olive Orchard', isCompleted: false },
      { id: 't3', time: '15:30', endTime: '16:15', title: 'Ceremony Under Oak Canopy', description: 'Processional with string duo, exchange of personal vows and ring blessing.', category: 'ceremony', leadPersonnel: 'Celebrant', location: 'Lawn Amphitheater', isCompleted: false },
      { id: 't4', time: '16:15', endTime: '17:30', title: 'Cocktail Hour & Passed Canapés', description: 'Brut sparkling wine, fig & prosciutto crostini, acoustic jazz set.', category: 'reception', leadPersonnel: 'Catering Lead', location: 'Vineyard Terrace', isCompleted: false },
      { id: 't5', time: '17:45', endTime: '19:45', title: 'Grand Entrance & Plated Dinner', description: 'Welcome toast by father of the bride, 3-course dinner with vintage pairings.', category: 'dining', leadPersonnel: 'Maitre D', location: 'Barrel Cellar Hall', isCompleted: false },
      { id: 't6', time: '20:00', endTime: '20:30', title: 'Champagne Toasts & Cake Cutting', description: 'Best Man & Maid of Honor speeches, cutting of lemon olive oil tiered cake.', category: 'entertainment', leadPersonnel: 'MC / Bandleader', location: 'Barrel Cellar Hall', isCompleted: false },
      { id: 't7', time: '20:30', endTime: '23:15', title: 'First Dance & Soul Dance Party', description: 'First dance to Leon Bridges, high-energy soul and funk dance set.', category: 'entertainment', leadPersonnel: '5-Piece Band', location: 'Dance Floor', isCompleted: false },
      { id: 't8', time: '23:15', endTime: '23:30', title: 'Sparkler Send-off', description: 'Guests form twin sparkler tunnel to vintage getaway roadster.', category: 'logistics', leadPersonnel: 'Event Coordinator', location: 'Estate Driveway', isCompleted: false }
    ],
    checklistItems: [
      { id: 'c1', phase: '6-12 Months', title: 'Lock in estate venue & secure off-peak winery date', assignedTo: 'Couple', isCompleted: true },
      { id: 'c2', phase: '6-12 Months', title: 'Hire photographer and videographer with golden hour portfolio', assignedTo: 'Elena', isCompleted: true },
      { id: 'c3', phase: '2-3 Months', title: 'Conduct menu tasting & select estate wine vintages', assignedTo: 'Julian', isCompleted: true },
      { id: 'c4', phase: '2-3 Months', title: 'Finalize floral arch specs and table runners', assignedTo: 'Elena', isCompleted: false },
      { id: 'c5', phase: '1 Month', title: 'Collect RSVP dietary counts (vegan, celiac, nut allergies)', assignedTo: 'Coordinator', isCompleted: false },
      { id: 'c6', phase: 'Week Of', title: 'Print seating chart board, table numbers & personalized place cards', assignedTo: 'Elena', isCompleted: false },
      { id: 'c7', phase: 'Day Of', title: 'Confirm arrival of ice, sound check with live band & floral install', assignedTo: 'Lead Coordinator', isCompleted: false }
    ],
    tables: [
      { id: 'tbl-1', name: 'Table 1 - Head Table', shape: 'sweetheart', capacity: 2, assignedGuestIds: ['g1', 'g2'] },
      { id: 'tbl-2', name: 'Table 2 - Family Crest', shape: 'round', capacity: 8, assignedGuestIds: ['g3', 'g4', 'g5', 'g6'] },
      { id: 'tbl-3', name: 'Table 3 - College Crew', shape: 'round', capacity: 10, assignedGuestIds: ['g7', 'g8', 'g9'] },
      { id: 'tbl-4', name: 'Table 4 - West Coast Friends', shape: 'rectangular', capacity: 10, assignedGuestIds: [] }
    ],
    sampleGuests: [
      { id: 'g1', name: 'Elena Rostova', group: 'vip', rsvpStatus: 'confirmed', dietary: 'gluten_free', tableId: 'tbl-1', notes: 'Bride' },
      { id: 'g2', name: 'Julian Vance', group: 'vip', rsvpStatus: 'confirmed', dietary: 'none', tableId: 'tbl-1', notes: 'Groom' },
      { id: 'g3', name: 'Arthur Vance', group: 'family', rsvpStatus: 'confirmed', dietary: 'none', tableId: 'tbl-2', notes: 'Father of the Groom' },
      { id: 'g4', name: 'Margaret Vance', group: 'family', rsvpStatus: 'confirmed', dietary: 'vegetarian', tableId: 'tbl-2', notes: 'Mother of the Groom' },
      { id: 'g5', name: 'Sofia Rostova', group: 'family', rsvpStatus: 'confirmed', dietary: 'vegan', tableId: 'tbl-2', notes: 'Maid of Honor' },
      { id: 'g6', name: 'Dr. Leo Rostova', group: 'family', rsvpStatus: 'confirmed', dietary: 'none', tableId: 'tbl-2', notes: 'Father of the Bride' },
      { id: 'g7', name: 'Marcus Sterling', group: 'friends', rsvpStatus: 'confirmed', dietary: 'none', tableId: 'tbl-3', notes: 'Best Man' },
      { id: 'g8', name: 'Chloe Chen', group: 'friends', rsvpStatus: 'confirmed', dietary: 'halal', tableId: 'tbl-3', notes: 'College roommate' },
      { id: 'g9', name: 'David Kim', group: 'friends', rsvpStatus: 'confirmed', dietary: 'nut_allergy', tableId: 'tbl-3', notes: 'Severe tree nut allergy' }
    ]
  },
  {
    id: 'cyberpunk-birthday',
    name: 'Cyberpunk Neon 30th Birthday',
    description: 'Electric immersive rooftop bash with laser lighting, retro synthwave DJ, signature molecular cocktails, and LED photo booth.',
    icon: 'Sparkles',
    event: {
      id: 'evt-cyberpunk-30',
      title: 'Neon Odyssey: Leo’s Level 30',
      vertical: 'birthday',
      date: '2026-10-31',
      startTime: '20:00',
      endTime: '02:30',
      location: 'Skyline Loft & Glass Penthouse, Downtown',
      isOutdoor: false,
      totalBudget: 9500,
      targetGuestCount: 55,
      vibe: 'Cyberpunk Neon',
      primaryNotes: 'Dress code: Cyberpunk / Neo-Tokyo techwear or dark neon accents. Neon cocktail towers, interactive retro arcade station, holographic visuals.',
      colorPalette: PRESET_PALETTES.cyberpunk
    },
    budgetItems: [
      { id: 'cb1', category: 'Venue', name: 'Downtown Rooftop Loft Rental', allocatedAmount: 3200, actualAmount: 3200, paidAmount: 3200, status: 'paid_in_full', notes: 'Includes laser-ready blackout blinds' },
      { id: 'cb2', category: 'Catering', name: 'Gourmet Asian Fusion Bao & Yakitori Bar', allocatedAmount: 2600, actualAmount: 2450, paidAmount: 1000, status: 'deposit_paid', notes: 'Live bao steamer station + glowing mocktails' },
      { id: 'cb3', category: 'Music & AV', name: 'Synthwave / Dark Disco DJ & Lasers', allocatedAmount: 1400, actualAmount: 1500, paidAmount: 750, status: 'deposit_paid', notes: 'Includes laser projection & haze machine' },
      { id: 'cb4', category: 'Decor & Floral', name: 'Custom Neon Signs & Holographic LED Walls', allocatedAmount: 1200, actualAmount: 1100, paidAmount: 1100, status: 'paid_in_full', notes: 'Custom "LEVEL 30" pink/cyan neon sign' },
      { id: 'cb5', category: 'Photo & Video', name: '360 Video Booth & Roaming Flash Pro', allocatedAmount: 800, actualAmount: 850, paidAmount: 400, status: 'deposit_paid', notes: 'Matrix-style bullet-time photo rig' },
      { id: 'cb6', category: 'Contingency', name: 'Emergency Bar Spares & Cleaning Buffer', allocatedAmount: 300, actualAmount: 100, paidAmount: 100, status: 'paid_in_full', notes: 'Reserved for extra dry ice' }
    ],
    timelineItems: [
      { id: 'ct1', time: '19:00', endTime: '20:00', title: 'Tech Setup & Haze Test', description: 'DJ soundcheck, calibrate neon tube DMX lighting, prep liquid nitrogen bar.', category: 'prep', leadPersonnel: 'AV Director', location: 'Penthouse Stage', isCompleted: false },
      { id: 'ct2', time: '20:00', endTime: '21:15', title: 'Doors Open & Glowing Welcome Shots', description: 'Guests arrive to ambient retrowave, receive LED wristbands and signature neon cocktails.', category: 'reception', leadPersonnel: 'Host Lead', location: 'Neon Tunnel Entrance', isCompleted: false },
      { id: 'ct3', time: '21:15', endTime: '22:30', title: 'Bao & Yakitori Street Stations', description: 'Roaming gourmet sliders, glazed skewers, and retro arcade tournament kick-off.', category: 'dining', leadPersonnel: 'Catering Crew', location: 'Dining Deck', isCompleted: false },
      { id: 'ct4', time: '22:30', endTime: '23:00', title: 'Level 30 Hologram Cake & Cyber Toast', description: 'Geometric black sesame geometric cake with sparklers, toast by friends.', category: 'ceremony', leadPersonnel: 'Leo', location: 'Center Podium', isCompleted: false },
      { id: 'ct5', time: '23:00', endTime: '02:00', title: 'Peak DJ Set & 360 Video Booth Live', description: 'Heavy cyberpunk synth & bass drops, 360 camera captures instant reels.', category: 'entertainment', leadPersonnel: 'DJ KRONOS', location: 'Main Loft Floor', isCompleted: false },
      { id: 'ct6', time: '02:00', endTime: '02:30', title: 'Midnight Ramen & Chilldown', description: 'Warm midnight miso ramen cups served before guest rideshares arrive.', category: 'logistics', leadPersonnel: 'Host', location: 'Lounge Bar', isCompleted: false }
    ],
    checklistItems: [
      { id: 'cc1', phase: '2-3 Months', title: 'Secure downtown loft and verify sound curfew permits', assignedTo: 'Leo', isCompleted: true },
      { id: 'cc2', phase: '1 Month', title: 'Order custom neon acrylic LED sign ("LEVEL 30")', assignedTo: 'Sam', isCompleted: true },
      { id: 'cc3', phase: 'Week Of', title: 'Build synchronized Spotify/Pioneer DJ setlist cue sheet', assignedTo: 'DJ Kronos', isCompleted: false },
      { id: 'cc4', phase: 'Day Of', title: 'Pick up dry ice pellets for smoking cocktail towers', assignedTo: 'Alex', isCompleted: false }
    ],
    tables: [
      { id: 'tbl-c1', name: 'VIP Neo-Lounge Booth', shape: 'rectangular', capacity: 8, assignedGuestIds: ['cg1', 'cg2'] },
      { id: 'tbl-c2', name: 'Arcade Deck Table', shape: 'round', capacity: 6, assignedGuestIds: ['cg3'] },
      { id: 'tbl-c3', name: 'Bar High-Tops', shape: 'round', capacity: 4, assignedGuestIds: [] }
    ],
    sampleGuests: [
      { id: 'cg1', name: 'Leo Sterling', group: 'vip', rsvpStatus: 'confirmed', dietary: 'none', tableId: 'tbl-c1', notes: 'Birthday Honoree' },
      { id: 'cg2', name: 'Sora Tanaka', group: 'friends', rsvpStatus: 'confirmed', dietary: 'vegan', tableId: 'tbl-c1', notes: 'Lead co-organizer' },
      { id: 'cg3', name: 'Maya Lin', group: 'friends', rsvpStatus: 'confirmed', dietary: 'gluten_free', tableId: 'tbl-c2', notes: 'DJ liaison' }
    ]
  },
  {
    id: 'tech-gala',
    name: 'Tech Innovation Summit & Gala',
    description: 'High-profile corporate product unveiling and black-tie seated awards dinner for key clients and global stakeholders.',
    icon: 'Briefcase',
    event: {
      id: 'evt-tech-summit',
      title: 'NexGen AI Global Keynote & Awards Gala',
      vertical: 'corporate',
      date: '2026-12-05',
      startTime: '17:00',
      endTime: '22:00',
      location: 'Grand Ballroom, The St. Regis Financial Center',
      isOutdoor: false,
      totalBudget: 85000,
      targetGuestCount: 220,
      vibe: 'Black Tie Glamour',
      primaryNotes: 'Full multi-screen LED keynote presentation, 3-course synchronized banquet, investor networking lounge, live press coverage.',
      colorPalette: PRESET_PALETTES.oldmoney
    },
    budgetItems: [
      { id: 'gb1', category: 'Venue', name: 'Grand Ballroom & Pre-Function Foyers', allocatedAmount: 28000, actualAmount: 28000, paidAmount: 28000, status: 'paid_in_full', notes: 'Includes stage rig, green room and security' },
      { id: 'gb2', category: 'Catering', name: 'Executive Plated Dinner & Wine Service', allocatedAmount: 26000, actualAmount: 25500, paidAmount: 12000, status: 'deposit_paid', notes: '$115/person fine dining 3-course' },
      { id: 'gb3', category: 'Music & AV', name: 'Multi-Wall LED Keynote Stage & Sound Array', allocatedAmount: 16000, actualAmount: 16800, paidAmount: 10000, status: 'deposit_paid', notes: '4K livestream rig + wireless mics' },
      { id: 'gb4', category: 'Decor & Floral', name: 'Architectural Florals & Stage Branding', allocatedAmount: 5000, actualAmount: 4800, paidAmount: 4800, status: 'paid_in_full', notes: 'Low-profile orchid centerpieces' },
      { id: 'gb5', category: 'Photo & Video', name: 'Dual 4K Broadcast Crew & Step-and-Repeat', allocatedAmount: 6000, actualAmount: 6000, paidAmount: 3000, status: 'deposit_paid', notes: 'Immediate social media press clip delivery' },
      { id: 'gb6', category: 'Contingency', name: 'Overtime & VIP Hospitality Rider', allocatedAmount: 4000, actualAmount: 1000, paidAmount: 1000, status: 'paid_in_full', notes: 'Executive rider amenities' }
    ],
    timelineItems: [
      { id: 'gt1', time: '17:00', endTime: '18:15', title: 'Executive Arrival & Champagne Networking', description: 'Press check-in at media wall, champagne flutes, jazz trio background.', category: 'reception', leadPersonnel: 'VIP Relations Lead', location: 'Pre-Function Gallery', isCompleted: false },
      { id: 'gt2', time: '18:15', endTime: '19:15', title: 'Main Keynote: The Autonomous Era', description: 'CEO unveiling of next-generation intelligence platform, dynamic stage visuals.', category: 'ceremony', leadPersonnel: 'AV Production Director', location: 'Grand Ballroom Stage', isCompleted: false },
      { id: 'gt3', time: '19:30', endTime: '21:00', title: 'Synchronized 3-Course Banquet', description: 'White-glove synchronized dinner service, keynote fireside conversation.', category: 'dining', leadPersonnel: 'Executive Chef', location: 'Main Ballroom', isCompleted: false },
      { id: 'gt4', time: '21:00', endTime: '21:45', title: 'Annual Innovation Excellence Awards', description: 'Presentation of 6 global industry awards with video showcases.', category: 'entertainment', leadPersonnel: 'MC & Board Chair', location: 'Grand Ballroom Stage', isCompleted: false },
      { id: 'gt5', time: '21:45', endTime: '22:30', title: 'Post-Gala Cognac & Dessert Lounge', description: 'Espresso martini bar, artisan petit fours, executive networking.', category: 'reception', leadPersonnel: 'Floor Manager', location: 'Mezzanine Lounge', isCompleted: false }
    ],
    checklistItems: [
      { id: 'gc1', phase: '6-12 Months', title: 'Contract hotel ballroom and reserve room block for overseas dignitaries', assignedTo: 'Events VP', isCompleted: true },
      { id: 'gc2', phase: '2-3 Months', title: 'Complete AV walkthrough & bandwidth speed test for live keynote streaming', assignedTo: 'Tech Lead', isCompleted: true },
      { id: 'gc3', phase: '1 Month', title: 'Engrave crystal glass trophies for 6 award winners', assignedTo: 'Communications Team', isCompleted: false },
      { id: 'gc4', phase: 'Day Of', title: 'Perform teleprompter test and mic checks with keynote speakers', assignedTo: 'Show Runner', isCompleted: false }
    ],
    tables: [
      { id: 'tbl-g1', name: 'Table 1 - Board of Directors', shape: 'round', capacity: 10, assignedGuestIds: ['gg1', 'gg2'] },
      { id: 'tbl-g2', name: 'Table 2 - Keynote Speakers & Press', shape: 'round', capacity: 10, assignedGuestIds: [] },
      { id: 'tbl-g3', name: 'Table 3 - Enterprise Partners', shape: 'round', capacity: 10, assignedGuestIds: [] }
    ],
    sampleGuests: [
      { id: 'gg1', name: 'Dr. Sarah Al-Mansoor', group: 'vip', rsvpStatus: 'confirmed', dietary: 'halal', tableId: 'tbl-g1', notes: 'Keynote Speaker' },
      { id: 'gg2', name: 'Thomas Vance', group: 'vip', rsvpStatus: 'confirmed', dietary: 'none', tableId: 'tbl-g1', notes: 'Chief Executive Officer' }
    ]
  }
];
