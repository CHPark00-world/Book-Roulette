import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function searchAladin(keyword: string) {
  const ttbKey = Deno.env.get('ALADIN_TTB_KEY');
  const query = encodeURIComponent(keyword);
  const url = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${ttbKey}&Query=${query}&QueryType=Keyword&MaxResults=2&SearchTarget=Book&output=js&Version=20131101&Cover=Big`;

  const res = await fetch(url);
  const text = await res.text();
  const jsonStart = text.indexOf('{');
  if (jsonStart === -1) return [];
  const data = JSON.parse(text.slice(jsonStart));
  return data.item ?? [];
}

async function callClaude(messages: unknown[], system: string) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': Deno.env.get('ANTHROPIC_API_KEY') ?? '',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system,
      messages,
    }),
  });
  const data = await response.json();
  return data.content[0].text;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const system = Deno.env.get('BOOK_PROMPT') ?? '';

    const replyText = await callClaude(messages, system);

    // JSON 키워드 응답인지 확인
    const jsonMatch = replyText.match(/\{[\s\S]*"keywords"[\s\S]*\}/);

    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      const keywords: string[] = parsed.keywords ?? [];
      const mood: string = parsed.mood ?? '';

      // 알라딘에서 실제 책 검색
      const results = await Promise.all(keywords.map(searchAladin));
      const books = results.flat().slice(0, 2).map((book) => ({
        title: book.title,
        author: book.author,
        cover: book.cover,
        link: book.link,
        description: book.description,
      }));

      console.log(`검색된 실제 책: ${books.length}권`);

      return new Response(
        JSON.stringify({
          content: [{
            text: JSON.stringify({ type: 'recommendation', mood, books }),
          }],
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 일반 대화 응답
    return new Response(
      JSON.stringify({ content: [{ text: replyText }] }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});