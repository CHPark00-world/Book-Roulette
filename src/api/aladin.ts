import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const query = req.url?.replace('/api/aladin', '') ?? '';
  const aladinUrl = `https://www.aladin.co.kr/ttb/api${query}`;

  const response = await fetch(aladinUrl);
  const data = await response.json();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(data);
}
