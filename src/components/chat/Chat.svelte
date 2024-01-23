<!-- Chat.svelte -->

<script lang="ts">
    import { onMount } from 'svelte';
    import SockJS from 'sockjs-client';
    import Stomp from 'stompjs';
  
    let stompClient: Stomp.Client;
    let username: string;
    let messages: { sender: string; content: string }[] = [];
    let message = '';
  
    onMount(() => {
      initializeWebSocket();
    });
  
    function initializeWebSocket() {
      const socket = new SockJS('/ws');
      stompClient = Stomp.over(socket);
  
      stompClient.connect({}, onConnected, onError);
    }
  
    function onConnected() {
      stompClient.subscribe('/topic/public', onMessageReceived);
  
      stompClient.send('/app/chat.addUser', {}, JSON.stringify({
        sender: username,
        type: 'JOIN'
      }));
    }
  
    function onMessageReceived(payload: Stomp.Message) {
      const message = JSON.parse(payload.body) as { sender: string; content: string };
      messages = [...messages, message];
    }
  
    function sendMessage() {
      stompClient.send('/app/chat.sendMessage', {}, JSON.stringify({
        sender: username,
        content: message,
        type: 'CHAT'
      }));
      message = '';
    }

    function disconnect() {
      console.log("This should disconnect");
    }
  
    function onError(error: string) {
      console.error('Error during WebSocket connection:', error);
    }
  </script>
  
  <!-- src/Chat.svelte -->
<main>
  <h1>WebSocket Chat with Svelte</h1>

  <div>
    <button on:click={disconnect}>Disconnect</button>
  </div>

  <div>
    <label for="sender">Username:</label>
    <input bind:value={username} type="text" id="sender" placeholder="Enter your username">

    <label for="message">Message:</label>
    <input bind:value={message} type="text" id="message" placeholder="Type your message">

    <button on:click={sendMessage}>Send</button>
  </div>

  <div>
    {#each messages as { id, sender, content }}
      <Message {id} {sender} {content} />
    {/each}
  </div>
</main>

  