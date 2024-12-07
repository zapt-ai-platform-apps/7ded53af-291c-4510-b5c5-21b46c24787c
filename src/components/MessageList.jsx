import { For, Show } from 'solid-js';

export default function MessageList(props) {
  return (
    <div class="flex-1 overflow-y-auto bg-white p-4 rounded-lg shadow-md mb-4">
      <For each={props.messages()}>
        {(message) => (
          <div class={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div class={`inline-block px-4 py-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {message.text}
            </div>
          </div>
        )}
      </For>
      <Show when={props.loading()}>
        <div class="text-center text-gray-500">...جارٍ التحميل</div>
      </Show>
    </div>
  );
}