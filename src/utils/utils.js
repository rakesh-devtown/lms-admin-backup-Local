export function getExtension(url) {
    // Use a regular expression to match the extension part of the URL
    const match = url.match(/\.([a-zA-Z0-9]+)(\?|$)/);
    console.log(match);
    // If a match is found, return the extension part (group 1 in the regex)
    return match ? match[1] : null;
}