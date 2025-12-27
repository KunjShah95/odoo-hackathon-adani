import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { Input, TextArea } from '../components/ui/Input';
import { Modal, ModalActions } from '../components/ui/Modal';
import { getInitials, stringToColor, cn } from '../utils/helpers';
import type { MaintenanceTeam } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Users, Wrench, MoreVertical, UserPlus, ChevronRight, Sparkles, Shield, Zap, Target } from 'lucide-react';

const mockTeams: MaintenanceTeam[] = [
    {
        id: '1',
        name: 'Precision Mechanical',
        specialization: 'High-Torque Machinery',
        description: 'Specialized in turbine maintenance, high-pressure hydraulic systems, and precision mechanical components requiring sub-millimeter tolerances.',
        members: [
            { id: '1', userId: '1', teamId: '1', role: 'LEAD', user: { id: '1', email: 'jack@corp.com', name: 'Jack Stone', role: 'TECHNICIAN', createdAt: '', updatedAt: '' } },
            { id: '2', userId: '2', teamId: '1', role: 'MEMBER', user: { id: '2', email: 'mike@corp.com', name: 'Mike Miller', role: 'TECHNICIAN', createdAt: '', updatedAt: '' } },
            { id: '3', userId: '3', teamId: '1', role: 'MEMBER', user: { id: '3', email: 'sarah@corp.com', name: 'Sarah Chen', role: 'TECHNICIAN', createdAt: '', updatedAt: '' } },
        ],
        equipmentCount: 145,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Electrical Systems',
        specialization: 'Power Distribution & Control',
        description: 'Handles all wiring infrastructure, sensor arrays, PLC programming, motor controls, and industrial automation systems.',
        members: [
            { id: '4', userId: '4', teamId: '2', role: 'LEAD', user: { id: '4', email: 'lisa@corp.com', name: 'Lisa Ray', role: 'TECHNICIAN', createdAt: '', updatedAt: '' } },
            { id: '5', userId: '5', teamId: '2', role: 'MEMBER', user: { id: '5', email: 'tom@corp.com', name: 'Tom Wilson', role: 'TECHNICIAN', createdAt: '', updatedAt: '' } },
        ],
        equipmentCount: 89,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '3',
        name: 'HVAC Specialists',
        specialization: 'Climate Control Systems',
        description: 'Expert team managing heating, ventilation, air conditioning, and clean room environmental controls across all facilities.',
        members: [
            { id: '6', userId: '6', teamId: '3', role: 'LEAD', user: { id: '6', email: 'david@corp.com', name: 'David Kim', role: 'TECHNICIAN', createdAt: '', updatedAt: '' } },
        ],
        equipmentCount: 67,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '4',
        name: 'Robotics & Automation',
        specialization: 'Industrial Robotics',
        description: 'Maintains robotic arms, automated guided vehicles, pick-and-place systems, and integrated manufacturing cells.',
        members: [
            { id: '7', userId: '7', teamId: '4', role: 'LEAD', user: { id: '7', email: 'alex@corp.com', name: 'Alex Johnson', role: 'TECHNICIAN', createdAt: '', updatedAt: '' } },
            { id: '8', userId: '8', teamId: '4', role: 'MEMBER', user: { id: '8', email: 'emma@corp.com', name: 'Emma Davis', role: 'TECHNICIAN', createdAt: '', updatedAt: '' } },
            { id: '9', userId: '9', teamId: '4', role: 'MEMBER', user: { id: '9', email: 'chris@corp.com', name: 'Chris Lee', role: 'TECHNICIAN', createdAt: '', updatedAt: '' } },
            { id: '10', userId: '10', teamId: '4', role: 'MEMBER', user: { id: '10', email: 'nina@corp.com', name: 'Nina Patel', role: 'TECHNICIAN', createdAt: '', updatedAt: '' } },
        ],
        equipmentCount: 234,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const teamIcons = [
    { icon: Wrench, gradient: 'from-orange-500/20 to-red-500/20', iconColor: 'text-orange-400' },
    { icon: Zap, gradient: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400' },
    { icon: Target, gradient: 'from-green-500/20 to-emerald-500/20', iconColor: 'text-green-400' },
    { icon: Sparkles, gradient: 'from-purple-500/20 to-pink-500/20', iconColor: 'text-purple-400' },
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function TeamsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

    const filtered = mockTeams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = [
        { label: 'Total Teams', value: mockTeams.length, icon: Users },
        { label: 'Team Members', value: mockTeams.reduce((acc, t) => acc + t.members.length, 0), icon: UserPlus },
        { label: 'Assets Managed', value: mockTeams.reduce((acc, t) => acc + t.equipmentCount, 0), icon: Wrench },
    ];

    return (
        <div className="pb-16 min-h-screen">
            <Header
                title="Team Management"
                subtitle="Manage specialized maintenance teams and workforce allocation"
            />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="px-8 mt-8 space-y-8"
            >
                {/* Stats Row */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="glass-card rounded-2xl p-6 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <stat.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white">{stat.value}</div>
                                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Toolbar */}
                <motion.div
                    variants={itemVariants}
                    className="glass-panel rounded-2xl p-5 flex flex-col lg:flex-row gap-4 items-center justify-between"
                >
                    {/* Search */}
                    <div className="relative w-full lg:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search teams or specializations..."
                            className="w-full pl-11 pr-4 h-12 bg-white/[0.03] border border-white/[0.06] rounded-xl outline-none focus:border-primary/50 focus:bg-white/[0.06] text-sm text-white transition-all placeholder:text-slate-600"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <Button
                            variant="outline"
                            className="flex-1 lg:flex-none h-12 rounded-xl px-6"
                        >
                            <Icon icon="solar:filter-bold" className="w-4 h-4 mr-2" />
                            Filters
                        </Button>
                        <Button
                            className="flex-1 lg:flex-none h-12 rounded-xl px-6"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            New Team
                        </Button>
                    </div>
                </motion.div>

                {/* Teams Grid */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 xl:grid-cols-2 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map((team, index) => {
                            const teamStyle = teamIcons[index % teamIcons.length];
                            const TeamIcon = teamStyle.icon;

                            return (
                                <motion.div
                                    key={team.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={cn(
                                        "glass-card rounded-3xl overflow-hidden group cursor-pointer",
                                        selectedTeam === team.id && "ring-2 ring-primary"
                                    )}
                                    onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
                                >
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Left Side: Team Identity */}
                                        <div className="lg:w-48 p-8 bg-white/[0.02] border-b lg:border-b-0 lg:border-r border-white/[0.05] flex flex-col items-center justify-center gap-4">
                                            <div className={cn(
                                                "w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300",
                                                "bg-gradient-to-br group-hover:scale-110",
                                                teamStyle.gradient
                                            )}>
                                                <TeamIcon className={cn("w-10 h-10", teamStyle.iconColor)} />
                                            </div>
                                            <div className="text-center">
                                                <div className="text-[10px] font-bold text-primary uppercase tracking-wider">
                                                    Team #{team.id.padStart(2, '0')}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side: Team Details */}
                                        <div className="flex-1 p-8">
                                            {/* Header Row */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-1">
                                                        {team.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                                        <Shield className="w-3.5 h-3.5" />
                                                        <span>{team.specialization}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-colors"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <MoreVertical className="w-4 h-4 text-slate-500" />
                                                </button>
                                            </div>

                                            {/* Description */}
                                            <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-2">
                                                {team.description}
                                            </p>

                                            {/* Footer Row */}
                                            <div className="flex items-center justify-between pt-6 border-t border-white/[0.05]">
                                                {/* Team Members */}
                                                <div className="flex items-center gap-3">
                                                    <div className="flex -space-x-2">
                                                        {team.members.slice(0, 4).map((member) => (
                                                            <div
                                                                key={member.id}
                                                                className="w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-bold text-white border-2 border-surface shadow-lg transition-transform hover:scale-110 hover:z-10"
                                                                style={{ backgroundColor: stringToColor(member.user.name) }}
                                                                title={member.user.name}
                                                            >
                                                                {getInitials(member.user.name)}
                                                            </div>
                                                        ))}
                                                        {team.members.length > 4 && (
                                                            <div className="w-9 h-9 rounded-xl bg-white/[0.05] border-2 border-surface flex items-center justify-center text-[10px] font-bold text-slate-400">
                                                                +{team.members.length - 4}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button className="w-9 h-9 rounded-xl bg-white/[0.03] border-2 border-dashed border-white/[0.1] flex items-center justify-center hover:bg-primary/10 hover:border-primary/50 transition-all">
                                                        <UserPlus className="w-4 h-4 text-slate-600 hover:text-primary" />
                                                    </button>
                                                </div>

                                                {/* Stats & CTA */}
                                                <div className="flex items-center gap-6">
                                                    <div className="text-right">
                                                        <div className="text-xl font-bold text-white">{team.equipmentCount}</div>
                                                        <div className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Assets</div>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        View
                                                        <ChevronRight className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filtered.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-white/[0.03] flex items-center justify-center mx-auto mb-6">
                            <Users className="w-10 h-10 text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No teams found</h3>
                        <p className="text-slate-500 mb-6">Try adjusting your search or create a new team.</p>
                        <Button onClick={() => setIsModalOpen(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Create Team
                        </Button>
                    </motion.div>
                )}
            </motion.div>

            {/* Create Team Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Team"
            >
                <div className="space-y-6 pt-4">
                    <Input
                        label="Team Name"
                        placeholder="e.g., Precision Mechanical"
                    />
                    <Input
                        label="Specialization"
                        placeholder="e.g., High-Torque Machinery"
                    />
                    <TextArea
                        label="Description"
                        placeholder="Describe the team's responsibilities and expertise..."
                        rows={4}
                    />

                    <ModalActions>
                        <Button
                            variant="ghost"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={() => setIsModalOpen(false)}>
                            Create Team
                        </Button>
                    </ModalActions>
                </div>
            </Modal>
        </div>
    );
}
