# misikoff.com

This is a personal website built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [TypeScript](https://www.typescriptlang.org/). It serves as an online portfolio and includes a dynamic resume generation feature.

## Table of Contents

- [misikoff.com](#misikoffcom)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Available Scripts](#available-scripts)
  - [Generating Your Own Resume](#generating-your-own-resume)
    - [Steps to Customize Your Resume](#steps-to-customize-your-resume)

## Getting Started

To set up the project locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [pnpm](https://pnpm.io/) (preferred), or alternatively `npm` or `yarn`

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/misikoff/misikoff.com.git
   cd misikoff.com
   ```

2. Install dependencies:

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Available Scripts

In the project directory, you can run:

- `pnpm dev` - Runs the app in development mode.
- `pnpm build` - Builds the app for production.
- `pnpm start` - Starts the production server.
- `pnpm lint` - Runs ESLint to analyze code for potential errors.

## Generating Your Own Resume

The project includes a `resume-gen` feature that allows you to generate a personalized resume by modifying the contents of the files in the `constants` folder.

### Steps to Customize Your Resume

1. Navigate to the `src/app/resume-gen/constants` directory.

2. Edit the following files to input your personal information:

   - `awards.ts` - Highlights any awards or recognitions you've received.
   - `education.ts` - Lists your educational background.
   - `ethos.ts` - Describes your personal ethos or philosophy.
   - `experience.ts` - Details your work experience.
   - `misc.ts` - Contains your biography and personal details.
   - `stack.ts` - Lists your favorite technologies and tools.

3. Save the changes to these files.

4. Start the development server if it's not already running:

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000/resume-gen](http://localhost:3000/resume-gen) in your browser to view your customized resume. It can be edited in real-time, and you can see the changes immediately. When ready, use the "Download PDF" button to download your resume.
