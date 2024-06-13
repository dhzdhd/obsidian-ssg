# Obsidian SSG

## Table of Contents

- [Obsidian SSG](#obsidian-ssg)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Website configuration](#website-configuration)
  - [Styling the website](#styling-the-website)


## Prerequisites

- Your Obsidian vault should be configured with git
- The vault repository should be pushed to Github

## Setup

1. Create a `.config` folder in your preferred folder with the following files in it (refer to `examples/`) (files enclosed in `[]` are optional)
    - `config.json` - The configuration file for the website
    - `index.md` - The landing page
    - `[globals.css]` - The css file with which you can customize the looks of the website
2. Create a `.github/workflows` folder in the same folder and place your preferred `.yml` file from `examples/` in it
    - `deploy_normal.yml` - Change the value of `MD_FOLDER` on line 9 to your `.md` files directory (leave it as `.` if all the files are in your project root directory)
3. Push changes to your remote repository
4. Setup the site with your preferred provider
    - Custom
      - Use [this link](https://docs.astro.build/en/guides/deploy/) to deploy your site to your preferred provider that is not listed here (note that you should deploy the website present in the `deploy` branch)
    - Vercel
      - Login to Vercel and create a new project
      - Select your vault repository
      - Choose the framework preset as `Astro`
      - Press `Deploy`
      - You will notice the first deployment failing, head on to the settings tab in the project
      - Select the Git tab in the side navigation bar
      - Change the production branch input field to `deploy`
      - Now, make a new commit to your repository and the site should be deployed

## Website configuration

- Example configuration json file

```json
{
  "redirects": {
    "/": "/obsidian/b"
  },
  "metadata": {
    "title": "Notes",
    "description": ""
  },
  "codeTheme": "one-dark-pro",
  "links": {
    "github": "https://github.com/dhzdhd"
  }
}
```

- Set of all possible configurations

| Setting               | Description                                         | Possible values                                                                                                                                                                                                                                                                                                                                                                                                                     | Default      | Optional           |
| --------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------ |
| redirects             | Redirects                                           | Key-value pair of source segment to target segment (do not include the origin - https://<website_name>)                                                                                                                                                                                                                                                                                                                             | null         | :white_check_mark: |
| metadata: title       | Title of the website                                | A string value                                                                                                                                                                                                                                                                                                                                                                                                                      | Obsidian     | :white_check_mark: |
| metadata: description | Description of the website (populates the meta tag) | A string value                                                                                                                                                                                                                                                                                                                                                                                                                      | null         | :white_check_mark: |
| codeTheme             | Theme of the syntax highlighted code blocks         | css-variables, dark-plus, dracula, dracula-soft, github-dark, github-dark-dimmed, github-light, hc_light, light-plus, material-theme, material-theme-darker, material-theme-lighter, material-theme-ocean, material-theme-palenight, min-dark, min-light, monokai, nord, one-dark-pro, poimandres, rose-pine, rose-pine-dawn, rose-pine-moon, slack-dark, slack-ochin, solarized-dark, solarized-light, vitesse-dark, vitesse-light | one-dark-pro | :white_check_mark: |
| links                 | Set of links to display in the website header       | Key-value pair with the following keys - github, twitter, linkedin, instagram, facebook, reddit, snapchat, custom (link icon will be set to default)                                                                                                                                                                                                                                                                                | null         | :white_check_mark: |


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

  /* Code block title styling */
  /* In the md file, add the following to your code block */
  /* ```python title="main.py"
  /  ```
  */
  [data-remark-code-title]+pre {
    @apply mt-0 rounded-t-none;
  }

  [data-remark-code-title] {
    @apply bg-accent px-4 font-bold p-0 m-0 rounded-t-lg
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
