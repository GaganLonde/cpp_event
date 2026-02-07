// Singly Linked List Node
export interface StudentNode {
  studentId: string;
  studentName: string;
  courseId: string;
  next: StudentNode | null;
  id: string; // Unique identifier for React keys
}

// Create a new node
export function createNode(
  studentId: string,
  studentName: string,
  courseId: string
): StudentNode {
  return {
    studentId,
    studentName,
    courseId,
    next: null,
    id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
}

// Linked List class
export class LinkedList {
  head: StudentNode | null = null;
  private listeners: Set<() => void> = new Set();

  // Subscribe to changes
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Notify all listeners
  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }

  // Insert at front
  insertFront(studentId: string, studentName: string, courseId: string): void {
    const newNode = createNode(studentId, studentName, courseId);
    newNode.next = this.head;
    this.head = newNode;
    this.notify();
  }

  // Insert at rear
  insertRear(studentId: string, studentName: string, courseId: string): void {
    const newNode = createNode(studentId, studentName, courseId);

    if (this.head === null) {
      this.head = newNode;
      this.notify();
      return;
    }

    let temp: StudentNode = this.head;
    while (temp.next !== null) {
      temp = temp.next;
    }
    temp.next = newNode;
    this.notify();
  }

  // Delete from front
  deleteFront(): StudentNode | null {
    if (this.head === null) {
      return null;
    }

    const deleted = this.head;
    this.head = this.head.next;
    this.notify();
    return deleted;
  }

  // Delete from rear
  deleteRear(): StudentNode | null {
    if (this.head === null) {
      return null;
    }

    if (this.head.next === null) {
      const deleted = this.head;
      this.head = null;
      this.notify();
      return deleted;
    }

    let temp: StudentNode = this.head;
    while (temp.next?.next !== null) {
      temp = temp.next!;
    }

    const deleted = temp.next;
    temp.next = null;
    this.notify();
    return deleted;
  }

  // Get all nodes as array (for rendering)
  toArray(): StudentNode[] {
    const result: StudentNode[] = [];
    let temp = this.head;
    while (temp !== null) {
      result.push(temp);
      temp = temp.next;
    }
    return result;
  }

  // Filter by course ID
  filterByCourseId(courseId: string): StudentNode[] {
    const result: StudentNode[] = [];
    let temp = this.head;
    while (temp !== null) {
      if (temp.courseId === courseId) {
        result.push(temp);
      }
      temp = temp.next;
    }
    return result;
  }

  // Get size
  size(): number {
    let count = 0;
    let temp = this.head;
    while (temp !== null) {
      count++;
      temp = temp.next;
    }
    return count;
  }

  // Check if empty
  isEmpty(): boolean {
    return this.head === null;
  }

  // Get tail node
  getTail(): StudentNode | null {
    if (this.head === null) return null;
    let temp = this.head;
    while (temp.next !== null) {
      temp = temp.next;
    }
    return temp;
  }
}

// Singleton instance
export const linkedList = new LinkedList();
