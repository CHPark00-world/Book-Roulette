import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { type, query, categoryId, sort, maxResults, start, isbn } = await req.json();
    const ttbKey = Deno.env.get('ALADIN_TTB_KEY');

    let url = '';

    if (type === 'search') {
      url = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${ttbKey}&Query=${encodeURIComponent(query)}&QueryType=Keyword&MaxResults=${maxResults ?? 20}&start=${start ?? 1}&SearchTarget=Book&Cover=Big&Output=JS&Version=20131101`;
    } else if (type === 'list') {
      url = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${ttbKey}&QueryType=${sort ?? 'Bestseller'}&MaxResults=${maxResults ?? 20}&start=${start ?? 1}&SearchTarget=Book&CategoryId=${categoryId ?? 0}&Cover=Big&Output=JS&Version=20131101`;
    } else if (type === 'detail') {
      url = `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${ttbKey}&itemIdType=ISBN&ItemId=${isbn}&Cover=Big&Output=JS&Version=20131101`;
    }

    const res = await fetch(url);
    const text = await res.text();
    const jsonStart = text.indexOf('{');
    const data = JSON.parse(text.slice(jsonStart));

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});