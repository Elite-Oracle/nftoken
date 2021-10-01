const cardano = require("./cardano");

const wallet = cardano.wallet("ISADA");

const mintScript = {
    keyHash: cardano.addressKeyHash(wallet.name),
    type: "sig",
}

const POLICY_ID = cardano.transactionPolicyid(mintScript);

const ASSET_NAME = "ISADANFT";

const ASSET_ID = POLICY_ID + "." + ASSET_NAME;

const metadata = {
    721: {
        [POLICY_ID]: {
            [ASSET_NAME]: {
                name: ASSET_NAME,
                image: "ipfs://QmVCyt9Uf68tLLStXoGzHdjmApj6xEGt91gJZqoZPphxJ6",
                description: "iStakeADA NFT #003",
                type: "image/jpeg",
                src: "ipfs://QmVCyt9Uf68tLLStXoGzHdjmApj6xEGt91gJZqoZPphxJ6"
            }
        }
    }
}

const tx = {
    txIn: wallet.balance().utxo,
    txOut: [
        {
            address: wallet.paymentAddr,
            value: { ...wallet.balance().value, [ASSET_ID]: 1 }
        }
    ],
    mint: [{ action: "mint", quantity: 1, asset: ASSET_ID }],
    metadata,
    witnessCount: 2
}

const buildTransaction = (tx) => {

    const raw = cardano.transactionBuildRaw(tx);
    const fee = cardano.transactionCalculateMinFee({
        ...tx,
        txBody: raw
    });

    tx.txOut[0].value.lovelace -= fee;

    return cardano.transactionBuildRaw({ ...tx, fee });
}

const raw = buildTransaction(tx);

const signTransaction = (wallet, tx) => {

    return cardano.transactionSign({
        signingKeys: [wallet.payment.skey, wallet.payment.skey],
        txBody: tx
    });
}

const signed = signTransaction(wallet, raw);

// console.log(cardano.transactionView({ txFile: signed }));

const txHash = cardano.transactionSubmit(signed)

console.log(txHash)