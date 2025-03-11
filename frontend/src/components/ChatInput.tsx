import useAutosize from '@/hooks/useAutosize';
import sendIcon from '@/assets/images/send.svg';
import { useState } from 'react';
import PhotoUploadDialog from './PhotoUploadDialog';
import React from 'react';

function ChatInput({ newMessage, isLoading, setNewMessage, submitNewMessage, submitPhoto, messages }) {
  const textareaRef = useAutosize(newMessage);
  const [showModal, setShowModal] = useState(false);

  function handleKeyDown(e) {
    if (e.keyCode === 13 && !e.shiftKey && !isLoading) {
      e.preventDefault();
      submitNewMessage();
    }
  }

  function submitQuickMessage(str) {
    setNewMessage(str);
    submitNewMessage();
  }

  return (
    <div className='sticky bottom-0 bg-white py-4'>

      {/* <button
        onClick={() => setShowModal(true)}
        className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        type="button">
        Upload Photo
      </button> */}

      {showModal && <PhotoUploadDialog open={showModal} onClose={() => setShowModal(false)} onUpload={(file) => {
        submitPhoto(file);
        // setShowModal(false);
      }} 
      onCompleted={() => {
        setShowModal(false);
      }}
      />}

      { // if the user has not typed anything yet or ChatBot.messages is empty, show quick message buttons
        newMessage === '' && messages.length == 0 && (
          <div className='p-1.5 rounded-3xl z-50 font-mono origin-bottom animate-chat duration-400 space-x-2 flex justify-center gap-2'>
            <button onClick={() => submitQuickMessage('I want to join the party')} className='bg-slate-800 text-white py-2 px-4 rounded-3xl transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>Join the party</button>
            <button onClick={() => submitQuickMessage('I want to pay my membership dues')} className='bg-slate-800 text-white py-2 px-4 rounded-3xl transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>Pay my membership dues</button>
            <button onClick={() => submitQuickMessage('I want to upload my profile picture')} className='bg-slate-800 text-white py-2 px-4 rounded-3xl transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>Upload my profile picture</button>
          </div>
        )
      }

      <div className='p-1.5 bg-primary-blue/35 rounded-3xl z-50 font-mono origin-bottom animate-chat duration-400'>
        <div className='pr-0.5 bg-white relative shrink-0 rounded-3xl overflow-hidden ring-primary-blue ring-1 focus-within:ring-2 transition-all'>
          <textarea
            className='block w-full max-h-[140px] py-2 px-4 pr-11 bg-white rounded-3xl resize-none placeholder:text-primary-blue placeholder:leading-4 placeholder:-translate-y-1 sm:placeholder:leading-normal sm:placeholder:translate-y-0 focus:outline-none'
            ref={textareaRef}
            rows='1'
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className='absolute top-1/2 -translate-y-1/2 right-3 p-1 rounded-md hover:bg-primary-blue/20'
            onClick={submitNewMessage}
          >
            <img src={sendIcon} alt='send' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;