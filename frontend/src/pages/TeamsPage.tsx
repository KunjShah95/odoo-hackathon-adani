import { useState } from 'react';
import { Plus, Search, Users, UserPlus, MoreVertical, Shield, Briefcase, ChevronRight } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, TextArea } from '../components/ui/Input';
import { Modal, ModalActions } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { getInitials, stringToColor } from '../utils/helpers';
import type { MaintenanceTeam } from '../types';

const mockTeams: MaintenanceTeam[] = [
    {
        id: '1',
        name: 'Precision Mechanical',
        specialization: 'High-Torque Machinery',
        description: 'Specialized in turbine maintenance and high-pressure hydraulic systems.',
        members: [
            { id: '1', userId: '1', teamId: '1', role: 'LEAD', user: { id: '1', email: 'jack@corp.com', name: 'Jack Stone', role: 'TECHNICIAN', createdAt: '', updatedAt: '' } },
            { id: '2', userId: '2', teamId: '1', role: 'MEMBER', user: { id: '2', email: 'mike@corp.com', name: 'Mike Miller', role: 'TECHNICIAN', createdAt: '', updatedAt: '' } },
        ],
        equipmentCount: 45,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Electrical Systems',
        specialization: 'Power Distribution & Control',
        description: 'Handles all wiring, sensor arrays, and PLC programming logic.',
        members: [
            { id: '3', userId: '3', teamId: '2', role: 'LEAD', user: { id: '3', email: 'lisa@corp.com', name: 'Lisa Ray', role: 'TECHNICIAN', createdAt: '', updatedAt: '' } },
        ],
        equipmentCount: 22,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export function TeamsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = mockTeams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="pb-12">
            <Header
                title="Operations Teams"
                subtitle="Organize and deploy specialized maintenance workforce."
            />

            <div className="px-8 mt-8 space-y-8 animate-fade-in">
                {/* Toolbar */}
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="relative group w-full lg:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by team name or specialty..."
                            className="w-full pl-12 pr-4 h-12 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-primary/50 text-sm font-medium transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button className="h-12 rounded-2xl px-8 w-full lg:w-auto" onClick={() => setIsModalOpen(true)}>
                        <Plus className="w-5 h-5 mr-2" />
                        Create Squad
                    </Button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {filtered.map(team => (
                        <Card key={team.id} className="group relative overflow-hidden flex flex-col lg:flex-row p-0">
                            {/* Left Side: Team Branding */}
                            <div className="w-full lg:w-48 bg-white/[0.02] border-b lg:border-b-0 lg:border-r border-white/5 p-8 flex flex-col items-center justify-center gap-4 text-center shrink-0">
                                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-blue-500/10 flex items-center justify-center ring-4 ring-white/5">
                                    <Shield className="w-10 h-10 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-black text-white text-lg tracking-tight">{team.name.split(' ')[0]}</h4>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Unit {team.id.padStart(2, '0')}</p>
                                </div>
                            </div>

                            {/* Right Side: Details */}
                            <div className="flex-1 p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{team.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                                            <span className="text-xs font-bold text-slate-500">{team.specialization}</span>
                                        </div>
                                    </div>
                                    <button className="p-2 text-slate-500 hover:text-white transition-colors">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>

                                <p className="text-sm text-slate-400 leading-relaxed mb-8">{team.description}</p>

                                {/* Members */}
                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <div className="flex -space-x-3">
                                        {team.members.map(member => (
                                            <div
                                                key={member.id}
                                                className="w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-bold text-white border-2 border-surface shadow-xl relative group/member"
                                                style={{ backgroundColor: stringToColor(member.user.name) }}
                                            >
                                                {getInitials(member.user.name)}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-surface-dark border border-white/10 rounded-lg text-[8px] font-bold text-white whitespace-nowrap opacity-0 group-hover/member:opacity-100 transition-opacity">
                                                    {member.user.name} ({member.role})
                                                </div>
                                            </div>
                                        ))}
                                        <button className="w-10 h-10 rounded-2xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 transition-all">
                                            <UserPlus className="w-4 h-4 text-slate-500" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-white">{team.equipmentCount}</div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Assets Managed</div>
                                        </div>
                                        <Button variant="outline" size="sm" className="h-10 rounded-xl px-4 text-xs font-bold border-white/5 group-hover:border-primary/50">
                                            Details <ChevronRight className="w-3.5 h-3.5 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Form New Operations Squad">
                <div className="space-y-6 pt-4">
                    <Input label="Team Designation" placeholder="e.g. Mechanical Unit A" />
                    <Input label="Operational Specialty" placeholder="e.g. Hydraulic & Pneumatics" />
                    <TextArea label="Mission Description" placeholder="Define the team's primary objectives..." />

                    <ModalActions>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Discard</Button>
                        <Button onClick={() => setIsModalOpen(false)}>Authorize Squad</Button>
                    </ModalActions>
                </div>
            </Modal>
        </div>
    );
}
