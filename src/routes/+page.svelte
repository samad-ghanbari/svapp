<script>
    // You can add any logic here if needed
    import bgCover from '$lib/assets/images/background/back1.jpg';
    import logo from '$lib/assets/images/logo/logo512.png';
</script>

<div class="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-10 to-blue-100 text-white text-2xl z-[9999]">
    <img
        src="{bgCover}"
        alt="Cover"
        class="w-full h-full object-cover absolute inset-0"
    />
    <div class="relative bg-blue-50 p-8 rounded-lg shadow-lg">
        <img
            src="{logo}"
            alt="Roshangaran Logo"
            class="w-30 h-30 mx-auto mb-4"
        />
        <h1 class="text-4xl font-bold mb-2">Welcome to Roshangaran!</h1>
    </div>
</div>