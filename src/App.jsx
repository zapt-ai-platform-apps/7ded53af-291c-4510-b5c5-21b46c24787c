import { createSignal, onMount, createEffect } from 'solid-js';
import { createEvent } from './supabaseClient';
import MessageList from './components/MessageList.jsx';
import MessageInput from './components/MessageInput.jsx';
import './index.css';

export default function App() {
  const [messages, setMessages] = createSignal([]);
  const [inputValue, setInputValue] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const sendMessage = async () => {
    if (!inputValue()) return;
    const userMessage = { sender: 'user', text: inputValue() };
    setMessages([...messages(), userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await createEvent('chatgpt_request', {
        prompt: `ساعدني في تعلم القراءة باللغة العربية: ${userMessage.text}`,
        response_type: 'text'
      });
      const botMessage = { sender: 'bot', text: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { sender: 'bot', text: 'حدث خطأ، يرجى المحاولة مرة أخرى.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-4">
      <div class="max-w-2xl mx-auto flex flex-col h-full">
        <h1 class="text-3xl font-bold text-center mb-4 text-gray-800">مساعد القراءة للطلاب</h1>
        <MessageList messages={messages} loading={loading} />
        <MessageInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          sendMessage={sendMessage}
          handleKeyPress={handleKeyPress}
          loading={loading}
        />
        <div class="mt-4 text-center">
          <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:underline">
            صنع بواسطة زابت
          </a>
        </div>
      </div>
    </div>
  );
}