<script lang="ts">

  import { page } from '$app/state';

  const message : string = page?.error?.message ?? 'خطای سرور';
  const status : number =  page.status ?? 500;

</script>

<svelte:head>
  <title>{status} | Error</title>
</svelte:head>

<div class="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-rose-10 to-rose-500 text-white text-2xl z-[9999]">
  <div >
    <button
      type="button"
      class="w-30 h-30 mx-auto mb-4 cursor-pointer bg-transparent border-none p-0 flex justify-center"
      onclick={() => window.location.href = '/'}
      aria-label="Go to homepage"
    >
      <img
        src="/assets/images/logo/logo512.png"
        alt="Roshangaran Logo"
        class="w-30 h-30"
      />
    </button>
        <h1 class="text-center font-bold font-phamelo">{status}</h1>
        {#if status === 404}
          <p dir="rtl">صفحه مورد نظر موجود نمی‌باشد.</p>
        {:else}
          <p>{message}</p>
        {/if}
        <div class="flex items-center justify-center">
          <a
          href="/"
          class="mt-4 px-6 py-2 bg-white text-rose-500 rounded-sm hover:bg-rose-100 transition-colors text-center text-lg font-bold"
        >
          بازگشت به صفحه اصلی
        </a>
        </div>
  </div>
</div>