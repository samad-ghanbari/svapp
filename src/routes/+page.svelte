<script lang="ts">
	// You can add any logic here if needed
	import { CONFIGS } from '$lib/constants';
	import Toolbar from '$lib/components/Toolbar.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
	<title>iSchool &#x1F3E0</title>
	<!-- &#x... -->
</svelte:head>

<div class="from-blue-10 fixed inset-0 z-[9999] bg-gradient-to-br to-blue-100 text-2xl text-black">
	<Navbar />
	<Toolbar />
</div>
