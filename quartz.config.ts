import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "The Lab",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "thelab.shamusmurphy.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    // Inside quartz.config.ts

  theme: {
    fontOrigin: "googleFonts",
    cdnCaching: true,
    typography: {
      header: "DM Serif Display", // A bold, organic serif (great for 'Jungle' vibe)
      body: "Inter",              // Clean and modern legibility
      code: "IBM Plex Mono",
    },
    colors: {
      lightMode: {
        light: "#f5f5f0",       // Warm "parchment" cream
        lightgray: "#e0e0d1",   // Beige/Tan for borders
        gray: "#8f9e94",        // Muted sage for metadata
        darkgray: "#2e3b33",    // Deep forest green for body text
        dark: "#1a261f",        // Near-black green for headings
        secondary: "#3d6b40",   // Classic Fern Green for links
        tertiary: "#7cae82",    // Lighter green for hover/graph nodes
        highlight: "rgba(61, 107, 64, 0.15)", // Green highlight
        textHighlight: "#d9e6dc",
      },
      darkMode: {
        light: "#161b18",       // Deep dark jungle background
        lightgray: "#2c3630",   // Dark moss for borders
        gray: "#85968d",        // Gray-green for metadata
        darkgray: "#cfdcd5",    // Pale mist for body text
        dark: "#e8f2eb",        // Off-white for headings
        secondary: "#76b07b",   // Vibrant light green for links
        tertiary: "#4a7c59",    // Darker green for hover
        highlight: "rgba(118, 176, 123, 0.15)",
        textHighlight: "#2c3e33",
      },
    },
  },
},
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
