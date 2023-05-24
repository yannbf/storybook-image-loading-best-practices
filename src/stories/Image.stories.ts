import type { Meta, StoryObj } from '@storybook/react'

import { Image } from './Image'

const meta = {
  title: 'Example/Image',
  component: Image,
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
