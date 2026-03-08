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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!title || !content) return;
    setIsLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    let image_url = null;

    if (imageFile) {
      const fileName = `${user?.id}_${Date.now()}_${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(fileName, imageFile);

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from('post-images')
          .getPublicUrl(fileName);
        image_url = urlData.publicUrl;
      }
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        title,
        content,
        category: activeTab,
        user_id: user?.id,
        image_url,
      })
      .select()
      .single();

    if (!error && data) {
      onSuccess(data);
      onClose();
    }
    setIsLoading(false);
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
          className="mb-4 w-full resize-none rounded border px-3 py-2 text-sm outline-none"
          rows={6}
          style={{ borderColor: '#e0d8d0' }}
        />

        {/* 이미지 업로드 */}
        <label
          className="mb-4 flex cursor-pointer items-center gap-2 text-sm"
          style={{ color: '#b0a8a0' }}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          📎 이미지 첨부
        </label>
        {preview && (
          <img src={preview} alt="미리보기" className="mb-4 w-full rounded" />
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer rounded border px-5 py-2 text-sm"
            style={{ borderColor: '#b0a8a0', color: '#b0a8a0' }}
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="cursor-pointer rounded border px-5 py-2 text-sm"
            style={{ borderColor: '#e0633c', color: '#e0633c' }}
          >
            {isLoading ? '등록 중...' : '등록'}
          </button>
        </div>
      </div>
    </div>
  );
}
