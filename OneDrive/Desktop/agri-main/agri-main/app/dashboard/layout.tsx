import { NavSidebar } from '@/components/nav-sidebar';
import { TopBar } from '@/components/top-bar';
import { FloatingVoiceButton } from '@/components/floating-voice-button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <NavSidebar />
      <TopBar />
      <FloatingVoiceButton />
      <main className="lg:ml-64 mt-16 p-4 sm:p-6 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
