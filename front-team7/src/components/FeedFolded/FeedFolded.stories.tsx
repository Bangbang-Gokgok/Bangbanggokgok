import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { FeedFolded } from './FeedFolded';

export default {
  title: 'Components/FeedFolded',
  component: FeedFolded,
  args: {
    name: 'Username',
    title: 'It`s wonderful night!',
  },
} as ComponentMeta<typeof FeedFolded>;

const Template: ComponentStory<typeof FeedFolded> = (args) => <FeedFolded {...args} />;

export const Default = Template.bind({});
Default.args = {};
