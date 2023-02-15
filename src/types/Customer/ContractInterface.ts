import { ServiceTypeInterface } from './ServiceTypeInterface';

export interface ContractInterface {
  uuid: string;
  serviceType: ServiceTypeInterface;
  effectiveDate: string;
  fileUrl: string;
}

export interface ContractAgreementsInterface {
  uuid: string;
  customerUuid: string;
  contractUuid: string;
  validatedByUuid: string;
  validatedAt: string;
  validatorPhoneNumber: string;
  validatorIpAddress: string;
}

export interface ContractApiResponseInterface {
  availablesContracts: ContractInterface[];
  customerContractAgreements: ContractAgreementsInterface[];
}

export type ContractInterfaceKeysOfType<T, TProp> = {
  [P in keyof T]: T[P] extends TProp ? P : never;
}[keyof T];
