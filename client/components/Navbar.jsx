import React from 'react';
import { withRouter } from 'react-router';
import { Navbar as BootstrapNavbar, Nav, NavItem } from 'react-bootstrap';

const navItems = [
  {
    path: '/projects',
    title: 'Projects',
  },
];

const Navbar = withRouter(({ router }) => {
  const { Header, Brand, Toggle, Collapse } = BootstrapNavbar;
  return (
    <BootstrapNavbar inverse fixedTop>
      <Header>
        <Brand>
          <a href={router.createHref('/')}>Task Management</a>
        </Brand>
        <Toggle />
      </Header>
      <Collapse>
        <Nav>
          {navItems.map(item =>
            <NavItem
              active={router.isActive(item.path)}
              href={router.createHref(item.path)}
              key={item.path}>
              {item.title}
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </BootstrapNavbar>
  );
});

export default Navbar;
