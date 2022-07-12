import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { FeedHeader } from './FeedHeader';

export default {
  title: 'Components/FeedHeader',
  component: FeedHeader,
  args: {
    name: 'Username',
    title: 'It`s wonderful night!',
  },
} as ComponentMeta<typeof FeedHeader>;

const Template: ComponentStory<typeof FeedHeader> = (args) => <FeedHeader {...args} />;

export const Default = Template.bind({});
Default.args = {};
