import Markdown from 'react-markdown';
import MicroLink from '@microlink/react';
import { extractUrl } from '@/utils';
import useAutoScroll from '@/hooks/useAutoScroll';
import Spinner from '@/components/Spinner';
import userIcon from '@/assets/images/user.svg';
import errorIcon from '@/assets/images/error.svg';
import TypeWriter from './TypeWriter';
import React from 'react';

function ChatMessages({ messages, isLoading }) {
  const scrollContentRef = useAutoScroll(isLoading);
  
  return (
    <div ref={scrollContentRef} className='grow space-y-4'>
      {messages.map(({ role, content, type, loading, error, url = type == 'text' ? extractUrl(content) : undefined }, idx) => (
        <div key={idx} className={`flex items-start gap-4 py-4 px-3 rounded-xl ${role === 'user' ? 'bg-primary-blue/10' : ''}`}>
          {role === 'user' && (
            <img
              className='h-[26px] w-[26px] shrink-0'
              src={userIcon}
              alt='user'
            />
          )}
          <div>
            <div className='markdown-container'>
              {(loading && !content) ? <Spinner />
                : (role === 'assistant')
                  ? <TypeWriter text={content} speed={20} />
                  // <Markdown>{content}</Markdown>
                  : 
                  <UserMessage content={content} type={type} />
                  // <div className='whitespace-pre-line'>{content}</div>
              }
                        
              { 
                url && <MicroLink url={url} size="large" />
              }
               
            </div>
            {error && (
              <div className={`flex items-center gap-1 text-sm text-error-red ${content && 'mt-2'}`}>
                <img className='h-5 w-5' src={errorIcon} alt='error' />
                <span>Error generating the response</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function UserMessage({ content, type }) {
  return (
    // <div className='flex items-start gap-4 py-4 px-3 rounded-xl bg-primary-blue/10'>
    <div className=''>
      {/* <img
        className='h-[26px] w-[26px] shrink-0'
        src={userIcon}
        alt='user'
      /> */}
      { type == 'text' ? <div className='whitespace-pre-line'>{content}</div> : <div>
        <Spinner /><img src={content} alt='user uploaded image' />
      </div> }
    </div>
  );
}

export default ChatMessages;