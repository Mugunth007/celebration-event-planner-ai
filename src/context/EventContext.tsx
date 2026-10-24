import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  EventDetails,
  BudgetItem,
  TimelineItem,
  ChecklistItem,
  SeatingTable,
  Guest,
  ChatMessage
} from '../types';
import { PRESET_TEMPLATES, PresetTemplate } from '../data/presetTemplates';
import { FullEventExportData } from '../services/exportService';

const STORAGE_KEY = 'celebraite_state_v1';

export type ActiveTab = 
  | 'overview' 
  | 'chat' 
  | 'budget' 
  | 'timeline' 
  | 'hospitality' 
  | 'seating' 
  | 'invites' 
  | 'vendors';

interface EventContextType {
  event: EventDetails;
  budgetItems: BudgetItem[];
  timelineItems: TimelineItem[];
  checklistItems: ChecklistItem[];
  tables: SeatingTable[];
  guests: Guest[];
  chatMessages: ChatMessage[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  updateEventDetails: (details: Partial<EventDetails>) => void;
  loadPresetTemplate: (templateId: string) => void;
  importFullData: (data: FullEventExportData) => void;
  resetToBlank: () => void;

  // Budget
  addBudgetItem: (item: Omit<BudgetItem, 'id'>) => void;
  updateBudgetItem: (id: string, partial: Partial<BudgetItem>) => void;
  deleteBudgetItem: (id: string) => void;

  // Timeline
  addTimelineItem: (item: Omit<TimelineItem, 'id' | 'isCompleted'> & { isCompleted?: boolean }) => void;
  updateTimelineItem: (id: string, partial: Partial<TimelineItem>) => void;
  deleteTimelineItem: (id: string) => void;
  toggleTimelineComplete: (id: string) => void;

  // Checklist
  addChecklistItem: (item: Omit<ChecklistItem, 'id'>) => void;
  toggleChecklistComplete: (id: string) => void;
  deleteChecklistItem: (id: string) => void;

  // Seating & Guests
  addTable: (table: Omit<SeatingTable, 'id' | 'assignedGuestIds'>) => void;
  updateTable: (id: string, partial: Partial<SeatingTable>) => void;
  deleteTable: (id: string) => void;
  addGuest: (guest: Omit<Guest, 'id'>) => void;
  updateGuest: (id: string, partial: Partial<Guest>) => void;
  deleteGuest: (id: string) => void;
  assignGuestToTable: (guestId: string, tableId: string | null) => void;

  // Chat
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChatHistory: () => void;
}

const defaultTemplate = PRESET_TEMPLATES[0];

const initialWelcomeMessage: ChatMessage = {
  id: 'msg-welcome',
  sender: 'assistant',
  content: `👋 **Welcome to CelebAura AI!** I am your Autonomous Celebration & Event Planning Director.\n\nI have preloaded **${defaultTemplate.event.title}**. You can review the budget, timeline, hospitality beverage calculator, seating chart, or asks questions right here. How can I assist you with your celebration today?`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestedActions: [
    { label: 'Audit Budget', actionType: 'open_tab', payload: 'budget' },
    { label: 'View Run-of-Show', actionType: 'open_tab', payload: 'timeline' },
    { label: 'Calculate Drinks & Ice', actionType: 'open_tab', payload: 'hospitality' }
  ]
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state or default template
  const loadInitialState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          event: parsed.event || defaultTemplate.event,
          budgetItems: parsed.budgetItems || defaultTemplate.budgetItems,
          timelineItems: parsed.timelineItems || defaultTemplate.timelineItems,
          checklistItems: parsed.checklistItems || defaultTemplate.checklistItems,
          tables: parsed.tables || defaultTemplate.tables,
          guests: parsed.guests || defaultTemplate.sampleGuests,
          chatMessages: parsed.chatMessages || [initialWelcomeMessage]
        };
      }
    } catch (e) {
      console.error('Failed to parse saved state', e);
    }
    return {
      event: defaultTemplate.event,
      budgetItems: defaultTemplate.budgetItems,
      timelineItems: defaultTemplate.timelineItems,
      checklistItems: defaultTemplate.checklistItems,
      tables: defaultTemplate.tables,
      guests: defaultTemplate.sampleGuests,
      chatMessages: [initialWelcomeMessage]
    };
  };

  const initial = loadInitialState();

  const [event, setEvent] = useState<EventDetails>(initial.event);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(initial.budgetItems);
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>(initial.timelineItems);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(initial.checklistItems);
  const [tables, setTables] = useState<SeatingTable[]>(initial.tables);
  const [guests, setGuests] = useState<Guest[]>(initial.guests);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initial.chatMessages);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  // Sync to local storage
  useEffect(() => {
    try {
      const payload = {
        event,
        budgetItems,
        timelineItems,
        checklistItems,
        tables,
        guests,
        chatMessages
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn('Could not persist state to localStorage', err);
    }
  }, [event, budgetItems, timelineItems, checklistItems, tables, guests, chatMessages]);

  const updateEventDetails = (details: Partial<EventDetails>) => {
    setEvent(prev => ({ ...prev, ...details }));
  };

  const loadPresetTemplate = (templateId: string) => {
    const found = PRESET_TEMPLATES.find(t => t.id === templateId);
    if (!found) return;

    setEvent(found.event);
    setBudgetItems(found.budgetItems);
    setTimelineItems(found.timelineItems);
    setChecklistItems(found.checklistItems);
    setTables(found.tables);
    setGuests(found.sampleGuests);

    const switchMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      content: `Switched active blueprint to **${found.name}**! All budget items, run-of-show cues, seating tables, and guest roster have been synchronized.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        { label: 'View Overview', actionType: 'open_tab', payload: 'overview' },
        { label: 'Check Budget Breakdown', actionType: 'open_tab', payload: 'budget' }
      ]
    };
    setChatMessages(prev => [...prev, switchMsg]);
  };

  const importFullData = (data: FullEventExportData) => {
    setEvent(data.event);
    setBudgetItems(data.budgetItems || []);
    setTimelineItems(data.timelineItems || []);
    setChecklistItems(data.checklistItems || []);
    setTables(data.tables || []);
    setGuests(data.guests || []);

    setChatMessages(prev => [
      ...prev,
      {
        id: 'msg-' + Date.now(),
        sender: 'assistant',
        content: `Successfully restored celebration dossier for **${data.event.title}**!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const resetToBlank = () => {
    const blankEvent: EventDetails = {
      id: 'evt-custom-' + Date.now(),
      title: 'New Custom Celebration',
      vertical: 'soiree',
      date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      startTime: '18:00',
      endTime: '23:00',
      location: 'Custom Venue',
      isOutdoor: false,
      totalBudget: 15000,
      targetGuestCount: 50,
      vibe: 'Modern Minimalist',
      primaryNotes: 'Blank canvas ready for AI orchestration.',
      colorPalette: PRESET_TEMPLATES[0].event.colorPalette
    };
    setEvent(blankEvent);
    setBudgetItems([]);
    setTimelineItems([]);
    setChecklistItems([]);
    setTables([]);
    setGuests([]);
  };

  // Budget
  const addBudgetItem = (item: Omit<BudgetItem, 'id'>) => {
    const newItem: BudgetItem = {
      ...item,
      id: 'b-' + Date.now() + Math.random().toString(36).substr(2, 4)
    };
    setBudgetItems(prev => [...prev, newItem]);
  };

  const updateBudgetItem = (id: string, partial: Partial<BudgetItem>) => {
    setBudgetItems(prev => prev.map(i => (i.id === id ? { ...i, ...partial } : i)));
  };

  const deleteBudgetItem = (id: string) => {
    setBudgetItems(prev => prev.filter(i => i.id !== id));
  };

  // Timeline
  const addTimelineItem = (item: Omit<TimelineItem, 'id' | 'isCompleted'> & { isCompleted?: boolean }) => {
    const newItem: TimelineItem = {
      ...item,
      isCompleted: item.isCompleted ?? false,
      id: 't-' + Date.now() + Math.random().toString(36).substr(2, 4)
    };
    setTimelineItems(prev => [...prev, newItem]);
  };

  const updateTimelineItem = (id: string, partial: Partial<TimelineItem>) => {
    setTimelineItems(prev => prev.map(t => (t.id === id ? { ...t, ...partial } : t)));
  };

  const deleteTimelineItem = (id: string) => {
    setTimelineItems(prev => prev.filter(t => t.id !== id));
  };

  const toggleTimelineComplete = (id: string) => {
    setTimelineItems(prev =>
      prev.map(t => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  // Checklist
  const addChecklistItem = (item: Omit<ChecklistItem, 'id'>) => {
    const newItem: ChecklistItem = {
      ...item,
      id: 'c-' + Date.now() + Math.random().toString(36).substr(2, 4)
    };
    setChecklistItems(prev => [...prev, newItem]);
  };

  const toggleChecklistComplete = (id: string) => {
    setChecklistItems(prev =>
      prev.map(c => (c.id === id ? { ...c, isCompleted: !c.isCompleted } : c))
    );
  };

  const deleteChecklistItem = (id: string) => {
    setChecklistItems(prev => prev.filter(c => c.id !== id));
  };

  // Seating & Guests
  const addTable = (table: Omit<SeatingTable, 'id' | 'assignedGuestIds'>) => {
    const newTable: SeatingTable = {
      ...table,
      id: 'tbl-' + Date.now(),
      assignedGuestIds: []
    };
    setTables(prev => [...prev, newTable]);
  };

  const updateTable = (id: string, partial: Partial<SeatingTable>) => {
    setTables(prev => prev.map(t => (t.id === id ? { ...t, ...partial } : t)));
  };

  const deleteTable = (id: string) => {
    setTables(prev => prev.filter(t => t.id !== id));
    // Clear guests assigned to this table
    setGuests(prev => prev.map(g => (g.tableId === id ? { ...g, tableId: undefined } : g)));
  };

  const addGuest = (guest: Omit<Guest, 'id'>) => {
    const newGuest: Guest = {
      ...guest,
      id: 'g-' + Date.now() + Math.random().toString(36).substr(2, 4)
    };
    setGuests(prev => [...prev, newGuest]);
    if (guest.tableId) {
      setTables(prev =>
        prev.map(t =>
          t.id === guest.tableId
            ? { ...t, assignedGuestIds: [...t.assignedGuestIds, newGuest.id] }
            : t
        )
      );
    }
  };

  const updateGuest = (id: string, partial: Partial<Guest>) => {
    setGuests(prev => {
      const oldGuest = prev.find(g => g.id === id);
      const updated = prev.map(g => (g.id === id ? { ...g, ...partial } : g));

      // Handle table id change
      if (partial.tableId !== undefined && oldGuest && oldGuest.tableId !== partial.tableId) {
        setTables(tbls =>
          tbls.map(t => {
            if (t.id === oldGuest.tableId) {
              return { ...t, assignedGuestIds: t.assignedGuestIds.filter(gid => gid !== id) };
            }
            if (t.id === partial.tableId) {
              return { ...t, assignedGuestIds: [...t.assignedGuestIds, id] };
            }
            return t;
          })
        );
      }
      return updated;
    });
  };

  const deleteGuest = (id: string) => {
    setGuests(prev => {
      const g = prev.find(item => item.id === id);
      if (g?.tableId) {
        setTables(tbls =>
          tbls.map(t =>
            t.id === g.tableId
              ? { ...t, assignedGuestIds: t.assignedGuestIds.filter(gid => gid !== id) }
              : t
          )
        );
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const assignGuestToTable = (guestId: string, tableId: string | null) => {
    updateGuest(guestId, { tableId: tableId || undefined });
  };

  // Chat
  const addChatMessage = (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const fullMsg: ChatMessage = {
      ...msg,
      id: 'msg-' + Date.now() + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, fullMsg]);
  };

  const clearChatHistory = () => {
    setChatMessages([initialWelcomeMessage]);
  };

  return (
    <EventContext.Provider
      value={{
        event,
        budgetItems,
        timelineItems,
        checklistItems,
        tables,
        guests,
        chatMessages,
        activeTab,
        setActiveTab,
        updateEventDetails,
        loadPresetTemplate,
        importFullData,
        resetToBlank,
        addBudgetItem,
        updateBudgetItem,
        deleteBudgetItem,
        addTimelineItem,
        updateTimelineItem,
        deleteTimelineItem,
        toggleTimelineComplete,
        addChecklistItem,
        toggleChecklistComplete,
        deleteChecklistItem,
        addTable,
        updateTable,
        deleteTable,
        addGuest,
        updateGuest,
        deleteGuest,
        assignGuestToTable,
        addChatMessage,
        clearChatHistory
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};
