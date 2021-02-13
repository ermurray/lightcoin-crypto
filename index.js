class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let total = 0;
    for (const transaction of this.transactions) {
      total += transaction.value;
    }

    return total;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
    }
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }
  isAllowed() {
    return ((this.account.balance - this.ammount >= 0) ? true : false);
  }
}

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);



