import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus, ArrowLeftToLine, ArrowRightToLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RegistrationFormProps {
  onInsertFront: (studentId: string, studentName: string, courseId: string) => void;
  onInsertRear: (studentId: string, studentName: string, courseId: string) => void;
}

export function RegistrationForm({ onInsertFront, onInsertRear }: RegistrationFormProps) {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [courseId, setCourseId] = useState('');
  const { toast } = useToast();

  const validateAndSubmit = (insertFn: () => void, position: string) => {
    if (!studentId.trim() || !studentName.trim() || !courseId.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    insertFn();
    toast({
      title: "Registration Added",
      description: `${studentName} added at ${position} of the list`,
    });

    // Clear form
    setStudentId('');
    setStudentName('');
    setCourseId('');
  };

  return (
    <Card className="card-gradient shadow-lg border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <UserPlus className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Add Student Registration</CardTitle>
            <CardDescription>Insert a new student into the linked list</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="studentId" className="text-sm font-medium">Student ID</Label>
            <Input
              id="studentId"
              placeholder="e.g., STU001"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentName" className="text-sm font-medium">Student Name</Label>
            <Input
              id="studentName"
              placeholder="e.g., John Doe"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="courseId" className="text-sm font-medium">Course ID</Label>
            <Input
              id="courseId"
              placeholder="e.g., 101"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="font-mono"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            onClick={() => validateAndSubmit(() => onInsertFront(studentId, studentName, courseId), 'front')}
            className="flex-1 gap-2 bg-primary hover:bg-primary/90"
          >
            <ArrowLeftToLine className="w-4 h-4" />
            Insert at Front
          </Button>
          <Button
            onClick={() => validateAndSubmit(() => onInsertRear(studentId, studentName, courseId), 'rear')}
            variant="outline"
            className="flex-1 gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowRightToLine className="w-4 h-4" />
            Insert at Rear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
