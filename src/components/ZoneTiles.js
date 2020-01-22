import React, { useState } from 'react';
import { Modal, ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent, Form, NumberInput } from 'carbon-components-react'

import '../styles/DeviceTiles.scss';

export const ZoneTiles = ({ zone, handleChange, handleSubmit, openModal, toggleModal }) => {
  return (
    <>
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
              alt={`{zone.name} image`}
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
            <div className="section-4">
            </div>
          </div>
        </TileBelowTheFoldContent>
      </ExpandableTile>
      <Modal
        className="confirmation__modal"
        open={openModal}
        onClick={() => toggleModal()}
      >
        <p className="bx--modal-content__text">
          Please see ModalWrapper for more examples and demo of the functionality.
        </p>
      </Modal>
    </>
  )
}

export default ZoneTiles;
