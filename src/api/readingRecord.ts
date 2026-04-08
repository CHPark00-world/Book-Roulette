import supabase from "../lib/supabase";

export async function upsertReadingRecord(userId: string, isbn: string, status: string, bookInfo?: {title: string, author: string, cover: string}) {
  const {error} = await supabase
    .from('reading_records')
    .upsert({user_id: userId, isbn, status, ...bookInfo}
      ,{onConflict: 'user_id,isbn'}
    );

    if(error) throw new Error('저장 실패');
}

export async function getReadingRecord(userId: string, isbn: string) {
  const {data, error} = await supabase
    .from('reading_records')
    .select('status')
    .eq('user_id', userId)
    .eq('isbn', isbn)
    .maybeSingle();

    if(error) throw new Error('조회 실패');
    return data?.status ?? null;
}

export async function getAllReadingRecords(userId: string) {
  const {data, error} = await supabase
    .from('reading_records')
    .select('isbn, status, title, author, cover')
    .eq('user_id', userId)
    .order('created_at', {ascending: false});
    
    if (error) throw new Error('조회 실패');
    return data ?? [];
}