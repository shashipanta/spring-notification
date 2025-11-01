<script lang="ts">
    import Chat from "./Chat.svelte";
    import FriendshipSidebar from "./FriendshipSidebar.svelte";

    let selectedFriend: { userId: number; userName: string } | null = null;

    function handleSelectFriend(friend: any) {
        selectedFriend = friend;
    }
</script>

<div
    class="flex h-[90vh] mx-auto max-w-5xl border rounded overflow-hidden shadow-lg"
>
    <FriendshipSidebar onSelectFriend={handleSelectFriend} />

    <div class="flex-1 bg-gray-50">
        {#if selectedFriend}
            <Chat selectedFriend={selectedFriend} />
        {:else}
            <div class="flex items-center justify-center h-full text-gray-400">
                Select a friend to start chatting
            </div>
        {/if}
    </div>
</div>
