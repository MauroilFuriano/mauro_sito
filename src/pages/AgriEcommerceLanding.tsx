import React from 'react';
import PaginaServizio from '../components/vetrina/PaginaServizio';
import { paginaAgricola } from '../data/pagineServizio';

const AgriEcommerceLanding: React.FC = () => <PaginaServizio contenuto={paginaAgricola} />;

export default AgriEcommerceLanding;
