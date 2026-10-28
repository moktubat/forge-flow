
type SectionHeaderProps = {
    label: string;
    heading: string;
    accentWord?: string;
    align?: 'left' | 'center';
    className?: string;
    animationClass?: string;
};

export default function SectionHeader({
    label,
    heading,
    accentWord,
    align = 'left',
    className = '',
    animationClass = 'section-header',
}: SectionHeaderProps) {
    const alignClass = align === 'center'
        ? 'items-center text-center'
        : 'items-start text-left';

    const renderWithBreaks = (text: string) =>
        text.split('\n').map((line, i, arr) => (
            <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
            </span>
        ));

    const headingParts = accentWord
        ? heading.split(accentWord)
        : [heading];

    return (
        <div className={`flex flex-col gap-6 ${alignClass} ${className}`}>
            {/* Pill label */}
            <div className={`section-header-item glass px-4 py-1 rounded-full text-[12px] tracking-[0.15em] font-sans text-white/50 border border-white/10 uppercase ${align === 'center' ? 'self-center' : 'self-start'}`}>
                {label}
            </div>

            {/* Heading */}
            <h2 className="section-header-item text-section leading-none">
                {accentWord ? (
                    <>
                        {renderWithBreaks(headingParts[0])}
                        <span className="text-accent underline underline-offset-8 decoration-accent/30">
                            {accentWord}
                        </span>
                        {headingParts[1] && renderWithBreaks(headingParts[1])}
                    </>
                ) : (
                    renderWithBreaks(heading)
                )}
            </h2>

        </div>
    );
}