import React from 'react';
import Schermo, { type SchermoProps } from './Schermo';

interface CorniceTelefonoProps extends SchermoProps {
  comeFigura?: boolean;
}

const CorniceTelefono: React.FC<CorniceTelefonoProps> = ({ comeFigura = false, ...schermo }) => {
  const Cornice = comeFigura ? 'figure' : 'div';
  return (
    <Cornice className="telefono">
      <Schermo {...schermo} />
    </Cornice>
  );
};

export default CorniceTelefono;
