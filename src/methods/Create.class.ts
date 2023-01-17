import { entityType } from '../types/quickbooks.types';
import { QuickBooksBase } from './Base.class';

export class CreateQB extends QuickBooksBase {
  /**
   * Creates Account in QuickBooks
   *
   * @param {Object} accountObject - account object to be persisted in QuickBooks
   * @return {Promise<Object>} account object response
   */
  async createAccount(accountObject: entityType): Promise<object> {
    return await this.create('account', accountObject);
  }

  /**
   * Creates Attachable in QuickBooks
   *
   * @param {Object} attachableObject - attachable object to be persisted in QuickBooks
   * @return {Promise<Object>} attachable object response
   */
  async createAttachable(attachableObject: entityType): Promise<object> {
    return await this.create('attachable', attachableObject);
  }

  /**
   * Creates Bill in QuickBooks
   *
   * @param {Object} billObject - bill object to be persisted in QuickBooks
   * @return {Promise<Object>} bill object response
   */
  async createBill(billObject: entityType): Promise<object> {
    return await this.create('bill', billObject);
  }

  /**
   * Creates BillPayment in QuickBooks
   *
   * @param {Object} billPaymentObject - billPayment object to be persisted in QuickBooks
   * @return {Promise<Object>} billPayment object response
   */
  async createBillPayment(billPaymentObject: entityType): Promise<object> {
    return await this.create('billPayment', billPaymentObject);
  }

  /**
   * Creates Class in QuickBooks
   *
   * @param {Object} classObject - class object to be persisted in QuickBooks
   * @return {Promise<Object>} class object response
   */
  async createClass(classObject: entityType): Promise<object> {
    return await this.create('class', classObject);
  }

  /**
   * Creates CreditMemo in QuickBooks
   *
   * @param {Object} creditMemoObject - creditMemo object to be persisted in QuickBooks
   * @return {Promise<Object>} creditMemo object response
   */
  async createCreditMemo(creditMemoObject: entityType): Promise<object> {
    return await this.create('creditMemo', creditMemoObject);
  }

  /**
   * Creates Customer in QuickBooks
   *
   * @param {Object} customerObject - customer object to be persisted in QuickBooks
   * @return {Promise<Object>} customer object response
   */
  async createCustomer(customerObject: entityType): Promise<object> {
    return await this.create('customer', customerObject);
  }

  /**
   * Creates Department in QuickBooks
   *
   * @param {Object} departmentObject - department object to be persisted in QuickBooks
   * @return {Promise<Object>} department object response
   */
  async createDepartment(departmentObject: entityType): Promise<object> {
    return await this.create('department', departmentObject);
  }

  /**
   * Creates Deposit in QuickBooks
   *
   * @param {Object} depositObject - deposit object to be persisted in QuickBooks
   * @return {Promise<Object>} deposit object response
   */
  async createDeposit(depositObject: entityType): Promise<object> {
    return await this.create('deposit', depositObject);
  }

  /**
   * Creates Employee in QuickBooks
   *
   * @param {Object} employeeObject - employee object to be persisted in QuickBooks
   * @return {Promise<Object>} employee object response
   */
  async createEmployee(employeeObject: entityType): Promise<object> {
    return await this.create('employee', employeeObject);
  }

  /**
   * Creates Estimate in QuickBooks
   *
   * @param {Object} estimateObject - estimate object to be persisted in QuickBooks
   * @return {Promise<Object>} estimate object response
   */
  async createEstimate(estimateObject: entityType): Promise<object> {
    return await this.create('estimate', estimateObject);
  }

  /**
   * Creates Invoice in QuickBooks
   *
   * @param {Object} invoiceObject - invoice object to be persisted in QuickBooks
   * @return {Promise<Object>} invoice object response
   */
  async createInvoice(invoiceObject: entityType): Promise<object> {
    return await this.create('invoice', invoiceObject);
  }

  /**
   * Creates Item in QuickBooks
   *
   * @param {Object} itemObject - item object to be persisted in QuickBooks
   * @return {Promise<Object>} item object response
   */
  async createItem(itemObject: entityType): Promise<object> {
    return await this.create('item', itemObject);
  }

  /**
   * Creates JournalCode in QuickBooks
   *
   * @param {Object} journalCodeObject - journalCode object to be persisted in QuickBooks
   * @return {Promise<Object>} journalCode object response
   */
  async createJournalCode(journalCodeObject: entityType): Promise<object> {
    return await this.create('journalCode', journalCodeObject);
  }

  /**
   * Creates JournalEntry in QuickBooks
   *
   * @param {Object} journalEntryObject - journalEntry object to be persisted in QuickBooks
   * @return {Promise<Object>} journalEntry object response
   */
  async createJournalEntry(journalEntryObject: entityType): Promise<object> {
    return await this.create('journalEntry', journalEntryObject);
  }

  /**
   * Creates Payment in QuickBooks
   *
   * @param {Object} paymentObject - payment object to be persisted in QuickBooks
   * @return {Promise<Object>} payment object response
   */
  async createPayment(paymentObject: entityType): Promise<object> {
    return await this.create('payment', paymentObject);
  }

  /**
   * Creates PaymentMethod in QuickBooks
   *
   * @param {Object} paymentMethodObject - paymentMethod object to be persisted in QuickBooks
   * @return {Promise<Object>} paymentMethod object response
   */
  async createPaymentMethod(paymentMethodObject: entityType): Promise<object> {
    return await this.create('paymentMethod', paymentMethodObject);
  }

  /**
   * Creates Purchase in QuickBooks
   *
   * @param {Object} purchaseObject - purchase object to be persisted in QuickBooks
   * @return {Promise<Object>} purchase object response
   */
  async createPurchase(purchaseObject: entityType): Promise<object> {
    return await this.create('purchase', purchaseObject);
  }

  /**
   * Creates PurchaseOrder in QuickBooks
   *
   * @param {Object} purchaseOrderObject - purchaseOrder object to be persisted in QuickBooks
   * @return {Promise<Object>} purchaseOrder object response
   */
  async createPurchaseOrder(purchaseOrderObject: entityType): Promise<object> {
    return await this.create('purchaseOrder', purchaseOrderObject);
  }

  /**
   * Creates RefundReceipt in QuickBooks
   *
   * @param {Object} refundReceiptObject - refundReceipt object to be persisted in QuickBooks
   * @return {Promise<Object>} refundReceipt object response
   */
  async createRefundReceipt(refundReceiptObject: entityType): Promise<object> {
    return await this.create('refundReceipt', refundReceiptObject);
  }

  /**
   * Creates SalesReceipt in QuickBooks
   *
   * @param {Object} salesReceiptObject - salesReceipt object to be persisted in QuickBooks
   * @return {Promise<Object>} salesReceipt object response
   */
  async createSalesReceipt(salesReceiptObject: entityType): Promise<object> {
    return await this.create('salesReceipt', salesReceiptObject);
  }

  /**
   * Creates TaxAgency in QuickBooks
   *
   * @param {Object} taxAgencyObject - taxAgency object to be persisted in QuickBooks
   * @return {Promise<Object>} taxAgency object response
   */
  async createTaxAgency(taxAgencyObject: entityType): Promise<object> {
    return await this.create('taxAgency', taxAgencyObject);
  }

  /**
   * Creates TaxService in QuickBooks
   *
   * @param {Object} taxServiceObject - taxService object to be persisted in QuickBooks
   * @return {Promise<Object>} taxService object response
   */
  async createTaxService(taxServiceObject: entityType): Promise<object> {
    return await this.create('taxService', taxServiceObject);
  }

  /**
   * Creates Term in QuickBooks
   *
   * @param {Object} termObject - term object to be persisted in QuickBooks
   * @return {Promise<Object>} term object response
   */
  async createTerm(termObject: entityType): Promise<object> {
    return await this.create('term', termObject);
  }

  /**
   * Creates TimeActivity in QuickBooks
   *
   * @param {Object} timeActivityObject - timeActivity object to be persisted in QuickBooks
   * @return {Promise<Object>} timeActivity object response
   */
  async createTimeActivity(timeActivityObject: entityType): Promise<object> {
    return await this.create('timeActivity', timeActivityObject);
  }

  /**
   * Creates Transfer in QuickBooks
   *
   * @param {Object} transferObject - transfer object to be persisted in QuickBooks
   * @return {Promise<Object>} transfer object response
   */
  async createTransfer(transferObject: entityType): Promise<object> {
    return await this.create('transfer', transferObject);
  }

  /**
   * Creates Vendor in QuickBooks
   *
   * @param {Object} vendorObject - vendor object to be persisted in QuickBooks
   * @return {Promise<Object>} vendor object response
   */
  async createVendor(vendorObject: entityType): Promise<object> {
    return await this.create('vendor', vendorObject);
  }

  /**
   * Creates VendorCredit in QuickBooks
   *
   * @param {Object} vendorCreditObject - vendorCredit object to be persisted in QuickBooks
   * @return {Promise<Object>} vendorCredit object response
   */
  async createVendorCredit(vendorCreditObject: entityType): Promise<object> {
    return await this.create('vendorCredit', vendorCreditObject);
  }
}
