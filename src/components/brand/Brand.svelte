<script>
    let isTenant = false;

</script>

<span>
    <h3>Easy Ren
    {#if isTenant}
        <span class="fancy-tenant">T-</span>
        <span >O</span>
    {/if}
    {#if !isTenant}
        <span >T</span>
        <span class="fancy-owner">O</span>
    {/if}
    </h3>
</span>

<style>
    h3 > span {
        margin-left: -5px;
    }

    .fancy-tenant{
        font-size: 1.3em;
        font-family: 'Comic Sans MS', cursive;
        color: purple;
    }
    .fancy-owner {
        font-size: 1.3em;
        font-family: 'Comic Sans MS', cursive;
        color: purple;
    }

</style>