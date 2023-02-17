export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function getFileName(disposition: string): string {
  const utf8FilenameRegex = /filename\*=UTF-8''([\w%\-\\.]+)(?:; ?|$)/i
  const asciiFilenameRegex = /^filename=(["']?)(.*?[^\\])\1(?:; ?|$)/i

  let fileName = ''
  if (utf8FilenameRegex.test(disposition)) {
    const d = utf8FilenameRegex.exec(disposition)
    if (d) {
      fileName = decodeURIComponent(d[1])
    }
  } else {
    // prevent ReDos attacks by anchoring the ascii regex to string start and
    //  slicing off everything before 'filename='
    const filenameStart = disposition.toLowerCase().indexOf('filename=')
    if (filenameStart >= 0) {
      const partialDisposition = disposition.slice(filenameStart)
      const matches = asciiFilenameRegex.exec(partialDisposition)
      if (matches != null && matches[2]) {
        fileName = matches[2]
      }
    }
  }
  return fileName
}
