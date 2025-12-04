import React, { useState } from 'react';
import { Professional } from '../types';
import { Button } from './Button';
import { MapPin, Video, Search, CheckCircle, Calendar } from 'lucide-react';

// Mock Data
const MOCK_PROFESSIONALS: Professional[] = [
  {
    id: '1',
    name: 'Dr. Lucas Viana',
    title: 'Psiquiatra Comportamental',
    specialties: ['Ansiedade', 'Burnout', 'Performance'],
    isOnline: true,
    location: 'São Paulo, SP',
    available: true,
  },
  {
    id: '2',
    name: 'Elena S. Costa',
    title: 'Psicóloga Cognitiva (TCC)',
    specialties: ['Reestruturação', 'Fobias', 'Carreira'],
    isOnline: true,
    location: 'Online',
    available: true,
  },
  {
    id: '3',
    name: 'Marco Antunes',
    title: 'Mentor de Alta Performance',
    specialties: ['Liderança', 'Gestão de Tempo', 'Estoicismo'],
    isOnline: false,
    location: 'Rio de Janeiro, RJ',
    available: false,
  },
  {
    id: '4',
    name: 'Dra. Sofia Mendes',
    title: 'Neuropsicóloga',
    specialties: ['TDAH', 'Foco', 'Regulação Emocional'],
    isOnline: true,
    location: 'Online',
    available: true,
  }
];

interface DirectoryProps {
  onBack: () => void;
}

export const ProfessionalDirectory: React.FC<DirectoryProps> = ({ onBack }) => {
  const [filter, setFilter] = useState('');

  const filteredPros = MOCK_PROFESSIONALS.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    p.specialties.some(s => s.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto w-full pt-10 px-6 animate-fade-in pb-20">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Área VIP</h2>
          <p className="text-gray-400">Especialistas certificados para sua estratégia.</p>
        </div>
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-white transition-colors">
          FECHAR
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input 
          type="text"
          placeholder="Filtrar por nome, especialidade ou ansiedade..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full bg-[#111] border border-[#333] rounded-xl py-4 pl-12 pr-4 text-white focus:border-white transition-colors outline-none placeholder-gray-600"
        />
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredPros.map(pro => (
          <div key={pro.id} className="bg-[#0a0a0a] border border-[#222] p-6 rounded-xl hover:border-[#444] transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{pro.name}</h3>
                <p className="text-gray-400 text-sm">{pro.title}</p>
              </div>
              {pro.available ? (
                <span className="bg-green-900/20 text-green-500 text-xs px-2 py-1 rounded font-medium border border-green-900/30">
                  DISPONÍVEL
                </span>
              ) : (
                <span className="bg-red-900/20 text-red-500 text-xs px-2 py-1 rounded font-medium border border-red-900/30">
                  OCUPADO
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {pro.specialties.map(s => (
                <span key={s} className="text-xs text-gray-300 bg-[#1a1a1a] px-2 py-1 rounded">
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 font-mono">
              <span className="flex items-center gap-1">
                {pro.isOnline ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                {pro.location}
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Verificado
              </span>
            </div>

            <Button fullWidth variant="secondary" disabled={!pro.available} className="text-sm py-3">
              {pro.available ? 'Solicitar Agenda' : 'Lista de Espera'} <Calendar className="w-4 h-4 ml-2 inline" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProfessionalRegister: React.FC<{onBack: () => void}> = ({ onBack }) => {
  return (
    <div className="max-w-2xl mx-auto w-full pt-10 px-6 animate-slide-up pb-20">
      <div className="mb-10">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-white mb-6">← Voltar</button>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Portal do Especialista</h2>
        <p className="text-gray-400">Cadastro para profissionais de saúde mental e performance.</p>
      </div>

      <form className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-gray-500">Nome Completo</label>
            <input type="text" className="w-full bg-[#0a0a0a] border-b border-[#333] py-2 text-white outline-none focus:border-white transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-gray-500">Título Profissional</label>
            <input type="text" placeholder="Ex: Psiquiatra, Coach" className="w-full bg-[#0a0a0a] border-b border-[#333] py-2 text-white outline-none focus:border-white transition-colors" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-gray-500">Registro Profissional (CRM/CRP)</label>
          <input type="text" className="w-full bg-[#0a0a0a] border-b border-[#333] py-2 text-white outline-none focus:border-white transition-colors" />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-gray-500">Upload de Credenciais (PDF)</label>
          <div className="border border-dashed border-[#333] rounded-lg p-8 text-center hover:bg-[#111] cursor-pointer transition-colors">
            <p className="text-gray-500 text-sm">Arraste seus documentos ou clique aqui</p>
          </div>
        </div>

        <div className="pt-4">
          <Button fullWidth>Submeter para Aprovação</Button>
        </div>
      </form>
    </div>
  );
};