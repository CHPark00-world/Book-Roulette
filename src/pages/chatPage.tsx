import Header from '../component/common/header';
import ChatWindow from '../component/chat/chatWindow';

export default function ChatPage() {
  return (
    <div
      className="flex h-screen flex-col bg-[#fdf6f0]"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      <Header />

      {/* 메인 영역 */}
      <main className="mx-auto flex h-[calc(100vh-10rem)] w-full max-w-6xl flex-1 gap-10 px-4 py-10 pt-20 md:px-8">
        {/* 왼쪽 소개 패널 */}
        <aside className="hidden w-72 shrink-0 flex-col gap-8 pt-4 md:flex">
          {/* 타이틀 */}
          <div>
            <p className="mb-2 text-xs tracking-widest text-amber-600 uppercase">
              AI Book Recommendation
            </p>
            <h2 className="text-3xl leading-snug font-bold text-amber-900">
              나에게 꼭 맞는
              <br />책 한 권
            </h2>
            <div className="mt-3 h-0.5 w-10 bg-amber-400" />
          </div>

          {/* 일러스트 */}
          <div className="rounded-2xl border border-amber-100 bg-white py-6 text-center text-7xl shadow-sm">
            📚
          </div>

          {/* 소개 문구 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="text-lg">💬</span>
              <div>
                <p className="text-sm font-semibold text-amber-900">
                  대화로 찾아요
                </p>
                <p className="mt-0.5 text-xs text-amber-600">
                  AI와 짧은 대화만으로 취향을 파악해요
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🔍</span>
              <div>
                <p className="text-sm font-semibold text-amber-900">
                  실제 책만 추천해요
                </p>
                <p className="mt-0.5 text-xs text-amber-600">
                  알라딘 DB로 검증된 책만 보여드려요
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🛒</span>
              <div>
                <p className="text-sm font-semibold text-amber-900">
                  바로 구매 가능해요
                </p>
                <p className="mt-0.5 text-xs text-amber-600">
                  알라딘 링크로 바로 이동할 수 있어요
                </p>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <div className="h-px bg-amber-100" />

          {/* 안내 */}
          <p className="text-xs leading-relaxed text-amber-500">
            약 10~12개의 질문에 답하시면 취향에 꼭 맞는 책을 찾아드려요. 편하게
            대화하듯 답해주세요 😊
          </p>
        </aside>

        {/* 오른쪽 채팅창 */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <ChatWindow />
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-amber-100 bg-[#fdf6f0] px-8 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-lg font-bold text-amber-900">책장</p>
            <p className="mt-1 text-xs text-amber-500">대화로 찾는 나만의 책</p>
          </div>
          <div className="text-right text-xs text-amber-400">
            <p>Powered by Claude AI × Aladin API</p>
            <p className="mt-1">© 2026 책장. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
