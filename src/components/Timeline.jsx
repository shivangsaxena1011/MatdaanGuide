import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, AlertCircle } from 'lucide-react';

const Timeline = () => {
  const events = [
    { date: 'Jan 10, 2026', title: 'Voter Registration Opens', desc: 'Start applying for new voter ID cards online or offline.' },
    { date: 'Apr 15, 2026', title: 'Last Date to Register', desc: 'Deadline to submit Form 6 for inclusion in the electoral roll.' },
    { date: 'May 10, 2026', title: 'Final Electoral Roll Published', desc: 'Check if your name appears on the final voter list.' },
    { date: 'May 15, 2026', title: 'Voting Day - Phase 1', desc: 'Cast your vote at your designated polling booth.' },
    { date: 'May 25, 2026', title: 'Results Declaration', desc: 'Counting of votes and final results announced.' },
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let currentFound = false;
  const processedEvents = events.map(event => {
    const eventDate = new Date(event.date);
    let status = 'upcoming';
    
    if (eventDate < today) {
      status = 'past';
    } else if (!currentFound) {
      status = 'current';
      currentFound = true;
    }
    return { ...event, status };
  });

  return (
    <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Election Timeline</h2>
        <p className="text-gray-400">Stay updated with important dates and deadlines.</p>
      </div>

      <div className="relative border-l border-gray-700 ml-4 md:ml-0 md:mx-auto md:w-full md:max-w-2xl">
        {processedEvents.map((event, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`mb-10 ml-8 relative ${idx === events.length - 1 ? 'mb-0' : ''}`}
          >
            {/* Timeline dot */}
            <span className={`absolute -left-10 flex items-center justify-center w-5 h-5 rounded-full -translate-x-1.5 ring-4 ring-gray-950 ${
              event.status === 'past' ? 'bg-gray-500' : 
              event.status === 'current' ? 'bg-brand-500 animate-pulse' : 
              'bg-gray-700'
            }`}>
            </span>
            
            <div className="glass-panel p-6 hover:border-brand-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className={`h-4 w-4 ${event.status === 'current' ? 'text-brand-400' : 'text-gray-400'}`} />
                <time className={`text-sm font-semibold ${event.status === 'current' ? 'text-brand-400' : 'text-gray-400'}`}>
                  {event.date}
                </time>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
              <p className="text-base font-normal text-gray-400">{event.desc}</p>
              
              {event.status === 'current' && (
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-400 bg-brand-500/10 px-2 py-1 rounded-md">
                  <AlertCircle className="h-3 w-3" /> Action Required Soon
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
