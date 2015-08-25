let parser = document.createElement('a')

export default function (url) {
  parser.href = url
  return parser.hostname
}
