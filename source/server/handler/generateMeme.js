const Spawn = require('child_process').spawn;

function generateMeme(request, reply) {
    // -------------------------
    // request.payload
    // ├── image
    // ├── top-text
    // ├── bottom-text
    // ├── font-size
    // ├── line-spacing
    // └── stroke-width
    // -------------------------
    const payload = request.payload;
    const options = [];

    options.push(...[
        {'font': 'source/server/font/impact.ttf'},
        {'pointsize': payload['font-size']},
        {'interline-spacing': payload['line-spacing']},
        {'gravity': 'north'},
        {'annotate': `+0+0 "${payload['top-text']}"`},
        {'gravity': 'south'},
        {'annotate': `+0+0 "${payload['bottom-text']}"`},
        {'fill': 'white'},
        {'stroke': 'black'},
        {'strokewidth': payload['stroke-width']}
    ]);

    console.log(commandBuilder(options, 'graph.png', 'output.png'));

    // -----------------------------------------------
    // TODO: Generate the meme from the image here.
    // -----------------------------------------------

    return reply.file('graph.png');
}

function commandBuilder(options, input, output) {
    var flags = '';
    options.forEach(flag => {
        console.log(flag);
        Object.entries(flag).forEach(([key, value]) => {
            flags += `-${key} ${value} `;
        });
    });

    return `magick convert ${flags} ${input} ${output}`;
}

module.exports = generateMeme;