<script>
  import { onMount } from "svelte";
  import { page} from "$app/stores";

    let tenant;


    onMount(async () => {
        let tenantId;
        const unsubscribe = page.subscribe((value) => {
            console.log("Params : ", value.params);
            tenantId = value.params.tenantId;
        });

        let response = await fetch(`http://localhost:8090/api/v1/tenants/${tenantId}`)
        let responseJson = await response.json();

        tenant = responseJson.data;
    })
</script>

<pre>
    {JSON.stringify(tenant, null, 2)}
</pre>