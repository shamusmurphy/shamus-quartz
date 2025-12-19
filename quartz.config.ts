import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "My Digital Garden",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "shamusmurphy.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff",      // Pure white background
          lightgray: "#f0f0f0",  // Very light grey for borders/code backgrounds
          gray: "#888888",       // Neutral grey for metadata (dates, reading time)
          darkgray: "#333333",   // Dark grey for body text (softer than pure black)
          dark: "#000000",       // Pure black for headings
          secondary: "#000000",  // Black for links
          tertiary: "#666666",   // Grey for hover states/graph nodes
          highlight: "rgba(0, 0, 0, 0.05)", // Very subtle grey highlight
          textHighlight: "#e5e5e5",
        },
        darkMode: {
          light: "#111111",      // Near-black background (easier on eyes than pure black)
          lightgray: "#222222",  // Dark grey for borders/code backgrounds
          gray: "#888888",       // Neutral grey for metadata
          darkgray: "#cccccc",   // Light grey for body text
          dark: "#ffffff",       // Pure white for headings
          secondary: "#ffffff",  // White for links
          tertiary: "#999999",   // Grey for hover states
          highlight: "rgba(255, 255, 255, 0.15)",
          textHighlight: "#333333",
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
