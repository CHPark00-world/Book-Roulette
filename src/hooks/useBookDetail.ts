import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookDetail } from "../api/aladinApi";
import type { Book } from "../types/book";


export function useBookDetail () {
  const [book, setBook] = useState<Book | null>(null);
  const {isbn} = useParams();


  

  useEffect(() => {
    if(!isbn) return;
    fetchBookDetail(isbn).then((data) => setBook(data));
  },[])

  return {book};
  
}