export const StatsSection = () => {
    return (
        <section className="bg-primary py-8 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                    <div className="text-4xl font-bold text-white mb-2">500+</div>
                    <div className="text-sm text-white/80 uppercase tracking-wide">Active Members</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-white mb-2">120</div>
                    <div className="text-sm text-white/80 uppercase tracking-wide">Events Held</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-white mb-2">15</div>
                    <div className="text-sm text-white/80 uppercase tracking-wide">Diverse Areas</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-white mb-2">12</div>
                    <div className="text-sm text-white/80 uppercase tracking-wide">Technical Chapters</div>
                </div>
            </div>
        </section>
    );
};
