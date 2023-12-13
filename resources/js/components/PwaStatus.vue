<template>
    <div class="pwa-status">
        <h2>PWA Status</h2>

        <h3>Online/Offline</h3>
        <i class="circle" :class="onlineAndConnected ? 'online' : 'offline'" />
        <div v-if="onlineAndConnected">Online</div>
        <div v-else>Offline</div>

        <h3>Install?</h3>
        <div v-if="installEvent">
            <button @click="install">Install PWA</button>
        </div>
        <div v-else>Cannot install (or already installed)</div>

        <h3>Update?</h3>
        <div v-if="showRefresh">
            New version available:
            <button @click="updateSW(true)">Update</button>
        </div>
        <div v-else>No update needed</div>

        <h3>Offline Image</h3>
        <p>
            This image will be automatically added by vite-plugin-pwa to the SW cache and will work
            offline.
        </p>
        <img src="../../images/hills.jpg" class="img-100" />
    </div>
</template>

<script lang="ts" setup>
import { usePwa } from '../composables/usePwa'
import { watch } from 'vue'

const { installEvent, onlineAndConnected, updateSW, showRefresh } = usePwa()

// If createPwa caught the install event then this exposes it for the user to
// trigger via a button in the UI. This won't work in some browsers - eg Safari.
function install() {
    if (installEvent.value) {
        installEvent.value.prompt()
    }
}

// Handle going on and offline here. You can do things like write data to local
// storage when going offline, and upload it back to a server when going online.
watch(
    () => onlineAndConnected.value,
    (newVal) => {
        if (newVal) {
            console.log('Now online')
        } else {
            console.log('Now offline')
        }
    }
)
</script>

<style lang="css" scoped>
.pwa-status {
    background: silver;
    padding: 10px;
    max-width: 600px;
}

.circle {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    display: inline-block;
}

.circle.online {
    background-color: green;
}

.circle.offline {
    background-color: red;
}

.img-100 {
    width: 100%;
}
</style>
