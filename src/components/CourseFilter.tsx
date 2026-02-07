import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Search, X, Filter } from 'lucide-react';

interface CourseFilterProps {
  filterCourseId: string;
  onFilterChange: (courseId: string) => void;
}

export function CourseFilter({ filterCourseId, onFilterChange }: CourseFilterProps) {
  const [inputValue, setInputValue] = useState(filterCourseId);

  const handleFilter = () => {
    onFilterChange(inputValue.trim());
  };

  const handleClear = () => {
    setInputValue('');
    onFilterChange('');
  };

  return (
    <Card className="card-gradient shadow-lg border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Filter className="w-5 h-5 text-accent" />
          </div>
          <div>
            <CardTitle className="text-lg">Filter by Course</CardTitle>
            <CardDescription>Display students enrolled in a specific course</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 space-y-2">
            <Label htmlFor="filterCourseId" className="sr-only">Course ID</Label>
            <Input
              id="filterCourseId"
              placeholder="Enter Course ID (e.g., 101)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
              className="font-mono"
            />
          </div>
          <Button
            onClick={handleFilter}
            className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Search className="w-4 h-4" />
            Search
          </Button>
          {filterCourseId && (
            <Button
              onClick={handleClear}
              variant="outline"
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Clear
            </Button>
          )}
        </div>
        {filterCourseId && (
          <div className="mt-3 text-sm text-muted-foreground">
            Showing students enrolled in <span className="font-mono font-semibold text-accent">Course {filterCourseId}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
