import { FindQB } from './Find.class';

export class ReportsQB extends FindQB {
  /**
   * Retrieve AccountList report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} AccountList object response
   */
  async reportAccountList(params: object | undefined): Promise<object> {
    return await this.report('AccountList', params);
  }

  /**
   * Retrieve AgedPayableDetail report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} AgedPayableDetail object response
   */
  async reportAgedPayableDetail(params: object | undefined): Promise<object> {
    return await this.report('AgedPayableDetail', params);
  }

  /**
   * Retrieve AgedPayables report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} AgedPayables object response
   */
  async reportAgedPayables(params: object | undefined): Promise<object> {
    return await this.report('AgedPayables', params);
  }

  /**
   * Retrieve AgedReceivableDetail report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} AgedReceivableDetail object response
   */
  async reportAgedReceivableDetail(
    params: object | undefined
  ): Promise<object> {
    return await this.report('AgedReceivableDetail', params);
  }

  /**
   * Retrieve AgedReceivables report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} AgedReceivables object response
   */
  async reportAgedReceivables(params: object | undefined): Promise<object> {
    return await this.report('AgedReceivables', params);
  }

  /**
   * Retrieve BalanceSheet report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} BalanceSheet object response
   */
  async reportBalanceSheet(params: object | undefined): Promise<object> {
    return await this.report('BalanceSheet', params);
  }

  /**
   * Retrieve CashFlow report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} CashFlow object response
   */
  async reportCashFlow(params: object | undefined): Promise<object> {
    return await this.report('CashFlow', params);
  }

  /**
   * Retrieve CustomerBalance report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} CustomerBalance object response
   */
  async reportCustomerBalance(params: object | undefined): Promise<object> {
    return await this.report('CustomerBalance', params);
  }

  /**
   * Retrieve CustomerBalanceDetail report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} CustomerBalanceDetail object response
   */
  async reportCustomerBalanceDetail(
    params: object | undefined
  ): Promise<object> {
    return await this.report('CustomerBalanceDetail', params);
  }

  /**
   * Retrieve CustomerIncome report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} CustomerIncome object response
   */
  async reportCustomerIncome(params: object | undefined): Promise<object> {
    return await this.report('CustomerIncome', params);
  }

  /**
   * Retrieve FECReport report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} FECReport object response
   */
  async reportFECReport(params: object | undefined): Promise<object> {
    return await this.report('FECReport', params);
  }

  /**
   * Retrieve GeneralLedger report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} GeneralLedger object response
   */
  async reportGeneralLedger(params: object | undefined): Promise<object> {
    return await this.report('GeneralLedger', params);
  }

  /**
   * Retrieve GeneralLedgerFR report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} GeneralLedgerFR object response
   */
  async reportGeneralLedgerFR(params: object | undefined): Promise<object> {
    return await this.report('GeneralLedgerFR', params);
  }

  /**
   * Retrieve InventoryValuationSummary report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} InventoryValuationSummary object response
   */
  async reportInventoryValuationSummary(
    params: object | undefined
  ): Promise<object> {
    return await this.report('InventoryValuationSummary', params);
  }

  /**
   * Retrieve JournalReport report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} JournalReport object response
   */
  async reportJournalReport(params: object | undefined): Promise<object> {
    return await this.report('JournalReport', params);
  }

  /**
   * Retrieve ProfitAndLoss report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} ProfitAndLoss object response
   */
  async reportProfitAndLoss(params: object | undefined): Promise<object> {
    return await this.report('ProfitAndLoss', params);
  }

  /**
   * Retrieve ProfitAndLossDetail report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} ProfitAndLossDetail object response
   */
  async reportProfitAndLossDetail(params: object | undefined): Promise<object> {
    return await this.report('ProfitAndLossDetail', params);
  }

  /**
   * Retrieve ClassSales report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} ClassSales object response
   */
  async reportClassSales(params: object | undefined): Promise<object> {
    return await this.report('ClassSales', params);
  }

  /**
   * Retrieve CustomerSales report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} CustomerSales object response
   */
  async reportCustomerSales(params: object | undefined): Promise<object> {
    return await this.report('CustomerSales', params);
  }

  /**
   * Retrieve DepartmentSales report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} DepartmentSales object response
   */
  async reportDepartmentSales(params: object | undefined): Promise<object> {
    return await this.report('DepartmentSales', params);
  }

  /**
   * Retrieve ItemSales report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} ItemSales object response
   */
  async reportItemSales(params: object | undefined): Promise<object> {
    return await this.report('ItemSales', params);
  }

  /**
   * Retrieve TaxSummary report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} TaxSummary object response
   */
  async reportTaxSummary(params: object | undefined): Promise<object> {
    return await this.report('TaxSummary', params);
  }

  /**
   * Retrieve TransactionList report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} TransactionList object response
   */
  async reportTransactionList(params: object | undefined): Promise<object> {
    return await this.report('TransactionList', params);
  }

  /**
   * Retrieve TransactionListByCustomer report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} TransactionListByCustomer object response
   */
  async reportTransactionListByCustomer(
    params: object | undefined
  ): Promise<object> {
    return await this.report('TransactionListByCustomer', params);
  }

  /**
   * Retrieve TransactionListByVendor report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} TransactionListByVendor object response
   */
  async reportTransactionListByVendor(
    params: object | undefined
  ): Promise<object> {
    return await this.report('TransactionListByVendor', params);
  }

  /**
   * Retrieve TransactionListWithSplits report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} TransactionListWithSplits object response
   */
  async reportTransactionListWithSplits(
    params: object | undefined
  ): Promise<object> {
    return await this.report('TransactionListWithSplits', params);
  }

  /**
   * Retrieve TrialBalance report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} TrialBalance object response
   */
  async reportTrialBalance(params: object | undefined): Promise<object> {
    return await this.report('TrialBalance', params);
  }

  /**
   * Retrieve VendorBalance report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} VendorBalance object response
   */
  async reportVendorBalance(params: object | undefined): Promise<object> {
    return await this.report('VendorBalance', params);
  }

  /**
   * Retrieve VendorBalanceDetail report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} VendorBalanceDetail object response
   */
  async reportVendorBalanceDetail(params: object | undefined): Promise<object> {
    return await this.report('VendorBalanceDetail', params);
  }

  /**
   * Retrieve VendorExpenses report from QuickBooks
   *
   * @param {Object=} params - parameter object to be send as condition / filter
   * @return {Promise<Object>} VendorExpenses object response
   */
  async reportVendorExpenses(params: object | undefined): Promise<object> {
    return await this.report('VendorExpenses', params);
  }
}
