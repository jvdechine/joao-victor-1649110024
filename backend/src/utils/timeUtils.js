function timeUtils(){
    function getDurationInMilliseconds(start) {
        const NS_PER_SEC = 1e9
        const NS_TO_MS = 1e6
        const diff = process.hrtime(start)

        var ms = (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
        var sec = Math.floor((ms / 1000) % 60);
        var restMs = Math.round(ms - (sec * 1000), 2);

        return `${sec} segundos e ${restMs} milessegundos`;
    }

    return {
        getDurationInMilliseconds
    }
}

module.exports = timeUtils;