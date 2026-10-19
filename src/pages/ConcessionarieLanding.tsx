import React from 'react';
import PaginaServizio from '../components/vetrina/PaginaServizio';
import { paginaConcessionarie } from '../data/pagineServizio';

const ConcessionarieLanding: React.FC = () => <PaginaServizio contenuto={paginaConcessionarie} />;

export default ConcessionarieLanding;
