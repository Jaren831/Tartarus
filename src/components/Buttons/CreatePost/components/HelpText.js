import React from 'react'

// comments are bugs / features that need to be fixed or added
const HelpText = () =>
  <div>
    <p>
      Drop files: JPG, JPEG, PNG, GIF (e.g. example.jpg)
    </p>
    <p>
      Media links: JPG, JPEG, PNG, GIF, WebM, MP4, Ogg, WAV, MP3, FLAC (e.g. https://example.com/something.mp4)
    </p>
    <p>
      Social links: Youtube, Vimeo, Reddit, Twitter, Facebook, Instagram (e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ)
    </p>
    <p>
      IPFS hashes: (e.g. QmeeogFMkaWi3n1hurdMXLuAHjG2tSaYfFXvXqP6SPd1zo) embed supported for images{/* and fMP4 videos */}
    </p>
  </div>

export default HelpText
