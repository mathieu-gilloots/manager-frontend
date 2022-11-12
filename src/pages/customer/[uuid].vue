<script setup lang="ts">
import type { Ref } from 'vue';
import { AxiosError, AxiosResponse } from 'axios';
import { Field, Form, ErrorMessage } from 'vee-validate';
import {
  CustomerInterface,
  CustomerFormValidation,
  CustomerFormValidationInterface,
} from '../../types/Customer/CustomerInterface';

useHead({
  title: 'Fiche Client | ITMG-Cloud',
});

const { t } = useI18n();
const auth = useAuth();

const props = defineProps<{
  uuid: string;
}>();

const customerProfile: Ref<CustomerInterface | undefined> = ref();

/* ************************************
 *
 *  Vee-Validate Definitions & Rules
 *
 ************************************ */
const fieldsRules = new CustomerFormValidation();

onMounted(() => {
  axios
    .get(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/customer/${props.uuid}`)
    .then((response: AxiosResponse<CustomerInterface>) => {
      customerProfile.value = response.data;
    })
    .catch((reason: AxiosError) => {
      // TODO: Exception catching
    });
});

function submitCustomer() {
  axios
    .put(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/customer/${props.uuid}`, {
      data: customerProfile.value,
    })
    .then((response: AxiosResponse) => {
      if (response.status === 202) {
        ElNotification({
          title: t('pages.customer.edit.notifications.success.title'),
          dangerouslyUseHTMLString: true,
          message: `<p class='text-left'>${t(
            'pages.customer.edit.notifications.success.message'
          )}</p>`,
          type: 'success',
        });

        if (isMyCustomer) {
          auth.fetch();
        }
      }
    })
    .catch((reason: AxiosError) => {
      ElNotification({
        title: t('pages.customer.edit.notifications.error.title'),
        dangerouslyUseHTMLString: true,
        message: `<p class='text-left'>${t('pages.customer.edit.notifications.error.message')}</p>`,
        type: 'error',
      });
    });
}

const isMyCustomer = computed<Boolean>(() => {
  if (auth.ready()) {
    return props.uuid === auth.user().customer.uuid;
  }
  return false;
});
</script>

<script lang="ts">
export default {
  name: 'CustomerView',
};
</script>

<template>
  <div
    v-if="undefined !== customerProfile"
    class="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200 sm:overflow-hidden sm:rounded-md"
  >
    <header class="px-5 py-4 border-b border-gray-100">
      <h2 class="font-semibold text-gray-800">
        {{
          isMyCustomer
            ? t('pages.customer.edit.my-profile')
            : t('pages.customer.edit.edit-of') + customerProfile.corporateName
        }}
      </h2>
    </header>

    <Form class="space-y-6 px-4 py-5 sm:p-6" @submit="submitCustomer">
      <div
        v-for="field in [
          'corporateName',
          'tradeName',
          'streetAddress',
          'postalCode',
          'locality',
          'country',
        ]"
        :key="field"
        class="grid grid-cols-3 gap-6"
      >
        <div class="col-span-3 sm:col-span-2">
          <label :for="'customer-' + field" class="block text-sm font-medium text-gray-700">
            {{ t('customer.label.' + field) }}
            <div class="mt-1 flex rounded-md shadow-sm">
              <Field
                :id="'customer-' + field"
                v-model="customerProfile[field as keyof CustomerInterface]"
                type="text"
                :name="'customer-' + field"
                :label="t('customer.label.' + field)"
                class="block w-full flex-1 rounded-md border-gray-300 focus:border-picton-blue focus:ring-picton-blue sm:text-sm placeholder-slate-400"
                :placeholder="t('customer.placeholder.' + field)"
                :rules="fieldsRules[field as keyof CustomerFormValidationInterface]"
              />
            </div>
          </label>
          <ErrorMessage class="block text-red-500 text-xs pt-1" :name="'customer-' + field" />
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
  "name": "customer_view",
  "meta": {
    "auth": true
  }
}
</route>
