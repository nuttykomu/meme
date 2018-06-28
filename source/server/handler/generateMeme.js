const FileSystem = require('fs');
const Execute = require('child_process').exec;
const Util = require('util');
const UUID = require('uuid/v4');
const MEME_DIRECTORY = './memes';

async function generateMeme(request, reply) {
    // ┌────────────────────┐
    // │  request.payload   │
    // │  ├── image         │
    // │  ├── top-text      │
    // │  ├── bottom-text   │
    // │  ├── font-size     │
    // │  ├── line-spacing  │
    // │  └── stroke-width  │
    // └────────────────────┘
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

    // Create meme directory.
    await FileSystem.stat(MEME_DIRECTORY, async (error) => {
        if (error != null) {
            await FileSystem.mkdir(MEME_DIRECTORY);
        }
    });

    // Save image to disk.
    const filename = `${UUID()}.png`;
    const file = FileSystem.createWriteStream(`${MEME_DIRECTORY}/${filename}`);
    payload.image.pipe(file);

    await new Promise((resolve, reject) => {
        payload.image.on('end', () => resolve());
        payload.image.on('error', reject);
    });

    // Generate the meme.
    const command = commandBuilder(options, filename);
    await Util.promisify(Execute)(command);
    return reply.file(`${MEME_DIRECTORY}/${filename}`);
}

function commandBuilder(options, filename) {
    var flags = '';
    options.forEach(flag => {
        Object.entries(flag).forEach(([key, value]) => {
            flags += `-${key} ${value} `;
        });
    });
    const target = `${MEME_DIRECTORY}/${filename} `;
    return `magick convert ${flags} ${target.repeat(2)}`;
}

module.exports = generateMeme;