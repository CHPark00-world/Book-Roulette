import { Pencil, Trash2 } from 'lucide-react';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  isDefault: boolean;
}

export default function profileDropdown({
  onEdit,
  onDelete,
  isDefault,
}: Props) {
  return (
    <div className="absolute top-full left-full z-10 w-32 rounded-lg bg-white px-4 py-2 shadow-lg">
      <button
        type="button"
        onClick={onEdit}
        className="flex w-full cursor-pointer items-center gap-2 py-2 text-sm hover:bg-black/5"
      >
        <Pencil size={16} />
        수정
      </button>
      <button
        type="button"
        onClick={!isDefault ? onDelete : undefined}
        className={`flex w-full items-center gap-2 py-2 text-sm ${isDefault ? 'cursor-not-allowed text-black/30' : 'cursor-pointer text-red-500 hover:bg-black/5'}`}
      >
        <Trash2 size={16} />
        삭제
      </button>
    </div>
  );
}
