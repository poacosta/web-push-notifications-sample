const webPush = require('web-push');
const faker = require('faker');

const pushSubscription = {
    "endpoint": "https://updates.push.services.mozilla.com/wpush/v2/gAAAAABiQ9AER_M1QgzPWbVk3iwYpPmcmULDIxaL5GJrL346emHA8ze_fU4oHKoLTPCG2huxna20oESIFS0yp30sORtzwT22bkvGCjmQSmM8IACMSwE2fWLGnvtDjmCHZ0mmkg6fodooAlJb_ax1OCz5zkYoxBw28GQIMKZvv0_pD2EzvZPfmvE",
    "expirationTime": null,
    "keys": {
        "auth": "6Wj8M05Ymroj_dZxW9on8w",
        "p256dh": "BI6CY82FT58ewv16oBcWV9w89dK_-ZaFcGgzL2qLAhqH0TGD1ysrPRCYuWC7B1YBQgK6fkEQ6hbsPjgNLcExxnk"
    }
}

const vapidPublicKey = 'BBjDHF8cFoJznds83RrbZByg-UQCxWTNb9afVNjxjbpIsj2CaJyKDrndm9GwHk9Tbargfzt83gYprv9kl1OvIEU';
const vapidPrivateKey = 'j1bKaA0HcYpB58PW3Ho2wg2WcK7raVplzN7zGo3Pnfw';

const options = {
    TTL: 60,
    vapidDetails: {
        subject: 'mailto: pushers@pushy.com',
        publicKey: vapidPublicKey,
        privateKey: vapidPrivateKey
    }
};

const notify = (subscribers) => {
    const transaction = faker.helpers.createTransaction()

    if (subscribers.size < 1) {
        console.log("No subscribers to notify");
        return;
    }

    subscribers.forEach((subscriber, id) => {
        webPush.sendNotification(
                subscriber,
                JSON.stringify(transaction),
                options
            )
            .then(() => console.log(`${subscribers.size} subscribers notified.`))
            .catch(error => console.error('Error in pushing notification', error))
    })
}

module.exports = {
    notify: notify
}
