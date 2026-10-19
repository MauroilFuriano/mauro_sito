import React from 'react';
import PaginaServizio from '../components/vetrina/PaginaServizio';
import { paginaAbbonamenti } from '../data/pagineServizio';

const AbbonamentiPage: React.FC = () => <PaginaServizio contenuto={paginaAbbonamenti} />;

export default AbbonamentiPage;
