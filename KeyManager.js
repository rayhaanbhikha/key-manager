class KeyManager {
    constructor() {
        this.refreshInterval = process.env.REFRESH_INTERVAL || 2 * 60 * 1000
        this.apiKeys = {}
    }

    async createKey(keyName) {
        const newKey = new Key()
        await newKey.init(keyName)
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
        const reduceFunc = (acc, [keyName, key]) => ({
            ...acc,
            [keyName]: key.value
        })
        return Object.entries(this.apiKeys).reduce(reduceFunc, {})
    }
}

module.exports = new KeyManager()