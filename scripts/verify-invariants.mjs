import fs from "node:fs";

function mustExist(path) {
  if (!fs.existsSync(path)) {
    throw new Error(`Missing required file: ${path}`);
  }
}

function mustContain(path, needle) {
  const content = fs.readFileSync(path, "utf8");
  if (!content.includes(needle)) {
    throw new Error(`File ${path} missing required content: ${needle}`);
  }
}

function mustMatch(path, regex, label) {
  const content = fs.readFileSync(path, "utf8");
  if (!regex.test(content)) {
    throw new Error(`File ${path} failed check: ${label}`);
  }
}

try {
  // Core files
  mustExist("src/main.tsx");
  mustExist("src/App.tsx");
  mustExist("vite.config.ts");
  mustExist("index.html");

  // Router invariant
  const main = fs.readFileSync("src/main.tsx", "utf8");

  if (main.includes("HashRouter")) {
    throw new Error("HashRouter is forbidden. Use BrowserRouter.");
  }

  if (!main.includes("BrowserRouter")) {
    throw new Error("BrowserRouter is required but not found in src/main.tsx.");
  }

  // GH Pages SPA fallback invariants
  mustExist("public/404.html");
  mustMatch(
    "public/404.html",
    /\?p=|p=/,
    "404.html must redirect with ?p= for SPA fallback"
  );

  mustMatch(
    "index.html",
    /params\.get\(["']p["']\)/,
    "index.html must restore the p param for SPA fallback"
  );

  // Vite base path invariant
  mustMatch(
    "vite.config.ts",
    /base:\s*['"]\.\/*['"]/,
    "vite.config.ts must set base: './' for GitHub Pages"
  );

  // Buy routes invariants
  mustContain("src/App.tsx", 'path="/buy/:sku"');
  mustContain("src/App.tsx", 'path="/buy/:sku/success"');
  mustContain("src/App.tsx", 'path="/buy/:sku/cancel"');

  console.log("verify: ok");
} catch (e) {
  console.error(`verify: failed - ${e.message}`);
  process.exit(1);
}
