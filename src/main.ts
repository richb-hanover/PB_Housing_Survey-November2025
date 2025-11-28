import { marked } from "marked";
import readmeContent from "../README.md?raw";

async function loadTabPartials(): Promise<void> {
  const containers = Array.from(
    document.querySelectorAll<HTMLElement>("[data-partial]"),
  );
  const loaders = containers.map(async (container) => {
    const path = container.getAttribute("data-partial");
    if (!path) {
      return;
    }
    const resp = await fetch(path);
    if (!resp.ok) {
      throw new Error(`Failed to load ${path} (${resp.status})`);
    }
    container.innerHTML = await resp.text();
  });
  await Promise.all(loaders);
}

function loadReadme(): void {
  const target = document.getElementById("readme-content");
  if (!target) {
    return;
  }
  const rendered = marked.parse(readmeContent);
  if (rendered instanceof Promise) {
    rendered.then((html) => {
      target.innerHTML = html;
    });
  } else {
    target.innerHTML = rendered;
  }
}

async function init(): Promise<void> {
  try {
    await loadTabPartials();
    loadReadme();
    await import("./app");
  } catch (err) {
    console.error("Initialization error", err);
  }
}

void init();
