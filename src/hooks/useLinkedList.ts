import { useState, useEffect, useCallback } from 'react';
import { linkedList, StudentNode } from '@/lib/linkedList';

export function useLinkedList() {
  const [nodes, setNodes] = useState<StudentNode[]>(() => linkedList.toArray());

  useEffect(() => {
    const unsubscribe = linkedList.subscribe(() => {
      setNodes(linkedList.toArray());
    });
    return unsubscribe;
  }, []);

  const insertFront = useCallback((studentId: string, studentName: string, courseId: string) => {
    linkedList.insertFront(studentId, studentName, courseId);
  }, []);

  const insertRear = useCallback((studentId: string, studentName: string, courseId: string) => {
    linkedList.insertRear(studentId, studentName, courseId);
  }, []);

  const deleteFront = useCallback(() => {
    return linkedList.deleteFront();
  }, []);

  const deleteRear = useCallback(() => {
    return linkedList.deleteRear();
  }, []);

  const filterByCourseId = useCallback((courseId: string): StudentNode[] => {
    return linkedList.filterByCourseId(courseId);
  }, []);

  const getHead = useCallback(() => linkedList.head, []);
  const getTail = useCallback(() => linkedList.getTail(), []);
  const isEmpty = useCallback(() => linkedList.isEmpty(), []);
  const size = useCallback(() => linkedList.size(), []);

  return {
    nodes,
    insertFront,
    insertRear,
    deleteFront,
    deleteRear,
    filterByCourseId,
    getHead,
    getTail,
    isEmpty,
    size,
  };
}
