import { ReportsQB } from "./Report.class";

export class ResponseQB extends ReportsQB {
  async getAccount(id: string | number): Promise<object> {
    return await this.read('account', id);
  }

  /**
   * Retrieve Attachable from QuickBooks
   *
   * @param {String} id - attachable's ID to be retrieved.
   * @return {Promise<Object>} attachable object response
   */
  async getAttachable(id: string | number): Promise<object> {
    return await this.read('attachable', id);
  }

  /**
   * Retrieve Bill from QuickBooks
   *
   * @param {String} id - bill's ID to be retrieved.
   * @return {Promise<Object>} bill object response
   */
  async getBill(id: string | number): Promise<object> {
    return await this.read('bill', id);
  }

  /**
   * Retrieve BillPayment from QuickBooks
   *
   * @param {String} id - billPayment's ID to be retrieved.
   * @return {Promise<Object>} billPayment object response
   */
  async getBillPayment(id: string | number): Promise<object> {
    return await this.read('billPayment', id);
  }

  /**
   * Retrieve Class from QuickBooks
   *
   * @param {String} id - class's ID to be retrieved.
   * @return {Promise<Object>} class object response
   */
  async getClass(id: string | number): Promise<object> {
    return await this.read('class', id);
  }

  /**
   * Retrieve CompanyInfo from QuickBooks
   *
   * @param {String} id - companyInfo's ID to be retrieved.
   * @return {Promise<Object>} companyInfo object response
   */
  async getCompanyInfo(id: string | number): Promise<object> {
    return await this.read('companyInfo', id);
  }

  /**
   * Retrieve CreditMemo from QuickBooks
   *
   * @param {String} id - creditMemo's ID to be retrieved.
   * @return {Promise<Object>} creditMemo object response
   */
  async getCreditMemo(id: string | number): Promise<object> {
    return await this.read('creditMemo', id);
  }

  /**
   * Retrieve Customer from QuickBooks
   *
   * @param {String} id - customer's ID to be retrieved.
   * @return {Promise<Object>} customer object response
   */
  async getCustomer(id: string | number): Promise<object> {
    return await this.read('customer', id);
  }

  /**
   * Retrieve Department from QuickBooks
   *
   * @param {String} id - department's ID to be retrieved.
   * @return {Promise<Object>} department object response
   */
  async getDepartment(id: string | number): Promise<object> {
    return await this.read('department', id);
  }

  /**
   * Retrieve Deposit from QuickBooks
   *
   * @param {String} id - deposit's ID to be retrieved.
   * @return {Promise<Object>} deposit object response
   */
  async getDeposit(id: string | number): Promise<object> {
    return await this.read('deposit', id);
  }

  /**
   * Retrieve Employee from QuickBooks
   *
   * @param {String} id - employee's ID to be retrieved.
   * @return {Promise<Object>} employee object response
   */
  async getEmployee(id: string | number): Promise<object> {
    return await this.read('employee', id);
  }

  /**
   * Retrieve Estimate from QuickBooks
   *
   * @param {String} id - estimate's ID to be retrieved.
   * @return {Promise<Object>} estimate object response
   */
  async getEstimate(id: string | number): Promise<object> {
    return await this.read('estimate', id);
  }

  /**
   * Retrieve ExchangeRate from QuickBooks
   *
   * @param {String} id - exchangeRate's ID to be retrieved.
   * @return {Promise<Object>} exchangeRate object response
   */
  async getExchangeRate(id: string | number): Promise<object> {
    return await this.read('exchangeRate', id);
  }

  /**
   * Retrieve Invoice from QuickBooks
   *
   * @param {String} id - invoice's ID to be retrieved.
   * @return {Promise<Object>} invoice object response
   */
  async getInvoice(id: string | number): Promise<object> {
    return await this.read('invoice', id);
  }

  /**
   * Retrieve Item from QuickBooks
   *
   * @param {String} id - item's ID to be retrieved.
   * @return {Promise<Object>} item object response
   */
  async getItem(id: string | number): Promise<object> {
    return await this.read('item', id);
  }

  /**
   * Retrieve JournalCode from QuickBooks
   *
   * @param {String} id - journalCode's ID to be retrieved.
   * @return {Promise<Object>} journalCode object response
   */
  async getJournalCode(id: string | number): Promise<object> {
    return await this.read('journalCode', id);
  }

  /**
   * Retrieve JournalEntry from QuickBooks
   *
   * @param {String} id - journalEntry's ID to be retrieved.
   * @return {Promise<Object>} journalEntry object response
   */
  async getJournalEntry(id: string | number): Promise<object> {
    return await this.read('journalEntry', id);
  }

  /**
   * Retrieve Payment from QuickBooks
   *
   * @param {String} id - payment's ID to be retrieved.
   * @return {Promise<Object>} payment object response
   */
  async getPayment(id: string | number): Promise<object> {
    return await this.read('payment', id);
  }

  /**
   * Retrieve PaymentMethod from QuickBooks
   *
   * @param {String} id - paymentMethod's ID to be retrieved.
   * @return {Promise<Object>} paymentMethod object response
   */
  async getPaymentMethod(id: string | number): Promise<object> {
    return await this.read('paymentMethod', id);
  }

  /**
   * Retrieve Preferences from QuickBooks
   *
   * @param {String} id - preferences's ID to be retrieved.
   * @return {Promise<Object>} preferences object response
   */
  async getPreferences(id: string | number): Promise<object> {
    return await this.read('preferences', id);
  }

  /**
   * Retrieve Purchase from QuickBooks
   *
   * @param {String} id - purchase's ID to be retrieved.
   * @return {Promise<Object>} purchase object response
   */
  async getPurchase(id: string | number): Promise<object> {
    return await this.read('purchase', id);
  }

  /**
   * Retrieve PurchaseOrder from QuickBooks
   *
   * @param {String} id - purchaseOrder's ID to be retrieved.
   * @return {Promise<Object>} purchaseOrder object response
   */
  async getPurchaseOrder(id: string | number): Promise<object> {
    return await this.read('purchaseOrder', id);
  }

  /**
   * Retrieve RefundReceipt from QuickBooks
   *
   * @param {String} id - refundReceipt's ID to be retrieved.
   * @return {Promise<Object>} refundReceipt object response
   */
  async getRefundReceipt(id: string | number): Promise<object> {
    return await this.read('refundReceipt', id);
  }

  /**
   * Retrieve Reports from QuickBooks
   *
   * @param {String} id - reports's ID to be retrieved.
   * @return {Promise<Object>} reports object response
   */
  async getReports(id: string | number): Promise<object> {
    return await this.read('reports', id);
  }

  /**
   * Retrieve SalesReceipt from QuickBooks
   *
   * @param {String} id - salesReceipt's ID to be retrieved.
   * @return {Promise<Object>} salesReceipt object response
   */
  async getSalesReceipt(id: string | number): Promise<object> {
    return await this.read('salesReceipt', id);
  }

  /**
   * Retrieve TaxAgency from QuickBooks
   *
   * @param {String} id - taxAgency's ID to be retrieved.
   * @return {Promise<Object>} taxAgency object response
   */
  async getTaxAgency(id: string | number): Promise<object> {
    return await this.read('taxAgency', id);
  }

  /**
   * Retrieve TaxCode from QuickBooks
   *
   * @param {String} id - taxCode's ID to be retrieved.
   * @return {Promise<Object>} taxCode object response
   */
  async getTaxCode(id: string | number): Promise<object> {
    return await this.read('taxCode', id);
  }

  /**
   * Retrieve TaxRate from QuickBooks
   *
   * @param {String} id - taxRate's ID to be retrieved.
   * @return {Promise<Object>} taxRate object response
   */
  async getTaxRate(id: string | number): Promise<object> {
    return await this.read('taxRate', id);
  }

  /**
   * Retrieve Term from QuickBooks
   *
   * @param {String} id - term's ID to be retrieved.
   * @return {Promise<Object>} term object response
   */
  async getTerm(id: string | number): Promise<object> {
    return await this.read('term', id);
  }

  /**
   * Retrieve TimeActivity from QuickBooks
   *
   * @param {String} id - timeActivity's ID to be retrieved.
   * @return {Promise<Object>} timeActivity object response
   */
  async getTimeActivity(id: string | number): Promise<object> {
    return await this.read('timeActivity', id);
  }

  /**
   * Retrieve Vendor from QuickBooks
   *
   * @param {String} id - vendor's ID to be retrieved.
   * @return {Promise<Object>} vendor object response
   */
  async getVendor(id: string | number): Promise<object> {
    return await this.read('vendor', id);
  }

  /**
   * Retrieve VendorCredit from QuickBooks
   *
   * @param {String} id - vendorCredit's ID to be retrieved.
   * @return {Promise<Object>} vendorCredit object response
   */
  async getVendorCredit(id: string | number): Promise<object> {
    return await this.read('vendorCredit', id);
  }
}
