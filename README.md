# NestJs transaction demo

### This repo basically has two branches:

- `without-transaction` which illustrates why transaction is required.
- `with-transaction` which illustrates how to implement transaction with NestJS using NPM package: [nest-tranct](https://www.npmjs.com/package/nest-transact?ref=hackernoon.com)

## Scenario

Suppose there are two users A and B and their respective wallets which stores amount. Let's say user A is tranfering some amount to user B i.e. from user A's wallet to user B's wallet. Here, are the steps to be carried out:

## Constraints

1. Both wallet should be in Active stage to receive and transfer amount.
2. Source account should always have greater or equal amount that is being transferred.

## Steps:

1. Check if user A's wallet has the amount greater than or equal to the amount that is being transferred.
2. Subtract the amount from user A's wallet.
3. Check if user B's wallet is not in dormant stage.
4. Add the amount to user B's wallet.

## Why transaction is required?

What if Steps 1 and 2 are satisfied but not 3? A is not happy right?

## Run the demo

1. Setup a test db and change the creds in `app.module.ts`. Haven't setup env yet :(
2. To understand why transaction is required:

   - Clone the project and checkout to `without-transaction` branch

     ```
     npm i
     npm run start:dev
     ```

3. To understand how to implement transaction:

   - Clone the project and checkout to `with-transaction` branch

     ```
     npm i
     npm run start:dev
     ```

4. You can play with swagger APS at `localhost:3000/api`

## References:

- [Transactions blog](https://hackernoon.com/the-most-convenient-ways-of-writing-transactions-within-the-nestjs-typeorm-stack-3q3q33jd)
- [NPM Package](https://github.com/alphamikle/nest_transact)
