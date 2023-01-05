<script setup lang="ts">
import type { Ref } from 'vue';
import { AxiosError, AxiosResponse } from 'axios';

import { ContractInterface } from '../../../../../types/Customer/ContractInterface';
import { ErrorInterface } from '../../../../../types/common';

useHead({
  title: 'Signer un contrat | ITMG-Cloud',
});

const { t } = useI18n();
const auth = useAuth();

const props = defineProps<{
  customerUuid: string;
  contractUuid: string;
}>();

const codeState: Ref<string> = ref('not-sent');

const inputCode: Ref<string> = ref('');

const currentContract: Ref<ContractInterface | undefined> = ref();

const error: Ref<ErrorInterface | undefined> = ref();

onMounted(() => {
  retrieveContract();
});

function handleCodeButton() {
  if (codeState.value === 'sent') {
    validateCode();
  } else {
    sendCode();
  }
}

function validateCode() {
  codeState.value = 'validating';
  axios
    .post(
      `${import.meta.env.VITE_BACKEND_API_ENDPOINT}/customer/${props.customerUuid}/contract/${
        props.contractUuid
      }/sign`,
      { code: inputCode.value }
    )
    .then((response: AxiosResponse<ContractInterface>) => {
      currentContract.value = response.data;
      codeState.value = 'validated';
    })
    .catch((reason: AxiosError<ErrorInterface>) => {
      error.value = reason.response?.data;
      codeState.value = 'sent';
    });
}

function sendCode() {
  codeState.value = 'sending';
  axios
    .get(
      `${import.meta.env.VITE_BACKEND_API_ENDPOINT}/customer/${props.customerUuid}/contract/${
        props.contractUuid
      }/sign?request_code`
    )
    .then((response: AxiosResponse<ContractInterface>) => {})
    .catch((reason: AxiosError<ErrorInterface>) => {
      error.value = reason.response?.data;
    })
    .finally(() => {
      codeState.value = 'sent';
    });
}
function retrieveContract() {
  axios
    .get(
      `${import.meta.env.VITE_BACKEND_API_ENDPOINT}/customer/${props.customerUuid}/contract/${
        props.contractUuid
      }/sign`
    )
    .then((response: AxiosResponse<ContractInterface>) => {
      currentContract.value = response.data;
    })
    .catch((reason: AxiosError<ErrorInterface>) => {
      error.value = reason.response?.data;
    });
}

const isMyCustomer = computed<Boolean | void>(() => {
  if (auth.ready()) {
    return props.customerUuid === auth.user().customer.uuid;
  }
  return false;
});
</script>

<script lang="ts">
export default {
  name: 'CustomerContractSigningView',
};
</script>

<template>
  <div
    v-if="isMyCustomer"
    class="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200 sm:overflow-hidden sm:rounded-md"
  >
    <header class="px-5 py-4 border-b border-gray-100">
      <h2 class="font-semibold text-gray-800">{{ t('pages.customer.contract.sign.title') }}</h2>
    </header>

    <div class="space-y-6 px-4 py-5 sm:p-6">
      <div
        v-if="undefined !== error"
        class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
        role="alert"
      >
        <p class="font-bold">{{ t('pages.customer.contract.sign.error.title') }}</p>
        <!-- disable because we need a break line here -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-html="t('pages.customer.contract.sign.error.' + error?.message)"></p>
      </div>
      <div v-else-if="codeState !== 'validated'">
        <div
          class="bg-picton-blue-100 border-l-4 border-picton-blue-500 text-picton-blue-700 p-4 mb-5"
          role="alert"
        >
          <!-- disable because we need a break line here -->
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-html="t('pages.customer.contract.sign.info.process')"></p>
        </div>

        <div class="mb-5 text-center flex w-4/12 m-auto">
          <div class="mr-2 w-1/3">
            <el-input
              v-model="inputCode"
              type="primary"
              :disabled="codeState !== 'sent'"
              :placeholder="t('pages.customer.contract.sign.input.code')"
            />
          </div>

          <el-button
            class="w-2/3"
            type="primary"
            :loading="codeState === 'sending' || codeState === 'validating'"
            @click="handleCodeButton"
          >
            <span v-if="codeState === 'not-sent'">{{
              t('pages.customer.contract.sign.buttons.receive-code')
            }}</span>
            <span v-if="codeState === 'sending'">{{
              t('pages.customer.contract.sign.buttons.sending')
            }}</span>
            <span v-if="codeState === 'sent'">{{
              t('pages.customer.contract.sign.buttons.validate')
            }}</span>
            <span v-if="codeState === 'validating'">{{
              t('pages.customer.contract.sign.buttons.validating')
            }}</span>
          </el-button>
        </div>

        <embed
          :src="currentContract?.fileUrl + '#navpanes=0'"
          type="application/pdf"
          class="m-auto"
          width="90%"
          height="400px"
        />
      </div>
      <div v-else>
        <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-5" role="alert">
          <!-- disable because we need a break line here -->
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-html="t('pages.customer.contract.sign.info.validated')"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="json">
{
  "name": "customer_contract_signing_view",
  "meta": {
    "auth": true
  }
}
</route>
