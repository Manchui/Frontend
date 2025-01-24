import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IS_SERVER } from '@/constants/server';
import { userStore } from '@/store/userStore';
import type Stomp from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';

interface Message {
  createdAt: string;
  message: string;
  sender?: string;
}

// 채팅방 회원 목록 조회 - /api/chat/user/list/{roomId}
// 채팅방 채팅 내역 조회 - /api/chat/list/{roomId}?lastMessageId={lastMessageId}&limit={limit}

export default function ChatPage() {
  const router = useRouter();
  const { roomId } = router.query;
  const [messages, setMessages] = useState<Message[]>([]);
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

  const [inputMessage, setInputMessage] = useState('');

  const user = userStore((state) => state.user.name);

  const accessToken = !IS_SERVER && localStorage.getItem('accessToken');

  useEffect(() => {
    const stomp = new Client({
      brokerURL: 'wss://manchui.shop/ws',
      connectHeaders: {
        Authorization: `${accessToken}`,
      },
      debug: (str: string) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000, // 서버로부터 4초마다 하트비트 체크
      heartbeatOutgoing: 4000, // 클라이언트에서 4초마다 하트비트 신호 전송
    });

    setStompClient(stomp);

    stomp.activate();

    console.log('stomp', stomp);

    stomp.onConnect = () => {
      console.log('WebSocket 연결에 성공했습니다.');

      stomp.subscribe(`/exchange/chat.exchange/room.${roomId as string}`, (frame) => {
        try {
          const parsedMessage = JSON.parse(frame.body);

          console.log('parsedMessage', parsedMessage);
          setMessages((prevMessages) => [...prevMessages, parsedMessage as Message]);
        } catch (error) {
          console.error('오류가 발생했습니다:', error);
        }
      });
    };

    return () => {
      if (stompClient && stompClient.connected) void stompClient.deactivate(); // STOMP 클라이언트 비활성화 - 소켓 연결 해제
      setStompClient(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, roomId]);

  const sendMessage = () => {
    if (!inputMessage.trim() || !roomId) return;

    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/pub/chat.room.${roomId as string}`,
        body: JSON.stringify({
          message: inputMessage,
          sender: user,
        }),
      });
    }

    setInputMessage('');
  };

  return (
    <div className="mx-auto flex h-screen max-w-screen-sm flex-col bg-gray-50 pt-[60px] font-medium">
      {/* 채팅방 헤더 */}
      {/* <div className="border-b bg-white p-4">
        <h1 className="text-lg font-bold">{data?.groupName}</h1>
      </div> */}

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 flex ${msg.sender === user ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-lg px-4 py-2 ${msg.sender === user ? 'bg-blue-500 text-white' : 'bg-white text-gray-900'}`}>
              <div className="text-sm font-bold">{msg.sender}</div>
              <div className="break-words">{msg.message}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력 */}
      <div className="border-t bg-white p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 rounded-lg border p-2 focus:border-blue-800 focus:outline-none"
            placeholder="메시지를 입력하세요"
          />
          <button type="submit" onClick={sendMessage} className="rounded-lg bg-blue-800 px-4 py-2 text-white hover:bg-blue-600">
            전송
          </button>
        </div>
      </div>
    </div>
  );
}

// /**
//  * 소켓 연결 주소는 ws://localhost:8080/ws
// ws://localhost:8080/ws
// ws://manchui.shop/ws
// 메시지 보내는 주소 = /pub/chat/room/{roomId}
// 구독 주소 = /sub/chat/room/{roomId}
//  */

// 구독: /exchange/chat.exchange/room.394d93d1-e4d7-45cc-abb5-e42e73d7a04c
// 보내기: /pub/chat.room.394d93d1-e4d7-45cc-abb5-e42e73d7a04c

// 구독 - /exchange/chat.exchange/room.{roomId}
// 보내기 - /pub/chat.room.{roomId}

// 채팅방 회원 목록 조회 - /api/chat/user/list/{roomId}
// 채팅방 채팅 내역 조회 - /api/chat/list/{roomId}?lastMessageId={lastMessageId}&limit={limit}
