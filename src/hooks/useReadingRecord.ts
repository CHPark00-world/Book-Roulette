import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import { getReadingRecord, upsertReadingRecord } from "../api/readingRecord";

export function useReadingRecord(isbn: string) {
  const user = useAuthStore((state) => state.user);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if(!user || !isbn) return;
    
    const fetch = async () => {
      const result = await getReadingRecord(user.id, isbn);
      setStatus(result);
    }
    fetch();
  },[user,isbn]);

  const updateStatus = async (newStatus: string, bookInfo?: {title: string; author: string; cover: string}) => {
    if (!user) return;
    await upsertReadingRecord(user.id, isbn, newStatus, bookInfo);
    setStatus(newStatus);
  };

    return {status, updateStatus};
}