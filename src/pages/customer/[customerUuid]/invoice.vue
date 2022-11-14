<script setup lang="ts">
import type { Ref } from 'vue';
import { AxiosError, AxiosResponse } from 'axios';
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import {
  InvoiceInterface,
  InvoicePaginatedInterface,
  STATUS_UNPAID,
  InvoiceInterfaceKeysOfType,
} from '../../../types/Customer/InvoiceInterface';

useHead({
  title: 'Mes factures | ITMG-Cloud',
});

const { t, locale } = useI18n();
const auth = useAuth();

const props = defineProps<{
  customerUuid: string;
}>();

const page: Ref<number> = ref(1);
const itemPerPage: Ref<number> = ref(10);
const invoices: Ref<Array<InvoiceInterface> | undefined> = ref();
const totalInvoiceNumber: Ref<number> = ref(0);

const tableRowClassName = ({ row, rowIndex }: { row: InvoiceInterface; rowIndex: number }) => {
  if (row.status === STATUS_UNPAID) {
    return 'unpaid-row font-semibold';
  }

  return '';
};

onMounted(() => {
  retrieveInvoices();
});

function retrieveInvoices() {
  axios
    .get(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/customer/${props.customerUuid}/invoice`, {
      params: { page: page.value, itemPerPage: itemPerPage.value },
    })
    .then((response: AxiosResponse<InvoicePaginatedInterface>) => {
      invoices.value = response.data.invoices;
      totalInvoiceNumber.value = response.data.totalInvoices;
    })
    .catch((reason: AxiosError) => {
      // handle error
      // TODO: Exception catching
    });
}

function downloadInvoice(uuid: string) {
  axios
    .get(
      `${import.meta.env.VITE_BACKEND_API_ENDPOINT}/customer/${
        props.customerUuid
      }/invoice/${uuid}/download`
    )
    .then((response: AxiosResponse<{ url: string }>) => {
      window.open(response.data.url, '_blank');
    })
    .catch((reason: AxiosError) => {
      // TODO: Exception catching
    });
}

const currencyFormatter = (row: InvoiceInterface, column: TableColumnCtx<InvoiceInterface>) => {
  return new Intl.NumberFormat(locale.value, { style: 'currency', currency: 'EUR' }).format(
    row[column.property as InvoiceInterfaceKeysOfType<InvoiceInterface, number>]
  );
};

const statusFormatter = (row: InvoiceInterface, column: TableColumnCtx<InvoiceInterface>) => {
  return t(`invoice.status.${row[column.property as keyof InvoiceInterface]}`);
};

const typeFormatter = (row: InvoiceInterface, column: TableColumnCtx<InvoiceInterface>) => {
  return t(`invoice.type.${row[column.property as keyof InvoiceInterface]}`);
};

const dateFormatter = (row: InvoiceInterface, column: TableColumnCtx<InvoiceInterface>) => {
  const date = Date.parse(
    row[column.property as InvoiceInterfaceKeysOfType<InvoiceInterface, string>]
  );
  return new Intl.DateTimeFormat(locale.value).format(date);
};

const isMyCustomer = computed<Boolean | void>(() => {
  if (auth.ready()) {
    return props.customerUuid === auth.user().customer.uuid;
  }
  return false;
});
</script>

<script lang="ts">
export default {
  name: 'CustomerInvoiceView',
};
</script>

<template>
  <div
    v-if="undefined !== invoices && isMyCustomer"
    class="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200 sm:overflow-hidden sm:rounded-md"
  >
    <header class="px-5 py-4 border-b border-gray-100">
      <h2 class="font-semibold text-gray-800">{{ t('pages.customer.invoice.title') }}</h2>
    </header>

    <div class="space-y-6 px-4 py-5 sm:p-6">
      <div
        class="bg-picton-blue-100 border-l-4 border-picton-blue-500 text-picton-blue-700 p-4"
        role="alert"
      >
        <p class="font-bold">{{ t('pages.customer.invoice.info-title') }}</p>
        <!-- disable because we need a break line here -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-html="t('pages.customer.invoice.info-content')"></p>
      </div>

      <el-table
        :data="invoices"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        :empty-text="t('pages.customer.invoice.empty-data')"
      >
        <el-table-column
          prop="date"
          :label="t('invoice.labels.date')"
          :formatter="dateFormatter"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="name"
          :label="t('invoice.labels.name')"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="type"
          :label="t('invoice.labels.type')"
          :formatter="typeFormatter"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="status"
          :label="t('invoice.labels.status')"
          :formatter="statusFormatter"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="totalHt"
          :label="t('invoice.labels.totalHt')"
          :formatter="currencyFormatter"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="totalVat"
          :label="t('invoice.labels.totalVat')"
          :formatter="currencyFormatter"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="totalTtc"
          :label="t('invoice.labels.totalTtc')"
          :formatter="currencyFormatter"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="totalPaid"
          :label="t('invoice.labels.totalPaid')"
          :formatter="currencyFormatter"
          align="center"
          header-align="center"
        />
        <el-table-column :label="t('invoice.labels.actions')" align="center" header-align="center">
          <template #default="scope">
            <div>
              <!--
               Here, we disabled the vuejs-accessibility/anchor-has-content
               because icon is the content but it's not taken in the plugin
              -->
              <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
              <a href="#" @click="downloadInvoice(scope.row.uuid)">
                <icon:fluent:arrow-download-16-filled class="w-6 h-6 ml-auto mr-auto" />
              </a>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex">
        <el-pagination
          v-model:currentPage="page"
          class="ml-auto mr-auto"
          :page-size="itemPerPage"
          :background="true"
          layout="prev, pager, next"
          :total="totalInvoiceNumber"
          @current-change="retrieveInvoices()"
        />
      </div>
    </div>
  </div>
</template>

<style>
.el-table .unpaid-row {
  --el-table-tr-bg-color: var(--el-color-danger-light-8);
}
</style>

<route lang="json">
{
  "name": "customer_invoice_view",
  "meta": {
    "auth": true
  }
}
</route>
