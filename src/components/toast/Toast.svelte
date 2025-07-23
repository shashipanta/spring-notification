<!-- Toast.svelte -->

<script>
    import { readable, writable } from 'svelte/store';
  
    // Readable store for toast messages
    export const toastMessages = readable([], (set) => {
      // This function is called when someone starts listening to the store
      // You can use it to clean up or do any other setup if needed
      return () => {};
    });
  
    // Writable store for triggering toast messages
    export const showToast = writable(null);
  
    // Function to add a new toast message
    export const addToast = (message, type = 'info') => {
      showToast.set({ message, type });
    };
  </script>
  
  {#if $toastMessages.length > 0}
    {#each $toastMessages as { message, type } (message)}
      <div class={`toast ${type}`}>
        {message}
      </div>
    {/each}
  {/if}
  
  <style>
    .toast {
      position: fixed;
      bottom: 16px;
      right: 16px;
      padding: 16px;
      border-radius: 8px;
      color: #fff;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.5s;
    }
  
    .info {
      background-color: #007bff;
    }
  
    .success {
      background-color: #28a745;
    }
  
    .error {
      background-color: #dc3545;
    }
  
    .show {
      opacity: 1;
    }
  </style>
  