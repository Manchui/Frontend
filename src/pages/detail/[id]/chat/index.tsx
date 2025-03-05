import { useEffect, useRef, useState } from 'react';
import type { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Toast } from '@/components/shared/Toast';
import useGetChattingData from '@/hooks/useGetChattingData';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { userStore } from '@/store/userStore';
import { Client } from '@stomp/stompjs';

interface Message {
  chatMessageType: 'ENTER' | 'MESSAGE';
  createdAt: number[];
  message: string;
  sender: string;
}

export default function ChatPage({ roomId }: { roomId: string }) {
  const router = useRouter();

  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [isUserListOpen, setIsUserListOpen] = useState<boolean>(false);
  const toggleUserList = () => setIsUserListOpen(!isUserListOpen);

  const user = userStore((state) => state.user.name);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sentinelRef);

  const messageContainerRef = useRef<HTMLDivElement>(null);

  const { chatData, roomUser, hasNextPage, fetchNextPage } = useGetChattingData(roomId);

  useEffect(() => {
    if (messageContainerRef.current) {
      const lastMessage = messages[0];
      if (lastMessage && lastMessage.sender === user) messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages, user]);

  useEffect(() => {
    if (messageContainerRef.current && chatData?.pages[0]) {
      // 초기 로딩시에만 스크롤을 아래로 이동
      if (chatData.pages.length === 1) messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatData?.pages[0]]);

  useEffect(() => {
    if (isIntersecting && hasNextPage) void fetchNextPage();
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
    } else {
      Toast('error', '로그인이 필요합니다.');
      void router.push('/login');
      return undefined;
    }

    const stomp = new Client({
      brokerURL: 'wss://manchui.shop/ws',
      connectHeaders: {
        Authorization: `${accessToken}`,
      },
      // debug: (str: string) => {
      //   console.log('WebSocket Debug:', str);
      // },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    setStompClient(stomp);
    stomp.activate();

    stomp.onConnect = () => {
      console.log('WebSocket 연결에 성공했습니다.');

      stomp.subscribe(`/exchange/chat.exchange/room.${roomId}`, (frame) => {
        try {
          const parsedMessage = JSON.parse(frame.body);
          setMessages((prevMessages) => [parsedMessage as Message, ...prevMessages]);
        } catch (error) {
          console.error('구독오류가 발생했습니다:', error);
        }
      });
    };

    return () => {
      if (stompClient && stompClient.connected) void stompClient.deactivate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, accessToken, router]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/pub/chat.room.${roomId}`,
        body: JSON.stringify({
          message: inputMessage,
          sender: user,
        }),
      });
    }

    setInputMessage('');
  };

  const handleLeaveChat = () => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/pub/chat.leave.${roomId}`,
        body: JSON.stringify({
          message: ' 님이 나가셨습니다.',
          sender: user,
        }),
      });
      router.back();
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? '오후' : '오전';

    hours %= 12;
    hours = hours === 0 ? 12 : hours;

    return `${ampm} ${hours}:${minutes}`;
  };

  const formatArrayTime = (timeArray: number[]) => {
    const [year, month, day, hour, minute] = timeArray;
    const date = new Date(year, month - 1, day, hour, minute);

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? '오후' : '오전';

    hours %= 12;
    hours = hours === 0 ? 12 : hours;

    return `${ampm} ${String(hours)}:${minutes}`;
  };

  return (
    <div className="mx-auto flex h-screen max-w-screen-md flex-col bg-gray-700 pt-[60px] font-medium">
      {/* 채팅방 헤더 */}
      <div className="w-full max-w-screen-md p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg">모임 문의하기</div>
          <button type="button" onClick={toggleUserList}>
            <Image src="/icons/menu.svg" alt="메뉴" width={36} height={36} className="invert" />
          </button>
        </div>
      </div>

      {/* 채팅방 안내 메시지 */}
      <div className="mx-4 rounded-lg bg-gray-600 p-4 text-gray-300">
        <p className="text-sm">
          이 채팅방은 모임장과의 실시간 소통 공간입니다. 모임에 대해 궁금한 점이나 문의사항이 있으시다면 자유롭게 대화를 나누실 수 있습니다.
        </p>
      </div>

      {/* 참여자 목록 슬라이드 */}
      <div
        className={`fixed right-0 top-0 z-[9999] h-full w-80 transform bg-gray-800 p-4 text-white shadow-lg transition-transform duration-300 ease-in-out ${
          isUserListOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-lg font-semibold">참여자 목록</h2>
            <button type="button" onClick={toggleUserList} className="p-2">
              <Image src="/icons/x.svg" alt="닫기" width={24} height={24} className="invert" />
            </button>
          </div>

          <div className="mt-4 flex-1 overflow-y-auto">
            {roomUser?.map((room, index) => (
              <div key={index} className="mb-4 flex items-center gap-3">
                <div className="relative size-[40px] overflow-hidden rounded-full">
                  <Image src={room.profileImagePath || '/images/profile.svg'} alt={`${room.name}의 프로필`} fill className="object-cover" sizes="40px" />
                </div>
                <span className="text-sm font-medium">{room.name}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <button type="button" className="rounded-lg border px-2 py-1" onClick={handleLeaveChat}>
              채팅 나가기
            </button>
          </div>
        </div>
      </div>

      {/* 메시지 목록 */}
      <div ref={messageContainerRef} className="scrollbar-hide flex-1 overflow-y-auto overscroll-contain px-4 pt-4">
        <div className="flex min-h-full flex-col-reverse">
          {messages.map((msg, index) =>
            msg.chatMessageType === 'ENTER' || msg.message.includes('님이 나가셨습니다.') || msg.message.includes('개설하였습니다.') ? (
              <div key={`new-${index}`} className="my-2 flex justify-center">
                <div className="rounded-full bg-gray-600 px-4 py-1 text-sm text-gray-300">{msg.sender + msg.message}</div>
              </div>
            ) : (
              <div key={`new-${index}`} className={`mb-4 flex items-start gap-2 ${msg.sender === user ? 'flex-row-reverse' : 'flex-row'}`}>
                {msg.sender !== user && (
                  <div className="relative size-[40px] overflow-hidden rounded-full">
                    <Image
                      src={roomUser?.find((u) => u.name === msg.sender)?.profileImagePath || '/images/profile.svg'}
                      alt="프로필"
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                )}
                <div className={`flex max-w-[70%] flex-col ${msg.sender === user ? 'items-end' : 'items-start'}`}>
                  {msg.sender !== user && <span className="mb-1 text-sm text-gray-300">{msg.sender}</span>}
                  <div className={`flex items-end gap-2 ${msg.sender === user ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`rounded-lg px-4 py-2 ${msg.sender === user ? 'bg-black text-white' : 'bg-gray-300'}`}>
                      <div className="break-words">{msg.message}</div>
                    </div>
                    <span className="text-xs text-gray-500">{formatArrayTime(msg.createdAt)}</span>
                  </div>
                </div>
              </div>
            ),
          )}
          {chatData?.pages.map((page, i) => (
            <div key={i} className="flex flex-col-reverse">
              {page.data.chatMessageResponseList.map((msg, index) =>
                msg.chatMessageType === 'ENTER' || msg.message.includes('님이 나가셨습니다.') || msg.message.includes('개설하였습니다.') ? (
                  <div key={`history-${index}`} className="my-2 flex justify-center">
                    <div className="rounded-full bg-gray-600 px-4 py-1 text-sm text-gray-300">{msg.sender + msg.message}</div>
                  </div>
                ) : (
                  <div key={`history-${index}`} className={`mb-4 flex items-start gap-2 ${msg.sender === user ? 'flex-row-reverse' : 'flex-row'}`}>
                    {msg.sender !== user && (
                      <div className="relative size-[40px] overflow-hidden rounded-full">
                        <Image
                          src={roomUser?.find((u) => u.name === msg.sender)?.profileImagePath || '/images/profile.svg'}
                          alt="프로필"
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    )}
                    <div className={`flex max-w-[70%] flex-col ${msg.sender === user ? 'items-end' : 'items-start'}`}>
                      {msg.sender !== user && <span className="mb-1 text-sm text-gray-300">{msg.sender}</span>}
                      <div className={`flex items-end gap-2 ${msg.sender === user ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`rounded-lg px-4 py-2 ${msg.sender === user ? 'bg-black text-white' : 'bg-gray-500'}`}>
                          <div className="break-words">{msg.message}</div>
                        </div>
                        <span className="text-xs text-gray-500">{formatTime(msg.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          ))}
          <div ref={sentinelRef} className="h-4" />
        </div>
      </div>

      {/* 메시지 입력 */}
      <div className="flex gap-2 bg-gray-600 p-4 text-white">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              sendMessage();
            }
          }}
          className="flex-1 rounded-2xl border bg-gray-600 p-2 pl-5 placeholder:text-gray-400 focus:border-background focus:outline-none"
          placeholder="채팅을 입력하세요..."
        />
        <button type="submit" onClick={sendMessage} className="rounded-2xl bg-blue-800 px-4 py-2 hover:bg-blue-700">
          전송
        </button>
      </div>
    </div>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { roomId } = context.query;

  return {
    props: {
      roomId,
    },
  };
}
