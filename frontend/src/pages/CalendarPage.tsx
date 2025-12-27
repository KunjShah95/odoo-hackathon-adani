import { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    Clock,
    Wrench,
    AlertCircle,
    Plus
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PriorityBadge } from '../components/ui/Badge';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { cn } from '../utils/helpers';

const mockEvents = [
    { id: '1', date: new Date(2025, 11, 28), title: 'Compressor Service', priority: 'HIGH' },
    { id: '2', date: new Date(2025, 11, 30), title: 'HVAC Calibration', priority: 'MEDIUM' },
    { id: '3', date: new Date(2026, 0, 5), title: 'Filter Replacement', priority: 'LOW' },
];

export function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    return (
        <div className="pb-12">
            <Header
                title="Service Schedule"
                subtitle="Visual timeline of preventive maintenance and inspections."
            />

            <div className="px-8 mt-8 grid grid-cols-1 xl:grid-cols-3 gap-10 animate-fade-in">
                {/* Left: Main Calendar */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between bg-white/[0.02] p-6 rounded-3xl border border-white/5 shadow-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                                <CalendarIcon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{format(currentDate, 'MMMM yyyy')}</h3>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{days.length} Operable Days</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={prevMonth} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all">
                                <ChevronLeft className="w-5 h-5 text-white" />
                            </button>
                            <button onClick={nextMonth} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all">
                                <ChevronRight className="w-5 h-5 text-white" />
                            </button>
                            <Button onClick={() => { }} className="ml-4 rounded-xl px-6 font-bold h-12">
                                <Plus className="w-4 h-4 mr-2" />
                                New Event
                            </Button>
                        </div>
                    </div>

                    <div className="bg-surface border border-white/5 rounded-3xl shadow-2xl overflow-hidden">
                        <div className="grid grid-cols-7 border-b border-white/5 bg-white/[0.02]">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-r border-white/5 last:border-0">
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7">
                            {days.map((day, idx) => {
                                const eventsForDay = mockEvents.filter(e => isSameDay(e.date, day));
                                return (
                                    <div
                                        key={day.toString()}
                                        className={cn(
                                            "min-h-[140px] p-4 border-r border-b border-white/5 hover:bg-white/[0.02] transition-colors relative",
                                            !isSameMonth(day, currentDate) && "opacity-20 pointer-events-none bg-black/20",
                                            (idx + 1) % 7 === 0 && "border-r-0"
                                        )}
                                    >
                                        <span className={cn(
                                            "text-sm font-bold",
                                            isSameDay(day, new Date()) ? "w-7 h-7 bg-primary text-white flex items-center justify-center rounded-lg shadow-lg shadow-primary/20" : "text-slate-500"
                                        )}>
                                            {format(day, 'd')}
                                        </span>

                                        <div className="mt-4 space-y-1.5 overflow-hidden">
                                            {eventsForDay.map(evt => (
                                                <div key={evt.id} className="p-1 px-2 rounded-lg bg-white/5 border border-white/5 flex items-center gap-1.5 truncate group cursor-pointer hover:border-primary/50 transition-all">
                                                    <div className={cn(
                                                        "w-1.5 h-1.5 rounded-full shrink-0",
                                                        evt.priority === 'HIGH' ? 'bg-danger' :
                                                            evt.priority === 'MEDIUM' ? 'bg-warning' : 'bg-blue-400'
                                                    )} />
                                                    <span className="text-[9px] font-bold text-slate-300 group-hover:text-white transition-colors truncate">{evt.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right: Agenda/Insights */}
                <div className="space-y-8 pt-4">
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Upcoming Agenda</h3>
                        <div className="space-y-4">
                            {mockEvents.map(evt => (
                                <div key={evt.id} className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/[0.05] transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{evt.title}</h4>
                                            <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest">{format(evt.date, 'MMM dd, yyyy')}</p>
                                        </div>
                                    </div>
                                    <PriorityBadge priority={evt.priority as any} />
                                </div>
                            ))}
                            <button className="w-full py-4 rounded-2xl border border-dashed border-white/10 text-slate-600 text-xs font-bold uppercase tracking-widest hover:border-primary/50 hover:text-primary transition-all">
                                View Full Schedule
                            </button>
                        </div>
                    </div>

                    <div className="card bg-primary/5 border-primary/20">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="text-primary w-6 h-6" />
                            <h4 className="font-bold text-white">Smart Insight</h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed italic">
                            "We noticed a spike in HVAC requests during the upcoming cooling month. Consider pre-emptive filter inventory check."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
