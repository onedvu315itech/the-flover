import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()

const OUTPUT_FILE = path.join(ROOT, "schema.prisma")

const HEADER = `generator client {
  provider = "prisma-client"
  output   = "./generated/client"
}

datasource db {
  provider = "postgresql"
}
`

function getPrismaFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }

  const files: string[] = []

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...getPrismaFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith(".prisma")) {
      files.push(fullPath)
    }
  }

  return files.sort((a, b) => a.localeCompare(b))
}

function readFiles(files: string[]): string {
  return files
    .map((file) => {
      const relativePath = path.relative(ROOT, file).replace(/\\/g, "/")
      const content = fs.readFileSync(file, "utf8").trim()

      return `// ==================================================
// ${relativePath}
// ==================================================

${content}
`
    })
    .join("\n")
}

function buildSchema() {
  const enumFiles = getPrismaFiles(path.join(ROOT, "src", "enums"))

  const modelFiles = getPrismaFiles(path.join(ROOT, "src", "models"))

  const schema = [
    HEADER.trim(),
    "",
    "// ==================================================",
    "// ENUMS",
    "// ==================================================",
    "",
    readFiles(enumFiles),
    "",
    "// ==================================================",
    "// MODELS",
    "// ==================================================",
    "",
    readFiles(modelFiles),
    "",
  ].join("\n")

  fs.writeFileSync(OUTPUT_FILE, schema, "utf8")

  console.log("✅ schema.prisma generated successfully!")
  console.log(`📄 Output: ${OUTPUT_FILE}`)
  console.log(`📦 Enums : ${enumFiles.length}`)
  console.log(`📦 Models: ${modelFiles.length}`)
}

buildSchema()