const CATEGORY_DISPLAY_OVERRIDES: Record<string, string> = {
  "AI Plugins for Business Softwar": "AI Plugins for Business Software",
  "Browser Extensions & Productivi": "Browser Extensions & Productivity",
};

export function displayCategoryName(name: string): string {
  return CATEGORY_DISPLAY_OVERRIDES[name] ?? name;
}
