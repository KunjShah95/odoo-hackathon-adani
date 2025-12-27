import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { Badge, PriorityBadge } from '../components/ui/Badge';
import { Modal, ModalActions } from '../components/ui/Modal';
import { Input, TextArea } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { PRIORITY_OPTIONS } from '../utils/constants';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek, isToday } from 'date-fns';
import { cn } from '../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin, Wrench, Lightbulb } from 'lucide-react';

interface ScheduledEvent {
    id: string;
    date: Date;
    title: string;
    priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    type: 'PREVENTIVE' | 'CORRECTIVE'; // Matches RequestType enum
    status: 'NEW' | 'IN_PROGRESS' | 'REPAIRED' | 'SCRAP';
    equipment: string;
    location: string;
    duration: string;
}

// Mock PREVENTIVE maintenance events - In production, these would come from:
// import { getCalendarRequests } from '../api/requests';
// Then map the response to ScheduledEvent format
const mockEvents: ScheduledEvent[] = [
    { id: '1', date: new Date(2025, 11, 28), title: 'Compressor Service', priority: 'HIGH', type: 'PREVENTIVE', status: 'NEW', equipment: 'Air Compressor Unit 3', location: 'Building A', duration: '4 hours' },
    { id: '2', date: new Date(2025, 11, 30), title: 'HVAC Calibration', priority: 'MEDIUM', type: 'PREVENTIVE', status: 'NEW', equipment: 'HVAC Zone B', location: 'Floor 2', duration: '2 hours' },
    { id: '3', date: new Date(2026, 0, 5), title: 'Filter Replacement', priority: 'LOW', type: 'PREVENTIVE', status: 'NEW', equipment: 'Ventilation System', location: 'Rooftop', duration: '1 hour' },
    { id: '4', date: new Date(2026, 0, 8), title: 'Fire System Inspection', priority: 'CRITICAL', type: 'PREVENTIVE', status: 'IN_PROGRESS', equipment: 'Fire Suppression', location: 'All Floors', duration: '6 hours' },
    { id: '5', date: new Date(2026, 0, 15), title: 'Quarterly PM Check', priority: 'MEDIUM', type: 'PREVENTIVE', status: 'NEW', equipment: 'CNC Machine 4', location: 'Workshop', duration: '3 hours' },
    // Today's scheduled maintenance
    { id: '6', date: new Date(), title: 'Daily Safety Check', priority: 'MEDIUM', type: 'PREVENTIVE', status: 'NEW', equipment: 'Factory Floor Equipment', location: 'Production Area', duration: '1 hour' },
];

const eventColors: Record<string, { bg: string; border: string; text: string }> = {
    CRITICAL: { bg: 'bg-danger/20', border: 'border-danger/50', text: 'text-danger' },
    HIGH: { bg: 'bg-warning/20', border: 'border-warning/50', text: 'text-warning' },
    MEDIUM: { bg: 'bg-primary/20', border: 'border-primary/50', text: 'text-primary' },
    LOW: { bg: 'bg-slate-500/20', border: 'border-slate-500/50', text: 'text-slate-400' },
};

export function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const goToToday = () => setCurrentDate(new Date());

    const getEventsForDay = (day: Date) => mockEvents.filter(e => isSameDay(e.date, day));
    const selectedEvents = selectedDate ? getEventsForDay(selectedDate) : [];

    // Stats
    const thisMonthEvents = mockEvents.filter(e =>
        e.date.getMonth() === currentDate.getMonth() &&
        e.date.getFullYear() === currentDate.getFullYear()
    );
    const criticalCount = thisMonthEvents.filter(e => e.priority === 'CRITICAL').length;

    return (
        <div className="pb-16 min-h-screen">
            <Header
                title="Maintenance Calendar"
                subtitle="Schedule and track preventive maintenance activities"
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-8 mt-8"
            >
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                    {/* Main Calendar */}
                    <div className="xl:col-span-3 space-y-6">
                        {/* Calendar Header */}
                        <div className="glass-panel rounded-2xl p-6 flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <CalendarIcon className="w-7 h-7 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">
                                        {format(currentDate, 'MMMM yyyy')}
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        {thisMonthEvents.length} scheduled events
                                        {criticalCount > 0 && (
                                            <span className="text-danger ml-2">• {criticalCount} critical</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" size="sm" onClick={goToToday}>
                                    Today
                                </Button>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={prevMonth}
                                        className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-all"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-slate-400" />
                                    </button>
                                    <button
                                        onClick={nextMonth}
                                        className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-all"
                                    >
                                        <ChevronRight className="w-5 h-5 text-slate-400" />
                                    </button>
                                </div>
                                <Button onClick={() => setIsModalOpen(true)}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Schedule Event
                                </Button>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="glass-card rounded-2xl overflow-hidden">
                            {/* Day Headers */}
                            <div className="grid grid-cols-7 border-b border-white/[0.05] bg-white/[0.02]">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500 border-r border-white/[0.05] last:border-0">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Days */}
                            <div className="grid grid-cols-7">
                                {days.map((day, idx) => {
                                    const eventsForDay = getEventsForDay(day);
                                    const isCurrentMonth = isSameMonth(day, currentDate);
                                    const isTodayDate = isToday(day);
                                    const isSelected = selectedDate && isSameDay(day, selectedDate);

                                    return (
                                        <div
                                            key={day.toString()}
                                            onClick={() => setSelectedDate(day)}
                                            className={cn(
                                                "min-h-[120px] p-3 border-r border-b border-white/[0.05] cursor-pointer transition-all",
                                                !isCurrentMonth && "opacity-30 bg-black/20",
                                                isSelected && "bg-primary/5 border-primary/20",
                                                !isSelected && "hover:bg-white/[0.02]",
                                                (idx + 1) % 7 === 0 && "border-r-0"
                                            )}
                                        >
                                            <span className={cn(
                                                "inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-semibold transition-all",
                                                isTodayDate && "bg-primary text-white shadow-lg shadow-primary/30",
                                                isSelected && !isTodayDate && "bg-white/10 text-white",
                                                !isTodayDate && !isSelected && "text-slate-400"
                                            )}>
                                                {format(day, 'd')}
                                            </span>

                                            <div className="mt-2 space-y-1">
                                                {eventsForDay.slice(0, 2).map(evt => {
                                                    const colors = eventColors[evt.priority];
                                                    return (
                                                        <div
                                                            key={evt.id}
                                                            className={cn(
                                                                "px-2 py-1 rounded-lg text-[10px] font-medium truncate border",
                                                                colors.bg,
                                                                colors.border,
                                                                colors.text
                                                            )}
                                                        >
                                                            {evt.title}
                                                        </div>
                                                    );
                                                })}
                                                {eventsForDay.length > 2 && (
                                                    <div className="px-2 text-[10px] text-slate-500 font-medium">
                                                        +{eventsForDay.length - 2} more
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Selected Day Events */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                                {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Select a date'}
                            </h3>

                            <AnimatePresence mode="popLayout">
                                {selectedEvents.length > 0 ? (
                                    selectedEvents.map((evt, i) => (
                                        <motion.div
                                            key={evt.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="glass-card rounded-2xl p-5 group hover:border-primary/30 transition-all cursor-pointer"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <PriorityBadge priority={evt.priority} />
                                                <div className="flex items-center gap-1.5">
                                                    <Badge variant="primary" size="xs">{evt.type}</Badge>
                                                    <Badge
                                                        variant={
                                                            evt.status === 'NEW' ? 'default' :
                                                                evt.status === 'IN_PROGRESS' ? 'warning' :
                                                                    evt.status === 'REPAIRED' ? 'success' : 'danger'
                                                        }
                                                        size="xs"
                                                    >
                                                        {evt.status.replace('_', ' ')}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <h4 className="font-semibold text-white mb-3 group-hover:text-primary transition-colors">
                                                {evt.title}
                                            </h4>
                                            <div className="space-y-2 text-xs text-slate-500">
                                                <div className="flex items-center gap-2">
                                                    <Wrench className="w-3.5 h-3.5" />
                                                    <span>{evt.equipment}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    <span>{evt.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    <span>{evt.duration}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="glass-card rounded-2xl p-8 text-center">
                                        <CalendarIcon className="w-10 h-10 text-slate-700 mx-auto mb-4" />
                                        <p className="text-slate-500 text-sm">
                                            {selectedDate ? 'No events scheduled' : 'Select a date to view events'}
                                        </p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Upcoming Events */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                                Upcoming
                            </h3>
                            {mockEvents.slice(0, 3).map(evt => (
                                <div
                                    key={evt.id}
                                    className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl flex items-center gap-4 hover:bg-white/[0.04] transition-all cursor-pointer group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Clock className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-white text-sm truncate group-hover:text-primary transition-colors">
                                            {evt.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            {format(evt.date, 'MMM dd, yyyy')}
                                        </p>
                                    </div>
                                    <PriorityBadge priority={evt.priority} />
                                </div>
                            ))}
                        </div>

                        {/* Smart Insight */}
                        <div className="glass-card rounded-2xl p-5 bg-gradient-to-br from-primary/5 to-transparent border-primary/20 relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Lightbulb className="w-5 h-5 text-primary" />
                                </div>
                                <h4 className="font-bold text-white">AI Insight</h4>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Based on historical patterns, consider scheduling an HVAC filter check before the cooling season begins. This could prevent 3 potential breakdowns.
                            </p>
                            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/10 blur-3xl rounded-full" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Schedule Event Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Schedule Maintenance Event"
                subtitle="Add a new preventive maintenance task"
            >
                <div className="space-y-6">
                    <Input label="Event Title" placeholder="e.g., Quarterly HVAC Inspection" />
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Date" type="date" />
                        <Input label="Duration" placeholder="e.g., 2 hours" />
                    </div>
                    <Input label="Equipment" placeholder="Select equipment" />
                    <div className="grid grid-cols-2 gap-4">
                        <Select label="Priority" options={PRIORITY_OPTIONS} placeholder="Select priority" />
                        <Select
                            label="Type"
                            options={[
                                { value: 'maintenance', label: 'Maintenance' },
                                { value: 'inspection', label: 'Inspection' },
                                { value: 'calibration', label: 'Calibration' },
                            ]}
                            placeholder="Select type"
                        />
                    </div>
                    <TextArea label="Notes" placeholder="Additional details..." rows={3} />

                    <ModalActions>
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setIsModalOpen(false)}>
                            Schedule Event
                        </Button>
                    </ModalActions>
                </div>
            </Modal>
        </div>
    );
}
