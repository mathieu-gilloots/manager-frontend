export interface InvoiceInterface {
  uuid: string;
  name: string;
  status: string;
  date: string;
  type: string;
  totalHt: number;
  totalVat: number;
  totalTtc: number;
  totalPaid: number;
}

export interface InvoicePaginatedInterface {
  totalInvoices: number;
  invoices: InvoiceInterface[];
}
export type InvoiceInterfaceKeysOfType<T, TProp> = {
  [P in keyof T]: T[P] extends TProp ? P : never;
}[keyof T];

export const STATUS_CLOSED = 'closed';
export const STATUS_PAID = 'paid';
export const STATUS_UNPAID = 'unpaid';

export const TYPE_INVOICE = 'invoice';
export const TYPE_DEPOSIT = 'deposit';
export const TYPE_CREDIT = 'credit';
