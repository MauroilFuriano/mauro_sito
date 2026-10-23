import React from 'react';
import PaginaServizio from '../components/vetrina/PaginaServizio';
import { paginaDentisti } from '../data/pagineServizio';

const DentistiLanding: React.FC = () => <PaginaServizio contenuto={paginaDentisti} />;

export default DentistiLanding;
