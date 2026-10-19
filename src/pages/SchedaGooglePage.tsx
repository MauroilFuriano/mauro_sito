import React from 'react';
import PaginaServizio from '../components/vetrina/PaginaServizio';
import { paginaSchedaGoogle } from '../data/pagineServizio';

const SchedaGooglePage: React.FC = () => <PaginaServizio contenuto={paginaSchedaGoogle} />;

export default SchedaGooglePage;
