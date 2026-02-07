import { Link2, GraduationCap } from 'lucide-react';

export function Header() {
  return (
    <header className="hero-gradient text-white py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center gap-4 animate-fade-slide-up">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
              <GraduationCap className="w-10 h-10" />
            </div>
            <Link2 className="w-8 h-8 text-primary-foreground/60" />
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="12" r="3" />
                <line x1="9" y1="12" x2="15" y2="12" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
            Student Course Registration
          </h1>
          
          <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
            Interactive visualization of a <span className="font-semibold text-white">Singly Linked List</span> data structure
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium">
              Insert Front/Rear
            </div>
            <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium">
              Delete Front/Rear
            </div>
            <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium">
              Filter by Course
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
