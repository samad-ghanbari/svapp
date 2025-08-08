<script lang="ts">
    // You can add any logic here if needed
  export let error : Error & {stack?: string};


</script>

<div class="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-rose-10 to-rose-500 text-white text-2xl z-[9999]">
    <p>Error</p>
</div>