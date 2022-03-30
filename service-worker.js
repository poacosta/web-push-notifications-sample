self.addEventListener('notificationclose', event => {
    console.log('Notification closed!', event)
})

self.addEventListener('notificationclick', event => {
    if (event.action === "view-order") {
        const githubUser = event.notification.data.githubUser;
        clients.openWindow(`https://github.com/${githubUser}`);
    } else if (event.action === "confirm-order") {
        clients.openWindow(`https://rebrand.ly/funny-dog`);
    } else if (event.action === "") {
        event.waitUntil(
            clients.matchAll().then(clientInSite => {
                const client = clientInSite.find(c => c.visibilityState === "visible")
                if (client !== undefined) {
                    // when the tab is open and visible
                    client.navigate('/hello.html');
                } else {
                    // when there is no tab opened
                    clients.openWindow('/hello.html')
                }
            })
        )
    }

    console.log('Notification clicked!', event)

    // In case we want to hide all notifications as a group
    // self.registration.getNotifications()
    //     .then(notifications =>
    //         notifications.forEach(notification => notification.close())
    //     )
})

self.addEventListener('push', event => {
    const content = JSON.parse(event.data.text());

    const options = {
        body: `${content.branch} te ha solicitado un pedido.`,
        icon: `${content.logo}`,
        actions: [{
                action: "view-order",
                title: "Ver Orden"
            },
            {
                action: "confirm-order",
                title: "Confirmar Orden"
            },
        ],
        data: {
            notificationTime: Date.now(),
            githubUser: "poacosta"
        }
    }

    event.waitUntil(
        clients.matchAll()
        .then(clientInSite => {
            if (clientInSite.length === 0) {
                self.registration.showNotification(`Tienes una nueva orden por ${content.total}`, options)
            } else {
                clientInSite[0].postMessage(content)
            }
        })
    )
})
