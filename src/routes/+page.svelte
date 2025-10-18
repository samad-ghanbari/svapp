<script lang="ts">
	// You can add any logic here if needed
	import { CONFIGS } from '$lib/constants';
	import Toolbar from '$lib/components/Toolbar.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	//return { data };
	// let { data } = $props();
	// let id = data.data.id;
	// let name = data.data.name;

	//retuen val;
	// let data = $props(); // { data , form, params}
	// console.log(data);
	// let id = data.data.id;
	// let name = data.data.name;

	let { data } = $props(); // { data , form, params}
	console.log(data);
	let id = data.id;
	let name = data.name;
</script>

<svelte:head>
	<title>iSchool &#x1F3E0</title>
	<!-- &#x... -->
</svelte:head>

<div class="from-blue-10 fixed inset-0 z-[9999] bg-gradient-to-br to-blue-100 text-2xl text-black">
	<Navbar />
	<Toolbar />

	<h1>{id}</h1>
	<h1>{name}</h1>
</div>
