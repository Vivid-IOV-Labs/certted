<script setup>

import { ref } from 'vue'
import firestore from '@/firestore'

const checkurl = ref();
const dbResultFound = ref({});

async function tryCheckThelink(){
    let dbResults = await firestore.getDataInDb({value: checkurl._value});
    dbResultFound.value = dbResults[0];

}

</script>

<template>
  <div class="text-center">
        <h1 class="text-white text-6xl font-bold mb-8">Sign your work. Beat the spam.</h1>
        <div class="flex justify-center items-center space-x-4">
            <input v-model="checkurl"
                class="text-black flex h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-l-full pl-6 pr-6 py-3 w-[400px]"
                placeholder="Add website, video or image url address here">
            <button :disabled="!checkurl" @click="tryCheckThelink"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 rounded-r-full bg-white text-[#6f42c1] px-6 py-3">
                Check Link
            </button>
        </div>
        <div  class="display-box mt-8 border border-white p-4 rounded-lg text-left">
        <!-- Place your display box content here -->
        <p ><strong>URL: </strong>{{ dbResultFound.url }}</p>
        <p><strong>Wallet Address: </strong>{{ dbResultFound.blockchain_wallet_address}}</p>
        <p><strong>Signed URL: </strong> {{   dbResultFound.signed_url }}</p>
        <p> <strong>XRPL Explorer: </strong> {{ dbResultFound.recorded_by_blockchain_transaction_url}}</p>
        <!-- <p> <strong>Created At: </strong> {{ dbResultFound.createdAt }}</p> -->
        </div>
    </div>
</template>

<style></style>
