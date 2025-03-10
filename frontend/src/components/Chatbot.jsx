import { useState } from 'react';
import { useImmer } from 'use-immer';
import api from '@/api';
import ChatMessages from '@/components/ChatMessages';
import ChatInput from '@/components/ChatInput';

function Chatbot() {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useImmer([]);
  const [newMessage, setNewMessage] = useState('');

  const isLoading = messages.length && messages[messages.length - 1].loading;

  async function submitNewMessage() {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || isLoading) return;

    setMessages(draft => [...draft,
      { role: 'user', content: trimmedMessage, type: 'text' },
      { role: 'assistant', content: '', sources: [], loading: true }
    ]);
    setNewMessage('');

    let chatIdOrNew = Date.now()//chatId;
    try {
      const res = await api.sendChatMessage(chatIdOrNew, trimmedMessage);
      setMessages(draft => {
        draft[draft.length - 1].content += res.reply;
      });
      setMessages(draft => {
        draft[draft.length - 1].loading = false;
      });
    } catch (err) {
      console.log(err);
      setMessages(draft => {
        draft[draft.length - 1].loading = false;
        draft[draft.length - 1].error = true;
      });
    }
  }

  async function submitPhoto(file) {
    if (isLoading) return;

    setMessages(draft => [...draft,
      { role: 'user', content: file, type: 'photo' },
      { role: 'assistant', content: '', sources: [], loading: true }
    ]);
    console.log('FILE>>>>', file)
    setNewMessage('');

    let chatIdOrNew = Date.now()//chatId;
    // try {
    //   const res = await api.sendChatMessage(chatIdOrNew, trimmedMessage);
    //   setMessages(draft => {
    //     draft[draft.length - 1].content += res.reply;
    //   });
    //   setMessages(draft => {
    //     draft[draft.length - 1].loading = false;
    //   });
    // } catch (err) {
    //   console.log(err);
    //   setMessages(draft => {
    //     draft[draft.length - 1].loading = false;
    //     draft[draft.length - 1].error = true;
    //   });
    // }
  }

  return (
    <div className='relative grow flex flex-col gap-6 pt-6'>
      {messages.length === 0 && (
        <div className='mt-3 font-urbanist text-primary-blue text-xl font-light space-y-2'>
          <p>👋 Welcome!</p>
          <p>I am African Action Congress AI. I can help you with:</p>
          <ul style={{ listStyleType: 'disc', listStylePosition: 'inside' }}>
            <li>becoming member of the party</li>
            <li>print membership ID card</li>
            <li>pay membership dues and donation</li>
            <li>tell you more about local events and more</li>
          </ul>
          <p>What can I do for you today?</p>
        </div>
      )}
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
      />
      <ChatInput
        newMessage={newMessage}
        isLoading={isLoading}
        setNewMessage={setNewMessage}
        submitNewMessage={submitNewMessage}
        submitPhoto={submitPhoto}
        messages={messages}
      />
    </div>
  );
}

export default Chatbot;