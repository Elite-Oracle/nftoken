const cardano = require("./cardano")

// 1. Get the wallet

const wallet = cardano.wallet("ISADA")

// 2. Define mint script

const mintScript = {
    keyHash: cardano.addressKeyHash(wallet.name),
    type: "sig",
}

// 3. Create POLICY_ID

const POLICY_ID = cardano.transactionPolicyid(mintScript)

// 4. Define ASSET_NAME

const ASSET_NAME = "ISADANFT"

// 5. Create ASSET_ID

const ASSET_ID = POLICY_ID + "." + ASSET_NAME

// 6. Define metadata

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

// 7. Define transaction

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

// 8. Build transaction

const buildTransaction = (tx) => {

    const raw = cardano.transactionBuildRaw(tx)
    const fee = cardano.transactionCalculateMinFee({
        ...tx,
        txBody: raw
    })

    tx.txOut[0].value.lovelace -= fee

    return cardano.transactionBuildRaw({ ...tx, fee })
}

const raw = buildTransaction(tx)

// 9. Sign transaction

const signTransaction = (wallet, tx) => {

    return cardano.transactionSign({
        signingKeys: [wallet.payment.skey, wallet.payment.skey],
        txBody: tx
    })
}

const signed = signTransaction(wallet, raw)

// console.log(cardano.transactionView({ txFile: signed }));

// 10. Submit transaction

const txHash = cardano.transactionSubmit(signed)

console.log(txHash)