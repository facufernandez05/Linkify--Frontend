function convertLinksToAnchors (message) {
  const linkRegex = /(\bhttps?:\/\/\S+\b)/gi
  const parts = message.split(linkRegex)

  const messageWithLinks = parts.map((part, index) => {
    if (part.match(linkRegex)) {
      return (
        <a key={index} href={part} target="_blank" className="text-blue-400 md:hover:underline max-md:underline">
          {part}
        </a>
      )
    }
    return part
  })

  return messageWithLinks
}

export function Message ({ message, myUserId }) {
  const isMyMessage = message.user === myUserId

  return (
    <div className={`flex p-4 ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`md:mt-7.5 p-3 rounded-lg md:p-4 inline-block max-w-md break-words tracking-wider text-sm md:text-lg relative ${isMyMessage ? 'text-white bg-red-600' : 'text-black bg-white'} font-medium`}
      >
        {convertLinksToAnchors(message.message)}
        <span
          className={`text-sm text-gray-400 absolute ${isMyMessage ? 'right-1' : 'left-1'} -bottom-6`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
    </div>
  )
}
