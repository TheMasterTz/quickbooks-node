import { ResponseQB } from './Response.class';

export class UpdateQB extends ResponseQB {
  /**
   * Updates Account entity in QuickBooks
   *
   * @param {Object} accountObject - account object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} account object response
   */
  async updateAccount(accountObject: object): Promise<object> {
    return await this.update('account', accountObject);
  }

  /**
   * Updates Attachable entity in QuickBooks
   *
   * @param {Object} attachableObject - attachable object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} attachable object response
   */
  async updateAttachable(attachableObject: object): Promise<object> {
    return await this.update('attachable', attachableObject);
  }

  /**
   * Updates Bill entity in QuickBooks
   *
   * @param {Object} billObject - bill object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} bill object response
   */
  async updateBill(billObject: object): Promise<object> {
    return await this.update('bill', billObject);
  }

  /**
   * Updates BillPayment entity in QuickBooks
   *
   * @param {Object} billPaymentObject - billPayment object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} billPayment object response
   */
  async updateBillPayment(billPaymentObject: object): Promise<object> {
    return await this.update('billPayment', billPaymentObject);
  }

  /**
   * Updates Class entity in QuickBooks
   *
   * @param {Object} classObject - class object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} class object response
   */
  async updateClass(classObject: object): Promise<object> {
    return await this.update('class', classObject);
  }

  /**
   * Updates CompanyInfo entity in QuickBooks
   *
   * @param {Object} companyInfoObject - companyInfo object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} companyInfo object response
   */
  async updateCompanyInfo(companyInfoObject: object): Promise<object> {
    return await this.update('companyInfo', companyInfoObject);
  }

  /**
   * Updates CreditMemo entity in QuickBooks
   *
   * @param {Object} creditMemoObject - creditMemo object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} creditMemo object response
   */
  async updateCreditMemo(creditMemoObject: object): Promise<object> {
    return await this.update('creditMemo', creditMemoObject);
  }

  /**
   * Updates Customer entity in QuickBooks
   *
   * @param {Object} customerObject - customer object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} customer object response
   */
  async updateCustomer(customerObject: object): Promise<object> {
    return await this.update('customer', customerObject);
  }

  /**
   * Updates Department entity in QuickBooks
   *
   * @param {Object} departmentObject - department object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} department object response
   */
  async updateDepartment(departmentObject: object): Promise<object> {
    return await this.update('department', departmentObject);
  }

  /**
   * Updates Deposit entity in QuickBooks
   *
   * @param {Object} depositObject - deposit object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} deposit object response
   */
  async updateDeposit(depositObject: object): Promise<object> {
    return await this.update('deposit', depositObject);
  }

  /**
   * Updates Employee entity in QuickBooks
   *
   * @param {Object} employeeObject - employee object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} employee object response
   */
  async updateEmployee(employeeObject: object): Promise<object> {
    return await this.update('employee', employeeObject);
  }

  /**
   * Updates Estimate entity in QuickBooks
   *
   * @param {Object} estimateObject - estimate object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} estimate object response
   */
  async updateEstimate(estimateObject: object): Promise<object> {
    return await this.update('estimate', estimateObject);
  }

  /**
   * Updates ExchangeRate entity in QuickBooks
   *
   * @param {Object} exchangeRateObject - exchangeRate object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} exchangeRate object response
   */
  async updateExchangeRate(exchangeRateObject: object): Promise<object> {
    return await this.update('exchangeRate', exchangeRateObject);
  }

  /**
   * Updates Invoice entity in QuickBooks
   *
   * @param {Object} invoiceObject - invoice object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} invoice object response
   */
  async updateInvoice(invoiceObject: object): Promise<object> {
    return await this.update('invoice', invoiceObject);
  }

  /**
   * Updates Item entity in QuickBooks
   *
   * @param {Object} itemObject - item object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} item object response
   */
  async updateItem(itemObject: object): Promise<object> {
    return await this.update('item', itemObject);
  }

  /**
   * Updates JournalCode entity in QuickBooks
   *
   * @param {Object} journalCodeObject - journalCode object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} journalCode object response
   */
  async updateJournalCode(journalCodeObject: object): Promise<object> {
    return await this.update('journalCode', journalCodeObject);
  }

  /**
   * Updates JournalEntry entity in QuickBooks
   *
   * @param {Object} journalEntryObject - journalEntry object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} journalEntry object response
   */
  async updateJournalEntry(journalEntryObject: object): Promise<object> {
    return await this.update('journalEntry', journalEntryObject);
  }

  /**
   * Updates Payment entity in QuickBooks
   *
   * @param {Object} paymentObject - payment object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} payment object response
   */
  async updatePayment(paymentObject: object): Promise<object> {
    return await this.update('payment', paymentObject);
  }

  /**
   * Updates PaymentMethod entity in QuickBooks
   *
   * @param {Object} paymentMethodObject - paymentMethod object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} paymentMethod object response
   */
  async updatePaymentMethod(paymentMethodObject: object): Promise<object> {
    return await this.update('paymentMethod', paymentMethodObject);
  }

  /**
   * Updates Preferences entity in QuickBooks
   *
   * @param {Object} preferencesObject - preferences object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} preferences object response
   */
  async updatePreferences(preferencesObject: object): Promise<object> {
    return await this.update('preferences', preferencesObject);
  }

  /**
   * Updates Purchase entity in QuickBooks
   *
   * @param {Object} purchaseObject - purchase object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} purchase object response
   */
  async updatePurchase(purchaseObject: object): Promise<object> {
    return await this.update('purchase', purchaseObject);
  }

  /**
   * Updates PurchaseOrder entity in QuickBooks
   *
   * @param {Object} purchaseOrderObject - purchaseOrder object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} purchaseOrder object response
   */
  async updatePurchaseOrder(purchaseOrderObject: object): Promise<object> {
    return await this.update('purchaseOrder', purchaseOrderObject);
  }

  /**
   * Updates RefundReceipt entity in QuickBooks
   *
   * @param {Object} refundReceiptObject - refundReceipt object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} refundReceipt object response
   */
  async updateRefundReceipt(refundReceiptObject: object): Promise<object> {
    return await this.update('refundReceipt', refundReceiptObject);
  }

  /**
   * Updates SalesReceipt entity in QuickBooks
   *
   * @param {Object} salesReceiptObject - salesReceipt object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} salesReceipt object response
   */
  async updateSalesReceipt(salesReceiptObject: object): Promise<object> {
    return await this.update('salesReceipt', salesReceiptObject);
  }

  /**
   * Updates TaxAgency entity in QuickBooks
   *
   * @param {Object} taxAgencyObject - taxAgency object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} taxAgency object response
   */
  async updateTaxAgency(taxAgencyObject: object): Promise<object> {
    return await this.update('taxAgency', taxAgencyObject);
  }

  /**
   * Updates TaxCode entity in QuickBooks
   *
   * @param {Object} taxCodeObject - taxCode object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} taxCode object response
   */
  async updateTaxCode(taxCodeObject: object): Promise<object> {
    return await this.update('taxCode', taxCodeObject);
  }

  /**
   * Updates TaxRate entity in QuickBooks
   *
   * @param {Object} taxRateObject - taxRate object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} taxRate object response
   */
  async updateTaxRate(taxRateObject: object): Promise<object> {
    return await this.update('taxRate', taxRateObject);
  }

  /**
   * Updates TaxService entity in QuickBooks
   *
   * @param {Object} taxServiceObject - taxService object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} taxService object response
   */
  async updateTaxService(taxServiceObject: object): Promise<object> {
    return await this.update('taxService', taxServiceObject);
  }

  /**
   * Updates Term entity in QuickBooks
   *
   * @param {Object} termObject - term object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} term object response
   */
  async updateTerm(termObject: object): Promise<object> {
    return await this.update('term', termObject);
  }

  /**
   * Updates TimeActivity entity in QuickBooks
   *
   * @param {Object} timeActivityObject - timeActivity object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} timeActivity object response
   */
  async updateTimeActivity(timeActivityObject: object): Promise<object> {
    return await this.update('timeActivity', timeActivityObject);
  }

  /**
   * Updates Transfer entity in QuickBooks
   *
   * @param {Object} transferObject - transfer object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} transfer object response
   */
  async updateTransfer(transferObject: object): Promise<object> {
    return await this.update('transfer', transferObject);
  }

  /**
   * Updates Vendor entity in QuickBooks
   *
   * @param {Object} vendorObject - vendor object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} vendor object response
   */
  async updateVendor(vendorObject: object): Promise<object> {
    return await this.update('vendor', vendorObject);
  }

  /**
   * Updates VendorCredit entity in QuickBooks
   *
   * @param {Object} vendorCreditObject - vendorCredit object to be updated in QuickBooks (Must include Id and SyncToken fields)
   * @return {Promise<Object>} vendorCredit object response
   */
  async updateVendorCredit(vendorCreditObject: object): Promise<object> {
    return await this.update('vendorCredit', vendorCreditObject);
  }
}
