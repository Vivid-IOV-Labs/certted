<script setup>

import SignClient from '@walletconnect/sign-client'
import { WalletConnectModal } from '@walletconnect/modal'

import { useLinksStore } from '@/stores/links'

import { ref } from 'vue'

import { useLoading } from 'vue-loading-overlay'

import Xrpl from '@/xrpl'

import firestore from '@/firestore'

const walletConnectProjectID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

const signClient = await SignClient.init({
    projectId: walletConnectProjectID,
})

const walletConnectModal = new WalletConnectModal({
    projectId: walletConnectProjectID,
    standaloneChains: ['eip155:1']
})

const useLinks = useLinksStore();

const url = ref();

const $loading = useLoading({

});

async function trySignThelink() {

    try {
        const { uri, approval } = await signClient.connect({
            requiredNamespaces: {
                eip155: {
                    methods: [
                        'eth_sendTransaction',
                        'eth_signTransaction',
                        'eth_sign',
                        'personal_sign',
                        'eth_signTypedData'
                    ],
                    chains: ['eip155:1'],
                    events: ['chainChanged', 'accountsChanged']
                }
            }
        })

        // Open QRCode modal if a URI was returned.
        if (uri) {
            walletConnectModal.openModal({ uri })
            // Await session approval from the wallet.
            const session = await approval()

            if (session) {

                const acountWords = session.namespaces.eip155.accounts[0].split(':');

                const result = await signClient.request({
                    topic: session.topic,
                    chainId: 'eip155:1',
                    request: {
                        method: 'personal_sign',
                        params: [
                            url._value,
                            acountWords[2]
                        ]
                    }
                })

                useLinks.setSignedUrl({ value: result })
                useLinks.setBlockchainWalletAddress({ value: acountWords[2] })
                useLinks.setUrl({ value: url._value })
                useLinks.setCreatedAt({ value: Date.now() })

                // Close the QRCode modal in case it was open.
                walletConnectModal.closeModal()


                const loader = $loading.show({
                });

                setTimeout(() => {
                    loader.hide()
                }, 50000)

                const txUrl = await Xrpl({
                    url: url._value,
                    walletAddress: acountWords[2],
                    signedUrl: result
                });

                if (txUrl) {
                    useLinks.setRecordedByBlockchainTransactionUrl({ value: txUrl });
                    loader.hide()
                    firestore.addToDb(useLinks.getData())
                    alert("You have successfully signed a URL! Please use 'Check Link' Page to view your data.")

                }

            }

        }
    } catch (e) {
        console.error(e)
    }

};

</script>

<template>
    <div class="text-center">
        <h1 class="text-white text-6xl font-bold mb-8">Sign your work. Beat the spam.</h1>
        <div class="flex justify-center items-center space-x-4">
            <input v-model="url"
                class="text-black flex h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-l-full pl-6 pr-6 py-3 w-[400px]"
                placeholder="Add website, video or image url address here">
            <button :disabled="!url" @click="trySignThelink"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 rounded-r-full bg-white text-[#6f42c1] px-6 py-3">
                Sign Link
            </button>
        </div>
    </div>
</template>
