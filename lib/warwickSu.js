// Client for the Warwick SU Membership API. The organisation key is read
// from an environment variable (WARWICK_SU_ORG_KEY) so it never ends up in
// the source code or in the browser - only this server-side code sees it.
//
// Docs: https://www.warwicksu.com/membershipapi/about/

const API_BASE = "https://www.warwicksu.com/membershipapi";

export async function checkIsMember(personKey) {
  const orgKey = process.env.WARWICK_SU_ORG_KEY;
  if (!orgKey) {
    throw new Error("WARWICK_SU_ORG_KEY environment variable is not set.");
  }

  const url = `${API_BASE}/isMember/${encodeURIComponent(orgKey)}/${encodeURIComponent(personKey)}/`;
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Warwick SU Membership API returned HTTP ${response.status}`);
  }

  const text = (await response.text()).trim();
  // Logged so that if a login looks wrong after deploying, you can check the
  // Vercel function logs to see exactly what the API returned and adjust
  // parseIsMemberResponse below if needed.
  console.log("Warwick SU isMember raw response:", text);
  return parseIsMemberResponse(text);
}

// The Warwick SU API's exact response shape isn't documented in detail here,
// so this handles the shapes it's known or likely to return - a plain
// "True"/"False" string, JSON, or a simple XML tag - instead of assuming
// just one. If real testing shows a different shape, adjust this function
// (e.g. log `text` below and check what actually comes back).
function parseIsMemberResponse(text) {
  const lower = text.toLowerCase();

  if (lower === "true") return true;
  if (lower === "false") return false;

  try {
    const data = JSON.parse(text);
    if (typeof data === "boolean") return data;
    if (data && typeof data === "object") {
      const value = data.IsMember ?? data.isMember ?? data.result ?? data.valid;
      if (typeof value === "boolean") return value;
      if (typeof value === "string") return value.toLowerCase() === "true";
    }
  } catch {
    // Not JSON - fall through to the XML/plain-text checks below.
  }

  const xmlMatch = text.match(/<\s*IsMember\s*>\s*(true|false)\s*<\s*\/\s*IsMember\s*>/i);
  if (xmlMatch) return xmlMatch[1].toLowerCase() === "true";

  return lower.includes("true");
}
