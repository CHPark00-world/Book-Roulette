import supabase from '../lib/supabase';

export const signUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, nickname: name },
    },
  });

  if(!error && data.user) {
    await supabase.from('profiles').insert({
      id: data.user.id,
      nickname: name,
      updated_at: new Date().toISOString(),
    });
  }

  return { data, error };
};
