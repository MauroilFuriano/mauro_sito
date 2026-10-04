import React from 'react';
import PaginaServizio from '../components/vetrina/PaginaServizio';
import { paginaGestionale } from '../data/pagineServizio';

const SaasLanding: React.FC = () => <PaginaServizio contenuto={paginaGestionale} />;

export default SaasLanding;
