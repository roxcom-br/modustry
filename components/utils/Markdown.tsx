'use client'

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

type ReadmeProps = {
    body: string
    repo: string
    branch: string
}

function isRelativeUrl(url?: string) {
    if (!url) return false;

    return (
        !url.startsWith("http://") &&
        !url.startsWith("https://") &&
        !url.startsWith("//") &&
        !url.startsWith("#") &&
        !url.startsWith("mailto:") &&
        !url.startsWith("data:")
    );
}

function cleanRelativePath(url: string) {
    return url.replace(/^\.?\//, "");
}

function resolveGithubRawUrl(
    src: string | undefined,
    repo: string,
    branch: string
) {
    if (!src) return "";

    if (!isRelativeUrl(src)) {
        return src;
    }

    return `https://raw.githubusercontent.com/${repo}/${branch}/${cleanRelativePath(src)}`;
}

function resolveGithubBlobUrl(
    href: string | undefined,
    repo: string,
    branch: string
) {
    if (!href) return "";

    if (!isRelativeUrl(href)) {
        return href;
    }

    return `https://github.com/${repo}/blob/${branch}/${cleanRelativePath(href)}`;
}

const readmeSchema = {
    ...defaultSchema,
    tagNames: [
        ...(defaultSchema.tagNames ?? []),

        // HTML comum em README
        "br",
        "div",
        "span",
        "p",
        "img",
        "details",
        "summary",
        "kbd",
    ],
    attributes: {
        ...defaultSchema.attributes,

        "*": [
            ...(defaultSchema.attributes?.["*"] ?? []),
            "className",
            "align",
            "title",
        ],

        a: [
            ...(defaultSchema.attributes?.a ?? []),
            "href",
            "title",
            "target",
            "rel",
        ],

        img: [
            ...(defaultSchema.attributes?.img ?? []),
            "src",
            "alt",
            "title",
            "width",
            "height",
            "align",
            "loading",
        ],

        div: [
            ...(defaultSchema.attributes?.div ?? []),
            "align",
        ],

        span: [
            ...(defaultSchema.attributes?.span ?? []),
            "align",
        ],
    },
    protocols: {
        ...defaultSchema.protocols,
        href: ["http", "https", "mailto"],
        src: ["http", "https"],
    },
};

export default function Markdown({ body, repo, branch }: ReadmeProps) {
    return (
        <div className="unreset">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                    rehypeRaw,
                    [rehypeSanitize, readmeSchema],
                ]}
                components={{
                    img({ src, alt, title }) {
                        const finalSrc = resolveGithubRawUrl(
                            typeof src === "string" ? src : undefined,
                            repo,
                            branch
                        );

                        return (
                            <img
                                src={finalSrc}
                                alt={alt ?? ""}
                                title={title}
                                loading="lazy"
                                className="max-w-full rounded-lg"
                            />
                        );
                    },

                    a({ href, children, title }) {
                        const finalHref = resolveGithubBlobUrl(
                            typeof href === "string" ? href : undefined,
                            repo,
                            branch
                        );

                        return (
                            <a
                                href={finalHref}
                                title={title}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {children}
                            </a>
                        );
                    },
                }}
            >
                {body}
            </ReactMarkdown>
        </div>
    )
}