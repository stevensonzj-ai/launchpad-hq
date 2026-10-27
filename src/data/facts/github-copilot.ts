import type { ToolFacts } from "./types";

const COPILOT_IDE_INSTALL_URL =
  "https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/set-up-copilot/install-copilot-extension";

/**
 * GitHub Copilot: where it runs, checked by the RA on GitHub Docs on
 * 2026-10-26 (mcp-stress-factcheck-2026-10-26.md, follow-up 4b). Plan prices
 * and AI Credit figures were not re-checked in that pass, so no price facts
 * are recorded here; the catalog row keeps its 2026-10-25 pricing text.
 */
export default {
  slug: "github-copilot",
  lifecycle: "active",
  platforms: {
    value: ["Visual Studio Code", "Visual Studio", "JetBrains IDEs", "Eclipse", "Xcode", "Vim/Neovim", "Azure Data Studio"],
    note: "GitHub Docs \"Installing the GitHub Copilot extension in your environment\" has setup tabs for each of these editors (as of 2026-10-26).",
    sourceUrl: COPILOT_IDE_INSTALL_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "platforms",
      summary: "First fact file: Copilot's editor extensions (VS Code, Visual Studio, JetBrains IDEs, Eclipse, Xcode, Vim/Neovim, Azure Data Studio).",
    },
  ],
} satisfies ToolFacts;
