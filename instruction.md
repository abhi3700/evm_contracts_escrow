# Escrow Smart Contract Functionality

## Has a `depositFor(...)` function

1. When the function is called it takes the deposited amount of ETH from the `payer` account that called `depositFor()`.
2. Sets the `payee` address.
3. The ETH is held by the smart contract in "escrow" for the `payee`.
4. Sets a separate releaser account that will release the transfer to the receiver. This third account will be a different account than the depositing account or the receiver.
5. This function can be called by anyone to create their own escrow. The contract can manage multiple escrows for different `payer`, `payee` and `releaser` accounts with separate ETH deposit amounts.
6. Write tests for each of the conditions.

## Has a `release(...)` function

1. Transfers the tokens to the receiver address that was specified when the escrow was created with the `depositFor` function call
2. `release` can only be called by the releaser account that was specified when the escrow was created with the `depositFor` function call
3. Write tests for each of thes conditions.
