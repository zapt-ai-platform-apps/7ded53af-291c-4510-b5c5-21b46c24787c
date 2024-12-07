export default function MessageInput(props) {
  return (
    <div class="flex items-center">
      <textarea
        class="flex-1 resize-none border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 box-border"
        rows="2"
        placeholder="اكتب رسالتك هنا..."
        value={props.inputValue()}
        onInput={(e) => props.setInputValue(e.target.value)}
        onKeyPress={props.handleKeyPress}
        disabled={props.loading()}
      ></textarea>
      <button
        class={`ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer${props.loading() ? ' opacity-50 cursor-not-allowed' : ''}`}
        onClick={props.sendMessage}
        disabled={props.loading()}
      >
        إرسال
      </button>
    </div>
  );
}