import React from 'react';
import { ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent, Form, NumberInput } from 'carbon-components-react'

import '../styles/DeviceTiles.scss';

export const ZoneTiles = ({ zone, handleChange, handleSubmit }) => (
  <ExpandableTile
    className="zone__tile"
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
        <div className="zone__tile--details-section-1">
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
        <div className="zone__tile--details zone__tile--details-section-2">
          <div className="zone--details-label">Type of Crop:</div>
          <div className="zone--details-value">{zone.customCrop.name}</div>
          <div className="zone--details-label">Type of Nozzle:</div>
          <div className="zone--details-value">{zone.customNozzle.name}</div>
          <div className="zone--details-label">Amount of Shade:</div>
          <div className="zone--details-value">{zone.customShade.name}</div>
          <div className="zone--details-label">Soil:</div>
          <div className="zone--details-value">{zone.customSoil.name}</div>
        </div>
        <div className="zone__tile--details zone__tile--details-section-3">
          <div className="zone--details-label">Depth of Water:</div>
          <div className="zone--details-value">{zone.depthOfWater}</div>
          <div className="zone--details-label">Saturation Depth:</div>
          <div className="zone--details-value">{zone.saturatedDepthOfWater}</div>
          <div className="zone--details-label">Efficiency:</div>
          <div className="zone--details-value">{zone.efficiency}</div>
          <div className="zone--details-label">Root Depth:</div>
          <div className="zone--details-value">{zone.rootZoneDepth}</div>
          <div className="zone--details-label">Yard Measurement (sqft):</div>
          <div className="zone--details-value">{zone.yardAreaSquareFeet}</div>
        </div>
      </div>
    </TileBelowTheFoldContent>
  </ExpandableTile>
);

export default ZoneTiles;
