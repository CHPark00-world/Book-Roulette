import { useState } from 'react';
import supabase from '../../lib/supabase';

interface Props {
  activeTab: string;
  onClose: () => void;
  onSuccess: (newPost: any) => void;
}

export default function WriteModal({ activeTab, onClose, onSuccess }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!title || !content) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('posts')
      .insert({ title, content, category: activeTab, user_id: user?.id })
      .select()
      .single();
    if (!error && data) {
      onSuccess(data);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="w-full max-w-lg rounded-lg p-8"
        style={{ backgroundColor: '#faf7f2' }}
      >
        <h2 className="mb-6 text-xl font-bold" style={{ color: '#3d3530' }}>
          글쓰기
        </h2>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 w-full rounded border px-3 py-2 text-sm outline-none"
          style={{ borderColor: '#e0d8d0' }}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-6 w-full resize-none rounded border px-3 py-2 text-sm outline-none"
          rows={6}
          style={{ borderColor: '#e0d8d0' }}
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded border px-5 py-2 text-sm"
            style={{ borderColor: '#b0a8a0', color: '#b0a8a0' }}
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="rounded border px-5 py-2 text-sm"
            style={{ borderColor: '#e0633c', color: '#e0633c' }}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
