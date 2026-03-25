import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-user-token',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const token = req.headers.get('x-user-token');
  if (!token) {
    return new Response(JSON.stringify({ error: '토큰 없음' }), { status: 401, headers: corsHeaders });
  }

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
  if (userError || !user) {
    return new Response(JSON.stringify({ error: '인증 실패' }), { status: 401, headers: corsHeaders })
  }

  await supabaseAdmin.from('posts').delete().eq('user_id', user.id)
  await supabaseAdmin.from('profiles').delete().eq('id', user.id)

  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id)
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders })
  }

  return new Response(JSON.stringify({ success: true }), { status: 200, headers: corsHeaders })
})