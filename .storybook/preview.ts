import { mswLoader, initialize } from 'msw-storybook-addon'
import type { Preview } from '@storybook/react'

initialize()

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  loaders: [mswLoader],
}

export default preview
