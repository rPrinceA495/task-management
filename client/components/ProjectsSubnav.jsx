import React from 'react';
import { withRouter } from 'react-router';
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import Media from 'react-media';
import _ from 'lodash';
import Filters from '../constants/Filters';

const getPath = filter => `/projects/${filter}`;

const ButtonSubnav = withRouter(({ router }) =>
  <ButtonGroup>
    {Filters.All.map(filter =>
      <Button
        href={router.createHref(getPath(filter))}
        bsStyle={router.isActive(getPath(filter)) ? 'primary' : 'default'}
        key={filter}>
        {_.capitalize(filter)}
      </Button>
    )}
  </ButtonGroup>
);

const DropdownSubnav = withRouter(({ router }) =>
  <DropdownButton
    bsStyle="primary"
    title={_.capitalize(
      Filters.All.find(filter => router.isActive(getPath(filter)))
    )}>
    {Filters.All.map(filter =>
      <MenuItem
        href={router.createHref(getPath(filter))}
        key={filter}>
        {_.capitalize(filter)}
      </MenuItem>
    )}
  </DropdownButton>
);

const ProjectsSubnav = () =>
  <Media query="(min-width: 768px)">
    {matches => (matches ? <ButtonSubnav /> : <DropdownSubnav />)}
  </Media>;

export default ProjectsSubnav;
