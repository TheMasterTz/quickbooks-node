import { DeleteQB } from './Delete.class';

export class FindQB extends DeleteQB {
  /**
   * Find Account entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} account object response
   */
  async findAccounts(query: any): Promise<object> {
    return await this.query('Account', query);
  }

  /**
   * Find Attachable entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} attachable object response
   */
  async findAttachables(query: any): Promise<object> {
    return await this.query('Attachable', query);
  }

  /**
   * Find Bill entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} bill object response
   */
  async findBills(query: any): Promise<object> {
    return await this.query('Bill', query);
  }

  /**
   * Find BillPayment entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} billPayment object response
   */
  async findBillPayments(query: any): Promise<object> {
    return await this.query('BillPayment', query);
  }

  /**
   * Find Budget entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} budget object response
   */
  async findBudgets(query: any): Promise<object> {
    return await this.query('Budget', query);
  }

  /**
   * Find Class entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} class object response
   */
  async findClasses(query: any): Promise<object> {
    return await this.query('Class', query);
  }

  /**
   * Find CompanyInfo entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} companyInfo object response
   */
  async findCompanyInfos(query: any): Promise<object> {
    return await this.query('CompanyInfo', query);
  }

  /**
   * Find CreditMemo entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} creditMemo object response
   */
  async findCreditMemos(query: any): Promise<object> {
    return await this.query('CreditMemo', query);
  }

  /**
   * Find Customer entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} customer object response
   */
  async findCustomers(query: any): Promise<object> {
    return await this.query('Customer', query);
  }

  /**
   * Find Department entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} department object response
   */
  async findDepartments(query: any): Promise<object> {
    return await this.query('Department', query);
  }

  /**
   * Find Deposit entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} deposit object response
   */
  async findDeposits(query: any): Promise<object> {
    return await this.query('Deposit', query);
  }

  /**
   * Find Employee entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} employee object response
   */
  async findEmployees(query: any): Promise<object> {
    return await this.query('Employee', query);
  }

  /**
   * Find Estimate entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} estimate object response
   */
  async findEstimates(query: any): Promise<object> {
    return await this.query('Estimate', query);
  }

  /**
   * Find ExchangeRate entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} exchangeRate object response
   */
  async findExchangeRates(query: any): Promise<object> {
    return await this.query('ExchangeRate', query);
  }

  /**
   * Find Invoice entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} invoice object response
   */
  async findInvoices(query: any): Promise<object> {
    return await this.query('Invoice', query);
  }

  /**
   * Find Item entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} item object response
   */
  async findItems(query: any): Promise<object> {
    return await this.query('Item', query);
  }

  /**
   * Find JournalCode entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} journalCode object response
   */
  async findJournalCodes(query: any): Promise<object> {
    return await this.query('JournalCode', query);
  }

  /**
   * Find JournalEntry entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} journalEntry object response
   */
  async findJournalEntries(query: any): Promise<object> {
    return await this.query('JournalEntry', query);
  }

  /**
   * Find Payment entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} payment object response
   */
  async findPayments(query: any): Promise<object> {
    return await this.query('Payment', query);
  }

  /**
   * Find PaymentMethod entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} paymentMethod object response
   */
  async findPaymentMethods(query: any): Promise<object> {
    return await this.query('PaymentMethod', query);
  }

  /**
   * Find Preferences entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} preferences object response
   */
  async findPreferences(query: any): Promise<object> {
    return await this.query('Preferences', query);
  }

  /**
   * Find Purchase entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} purchase object response
   */
  async findPurchases(query: any): Promise<object> {
    return await this.query('Purchase', query);
  }

  /**
   * Find PurchaseOrder entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} purchaseOrder object response
   */
  async findPurchaseOrders(query: any): Promise<object> {
    return await this.query('PurchaseOrder', query);
  }

  /**
   * Find RefundReceipt entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} refundReceipt object response
   */
  async findRefundReceipts(query: any): Promise<object> {
    return await this.query('RefundReceipt', query);
  }

  /**
   * Find SalesReceipt entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} salesReceipt object response
   */
  async findSalesReceipts(query: any): Promise<object> {
    return await this.query('SalesReceipt', query);
  }

  /**
   * Find TaxAgency entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} taxAgency object response
   */
  async findTaxAgencies(query: any): Promise<object> {
    return await this.query('TaxAgency', query);
  }

  /**
   * Find TaxCode entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} taxCode object response
   */
  async findTaxCodes(query: any): Promise<object> {
    return await this.query('TaxCode', query);
  }

  /**
   * Find TaxRate entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} taxRate object response
   */
  async findTaxRates(query: any): Promise<object> {
    return await this.query('TaxRate', query);
  }

  /**
   * Find Term entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} term object response
   */
  async findTerms(query: any): Promise<object> {
    return await this.query('Term', query);
  }

  /**
   * Find TimeActivity entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} timeActivity object response
   */
  async findTimeActivities(query: any): Promise<object> {
    return await this.query('TimeActivity', query);
  }

  /**
   * Find Vendor entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} vendor object response
   */
  async findVendors(query: any): Promise<object> {
    return await this.query('Vendor', query);
  }

  /**
   * Find VendorCredit entities in QuickBooks, optionally sending parameters to be used as query condition / filter
   *
   * @param {Object=|Object[]=} query - object or array of object to be used as query condition / filter
   * @return {Promise<Object>} vendorCredit object response
   */
  async findVendorCredits(query: any): Promise<object> {
    return await this.query('VendorCredit', query);
  }
}
