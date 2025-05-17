<script lang="ts">
    import { Button, Modal } from "flowbite-svelte";
    import { writable } from "svelte/store";

    export let actionConfig: {
        action: "delete" | "other"; // Action type (delete or other)
        id: string; // ID for the action (if applicable)
        url: string; // URL for the action (delete or other)
        confirmationMessage: string; // Confirmation message
        successMessage: string; // Success message
        failureMessage: string; // Failure message
        withConfirmation: boolean; // Control whether confirmation modal is shown
    };

    let showModal = writable(false);

    const handleClick = async () => {
        if (actionConfig.withConfirmation) {
            // Show confirmation modal for delete or other actions with confirmation
            showModal.set(true);
        } else {
            // Perform the action directly without confirmation
            await performAction();
        }
    };

    const handleConfirm = async () => {
        // Handle API call for delete or other actions
        const result = await performAction();
        if (result) {
            alert(actionConfig.successMessage);
        } else {
            alert(actionConfig.failureMessage);
        }
        showModal.set(false); // Close the modal after action
    };

    const performAction = async () => {
        try {
            const res = await fetch(actionConfig.url, {
                method: actionConfig.action === "delete" ? "DELETE" : "POST", 
                credentials: "include", // Include credentials for authentication
                body: JSON.stringify({ id: actionConfig.id }), // Pass ID if needed for the action
                
            });

            return res.ok;
        } catch (error) {
            console.error(error);
            return false;
        }
    };
</script>

<!-- Button triggering the action -->
<Button color="red" on:click={handleClick} class="me-2">
    {actionConfig.action === "delete" ? "Delete" : "Perform Action"}
</Button>

{#if $showModal}
    <!-- Confirmation Modal for delete or other actions -->
    <Modal bind:open={$showModal} size="xs" autoclose>
        <div class="text-center">
            <h3
                class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
            >
                {actionConfig.confirmationMessage}
            </h3>
            <div class="mt-4">
                <Button color="red" on:click={handleConfirm}
                    >Yes, I'm sure</Button
                >
                <Button
                    color="alternative"
                    on:click={() => showModal.set(false)}>No, cancel</Button
                >
            </div>
        </div>
    </Modal>
{/if}
