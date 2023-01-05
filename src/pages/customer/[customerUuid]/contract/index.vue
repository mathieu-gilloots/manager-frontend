<script setup lang="ts">
import type { Ref } from 'vue';
import { AxiosError, AxiosResponse } from 'axios';
import { ElTabs, ElTabPane, TableColumnCtx } from 'element-plus';

import {
  ContractInterface,
  ContractAgreementsInterface,
  ContractApiResponseInterface,
} from '../../../../types/Customer/ContractInterface';

useHead({
  title: 'Mes Contrats | ITMG-Cloud',
});

const { t, locale } = useI18n();
const auth = useAuth();

const props = defineProps<{
  customerUuid: string;
}>();

const availableContracts: Ref<Array<ContractInterface> | undefined> = ref();
const customerContractAgreements: Ref<Array<ContractAgreementsInterface> | undefined> = ref();

const selectedTab: Ref<string> = ref('to-validate');

onMounted(() => {
  retrieveContracts();
});

function retrieveContracts() {
  axios
    .get(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/customer/${props.customerUuid}/contract`)
    .then((response: AxiosResponse<ContractApiResponseInterface>) => {
      availableContracts.value = response.data.availablesContracts;
      customerContractAgreements.value = response.data.customerContractAgreements;
    })
    .catch((reason: AxiosError) => {
      // handle error
      // TODO: Exception catching
    });
}

const isMyCustomer = computed<Boolean | void>(() => {
  if (auth.ready()) {
    return props.customerUuid === auth.user().customer.uuid;
  }
  return false;
});

const dateFormatter = (
  row: ContractInterface,
  column: TableColumnCtx<ContractInterface>,
  cellValue: string
) => {
  const date = Date.parse(cellValue);
  return new Intl.DateTimeFormat(locale.value, { dateStyle: 'short', timeStyle: 'medium' }).format(
    date
  );
};
</script>

<script lang="ts">
export default {
  name: 'CustomerContractView',
};
</script>

<template>
  <div
    v-if="undefined !== availableContracts && isMyCustomer"
    class="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200 sm:overflow-hidden sm:rounded-md"
  >
    <header class="px-5 py-4 border-b border-gray-100">
      <h2 class="font-semibold text-gray-800">{{ t('pages.customer.contract.title') }}</h2>
    </header>

    <div class="px-10 py-5">
      <el-tabs v-model="selectedTab" class="demo-tabs">
        <el-tab-pane
          :label="t('pages.customer.contract.tabs.to-validate.title')"
          name="to-validate"
        >
          <el-table
            :data="availableContracts"
            style="width: 100%"
            :empty-text="t('pages.customer.contract.tabs.to-validate.empty-data')"
          >
            <el-table-column
              prop="serviceType.name"
              :label="t('contract.labels.name')"
              align="center"
              header-align="center"
            />
            <el-table-column
              prop="effectiveDate"
              :label="t('contract.labels.date')"
              align="center"
              :formatter="dateFormatter"
              header-align="center"
            />
            <el-table-column
              :label="t('contract.labels.actions')"
              align="center"
              header-align="center"
            >
              <template #default="scope">
                <div>
                  <!--
                  Here, we disabled the vuejs-accessibility/anchor-has-content
                  because icon is the content but it's not taken in the plugin
                  -->
                  <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
                  <router-link
                    class="font-medium text-sm flex items-center py-1 px-3"
                    :to="{
                      name: 'customer_contract_signing_view',
                      params: { customerUuid: customerUuid, contractUuid: scope.row.uuid },
                    }"
                    ><icon:fa6-solid:file-signature class="w-6 h-6 ml-auto mr-auto"
                  /></router-link>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="t('pages.customer.contract.tabs.validated.title')" name="validated">
          <el-table
            :data="customerContractAgreements"
            style="width: 100%"
            :empty-text="t('pages.customer.contract.tabs.validated.empty-data')"
          >
            <el-table-column
              prop="contract.serviceType.name"
              :label="t('contract.labels.name')"
              align="center"
              header-align="center"
            />
            <el-table-column
              prop="contract.effectiveDate"
              :label="t('contract.labels.date')"
              align="center"
              :formatter="dateFormatter"
              header-align="center"
            />
            <el-table-column
              prop="validatedAt"
              :label="t('customerContractAgreement.labels.validatedAt')"
              align="center"
              :formatter="dateFormatter"
              header-align="center"
            />
            <el-table-column
              :label="t('customerContractAgreement.labels.validatedBy')"
              align="center"
              header-align="center"
            >
              <template #default="scope">
                <div>
                  <div>
                    {{ scope.row.validatedBy.firstName }}
                    {{ scope.row.validatedBy.lastName }}
                  </div>
                  <div class="text-xs">
                    (IP: {{ scope.row.validatorIpAddress }} / {{ scope.row.validatorPhoneNumber }})
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="t('contract.labels.actions')"
              align="center"
              header-align="center"
            >
              <template #default="scope">
                <div>
                  <!--
                  Here, we disabled the vuejs-accessibility/anchor-has-content
                  because icon is the content but it's not taken in the plugin
                  -->
                  <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
                  <a :href="scope.row.contract.fileUrl" target="_blank">
                    <icon:fluent:arrow-download-16-filled class="w-6 h-6 ml-auto mr-auto" />
                  </a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<route lang="json">
{
  "name": "customer_contract_view",
  "meta": {
    "auth": true
  }
}
</route>
