const { src, task, exec, context } = require("fuse-box/sparky");

const { FuseBox, WebIndexPlugin , QuantumPlugin} = require("fuse-box");


context(
  class {
    getConfig() {
      return FuseBox.init({
        homeDir: "src",
        target: "browser@es6",
        output: "dist/$name.js",
        plugins: [
          !this.isProduction && WebIndexPlugin(),
          this.isProduction &&
          QuantumPlugin({
            uglify: true,
            treeshake: true,
            bakeApiIntoBundle: "app",
          }),
        ],
      });
    }
  },
);

// const fuse = FuseBox.init({
//   homeDir: "src",
//   target: "browser@es6",
//   output: "dist/$name.js",
//   useTypescriptCompiler: true,
//   plugins: [WebIndexPlugin()],
//   debug: true, // performance impact
//   log: {
//     showBundledFiles: false, // Don't list all the bundled files every time we bundle
//     clearTerminalOnBundle: true, // Clear the terminal window every time we bundle
//   },
//
// });
// fuse.dev(); // launch http server
// fuse
//   .bundle("app")
//   .instructions(" > index.jsx")
//   .hmr()
//   .watch();
// fuse.run();

task("default", async context => {
  const fuse = context.getConfig();
  fuse
    .bundle("app")
    .hmr()
    .watch()
    .instructions(">index.js");

  await fuse.run();
});

task("dist", async context => {
  context.isProduction = true;
  const fuse = context.getConfig();
  fuse.bundle("app").instructions(">index.ts");

  await fuse.run();
});