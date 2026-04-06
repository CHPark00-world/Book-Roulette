import { useState } from "react";
import { fetchFilteredBooks } from "../api/aladinApi";

export function useBookFilter() {
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [sort, setSort] = useState('Bestseller');
  const [minRating, setMinRating] = useState(0);
  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2026);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZE = 50;

  
  const handleFetch = async (pageNum = 1, currentCategoryId = categoryId) => {
    setIsLoading(true);
    const {items, totalResults} = await fetchFilteredBooks({categoryId: currentCategoryId, sort, maxResults: PAGE_SIZE, start: (pageNum - 1) * PAGE_SIZE + 1});
   console.log('categoryId:', items[0]?.categoryId, 'categoryName:', items[0]?.categoryName);

    setTotalCount(totalResults);
    let filtered = items ?? [];

    if(sort === 'CustomerRating' && minRating > 0) {
      filtered = filtered.filter((book: any) => book.customerReviewRank >= minRating);
    }

    if(sort === 'PublishYear') {
      filtered = filtered.filter((book: any) => {
        const year = new Date(book.pubDate).getFullYear();
        return year >= startYear && year <= endYear;
      });
    }
   
   setBooks(filtered);
    setIsLoading(false);
  }

  
  
return {books, isLoading, categoryId, setCategoryId, sort, setSort, handleFetch, minRating, setMinRating, startYear, setStartYear, endYear, setEndYear, page, setPage, totalCount, PAGE_SIZE}
}