import prompts from 'prompts'

export interface SelectOptions {
  layout: string
  highlight: string
}

const LayoutDict = {
  github: 'https://cdn.jsdelivr.net/npm/github-markdown-css@4.0.0/github-markdown.min.css',
  star: 'https://cdn.jsdelivr.net/npm/star-markdown-css/dist/planet/planet-markdown.min.css'
}

const HighlightDict = {
  'prism-okaidia': 'https://unpkg.com/prismjs/themes/prism-okaidia.css',
  'prism-twilight': 'https://unpkg.com/prismjs/themes/prism-twilight.css'
}

/**
 * Select layout.
 */
export default async (): Promise<SelectOptions> => {
  const { layout, highlight }: SelectOptions = await prompts([
    {
      name: 'layout',
      type: 'select',
      message: 'Select markdown layout?',
      choices: [
        { title: 'github', value: LayoutDict.github },
        { title: 'star', value: LayoutDict.star }
      ]
    },
    {
      name: 'highlight',
      type: 'select',
      message: 'Select code highlight?',
      choices: [
        { title: 'prism-okaidia', value: HighlightDict['prism-okaidia'] },
        { title: 'prism-twilight', value: HighlightDict['prism-twilight'] }
      ]
    }
  ])

  return { layout, highlight }
}
