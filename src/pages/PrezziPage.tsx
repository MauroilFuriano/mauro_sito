import React from 'react';
import PaginaServizio from '../components/vetrina/PaginaServizio';
import { paginaPrezzi } from '../data/pagineServizio';

const PrezziPage: React.FC = () => <PaginaServizio contenuto={paginaPrezzi} />;

export default PrezziPage;
