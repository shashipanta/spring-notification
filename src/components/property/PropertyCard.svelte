<script>
    import { Card, Button, Toggle } from 'flowbite-svelte';
    let hCard = false;
    let unSplashUri = "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&&fm=jpg&w=400&fit=max";

    export let props;

    console.log(props);
    
</script>
<div {props} class="grow">
    <Card img="{unSplashUri}" href={`/api/property/${props.id}/view`} horizontal reverse={hCard} class="mb-4">
      <p class="text-pretty mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.propertyCode}</p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">{props.propertyType}</p>
    </Card>
</div>