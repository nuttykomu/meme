function generateMeme(request, reply) {
    let payload = request.payload;

    // -----------------------------------------------
    // TODO: Generate the meme from the image here.
    // -----------------------------------------------

    return reply.file('graph.png');
}

module.exports = generateMeme;