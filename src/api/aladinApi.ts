const API_KEY = import.meta.env.VITE_ALADIN_API_KEY;

export async function searchBooks(query: string) {
  const url = `/api/aladin/ItemSearch.aspx?ttbkey=${API_KEY}&Query=${query}&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=JS&Version=20131101`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('API 호출 실패');
  }
  const data = await response.json();
  return data.item;
}
