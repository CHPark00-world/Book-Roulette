interface CommunityDropDownProps {
  isOpen: boolean;
}

export default function communityDropdown({ isOpen }: CommunityDropDownProps) {
  if (!isOpen) return null;

  return (
    <ul className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg [&_a]:hover:text-white [&_a]:hover:opacity-100">
      <li>
        <a className="text-primary hover:bg-primary block px-4 py-3">
          자유 북토크
        </a>
      </li>
      <li>
        <a className="text-primary hover:bg-primary block px-4 py-3">
          릴레이 독후감
        </a>
      </li>
      <li>
        <a className="text-primary hover:bg-primary block px-4 py-3">
          책 추천 서비스
        </a>
      </li>
    </ul>
  );
}
