import React from 'react';
import { Accordion, AccordionItem, Tile } from 'carbon-components-react'

import '../styles/DeviceTiles.scss';

export const DeviceTiles = ({ name }) => (
  <div className="accordion--devices">
    <Accordion className="accordion--devices">
        <AccordionItem title={name} className="device-tile">
          <Tile light={false} className="zone-tile">
            Default tile
          </Tile>
        </AccordionItem>
      </Accordion>
    </div>
)

export default DeviceTiles;
