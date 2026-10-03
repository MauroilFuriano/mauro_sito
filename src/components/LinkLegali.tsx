import React from 'react';
import { Link } from 'react-router-dom';
import { apriPreferenzeCookie } from '../misurazione';

const LinkLegali: React.FC<{ className?: string }> = ({ className = '' }) => (
  <nav aria-label="Informazioni legali" className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs ${className}`}>
    <Link to="/privacy-policy" className="py-1 hover:underline underline-offset-4">Privacy policy</Link>
    <span aria-hidden="true">·</span>
    <Link to="/cookie-policy" className="py-1 hover:underline underline-offset-4">Cookie policy</Link>
    <span aria-hidden="true">·</span>
    <button type="button" onClick={apriPreferenzeCookie} className="py-1 hover:underline underline-offset-4">Preferenze cookie</button>
  </nav>
);

export default LinkLegali;
