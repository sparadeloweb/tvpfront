export default function formatUrl(input) {
    return input
        .replaceAll("%REPLACEFORCOLON%", "-")
        .toLowerCase()
        .replaceAll("'", "")
        .replaceAll(" ", "-")
        .replaceAll("&", "")
        .replaceAll("%", "");
}
