import React from 'react';
import { AuthProvider } from './context/AuthContext';
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
    <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
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
    <AuthProvider>
      <EventProvider>
        <div className="relative min-h-screen bg-black text-neutral-200 flex flex-col font-sans selection:bg-purple-600 selection:text-white overflow-x-hidden">
          {/* Aceternity Signature Background Grid Pattern */}
          <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-50 radial-mask z-0" />
          
          {/* Aceternity Ambient Spotlight Glow */}
          <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[680px] h-[400px] bg-gradient-to-tr from-purple-600/20 via-indigo-500/15 to-pink-500/15 blur-[120px] rounded-full pointer-events-none z-0" />

          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <TabNavigation />
            <MainContent />
            <Footer />
          </div>
        </div>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
