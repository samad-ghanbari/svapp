<script lang="ts">
	import type { FlowbiteSolid } from 'flowbite-svelte-icons';
	import { Button } from 'flowbite-svelte';

	const { icon, name, action } = $props<{ icon: string; name: string; action: string }>();

	let state: boolean = $state(false);

	function handleClick() {
		console.log('Button clicked!');
	}
</script>

<div class="bg-bl">
	<Button on:click={handleClick} color="primary">Click Me</Button>
</div>
