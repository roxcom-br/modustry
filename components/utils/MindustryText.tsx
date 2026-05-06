import { MINDUSTRY_ICONS_BY_UNICODE } from "@/lib/mindustry";

type Segment = {
    text: string;
    color?: string;
};

type MindustryTextProps = {
    text?: string | null;
    className?: string;
};

type Token =
    | { type: "text"; value: string }
    | { type: "open"; value: string }
    | { type: "close" };

const COLORS: Record<string, string> = {
    clear: "transparent",

    black: "#000000",
    white: "#ffffff",

    lightgray: "#bfbfbf",
    gray: "#7f7f7f",
    darkgray: "#3f3f3f",
    lightgrey: "#bfbfbf",
    grey: "#7f7f7f",
    darkgrey: "#3f3f3f",

    blue: "#4169e1",
    navy: "#000080",
    royal: "#4169e1",
    slate: "#708090",
    sky: "#87ceeb",
    cyan: "#00ffff",
    teal: "#008080",

    green: "#38d667",
    acid: "#7fff00",
    lime: "#32cd32",
    forest: "#228b22",
    olive: "#6b8e23",

    yellow: "#ffff00",
    gold: "#ffd700",
    goldenrod: "#daa520",
    orange: "#ffa500",
    brown: "#8b4513",
    tan: "#d2b48c",
    brick: "#b22222",

    red: "#e55454",
    scarlet: "#ff341c",
    crimson: "#dc143c",
    coral: "#ff7f50",
    salmon: "#fa8072",
    pink: "#ff69b4",
    magenta: "#ff00ff",
    purple: "#a020f0",
    violet: "#ee82ee",
    maroon: "#b03060",

    accent: "#ffd37f",
    stat: "#ffd37f",
    negstat: "#e55454",
    unlaunched: "#8982ed",
    highlight: "#ffdf9f",
};

function normalizeColorName(name: string) {
    return name.toLowerCase().replaceAll("_", "");
}

function getNamedColor(name: string) {
    return COLORS[normalizeColorName(name)] ?? null;
}

function isValidCssHex(hex: string) {
    return /^(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(
        hex
    );
}

function getTagColor(value: string) {
    if (value.startsWith("#")) {
        const hex = value.slice(1);
        return isValidCssHex(hex) ? `#${hex}` : null;
    }

    return getNamedColor(value);
}

function splitMindustryText(text: string) {
    return (
        text.match(/\[\[\]\]|\[\]\]|\[\]|\[\[|\[[^\]]*|\]|[^\[\]]+/g) ?? []
    );
}

function tokenizeMindustryText(text: string): Token[] {
    const parts = splitMindustryText(text);
    const tokens: Token[] = [];

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (part === "[]" || part === "[]]" || part === "[[]]") {
            tokens.push({ type: "close" });
            continue;
        }

        if (part === "[[") {
            tokens.push({
                type: "text",
                value: "[",
            });
            continue;
        }

        if (!part.startsWith("[") || part === "]") {
            tokens.push({
                type: "text",
                value: part,
            });
            continue;
        }

        if (part.endsWith("[") && parts[i + 1] === "]" && parts[i + 2] === "]") {
            const value = part.slice(1, -1);
            const color = getTagColor(value);

            if (color) {
                tokens.push({
                    type: "open",
                    value,
                });

                i += 2;
                continue;
            }
        }

        if (parts[i + 1] === "]") {
            const value = part.slice(1);
            const color = getTagColor(value);

            if (color) {
                tokens.push({
                    type: "open",
                    value,
                });

                i++;
                continue;
            }
        }

        tokens.push({
            type: "text",
            value: part,
        });
    }

    return tokens;
}

export function parseMindustryText(text: string): Segment[] {
    const tokens = tokenizeMindustryText(text);

    const segments: Segment[] = [];
    const colorStack: Array<string | undefined> = [undefined];

    let buffer = "";

    function currentColor() {
        return colorStack[colorStack.length - 1];
    }

    function flush() {
        if (!buffer) return;

        const color = currentColor();
        const previous = segments[segments.length - 1];

        if (previous && previous.color === color) {
            previous.text += buffer;
        } else {
            segments.push({
                text: buffer,
                color,
            });
        }

        buffer = "";
    }

    for (const token of tokens) {
        if (token.type === "text") {
            buffer += token.value;
            continue;
        }

        flush();

        if (token.type === "open") {
            const color = getTagColor(token.value);

            if (color) {
                colorStack.push(color);
            }

            continue;
        }

        if (token.type === "close") {
            if (colorStack.length > 1) {
                colorStack.pop();
            }

            continue;
        }
    }

    flush();

    return segments;
}

function renderTextWithIcons(text: string, keyPrefix: string) {
    return Array.from(text).map((char, index) => {
        const icon = MINDUSTRY_ICONS_BY_UNICODE[char]

        if (!icon) {
            return char
        }

        return (
            <img
                key={`${keyPrefix}-icon-${index}`}
                src={icon.url}
                alt={icon.name}
                title={icon.name}
                className="mx-0.5 inline-block h-[1em] w-[1em] align-[-0.125em] object-contain"
                loading="lazy"
            />
        )
    })
}

export function MindustryText({ text, className }: MindustryTextProps) {
    if (!text) return null;

    const segments = parseMindustryText(text);

    return (
        <span className={className}>
            {segments.map((segment, index) => (
                <span
                    key={index}
                    style={segment.color ? { color: segment.color, fontFamily: "MindustryIcon" } : { fontFamily: "MindustryIcon" }}
                >
                    {renderTextWithIcons(segment.text, `segment-${index}`)}
                </span>
            ))}
        </span>
    );
}