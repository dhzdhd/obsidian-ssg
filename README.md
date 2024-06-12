# Obsidian SSG

## Prerequisites

- Your Obsidian vault should be configured with git

## Setup

1. Create a `.config` folder in your preferred folder with the following files in it (refer to `examples/`) (files enclosed in `[]` are optional)
    - `config.json` - The configuration file for the website
    - `index.md` - The landing page
    - `[globals.css]` - The css file with which you can customize the looks of the website
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

## Styling the website

- The `globals.css` file in the `.config` folder of your project/markdown folder holds all the styles for the website. A general template is given below.
- You can use a [theme generator website](https://gradient.page/tools/shadcn-ui-theme-generator) or other relevant (Shadcn based CSS) theme generators.
- Deviating from the CSS variables (--xyz) can cause unintended styles in the website.

```css
/* DO NOT TOUCH THESE THREE LINES */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* These styles set the color of the website, change it as per your liking */
@layer base {
  /* Colors for light mode */
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  /* Colors for dark mode */
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9;
  }
}

/* CHANGE THESE STYLES ONLY IF YOU HAVE EXPERIENCE IN CSS/TailwindCSS */
@layer base {
  /* These styles apply to all elements in the page */
  /* border-border sets the border color */
  /* scroll-smooth makes the scrolling smooth when you press any heading in the table of contents */
  * {
    @apply border-border scroll-smooth;
  }

  body {
    @apply bg-background text-foreground;
  }

  /* The scroll-mt is set to all headings to avoid the top header from covering the heading */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply scroll-mt-14;
  }

  /* Code block styling */
  pre {
    @apply bg-secondary dark:bg-background border-[1px] !important;
  }

  /* All webkit-scrollbar styles (the below three) change the scrollbar style of the page */
  /* Remove it or tweak it with CSS/Tailwind as per your wish */
  *::-webkit-scrollbar {
    @apply w-2 h-2
  }

  *::-webkit-scrollbar-track {
    @apply bg-background
  }

  *::-webkit-scrollbar-thumb {
    @apply bg-secondary hover:bg-foreground
  }
}
```
