import favicons from 'favicons';
import { readdirSync } from 'fs';
import fs from 'fs/promises';
import path from 'path';

const __dirname = path.resolve();

export default async function generateFavicon() {
  console.log('Generate favicons...');

  const files = await readdirSync(path.join(__dirname, 'public', 'favicons'));

  const image = files.find(name => {
    return new RegExp(
      '^' + 'favicon' + '(?=\\.(png|jpg|jpeg|bmp|svg|webp))',
    ).test(name);
  });

  const src = path.join(__dirname, 'public', 'favicons', image); // Icon source file path.
  const dest = path.join(__dirname, 'dist', 'favicons'); // Output directory path.
  const htmlBasename = 'index.html'; // HTML file basename.

  // Configuration (see above in the README file).
  const configuration = {
    path: '/favicons',
    appName: null,
    appShortName: null,
    appDescription: null,
  };

  // Below is the processing.
  const response = await favicons(src, configuration);
  await fs.mkdir(dest, { recursive: true });
  await Promise.all(
    response.images.map(async image => {
      await fs.writeFile(path.join(dest, image.name), image.contents);
    }),
  );
  await Promise.all(
    response.files.map(async file => {
      await fs.writeFile(path.join(dest, file.name), file.contents);
    }),
  );

  const fileHtml = String(
    (await fs.readFile(path.join(dest, '../', htmlBasename))).toString(),
  );

  const fileChunks = fileHtml.split('<!--Favicon-->');
  fileChunks[1] = response.html.join('\n');
  await fs.writeFile(path.join(dest, '../', htmlBasename), fileChunks.join(''));
}
