import React from 'react';
import PaginaServizio from '../components/vetrina/PaginaServizio';
import { paginaAuditGeo } from '../data/pagineServizio';

const AuditGeoPage: React.FC = () => <PaginaServizio contenuto={paginaAuditGeo} />;

export default AuditGeoPage;
