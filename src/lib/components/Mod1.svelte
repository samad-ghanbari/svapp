<script lang="ts">
	import { PhoneInput, Label, Helper } from 'flowbite-svelte';
	let { label, status = $bindable() } = $props<{ label: string; status: boolean }>();
</script>

<div
	class="m-6 h-8 flex-1 rounded-full bg-amber-300 text-center text-sm leading-8 font-bold text-amber-700"
>
	{label}
</div>
<PhoneInput
	aria-describedby="helper-text-explanation"
	id="phone-input"
	placeholder="021-88058502"
	class="h-8"
	oninput={(e: Event) => {
		const input = e.target as HTMLInputElement;
		console.log(input.value);
		status = false;
	}}
	required
/>
