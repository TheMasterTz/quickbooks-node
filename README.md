# node-quickbooks

nodejs client for Intuit's [QuickBooks API] [1]

## Installation

`npm install node-quickbooks`

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

## Example App

The `example` directory contains a barebones Express application that demonstrates the OAuth workflow.

### Setup

First navigate to the `example` directory and install the required dependencies from NPM

    npm install

You will need to create an Intuit Developer account at <https://developer.intuit.com> and add your app's OAuth Consumer Key and Secret to `app.js`. Pay attention to which APIs (Payments, QuickBooks) you select during the application creation process, you will have to update `example/views/intuit.ejs` if you did not select both.

### Running

Start the app

    node app.js

Browse to http://localhost:3000/start and you will see a page containing only the Intuit Developer Javascript-rendered button. Clicking on this kicks off the OAuth exchange.

The Intuit Developer Javascript code calls back into the node application, which needs to invoke the OAuth Request Token URL at https://oauth.intuit.com/oauth/v1/get_request_token via a server-side http POST method. Note how the response from the http POST is parsed and the browser is redirected to the App Center URL at https://appcenter.intuit.com/Connect/Begin?oauth_token= with the `oauth_token` passed as a URL parameter. Note also how the `oauth_token_secret` needs to somehow be maintained across http requests, as it needs to be passed in the second server-side http POST to the Access Token URL at https://oauth.intuit.com/oauth/v1/get_access_token. This final step is invoked once the user has authenticated on Intuit's site and authorized the application, and then the user is redirected back to the node application at the callback URL specified as a parameter in the Request Token remote call, in the example app's case, http://localhost:3000/callback.

### Configuration

The Intuit Developer Javascript code contained in `intuit.ejs` is configured with the `grantUrl` option set to "http://localhost:3000/requestToken". You will want to change this to an appropriate URL for your application, but you will need to write similar functionality to that contained in the '/requestToken' route configured in `app.js`, also taking care to configure your `consumerKey` and `consumerSecret` on lines 27-28 in app.js.

## Running the tests

First you'll need to fill in the missing values in config.js. The consumerKey and consumerSecret you can get from the Intuit Developer portal, the token, tokenSecret, and realmId are easiest to obtain by running the example app, completing the OAuth workflow, and copying the values that are logged to the console. Once you've filled in the missing credentials in config.js you can simply run:

`npm test`

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

- [`createAccount`](#createaccountobject-callback)
- [`createAttachable`](#createattachableobject-callback)
- [`createBill`](#createbillobject-callback)
- [`createBillPayment`](#createbillpaymentobject-callback)
- [`createClass`](#createclassobject-callback)
- [`createCreditMemo`](#createcreditmemoobject-callback)
- [`createCustomer`](#createcustomerobject-callback)
- [`createDepartment`](#createdepartmentobject-callback)
- [`createDeposit`](#createdepositobject-callback)
- [`createEmployee`](#createemployeeobject-callback)
- [`createEstimate`](#createestimateobject-callback)
- [`createInvoice`](#createinvoiceobject-callback)
- [`createItem`](#createitemobject-callback)
- [`createJournalCode`](#createjournalcodeobject-callback)
- [`createJournalEntry`](#createjournalentryobject-callback)
- [`createPayment`](#createpaymentobject-callback)
- [`createPaymentMethod`](#createpaymentmethodobject-callback)
- [`createPurchase`](#createpurchaseobject-callback)
- [`createPurchaseOrder`](#createpurchaseorderobject-callback)
- [`createRefundReceipt`](#createrefundreceiptobject-callback)
- [`createSalesReceipt`](#createsalesreceiptobject-callback)
- [`createTaxAgency`](#createtaxagencyobject-callback)
- [`createTaxService`](#createtaxserviceobject-callback)
- [`createTerm`](#createtermobject-callback)
- [`createTimeActivity`](#createtimeactivityobject-callback)
- [`createTransfer`](#createtransferobject-callback)
- [`createVendor`](#createvendorobject-callback)
- [`createVendorCredit`](#createvendorcreditobject-callback)

#### Read

- [`getAccount`](#getaccountid-callback)
- [`getAttachable`](#getattachableid-callback)
- [`getBill`](#getbillid-callback)
- [`getBillPayment`](#getbillpaymentid-callback)
- [`getClass`](#getclassid-callback)
- [`getCompanyInfo`](#getcompanyinfoid-callback)
- [`getCreditMemo`](#getcreditmemoid-callback)
- [`getCustomer`](#getcustomerid-callback)
- [`getDepartment`](#getdepartmentid-callback)
- [`getDeposit`](#getdepositid-callback)
- [`getEmployee`](#getemployeeid-callback)
- [`getEstimate`](#getestimateid-callback)
- [`getExchangeRate`](#getexchangerateoptions-callback)
- [`getInvoice`](#getinvoiceid-callback)
- [`getItem`](#getitemid-callback)
- [`getJournalCode`](#getjournalcodeid-callback)
- [`getJournalEntry`](#getjournalentryid-callback)
- [`getPayment`](#getpaymentid-callback)
- [`getPaymentMethod`](#getpaymentmethodid-callback)
- [`getPreferences`](#getpreferencesid-callback)
- [`getPurchase`](#getpurchaseid-callback)
- [`getPurchaseOrder`](#getpurchaseorderid-callback)
- [`getRefundReceipt`](#getrefundreceiptid-callback)
- [`getReports`](#getreportsid-callback)
- [`getSalesReceipt`](#getsalesreceiptid-callback)
- [`getTaxAgency`](#gettaxagencyid-callback)
- [`getTaxCode`](#gettaxcodeid-callback)
- [`getTaxRate`](#gettaxrateid-callback)
- [`getTerm`](#gettermid-callback)
- [`getTimeActivity`](#gettimeactivityid-callback)
- [`getVendor`](#getvendorid-callback)
- [`getVendorCredit`](#getvendorcreditid-callback)

#### Update

- [`updateAccount`](#updateaccountobject-callback)
- [`updateAttachable`](#updateattachableobject-callback)
- [`updateBill`](#updatebillobject-callback)
- [`updateBillPayment`](#updatebillpaymentobject-callback)
- [`updateClass`](#updateclassobject-callback)
- [`updateCompanyInfo`](#updatecompanyinfoobject-callback)
- [`updateCreditMemo`](#updatecreditmemoobject-callback)
- [`updateCustomer`](#updatecustomerobject-callback)
- [`updateDepartment`](#updatedepartmentobject-callback)
- [`updateDeposit`](#updatedepositobject-callback)
- [`updateEmployee`](#updateemployeeobject-callback)
- [`updateEstimate`](#updateestimateobject-callback)
- [`updateInvoice`](#updateinvoiceobject-callback)
- [`updateItem`](#updateitemobject-callback)
- [`updateJournalCode`](#updatejournalcodeobject-callback)
- [`updateJournalEntry`](#updatejournalentryobject-callback)
- [`updatePayment`](#updatepaymentobject-callback)
- [`updatePaymentMethod`](#updatepaymentmethodobject-callback)
- [`updatePreferences`](#updatepreferencesobject-callback)
- [`updatePurchase`](#updatepurchaseobject-callback)
- [`updatePurchaseOrder`](#updatepurchaseorderobject-callback)
- [`updateRefundReceipt`](#updaterefundreceiptobject-callback)
- [`updateSalesReceipt`](#updatesalesreceiptobject-callback)
- [`updateTaxAgency`](#updatetaxagencyobject-callback)
- [`updateTaxCode`](#updatetaxcodeobject-callback)
- [`updateTaxRate`](#updatetaxrateobject-callback)
- [`updateTerm`](#updatetermobject-callback)
- [`updateTimeActivity`](#updatetimeactivityobject-callback)
- [`updateTransfer`](#updatetransferobject-callback)
- [`updateVendor`](#updatevendorobject-callback)
- [`updateVendorCredit`](#updatevendorcreditobject-callback)
- [`updateExchangeRate`](#updateexchangerateobject-callback)

#### Delete

- [`deleteAttachable`](#deleteattachableidorentity-callback)
- [`deleteBill`](#deletebillidorentity-callback)
- [`deleteBillPayment`](#deletebillpaymentidorentity-callback)
- [`deleteCreditMemo`](#deletecreditmemoidorentity-callback)
- [`deleteDeposit`](#deletedepositidorentity-callback)
- [`deleteEstimate`](#deleteestimateidorentity-callback)
- [`deleteInvoice`](#deleteinvoiceidorentity-callback)
- [`deleteJournalCode`](#deletejournalcodeidorentity-callback)
- [`deleteJournalEntry`](#deletejournalentryidorentity-callback)
- [`deletePayment`](#deletepaymentidorentity-callback)
- [`deletePurchase`](#deletepurchaseidorentity-callback)
- [`deletePurchaseOrder`](#deletepurchaseorderidorentity-callback)
- [`deleteRefundReceipt`](#deleterefundreceiptidorentity-callback)
- [`deleteSalesReceipt`](#deletesalesreceiptidorentity-callback)
- [`deleteTimeActivity`](#deletetimeactivityidorentity-callback)
- [`deleteTransfer`](#deletetransferidorentity-callback)
- [`deleteVendorCredit`](#deletevendorcreditidorentity-callback)

#### Query

- [`findAccounts`](#findaccountscriteria-callback)
- [`findAttachables`](#findattachablescriteria-callback)
- [`findBills`](#findbillscriteria-callback)
- [`findBillPayments`](#findbillpaymentscriteria-callback)
- [`findBudgets`](#findbudgetscriteria-callback)
- [`findClasses`](#findclassescriteria-callback)
- [`findCompanyInfos`](#findcompanyinfoscriteria-callback)
- [`findCreditMemos`](#findcreditmemoscriteria-callback)
- [`findCustomers`](#findcustomerscriteria-callback)
- [`findDepartments`](#finddepartmentscriteria-callback)
- [`findDeposits`](#finddepositscriteria-callback)
- [`findEmployees`](#findemployeescriteria-callback)
- [`findEstimates`](#findestimatescriteria-callback)
- [`findInvoices`](#findinvoicescriteria-callback)
- [`findItems`](#finditemscriteria-callback)
- [`findJournalCodes`](#findjournalcodescriteria-callback)
- [`findJournalEntries`](#findjournalentriescriteria-callback)
- [`findPayments`](#findpaymentscriteria-callback)
- [`findPaymentMethods`](#findpaymentmethodscriteria-callback)
- [`findPreferenceses`](#findpreferencesescriteria-callback)
- [`findPurchases`](#findpurchasescriteria-callback)
- [`findPurchaseOrders`](#findpurchaseorderscriteria-callback)
- [`findRefundReceipts`](#findrefundreceiptscriteria-callback)
- [`findSalesReceipts`](#findsalesreceiptscriteria-callback)
- [`findTaxAgencies`](#findtaxagenciescriteria-callback)
- [`findTaxCodes`](#findtaxcodescriteria-callback)
- [`findTaxRates`](#findtaxratescriteria-callback)
- [`findTerms`](#findtermscriteria-callback)
- [`findTimeActivities`](#findtimeactivitiescriteria-callback)
- [`findVendors`](#findvendorscriteria-callback)
- [`findVendorCredits`](#findvendorcreditscriteria-callback)
- [`findExchangeRates`](#findexchangeratescriteria-callback)

#### Reports

- [`reportBalanceSheet`](#reportbalancesheetoptions-callback)
- [`reportProfitAndLoss`](#reportprofitandlossoptions-callback)
- [`reportProfitAndLossDetail`](#reportprofitandlossdetailoptions-callback)
- [`reportTrialBalance`](#reporttrialbalanceoptions-callback)
- [`reportCashFlow`](#reportcashflowoptions-callback)
- [`reportInventoryValuationSummary`](#reportinventoryvaluationsummaryoptions-callback)
- [`reportCustomerSales`](#reportcustomersalesoptions-callback)
- [`reportItemSales`](#reportitemsalesoptions-callback)
- [`reportCustomerIncome`](#reportcustomerincomeoptions-callback)
- [`reportCustomerBalance`](#reportcustomerbalanceoptions-callback)
- [`reportCustomerBalanceDetail`](#reportcustomerbalancedetailoptions-callback)
- [`reportAgedReceivables`](#reportagedreceivablesoptions-callback)
- [`reportAgedReceivableDetail`](#reportagedreceivabledetailoptions-callback)
- [`reportVendorBalance`](#reportvendorbalanceoptions-callback)
- [`reportVendorBalanceDetail`](#reportvendorbalancedetailoptions-callback)
- [`reportAgedPayables`](#reportagedpayablesoptions-callback)
- [`reportAgedPayableDetail`](#reportagedpayabledetailoptions-callback)
- [`reportVendorExpenses`](#reportvendorexpensesoptions-callback)
- [`reportTransactionList`](#reporttransactionlistoptions-callback)
- [`reportGeneralLedgerDetail`](#reportgeneralledgerdetailoptions-callback)
- [`reportDepartmentSales`](#reportdepartmentsalesoptions-callback)
- [`reportClassSales`](#reportclasssalesoptions-callback)

#### SalesReceipt and Invoice PDFs

- [`getInvoicePdf`](#getinvoicepdfid-callback)
- [`getCreditMemoPdf`](#getinvoicepdfid-callback)
- [`getSalesReceiptPdf`](#getsalesreceiptpdfid-callback)
- [`sendInvoicePdf`](#sendinvoicepdfid-sendto-callback)
- [`sendCreditMemoPdf`](#sendcreditmemopdfid-sendto-callback)
- [`sendEstimatePdf`](#sendestimatepdfid-sendto-callback)
- [`sendSalesReceiptPdf`](#sendsalesreceiptpdfid-sendto-callback)

### Purchase Order Email

- [`sendPurchaseOrder`](#sendpurchaseorderid-sendto-callback)

#### Miscellaneous

- [`batch`](#batchitems-callback)
- [`changeDataCapture`](#changedatacaptureentities-since-callback)

#### createAccount(object, callback)

Creates the Account in QuickBooks

**Arguments**

- `object` - The unsaved account, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent Account

#### createAttachable(object, callback)

Creates the Attachable in QuickBooks

**Arguments**

- `object` - The unsaved attachable, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent Attachable

#### createBill(object, callback)

Creates the Bill in QuickBooks

**Arguments**

- `object` - The unsaved bill, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent Bill

#### createBillPayment(object, callback)

Creates the BillPayment in QuickBooks

**Arguments**

- `object` - The unsaved billPayment, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent BillPayment

#### createClass(object, callback)

Creates the Class in QuickBooks

**Arguments**

- `object` - The unsaved class, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent Class

#### createCreditMemo(object, callback)

Creates the CreditMemo in QuickBooks

**Arguments**

- `object` - The unsaved creditMemo, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent CreditMemo

#### createCustomer(object, callback)

Creates the Customer in QuickBooks

**Arguments**

- `object` - The unsaved customer, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent Customer

#### createDepartment(object, callback)

Creates the Department in QuickBooks

**Arguments**

- `object` - The unsaved department, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent Department

#### createDeposit(object, callback)

Creates the Deposit in QuickBooks

**Arguments**

- `object` - The unsaved deposit, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent Deposit

#### createEmployee(object, callback)

Creates the Employee in QuickBooks

**Arguments**

- `object` - The unsaved employee, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent Employee

#### createEstimate(object, callback)

Creates the Estimate in QuickBooks

**Arguments**

- `object` - The unsaved estimate, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent Estimate

#### createInvoice(object, callback)

Creates the Invoice in QuickBooks

**Arguments**

- `object` - The unsaved invoice, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent Invoice

#### createItem(object, callback)

Creates the Item in QuickBooks

**Arguments**

- `object` - The unsaved item, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent Item

#### createJournalCode(object, callback)

Creates the JournalCode in QuickBooks

**Arguments**

- `object` - The unsaved journalCode, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent JournalCode

#### createJournalEntry(object, callback)

Creates the JournalEntry in QuickBooks

**Arguments**

- `object` - The unsaved journalEntry, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent JournalEntry

#### createPayment(object, callback)

Creates the Payment in QuickBooks

**Arguments**

- `object` - The unsaved payment, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent Payment

#### createPaymentMethod(object, callback)

Creates the PaymentMethod in QuickBooks

**Arguments**

- `object` - The unsaved paymentMethod, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent PaymentMethod

#### createPurchase(object, callback)

Creates the Purchase in QuickBooks

**Arguments**

- `object` - The unsaved purchase, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent Purchase

#### createPurchaseOrder(object, callback)

Creates the PurchaseOrder in QuickBooks

**Arguments**

- `object` - The unsaved purchaseOrder, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent PurchaseOrder

#### createRefundReceipt(object, callback)

Creates the RefundReceipt in QuickBooks

**Arguments**

- `object` - The unsaved refundReceipt, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent RefundReceipt

#### createSalesReceipt(object, callback)

Creates the SalesReceipt in QuickBooks

**Arguments**

- `object` - The unsaved salesReceipt, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent SalesReceipt

#### createTaxAgency(object, callback)

Creates the TaxAgency in QuickBooks

**Arguments**

- `object` - The unsaved taxAgency, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent TaxAgency

#### createTaxService(object, callback)

Creates the TaxService in QuickBooks

**Arguments**

- `object` - The unsaved taxService, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent TaxService

#### createTerm(object, callback)

Creates the Term in QuickBooks

**Arguments**

- `object` - The unsaved term, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent Term

#### createTimeActivity(object, callback)

Creates the TimeActivity in QuickBooks

**Arguments**

- `object` - The unsaved timeActivity, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent TimeActivity

#### createTransfer(object, callback)

Creates the Transfer in QuickBooks

**Arguments**

- `object` - The unsaved transfer, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent Transfer

#### createVendor(object, callback)

Creates the Vendor in QuickBooks

**Arguments**

- `object` - The unsaved vendor, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent Vendor

#### createVendorCredit(object, callback)

Creates the VendorCredit in QuickBooks

**Arguments**

- `object` - The unsaved vendorCredit, to be persisted in QuickBooks
- `callback` - Callback function which is called with any error and the persistent VendorCredit

#### getAccount(id, callback)

Retrieves the Account from QuickBooks

**Arguments**

- `id` - The Id of persistent Account
- `callback` - Callback function which is called with any error and the persistent Account

#### getAttachable(id, callback)

Retrieves the Attachable from QuickBooks

**Arguments**

- `id` - The Id of persistent Attachable
- `callback` - Callback function which is called with any error and the persistent Attachable

#### getBill(id, callback)

Retrieves the Bill from QuickBooks

**Arguments**

- `id` - The Id of persistent Bill
- `callback` - Callback function which is called with any error and the persistent Bill

#### getBillPayment(id, callback)

Retrieves the BillPayment from QuickBooks

**Arguments**

- `id` - The Id of persistent BillPayment
- `callback` - Callback function which is called with any error and the persistent BillPayment

#### getClass(id, callback)

Retrieves the Class from QuickBooks

**Arguments**

- `id` - The Id of persistent Class
- `callback` - Callback function which is called with any error and the persistent Class

#### getCompanyInfo(id, callback)

Retrieves the CompanyInfo from QuickBooks

**Arguments**

- `id` - The Id of persistent CompanyInfo
- `callback` - Callback function which is called with any error and the persistent CompanyInfo

#### getCreditMemo(id, callback)

Retrieves the CreditMemo from QuickBooks

**Arguments**

- `id` - The Id of persistent CreditMemo
- `callback` - Callback function which is called with any error and the persistent CreditMemo

#### getCustomer(id, callback)

Retrieves the Customer from QuickBooks

**Arguments**

- `id` - The Id of persistent Customer
- `callback` - Callback function which is called with any error and the persistent Customer

#### getDepartment(id, callback)

Retrieves the Department from QuickBooks

**Arguments**

- `id` - The Id of persistent Department
- `callback` - Callback function which is called with any error and the persistent Department

#### getDeposit(id, callback)

Retrieves the Deposit from QuickBooks

**Arguments**

- `id` - The Id of persistent Deposit
- `callback` - Callback function which is called with any error and the persistent Deposit

#### getEmployee(id, callback)

Retrieves the Employee from QuickBooks

**Arguments**

- `id` - The Id of persistent Employee
- `callback` - Callback function which is called with any error and the persistent Employee

#### getEstimate(id, callback)

Retrieves the Estimate from QuickBooks

**Arguments**

- `id` - The Id of persistent Estimate
- `callback` - Callback function which is called with any error and the persistent Estimate

#### getExchangeRate(options, callback)

Retrieves an ExchangeRate from QuickBooks

**Arguments**

- `options` - An object with options including the required `sourcecurrencycode` parameter and optional `asofdate` parameter.
- `callback` - Callback function which is called with any error and the ExchangeRate

#### getInvoice(id, callback)

Retrieves the Invoice from QuickBooks

**Arguments**

- `id` - The Id of persistent Invoice
- `callback` - Callback function which is called with any error and the persistent Invoice

#### getItem(id, callback)

Retrieves the Item from QuickBooks

**Arguments**

- `id` - The Id of persistent Item
- `callback` - Callback function which is called with any error and the persistent Item

#### getJournalCode(id, callback)

Retrieves the JournalCode from QuickBooks

**Arguments**

- `id` - The Id of persistent JournalCode
- `callback` - Callback function which is called with any error and the persistent JournalCode

#### getJournalEntry(id, callback)

Retrieves the JournalEntry from QuickBooks

**Arguments**

- `id` - The Id of persistent JournalEntry
- `callback` - Callback function which is called with any error and the persistent JournalEntry

#### getPayment(id, callback)

Retrieves the Payment from QuickBooks

**Arguments**

- `id` - The Id of persistent Payment
- `callback` - Callback function which is called with any error and the persistent Payment

#### getPaymentMethod(id, callback)

Retrieves the PaymentMethod from QuickBooks

**Arguments**

- `id` - The Id of persistent PaymentMethod
- `callback` - Callback function which is called with any error and the persistent PaymentMethod

#### getPreferences(callback)

Retrieves the Preferences from QuickBooks

**Arguments**

- `callback` - Callback function which is called with any error and the Preferences of the authorised realm

#### getPurchase(id, callback)

Retrieves the Purchase from QuickBooks

**Arguments**

- `id` - The Id of persistent Purchase
- `callback` - Callback function which is called with any error and the persistent Purchase

#### getPurchaseOrder(id, callback)

Retrieves the PurchaseOrder from QuickBooks

**Arguments**

- `id` - The Id of persistent PurchaseOrder
- `callback` - Callback function which is called with any error and the persistent PurchaseOrder

#### getRefundReceipt(id, callback)

Retrieves the RefundReceipt from QuickBooks

**Arguments**

- `id` - The Id of persistent RefundReceipt
- `callback` - Callback function which is called with any error and the persistent RefundReceipt

#### getReports(id, callback)

Retrieves the Reports from QuickBooks

**Arguments**

- `id` - The Id of persistent Reports
- `callback` - Callback function which is called with any error and the persistent Reports

#### getSalesReceipt(id, callback)

Retrieves the SalesReceipt from QuickBooks

**Arguments**

- `id` - The Id of persistent SalesReceipt
- `callback` - Callback function which is called with any error and the persistent SalesReceipt

#### getTaxAgency(id, callback)

Retrieves the TaxAgency from QuickBooks

**Arguments**

- `id` - The Id of persistent TaxAgency
- `callback` - Callback function which is called with any error and the persistent TaxAgency

#### getTaxCode(id, callback)

Retrieves the TaxCode from QuickBooks

**Arguments**

- `id` - The Id of persistent TaxCode
- `callback` - Callback function which is called with any error and the persistent TaxCode

#### getTaxRate(id, callback)

Retrieves the TaxRate from QuickBooks

**Arguments**

- `id` - The Id of persistent TaxRate
- `callback` - Callback function which is called with any error and the persistent TaxRate

#### getTerm(id, callback)

Retrieves the Term from QuickBooks

**Arguments**

- `id` - The Id of persistent Term
- `callback` - Callback function which is called with any error and the persistent Term

#### getTimeActivity(id, callback)

Retrieves the TimeActivity from QuickBooks

**Arguments**

- `id` - The Id of persistent TimeActivity
- `callback` - Callback function which is called with any error and the persistent TimeActivity

#### getTransfer(id, callback)

Retrieves the Transfer from QuickBooks

**Arguments**

- `id` - The Id of persistent Transfer
- `callback` - Callback function which is called with any error and the persistent Transfer

#### getVendor(id, callback)

Retrieves the Vendor from QuickBooks

**Arguments**

- `id` - The Id of persistent Vendor
- `callback` - Callback function which is called with any error and the persistent Vendor

#### getVendorCredit(id, callback)

Retrieves the VendorCredit from QuickBooks

**Arguments**

- `id` - The Id of persistent VendorCredit
- `callback` - Callback function which is called with any error and the persistent VendorCredit

#### updateAccount(object, callback)

Updates QuickBooks version of Account

**Arguments**

- `object` - The persistent Account, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated Account

#### updateAttachable(object, callback)

Updates QuickBooks version of Attachable

**Arguments**

- `object` - The persistent Attachable, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated Attachable

#### updateBill(object, callback)

Updates QuickBooks version of Bill

**Arguments**

- `object` - The persistent Bill, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated Bill

#### updateBillPayment(object, callback)

Updates QuickBooks version of BillPayment

**Arguments**

- `object` - The persistent BillPayment, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated BillPayment

#### updateClass(object, callback)

Updates QuickBooks version of Class

**Arguments**

- `object` - The persistent Class, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated Class

#### updateCompanyInfo(object, callback)

Updates QuickBooks version of CompanyInfo

**Arguments**

- `object` - The persistent CompanyInfo, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated CompanyInfo

#### updateCreditMemo(object, callback)

Updates QuickBooks version of CreditMemo

**Arguments**

- `object` - The persistent CreditMemo, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated CreditMemo

#### updateCustomer(object, callback)

Updates QuickBooks version of Customer

**Arguments**

- `object` - The persistent Customer, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated Customer

#### updateDepartment(object, callback)

Updates QuickBooks version of Department

**Arguments**

- `object` - The persistent Department, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated Department

#### updateDeposit(object, callback)

Updates QuickBooks version of Deposit

**Arguments**

- `object` - The persistent Deposit, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated Deposit

#### updateEmployee(object, callback)

Updates QuickBooks version of Employee

**Arguments**

- `object` - The persistent Employee, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated Employee

#### updateEstimate(object, callback)

Updates QuickBooks version of Estimate

**Arguments**

- `object` - The persistent Estimate, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated Estimate

#### updateInvoice(object, callback)

Updates QuickBooks version of Invoice

**Arguments**

- `object` - The persistent Invoice, including Id and SyncToken fields. To void invoice set `void:true` in the object.
- `callback` - Callback function which is called with any error and the updated Invoice

#### updateItem(object, callback)

Updates QuickBooks version of Item

**Arguments**

- `object` - The persistent Item, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated Item

#### updateJournalCode(object, callback)

Updates QuickBooks version of JournalCode

**Arguments**

- `object` - The persistent JournalCode, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated JournalCode

#### updateJournalEntry(object, callback)

Updates QuickBooks version of JournalEntry

**Arguments**

- `object` - The persistent JournalEntry, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated JournalEntry

#### updatePayment(object, callback)

Updates QuickBooks version of Payment

**Arguments**

- `object` - The persistent Payment, including Id and SyncToken fields. To void payment set `void:true` in the object.
- `callback` - Callback function which is called with any error and the updated Payment

#### updatePaymentMethod(object, callback)

Updates QuickBooks version of PaymentMethod

**Arguments**

- `object` - The persistent PaymentMethod, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated PaymentMethod

#### updatePreferences(object, callback)

Updates QuickBooks version of Preferences

**Arguments**

- `object` - The persistent Preferences, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated Preferences

#### updatePurchase(object, callback)

Updates QuickBooks version of Purchase

**Arguments**

- `object` - The persistent Purchase, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated Purchase

#### updatePurchaseOrder(object, callback)

Updates QuickBooks version of PurchaseOrder

**Arguments**

- `object` - The persistent PurchaseOrder, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated PurchaseOrder

#### updateRefundReceipt(object, callback)

Updates QuickBooks version of RefundReceipt

**Arguments**

- `object` - The persistent RefundReceipt, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated RefundReceipt

#### updateSalesReceipt(object, callback)

Updates QuickBooks version of SalesReceipt

**Arguments**

- `object` - The persistent SalesReceipt, including Id and SyncToken fields. To void sales receipt set `void:true` in the object.
- `callback` - Callback function which is called with any error and the updated SalesReceipt

#### updateTaxAgency(object, callback)

Updates QuickBooks version of TaxAgency

**Arguments**

- `object` - The persistent TaxAgency, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated TaxAgency

#### updateTaxCode(object, callback)

Updates QuickBooks version of TaxCode

**Arguments**

- `object` - The persistent TaxCode, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated TaxCode

#### updateTaxRate(object, callback)

Updates QuickBooks version of TaxRate

**Arguments**

- `object` - The persistent TaxRate, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated TaxRate

#### updateTerm(object, callback)

Updates QuickBooks version of Term

**Arguments**

- `object` - The persistent Term, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated Term

#### updateTimeActivity(object, callback)

Updates QuickBooks version of TimeActivity

**Arguments**

- `object` - The persistent TimeActivity, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated TimeActivity

#### updateTransfer(object, callback)

Updates QuickBooks version of Transfer

**Arguments**

- `object` - The persistent Transfer, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated Transfer

#### updateVendor(object, callback)

Updates QuickBooks version of Vendor

**Arguments**

- `object` - The persistent Vendor, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated Vendor

#### updateVendorCredit(object, callback)

Updates QuickBooks version of VendorCredit

**Arguments**

- `object` - The persistent VendorCredit, including Id and SyncToken fields
- `callback` - Callback function which is called with any error and the updated VendorCredit

#### updateExchangeRate(object, callback)

Updates QuickBooks version of ExchangeRate

**Arguments**

- `object` - The persistent ExchangeRate
- `callback` - Callback function which is called with any error and the updated ExchangeRate

#### deleteAttachable(idOrEntity, callback)

Deletes the Attachable from QuickBooks

**Arguments**

- `idOrEntity` - The persistent Attachable to be deleted, or the Id of the Attachable, in which case an extra GET request will be issued to first retrieve the Attachable
- `callback` - Callback function which is called with any error and the status of the persistent Attachable

#### deleteBill(idOrEntity, callback)

Deletes the Bill from QuickBooks

**Arguments**

- `idOrEntity` - The persistent Bill to be deleted, or the Id of the Bill, in which case an extra GET request will be issued to first retrieve the Bill
- `callback` - Callback function which is called with any error and the status of the persistent Bill

#### deleteBillPayment(idOrEntity, callback)

Deletes the BillPayment from QuickBooks

**Arguments**

- `idOrEntity` - The persistent BillPayment to be deleted, or the Id of the BillPayment, in which case an extra GET request will be issued to first retrieve the BillPayment
- `callback` - Callback function which is called with any error and the status of the persistent BillPayment

#### deleteCreditMemo(idOrEntity, callback)

Deletes the CreditMemo from QuickBooks

**Arguments**

- `idOrEntity` - The persistent CreditMemo to be deleted, or the Id of the CreditMemo, in which case an extra GET request will be issued to first retrieve the CreditMemo
- `callback` - Callback function which is called with any error and the status of the persistent CreditMemo

#### deleteDeposit(idOrEntity, callback)

Deletes the Deposit from QuickBooks

**Arguments**

- `idOrEntity` - The persistent Deposit to be deleted, or the Id of the Deposit, in which case an extra GET request will be issued to first retrieve the Deposit
- `callback` - Callback function which is called with any error and the status of the persistent Deposit

#### deleteEstimate(idOrEntity, callback)

Deletes the Estimate from QuickBooks

**Arguments**

- `idOrEntity` - The persistent Estimate to be deleted, or the Id of the Estimate, in which case an extra GET request will be issued to first retrieve the Estimate
- `callback` - Callback function which is called with any error and the status of the persistent Estimate

#### deleteInvoice(idOrEntity, callback)

Deletes the Invoice from QuickBooks

**Arguments**

- `idOrEntity` - The persistent Invoice to be deleted, or the Id of the Invoice, in which case an extra GET request will be issued to first retrieve the Invoice
- `callback` - Callback function which is called with any error and the status of the persistent Invoice

#### deleteJournalCode(idOrEntity, callback)

Deletes the JournalCode from QuickBooks

**Arguments**

- `idOrEntity` - The persistent JournalCode to be deleted, or the Id of the JournalCode, in which case an extra GET request will be issued to first retrieve the JournalCode
- `callback` - Callback function which is called with any error and the status of the persistent JournalCode

#### deleteJournalEntry(idOrEntity, callback)

Deletes the JournalEntry from QuickBooks

**Arguments**

- `idOrEntity` - The persistent JournalEntry to be deleted, or the Id of the JournalEntry, in which case an extra GET request will be issued to first retrieve the JournalEntry
- `callback` - Callback function which is called with any error and the status of the persistent JournalEntry

#### deletePayment(idOrEntity, callback)

Deletes the Payment from QuickBooks

**Arguments**

- `idOrEntity` - The persistent Payment to be deleted, or the Id of the Payment, in which case an extra GET request will be issued to first retrieve the Payment
- `callback` - Callback function which is called with any error and the status of the persistent Payment

#### deletePurchase(idOrEntity, callback)

Deletes the Purchase from QuickBooks

**Arguments**

- `idOrEntity` - The persistent Purchase to be deleted, or the Id of the Purchase, in which case an extra GET request will be issued to first retrieve the Purchase
- `callback` - Callback function which is called with any error and the status of the persistent Purchase

#### deletePurchaseOrder(idOrEntity, callback)

Deletes the PurchaseOrder from QuickBooks

**Arguments**

- `idOrEntity` - The persistent PurchaseOrder to be deleted, or the Id of the PurchaseOrder, in which case an extra GET request will be issued to first retrieve the PurchaseOrder
- `callback` - Callback function which is called with any error and the status of the persistent PurchaseOrder

#### deleteRefundReceipt(idOrEntity, callback)

Deletes the RefundReceipt from QuickBooks

**Arguments**

- `idOrEntity` - The persistent RefundReceipt to be deleted, or the Id of the RefundReceipt, in which case an extra GET request will be issued to first retrieve the RefundReceipt
- `callback` - Callback function which is called with any error and the status of the persistent RefundReceipt

#### deleteSalesReceipt(idOrEntity, callback)

Deletes the SalesReceipt from QuickBooks

**Arguments**

- `idOrEntity` - The persistent SalesReceipt to be deleted, or the Id of the SalesReceipt, in which case an extra GET request will be issued to first retrieve the SalesReceipt
- `callback` - Callback function which is called with any error and the status of the persistent SalesReceipt

#### deleteTimeActivity(idOrEntity, callback)

Deletes the TimeActivity from QuickBooks

**Arguments**

- `idOrEntity` - The persistent TimeActivity to be deleted, or the Id of the TimeActivity, in which case an extra GET request will be issued to first retrieve the TimeActivity
- `callback` - Callback function which is called with any error and the status of the persistent TimeActivity

#### deleteTransfer(idOrEntity, callback)

Deletes the Transfer from QuickBooks

**Arguments**

- `idOrEntity` - The persistent Transfer to be deleted, or the Id of the Transfer, in which case an extra GET request will be issued to first retrieve the Transfer
- `callback` - Callback function which is called with any error and the status of the persistent Transfer

#### deleteVendorCredit(idOrEntity, callback)

Deletes the VendorCredit from QuickBooks

**Arguments**

- `idOrEntity` - The persistent VendorCredit to be deleted, or the Id of the VendorCredit, in which case an extra GET request will be issued to first retrieve the VendorCredit
- `callback` - Callback function which is called with any error and the status of the persistent VendorCredit

#### findAccounts(criteria, callback)

Finds all Accounts in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of Accounts

#### findAttachables(criteria, callback)

Finds all Attachables in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of Attachables

#### findBills(criteria, callback)

Finds all Bills in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of Bills

#### findBillPayments(criteria, callback)

Finds all BillPayments in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of BillPayments

#### findBudgets(criteria, callback)

Finds all Budgets in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of Budgets

#### findClasses(criteria, callback)

Finds all Classs in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of Classes

#### findCompanyInfos(criteria, callback)

Finds all CompanyInfos in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of CompanyInfos

#### findCreditMemos(criteria, callback)

Finds all CreditMemos in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of CreditMemos

#### findCustomers(criteria, callback)

Finds all Customers in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of Customers

#### findDepartments(criteria, callback)

Finds all Departments in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of Departments

#### findDeposits(criteria, callback)

Finds all Deposits in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of Deposits

#### findEmployees(criteria, callback)

Finds all Employees in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of Employees

#### findEstimates(criteria, callback)

Finds all Estimates in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of Estimates

#### findInvoices(criteria, callback)

Finds all Invoices in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of Invoices

#### findItems(criteria, callback)

Finds all Items in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of Items

#### findJournalCodes(criteria, callback)

Finds all JournalCodes in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of JournalCodes

#### findJournalEntries(criteria, callback)

Finds all JournalEntrys in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of JournalEntries

#### findPayments(criteria, callback)

Finds all Payments in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of Payments

#### findPaymentMethods(criteria, callback)

Finds all PaymentMethods in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of PaymentMethods

#### findPreferenceses(criteria, callback)

Finds all Preferencess in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of Preferences

#### findPurchases(criteria, callback)

Finds all Purchases in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of Purchases

#### findPurchaseOrders(criteria, callback)

Finds all PurchaseOrders in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of PurchaseOrders

#### findRefundReceipts(criteria, callback)

Finds all RefundReceipts in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of RefundReceipts

#### findSalesReceipts(criteria, callback)

Finds all SalesReceipts in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of SalesReceipts

#### findTaxAgencies(criteria, callback)

Finds all TaxAgencys in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of TaxAgencies

#### findTaxCodes(criteria, callback)

Finds all TaxCodes in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of TaxCodes

#### findTaxRates(criteria, callback)

Finds all TaxRates in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of TaxRates

#### findTerms(criteria, callback)

Finds all Terms in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of Terms

#### findTimeActivities(criteria, callback)

Finds all TimeActivitys in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of TimeActivities

#### findVendors(criteria, callback)

Finds all Vendors in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of Vendors

#### findVendorCredits(criteria, callback)

Finds all VendorCredits in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of VendorCredits

#### findExchangeRates(criteria, callback)

Finds all ExchangeRates in QuickBooks, optionally matching the specified criteria

**Arguments**

- `criteria` - (Optional) String or single-valued map converted to a where clause of the form "where key = 'value'"
- `callback` - Callback function which is called with any error and the list of ExchangeRates

#### reportBalanceSheet(options, callback)

Retrieves the BalanceSheet Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the BalanceSheet Report

#### reportProfitAndLoss(options, callback)

Retrieves the ProfitAndLoss Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the ProfitAndLoss Report

#### reportProfitAndLossDetail(options, callback)

Retrieves the ProfitAndLossDetail Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the ProfitAndLossDetail Report

#### reportTrialBalance(options, callback)

Retrieves the TrialBalance Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the TrialBalance Report

#### reportCashFlow(options, callback)

Retrieves the CashFlow Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the CashFlow Report

#### reportInventoryValuationSummary(options, callback)

Retrieves the InventoryValuationSummary Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the InventoryValuationSummary Report

#### reportCustomerSales(options, callback)

Retrieves the CustomerSales Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the CustomerSales Report

#### reportItemSales(options, callback)

Retrieves the ItemSales Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the ItemSales Report

#### reportCustomerIncome(options, callback)

Retrieves the CustomerIncome Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the CustomerIncome Report

#### reportCustomerBalance(options, callback)

Retrieves the CustomerBalance Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the CustomerBalance Report

#### reportCustomerBalanceDetail(options, callback)

Retrieves the CustomerBalanceDetail Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the CustomerBalanceDetail Report

#### reportAgedReceivables(options, callback)

Retrieves the AgedReceivables Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the AgedReceivables Report

#### reportAgedReceivableDetail(options, callback)

Retrieves the AgedReceivableDetail Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the AgedReceivableDetail Report

#### reportVendorBalance(options, callback)

Retrieves the VendorBalance Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the VendorBalance Report

#### reportVendorBalanceDetail(options, callback)

Retrieves the VendorBalanceDetail Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the VendorBalanceDetail Report

#### reportAgedPayables(options, callback)

Retrieves the AgedPayables Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the AgedPayables Report

#### reportAgedPayableDetail(options, callback)

Retrieves the AgedPayableDetail Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the AgedPayableDetail Report

#### reportVendorExpenses(options, callback)

Retrieves the VendorExpenses Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the VendorExpenses Report

#### reportTransactionList(options, callback)

Retrieves the TransactionList Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the TransactionList Report

#### reportGeneralLedgerDetail(options, callback)

Retrieves the GeneralLedgerDetail Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the GeneralLedgerDetail Report

#### reportDepartmentSales(options, callback)

Retrieves the DepartmentSales Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the DepartmentSales Report

#### reportClassSales(options, callback)

Retrieves the ClassSales Report from QuickBooks

**Arguments**

- `options` - (Optional) Map of key-value pairs passed as options to the Report
- `callback` - Callback function which is called with any error and the ClassSales Report

#### getInvoicePdf(id, callback)

Retrieves the Invoice PDF from QuickBooks

**Arguments**

- `id` - The Id of persistent Invoice
- `callback` - Callback function which is called with any error and the Invoice PDF

#### getCreditMemoPdf(id, callback)

Retrieves the Credit Memo PDF from QuickBooks

**Arguments**

- `id` - The Id of persistent Credit Memo
- `callback` - Callback function which is called with any error and the Credit Memo PDF

#### getSalesReceiptPdf(id, callback)

Retrieves the SalesReceipt PDF from QuickBooks

**Arguments**

- `id` - The Id of persistent SalesReceipt
- `callback` - Callback function which is called with any error and the persistent SalesReceipt PDF

#### sendInvoicePdf(id, sendTo, callback)

Emails the Invoice PDF from QuickBooks to the address supplied in Invoice.BillEmail.EmailAddress or the specified 'sendTo' address

**Arguments**

- `Id` - The Id of persistent Invoice
- `sendTo` - (Optional) optional email address to send the PDF to. If not provided, address supplied in Invoice.BillEmail.EmailAddress will be used
- `callback` - Callback function which is called with any error and the Invoice PDF

#### sendCreditMemoPdf(id, sendTo, callback)

Emails the Credit Memo PDF from QuickBooks to the address supplied in CreditMemo.BillEmail.EmailAddress or the specified 'sendTo' address

**Arguments**

- `Id` - The Id of persistent Credit Memo
- `sendTo` - (Optional) optional email address to send the PDF to. If not provided, address supplied in Credit Memo.BillEmail.EmailAddress will be used
- `callback` - Callback function which is called with any error and the Credit Memo PDF

#### sendEstimatePdf(id, sendTo, callback)

Emails the Estimate PDF from QuickBooks to the address supplied in Estimate.BillEmail.EmailAddress or the specified 'sendTo' address

**Arguments**

- `Id` - The Id of persistent Estimate
- `sendTo` - (Optional) optional email address to send the PDF to. If not provided, address supplied in Estimate.BillEmail.EmailAddress will be used
- `callback` - Callback function which is called with any error and the Estimate PDF

#### sendSalesReceiptPdf(id, sendTo, callback)

Emails the SalesReceipt PDF from QuickBooks to the address supplied in SalesReceipt.BillEmail.EmailAddress or the specified 'sendTo' address

**Arguments**

- `Id` - The Id of persistent SalesReceipt
- `sendTo` - (Optional) optional email address to send the PDF to. If not provided, address supplied in SalesReceipt.BillEmail.EmailAddress will be used
- `callback` - Callback function which is called with any error and the SalesReceipt PDF

#### sendPurchaseOrder(id, sendTo, callback)

Emails the Purchase Order from QuickBooks to the address supplied in PurchaseOrder.POEmail.Address or the specified 'sendTo' address

**Arguments**

- `Id` - The Id of persistent Purchase Order
- `sendTo` - (Optional) optional email address to send the email to. If not provided, address supplied in PurchaseOrder.POEmail.Address will be used
- `callback` - Callback function which is called with any error and the PurchaseOrder PDF

#### batch(items, callback)

Batch operation to enable an application to perform multiple operations in a single request. The following batch items are supported:

- create
- update
- delete
- query

* The maximum number of batch items in a single request is 30.

**Arguments**

- `items` - JavaScript array of batch items
- `callback` - Callback function which is called with any error and list of BatchItemResponses

#### changeDataCapture(entities, since, callback)

The change data capture (CDC) operation returns a list of entities that have changed since a specified time.

**Arguments**

- `entities` - Comma separated list or JavaScript array of entities to search for changes
- `since` - JavaScript Date or string representation of the form '2012-07-20T22:25:51-07:00' to look back for changes until
- `callback` - Callback function which is called with any error and list of changes
