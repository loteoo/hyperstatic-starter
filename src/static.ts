import puppeteer from 'puppeteer'
import fse from 'fs-extra'
import path from 'path'
import crypto from 'crypto'
import replace from 'replace-in-file'
import handler from 'serve-handler'
import http from 'http'

const createStaticServer = (port, distFolder) =>
  http.createServer((request, response) =>
    handler(request, response, {
      public: distFolder,
      rewrites: [
        { source: '**/*', 'destination': '/index.html' }
      ]
    })
  ).listen(port)


interface StaticOptions {
  port?: number;
  distFolder?: string;
  entryPoint?: string;
  extraPages?: string[]
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}

const renderPages = async ({ port = 54322, distFolder = 'dist', entryPoint = '/', extraPages = [] }: StaticOptions) => {
  try {

    // Spin up a static server to use for prerendering with pupeteer
    await createStaticServer(port, distFolder)

    const baseUrl = `http://localhost:${port}`

    const cache = {}

    // Initial render queue
    const renderQueue = [
      entryPoint,
      ...extraPages
    ]

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.exposeFunction('registerPath', (path: string) => {
      if (!renderQueue.includes(path)) {
        console.log(`Found path ${path}, adding to render queue`);
        renderQueue.push(path);
      }
    });

    await page.exposeFunction('cacheData', (key: string, data: any) => {
      cache[key] = data;
    });

    // Load page
    await page.goto(`${baseUrl}${entryPoint}`);

    // Pre-render loop
    for (let i = 0; i < renderQueue.length; i++) {
      const pagePath = renderQueue[i]

      console.log(`Rendering page: ${pagePath} ...`)

      page.on('pageerror', function (err) {
        console.log(`Runtime error in page: ${pagePath} Error: ${err.toString()}`)
        // process.exit(1)
      })

      // Navigate to the page client-side
      await page.evaluate((path) => {
        window.history.pushState(null, '', path)
        window.dispatchEvent(new CustomEvent("pushstate"))
      }, pagePath)

      await delay(5000);

      const html = await page.content(); // serialized HTML of page DOM.

      // Invalid pages return empty strings as HTML. Do not save those.
      // TODO: remove this check if possible
      if (!html) {
        console.log('Empty page: ' + pagePath)
        continue
      }

      // Convert URI path to absolute disk path in the output dir
      const pageFilePath = pagePath === '/' ? '/index.html' : `${pagePath}/index.html`
      const pageFileAbsolutePath = path.join(process.cwd(), distFolder, pageFilePath)

      // Remove basepath from rendered HTML
      // Ex: <script src="http://localhost/about" /> becomes just <script src="/about" />
      const cleanedUpHtml = html.replace(new RegExp(baseUrl, 'gi'), '')

      await fse.outputFile(pageFileAbsolutePath, cleanedUpHtml)
      console.log(`Page created: ${pageFileAbsolutePath}`)
    }


    await browser.close();

    console.log('Pages rendered!')





    console.log('Saving static data...')

    const cacheKeys = Object.keys(cache)

    let cacheUrlArray = []

    for (let i = 0; i < cacheKeys.length; i++) {
      const key = cacheKeys[i]
      const data = cache[key]
      const fileName = crypto.createHash('md5').update(key).digest('hex') + '.json'
      const filePath = '/data/' + fileName

      cacheUrlArray.push(filePath)

      const dataAbsolutePath = path.join(distFolder, filePath)
      await fse.outputFile(dataAbsolutePath, JSON.stringify(data))
      console.log(`Data saved: ${dataAbsolutePath}`)
    }

    const cacheFetchUrls = cacheKeys.reduce((obj, curr, i) => ({
      ...obj,
      [curr]: cacheUrlArray[i]
    }), {})

    console.log('Updating bundles...')

    const inlineData = {
      cache: cacheFetchUrls,
    }

    const results = await replace({
      files: distFolder + '/**/*.html',
      from: '</body>',
      to: `<script>window.HYPERSTATIC_DATA = ${JSON.stringify(inlineData)}</script></body>`,
      countMatches: true
    })
    console.log('Bundles updated! Results: ')
    results.forEach(result => {
      if (result.hasChanged) {
        console.log(result)
      }
    })


  } catch (error) {
    console.error(error)
    // process.exit(1)
  }

  console.log('Rendering complete! 🎉')

  process.exit(0)
}

renderPages({})