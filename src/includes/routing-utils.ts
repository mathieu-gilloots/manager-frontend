import { RouteRecordName } from 'vue-router';

export const ACCOUNT_ROUTES_NAME = ['user_view', 'customer_view', 'customer_invoice_view'] as Array<
  RouteRecordName | null | undefined
>;

/** TODO: this is a fake constant, because es-lint advise to make default export if not */
export const DUMMY_ROUTES_NAME = ['dummy'] as Array<RouteRecordName | null | undefined>;
