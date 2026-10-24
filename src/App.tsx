import React from 'react';
import { EventProvider, useEvent } from './context/EventContext';
import { Navbar } from './components/layout/Navbar';
import { TabNavigation } from './components/layout/TabNavigation';
import { Footer } from './components/layout/Footer';
import { OverviewTab } from './components/overview/OverviewTab';
import { AIChatDrawer } from './components/ai/AIChatDrawer';
import { BudgetTracker } from './components/budget/BudgetTracker';
import { TimelineView } from './components/timeline/TimelineView';
import { BeverageCalculator } from './components/hospitality/BeverageCalculator';
import { SeatingPlanner } from './components/seating/SeatingPlanner';
import { InviteGenerator } from './components/invite/InviteGenerator';
import { VendorRfpGenerator } from './components/vendors/VendorRfpGenerator';

const MainContent: React.FC = () => {
  const { activeTab } = useEvent();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'chat' && <AIChatDrawer />}
      {activeTab === 'budget' && <BudgetTracker />}
      {activeTab === 'timeline' && <TimelineView />}
      {activeTab === 'hospitality' && <BeverageCalculator />}
      {activeTab === 'seating' && <SeatingPlanner />}
      {activeTab === 'invites' && <InviteGenerator />}
      {activeTab === 'vendors' && <VendorRfpGenerator />}
    </main>
  );
};

export function App() {
  return (
    <EventProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
        <Navbar />
        <TabNavigation />
        <MainContent />
        <Footer />
      </div>
    </EventProvider>
  );
}

export default App;
