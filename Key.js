const callToVault = key => new Promise((res, rej) => setTimeout(() => {
    if (key === "bav") {
        rej(new Error("undefined key"))
    } else {
        res(`${key}-${new Date()}`)
    }
}, 1000))

class Key {
    async init(name, refreshInterval) {
        this.name = name
        this.refreshInterval = refreshInterval
        this.refreshTimeout = refreshInterval * 2
        await this.updateKey()
        this.refreshPol();
    }

    getValue() {
        this.lastUsed = Date.now();
        return this.value;
    }

    async updateKey() {
        this.value = await callToVault(this.name)
    }

    refreshPol() {
        console.log("refresh interval started");
        this.interval = setInterval(async () => {
            const diff = Date.now() - this.lastUsed;
            console.log(diff, this.refreshTimeout);
            if (diff > this.refreshTimeout) {
                console.log("stopping key rotation: ", this.name)
                clearInterval(this.interval)
            } else {
                console.log("rotating key: ", this.name)
                await this.updateKey()
            }
        }, this.refreshInterval)
    }
}

module.exports = Key;