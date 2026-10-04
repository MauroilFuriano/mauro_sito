import React from 'react';
import PaginaServizio from '../components/vetrina/PaginaServizio';
import { paginaHotel } from '../data/pagineServizio';

const HotelLanding: React.FC = () => <PaginaServizio contenuto={paginaHotel} />;

export default HotelLanding;
