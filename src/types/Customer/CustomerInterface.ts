export interface CustomerInterface {
  uuid: string;
  corporateName: string;
  tradeName?: string | null;
  streetAddress: string;
  postalCode: string;
  locality: string;
  country: string;
}

export interface CustomerFormValidationInterface {
  corporateName: string;
  tradeName?: string;
  streetAddress: string;
  postalCode: string;
  locality: string;
  country: string;
}

export class CustomerFormValidation implements CustomerFormValidationInterface {
  corporateName = 'required';

  tradeName = '';

  streetAddress = 'required';

  postalCode = 'required';

  locality = 'required';

  country = 'required';
}
