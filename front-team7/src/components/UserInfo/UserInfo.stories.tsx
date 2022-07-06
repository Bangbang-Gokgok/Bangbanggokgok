import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { UserInfo } from './UserInfo';

export default {
  title: 'Components/UserInfo',
  component: UserInfo,
  args: {
    name: 'Username',
  },
} as ComponentMeta<typeof UserInfo>;

const Template: ComponentStory<typeof UserInfo> = (args) => <UserInfo {...args} />;

export const Default = Template.bind({});
Default.args = {};
