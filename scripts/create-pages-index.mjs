import { readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const clientDir = join(process.cwd(), "dist", "client");
const assetsDir = join(clientDir, "assets");
const files = await readdir(assetsDir, { withFileTypes: true });

const assetFiles = await Promise.all(
  files
    .filter((file) => file.isFile())
    .map(async (file) => {
      const { stat } = await import("node:fs/promises");
      return { name: file.name, size: (await stat(join(assetsDir, file.name))).size };
    }),
);

const entry = assetFiles
  .filter((file) => /^index-.*\.js$/.test(file.name))
  .sort((a, b) => b.size - a.size)[0]?.name;
const styles = assetFiles.filter((file) => /^styles-.*\.css$/.test(file.name)).map((file) => file.name);

if (!entry) {
  throw new Error("Could not find built client entry in dist/client/assets.");
}

const cssLinks = styles
  .map((file) => `    <link rel="stylesheet" href="/nineveh-digital-hub/assets/${file}" />`)
  .join("\n");

const html = `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>منصة التحول الرقمي - محافظة نينوى</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap" />
${cssLinks}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/nineveh-digital-hub/assets/${entry}"></script>
  </body>
</html>
`;

await writeFile(join(clientDir, "index.html"), html);
await writeFile(join(clientDir, "404.html"), html);
