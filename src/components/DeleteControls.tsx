import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trash2, ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { StudentNode } from '@/lib/linkedList';

interface DeleteControlsProps {
  onDeleteFront: () => StudentNode | null;
  onDeleteRear: () => StudentNode | null;
  isEmpty: boolean;
}

export function DeleteControls({ onDeleteFront, onDeleteRear, isEmpty }: DeleteControlsProps) {
  const { toast } = useToast();

  const handleDeleteFront = () => {
    const deleted = onDeleteFront();
    if (deleted) {
      toast({
        title: "Registration Removed",
        description: `${deleted.studentName} removed from front`,
      });
    } else {
      toast({
        title: "List Empty",
        description: "No registrations to delete",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRear = () => {
    const deleted = onDeleteRear();
    if (deleted) {
      toast({
        title: "Registration Removed",
        description: `${deleted.studentName} removed from rear`,
      });
    } else {
      toast({
        title: "List Empty",
        description: "No registrations to delete",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="card-gradient shadow-lg border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-destructive/10">
            <Trash2 className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-lg">Remove Registration</CardTitle>
            <CardDescription>Delete students from the linked list</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleDeleteFront}
            disabled={isEmpty}
            variant="destructive"
            className="flex-1 gap-2"
          >
            <ArrowLeftFromLine className="w-4 h-4" />
            Delete from Front
          </Button>
          <Button
            onClick={handleDeleteRear}
            disabled={isEmpty}
            variant="outline"
            className="flex-1 gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground disabled:opacity-50"
          >
            <ArrowRightFromLine className="w-4 h-4" />
            Delete from Rear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
