module.exports = function formatTimeHuman(duration) {
    let seconds = parseInt((duration/1000) % 60);
    let minutes = parseInt((duration/1000 * 60) % 60);
    let hours = parseInt((duration/1000 * 60 * 60) % 24);

    if (hours > 0) {
        return `${hours} horas, ${minutes}, minutos e ${seconds} segundos`;
    }
    if (minutes > 0) {
        return `${minutes}, minutos e ${seconds} segundos`;
    }
    return `${seconds} segundos`;
}
