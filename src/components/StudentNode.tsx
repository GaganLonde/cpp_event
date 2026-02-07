import { StudentNode as StudentNodeType } from '@/lib/linkedList';
import { User, BookOpen, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StudentNodeProps {
  node: StudentNodeType;
  isHead: boolean;
  isTail: boolean;
  isLast: boolean;
  animationType?: 'front' | 'rear' | 'none';
  isFiltered?: boolean;
}

const courseColors: Record<string, string> = {
  '101': 'course-badge-1',
  '102': 'course-badge-2',
  '103': 'course-badge-3',
  '104': 'course-badge-4',
  '105': 'course-badge-5',
  '106': 'course-badge-6',
};

function getCourseColor(courseId: string): string {
  // Use a hash function to consistently assign colors
  const num = parseInt(courseId) || courseId.charCodeAt(0);
  const index = (num % 6) + 1;
  return `course-badge-${index}`;
}

export function StudentNodeCard({
  node,
  isHead,
  isTail,
  isLast,
  animationType = 'none',
  isFiltered = false,
}: StudentNodeProps) {
  return (
    <div className={cn(
      "relative flex items-center",
      !isLast && "mr-12"
    )}>
      {/* Head indicator */}
      {isHead && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-fade-slide-up">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Head</span>
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-primary mt-1" />
        </div>
      )}

      {/* Tail indicator */}
      {isTail && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-fade-slide-up">
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-transparent border-b-accent mb-1" />
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">Tail</span>
        </div>
      )}

      {/* Node card */}
      <div
        className={cn(
          "relative node-gradient rounded-xl p-4 shadow-node transition-all duration-300 hover:shadow-node-hover hover:-translate-y-1",
          "border border-border/50 min-w-[180px]",
          animationType === 'front' && "animate-slide-in-left",
          animationType === 'rear' && "animate-slide-in-right",
          isFiltered && "ring-2 ring-primary ring-offset-2"
        )}
      >
        {/* Course badge */}
        <div className={cn(
          "absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md",
          getCourseColor(node.courseId)
        )}>
          {node.courseId.slice(-2)}
        </div>

        {/* Student info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-foreground">
            <User className="w-4 h-4 text-primary" />
            <span className="font-medium truncate max-w-[120px]">{node.studentName}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Hash className="w-4 h-4" />
            <span className="font-mono text-sm">{node.studentId}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="w-4 h-4" />
            <span className="font-mono text-sm">Course {node.courseId}</span>
          </div>
        </div>

        {/* Next pointer indicator */}
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground font-mono">
          {node.next ? '→' : 'null'}
        </div>
      </div>

      {/* Arrow to next node */}
      {!isLast && (
        <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 flex items-center">
          <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-accent" />
          <div 
            className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-transparent border-l-accent"
          />
        </div>
      )}
    </div>
  );
}
