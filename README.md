# node-quickbooks

nodejs client for Intuit's [QuickBooks API]

## Installation

`npm i quickbookslib-ts`

## Documentation

```typescript
import Quickbooks from 'quickbookslib-ts';

const ConnetQB = new QuickBooks({
  accessToken,
  realmId,
  refreshToken,
});

async function createAttachable() {
  try {
    const data = await ConnetQB.createAttachable({ Note: 'My File' });
    return console.log(JSON.stringify(data));
  } catch (err: any) {
    console.log(err);
  }
}
createAttachable();

async function getBillPayment() {
  try {
    const data = await ConnetQB.getBillPayment(42);
    return console.log(JSON.stringify(data));
  } catch (err: any) {
    console.log(err);
  }
}
getBillPayment();

async function updateCustomer() {
  try {
    const data = await ConnetQB.updateCustomer({
      Id: '42',
      SyncToken: '1',
      sparse: true,
      PrimaryEmailAddr: { Address: 'customer@example.com' },
    });

    return console.log(JSON.stringify(data));
  } catch (err: any) {
    console.log(err);
  }
}
updateCustomer();

async function deleteAttachable() {
  try {
    const data = await ConnetQB.deleteAttachable(42);

    return console.log(JSON.stringify(data));
  } catch (err: any) {
    console.log(err);
  }
}
deleteAttachable();

async function findAccounts() {
  try {
    const data = await ConnetQB.findAccounts({
      AccountType: 'Expense',
      desc: 'MetaData.LastUpdatedTime',
      limit: 5,
      offset: 5,
    });

    return console.log(JSON.stringify(data));
  } catch (err: any) {
    console.log(err);
  }
}
findAccounts();

async function reportBalanceSheet() {
  try {
    const data = await ConnetQB.reportBalanceSheet({ department: '1,4,7' });

    return console.log(JSON.stringify(data));
  } catch (err: any) {
    console.log(err);
  }
}
reportBalanceSheet();
```

#### Query

###### Filters

All query functions take an optional first argument object which will be converted to a
where clause by means of the keys and values of the object used as column names and parameter values of the where clause. For example, in order to issue a query with a simple where clause such as, `select * from attachable where Note = 'My sample note field'`, the following code would be needed:

```javascript
const data = await ConnetQB.findAttachables({
  Note: 'My sample note field',
});
console.log(JSON.stringify(data));
```

Alternatively, the object can be an array of objects, each specifying a `field`, `value` and `operator` (optional) keys. This allows you to build a more complex query using operators such as `=`, `IN`, `<`, `>`, `<=`, `>=`, or `LIKE`.

```javascript
const data = await ConnetQB.findTimeActivities([
  { field: 'TxnDate', value: '2014-12-01', operator: '>' },
  { field: 'TxnDate', value: '2014-12-03', operator: '<' },
  { field: 'limit', value: 5 },
]);
console.log(JSON.stringify(data));
```

###### Sorting

Basic ordering is achieved via the optional first argument object as well. Include `asc` or `desc` keys in the object whose values are the columns you wish to sort on. For example:

```javascript
const data = await ConnetQB.findAttachables({
  desc: 'MetaData.LastUpdatedTime'
})
const data = await ConnetQB.
```

###### Pagination

Pagination is achieved via the optional first argument object as well. Include `limit` and/or `offset` keys in the object whose values are the number of rows you wish to limit the result set to or from respectively. For example:

```javascript
const data = await ConnetQB.findAttachables({
  limit: 10,
  offset: 10,
});
console.log(JSON.stringify(data));
```

The default (and max) limit is 1000 records returned in a single request. Adding a boolean `fetchAll` parameter
will return all available records, transparently issuing as many requests as necessary to fetch them. So
in the first example below, if your Quickbooks business contains 5,000 customers, 5 http requests will be issued behind
the scenes and finally your callback will be invoked with an array of those 5,000 customers passed to it.

```javascript
const test1 = await ConnetQB.findCustomers({
  fetchAll: true,
});
console.log(JSON.stringify(test1));

const test2 = await ConnetQB.findCustomers([
  { field: 'fetchAll', value: true },
  { field: 'FamilyName', value: 'S%', operator: 'LIKE' },
]);
console.log(JSON.stringify(test2));
```

###### Counts

Row counts rather than full result sets can be obtained by passing the `count` key in the optional first argument object with a boolean true value. For example:

```javascript
const data = await ConnetQB.findAttachables({
  count: true,
});
console.log(JSON.stringify(data));
```

<!-- ## Example App

The `example` directory contains a barebones Express application that demonstrates the OAuth workflow.

### Setup

First navigate to the `example` directory and install the required dependencies from NPM

    npm install

You will need to create an Intuit Developer account at <https://developer.intuit.com> and add your app's OAuth Consumer Key and Secret to `app.ts`. Pay attention to which APIs (Payments, QuickBooks) you select during the application creation process, you will have to update `example/views/intuit.ejs` if you did not select both.

### Running

Start the app

    tsc; node dist/index.js"

Browse to <http://localhost:3000/start> and you will see a page containing only the Intuit Developer Javascript-rendered button. Clicking on this kicks off the OAuth exchange.

The Intuit Developer Javascript code calls back into the node application, which needs to invoke the OAuth Request Token URL at <https://oauth.intuit.com/oauth/v1/get_request_token> via a server-side http POST method. Note how the response from the http POST is parsed and the browser is redirected to the App Center URL at <https://appcenter.intuit.com/Connect/Begin?oauth_token=> with the `oauth_token` passed as a URL parameter. Note also how the `oauth_token_secret` needs to somehow be maintained across http requests, as it needs to be passed in the second server-side http POST to the Access Token URL at <https://oauth.intuit.com/oauth/v1/get_access_token>. This final step is invoked once the user has authenticated on Intuit's site and authorized the application, and then the user is redirected back to the node application at the callback URL specified as a parameter in the Request Token remote call, in the example app's case, <http://localhost:3000/callback>.

### Configuration

The Intuit Developer Javascript code contained in `intuit.ejs` is configured with the `grantUrl` option set to "http://localhost:3000/requestToken". You will want to change this to an appropriate URL for your application, but you will need to write similar functionality to that contained in the '/requestToken' route configured in `app.ts`, also taking care to configure your `consumerKey` and `consumerSecret` on lines 27-28 in app.ts. -->

## Public Api

QuickBooks(consumerKey, consumerSecret, oauth_token, oauth_token_secret, realmId, debug, minorVer, oAuthVer, refresh_token)

**Arguments**

- `consumerKey` - The application's consumer key
- `consumerSecret` - The application's consumer secret
- `oauth_token` - The user's generated token
- `oauth_token_secret` - The user's generated secret. Set this to false for oAuth 2.
- `realmId` - The company ID
- `useSandbox` - boolean flag to indicate whether to use Sandbox (i.e. for testing)
- `debug` - boolean flag to log http requests, headers, and response bodies to the console
- `minorVer` - Minor version for Intuit's API. Use null if you do not want to specify a version, to use the latest
- `oAuthVer` - Use string '2.0' for oAuth 2
- `refresh_token` - The user's generated refresh token. This is the code query parameter in the oAuth 2.0 callback

#### Create

- [`createAccount`](#createaccountobject)
- [`createAttachable`](#createattachableobject)
- [`createBill`](#createbillobject)
- [`createBillPayment`](#createbillpaymentobject)
- [`createClass`](#createclassobject)
- [`createCreditMemo`](#createcreditmemoobject)
- [`createCustomer`](#createcustomerobject)
- [`createDepartment`](#createdepartmentobject)
- [`createDeposit`](#createdepositobject)
- [`createEmployee`](#createemployeeobject)
- [`createEstimate`](#createestimateobject)
- [`createInvoice`](#createinvoiceobject)
- [`createItem`](#createitemobject)
- [`createJournalCode`](#createjournalcodeobject)
- [`createJournalEntry`](#createjournalentryobject)
- [`createPayment`](#createpaymentobject)
- [`createPaymentMethod`](#createpaymentmethodobject)
- [`createPurchase`](#createpurchaseobject)
- [`createPurchaseOrder`](#createpurchaseorderobject)
- [`createRefundReceipt`](#createrefundreceiptobject)
- [`createSalesReceipt`](#createsalesreceiptobject)
- [`createTaxAgency`](#createtaxagencyobject)
- [`createTaxService`](#createtaxserviceobject)
- [`createTerm`](#createtermobject)
- [`createTimeActivity`](#createtimeactivityobject)
- [`createTransfer`](#createtransferobject)
- [`createVendor`](#createvendorobject)
- [`createVendorCredit`](#createvendorcreditobject)

#### Read

- [`getAccount`](#getaccountid)
- [`getAttachable`](#getattachableid)
- [`getBill`](#getbillid)
- [`getBillPayment`](#getbillpaymentid)
- [`getClass`](#getclassid)
- [`getCompanyInfo`](#getcompanyinfoid)
- [`getCreditMemo`](#getcreditmemoid)
- [`getCustomer`](#getcustomerid)
- [`getDepartment`](#getdepartmentid)
- [`getDeposit`](#getdepositid)
- [`getEmployee`](#getemployeeid)
- [`getEstimate`](#getestimateid)
- [`getExchangeRate`](#getexchangerateoptions)
- [`getInvoice`](#getinvoiceid)
- [`getItem`](#getitemid)
- [`getJournalCode`](#getjournalcodeid)
- [`getJournalEntry`](#getjournalentryid)
- [`getPayment`](#getpaymentid)
- [`getPaymentMethod`](#getpaymentmethodid)
- [`getPreferences`](#getpreferencesid)
- [`getPurchase`](#getpurchaseid)
- [`getPurchaseOrder`](#getpurchaseorderid)
- [`getRefundReceipt`](#getrefundreceiptid)
- [`getReports`](#getreportsid)
- [`getSalesReceipt`](#getsalesreceiptid)
- [`getTaxAgency`](#gettaxagencyid)
- [`getTaxCode`](#gettaxcodeid)
- [`getTaxRate`](#gettaxrateid)
- [`getTerm`](#gettermid)
- [`getTimeActivity`](#gettimeactivityid)
- [`getVendor`](#getvendorid)
- [`getVendorCredit`](#getvendorcreditid)

#### Update

- [`updateAccount`](#updateaccountobject)
- [`updateAttachable`](#updateattachableobject)
- [`updateBill`](#updatebillobject)
- [`updateBillPayment`](#updatebillpaymentobject)
- [`updateClass`](#updateclassobject)
- [`updateCompanyInfo`](#updatecompanyinfoobject)
- [`updateCreditMemo`](#updatecreditmemoobject)
- [`updateCustomer`](#updatecustomerobject)
- [`updateDepartment`](#updatedepartmentobject)
- [`updateDeposit`](#updatedepositobject)
- [`updateEmployee`](#updateemployeeobject)
- [`updateEstimate`](#updateestimateobject)
- [`updateInvoice`](#updateinvoiceobject)
- [`updateItem`](#updateitemobject)
- [`updateJournalCode`](#updatejournalcodeobject)
- [`updateJournalEntry`](#updatejournalentryobject)
- [`updatePayment`](#updatepaymentobject)
- [`updatePaymentMethod`](#updatepaymentmethodobject)
- [`updatePreferences`](#updatepreferencesobject)
- [`updatePurchase`](#updatepurchaseobject)
- [`updatePurchaseOrder`](#updatepurchaseorderobject)
- [`updateRefundReceipt`](#updaterefundreceiptobject)
- [`updateSalesReceipt`](#updatesalesreceiptobject)
- [`updateTaxAgency`](#updatetaxagencyobject)
- [`updateTaxCode`](#updatetaxcodeobject)
- [`updateTaxRate`](#updatetaxrateobject)
- [`updateTerm`](#updatetermobject)
- [`updateTimeActivity`](#updatetimeactivityobject)
- [`updateTransfer`](#updatetransferobject)
- [`updateVendor`](#updatevendorobject)
- [`updateVendorCredit`](#updatevendorcreditobject)
- [`updateExchangeRate`](#updateexchangerateobject)

#### Delete

- [`deleteAttachable`](#deleteattachableidorentity)
- [`deleteBill`](#deletebillidorentity)
- [`deleteBillPayment`](#deletebillpaymentidorentity)
- [`deleteCreditMemo`](#deletecreditmemoidorentity)
- [`deleteDeposit`](#deletedepositidorentity)
- [`deleteEstimate`](#deleteestimateidorentity)
- [`deleteInvoice`](#deleteinvoiceidorentity)
- [`deleteJournalCode`](#deletejournalcodeidorentity)
- [`deleteJournalEntry`](#deletejournalentryidorentity)
- [`deletePayment`](#deletepaymentidorentity)
- [`deletePurchase`](#deletepurchaseidorentity)
- [`deletePurchaseOrder`](#deletepurchaseorderidorentity)
- [`deleteRefundReceipt`](#deleterefundreceiptidorentity)
- [`deleteSalesReceipt`](#deletesalesreceiptidorentity)
- [`deleteTimeActivity`](#deletetimeactivityidorentity)
- [`deleteTransfer`](#deletetransferidorentity)
- [`deleteVendorCredit`](#deletevendorcreditidorentity)

#### Query

- [`findAccounts`](#findaccountscriteria)
- [`findAttachables`](#findattachablescriteria)
- [`findBills`](#findbillscriteria)
- [`findBillPayments`](#findbillpaymentscriteria)
- [`findBudgets`](#findbudgetscriteria)
- [`findClasses`](#findclassescriteria)
- [`findCompanyInfos`](#findcompanyinfoscriteria)
- [`findCreditMemos`](#findcreditmemoscriteria)
- [`findCustomers`](#findcustomerscriteria)
- [`findDepartments`](#finddepartmentscriteria)
- [`findDeposits`](#finddepositscriteria)
- [`findEmployees`](#findemployeescriteria)
- [`findEstimates`](#findestimatescriteria)
- [`findInvoices`](#findinvoicescriteria)
- [`findItems`](#finditemscriteria)
- [`findJournalCodes`](#findjournalcodescriteria)
- [`findJournalEntries`](#findjournalentriescriteria)
- [`findPayments`](#findpaymentscriteria)
- [`findPaymentMethods`](#findpaymentmethodscriteria)
- [`findPreferenceses`](#findpreferencesescriteria)
- [`findPurchases`](#findpurchasescriteria)
- [`findPurchaseOrders`](#findpurchaseorderscriteria)
- [`findRefundReceipts`](#findrefundreceiptscriteria)
- [`findSalesReceipts`](#findsalesreceiptscriteria)
- [`findTaxAgencies`](#findtaxagenciescriteria)
- [`findTaxCodes`](#findtaxcodescriteria)
- [`findTaxRates`](#findtaxratescriteria)
- [`findTerms`](#findtermscriteria)
- [`findTimeActivities`](#findtimeactivitiescriteria)
- [`findVendors`](#findvendorscriteria)
- [`findVendorCredits`](#findvendorcreditscriteria)
- [`findExchangeRates`](#findexchangeratescriteria)

#### Reports

- [`reportBalanceSheet`](#reportbalancesheetoptions)
- [`reportProfitAndLoss`](#reportprofitandlossoptions)
- [`reportProfitAndLossDetail`](#reportprofitandlossdetailoptions)
- [`reportTrialBalance`](#reporttrialbalanceoptions)
- [`reportCashFlow`](#reportcashflowoptions)
- [`reportInventoryValuationSummary`](#reportinventoryvaluationsummaryoptions)
- [`reportCustomerSales`](#reportcustomersalesoptions)
- [`reportItemSales`](#reportitemsalesoptions)
- [`reportCustomerIncome`](#reportcustomerincomeoptions)
- [`reportCustomerBalance`](#reportcustomerbalanceoptions)
- [`reportCustomerBalanceDetail`](#reportcustomerbalancedetailoptions)
- [`reportAgedReceivables`](#reportagedreceivablesoptions)
- [`reportAgedReceivableDetail`](#reportagedreceivabledetailoptions)
- [`reportVendorBalance`](#reportvendorbalanceoptions)
- [`reportVendorBalanceDetail`](#reportvendorbalancedetailoptions)
- [`reportAgedPayables`](#reportagedpayablesoptions)
- [`reportAgedPayableDetail`](#reportagedpayabledetailoptions)
- [`reportVendorExpenses`](#reportvendorexpensesoptions)
- [`reportTransactionList`](#reporttransactionlistoptions)
- [`reportGeneralLedgerDetail`](#reportgeneralledgerdetailoptions)
- [`reportDepartmentSales`](#reportdepartmentsalesoptions)
- [`reportClassSales`](#reportclasssalesoptions)

#### SalesReceipt and Invoice PDFs

- [`getInvoicePdf`](#getinvoicepdfid)
- [`getCreditMemoPdf`](#getinvoicepdfid)
- [`getSalesReceiptPdf`](#getsalesreceiptpdfid)
- [`sendInvoicePdf`](#sendinvoicepdfid-sendto)
- [`sendCreditMemoPdf`](#sendcreditmemopdfid-sendto)
- [`sendEstimatePdf`](#sendestimatepdfid-sendto)
- [`sendSalesReceiptPdf`](#sendsalesreceiptpdfid-sendto)

### Purchase Order Email

- [`sendPurchaseOrder`](#sendpurchaseorderid-sendto)

#### Miscellaneous

- [`batch`](#batchitems)
- [`changeDataCapture`](#changedatacaptureentities-since)

#### createAccount(object)

Creates the Account in QuickBooks

**Arguments**

- `object` - The unsaved account, to be persisted in QuickBooks

#### createAttachable(object)

Creates the Attachable in QuickBooks

**Arguments**

- `object` - The unsaved attachable, to be persisted in QuickBooks

#### createBill(object)

Creates the Bill in QuickBooks

**Arguments**

- `object` - The unsaved bill, to be persisted in QuickBooks

#### createBillPayment(object)

Creates the BillPayment in QuickBooks

**Arguments**

- `object` - The unsaved billPayment, to be persisted in QuickBooks

#### createClass(object)

Creates the Class in QuickBooks

**Arguments**

- `object` - The unsaved class, to be persisted in QuickBooks

#### createCreditMemo(object)

Creates the CreditMemo in QuickBooks

**Arguments**

- `object` - The unsaved creditMemo, to be persisted in QuickBooks

#### createCustomer(object)

Creates the Customer in QuickBooks

**Arguments**

- `object` - The unsaved customer, to be persisted in QuickBooks

#### createDepartment(object)

Creates the Department in QuickBooks

**Arguments**

- `object` - The unsaved department, to be persisted in QuickBooks

#### createDeposit(object)

Creates the Deposit in QuickBooks

**Arguments**

- `object` - The unsaved deposit, to be persisted in QuickBooks

#### createEmployee(object)

Creates the Employee in QuickBooks

**Arguments**

- `object` - The unsaved employee, to be persisted in QuickBooks

#### createEstimate(object)

Creates the Estimate in QuickBooks

**Arguments**

- `object` - The unsaved estimate, to be persisted in QuickBooks

#### createInvoice(object)

Creates the Invoice in QuickBooks

**Arguments**

- `object` - The unsaved invoice, to be persisted in QuickBooks

#### createItem(object)

Creates the Item in QuickBooks

**Arguments**

- `object` - The unsaved item, to be persisted in QuickBooks

#### createJournalCode(object)

Creates the JournalCode in QuickBooks

**Arguments**

- `object` - The unsaved journalCode, to be persisted in QuickBooks

#### createJournalEntry(object)

Creates the JournalEntry in QuickBooks

**Arguments**

- `object` - The unsaved journalEntry, to be persisted in QuickBooks

#### createPayment(object)

Creates the Payment in QuickBooks

**Arguments**

- `object` - The unsaved payment, to be persisted in QuickBooks

#### createPaymentMethod(object)

Creates the PaymentMethod in QuickBooks

**Arguments**

- `object` - The unsaved paymentMethod, to be persisted in QuickBooks

#### createPurchase(object)

Creates the Purchase in QuickBooks

**Arguments**

- `object` - The unsaved purchase, to be persisted in QuickBooks

#### createPurchaseOrder(object)

Creates the PurchaseOrder in QuickBooks

**Arguments**

- `object` - The unsaved purchaseOrder, to be persisted in QuickBooks

#### createRefundReceipt(object)

Creates the RefundReceipt in QuickBooks

**Arguments**

- `object` - The unsaved refundReceipt, to be persisted in QuickBooks

#### createSalesReceipt(object)

Creates the SalesReceipt in QuickBooks

**Arguments**

- `object` - The unsaved salesReceipt, to be persisted in QuickBooks

#### createTaxAgency(object)

Creates the TaxAgency in QuickBooks

**Arguments**

- `object` - The unsaved taxAgency, to be persisted in QuickBooks

#### createTaxService(object)

Creates the TaxService in QuickBooks

**Arguments**

- `object` - The unsaved taxService, to be persisted in QuickBooks

#### createTerm(object)

Creates the Term in QuickBooks

**Arguments**

- `object` - The unsaved term, to be persisted in QuickBooks

#### createTimeActivity(object)

Creates the TimeActivity in QuickBooks

**Arguments**

- `object` - The unsaved timeActivity, to be persisted in QuickBooks

#### createTransfer(object)

Creates the Transfer in QuickBooks

**Arguments**

- `object` - The unsaved transfer, to be persisted in QuickBooks

#### createVendor(object)

Creates the Vendor in QuickBooks

**Arguments**

- `object` - The unsaved vendor, to be persisted in QuickBooks

#### createVendorCredit(object)

Creates the VendorCredit in QuickBooks

**Arguments**

- `object` - The unsaved vendorCredit, to be persisted in QuickBooks

#### getAccount(id)

Retrieves the Account from QuickBooks

**Arguments**

- `id` - The Id of persistent Account

#### getAttachable(id)

Retrieves the Attachable from QuickBooks

**Arguments**

- `id` - The Id of persistent Attachable

#### getBill(id)

Retrieves the Bill from QuickBooks

**Arguments**

- `id` - The Id of persistent Bill

#### getBillPayment(id)

Retrieves the BillPayment from QuickBooks

**Arguments**

- `id` - The Id of persistent BillPayment

#### getClass(id)

Retrieves the Class from QuickBooks

**Arguments**

- `id` - The Id of persistent Class

#### getCompanyInfo(id)

Retrieves the CompanyInfo from QuickBooks

**Arguments**

- `id` - The Id of persistent CompanyInfo

#### getCreditMemo(id)

Retrieves the CreditMemo from QuickBooks

**Arguments**

- `id` - The Id of persistent CreditMemo

#### getCustomer(id)

Retrieves the Customer from QuickBooks

**Arguments**

- `id` - The Id of persistent Customer

#### getDepartment(id)

Retrieves the Department from QuickBooks

**Arguments**

- `id` - The Id of persistent Department

#### getDeposit(id)

Retrieves the Deposit from QuickBooks

**Arguments**

- `id` - The Id of persistent Deposit

#### getEmployee(id)

Retrieves the Employee from QuickBooks

**Arguments**

- `id` - The Id of persistent Employee

#### getEstimate(id)

Retrieves the Estimate from QuickBooks

**Arguments**

- `id` - The Id of persistent Estimate

#### getExchangeRate(options)

Retrieves an ExchangeRate from QuickBooks

**Arguments**

- `options` - An object with options including the required `sourcecurrencycode` parameter and optional `asofdate` parameter.

#### getInvoice(id)

Retrieves the Invoice from QuickBooks

**Arguments**

- `id` - The Id of persistent Invoice

#### getItem(id)

Retrieves the Item from QuickBooks

**Arguments**

- `id` - The Id of persistent Item

#### getJournalCode(id)

Retrieves the JournalCode from QuickBooks

**Arguments**

- `id` - The Id of persistent JournalCode

#### getJournalEntry(id)

Retrieves the JournalEntry from QuickBooks

**Arguments**

- `id` - The Id of persistent JournalEntry

#### getPayment(id)

Retrieves the Payment from QuickBooks

**Arguments**

- `id` - The Id of persistent Payment

#### getPaymentMethod(id)

Retrieves the PaymentMethod from QuickBooks

**Arguments**

- `id` - The Id of persistent PaymentMethod

#### getPreference)

Retrieves the Preferences from QuickBooks

**Arguments**

 the authorised realm

#### getPurchase(id)

Retrieves the Purchase from QuickBooks

**Arguments**

- `id` - The Id of persistent Purchase

#### getPurchaseOrder(id)

Retrieves the PurchaseOrder from QuickBooks

**Arguments**

- `id` - The Id of persistent PurchaseOrder

#### getRefundReceipt(id)

Retrieves the RefundReceipt from QuickBooks

**Arguments**

- `id` - The Id of persistent RefundReceipt

#### getReports(id)

Retrieves the Reports from QuickBooks

**Arguments**

- `id` - The Id of persistent Reports

#### getSalesReceipt(id)

Retrieves the SalesReceipt from QuickBooks

**Arguments**

- `id` - The Id of persistent SalesReceipt

#### getTaxAgency(id)

Retrieves the TaxAgency from QuickBooks

**Arguments**

- `id` - The Id of persistent TaxAgency

#### getTaxCode(id)

Retrieves the TaxCode from QuickBooks

**Arguments**

- `id` - The Id of persistent TaxCode

#### getTaxRate(id)

Retrieves the TaxRate from QuickBooks

**Arguments**

- `id` - The Id of persistent TaxRate

#### getTerm(id)

Retrieves the Term from QuickBooks

**Arguments**

- `id` - The Id of persistent Term

#### getTimeActivity(id)

Retrieves the TimeActivity from QuickBooks

**Arguments**

- `id` - The Id of persistent TimeActivity

#### getTransfer(id)

Retrieves the Transfer from QuickBooks

**Arguments**

- `id` - The Id of persistent Transfer

#### getVendor(id)

Retrieves the Vendor from QuickBooks

**Arguments**

- `id` - The Id of persistent Vendor

#### getVendorCredit(id)

Retrieves the VendorCredit from QuickBooks

**Arguments**

- `id` - The Id of persistent VendorCredit

#### updateAccount(object)

Updates QuickBooks version of Account

**Arguments**

- `object` - The persistent Account, including Id and SyncToken fields

#### updateAttachable(object)

Updates QuickBooks version of Attachable

**Arguments**

- `object` - The persistent Attachable, including Id and SyncToken fields

#### updateBill(object)

Updates QuickBooks version of Bill

**Arguments**

- `object` - The persistent Bill, including Id and SyncToken fields

#### updateBillPayment(object)

Updates QuickBooks version of BillPayment

**Arguments**

- `object` - The persistent BillPayment, including Id and SyncToken fields

#### updateClass(object)

Updates QuickBooks version of Class

**Arguments**

- `object` - The persistent Class, including Id and SyncToken fields

#### updateCompanyInfo(object)

Updates QuickBooks version of CompanyInfo

**Arguments**

- `object` - The persistent CompanyInfo, including Id and SyncToken fields

#### updateCreditMemo(object)

Updates QuickBooks version of CreditMemo

**Arguments**

- `object` - The persistent CreditMemo, including Id and SyncToken fields

#### updateCustomer(object)

Updates QuickBooks version of Customer

**Arguments**

- `object` - The persistent Customer, including Id and SyncToken fields

#### updateDepartment(object)

Updates QuickBooks version of Department

**Arguments**

- `object` - The persistent Department, including Id and SyncToken fields

#### updateDeposit(object)

Updates QuickBooks version of Deposit

**Arguments**

- `object` - The persistent Deposit, including Id and SyncToken fields

#### updateEmployee(object)

Updates QuickBooks version of Employee

**Arguments**

- `object` - The persistent Employee, including Id and SyncToken fields

#### updateEstimate(object)

Updates QuickBooks version of Estimate

**Arguments**

- `object` - The persistent Estimate, including Id and SyncToken fields

#### updateInvoice(object)

Updates QuickBooks version of Invoice

**Arguments**

- `object` - The persistent Invoice, including Id and SyncToken fields. To void invoice set `void:true` in the object.

#### updateItem(object)

Updates QuickBooks version of Item

**Arguments**

- `object` - The persistent Item, including Id and SyncToken fields

#### updateJournalCode(object)

Updates QuickBooks version of JournalCode

**Arguments**

- `object` - The persistent JournalCode, including Id and SyncToken fields

#### updateJournalEntry(object)

Updates QuickBooks version of JournalEntry

**Arguments**

- `object` - The persistent JournalEntry, including Id and SyncToken fields

#### updatePayment(object)

Updates QuickBooks version of Payment

**Arguments**

- `object` - The persistent Payment, including Id and SyncToken fields. To void payment set `void:true` in the object.

#### updatePaymentMethod(object)

Updates QuickBooks version of PaymentMethod

**Arguments**

- `object` - The persistent PaymentMethod, including Id and SyncToken fields

#### updatePreferences(object)

Updates QuickBooks version of Preferences

**Arguments**

- `object` - The persistent Preferences, including Id and SyncToken fields

#### updatePurchase(object)

Updates QuickBooks version of Purchase

**Arguments**

- `object` - The persistent Purchase, including Id and SyncToken fields

#### updatePurchaseOrder(object)

Updates QuickBooks version of PurchaseOrder

**Arguments**

- `object` - The persistent PurchaseOrder, including Id and SyncToken fields

#### updateRefundReceipt(object)

Updates QuickBooks version of RefundReceipt

**Arguments**

- `object` - The persistent RefundReceipt, including Id and SyncToken fields

#### updateSalesReceipt(object)

Updates QuickBooks version of SalesReceipt

**Arguments**

- `object` - The persistent SalesReceipt, including Id and SyncToken fields. To void sales receipt set `void:true` in the object.

#### updateTaxAgency(object)

Updates QuickBooks version of TaxAgency

**Arguments**

- `object` - The persistent TaxAgency, including Id and SyncToken fields

#### updateTaxCode(object)

Updates QuickBooks version of TaxCode

**Arguments**

- `object` - The persistent TaxCode, including Id and SyncToken fields

#### updateTaxRate(object)

Updates QuickBooks version of TaxRate

**Arguments**

- `object` - The persistent TaxRate, including Id and SyncToken fields

#### updateTerm(object)

Updates QuickBooks version of Term

**Arguments**

- `object` - The persistent Term, including Id and SyncToken fields

#### updateTimeActivity(object)

Updates QuickBooks version of TimeActivity

**Arguments**

- `object` - The persistent TimeActivity, including Id and SyncToken fields

#### updateTransfer(object)

Updates QuickBooks version of Transfer

**Arguments**

- `object` - The persistent Transfer, including Id and SyncToken fields

#### updateVendor(object)

Updates QuickBooks version of Vendor

**Arguments**

- `object` - The persistent Vendor, including Id and SyncToken fields

#### updateVendorCredit(object)

Updates QuickBooks version of VendorCredit

**Arguments**

- `object` - The persistent VendorCredit, including Id and SyncToken fields

#### updateExchangeRate(object)

Updates QuickBooks version of ExchangeRate

**Arguments**

- `object` - The persistent ExchangeRate

#### deleteAttachable(idOrEntity)

Deletes the Attachable from QuickBooks

**Arguments**

- `idOrEntity` - The persistent Attachable to be deleted, or the Id of the Attachable, in which case an extra GET request will be issued to first retrieve the Attachable

#### deleteBill(idOrEntity)

Deletes the Bill from QuickBooks

**Arguments**

- `idOrEntity` - The persistent Bill to be deleted, or the Id of the Bill, in which case an extra GET request will be issued to first retrieve the Bill

#### deleteBillPayment(idOrEntity)

Deletes the BillPayment from QuickBooks

**Arguments**

- `idOrEntity` - The persistent BillPayment to be deleted, or the Id of the BillPayment, in which case an extra GET request will be issued to first retrieve the BillPayment

#### deleteCreditMemo(idOrEntity)

Deletes the CreditMemo from QuickBooks

**Arguments**

- `idOrEntity` - The persistent CreditMemo to be deleted, or the Id of the CreditMemo, in which case an extra GET request will be issued to first retrieve the CreditMemo

#### deleteDeposit(idOrEntity)

Deletes the Deposit from QuickBooks

**Arguments**

- `idOrEntity` - The persistent Deposit to be deleted, or the Id of the Deposit, in which case an extra GET request will be issued to first retrieve the Deposit

#### deleteEstimate(idOrEntity)

Deletes the Estimate from QuickBooks

**Arguments**

- `idOrEntity` - The persistent Estimate to be deleted, or the Id of the Estimate, in which case an extra GET request will be issued to first retrieve the Estimate

#### deleteInvoice(idOrEntity)

Deletes the Invoice from QuickBooks

**Arguments**

- `idOrEntity` - The persistent Invoice to be deleted, or the Id of the Invoice, in which case an extra GET request will be issued to first retrieve the Invoice

#### deleteJournalCode(idOrEntity)

Deletes the JournalCode from QuickBooks

**Arguments**

- `idOrEntity` - The persistent JournalCode to be deleted, or the Id of the JournalCode, in which case an extra GET request will be issued to first retrieve the JournalCode

#### deleteJournalEntry(idOrEntity)

Deletes the JournalEntry from QuickBooks

**Arguments**

- `idOrEntity` - The persistent JournalEntry to be deleted, or the Id of the JournalEntry, in which case an extra GET request will be issued to first retrieve the JournalEntry

#### deletePayment(idOrEntity)

Deletes the Payment from QuickBooks

**Arguments**

- `idOrEntity` - The persistent Payment to be deleted, or the Id of the Payment, in which case an extra GET request will be issued to first retrieve the Payment

#### deletePurchase(idOrEntity)

Deletes the Purchase from QuickBooks

**Arguments**

- `idOrEntity` - The persistent Purchase to be deleted, or the Id of the Purchase, in which case an extra GET request will be issued to first retrieve the Purchase

#### deletePurchaseOrder(idOrEntity)

Deletes the PurchaseOrder from QuickBooks

**Arguments**

- `idOrEntity` - The persistent PurchaseOrder to be deleted, or the Id of the PurchaseOrder, in which case an extra GET request will be issued to first retrieve the PurchaseOrder

#### deleteRefundReceipt(idOrEntity)

Deletes the RefundReceipt from QuickBooks

**Arguments**

- `idOrEntity` - The persistent RefundReceipt to be deleted, or the Id of the RefundReceipt, in which case an extra GET request will be issued to first retrieve the RefundReceipt

#### deleteSalesReceipt(idOrEntity)

Deletes the SalesReceipt from QuickBooks

**Arguments**

- `idOrEntity` - The persistent SalesReceipt to be deleted, or the Id of the SalesReceipt, in which case an extra GET request will be issued to first retrieve the SalesReceipt

#### deleteTimeActivity(idOrEntity)

Deletes the TimeActivity from QuickBooks

**Arguments**

- `idOrEntity` - The persistent TimeActivity to be deleted, or the Id of the TimeActivity, in which case an extra GET request will be issued to first retrieve the TimeActivity

#### deleteTransfer(idOrEntity)

Deletes the Transfer from QuickBooks

**Arguments**

- `idOrEntity` - The persistent Transfer to be deleted, or the Id of the Transfer, in which case an extra GET request will be issued to first retrieve the Transfer

#### deleteVendorCredit(idOrEntity)

Deletes the VendorCredit from QuickBooks

**Arguments**

- `idOrEntity` - The persistent VendorCredit to be deleted, or the Id of the VendorCredit, in which case an extra GET request will be issued to first retrieve the VendorCredit

#### findAccounts(criteria)

Finds all Accounts in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findAttachables(criteria)

Finds all Attachables in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findBills(criteria)

Finds all Bills in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findBillPayments(criteria)

Finds all BillPayments in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findBudgets(criteria)

Finds all Budgets in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findClasses(criteria)

Finds all Classs in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findCompanyInfos(criteria)

Finds all CompanyInfos in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findCreditMemos(criteria)

Finds all CreditMemos in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findCustomers(criteria)

Finds all Customers in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findDepartments(criteria)

Finds all Departments in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findDeposits(criteria)

Finds all Deposits in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findEmployees(criteria)

Finds all Employees in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findEstimates(criteria)

Finds all Estimates in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findInvoices(criteria)

Finds all Invoices in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findItems(criteria)

Finds all Items in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findJournalCodes(criteria)

Finds all JournalCodes in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findJournalEntries(criteria)

Finds all JournalEntrys in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findPayments(criteria)

Finds all Payments in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findPaymentMethods(criteria)

Finds all PaymentMethods in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findPreferenceses(criteria)

Finds all Preferencess in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findPurchases(criteria)

Finds all Purchases in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findPurchaseOrders(criteria)

Finds all PurchaseOrders in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findRefundReceipts(criteria)

Finds all RefundReceipts in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findSalesReceipts(criteria)

Finds all SalesReceipts in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findTaxAgencies(criteria)

Finds all TaxAgencys in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findTaxCodes(criteria)

Finds all TaxCodes in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findTaxRates(criteria)

Finds all TaxRates in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findTerms(criteria)

Finds all Terms in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findTimeActivities(criteria)

Finds all TimeActivitys in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findVendors(criteria)

Finds all Vendors in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findVendorCredits(criteria)

Finds all VendorCredits in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### findExchangeRates(criteria)

Finds all ExchangeRates in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"

#### reportBalanceSheet(options)

Retrieves the BalanceSheet Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportProfitAndLoss(options)

Retrieves the ProfitAndLoss Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportProfitAndLossDetail(options)

Retrieves the ProfitAndLossDetail Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportTrialBalance(options)

Retrieves the TrialBalance Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportCashFlow(options)

Retrieves the CashFlow Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportInventoryValuationSummary(options)

Retrieves the InventoryValuationSummary Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportCustomerSales(options)

Retrieves the CustomerSales Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportItemSales(options)

Retrieves the ItemSales Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportCustomerIncome(options)

Retrieves the CustomerIncome Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportCustomerBalance(options)

Retrieves the CustomerBalance Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportCustomerBalanceDetail(options)

Retrieves the CustomerBalanceDetail Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportAgedReceivables(options)

Retrieves the AgedReceivables Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportAgedReceivableDetail(options)

Retrieves the AgedReceivableDetail Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportVendorBalance(options)

Retrieves the VendorBalance Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportVendorBalanceDetail(options)

Retrieves the VendorBalanceDetail Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportAgedPayables(options)

Retrieves the AgedPayables Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportAgedPayableDetail(options)

Retrieves the AgedPayableDetail Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportVendorExpenses(options)

Retrieves the VendorExpenses Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportTransactionList(options)

Retrieves the TransactionList Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportGeneralLedgerDetail(options)

Retrieves the GeneralLedgerDetail Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportDepartmentSales(options)

Retrieves the DepartmentSales Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### reportClassSales(options)

Retrieves the ClassSales Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report

#### getInvoicePdf(id)

Retrieves the Invoice PDF from QuickBooks

**Arguments**

- `id` - The Id of persistent Invoice

#### getCreditMemoPdf(id)

Retrieves the Credit Memo PDF from QuickBooks

**Arguments**

- `id` - The Id of persistent Credit Memo
 PDF

#### getSalesReceiptPdf(id)

Retrieves the SalesReceipt PDF from QuickBooks

**Arguments**

- `id` - The Id of persistent SalesReceipt
 PDF

#### sendInvoicePdf(id, sendTo)

Emails the Invoice PDF from QuickBooks to the address supplied in Invoice.BillEmail.EmailAddress or the specified 'sendTo' address

**Arguments**

- `Id` - The Id of persistent Invoice
- `sendTo` - (Optional) optional email address to send the PDF to. If not provided, address supplied in Invoice.BillEmail.EmailAddress will be used

#### sendCreditMemoPdf(id, sendTo)

Emails the Credit Memo PDF from QuickBooks to the address supplied in CreditMemo.BillEmail.EmailAddress or the specified 'sendTo' address

**Arguments**

- `Id` - The Id of persistent Credit Memo
- `sendTo` - (Optional) optional email address to send the PDF to. If not provided, address supplied in Credit Memo.BillEmail.EmailAddress will be used
 PDF

#### sendEstimatePdf(id, sendTo)

Emails the Estimate PDF from QuickBooks to the address supplied in Estimate.BillEmail.EmailAddress or the specified 'sendTo' address

**Arguments**

- `Id` - The Id of persistent Estimate
- `sendTo` - (Optional) optional email address to send the PDF to. If not provided, address supplied in Estimate.BillEmail.EmailAddress will be used

#### sendSalesReceiptPdf(id, sendTo)

Emails the SalesReceipt PDF from QuickBooks to the address supplied in SalesReceipt.BillEmail.EmailAddress or the specified 'sendTo' address

**Arguments**

- `Id` - The Id of persistent SalesReceipt
- `sendTo` - (Optional) optional email address to send the PDF to. If not provided, address supplied in SalesReceipt.BillEmail.EmailAddress will be used

#### sendPurchaseOrder(id, sendTo)

Emails the Purchase Order from QuickBooks to the address supplied in PurchaseOrder.POEmail.Address or the specified 'sendTo' address

**Arguments**

- `Id` - The Id of persistent Purchase Order
- `sendTo` - (Optional) optional email address to send the email to. If not provided, address supplied in PurchaseOrder.POEmail.Address will be used

#### batch(items)

Batch operation to enable an application to perform multiple operations in a single request. The following batch items are supported:

- create
- update
- delete
- query

- The maximum number of batch items in a single request is 30.

**Arguments**

- `items` - JavaScript array of batch items

#### changeDataCapture(entities, since)

The change data capture (CDC) operation returns a list of entities that have changed since a specified time.

**Arguments**

- `entities` - Comma separated list or JavaScript array of entities to search for changes
- `since` - JavaScript Date or string representation of the form '2012-07-20T22:25:51-07:00' to look back for changes until
- `callback` - Callback function which is called with any error and list of changes
