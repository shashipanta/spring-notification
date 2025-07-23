<!-- src/Message.svelte -->
<script lang="ts">
    export let id:number;
    export let sender: string;
    export let content: string;
  </script>
  
  <div class="message">
    <p><strong>{sender}:</strong> {content}</p>
  </div>
  
  <style>
    /* Add your styling here */
  </style>
  