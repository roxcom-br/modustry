export default function Markdown({ content }: { content: string }) {
    return <div className="unreset bg-(--scheme-color-secondary) p-6 rounded-xl" dangerouslySetInnerHTML={{ __html: content }} />
}