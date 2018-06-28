const MEME_DIRECTORY = './memes';

async function serveMeme(request, reply) {
    const uuid = encodeURIComponent(request.params.uuid);
    return reply.file(`${MEME_DIRECTORY}/${uuid}.png`);
}

module.exports = serveMeme;