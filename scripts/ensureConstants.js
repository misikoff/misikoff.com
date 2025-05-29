const fs = require('fs')
const path = require('path')

const src = path.resolve(__dirname, '../src/constants-example')
const dest = path.resolve(__dirname, '../src/constants')

if (!fs.existsSync(dest)) {
  fs.cpSync(src, dest, { recursive: true })
  console.log('✓ Created default constants/ from constants-example/')
}
