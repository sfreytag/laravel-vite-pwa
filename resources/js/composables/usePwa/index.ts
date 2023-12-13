import { registerSW } from 'virtual:pwa-register'
import { installEvent, onlineAndConnected, showRefresh, updateSW } from './state'
import type { BeforeInstallPromptEvent } from './types'

export function usePwa() {
    // An event handler for when the user goes offline.
    function onOffline() {
        onlineAndConnected.value = false
    }

    // An event handler for when the user goes offline.
    function onOnline() {
        getOnlineAndConnected()
    }

    // Verify is the browser is both online (has a network connection) and
    // connected (the network connection works)
    function getOnlineAndConnected() {
        fetch('https://httpbin.org/get')
            .then((response) => {
                onlineAndConnected.value = navigator.onLine && response.status === 200
            })
            .catch(() => {
                onlineAndConnected.value = false
            })
    }

    function createPwa() {
        // PWA setup - capture the install event and put it in the store (when available)
        // for the UI to use it later to ask the user to install the app. Does not work
        // on every browser.
        window.addEventListener('beforeinstallprompt', (event: BeforeInstallPromptEvent) => {
            installEvent.value = event
        })

        // PWA setup - register the service worker and supply a callback if the
        // service worker detects that the app needs a refresh event. We can use this
        // to prompt the user to update rather than doing it automatically and
        // potentially losing their offline data.  The reload of the app resets
        // showRefresh back to false so we don't need to take care of that.
        const updateSWFn = registerSW({
            onNeedRefresh() {
                showRefresh.value = true
            },
            onOfflineReady() {
                console.log('Offline ready!')
            }
        })
        updateSW.value = updateSWFn

        // Online/offline - add event handlers to track when the user goes on and
        // offline.
        window.addEventListener('offline', onOffline)
        window.addEventListener('online', onOnline)

        // Work out if the user is both online AND cannected
        getOnlineAndConnected()
    }

    return { createPwa, updateSW, installEvent, showRefresh, onlineAndConnected }
}
