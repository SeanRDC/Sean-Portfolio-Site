import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const SITE_URL = 'https://www.seandelacruz.com'

// Sub-routes that get their own index.html at build time, so crawlers and link
// previews see the right title/description/canonical without running any JS.
// Keep in sync with src/routes.tsx and public/sitemap.xml.
const ROUTE_META = [
  {
    path: '/certificates-archive',
    title: 'Certificates | Sean Dela Cruz',
    description:
      'Professional certifications, academic milestones, and technical achievements earned by Sean Dela Cruz.',
  },
]

function routeMeta(): Plugin {
  let outDir = 'dist'

  const capture = (html: string, pattern: RegExp) => {
    const match = html.match(pattern)
    if (!match) throw new Error(`route-meta: ${pattern} not found in index.html`)
    return match[1]
  }

  return {
    name: 'route-meta',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const home = readFileSync(resolve(outDir, 'index.html'), 'utf8')
      const homeTitle = capture(home, /<title>([^<]*)<\/title>/)
      const homeDescription = capture(home, /<meta\s+name="description"\s+content="([^"]*)"/)
      const homeUrl = capture(home, /<link\s+rel="canonical"\s+href="([^"]*)"/)

      for (const route of ROUTE_META) {
        const url = SITE_URL + route.path
        const html = home
          .replaceAll(homeTitle, route.title)
          .replaceAll(homeDescription, route.description)
          .replace(/(<link\s+rel="canonical"\s+href=")[^"]*/, `$1${url}`)
          .replace(/(<meta\s+property="og:url"\s+content=")[^"]*/, `$1${url}`)

        if (!html.includes(`href="${url}"`) || html.includes(`href="${homeUrl}"`)) {
          throw new Error(`route-meta: canonical for ${route.path} was not rewritten`)
        }

        const dir = resolve(outDir, route.path.slice(1))
        mkdirSync(dir, { recursive: true })
        writeFileSync(resolve(dir, 'index.html'), html)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), routeMeta()],
})
