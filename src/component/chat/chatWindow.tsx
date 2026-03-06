import { useState, useEffect, useRef } from 'react';
import { sendMessage, type Message } from '../../lib/claude';
import ReactMarkdown from 'react-markdown';

interface BookRecommendation {
  title: string;
  author: string;
  cover: string;
  link: string;
  description: string;
}

interface RecommendationResult {
  type: 'recommendation';
  mood: string;
  books: BookRecommendation[];
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);
  const [recommendation, setRecommendation] =
    useState<RecommendationResult | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const reply = await sendMessage([
        { role: 'user', content: '책 추천 시작. 1번째 질문 딱 하나만 해줘.' },
      ]);
      setMessages([{ role: 'assistant', content: reply }]);
      setIsLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (scrollRef.current && messages.length > 1) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, recommendation]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const nextCount = questionCount + 1;
    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: input },
    ];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setQuestionCount(nextCount);

    try {
      const messagesWithHint: Message[] = [
        ...newMessages,
        {
          role: 'user',
          content: `${nextCount}번째 질문 차례야. 질문 딱 하나만 해.`,
        },
      ];
      const reply = await sendMessage(messagesWithHint);

      // 추천 결과 JSON인지 확인
      try {
        const parsed = JSON.parse(reply);
        if (parsed.type === 'recommendation') {
          setRecommendation(parsed);
          setMessages([
            ...newMessages,
            { role: 'assistant', content: '취향에 맞는 책을 찾았어요! 📚' },
          ]);
          return;
        }
      } catch {
        // 일반 대화 응답
      }

      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex h-full flex-col"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      {/* 채팅 영역 */}
      <div
        ref={scrollRef}
        className="mb-6 flex w-full flex-1 flex-col gap-4 overflow-y-auto"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="mt-1 mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-800 text-xs text-white">
                📖
              </div>
            )}
            <div
              className={`max-w-sm rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'rounded-br-sm bg-amber-800 text-amber-50'
                  : 'rounded-bl-sm border border-amber-100 bg-white text-amber-900'
              }`}
            >
              {msg.role === 'assistant' ? (
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {/* 추천 결과 카드 */}
        {recommendation && (
          <div className="mt-4">
            <p className="mb-4 text-center text-sm text-amber-700 italic">
              "{recommendation.mood}"
            </p>
            <div className="flex flex-col gap-4">
              {recommendation.books.map((book, i) => (
                <a
                  key={i}
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 rounded-2xl border border-amber-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  {book.cover && (
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="h-24 w-16 shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold text-amber-900">
                      {book.title}
                    </p>
                    <p className="text-xs text-amber-600">{book.author}</p>
                    <p className="mt-1 line-clamp-3 text-xs text-amber-700">
                      {book.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-800 text-xs text-white">
              📖
            </div>
            <div className="rounded-2xl rounded-bl-sm border border-amber-100 bg-white px-4 py-3 shadow-sm">
              <div className="flex h-4 items-center gap-1">
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-400"
                  style={{ animationDelay: '0ms' }}
                />
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-400"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-400"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 입력창 */}
      <div className="sticky bottom-4 w-full max-w-2xl">
        <div className="flex gap-2 rounded-2xl border border-amber-200 bg-white px-4 py-3 shadow-sm">
          <textarea
            ref={textareaRef}
            className="flex-1 resize-none bg-transparent text-sm text-amber-900 placeholder-amber-300 outline-none"
            value={input}
            rows={1}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="메시지를 입력하세요..."
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="rounded-xl bg-amber-800 px-4 py-1.5 text-sm text-white transition-colors hover:bg-amber-700 disabled:opacity-40"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
