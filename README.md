# Obsidian SSG

## Prerequisites

- Your Obsidian vault should be configured with git

## Setup

1. Create a `.config` folder in your preferred folder with the following files in it (refer to `examples/`)
    - `config.ts` - The configuration file for the SSG
    - `index.md` - The landing page
2. Create a `.github/workflows` folder in the same folder and place your preferred `.yml` file from `examples/` in it
    - `vercel.yml` - Change `<markdown_files_folder>` on line 36 to your `.md` files directory
3. Push changes to your remote repository
4. Setup the site with your preferred provider
    - Vercel
      - Login to Vercel and create a new project
      - Select your vault repository
      - Choose the framework preset as `Astro`
      - Press `Deploy`
      - You will notice the first deployment failing, head on to the settings tab in the project
      - Select the Git tab in the side navigation bar
      - Change the production branch input field to `vercel`
      - Now, make a new commit to your repository and the site should be deployed
