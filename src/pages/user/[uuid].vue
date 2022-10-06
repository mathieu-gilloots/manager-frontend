<script setup lang="ts">

import type { Ref } from 'vue'
import { AxiosError, AxiosResponse } from "axios";
import { UserInterface, UserFormValidation, UserFormValidationInterface } from "../../types/User/UserInterface";
import { Field, Form, ErrorMessage } from 'vee-validate';

useHead({
  title: 'Dashboard | ITMG-Cloud',
});

const { t } = useI18n();
const auth = useAuth();

const props = defineProps<{
  uuid: string
}>();

const userProfile: Ref<UserInterface | undefined> = ref();

/*************************************
*
*  Vee-Validate Definitions & Rules
*
*************************************/
const fieldsRules = new UserFormValidation();

onMounted(() => {
  axios.get(import.meta.env.VITE_BACKEND_API_ENDPOINT + '/user/' + props.uuid)
    .then((response: AxiosResponse<UserInterface>) => {
        userProfile.value = response.data;
    })
    .catch((reason: AxiosError) => {
      // handle error
      console.log(reason);
    })
})

function submitUser() {
  axios.put(
    import.meta.env.VITE_BACKEND_API_ENDPOINT + '/user/' + props.uuid,
     {
      data: userProfile.value
     }
  )
    .then((response: AxiosResponse) => {
      if(response.status === 202) {
        ElNotification({
          title: t('pages.user.edit.notifications.success.title'),
          dangerouslyUseHTMLString: true,
          message: "<p class='text-left'>" + t('pages.user.edit.notifications.success.message') + "</p>",
          type: 'success',
        });

        if(isMyProfile) {
          auth.fetch();
        }
      }
    })
    .catch((reason: AxiosError) => {
      ElNotification({
          title: t('pages.user.edit.notifications.error.title'),
          dangerouslyUseHTMLString: true,
          message: "<p class='text-left'>" + t('pages.user.edit.notifications.error.message') + "</p>",
          type: 'error',
        })
    })
}

const isMyProfile = computed<Boolean | void>(() => {
  if(auth.ready()) {
    return props.uuid === auth.user().uuid ? true : false;
  }
})

</script>

<script lang="ts">
export default {
  name: 'UserView',
};
</script>

<template>

  <div v-if="undefined !== userProfile" class="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200 sm:overflow-hidden sm:rounded-md">
    <header class="px-5 py-4 border-b border-gray-100">
      <h2 class="font-semibold text-gray-800">{{ isMyProfile ? t("pages.user.edit.my-profile") : t("pages.user.edit.edit-of") + userProfile.firstName + " " + userProfile.lastName }}</h2>
    </header>


    <Form class="space-y-6 px-4 py-5 sm:p-6" @submit="submitUser">

      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3 sm:col-span-2">
          <label for="user-email" class="block text-sm font-medium text-gray-700">{{ t('user.label.email') }}</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">@</span>
            <Field
              type="text"
              name="user-email"
              id="user-email"
              :label="t('user.label.email')"
              class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-picton-blue focus:ring-picton-blue sm:text-sm placeholder-slate-400"
              :placeholder="t('user.placeholder.email')"
              :rules="fieldsRules['email']"
              v-model="userProfile.email"
            />
          </div>
          <ErrorMessage class="block text-red-500 text-xs pt-1" name="user-email" />
        </div>
      </div>

      <div v-for="field in ['firstName', 'lastName', 'phoneNumber', 'cellPhoneNumber']" class="grid grid-cols-3 gap-6">
        <div class="col-span-3 sm:col-span-2">
          <label :for="'user-' + field" class="block text-sm font-medium text-gray-700">{{ t('user.label.' + field) }}</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <Field
              type="text"
              :name="'user-' + field"
              :id="'user-' + field"
              :label="t('user.label.' + field)"
              class="block w-full flex-1 rounded-md border-gray-300 focus:border-picton-blue focus:ring-picton-blue sm:text-sm placeholder-slate-400"
              :placeholder="t('user.placeholder.' + field)"
              :rules="fieldsRules[field as keyof UserFormValidationInterface]"
              v-model="userProfile[field as keyof UserInterface]"
            />
          </div>
          <ErrorMessage class="block text-red-500 text-xs pt-1" :name="'user-' + field" />
        </div>
      </div>

      <button class="btn bg-picton-blue hover:bg-picton-blue-600 text-white">
        <icon:fluent:save-arrow-right-24-regular class="w-6 h-6" />
        <span class="hidden xs:block ml-2">{{ t('common.buttons.validate') }}</span>
      </button>
    </Form>

  </div>

</template>

<route lang="json">
{
  "name": "user_view",
  "meta": {
    "auth": true
  }
}
</route>
