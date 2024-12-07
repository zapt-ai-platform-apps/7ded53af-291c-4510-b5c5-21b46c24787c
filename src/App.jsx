import { createSignal, onMount, createEffect, Show } from 'solid-js';
import { supabase } from './supabaseClient';
import SignIn from './components/SignIn.jsx';
import Chat from './components/Chat.jsx';

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');
  const [messages, setMessages] = createSignal([]);
  const [inputMessage, setInputMessage] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [audioUrl, setAudioUrl] = createSignal('');

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('homePage');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      authListener.data.unsubscribe();
    };
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('login');
  };

  const sendMessage = async () => {
    if (inputMessage().trim() === '') return;
    const userMessage = inputMessage();
    const newMessages = [
      ...messages(),
      { role: 'user', content: userMessage },
    ];
    setMessages(newMessages);
    setInputMessage('');
    setLoading(true);

    try {
      const result = await createEvent('chatgpt_request', {
        prompt: `You are an AI tutor helping students learn to read. Respond to the user in simple language appropriate for students learning to read. The user's message is: "${userMessage}"`,
        response_type: 'text',
      });
      setMessages([
        ...newMessages,
        { role: 'assistant', content: result },
      ]);

      // Uncomment the following lines to enable text-to-speech for the AI response
      /*
      const audioResult = await createEvent('text_to_speech', {
        text: result,
      });
      setAudioUrl(audioResult);
      */
    } catch (error) {
      console.error('Error fetching AI response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="h-full bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <Show
        when={currentPage() === 'homePage'}
        fallback={
          <SignIn />
        }
      >
        <Chat
          user={user}
          handleSignOut={handleSignOut}
          messages={messages}
          setMessages={setMessages}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          sendMessage={sendMessage}
          loading={loading}
          audioUrl={audioUrl}
        />
      </Show>
    </div>
  );
}

export default App;