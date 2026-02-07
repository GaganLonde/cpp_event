import { StudentNode } from '@/lib/linkedList';
import { StudentNodeCard } from './StudentNode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link2, AlertCircle } from 'lucide-react';

interface LinkedListVisualizationProps {
  nodes: StudentNode[];
  filterCourseId?: string;
  lastInsertPosition?: 'front' | 'rear' | null;
}

export function LinkedListVisualization({ 
  nodes, 
  filterCourseId,
  lastInsertPosition 
}: LinkedListVisualizationProps) {
  const filteredNodes = filterCourseId 
    ? nodes.filter(node => node.courseId === filterCourseId)
    : nodes;

  const headNode = nodes[0];
  const tailNode = nodes[nodes.length - 1];

  return (
    <Card className="card-gradient shadow-lg border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Link2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Linked List Visualization</CardTitle>
              <p className="text-sm text-muted-foreground">
                {nodes.length} node{nodes.length !== 1 ? 's' : ''} in list
                {filterCourseId && ` • ${filteredNodes.length} matching filter`}
              </p>
            </div>
          </div>
          
          {/* Legend */}
          <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span>Head</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span>Tail</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-6 h-0.5 bg-gradient-to-r from-primary to-accent" />
              <span>Pointer</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {nodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 rounded-full bg-muted/50 mb-4">
              <AlertCircle className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">List is Empty</h3>
            <p className="text-muted-foreground max-w-sm">
              Add student registrations using the form above. They will appear here as linked nodes.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-mono">head</span>
              <span>→</span>
              <span className="font-mono">null</span>
            </div>
          </div>
        ) : filterCourseId && filteredNodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 rounded-full bg-muted/50 mb-4">
              <AlertCircle className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Students Found</h3>
            <p className="text-muted-foreground">
              No students are enrolled in Course <span className="font-mono font-semibold">{filterCourseId}</span>
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto pb-4">
            <div className="flex items-center py-8 px-4 min-w-max">
              {/* Head pointer */}
              <div className="flex items-center mr-4">
                <span className="font-mono text-sm text-muted-foreground mr-2">head</span>
                <div className="w-4 h-0.5 bg-muted-foreground" />
                <div className="w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-transparent border-l-muted-foreground" />
              </div>

              {/* Nodes */}
              {(filterCourseId ? filteredNodes : nodes).map((node, index) => {
                const isHead = node === headNode;
                const isTail = node === tailNode;
                const isLast = filterCourseId 
                  ? index === filteredNodes.length - 1
                  : index === nodes.length - 1;
                
                // Determine animation type
                let animationType: 'front' | 'rear' | 'none' = 'none';
                if (lastInsertPosition === 'front' && index === 0) {
                  animationType = 'front';
                } else if (lastInsertPosition === 'rear' && isLast && !filterCourseId) {
                  animationType = 'rear';
                }

                return (
                  <StudentNodeCard
                    key={node.id}
                    node={node}
                    isHead={isHead && !filterCourseId}
                    isTail={isTail && !filterCourseId}
                    isLast={isLast}
                    animationType={animationType}
                    isFiltered={!!filterCourseId}
                  />
                );
              })}

              {/* Null pointer */}
              <div className="flex items-center ml-4">
                <span className="font-mono text-sm text-muted-foreground px-3 py-1 bg-muted rounded">null</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
