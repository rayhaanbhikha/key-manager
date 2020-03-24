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
        }, this.refreshInterval)
    }
}