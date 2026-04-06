export interface Book {
  isbn: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  link: string;
  publisher?: string;
  pubDate?: string;
  priceSales?: number;
  priceStandard?: number;
  customerReviewRank?: number;
}
