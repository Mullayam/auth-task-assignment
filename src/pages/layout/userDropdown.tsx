import React from 'react';

import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';


export const UserDropdown: React.FC<{ handleMenuClick: MenuProps['onClick'], children: React.ReactNode, items: MenuProps["items"] }> = ({ children, items, handleMenuClick }) => (
  <Dropdown menu={{ items, onClick: handleMenuClick }}>
      {children}
    </Dropdown>

);

