<script setup lang="ts">

import ITMGLogo from '../assets/logo.png';
import LoginBg from '../assets/login/bg.webp';
import {useAuth} from "@websanova/vue-auth";

useHead({
  title: 'Vitailse | Opinionated vite starter template',
});

const { t } = useI18n();
const auth = useAuth();

const state = reactive({
    username: '',
    password: '',
    errorMessage: null
})

function processLogin(): void {
  auth.login({
    url: import.meta.env.VITE_BACKEND_API_ENDPOINT + '/login_check',
    data: {
        username: state.username,
        password: state.password
    },
    redirect: {name: 'home'},
    remember: 'Rob',
    staySignedIn: true,
    fetchUser: true
}).then(null, (res) => {
    state.errorMessage = res.response.data.message;
});
}

</script>

<script lang="ts">
export default {
  name: 'LoginPage',
};
</script>

<template>

<div class="relative py-16
                before:absolute before:inset-0 before:w-full before:h-[50%] before:bg-gray-200">
    <img :src="LoginBg" class="fixed blur-xl inset-0 rotate-0" alt="background" />
    <div class="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">

        <div class="m-auto space-y-8 md:w-8/12 lg:">
            <div class="rounded-xl border bg-opacity-50 backdrop-blur-2xl bg-white shadow-xl">
                <div class="p-6 sm:p-16">
                    <h2 class="mb-8 text-2xl text-cyan-900 font-bold">
                        <img :src="ITMGLogo" loading="lazy" class="w-12 mr-2 inline" alt="tailus logo" />
                        {{ t('login.header') }}
                        </h2>
                    <form action="" class="space-y-8">
                        <div class="space-y-2">
                            <label for="email" class="text-gray-700">{{ t('login.form.email.title') }}</label>
                            <input  type="email" name="email" v-model="state.username" id="email" :placeholder="t('login.form.email.placeholder')"
                                    class="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300
                                        focus:ring-2 focus:ring-sky-300 focus:outline-none
                                        invalid:ring-2 invalid:ring-red-400"
                                    tabindex="0"
                            >
                        </div>

                        <div>
                            <div class="flex items-center justify-between">
                                <label for="pwd" class="text-gray-700">{{ t('login.form.password.title') }}</label>
                                <a href="#" class="p-2 -mr-2 text-sm text-sky-500" type="reset" tabindex="1">
                                    {{ t('login.form.password.forget') }}
                                </a>
                            </div>
                            <input  type="password" name="pwd" id="pwd" v-model="state.password" :placeholder="t('login.form.password.placeholder')"
                                    class="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300
                                        focus:ring-2 focus:ring-sky-300 focus:outline-none
                                        invalid:ring-2 invalid:ring-red-400"
                                    tabindex="0"
                            >
                        </div>

                        <button type="submit" @click.prevent="processLogin()"
                                class="w-full py-3 px-6 rounded-md bg-sky-600
                                    focus:bg-sky-700 active:bg-sky-500">
                            <span class="text-white">{{ t('login.form.submit') }}</span>
                        </button>

                        <span>{{ state.errorMessage }}</span>

                        <p class="border-t pt-6 text-sm">
                            {{ t('login.no-account.no-account-yet' )}}
                            <a href="#" class="text-sky-500">{{ t('login.no-account.contact-your-csm' )}}</a>
                        </p>
                    </form>
                </div>
            </div>
            <div class="text-center text-blue-50 space-x-8">
                <span>&copy; ITMG-Consulting</span>
            </div>
        </div>
    </div>
</div>

</template>

<route lang="yaml">
name: "login"
meta:
    layout: "login"
</route>
