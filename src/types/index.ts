export type EventVertical = 
  | 'wedding' 
  | 'birthday' 
  | 'corporate' 
  | 'babyshower' 
  | 'anniversary' 
  | 'soiree' 
  | 'fundraiser';

export type BudgetTier = 'smart_saver' | 'balanced_chic' | 'luxury_signature';

export type VibeStyle = 
  | 'Boho Botanical' 
  | 'Cyberpunk Neon' 
  | 'Old Money Elegance' 
  | 'Modern Minimalist' 
  | 'Rustic Vineyard' 
  | 'Black Tie Glamour' 
  | 'Tropical Riviera';

export interface ColorPalette {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  description: string;
}

export interface BudgetItem {
  id: string;
  category: 'Venue' | 'Catering' | 'Decor & Floral' | 'Photo & Video' | 'Music & AV' | 'Attire & Glam' | 'Stationery & Favors' | 'Contingency';
  name: string;
  allocatedAmount: number;
  actualAmount: number;
  paidAmount: number;
  status: 'pending' | 'deposit_paid' | 'paid_in_full' | 'overdue';
  notes?: string;
}

export interface TimelineItem {
  id: string;
  time: string; // e.g., "16:00"
  endTime?: string; // e.g., "17:00"
  title: string;
  description: string;
  category: 'prep' | 'ceremony' | 'reception' | 'dining' | 'entertainment' | 'logistics';
  leadPersonnel: string;
  location?: string;
  isCompleted: boolean;
}

export interface Guest {
  id: string;
  name: string;
  email?: string;
  group: 'family' | 'vip' | 'friends' | 'colleagues' | 'plus_one';
  rsvpStatus: 'confirmed' | 'declined' | 'pending';
  dietary: 'none' | 'vegan' | 'vegetarian' | 'halal' | 'kosher' | 'gluten_free' | 'nut_allergy';
  tableId?: string;
  notes?: string;
}

export interface SeatingTable {
  id: string;
  name: string;
  shape: 'round' | 'rectangular' | 'sweetheart';
  capacity: number;
  assignedGuestIds: string[];
}

export interface ChecklistItem {
  id: string;
  phase: '6-12 Months' | '2-3 Months' | '1 Month' | 'Week Of' | 'Day Of' | 'Post Event';
  title: string;
  assignedTo?: string;
  dueDate?: string;
  isCompleted: boolean;
  notes?: string;
}

export interface VendorContact {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  quoteAmount: number;
  contractStatus: 'inquiry' | 'quote_received' | 'contract_signed' | 'paid';
  rating?: number;
}

export interface EventDetails {
  id: string;
  title: string;
  vertical: EventVertical;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  location: string;
  isOutdoor: boolean;
  totalBudget: number;
  targetGuestCount: number;
  vibe: VibeStyle;
  primaryNotes: string;
  colorPalette: ColorPalette;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedActions?: {
    label: string;
    actionType: 'apply_budget' | 'add_timeline' | 'set_theme' | 'open_tab';
    payload?: any;
  }[];
}

export interface BeveragePlan {
  totalDrinks: number;
  wineBottles: number;
  beerCases: number;
  liquorBottles: number;
  champagneToastBottles: number;
  iceLbs: number;
  glasswareEstimate: number;
  signatureMocktail: string;
  signatureCocktail: string;
}
