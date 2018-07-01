const FileSystem = require('fs');
const Execute = require('child_process').exec;
const Util = require('util');
const UUID = require('uuid/v4');
const MEME_DIRECTORY = './memes';

async function generateMeme(request, reply) {
    // ┌────────────────────┐
    // │  request.payload   │
    // │  ├── image         │
    // │  ├── border        │
    // │  ├── padding       │
    // │  ├── top-text      │
    // │  ├── bottom-text   │
    // │  ├── font-size     │
    // │  └── stroke-width  │
    // └────────────────────┘
    const payload = request.payload;
    const options = [];

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

    // Compute border heights (if applicable).
    if (payload['border'] == 'true') {
        var topLineCount = payload['top-text'].split('\\n').length;
        var bottomLineCount = payload['bottom-text'].split('\\n').length;
        var topBorder = 0, bottomBorder = 0;

        topBorder = Math.round(
            (payload['font-size'] * topLineCount * 1.2) +
            (payload['padding'] * 2));
        bottomBorder = Math.round(
            (payload['font-size'] * bottomLineCount * 1.2) +
            (payload['padding'] * 2));
    }

    // Parse payload parameters.
    options.push(...[
        {'font': 'font/impact.ttf'},
        {'pointsize': payload['font-size']},
        {'background': 'black'},
        {'gravity': 'north'},
        {'splice': `0x${topBorder}`},
        {'annotate': `+0+${payload['padding']} "${payload['top-text']}"`},
        {'gravity': 'south'},
        {'splice': `0x${bottomBorder}`},
        {'annotate': `+0+${payload['padding']} "${payload['bottom-text']}"`},
        {'fill': 'white'}
    ]);

    if (payload['stroke-width'] != 0) {
        options.push(...[
            {'stroke': 'black'},
            {'strokewidth': payload['stroke-width']}
        ]);
    }

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