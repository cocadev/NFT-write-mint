require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MetaSalt.sol/NFT.json")
const contractAddress = "0x570d251af3cc07be28d930fab0f31cd338eac8f3"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount('0x4e37e532354c6D242168A570AFDBDd2fD7faB2F8', "latest") + 60 //get latest nonce
    //the transaction
    console.log(nonce)
    const tx = {
      from: '0x4e37e532354c6D242168A570AFDBDd2fD7faB2F8',
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      data: nftContract.methods.mintToken(tokenURI).encodeABI(),
    }
  
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              )
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              )
            }
          }
        )
      })
      .catch((err) => {
        console.log(" Promise failed:", err)
      })
  }
  mintNFT(
    JSON.stringify({
      image: 'https://ipfs.moralis.io:2053/ipfs/Qmf49rrQJpHkJVhtDEbzxwpS72encEhyetUvdbnRD2B5Hr',
      description: '25 ehters',
      name: 'Crypto Funcky 3',
      price: '0.05'
    })
  )
  
  // mintNFT(
  //   "https://gateway.pinata.cloud/ipfs/QmZRfpGWP1EYrwhHLcM2qhZETHSGGGAtcRecnjtj4pSP13"
  // )
  