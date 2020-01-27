import React from 'react';
import { ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent, Form, NumberInput } from 'carbon-components-react'

import '../styles/DeviceTiles.scss';

export const ZoneTiles = ({ zone, handleChange, handleSubmit }) => (
  <ExpandableTile
    className="zone-tile"
    key={zone.id}
  >
    <TileAboveTheFoldContent>
      <div className="zone__tile--above">
        <div className="zone__tile-name">{zone.name}</div>
      </div>
    </TileAboveTheFoldContent>
    <TileBelowTheFoldContent>
      <div className="zone-details__tile--details">
        <img
          className="zone__img"
          src={zone.imageUrl}
          alt={`{zone.name}`}
        />
        <div className="section-1">
          <Form
            onSubmit={e => handleSubmit(e, zone)}
            className="zone__form--duration"
          >
            <NumberInput
              className="zone__input--duration"
              id={zone.id}
              label="Set Zone Timer (minutes): "
              max={180}
              min={0}
              step={1}
              value={5}
              onClick={(event) => event.stopPropagation()}
              onChange={e => handleChange(e, this)}
            />
            <button
              type="submit"
              id={`zone__form--submit-btn ${zone.id}`}
              className="zone__form--submit-btn"
              onSubmit={e => handleSubmit(e, zone)}
              >
              SET TIMER
            </button>
          </Form>
        </div>
        <div className="section-2">
          <div>Type of Crop: {zone.customCrop.name}</div>
          <div>Type of Nozzle: {zone.customNozzle.name}</div>
          <div>Amount of Shade: {zone.customShade.name}</div>
          <div>Soil: {zone.customSoil.name}</div>
        </div>
        <div className="section-3">
          <div>Depth of Water: {zone.depthOfWater}</div>
          <div>Saturation Depth: {zone.saturatedDepthOfWater}</div>
          <div>Efficiency: {zone.efficiency}</div>
          <div>Root Depth: {zone.rootZoneDepth}</div>
          <div>Yard Measurement (sqft): {zone.yardAreaSquareFeet}</div>
        </div>
      </div>
    </TileBelowTheFoldContent>
  </ExpandableTile>
)


export default ZoneTiles;
