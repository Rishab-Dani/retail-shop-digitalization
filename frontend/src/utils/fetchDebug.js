// Simple global fetch wrapper to log responses that are not valid JSON
export function installFetchDebug() {
  if (typeof window === 'undefined' || !window.fetch) return;
  if (window.__fetchDebugInstalled) return;
  window.__fetchDebugInstalled = true;

  const origFetch = window.fetch.bind(window);
  window.fetch = async (...args) => {
    const res = await origFetch(...args);
    // clone so we don't consume original response body
    const clone = res.clone();
    try {
      const text = await clone.text();
      // ignore empty responses
      if (!text) return res;
      // quick check: valid JSON must start with { or [ (ignore whitespace)
      const firstNonWs = text.trimStart().charAt(0);
      if (firstNonWs !== '{' && firstNonWs !== '[') {
        console.error('fetchDebug: response is not JSON for', args[0], '\n---RESPONSE START---\n', text, '\n---RESPONSE END---');
      } else {
        try {
          JSON.parse(text);
        } catch (err) {
          console.error('fetchDebug: invalid JSON for', args[0], err, '\n', text);
        }
      }
    } catch (e) {
      console.warn('fetchDebug: failed reading response text', e);
    }
    return res;
  };
}

export default installFetchDebug;
