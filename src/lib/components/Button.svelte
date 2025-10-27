<script lang="ts">
	import { GradientButton } from 'flowbite-svelte';
	import { CheckCircleSolid, ChevronSortOutline, CloseCircleSolid } from 'flowbite-svelte-icons';

	const { confirm, name, action } = $props<{ confirm: Boolean; name: string; action: any }>();
	let state: boolean = $state(false);

	function handleClick() {
		console.log('Button clicked!', confirm);
		state = !state; // toggle local state if you want
		action();
	}
</script>

<!-- 
em     parent element 
rem    root element <html>

2rem = 2 *<html> tag fontsize

tailwindcss spacing base = 0.25rem

w-20 = 20*0.25 = 20/4 = 5rem
default rem = 16px

if width = 5rem needed : 5*4 any value times by 4 
~ 48px = 3rem > 3*4=12 ==> w-12
~ 96px = 96/16= 6 ==> 6*4 : w-24

pixel to tailwind
/16 * 4 => /4

96px > 96/4 = 24
-->
<div class="h-10 w-80 bg-blue-400">
	<GradientButton onclick={handleClick} class="" color={confirm ? 'greenToBlue' : 'pinkToOrange'}>
		{#if confirm}
			<CheckCircleSolid class="mr-2 h-5 w-5" />
			تایید
		{:else}
			<CloseCircleSolid class="mr-2 h-5 w-5" />
			عدم تایید
		{/if}
	</GradientButton>
</div>
