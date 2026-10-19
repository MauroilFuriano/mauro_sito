import React from 'react';
import PaginaServizio from '../components/vetrina/PaginaServizio';
import { paginaAssistente } from '../data/pagineServizio';

const AssistentePage: React.FC = () => <PaginaServizio contenuto={paginaAssistente} />;

export default AssistentePage;
