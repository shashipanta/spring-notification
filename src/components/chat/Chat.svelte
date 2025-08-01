<script lang="ts">
  import { type ChatMessage, wsService } from "$lib/service/WebSocketService";
  import { getLoggedInUserId } from "$lib/utils/user";
  import { onMount } from "svelte";

  import { get } from "svelte/store";
  import { user } from "$lib/custom-stores/UserInfo-store";
  import { fetchData, requestData } from "../../api";

  let messages: ChatMessage[] = [];
  let message = "";

  let scrollRef: HTMLDivElement;

  let currentUserId = getLoggedInUserId();
  let selectedGroupId: number | null = null;
  let selectedReceiverId: number | null = 3;
  let token = get(user)?.accessToken;

  function handleIncoming(msg: any) {
    messages = [...messages, msg];
    scrollRef?.scrollTo({ top: scrollRef.scrollHeight, behavior: "smooth" });
  }

  async function fetchChatHistory() {
    const res = await requestData(
      `/api/v1/chats/history?userId=${4}&groupId=${selectedGroupId ?? ""}&limit=10`,
    );
    if (res.ok) {
      const history = await res.json();
      messages = history; // initialize messages with recent chat history
      console.log(messages);
    } else {
      console.error("Failed to fetch chat history");
    }
  }

  onMount(async () => {
    currentUserId = getLoggedInUserId();
    console.log("Current user ID:", currentUserId);
    await fetchChatHistory();
    token = get(user)?.accessToken;
    console.log("Connecting to WebSocket with token:", token);
    // todo: replace this with a way to get token
    // const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjMsInN1YiI6InNoYXNoaUB5b3BtYWlsLmNvbSIsImlhdCI6MTc1MzcyOTk5MCwiZXhwIjoxNzU0NTkzOTkwfQ.4AVYlzfFUGhjBo_0YGbUCJv-NMEB9orH_nRLpiR6kCU"
    wsService.connect(token, currentUserId, handleIncoming, selectedGroupId);

    return () => {
      wsService.disconnect();
    };
  });

  function sendMessage() {
    if (!message.trim()) return;
    console.log("Sending message:", message);

    let chatMessageRequest: ChatMessage = {
      content: message,
      senderId: getLoggedInUserId(),
      groupId: selectedGroupId,
      receiverId: selectedReceiverId,
      timestamp: new Date().toISOString(),
      type: selectedGroupId ? "GROUP" : "PRIVATE",
    };

    console.log("Chat message request:", chatMessageRequest);

    wsService.sendMessage(chatMessageRequest);

    // Add the message locally immediately
    handleIncoming(chatMessageRequest);
  }
</script>


<div class="p-4 bg-white rounded-xl shadow max-w-xl mx-auto">
  <h2 class="text-xl font-bold mb-3">Chat</h2>

  <div
    class="h-60 overflow-y-auto border rounded p-2 bg-gray-100 space-y-2"
    bind:this={scrollRef}
  >
    {#each messages as msg (msg.id)}
      <div class="bg-blue-100 p-2 rounded">
        <strong>{msg.senderId === currentUserId ? "You" : msg.senderId}:</strong
        >
        <span>{msg.content}</span>
      </div>
    {/each}
  </div>

  <input
    class="w-full border p-2 rounded mt-4"
    bind:value={message}
    placeholder="Type your message..."
    on:keydown={(e) => e.key === "Enter" && sendMessage()}
  />

  <button
    class="w-full mt-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
    on:click={sendMessage}
  >
    Send
  </button>
</div>

<style>
  input:focus {
    outline: none;
    border-color: #4299e1;
  }
</style>
