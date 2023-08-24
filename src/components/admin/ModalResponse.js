import React, { useState } from 'react';

const ModalResponse = ({ isOpen, onClose, children , button }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlayRep">
      <div className="modal-contentRep">
        {children}
        <button className="modal-close-button btn btn-dark form-control" onClick={onClose}>
          {button}
        </button>
      </div>
    </div>
  );
};

export default ModalResponse;