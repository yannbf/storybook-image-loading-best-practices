import type { Meta, StoryObj } from '@storybook/react'
import { waitFor } from '@storybook/testing-library'
import { rest } from 'msw'

import { Image } from './Image'
import mockImage from './image.png'
import { waitForImagesToLoad } from './util'

const meta = {
  title: 'Example/Image',
  component: Image,
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

export const WaitForImagesInPlayFunction: Story = {
  args: {
    description: (
      <div>
        This method uses the play function to wait for all images to load, and the interaction panel will show an error if it takes too long to load them. <br/>
        Be aware that if the images take too long to load, you're better off with
        the MSW approach (visit the next story).
      </div>
    ),
  },
  play: async () => {
    await waitFor(waitForImagesToLoad, { timeout: 5000 })
  },
}

export const MockImagesWithMSW: Story = {
  args: {
    description: (
      <div>
        This method uses a combination of a local image + a MSW handler using <a href="https://github.com/mswjs/msw-storybook-addon" target='_blank'>msw-storybook-addon</a> to proxy the image request and return a mocked image instead, making it really fast to load the image.
      </div>
    )
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(
          'https://wallpaperaccess.com/full/*.jpg',
          async (_, res, ctx) => {
            const image = await fetch(mockImage).then((res) =>
              res.arrayBuffer()
            )
            return res(
              ctx.set('Content-Length', image.byteLength.toString()),
              ctx.set('Content-Type', 'image/png'),
              ctx.body(image)
            )
          }
        ),
      ],
    },
  },
}
