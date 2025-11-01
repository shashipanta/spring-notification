<script lang="ts">
    import { onMount } from "svelte";
    import { requestData } from "../../api";

    export let onSelectFriend: (friend: any) => void;

    type ISODateString = string;

    type Friend = {
        userId: number;
        userName: string;
        avatarUrl?: string;
        since: ISODateString;
        lastInteractedOn: ISODateString;
    };

    let friends: Friend[] = [];

    async function fetchFriends() {
        const res = await requestData(`/api/v1/chats/friends`);
        friends = res;
    }

    onMount(fetchFriends);
</script>

<div class="w-64 bg-white border-r h-full p-2 flex flex-col">
    <h2 class="text-lg font-bold mb-3">Friends</h2>
    <div class="flex-1 overflow-y-auto space-y-2">
        {#each friends as friend (friend.userId)}
            <div
                class="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer transition"
                on:click={() => onSelectFriend(friend)}
            >
                {#if friend.avatarUrl}
                    <img
                        src={friend.avatarUrl}
                        alt={friend.userName}
                        class="w-8 h-8 rounded-full object-cover"
                    />
                {:else}
                    <div
                        class="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white"
                        style="background-color: hsl({(friend.userName.charCodeAt(
                            0,
                        ) *
                            37) %
                            360}, 60%, 50%)"
                    >
                        {friend.userName[0].toUpperCase()}
                    </div>
                {/if}
                <div class="flex flex-col">
                    <span class="font-medium">{friend.userName}</span>
                    <span class="text-xs text-gray-400"
                        >Last: {new Date(
                            friend.lastInteractedOn,
                        ).toLocaleDateString()}</span
                    >
                </div>
            </div>
        {/each}
    </div>
</div>
