import { CustomerInterface } from '../Customer/CustomerInterface';

export interface UserInterface {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  cellPhoneNumber: string;
  roles: Array<string>;
  customer: CustomerInterface;
}

export interface UserFormValidationInterface {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: object;
  cellPhoneNumber: object;
}

export class UserFormValidation implements UserFormValidationInterface {
  email = 'required|email';

  firstName = 'required';

  lastName = 'required';

  phoneNumber = { regex: /^\+[1-9]\d{10,14}$/ };

  cellPhoneNumber = { regex: /^\+[1-9]\d{10,14}$/ };
}
