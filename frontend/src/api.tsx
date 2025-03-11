const BASE_URL = import.meta.env.VITE_API_URL;

async function createChat() {
  const res = await fetch(BASE_URL + '/agent/chats', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  if (!res.ok) {
    return Promise.reject({ status: res.status, data });
  }
  return data;
}

async function sendChatMessage(chatId, message) {  
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'  },
    body: JSON.stringify({ prompt: message, sessionId: sessionStorage.getItem('sessionId') })
  });
  if (!res.ok) {
    return Promise.reject({ status: res.status, data: await res.json() });
  }

  return res.json()
}

async function getPhotoPresignedUrl(email, op) {  
  const res = await fetch(`https://dscstewbek.execute-api.us-east-1.amazonaws.com/dev/aac-ai-image-endpoint?email=${email}&op=${op ? op : "download"}`, {
    method: "GET"
  });

  if (!res.ok) {
    return Promise.reject({ status: res.status, data: await res.json() });
  }

  return res.json()
}

async function putProfilePhoto(url, file) {  
  const formData = new FormData();

  const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": file.type
      },
      body: file,
  });

  if (!res.ok) {
    return Promise.reject({ status: res.status, data: await res.json() });
  }

  return {'message': 'success'}
}

export default {
  createChat, 
  getPhotoPresignedUrl,
  putProfilePhoto,
  sendChatMessage
};