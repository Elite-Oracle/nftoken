const cardano = require("./cardano")

const sender = cardano.wallet("ISADA")

console.log(
    "Balance of Sender wallet: " +
    cardano.toAda(sender.balance().value.lovelace) + " ADA"
)

const receiver = "addr_test1qqnv29mfm0c05xrgcn2p8p2g44a7rm5rfqyw9q0fx2jk2vjakdcdu7zdu3mah0c43dx94dmjvgr9e9qsxwm7faw494tqka2y75"

const txInfo = {
    txIn: cardano.queryUtxo(sender.paymentAddr),
    txOut: [
        {
            address: sender.paymentAddr,
            value: {
                lovelace: sender.balance().value.lovelace - cardano.toLovelace(1.5)
            }
        },
        {
            address: receiver,
            value: {
                lovelace: cardano.toLovelace(1.5),
                "86091988254b1261a5b6f2b5938d23108cdd84439cc94cb0547338f5.ISADANFT": 1
            }
        }
    ]
}

const raw = cardano.transactionBuildRaw(txInfo)

const fee = cardano.transactionCalculateMinFee({
    ...txInfo,
    txBody: raw,
    witnessCount: 1
})

txInfo.txOut[0].value.lovelace -= fee

const tx = cardano.transactionBuildRaw({ ...txInfo, fee })

const txSigned = cardano.transactionSign({
    txBody: tx,
    signingKeys: [sender.payment.skey]
})

const txHash = cardano.transactionSubmit(txSigned)

console.log(txHash)