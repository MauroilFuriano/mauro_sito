import React from 'react';
import PaginaServizio from '../components/vetrina/PaginaServizio';
import { paginaCommercialisti } from '../data/pagineServizio';

const CommercialistiLanding: React.FC = () => <PaginaServizio contenuto={paginaCommercialisti} />;

export default CommercialistiLanding;
