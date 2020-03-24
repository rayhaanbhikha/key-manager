
const callToVault = key => new Promise((res, rej) => setTimeout(() => {
    if (key === "bav") {
        rej(new Error("undefined key"))
    } else {
        res(`${key}-${new Date()}`)
    }
}, 1000))

const refreshInterval = 1 * 10 * 1000

class Key {
    async init(name) {
        this.name = name
        await this.updateKey()
        this.refreshPol();
    }

    async updateKey() {
        this.value = await callToVault(this.name)
    }

    refreshPol() {
        console.log("refresh interval started");
        setInterval(async () => {
            console.log("refreshin key: ", this.name)
            await this.updateKey()
        }, refreshInterval)
    }
}


class Keys {
    constructor() {
        this.apiKeys = {}
    }

    async createKey(keyName) {
        const newKey = new Key()
        await newKey.init(keyName)
        console.log(newKey);
        return newKey
    }

    getKey(keyName) {
        return this.apiKeys[keyName]
    }

    async fetchKey(keyName) {
        const key = this.getKey(keyName)
        if (key !== undefined) return key;
        const newKey = await this.createKey(keyName);
        this.apiKeys[keyName] = newKey
        return newKey.value;
    }

    listKeys() {
        console.log("\n====keys====\n");
        for (let [keyName, key] of Object.entries(this.apiKeys)) {
            console.log(keyName, key.value)
        }
    }
}

module.exports = new Keys()