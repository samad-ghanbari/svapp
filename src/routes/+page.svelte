<script lang="ts">
	// You can add any logic here if needed
	import { CONFIGS } from '$lib/constants';
	import Toolbar from '$lib/components/Toolbar.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Button from '$lib/components/Button.svelte';
	import MegaBar from '$lib/components/MegaBar.svelte';
	import Mega from '$lib/components/Mega.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { Hr } from 'flowbite-svelte';
	// "allowArbitraryExtensions": true   add this line to tsconfig for ts in .svelet

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
	let id = data.id;
	let name = data.name;
</script>

<svelte:head>
	<title>iSchool &#x1F3E0</title>
	<!-- &#x... -->
</svelte:head>

<div
	class="from-blue-10 fixed inset-0 z-[9999] flex min-h-screen flex-col bg-gradient-to-br to-blue-100 text-2xl text-black"
>
	<!-- Main content -->
	<main class="flex-grow p-4">
		<Navbar />
		<Toolbar />
		<Hr class="w-64">or</Hr>
		<MegaBar />
		<Mega />

		<Hr class="mx-auto my-4 h-1 w-48 rounded-sm md:my-10" />
		<h1>{id}</h1>
		<h1>{name}</h1>
		<Button confirm={true} name="confirm" action={() => console.log('ok')} />
		<br />
		<Button confirm={false} name="cancel" action={() => console.log('no ok')} />

		<Hr class=" bg-red-400h-2 h-1 bg-gradient-to-r from-pink-500 to-indigo-500" />

		<Hr class="h-2 border-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
	</main>
	<!-- Footer -->
	<Footer />
</div>
