import { CreateQB } from './Create.class';

export class DeleteQB extends CreateQB {
  /**
   * Remove Attachable entity from QuickBooks
   *
   * @param {Object|String} idOrEntity - attachable's ID or object to be removed from QuickBooks
   * @return {Promise<Object>} attachable object response
   */
  async deleteAttachable(idOrEntity: object | string | number): Promise<object> {
    return await this.delete('attachable', idOrEntity);
  }

  /**
   * Remove Bill entity from QuickBooks
   *
   * @param {Object|String} idOrEntity - bill's ID or object to be removed from QuickBooks
   * @return {Promise<Object>} bill object response
   */
  async deleteBill(idOrEntity: object | string | number | number): Promise<object> {
    return await this.delete('bill', idOrEntity);
  }

  /**
   * Remove BillPayment entity from QuickBooks
   *
   * @param {Object|String} idOrEntity - billPayment's ID or object to be removed from QuickBooks
   * @return {Promise<Object>} billPayment object response
   */
  async deleteBillPayment(idOrEntity: object | string | number): Promise<object> {
    return await this.delete('billPayment', idOrEntity);
  }

  /**
   * Remove CreditMemo entity from QuickBooks
   *
   * @param {Object|String} idOrEntity - creditMemo's ID or object to be removed from QuickBooks
   * @return {Promise<Object>} creditMemo object response
   */
  async deleteCreditMemo(idOrEntity: object | string | number): Promise<object> {
    return await this.delete('creditMemo', idOrEntity);
  }

  /**
   * Remove Deposit entity from QuickBooks
   *
   * @param {Object|String} idOrEntity - deposit's ID or object to be removed from QuickBooks
   * @return {Promise<Object>} deposit object response
   */
  async deleteDeposit(idOrEntity: object | string | number): Promise<object> {
    return await this.delete('deposit', idOrEntity);
  }

  /**
   * Remove Estimate entity from QuickBooks
   *
   * @param {Object|String} idOrEntity - estimate's ID or object to be removed from QuickBooks
   * @return {Promise<Object>} estimate object response
   */
  async deleteEstimate(idOrEntity: object | string | number): Promise<object> {
    return await this.delete('estimate', idOrEntity);
  }

  /**
   * Remove Invoice entity from QuickBooks
   *
   * @param {Object|String} idOrEntity - invoice's ID or object to be removed from QuickBooks
   * @return {Promise<Object>} invoice object response
   */
  async deleteInvoice(idOrEntity: object | string | number): Promise<object> {
    return await this.delete('invoice', idOrEntity);
  }

  /**
   * Remove JournalCode entity from QuickBooks
   *
   * @param {Object|String} idOrEntity - journalCode's ID or object to be removed from QuickBooks
   * @return {Promise<Object>} journalCode object response
   */
  async deleteJournalCode(idOrEntity: object | string | number): Promise<object> {
    return await this.delete('journalCode', idOrEntity);
  }

  /**
   * Remove JournalEntry entity from QuickBooks
   *
   * @param {Object|String} idOrEntity - journalEntry's ID or object to be removed from QuickBooks
   * @return {Promise<Object>} journalEntry object response
   */
  async deleteJournalEntry(idOrEntity: object | string | number): Promise<object> {
    return await this.delete('journalEntry', idOrEntity);
  }

  /**
   * Remove Payment entity from QuickBooks
   *
   * @param {Object|String} idOrEntity - payment's ID or object to be removed from QuickBooks
   * @return {Promise<Object>} payment object response
   */
  async deletePayment(idOrEntity: object | string | number): Promise<object> {
    return await this.delete('payment', idOrEntity);
  }

  /**
   * Remove Purchase entity from QuickBooks
   *
   * @param {Object|String} idOrEntity - purchase's ID or object to be removed from QuickBooks
   * @return {Promise<Object>} purchase object response
   */
  async deletePurchase(idOrEntity: object | string | number): Promise<object> {
    return await this.delete('purchase', idOrEntity);
  }

  /**
   * Remove PurchaseOrder entity from QuickBooks
   *
   * @param {Object|String} idOrEntity - purchaseOrder's ID or object to be removed from QuickBooks
   * @return {Promise<Object>} purchaseOrder object response
   */
  async deletePurchaseOrder(idOrEntity: object | string | number): Promise<object> {
    return await this.delete('purchaseOrder', idOrEntity);
  }

  /**
   * Remove RefundReceipt entity from QuickBooks
   *
   * @param {Object|String} idOrEntity - refundReceipt's ID or object to be removed from QuickBooks
   * @return {Promise<Object>} refundReceipt object response
   */
  async deleteRefundReceipt(idOrEntity: object | string | number): Promise<object> {
    return await this.delete('refundReceipt', idOrEntity);
  }

  /**
   * Remove SalesReceipt entity from QuickBooks
   *
   * @param {Object|String} idOrEntity - salesReceipt's ID or object to be removed from QuickBooks
   * @return {Promise<Object>} salesReceipt object response
   */
  async deleteSalesReceipt(idOrEntity: object | string | number): Promise<object> {
    return await this.delete('salesReceipt', idOrEntity);
  }

  /**
   * Remove TimeActivity entity from QuickBooks
   *
   * @param {Object|String} idOrEntity - timeActivity's ID or object to be removed from QuickBooks
   * @return {Promise<Object>} timeActivity object response
   */
  async deleteTimeActivity(idOrEntity: object | string | number): Promise<object> {
    return await this.delete('timeActivity', idOrEntity);
  }

  /**
   * Remove Transfer entity from QuickBooks
   *
   * @param {Object|String} idOrEntity - transfer's ID or object to be removed from QuickBooks
   * @return {Promise<Object>} transfer object response
   */
  async deleteTransfer(idOrEntity: object | string | number): Promise<object> {
    return await this.delete('transfer', idOrEntity);
  }

  /**
   * Remove VendorCredit entity from QuickBooks
   *
   * @param {Object|String} idOrEntity - vendorCredit's ID or object to be removed from QuickBooks
   * @return {Promise<Object>} vendorCredit object response
   */
  async deleteVendorCredit(idOrEntity: object | string | number): Promise<object> {
    return await this.delete('vendorCredit', idOrEntity);
  }
}
