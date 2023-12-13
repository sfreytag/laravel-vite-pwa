import { registerSW } from 'virtual:pwa-register'
import { ref } from 'vue'

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent
    }
}

// Types taken from https://stackoverflow.com/a/67171375/3861550
interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[]
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed'
        platform: string
    }>
    prompt(): Promise<void>
}

export function usePwa() {
    // The PWA install event, which is captured and stored here so that we can
    // control the install process.
    const installEvent = ref<BeforeInstallPromptEvent | undefined>(undefined)

    // If the service worker detects a new version of the app exists, this flag
    // is set to true and we can use it to prompt the user to update the app.
    const showRefresh = ref(false)

    // The function to update the app.
    const updateSW = ref<(reloadPage?: boolean | undefined) => Promise<void>>(() => {
        return Promise.reject()
    })

    // A browser can be online (eg connected to WiFi) but not able to use the
    // web (eg WiFi has dead gateway). We use this state to track if the user
    // is both online AND connected.
    const onlineAndConnected = ref(true)

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
        window.addEventListener('offline', (e) => {
            onOffline()
        })
        window.addEventListener('online', (e) => {
            onOnline()
        })

        // Work out if the user is both online AND cannected
        getOnlineAndConnected()
    }

    return { createPwa, installEvent, showRefresh }
}
