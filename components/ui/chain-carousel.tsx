"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    LucideIcon,
    Search,
    X,
} from 'lucide-react';

// NOTE: Placeholder for your custom Input component
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} />
);

// --- Core Data Interface ---
export interface ChainItem {
    id: string | number; // Unique ID
    name: string;
    icon: LucideIcon;
    /** A secondary string line for the item, e.g., a short description or a value. */
    details?: string;
    logo?: string; // Optional image URL
}

// --- Internal Animated Type ---
/** The specific type returned by getVisibleItems, extending the base ChainItem. */
type AnimatedChainItem = ChainItem & {
    distanceFromCenter: number;
    originalIndex: number;
};

// --- Component Props Interfaces ---

interface CarouselItemProps {
    chain: AnimatedChainItem;
    side: 'left' | 'right';
}

interface ChainCarouselProps {
    /** The list of items to display in the carousel. (REQUIRED) */
    items: ChainItem[];
    /** The speed of the auto-scroll rotation in milliseconds. */
    scrollSpeedMs?: number;
    /** The number of carousel items visible at once (must be an odd number). */
    visibleItemCount?: number;
    /** Custom class for the main container div. */
    className?: string;
    /** Function to call when a chain is selected from the search dropdown. */
    onChainSelect?: (chainId: ChainItem['id'], chainName: string) => void;
}

// --- Helper Components ---

/** A single item card for the carousel. */
const CarouselItemCard: React.FC<CarouselItemProps> = ({ chain, side }) => {
    const { distanceFromCenter, id, name, details, logo, icon: FallbackIcon } = chain;
    const distance = Math.abs(distanceFromCenter);
    // Visual effects based on distance from the center (0)
    const opacity = 1 - distance / 4;
    const scale = 1 - distance * 0.1;
    const yOffset = distanceFromCenter * 90;
    const xOffset = side === 'left' ? -distance * 50 : distance * 50;

    const IconOrLogo = (
        <div className="rounded-full border border-white/10 p-2 bg-white backdrop-blur-md shadow-lg">
            {logo ? (
                <img src={logo} alt={`${name} logo`} className="size-8 rounded-full object-contain" />
            ) : (
                <FallbackIcon className="size-8 text-black" />
            )}
        </div>
    );

    return (
        <motion.div
            key={id} // Unique ID ensuring stable keys
            className={`absolute flex items-center gap-4 px-6 py-3 
                ${side === 'left' ? 'flex-row-reverse' : 'flex-row'}`}
            animate={{
                opacity,
                scale,
                y: yOffset,
                x: xOffset,
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
            {IconOrLogo}

            <div className={`flex flex-col mx-4 ${side === 'left' ? 'text-right' : 'text-left'}`}>
                {/* FIX: Added whitespace-nowrap to prevent the name from wrapping. */}
                <span className="text-md lg:text-lg font-bold text-white whitespace-nowrap" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>{name}</span>
                {/* Display generic details/description */}
                <span className="text-xs lg:text-sm text-gray-400" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>{details}</span>
            </div>
        </motion.div>
    );
};

// --- Main Component ---

const ChainCarousel: React.FC<ChainCarouselProps> = ({
    items,

    scrollSpeedMs = 1500,
    visibleItemCount = 9,
    className = '',
    onChainSelect,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    // References for Framer Motion scroll-based animation
    const rightSectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(rightSectionRef, { margin: '-100px 0px -100px 0px' });

    // DYNAMICALLY EXTEND ITEMS TO PREVENT KEY COLLISIONS
    const displayItems = useMemo(() => {
        if (items.length === 0) return [];
        let extended = [...items];
        let loopCount = 0;
        // Ensure we have enough items to exceed the visible item count for safe wrapping
        while (extended.length <= visibleItemCount + 2) {
            loopCount++;
            extended = [
                ...extended,
                ...items.map(item => ({
                    ...item,
                    id: `${item.id}-dup-${loopCount}`
                }))
            ];
        }
        return extended;
    }, [items, visibleItemCount]);

    const totalItems = displayItems.length;

    // 1. Auto-scroll effect
    useEffect(() => {
        if (isPaused || totalItems === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalItems);
        }, scrollSpeedMs);

        return () => clearInterval(interval);
    }, [isPaused, totalItems, scrollSpeedMs]);

    // 2. Scroll listener to pause carousel on page scroll
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const handleScroll = () => {
            setIsPaused(true);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsPaused(false);
            }, 500); // Resume auto-scroll after 500ms of no scrolling
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, []);


    // Memoized function for carousel items
    const getVisibleItems = useCallback(
        (): AnimatedChainItem[] => { // Explicitly define return type
            const visibleItems: AnimatedChainItem[] = [];
            if (totalItems === 0) return [];

            // Ensure visibleItemCount is an odd number for a clear center item
            const itemsToShow = visibleItemCount % 2 === 0 ? visibleItemCount + 1 : visibleItemCount;
            const half = Math.floor(itemsToShow / 2);

            for (let i = -half; i <= half; i++) {
                let index = currentIndex + i;
                if (index < 0) index += totalItems;
                if (index >= totalItems) index -= totalItems;

                visibleItems.push({
                    ...displayItems[index],
                    originalIndex: index,
                    distanceFromCenter: i,
                });
            }
            return visibleItems;
        },
        [currentIndex, displayItems, totalItems, visibleItemCount]
    );

    // Filtered list for search dropdown
    const filteredItems = useMemo(() => {
        return items.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [items, searchTerm]);

    // Handler for selecting an item from the dropdown
    const handleSelectChain = (id: ChainItem['id'], name: string) => {
        const index = displayItems.findIndex((c) => c.name === name);
        if (index !== -1) {
            setCurrentIndex(index); // Jump to the selected item
            setIsPaused(true);       // Pause to highlight the selection
            if (onChainSelect) {
                onChainSelect(id, name);
            }
        }
        setSearchTerm(name); // Set search term to the selected item's name
        setShowDropdown(false);
    };

    // The current item displayed in the center
    const currentItem = displayItems[currentIndex];

    // --- JSX Render ---
    return (
        <div id='explore-section' className={`space-y-20 ${className}`}>
            <div className='flex flex-col xl:flex-row w-full px-4 md:px-12 gap-12 justify-between items-center overflow-hidden xl:overflow-visible'>


                {/* Left Section - Chain Carousel */}
                <motion.div
                    className="relative w-full lg:flex-1 h-[500px] 
                flex items-center justify-center hidden lg:flex"
                    onMouseEnter={() => !searchTerm && setIsPaused(true)}
                    onMouseLeave={() => !searchTerm && setIsPaused(false)}
                    initial={{ x: '-20%', opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: 'spring', stiffness: 60, damping: 20, duration: 0.8 }}
                >
                    {/* Fading overlay to mask items */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        <div className="absolute top-0 h-1/4 w-full bg-gradient-to-b from-[#080808] to-transparent"></div>
                        <div className="absolute bottom-0 h-1/4 w-full bg-gradient-to-t from-[#080808] to-transparent"></div>
                    </div>

                    {getVisibleItems().map((chain) => (
                        <CarouselItemCard
                            key={chain.id}
                            chain={chain} // Renamed prop to 'chain' for this component's context
                            side="left"
                        />
                    ))}
                </motion.div>

                {/* Middle Section - Text and Search Input */}
                <div className="flex flex-col text-center 2xl:text-center xl:text-center
                 gap-4 max-w-lg w-full relative z-20 shrink-0">

                    {/* Currently Selected Item Display */}
                    {currentItem && (
                        <div className="flex flex-col items-center justify-center gap-0 mt-4">
                            <div className='p-6 bg-white border border-white/20 rounded-full mb-8 shadow-xl shadow-white/5'>
                                {currentItem.logo ? (
                                    <img src={currentItem.logo} alt={`${currentItem.name} logo`} className="size-20 object-contain" />
                                ) : (
                                    <currentItem.icon className="size-20 text-black" />
                                )}
                            </div>
                            <h3 className="text-4xl xl:text-5xl font-bold text-white mt-2" style={{ fontFamily: "var(--font-ibm-plex-sans-bold)" }}>
                                {currentItem.name}
                            </h3>
                            <p className="text-sm xl:text-xl text-[#8B5DFF] font-medium tracking-widest uppercase mt-3" style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>{currentItem.details || 'Modern Tech'}</p>
                        </div>
                    )}

                    {/* Search Bar */}
                    <div className="mt-8 relative max-w-lg mx-auto w-full">
                        <div className="px-3 flex items-center relative">
                            <Input
                                type="text"
                                value={searchTerm}
                                placeholder="Search Tech Stack..."
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSearchTerm(val);
                                    setShowDropdown(val.length > 0);
                                    if (val === '') setIsPaused(false);
                                }}
                                onFocus={() => {
                                    if (searchTerm.length > 0) setShowDropdown(true);
                                    setIsPaused(true);
                                }}
                                onBlur={() => {
                                    // Wait briefly before hiding to allow click on dropdown item
                                    setTimeout(() => setShowDropdown(false), 200);
                                }}
                                className="flex-grow outline-none text-white bg-[#111] px-4 
                            placeholder-gray-600 text-lg rounded-full border border-white/20 hover:border-[#8B5DFF] focus:border-[#8B5DFF] pr-10 
                            pl-10 py-4 cursor-pointer transition-all w-full text-center"
                                style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                            />
                            <Search className="absolute text-gray-500 w-5 h-5 left-6 pointer-events-none" />
                            {searchTerm && (
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setShowDropdown(false);
                                        setIsPaused(false);
                                    }}
                                    className="absolute right-6 text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Dropdown for search results */}
                        <div className="absolute left-0 right-0 mt-2 z-20">
                            {showDropdown && filteredItems.length > 0 && (
                                <div className="bg-[#111] rounded-2xl border border-white/10 max-h-60 overflow-y-auto shadow-2xl">
                                    {filteredItems.slice(0, 10).map((chain) => (
                                        <div
                                            key={chain.id}
                                            // FIX: Use e.preventDefault() to stop browser's form validation/alert
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                handleSelectChain(chain.id, chain.name);
                                            }}
                                            className="flex items-center gap-3 px-4 py-3 cursor-pointer 
                                    hover:bg-white/5 transition-colors duration-150 border-b border-white/5 last:border-0"
                                        >
                                            <div className="p-1 bg-white rounded-full">
                                                {chain.logo ? (
                                                    <img src={chain.logo} alt={`${chain.name} logo`} className="size-5 object-contain" />
                                                ) : (
                                                    <chain.icon size={20} className="text-black" />
                                                )}
                                            </div>
                                            <span className="text-white font-medium">{chain.name}</span>
                                            <span className="ml-auto text-xs text-gray-500 font-mono">{chain.details}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* Right Section - Chain Carousel */}
                <motion.div
                    ref={rightSectionRef}
                    className="relative w-full lg:flex-1 h-[500px] 
                flex items-center justify-center hidden lg:flex"
                    onMouseEnter={() => !searchTerm && setIsPaused(true)}
                    onMouseLeave={() => !searchTerm && setIsPaused(false)}
                    initial={{ x: '20%', opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: 'spring', stiffness: 60, damping: 20, duration: 0.8 }}
                >
                    {/* Fading overlay to mask items */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        <div className="absolute top-0 h-1/4 w-full bg-gradient-to-b from-[#080808] to-transparent"></div>
                        <div className="absolute bottom-0 h-1/4 w-full bg-gradient-to-t from-[#080808] to-transparent"></div>
                    </div>

                    {getVisibleItems().map((chain) => (
                        <CarouselItemCard
                            key={chain.id}
                            chain={chain}
                            side="right"
                        />
                    ))}
                </motion.div>
            </div>
        </div >
    );
};

export default ChainCarousel;
