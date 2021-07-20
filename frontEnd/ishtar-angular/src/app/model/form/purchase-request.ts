import { Item } from './item';
import { Address } from './address';
import { Customer } from './customer';
export class PurchaseRequest {

  customer?: Customer;
  fromAddress?: Address;
  toAddress?: Address;
  requestOrder?: Request;
  items?: Item[];

}
