<script lang="ts">
  import { type ChatMessage, wsService } from "$lib/service/WebSocketService";
  import { getLoggedInUserId } from "$lib/utils/user";
  import { onMount, afterUpdate } from "svelte";
  import { get } from "svelte/store";
  import { user } from "$lib/custom-stores/UserInfo-store";
  import { requestData } from "../../api";

  let messages: ChatMessage[] = [];
  let message = "";
  let scrollRef: HTMLDivElement;

  let currentUserId = Number(getLoggedInUserId());
  let selectedGroupId: number | null = null;
  let selectedReceiverId: number | null = 3;
  let token = get(user)?.accessToken;

  function handleIncoming(msg: ChatMessage) {
    messages = [...messages, msg];
  }

  async function fetchChatHistory() {
    const userId = Number(getLoggedInUserId());
    const res = await requestData(
      `/api/v1/chats/history?userId=${userId}&groupId=${selectedGroupId ?? ""}&limit=50`,
    );
    messages = res.map((msg: any) => ({
      ...msg,
      senderId: Number(msg.senderId),
      receiverId: msg.receiverId ? Number(msg.receiverId) : null,
    }));
  }

  // Scroll to bottom after messages update
  afterUpdate(() => {
    if (scrollRef) {
      scrollRef.scrollTop = scrollRef.scrollHeight;
    }
  });

  onMount(async () => {
    await fetchChatHistory();
    token = get(user)?.accessToken;
    wsService.connect(token, currentUserId, handleIncoming, selectedGroupId);
    return () => wsService.disconnect();
  });

  function sendMessage() {
    if (!message.trim()) return;

    const chatMessageRequest: ChatMessage = {
      content: message,
      senderId: currentUserId,
      senderName: "You",
      groupId: selectedGroupId,
      receiverId: selectedReceiverId,
      timestamp: new Date().toISOString(),
      type: selectedGroupId ? "GROUP" : "PRIVATE",
    };

    wsService.sendMessage(chatMessageRequest);
    handleIncoming(chatMessageRequest);
    message = "";
  }

  function formatTime(ts: string | null) {
    if (!ts) return "";
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
</script>

<div class="p-4 bg-gray-50 rounded-xl shadow max-w-xl mx-auto h-[80vh] flex flex-col">
  <h2 class="text-xl font-bold mb-3">Chat</h2>

  <!-- Chat messages -->
  <div
    class="flex-1 overflow-y-auto border rounded p-3 space-y-2"
    bind:this={scrollRef}
    style="background: linear-gradient(to bottom, #fdf6f0, #ffece5);"
  >
    {#each messages as msg (msg.id)}
      <div
        class="flex mb-2 items-end"
        class:justify-end={msg.senderId === currentUserId}
        class:justify-start={msg.senderId !== currentUserId}
      >
        <div
          class={`flex items-center max-w-[70%] px-3 py-2 rounded-lg shadow-sm break-words
            ${msg.senderId === currentUserId
              ? "bg-[rgb(204,69,34)] text-white justify-end"
              : "bg-white text-gray-900 border border-gray-300 justify-start"}`
          }
        >
          <!-- Avatar for receiver -->
          {#if msg.senderId !== currentUserId}
            <div class="flex-shrink-0 mr-2 flex items-center">
              {#if msg.avatarUrl}
                <img
                  src={msg.avatarUrl}
                  alt={msg.senderName}
                  class="w-6 h-6 rounded-full object-cover"
                />
              {:else}
                <div
                  class="w-6 h-6 rounded-full flex items-center justify-center font-semibold text-white"
                  style="background-color: hsl({(msg.senderName.charCodeAt(0) * 37) % 360}, 60%, 50%)"
                >
                  {msg.senderName[0].toUpperCase()}
                </div>
              {/if}
            </div>
          {/if}

          <div class="flex flex-col">
            {#if msg.senderId !== currentUserId}
              <div class="text-xs font-semibold mb-1">{msg.senderName}</div>
            {/if}
            <div>{msg.content}</div>
            <div
              class={`text-[10px] mt-1 text-right ${
                msg.senderId === currentUserId ? "text-white/80" : "text-gray-500"
              }`}
            >
              {formatTime(msg.timestamp)}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Input box -->
  <div class="mt-3 flex gap-2">
    <input
      class="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      bind:value={message}
      placeholder="Type your message..."
      on:keydown={(e) => e.key === "Enter" && sendMessage()}
    />
    <button
      class="bg-[rgb(204,69,34)] text-white font-semibold px-4 rounded hover:bg-red-700"
      on:click={sendMessage}
    >
      Send
    </button>
  </div>
</div>
