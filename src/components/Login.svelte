<script>
import { useForm, validators, HingGroup, Hint, email, required } from 'svelte-use-form@latest";
</script>

<form use:form>
<h1>Login</h1>

<input type="email" name="email" use:validators={[required, email]} />


</form>
