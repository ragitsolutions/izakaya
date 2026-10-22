export function EmailPreview({ html, title }: { html: string; title: string }) {
  return (
    <iframe
      title={title}
      srcDoc={html}
      sandbox=""
      className="h-[520px] w-full border border-line-soft bg-paper"
    />
  )
}
