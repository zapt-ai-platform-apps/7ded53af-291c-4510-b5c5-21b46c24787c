import { For, Show } from 'solid-js';

function Chat(props) {
  const {
    user,
    handleSignOut,
    messages,
    setMessages,
    inputMessage,
    setInputMessage,
    sendMessage,
    loading,
    audioUrl,
  } = props;

  return (
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-4xl font-bold text-purple-600">بصير</h1>
        <button
          class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>

      <div class="bg-white rounded-lg shadow-md p-4 min-h-[500px] flex flex-col">
        <div class="flex-1 overflow-y-auto mb-4">
          <For each={messages()}>
            {(message) => (
              <div
                class={`mb-2 p-2 rounded-lg ${
                  message.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
                }`}
              >
                <p class="text-gray-800">{message.content}</p>
              </div>
            )}
          </For>
        </div>
        <div class="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            value={inputMessage()}
            onInput={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            class={`ml-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              loading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={sendMessage}
            disabled={loading()}
          >
            {loading() ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>

      <Show when={audioUrl()}>
        <div class="mt-4">
          <h3 class="text-xl font-bold mb-2 text-purple-600">Listen to the response</h3>
          <audio controls src={audioUrl()} class="w-full" />
        </div>
      </Show>

      <p class="mt-4 text-center">
        Made on{' '}
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          class="text-purple-600 underline"
        >
          ZAPT
        </a>
      </p>
    </div>
  );
}

export default Chat;