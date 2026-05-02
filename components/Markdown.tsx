export default function Markdown({ content }: { content: string }) {
    return <div className="unreset fiximg" dangerouslySetInnerHTML={{ __html: content }} />
}