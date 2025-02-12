const BASE_URL = import.meta.env.VITE_API_URL;

async function createChat() {
  const res = await fetch(BASE_URL + '/agent/chats', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  if (!res.ok) {
    return Promise.reject({ status: res.status, data });
  }
  return data;
}

// async function sendChatMessage(chatId, message) {
//   const res = await fetch(BASE_URL + `/agent/chats/${chatId}`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ prompt: message })
//   });
//   if (!res.ok) {
//     return Promise.reject({ status: res.status, data: await res.json() });
//   }
//   return res.body;
// }
async function sendChatMessage(chatId, message) {
  const res = await fetch(BASE_URL + `/agent/chats/${chatId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: message })
  });
  if (!res.ok) {
    return Promise.reject({ status: res.status, data: await res.json() });
  }
  //console.log(await res.json());
  
  // return res.body;
  return res.json()
}

export default {
  createChat, sendChatMessage
};