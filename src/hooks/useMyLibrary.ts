import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import { getAllReadingRecords } from "../api/readingRecord";

export interface ReadingRecord {
  isbn: string;
  status: string;
  title: string;
  author: string;
  cover: string;
}

export function useMyLibrary() {
  const user = useAuthStore((state) => state.user);
  const [records, setRecords] = useState<ReadingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(!user) return;

    const fetch = async () => {
      setIsLoading(true);
      const data = await getAllReadingRecords(user.id);
      setRecords(data);
      setIsLoading(false);
    };
    fetch();
  },[user])

  return {records, isLoading};
}