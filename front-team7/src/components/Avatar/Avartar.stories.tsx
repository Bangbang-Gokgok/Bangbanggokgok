import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { Avartar } from './Avartar';

export default {
  title: 'Components/Avartar',
  component: Avartar,
  args: {
    kind: 'circle',
    size: 'md',
  },
} as ComponentMeta<typeof Avartar>;

const Template: ComponentStory<typeof Avartar> = (args) => <Avartar {...args} />;

export const Circle = Template.bind({});
Circle.args = {
  kind: 'circle',
};

export const Square = Template.bind({});
Square.args = {
  kind: 'square',
};
