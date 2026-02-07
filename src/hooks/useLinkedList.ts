import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { linkedList, StudentNode } from '@/lib/linkedList';

export function useLinkedList() {
  const nodes = useSyncExternalStore(
    (callback) => linkedList.subscribe(callback),
    () => linkedList.toArray()
  );

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

  const getHead = useCallback(() => linkedList.head, [nodes]);
  const getTail = useCallback(() => linkedList.getTail(), [nodes]);
  const isEmpty = useCallback(() => linkedList.isEmpty(), [nodes]);
  const size = useCallback(() => linkedList.size(), [nodes]);

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
