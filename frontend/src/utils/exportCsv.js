export function exportToCsv(filename, rows) {
  const headers = Object.keys(rows[0]).join(",")
  const values = rows.map(r => Object.values(r).join(",")).join("\n")

  const blob = new Blob([headers + "\n" + values], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()

  window.URL.revokeObjectURL(url)
}
