import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { RegistrationForm } from '@/components/RegistrationForm';
import { DeleteControls } from '@/components/DeleteControls';
import { CourseFilter } from '@/components/CourseFilter';
import { LinkedListVisualization } from '@/components/LinkedListVisualization';
import { useLinkedList } from '@/hooks/useLinkedList';

const Index = () => {
  const { 
    nodes, 
    insertFront, 
    insertRear, 
    deleteFront, 
    deleteRear, 
    isEmpty 
  } = useLinkedList();

  const [filterCourseId, setFilterCourseId] = useState('');
  const [lastInsertPosition, setLastInsertPosition] = useState<'front' | 'rear' | null>(null);

  const handleInsertFront = useCallback((studentId: string, studentName: string, courseId: string) => {
    insertFront(studentId, studentName, courseId);
    setLastInsertPosition('front');
    setTimeout(() => setLastInsertPosition(null), 500);
  }, [insertFront]);

  const handleInsertRear = useCallback((studentId: string, studentName: string, courseId: string) => {
    insertRear(studentId, studentName, courseId);
    setLastInsertPosition('rear');
    setTimeout(() => setLastInsertPosition(null), 500);
  }, [insertRear]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto max-w-6xl px-4 py-8 space-y-6">
        {/* Control Panel */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RegistrationForm 
            onInsertFront={handleInsertFront}
            onInsertRear={handleInsertRear}
          />
          <DeleteControls 
            onDeleteFront={deleteFront}
            onDeleteRear={deleteRear}
            isEmpty={isEmpty()}
          />
        </div>

        {/* Filter */}
        <CourseFilter 
          filterCourseId={filterCourseId}
          onFilterChange={setFilterCourseId}
        />

        {/* Visualization */}
        <LinkedListVisualization 
          nodes={nodes}
          filterCourseId={filterCourseId}
          lastInsertPosition={lastInsertPosition}
        />

        {/* Info Footer */}
        <footer className="text-center py-8 text-muted-foreground text-sm">
          <p>
            Built with <span className="text-primary">♥</span> using React & TypeScript
          </p>
          <p className="mt-1">
            Demonstrating Singly Linked List operations with visual feedback
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
