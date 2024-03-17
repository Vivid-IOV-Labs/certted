import { Client, Wallet, xrpToDrops, convertStringToHex } from 'xrpl';

const xrpldevwallet = import.meta.env.VITE_XRPL_TESTNET_WALLET_SEED;

const wallet = Wallet.fromSeed(xrpldevwallet)

// Connect -------------------------------------------------------------------
export default async function main(o) {
 
    const urlHex = convertStringToHex(o.url)
    const urlWalletAddress = o.walletAddress.substring(2)
    const urlSignedUrl = o.signedUrl.substring(2)

    const client = new Client('wss://s.devnet.rippletest.net:51233/')
    await client.connect()

    const prepared = await client.autofill({
        "TransactionType": "Payment",
        "Account": wallet.address,
        "Amount": xrpToDrops("22"),
        "Destination": "rMnEBvVXfCxFeWGms1eTHEDnPhtgbrF4D1",
        "Memos": [
            {
                "Memo": {
                    "MemoData": `${urlHex}`,
                    "MemoFormat": "746578742f706c61696e",
                    "MemoType": "75726c"
                }
            },
            {
                "Memo": {
                    "MemoData": `${urlSignedUrl}`,
                    "MemoFormat": "746578742f706c61696e",
                    "MemoType": "7369676e656455726c"
                }
            },
            {
                "Memo": {
                    "MemoData": `${urlWalletAddress}`,
                    "MemoFormat": "746578742f706c61696e",
                    "MemoType": "77616c6c6574416464726573"
                }
            },
            {
                "Memo": {
                    "MemoData": "656970313535",
                    "MemoFormat": "746578742f706c61696e",
                    "MemoType": "636861696e4964"
                }
            }
        ],
    })

    const signed = wallet.sign(prepared)

     // Submit signed blob --------------------------------------------------------
     const tx = await client.submitAndWait(signed.tx_blob)

     // Check transaction results -------------------------------------------------
     console.log("Transaction result:", tx.result.meta.TransactionResult)

    client.disconnect()

    return `https://devnet.xrpl.org/transactions/${signed.hash}/detailed`


}