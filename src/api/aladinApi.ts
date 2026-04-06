import  supabase  from '../lib/supabase';

export async function fetchBookDetail (isbn: string) {
  const {data, error} = await supabase.functions.invoke('search-books', {
    body: {
      type: 'detail',
      isbn,
    }
  });
  if(error) throw new Error('API 호출 실패!');
  console.log('data:', data);
  return data.item[0];
}

export async function searchBooks(query: string) {
  const { data, error } = await supabase.functions.invoke('search-books', {
    body: {
      type: 'search',
      query,
      maxResults: 20,
      start: 1,
    },
  });

  if (error) throw new Error('API 호출 실패');
  return data.item;
}

export async function fetchFilteredBooks({
  categoryId = 0,
  sort = 'Bestseller',
  maxResults = 20,
  start = 1,
}: {
  categoryId?: number;
  sort?: string;
  maxResults?: number;
  start?: number;
}) {
  const { data, error } = await supabase.functions.invoke('search-books', {
    body: {
      type: 'list',
      categoryId,
      sort,
      maxResults,
      start,
    },
  });



  if (error) throw new Error('API 호출 실패');
  return { items: data.item, totalResults: data.totalResults };
}