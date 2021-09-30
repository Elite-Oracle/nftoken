const cardano = require('./cardano')

const createWallet = (account) => {
    const payment = cardano.addressKeyGen(account);
    const stake = cardano.stakeAddressKeyGen(account);
    cardano.stakeAddressBuild(account);
    cardano.addressBuild(account, {
        paymentVkey: payment.vkey,
        stakeVkey: stake.vkey,
    });
    return cardano.wallet(account);
};

createWallet("ISADA")

// const cardano = require('./cardano')

// const createWallet = name => {
//     cardano.addressKeyGen(name)
//     cardano.stakeAddressKeyGen(name)
//     cardano.stakeAddressBuild(name)
//     cardano.addressBuild(name)
//     return cardano.wallet(name)
// };

// createWallet("ISADA")