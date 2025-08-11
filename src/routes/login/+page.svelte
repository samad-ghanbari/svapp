<script lang="ts">
    // You can add any logic here if needed
    import { onMount } from 'svelte';
    import {CONFIGS} from '$lib/constants'


    let username = $state('');
    let password = $state('');
    let isAuthenticated = $state(false);
    let errorMessage = $state('');
    //let captchaImage = $state('');
    //let token = $state('');
   
    type CaptchaJson = {
        image: string;
        token: string;
    };

    const { captchaJson1={image:"a", token:"a"} } = {};
    const da = $props();
    console.log(da)

    let captchaImage = $state(); //captchaJson.image
    let token = $state(); //captchaJson.token
    

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        errorMessage = 'نام‌کاربری یا رمز عبور اشتباه است';
    }

    async function updateCaptcha() {
        const captcha = await fetch('http://localhost/api/captcha');
        const data = await captcha.json();
        captchaImage = data.image;
        token = data.token;
    }   

    let usernameInput: HTMLInputElement;
    onMount(() => {
    usernameInput.focus();
  });

  // run on every time username and password changes 
    $effect(() => {
        if (username && password) {
            errorMessage = '';
        }
    });

</script>

<div class="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-10 to-blue-100 text-white text-2xl z-[9999]">
    <img
        src="/assets/images/background/back1.jpg"
        alt="Cover"
        class="w-full h-full object-cover absolute inset-0"
    />
    {#if errorMessage}
        <button
            type="button"
            class="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-rose-700 to-purple-700 text-white px-10 py-3 text-lg font-bold rounded shadow-lg z-50 animate-fade-in"
            onclick={() => errorMessage = ''}
            aria-label="بستن پیام خطا"
        >
            {errorMessage}
        </button>
    {/if}
    <div class="relative bg-blue-50/50 p-8 rounded-lg shadow-lg">
        <img
            src="/assets/images/logo/logo512.png"
            alt="Roshangaran Logo"
            class="w-30 h-30 mx-auto mb-4"
        />

        <h1 class="text-2xl font-bold mb-2 text-center">{CONFIGS.school_name}</h1>
        <hr class="border-blue-200 mb-2" />

        <form class="flex flex-col gap-4  p-6" style="min-width: 300px;" onsubmit={handleSubmit}>
            <input name="token" type="hidden" id="token" bind:value={token} />
            <label class="text-blue-900 text-right text-lg font-bold">نام کاربری
                <input
                    type="text"
                    bind:value={username}
                    bind:this={usernameInput}
                    class="mt-1 p-2 w-full rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 placeholder:text-right"
                    placeholder="نام کاربری"
                    required
                />
            </label>
            <label class="text-blue-900 text-right text-lg font-bold">رمز عبور
                <input type="password" bind:value={password} class="mt-1 p-2 w-full rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 placeholder:text-right" placeholder="رمز عبور" required />
            </label>
            
                <div class="flex items-center">
                    <img id="captchaImage" src="{captchaImage}"  alt="کد امنیتی" class="mr-2 w-[150px] h-[50px]" />
                    <input
                        type="text"
                        class="mt-1 p-2 w-[150px] rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 placeholder:text-right"
                        placeholder="کد امنیتی"
                        required />
                </div>

            <button
                type="submit"
                class="bg-blue-500 font-kalameh text-lg font-bold hover:bg-blue-700 text-white py-2 rounded transition"
                style="cursor: pointer;"
            >
                ورود
            </button>
        </form>

    </div>


</div>