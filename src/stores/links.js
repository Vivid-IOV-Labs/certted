import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLinksStore = defineStore('links', () => {
  const signed_url = ref('')
  const url = ref('')
  const blockchain_wallet_address = ref('')
  const recorded_by_blockchain_transaction_url = ref('')
  const createdAt = ref('')
  function setSignedUrl(o) {
    this.signed_url = o.value;
  }
  function setUrl(o) {
    this.url = o.value;
  }
  function setBlockchainWalletAddress(o) {
    this.blockchain_wallet_address = o.value;
  }
  function setRecordedByBlockchainTransactionUrl(o) {
    this.recorded_by_blockchain_transaction_url = o.value;
  }
  function setCreatedAt(o) {
    this.createdAt = o.value;
  }
  function getData(o) {
    return {
      recorded_by_blockchain_transaction_url: this.recorded_by_blockchain_transaction_url,
      blockchain_wallet_address: this.blockchain_wallet_address,
      url: this.url,
      signed_url: this.signed_url,
      createdAt: this.createdAt
    }

  }

  return { createdAt, signed_url, url, blockchain_wallet_address, recorded_by_blockchain_transaction_url, setCreatedAt, setSignedUrl, setUrl, setBlockchainWalletAddress, setRecordedByBlockchainTransactionUrl, getData }
})