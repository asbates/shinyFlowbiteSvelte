import esbuild from "esbuild";
import sveltePlugin from "esbuild-svelte";
import GlobalsPlugin from "esbuild-plugin-globals";
import stylePlugin from "esbuild-style-plugin";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";

esbuild
  .build({
    entryPoints: ["index.js", "main.css"],
    bundle: true,
    // outfile: "../www/index.js",
    outdir: "../www",
    plugins: [
      sveltePlugin(),
      GlobalsPlugin({
        Shiny: "window.Shiny",
      }),
      stylePlugin({
        postcss: {
          plugins: [tailwind, autoprefixer],
        },
      }),
    ],
    logLevel: "info",
    conditions: ["svelte"],
  })
  .catch(() => process.exit(1));
