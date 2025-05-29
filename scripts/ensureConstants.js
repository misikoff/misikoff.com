// scripts/ensure-constants.js

const fs = require('fs')
const path = require('path')

const src = path.resolve(__dirname, '../src/apps/resume-gen/constants-example')
const dest = path.resolve(__dirname, '../src/apps/resume-gen/constants')

// Error if source does not exist
if (!fs.existsSync(src)) {
  console.error(
    '❌ Missing src/apps/resume-gen/constants-example. Cannot proceed.',
  )
  process.exit(1)
}

// Copy only if destination doesn't exist
if (!fs.existsSync(dest)) {
  fs.cpSync(src, dest, { recursive: true })
  console.log(
    '✓ Created src/apps/resume-gen/constants/ from constants-example/',
  )
} else {
  console.log('✓ src/apps/resume-gen/constants/ already exists. Skipping copy.')
}
