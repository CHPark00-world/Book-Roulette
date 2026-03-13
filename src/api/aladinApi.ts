const API_KEY = import.meta.env.VITE_ALADIN_API_KEY;

export async function searchBooks(query: string) {
  const url = `/api/aladin/ItemSearch.aspx?ttbkey=${API_KEY}&Query=${query}&QueryType=Keyword&MaxResults=20&start=1&SearchTarget=Book&Cover=Big&Output=JS&Version=20131101`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('API 호출 실패');
  }
  const data = await response.json();
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
  const sortMap: Record<string, string> = {
    'Bestseller': 'Bestseller',
    'ItemNewAll': 'ItemNewAll',
    'CustomerRating': 'Bestseller',
    'PublishYear': 'ItemNewAll', 
  };
  
  const queryType = sortMap[sort] ?? 'Bestseller';
  const url = `/api/aladin/ItemList.aspx?ttbkey=${API_KEY}&QueryType=${queryType}&MaxResults=${maxResults}&start=${start}&SearchTarget=Book&CategoryId=${categoryId}&Cover=Big&Output=JS&Version=20131101`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('API 호출 실패');
  const data = await response.json();
  return {items: data.item, totalResults: data.totalResults};
}
