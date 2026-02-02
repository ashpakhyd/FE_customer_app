'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';

export default function ServiceSubcategories({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);

  const subcategoryData = {
    electrician: {
      wiring: [
        { id: 'new-wiring', name: 'New House Wiring', desc: 'Complete electrical wiring for new homes' },
        { id: 'rewiring', name: 'House Rewiring', desc: 'Replace old electrical wiring' },
        { id: 'switch-board', name: 'Switch Board Installation', desc: 'Main electrical panel setup' },
        { id: 'outlet-install', name: 'Power Outlet Installation', desc: 'Add new electrical outlets' }
      ],
      repair: [
        { id: 'short-circuit', name: 'Short Circuit Repair', desc: 'Fix electrical short circuits' },
        { id: 'power-outage', name: 'Power Outage Issues', desc: 'Restore electrical power' },
        { id: 'switch-repair', name: 'Switch/Socket Repair', desc: 'Fix faulty switches and sockets' },
        { id: 'fuse-box', name: 'Fuse Box Repair', desc: 'Electrical panel maintenance' }
      ],
      lighting: [
        { id: 'led-install', name: 'LED Light Installation', desc: 'Energy-efficient lighting' },
        { id: 'chandelier', name: 'Chandelier Installation', desc: 'Decorative lighting setup' },
        { id: 'outdoor-lights', name: 'Outdoor Lighting', desc: 'Garden & exterior lights' },
        { id: 'smart-lights', name: 'Smart Lighting System', desc: 'Automated lighting control' }
      ],
      fan: [
        { id: 'ceiling-fan', name: 'Ceiling Fan Installation', desc: 'Install ceiling fans' },
        { id: 'exhaust-fan', name: 'Exhaust Fan Setup', desc: 'Bathroom & kitchen exhaust' },
        { id: 'wall-fan', name: 'Wall Fan Installation', desc: 'Wall-mounted fans' },
        { id: 'fan-repair', name: 'Fan Repair', desc: 'Fix faulty fans' }
      ],
      other: [
        { id: 'custom-electrical', name: 'Custom Electrical Work', desc: 'Specialized electrical services' },
        { id: 'electrical-consultation', name: 'Electrical Consultation', desc: 'Expert electrical advice' },
        { id: 'emergency-electrical', name: 'Emergency Electrical', desc: 'Urgent electrical repairs' },
        { id: 'other-electrical', name: 'Other Electrical Service', desc: 'Any other electrical work' }
      ]
    },
    appliances: {
      'washing-machine': [
        { id: 'not-starting', name: 'Machine Not Starting', desc: 'Power and startup issues' },
        { id: 'water-issues', name: 'Water Fill/Drain Problems', desc: 'Water inlet/outlet problems' },
        { id: 'spin-issues', name: 'Spin Cycle Problems', desc: 'Drum rotation issues' },
        { id: 'noise', name: 'Unusual Noise', desc: 'Strange sounds during operation' }
      ],
      refrigerator: [
        { id: 'not-cooling', name: 'Not Cooling Properly', desc: 'Temperature regulation issues' },
        { id: 'ice-maker', name: 'Ice Maker Problems', desc: 'Ice production issues' },
        { id: 'door-seal', name: 'Door Seal Issues', desc: 'Rubber gasket problems' },
        { id: 'compressor', name: 'Compressor Problems', desc: 'Motor and cooling system' }
      ],
      microwave: [
        { id: 'not-heating', name: 'Not Heating Food', desc: 'Microwave heating issues' },
        { id: 'turntable', name: 'Turntable Problems', desc: 'Rotating plate issues' },
        { id: 'door-latch', name: 'Door Latch Issues', desc: 'Door closing problems' },
        { id: 'sparking', name: 'Sparking Inside', desc: 'Electrical sparking issues' }
      ],
      dishwasher: [
        { id: 'not-cleaning', name: 'Not Cleaning Properly', desc: 'Poor washing performance' },
        { id: 'water-leak', name: 'Water Leakage', desc: 'Dishwasher leaking water' },
        { id: 'not-draining', name: 'Not Draining Water', desc: 'Water drainage problems' },
        { id: 'soap-dispenser', name: 'Soap Dispenser Issues', desc: 'Detergent dispensing problems' }
      ],
      ac: [
        { id: 'not-cooling', name: 'AC Not Cooling', desc: 'Poor cooling performance' },
        { id: 'gas-leak', name: 'Gas Leakage', desc: 'Refrigerant leak issues' },
        { id: 'filter-cleaning', name: 'Filter Cleaning', desc: 'AC filter maintenance' },
        { id: 'remote-issues', name: 'Remote Control Problems', desc: 'AC remote not working' }
      ],
      tv: [
        { id: 'no-display', name: 'No Display', desc: 'Black screen issues' },
        { id: 'no-sound', name: 'No Sound', desc: 'Audio problems' },
        { id: 'remote-issues', name: 'Remote Not Working', desc: 'TV remote problems' },
        { id: 'channel-issues', name: 'Channel Problems', desc: 'Signal & channel issues' }
      ],
      other: [
        { id: 'custom-appliance', name: 'Custom Appliance Repair', desc: 'Specialized appliance services' },
        { id: 'appliance-consultation', name: 'Appliance Consultation', desc: 'Expert appliance advice' },
        { id: 'emergency-appliance', name: 'Emergency Appliance Repair', desc: 'Urgent appliance repairs' },
        { id: 'other-appliance', name: 'Other Appliance Service', desc: 'Any other appliance work' }
      ]
    },
    plumber: {
      'pipe-repair': [
        { id: 'water-leak', name: 'Water Leakage', desc: 'Pipe leakage repair' },
        { id: 'pipe-burst', name: 'Burst Pipe', desc: 'Emergency pipe repair' },
        { id: 'blockage', name: 'Pipe Blockage', desc: 'Clear blocked pipes' },
        { id: 'pipe-replacement', name: 'Pipe Replacement', desc: 'Replace old pipes' }
      ],
      bathroom: [
        { id: 'toilet-repair', name: 'Toilet Repair', desc: 'Flush and seating issues' },
        { id: 'shower-install', name: 'Shower Installation', desc: 'New shower fitting' },
        { id: 'basin-tap', name: 'Basin & Tap Fitting', desc: 'Washbasin installation' },
        { id: 'bathroom-tiles', name: 'Bathroom Waterproofing', desc: 'Prevent water damage' }
      ],
      kitchen: [
        { id: 'sink-install', name: 'Kitchen Sink Installation', desc: 'New sink fitting' },
        { id: 'tap-repair', name: 'Tap Repair', desc: 'Fix leaky taps' },
        { id: 'dishwasher-connect', name: 'Dishwasher Connection', desc: 'Plumbing for dishwasher' },
        { id: 'water-filter', name: 'Water Filter Installation', desc: 'Install water purification' }
      ],
      drainage: [
        { id: 'drain-cleaning', name: 'Drain Cleaning', desc: 'Clear blocked drains' },
        { id: 'sewer-line', name: 'Sewer Line Repair', desc: 'Main sewer line issues' },
        { id: 'floor-drain', name: 'Floor Drain Installation', desc: 'Bathroom floor drains' },
        { id: 'septic-tank', name: 'Septic Tank Cleaning', desc: 'Septic system maintenance' }
      ]
    },
    carpenter: {
      furniture: [
        { id: 'custom-furniture', name: 'Custom Furniture Making', desc: 'Bespoke furniture creation' },
        { id: 'bed-frame', name: 'Bed Frame Making', desc: 'Custom bed construction' },
        { id: 'dining-table', name: 'Dining Table Making', desc: 'Custom dining furniture' },
        { id: 'wardrobe', name: 'Wardrobe Making', desc: 'Built-in wardrobes' }
      ],
      repair: [
        { id: 'chair-repair', name: 'Chair Repair', desc: 'Fix broken chairs' },
        { id: 'table-repair', name: 'Table Repair', desc: 'Repair damaged tables' },
        { id: 'drawer-repair', name: 'Drawer Repair', desc: 'Fix stuck drawers' },
        { id: 'joint-repair', name: 'Joint Repair', desc: 'Fix loose furniture joints' }
      ],
      'door-window': [
        { id: 'door-install', name: 'Door Installation', desc: 'New door fitting' },
        { id: 'window-install', name: 'Window Installation', desc: 'Window frame setup' },
        { id: 'door-repair', name: 'Door Repair', desc: 'Fix door issues' },
        { id: 'lock-install', name: 'Lock Installation', desc: 'Door lock fitting' }
      ],
      cabinet: [
        { id: 'kitchen-cabinet', name: 'Kitchen Cabinet', desc: 'Kitchen storage solutions' },
        { id: 'bathroom-cabinet', name: 'Bathroom Cabinet', desc: 'Bathroom storage' },
        { id: 'wall-shelves', name: 'Wall Shelves', desc: 'Wall-mounted storage' },
        { id: 'shoe-rack', name: 'Shoe Rack Making', desc: 'Custom shoe storage' }
      ]
    },
    painter: {
      interior: [
        { id: 'room-painting', name: 'Room Painting', desc: 'Interior room painting' },
        { id: 'ceiling-painting', name: 'Ceiling Painting', desc: 'Ceiling color work' },
        { id: 'wall-design', name: 'Wall Design Painting', desc: 'Decorative wall art' },
        { id: 'furniture-painting', name: 'Furniture Painting', desc: 'Paint furniture items' }
      ],
      exterior: [
        { id: 'building-exterior', name: 'Building Exterior', desc: 'External wall painting' },
        { id: 'gate-painting', name: 'Gate Painting', desc: 'Metal gate painting' },
        { id: 'boundary-wall', name: 'Boundary Wall', desc: 'Compound wall painting' },
        { id: 'roof-painting', name: 'Roof Painting', desc: 'Terrace & roof painting' }
      ],
      texture: [
        { id: 'asian-texture', name: 'Asian Texture Paint', desc: 'Premium texture finish' },
        { id: 'wall-putty', name: 'Wall Putty Work', desc: 'Wall smoothening' },
        { id: 'stencil-work', name: 'Stencil Work', desc: 'Pattern painting' },
        { id: 'sponge-finish', name: 'Sponge Finish', desc: 'Textured wall finish' }
      ],
      waterproof: [
        { id: 'terrace-waterproof', name: 'Terrace Waterproofing', desc: 'Roof leak protection' },
        { id: 'bathroom-waterproof', name: 'Bathroom Waterproofing', desc: 'Bathroom leak prevention' },
        { id: 'wall-waterproof', name: 'Wall Waterproofing', desc: 'External wall protection' },
        { id: 'basement-waterproof', name: 'Basement Waterproofing', desc: 'Underground area protection' }
      ]
    },
    cleaner: {
      'deep-clean': [
        { id: 'full-house', name: 'Full House Deep Clean', desc: 'Complete home cleaning' },
        { id: 'kitchen-deep', name: 'Kitchen Deep Clean', desc: 'Thorough kitchen cleaning' },
        { id: 'bathroom-deep', name: 'Bathroom Deep Clean', desc: 'Complete bathroom sanitization' },
        { id: 'post-construction', name: 'Post Construction Clean', desc: 'After renovation cleaning' }
      ],
      regular: [
        { id: 'daily-cleaning', name: 'Daily Cleaning', desc: 'Everyday house cleaning' },
        { id: 'weekly-cleaning', name: 'Weekly Cleaning', desc: 'Weekly maintenance cleaning' },
        { id: 'monthly-cleaning', name: 'Monthly Cleaning', desc: 'Monthly deep maintenance' },
        { id: 'maid-service', name: 'Maid Service', desc: 'Regular domestic help' }
      ],
      carpet: [
        { id: 'carpet-wash', name: 'Carpet Washing', desc: 'Professional carpet cleaning' },
        { id: 'sofa-cleaning', name: 'Sofa Cleaning', desc: 'Upholstery cleaning' },
        { id: 'mattress-cleaning', name: 'Mattress Cleaning', desc: 'Deep mattress sanitization' },
        { id: 'curtain-cleaning', name: 'Curtain Cleaning', desc: 'Curtain washing service' }
      ],
      office: [
        { id: 'office-daily', name: 'Daily Office Cleaning', desc: 'Regular office maintenance' },
        { id: 'glass-cleaning', name: 'Glass & Window Cleaning', desc: 'Commercial glass cleaning' },
        { id: 'floor-polishing', name: 'Floor Polishing', desc: 'Professional floor care' },
        { id: 'sanitization', name: 'Office Sanitization', desc: 'Disinfection service' }
      ]
    },
    gardener: {
      'lawn-care': [
        { id: 'grass-cutting', name: 'Grass Cutting', desc: 'Regular lawn mowing' },
        { id: 'lawn-fertilizer', name: 'Lawn Fertilization', desc: 'Grass nutrition treatment' },
        { id: 'weed-removal', name: 'Weed Removal', desc: 'Remove unwanted plants' },
        { id: 'lawn-installation', name: 'New Lawn Installation', desc: 'Fresh grass laying' }
      ],
      'plant-care': [
        { id: 'plant-watering', name: 'Plant Watering', desc: 'Regular plant hydration' },
        { id: 'pruning', name: 'Plant Pruning', desc: 'Trimming & shaping plants' },
        { id: 'fertilizing', name: 'Plant Fertilizing', desc: 'Plant nutrition care' },
        { id: 'repotting', name: 'Plant Repotting', desc: 'Change plant containers' }
      ],
      landscaping: [
        { id: 'garden-design', name: 'Garden Design', desc: 'Landscape planning' },
        { id: 'tree-planting', name: 'Tree Planting', desc: 'New tree installation' },
        { id: 'flower-bed', name: 'Flower Bed Creation', desc: 'Decorative flower arrangements' },
        { id: 'pathway-design', name: 'Garden Pathway', desc: 'Walking path creation' }
      ],
      'pest-plant': [
        { id: 'aphid-control', name: 'Aphid Control', desc: 'Remove plant aphids' },
        { id: 'fungal-treatment', name: 'Fungal Treatment', desc: 'Plant disease treatment' },
        { id: 'insect-spray', name: 'Insect Spray Treatment', desc: 'Plant pest spraying' },
        { id: 'organic-pest', name: 'Organic Pest Control', desc: 'Natural pest removal' }
      ]
    },
    'pest-control': {
      cockroach: [
        { id: 'cockroach-spray', name: 'Cockroach Spray Treatment', desc: 'Chemical cockroach elimination' },
        { id: 'gel-treatment', name: 'Gel Bait Treatment', desc: 'Long-lasting cockroach control' },
        { id: 'kitchen-treatment', name: 'Kitchen Cockroach Control', desc: 'Food area pest control' },
        { id: 'bathroom-treatment', name: 'Bathroom Cockroach Control', desc: 'Moisture area treatment' }
      ],
      termite: [
        { id: 'pre-construction', name: 'Pre-Construction Treatment', desc: 'Preventive termite control' },
        { id: 'post-construction', name: 'Post-Construction Treatment', desc: 'Existing building treatment' },
        { id: 'wood-treatment', name: 'Wood Termite Treatment', desc: 'Furniture termite control' },
        { id: 'soil-treatment', name: 'Soil Treatment', desc: 'Ground termite prevention' }
      ],
      rodent: [
        { id: 'rat-control', name: 'Rat Control', desc: 'Rat elimination service' },
        { id: 'mice-control', name: 'Mice Control', desc: 'Mouse removal service' },
        { id: 'rodent-proofing', name: 'Rodent Proofing', desc: 'Prevent rodent entry' },
        { id: 'bait-station', name: 'Bait Station Setup', desc: 'Strategic rodent trapping' }
      ],
      'general-pest': [
        { id: 'ant-control', name: 'Ant Control', desc: 'Ant colony elimination' },
        { id: 'spider-control', name: 'Spider Control', desc: 'Spider removal service' },
        { id: 'lizard-control', name: 'Lizard Control', desc: 'Lizard repelling treatment' },
        { id: 'mosquito-control', name: 'Mosquito Control', desc: 'Mosquito breeding control' }
      ]
    },
    'ac-repair': {
      'not-cooling': [
        { id: 'gas-refill', name: 'Gas Refill', desc: 'Refrigerant gas refilling' },
        { id: 'compressor-repair', name: 'Compressor Repair', desc: 'AC compressor fixing' },
        { id: 'thermostat-issue', name: 'Thermostat Issues', desc: 'Temperature control problems' },
        { id: 'coil-cleaning', name: 'Coil Cleaning', desc: 'Evaporator coil maintenance' }
      ],
      'gas-refill': [
        { id: 'r22-gas', name: 'R22 Gas Refill', desc: 'Traditional refrigerant refill' },
        { id: 'r410a-gas', name: 'R410A Gas Refill', desc: 'Modern refrigerant refill' },
        { id: 'gas-leak-repair', name: 'Gas Leak Repair', desc: 'Fix refrigerant leaks' },
        { id: 'pressure-check', name: 'Pressure Check', desc: 'System pressure testing' }
      ],
      cleaning: [
        { id: 'filter-cleaning', name: 'Filter Cleaning', desc: 'AC filter maintenance' },
        { id: 'coil-cleaning', name: 'Coil Deep Cleaning', desc: 'Thorough coil cleaning' },
        { id: 'duct-cleaning', name: 'Duct Cleaning', desc: 'Air duct sanitization' },
        { id: 'outdoor-unit', name: 'Outdoor Unit Cleaning', desc: 'External unit maintenance' }
      ],
      installation: [
        { id: 'split-ac', name: 'Split AC Installation', desc: 'New split AC setup' },
        { id: 'window-ac', name: 'Window AC Installation', desc: 'Window unit installation' },
        { id: 'central-ac', name: 'Central AC Installation', desc: 'Centralized cooling system' },
        { id: 'ac-uninstall', name: 'AC Uninstallation', desc: 'Remove existing AC unit' }
      ]
    },
    builder: {
      construction: [
        { id: 'house-construction', name: 'House Construction', desc: 'Complete home building' },
        { id: 'room-addition', name: 'Room Addition', desc: 'Add new rooms' },
        { id: 'boundary-wall', name: 'Boundary Wall Construction', desc: 'Compound wall building' },
        { id: 'foundation-work', name: 'Foundation Work', desc: 'Building foundation laying' }
      ],
      renovation: [
        { id: 'kitchen-renovation', name: 'Kitchen Renovation', desc: 'Complete kitchen makeover' },
        { id: 'bathroom-renovation', name: 'Bathroom Renovation', desc: 'Bathroom remodeling' },
        { id: 'room-renovation', name: 'Room Renovation', desc: 'Room interior renovation' },
        { id: 'balcony-renovation', name: 'Balcony Renovation', desc: 'Balcony improvement' }
      ],
      flooring: [
        { id: 'tile-flooring', name: 'Tile Flooring', desc: 'Ceramic & marble tiles' },
        { id: 'wooden-flooring', name: 'Wooden Flooring', desc: 'Hardwood floor installation' },
        { id: 'vinyl-flooring', name: 'Vinyl Flooring', desc: 'PVC flooring installation' },
        { id: 'carpet-flooring', name: 'Carpet Installation', desc: 'Wall-to-wall carpeting' }
      ],
      roofing: [
        { id: 'roof-repair', name: 'Roof Repair', desc: 'Fix roof leaks & damage' },
        { id: 'roof-construction', name: 'New Roof Construction', desc: 'Build new roof structure' },
        { id: 'waterproofing', name: 'Roof Waterproofing', desc: 'Prevent roof leakage' },
        { id: 'gutter-install', name: 'Gutter Installation', desc: 'Rainwater drainage system' }
      ]
    },
    doctor: {
      general: [
        { id: 'fever-cold', name: 'Fever & Cold', desc: 'Common illness treatment' },
        { id: 'body-pain', name: 'Body Pain', desc: 'General aches and pains' },
        { id: 'health-checkup', name: 'Health Checkup', desc: 'Routine medical examination' },
        { id: 'prescription', name: 'Prescription Renewal', desc: 'Medicine prescription' }
      ],
      pediatric: [
        { id: 'child-fever', name: 'Child Fever', desc: 'Pediatric fever treatment' },
        { id: 'vaccination', name: 'Vaccination', desc: 'Child immunization' },
        { id: 'growth-check', name: 'Growth Checkup', desc: 'Child development assessment' },
        { id: 'nutrition', name: 'Nutrition Consultation', desc: 'Child diet planning' }
      ],
      orthopedic: [
        { id: 'joint-pain', name: 'Joint Pain Treatment', desc: 'Arthritis & joint issues' },
        { id: 'back-pain', name: 'Back Pain Treatment', desc: 'Spine & back problems' },
        { id: 'fracture-care', name: 'Fracture Care', desc: 'Bone fracture treatment' },
        { id: 'physiotherapy', name: 'Physiotherapy', desc: 'Physical rehabilitation' }
      ],
      dermatology: [
        { id: 'skin-allergy', name: 'Skin Allergy Treatment', desc: 'Allergic skin conditions' },
        { id: 'acne-treatment', name: 'Acne Treatment', desc: 'Pimple & acne care' },
        { id: 'hair-loss', name: 'Hair Loss Treatment', desc: 'Hair fall solutions' },
        { id: 'skin-infection', name: 'Skin Infection', desc: 'Bacterial/fungal skin issues' }
      ]
    },
    advocate: {
      civil: [
        { id: 'property-dispute', name: 'Property Dispute', desc: 'Land & property legal issues' },
        { id: 'contract-law', name: 'Contract Law', desc: 'Agreement disputes' },
        { id: 'consumer-court', name: 'Consumer Court Cases', desc: 'Consumer protection matters' },
        { id: 'civil-litigation', name: 'Civil Litigation', desc: 'General civil court cases' }
      ],
      criminal: [
        { id: 'bail-application', name: 'Bail Application', desc: 'Criminal bail procedures' },
        { id: 'fir-quashing', name: 'FIR Quashing', desc: 'Cancel false FIR' },
        { id: 'criminal-defense', name: 'Criminal Defense', desc: 'Criminal case representation' },
        { id: 'anticipatory-bail', name: 'Anticipatory Bail', desc: 'Pre-arrest bail application' }
      ],
      family: [
        { id: 'divorce-case', name: 'Divorce Proceedings', desc: 'Marriage dissolution' },
        { id: 'child-custody', name: 'Child Custody', desc: 'Child custody battles' },
        { id: 'maintenance', name: 'Maintenance Cases', desc: 'Alimony & support cases' },
        { id: 'domestic-violence', name: 'Domestic Violence', desc: 'Protection from abuse' }
      ],
      corporate: [
        { id: 'company-registration', name: 'Company Registration', desc: 'Business incorporation' },
        { id: 'gst-matters', name: 'GST Legal Matters', desc: 'Tax-related legal issues' },
        { id: 'labor-law', name: 'Labor Law Issues', desc: 'Employment legal matters' },
        { id: 'contract-drafting', name: 'Contract Drafting', desc: 'Business agreement preparation' }
      ]
    },
    tutor: {
      academic: [
        { id: 'math-tuition', name: 'Mathematics Tuition', desc: 'Math subject coaching' },
        { id: 'science-tuition', name: 'Science Tuition', desc: 'Physics, Chemistry, Biology' },
        { id: 'english-tuition', name: 'English Tuition', desc: 'English language & literature' },
        { id: 'exam-preparation', name: 'Exam Preparation', desc: 'Board exam coaching' }
      ],
      language: [
        { id: 'hindi-learning', name: 'Hindi Learning', desc: 'Hindi language classes' },
        { id: 'english-speaking', name: 'English Speaking', desc: 'Spoken English classes' },
        { id: 'regional-language', name: 'Regional Language', desc: 'Local language learning' },
        { id: 'foreign-language', name: 'Foreign Language', desc: 'International languages' }
      ],
      music: [
        { id: 'vocal-music', name: 'Vocal Music', desc: 'Singing lessons' },
        { id: 'guitar-lessons', name: 'Guitar Lessons', desc: 'Guitar playing classes' },
        { id: 'piano-lessons', name: 'Piano Lessons', desc: 'Piano playing classes' },
        { id: 'classical-music', name: 'Classical Music', desc: 'Traditional music training' }
      ],
      computer: [
        { id: 'basic-computer', name: 'Basic Computer Skills', desc: 'Computer fundamentals' },
        { id: 'ms-office', name: 'MS Office Training', desc: 'Word, Excel, PowerPoint' },
        { id: 'internet-basics', name: 'Internet Basics', desc: 'Web browsing & email' },
        { id: 'typing-skills', name: 'Typing Skills', desc: 'Keyboard typing practice' }
      ]
    },
    security: {
      residential: [
        { id: 'house-security', name: 'House Security Guard', desc: '24/7 home protection' },
        { id: 'apartment-security', name: 'Apartment Security', desc: 'Building security service' },
        { id: 'night-security', name: 'Night Security', desc: 'Overnight protection' },
        { id: 'weekend-security', name: 'Weekend Security', desc: 'Part-time security' }
      ],
      commercial: [
        { id: 'office-security', name: 'Office Security', desc: 'Workplace protection' },
        { id: 'shop-security', name: 'Shop Security', desc: 'Retail store security' },
        { id: 'warehouse-security', name: 'Warehouse Security', desc: 'Storage facility protection' },
        { id: 'factory-security', name: 'Factory Security', desc: 'Industrial security' }
      ],
      event: [
        { id: 'wedding-security', name: 'Wedding Security', desc: 'Marriage function security' },
        { id: 'party-security', name: 'Party Security', desc: 'Event celebration security' },
        { id: 'corporate-event', name: 'Corporate Event Security', desc: 'Business event protection' },
        { id: 'festival-security', name: 'Festival Security', desc: 'Religious event security' }
      ],
      personal: [
        { id: 'bodyguard', name: 'Personal Bodyguard', desc: 'Individual protection' },
        { id: 'vip-security', name: 'VIP Security', desc: 'High-profile protection' },
        { id: 'family-security', name: 'Family Security', desc: 'Family protection service' },
        { id: 'travel-security', name: 'Travel Security', desc: 'Journey protection' }
      ]
    },
    driver: {
      personal: [
        { id: 'full-time-driver', name: 'Full-time Personal Driver', desc: 'Dedicated daily driver' },
        { id: 'part-time-driver', name: 'Part-time Driver', desc: 'Flexible timing driver' },
        { id: 'family-driver', name: 'Family Driver', desc: 'Multi-member family service' },
        { id: 'elderly-driver', name: 'Elderly Care Driver', desc: 'Senior citizen assistance' }
      ],
      trip: [
        { id: 'outstation-trip', name: 'Outstation Trip', desc: 'Long-distance travel' },
        { id: 'city-tour', name: 'City Tour Driver', desc: 'Local sightseeing' },
        { id: 'airport-pickup', name: 'Airport Pickup/Drop', desc: 'Airport transportation' },
        { id: 'weekend-trip', name: 'Weekend Trip', desc: 'Short vacation driving' }
      ],
      delivery: [
        { id: 'goods-delivery', name: 'Goods Delivery', desc: 'Product transportation' },
        { id: 'document-delivery', name: 'Document Delivery', desc: 'Important paper delivery' },
        { id: 'food-delivery', name: 'Food Delivery', desc: 'Restaurant food delivery' },
        { id: 'medical-delivery', name: 'Medical Delivery', desc: 'Medicine & medical supplies' }
      ],
      chauffeur: [
        { id: 'luxury-chauffeur', name: 'Luxury Chauffeur', desc: 'Premium driving service' },
        { id: 'business-chauffeur', name: 'Business Chauffeur', desc: 'Corporate driving' },
        { id: 'wedding-chauffeur', name: 'Wedding Chauffeur', desc: 'Marriage ceremony driving' },
        { id: 'event-chauffeur', name: 'Event Chauffeur', desc: 'Special occasion driving' }
      ]
    },
    cook: {
      'home-cook': [
        { id: 'daily-cooking', name: 'Daily Home Cooking', desc: 'Regular meal preparation' },
        { id: 'indian-cuisine', name: 'Indian Cuisine Cook', desc: 'Traditional Indian cooking' },
        { id: 'healthy-cooking', name: 'Healthy Cooking', desc: 'Nutritious meal preparation' },
        { id: 'vegetarian-cook', name: 'Vegetarian Cook', desc: 'Pure vegetarian cooking' }
      ],
      'party-cook': [
        { id: 'wedding-catering', name: 'Wedding Catering', desc: 'Marriage function cooking' },
        { id: 'birthday-party', name: 'Birthday Party Cooking', desc: 'Birthday celebration food' },
        { id: 'corporate-catering', name: 'Corporate Catering', desc: 'Office event cooking' },
        { id: 'festival-cooking', name: 'Festival Cooking', desc: 'Religious celebration food' }
      ],
      'special-diet': [
        { id: 'diabetic-cooking', name: 'Diabetic-friendly Cooking', desc: 'Sugar-free meal preparation' },
        { id: 'weight-loss', name: 'Weight Loss Cooking', desc: 'Low-calorie meal preparation' },
        { id: 'keto-cooking', name: 'Keto Diet Cooking', desc: 'Ketogenic meal preparation' },
        { id: 'baby-food', name: 'Baby Food Preparation', desc: 'Infant & toddler food' }
      ],
      baking: [
        { id: 'birthday-cakes', name: 'Birthday Cake Baking', desc: 'Custom birthday cakes' },
        { id: 'wedding-cakes', name: 'Wedding Cake Baking', desc: 'Marriage ceremony cakes' },
        { id: 'pastries', name: 'Pastries & Cookies', desc: 'Sweet baked goods' },
        { id: 'bread-baking', name: 'Fresh Bread Baking', desc: 'Homemade bread preparation' }
      ]
    },
    beautician: {
      facial: [
        { id: 'basic-facial', name: 'Basic Facial Treatment', desc: 'Standard skin care facial' },
        { id: 'anti-aging', name: 'Anti-aging Facial', desc: 'Age-defying skin treatment' },
        { id: 'acne-facial', name: 'Acne Treatment Facial', desc: 'Pimple & acne care' },
        { id: 'brightening-facial', name: 'Skin Brightening Facial', desc: 'Glow enhancement treatment' }
      ],
      'hair-care': [
        { id: 'hair-cut', name: 'Hair Cut & Styling', desc: 'Professional hair cutting' },
        { id: 'hair-color', name: 'Hair Coloring', desc: 'Hair dyeing service' },
        { id: 'hair-treatment', name: 'Hair Treatment', desc: 'Hair health improvement' },
        { id: 'hair-spa', name: 'Hair Spa Treatment', desc: 'Deep hair conditioning' }
      ],
      makeup: [
        { id: 'bridal-makeup', name: 'Bridal Makeup', desc: 'Wedding day makeup' },
        { id: 'party-makeup', name: 'Party Makeup', desc: 'Event occasion makeup' },
        { id: 'engagement-makeup', name: 'Engagement Makeup', desc: 'Engagement ceremony makeup' },
        { id: 'photoshoot-makeup', name: 'Photoshoot Makeup', desc: 'Photography session makeup' }
      ],
      'nail-care': [
        { id: 'manicure', name: 'Manicure Service', desc: 'Hand & nail care' },
        { id: 'pedicure', name: 'Pedicure Service', desc: 'Foot & nail care' },
        { id: 'nail-art', name: 'Nail Art Design', desc: 'Creative nail decoration' },
        { id: 'gel-nails', name: 'Gel Nail Application', desc: 'Long-lasting nail coating' }
      ]
    },
    massage: {
      therapeutic: [
        { id: 'deep-tissue', name: 'Deep Tissue Massage', desc: 'Muscle tension relief' },
        { id: 'back-pain-relief', name: 'Back Pain Relief Massage', desc: 'Spine & back therapy' },
        { id: 'neck-shoulder', name: 'Neck & Shoulder Massage', desc: 'Upper body tension relief' },
        { id: 'joint-pain', name: 'Joint Pain Massage', desc: 'Arthritis & joint therapy' }
      ],
      relaxation: [
        { id: 'full-body-relaxation', name: 'Full Body Relaxation', desc: 'Complete stress relief' },
        { id: 'head-massage', name: 'Head & Scalp Massage', desc: 'Stress & headache relief' },
        { id: 'foot-massage', name: 'Foot Reflexology', desc: 'Foot pressure point therapy' },
        { id: 'aromatherapy', name: 'Aromatherapy Massage', desc: 'Essential oil therapy' }
      ],
      sports: [
        { id: 'pre-workout', name: 'Pre-workout Massage', desc: 'Athletic preparation' },
        { id: 'post-workout', name: 'Post-workout Recovery', desc: 'Exercise recovery therapy' },
        { id: 'injury-recovery', name: 'Sports Injury Recovery', desc: 'Athletic injury rehabilitation' },
        { id: 'performance-massage', name: 'Performance Enhancement', desc: 'Athletic performance boost' }
      ],
      prenatal: [
        { id: 'pregnancy-massage', name: 'Pregnancy Massage', desc: 'Safe prenatal therapy' },
        { id: 'postpartum-massage', name: 'Postpartum Massage', desc: 'Post-delivery recovery' },
        { id: 'prenatal-relaxation', name: 'Prenatal Relaxation', desc: 'Pregnancy stress relief' },
        { id: 'labor-preparation', name: 'Labor Preparation Massage', desc: 'Pre-delivery preparation' }
      ]
    },
    photographer: {
      wedding: [
        { id: 'wedding-photography', name: 'Wedding Day Photography', desc: 'Complete wedding coverage' },
        { id: 'pre-wedding', name: 'Pre-wedding Shoot', desc: 'Engagement & couple photos' },
        { id: 'reception-photography', name: 'Reception Photography', desc: 'Wedding reception coverage' },
        { id: 'wedding-videography', name: 'Wedding Videography', desc: 'Wedding video recording' }
      ],
      portrait: [
        { id: 'family-portrait', name: 'Family Portrait', desc: 'Family photo sessions' },
        { id: 'individual-portrait', name: 'Individual Portrait', desc: 'Personal photo shoots' },
        { id: 'baby-photography', name: 'Baby Photography', desc: 'Newborn & infant photos' },
        { id: 'maternity-shoot', name: 'Maternity Photography', desc: 'Pregnancy photo sessions' }
      ],
      event: [
        { id: 'birthday-photography', name: 'Birthday Photography', desc: 'Birthday party coverage' },
        { id: 'corporate-event', name: 'Corporate Event Photography', desc: 'Business event coverage' },
        { id: 'festival-photography', name: 'Festival Photography', desc: 'Religious event coverage' },
        { id: 'graduation-photography', name: 'Graduation Photography', desc: 'Academic ceremony photos' }
      ],
      product: [
        { id: 'ecommerce-photography', name: 'E-commerce Photography', desc: 'Online product photos' },
        { id: 'food-photography', name: 'Food Photography', desc: 'Restaurant & food photos' },
        { id: 'fashion-photography', name: 'Fashion Photography', desc: 'Clothing & fashion shoots' },
        { id: 'real-estate', name: 'Real Estate Photography', desc: 'Property photography' }
      ]
    },
    'event-planner': {
      wedding: [
        { id: 'wedding-planning', name: 'Complete Wedding Planning', desc: 'Full wedding organization' },
        { id: 'destination-wedding', name: 'Destination Wedding', desc: 'Outstation wedding planning' },
        { id: 'reception-planning', name: 'Reception Planning', desc: 'Wedding reception organization' },
        { id: 'engagement-planning', name: 'Engagement Planning', desc: 'Engagement ceremony planning' }
      ],
      birthday: [
        { id: 'kids-birthday', name: 'Kids Birthday Party', desc: 'Children birthday planning' },
        { id: 'adult-birthday', name: 'Adult Birthday Party', desc: 'Adult birthday celebrations' },
        { id: 'milestone-birthday', name: 'Milestone Birthday', desc: 'Special age celebrations' },
        { id: 'surprise-party', name: 'Surprise Birthday Party', desc: 'Secret birthday planning' }
      ],
      corporate: [
        { id: 'conference-planning', name: 'Conference Planning', desc: 'Business conference organization' },
        { id: 'product-launch', name: 'Product Launch Event', desc: 'New product introduction' },
        { id: 'team-building', name: 'Team Building Events', desc: 'Employee engagement activities' },
        { id: 'annual-party', name: 'Annual Company Party', desc: 'Year-end celebrations' }
      ],
      festival: [
        { id: 'religious-festival', name: 'Religious Festival', desc: 'Traditional celebrations' },
        { id: 'cultural-event', name: 'Cultural Events', desc: 'Community celebrations' },
        { id: 'housewarming', name: 'Housewarming Ceremony', desc: 'New home celebrations' },
        { id: 'anniversary-celebration', name: 'Anniversary Celebration', desc: 'Milestone anniversaries' }
      ]
    }
  };

  const serviceNames = {
    electrician: 'Electrician',
    appliances: 'Appliances Repair',
    plumber: 'Plumber',
    doctor: 'Doctor'
  };

  const categoryNames = {
    // Electrician
    wiring: 'Wiring & Installation',
    repair: 'Electrical Repair',
    lighting: 'Lighting Solutions',
    fan: 'Fan Installation',
    // Appliances
    'washing-machine': 'Washing Machine',
    refrigerator: 'Refrigerator',
    microwave: 'Microwave',
    dishwasher: 'Dishwasher',
    ac: 'Air Conditioner',
    other: 'Other',
    // Plumber
    'pipe-repair': 'Pipe Repair',
    bathroom: 'Bathroom Fitting',
    kitchen: 'Kitchen Plumbing',
    drainage: 'Drainage Cleaning',
    // Carpenter
    furniture: 'Furniture Making',
    'door-window': 'Door & Window',
    cabinet: 'Cabinet Work',
    // Painter
    interior: 'Interior Painting',
    exterior: 'Exterior Painting',
    texture: 'Texture Painting',
    waterproof: 'Waterproofing',
    // Cleaner
    'deep-clean': 'Deep Cleaning',
    regular: 'Regular Cleaning',
    carpet: 'Carpet Cleaning',
    office: 'Office Cleaning',
    // Gardener
    'lawn-care': 'Lawn Care',
    'plant-care': 'Plant Care',
    landscaping: 'Landscaping',
    'pest-plant': 'Plant Pest Control',
    // Pest Control
    cockroach: 'Cockroach Control',
    termite: 'Termite Control',
    rodent: 'Rodent Control',
    'general-pest': 'General Pest Control',
    // AC Repair
    'not-cooling': 'Not Cooling',
    'gas-refill': 'Gas Refill',
    cleaning: 'AC Cleaning',
    installation: 'AC Installation',
    // Builder
    construction: 'Construction Work',
    renovation: 'Renovation',
    flooring: 'Flooring',
    roofing: 'Roofing',
    // Doctor
    general: 'General Physician',
    pediatric: 'Pediatrician',
    orthopedic: 'Orthopedic',
    dermatology: 'Dermatologist',
    // Advocate
    civil: 'Civil Law',
    criminal: 'Criminal Law',
    family: 'Family Law',
    corporate: 'Corporate Law',
    // Tutor
    academic: 'Academic Subjects',
    language: 'Language Learning',
    music: 'Music Lessons',
    computer: 'Computer Skills',
    // Security
    residential: 'Residential Security',
    commercial: 'Commercial Security',
    event: 'Event Security',
    personal: 'Personal Security',
    // Driver
    personal: 'Personal Driver',
    trip: 'Trip Driver',
    delivery: 'Delivery Driver',
    chauffeur: 'Chauffeur Service',
    // Cook
    'home-cook': 'Home Cook',
    'party-cook': 'Party Cook',
    'special-diet': 'Special Diet Cook',
    baking: 'Baker',
    // Beautician
    facial: 'Facial Treatment',
    'hair-care': 'Hair Care',
    makeup: 'Makeup Service',
    'nail-care': 'Nail Care',
    // Massage
    therapeutic: 'Therapeutic Massage',
    relaxation: 'Relaxation Massage',
    sports: 'Sports Massage',
    prenatal: 'Prenatal Massage',
    // Photographer
    wedding: 'Wedding Photography',
    portrait: 'Portrait Photography',
    event: 'Event Photography',
    product: 'Product Photography',
    // Event Planner
    birthday: 'Birthday Party',
    festival: 'Festival Events'
  };

  const subcategories = subcategoryData[resolvedParams.serviceId]?.[resolvedParams.categoryId] || [];
  const serviceName = serviceNames[resolvedParams.serviceId];
  const categoryName = categoryNames[resolvedParams.categoryId];

  if (subcategories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-black mb-2">Category Not Found</h1>
          <button onClick={() => router.back()} className="btn-primary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20">
      <div className="bg-white p-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button onClick={() => router.back()} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-lg">←</span>
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-black">{categoryName}</h1>
            <p className="text-xs text-gray-500">{serviceName}</p>
          </div>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        <p className="text-gray-600 text-sm mb-6 text-center">Select specific service needed</p>
        
        <div className="space-y-4">
          {subcategories.map((subcategory) => (
            <div
              key={subcategory.id}
              onClick={() => router.push(`/create-ticket?service=${resolvedParams.serviceId}&category=${resolvedParams.categoryId}&subcategory=${subcategory.id}&serviceName=${encodeURIComponent(serviceName)}&categoryName=${encodeURIComponent(categoryName)}&subcategoryName=${encodeURIComponent(subcategory.name)}`)}
              className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-black mb-1">{subcategory.name}</h3>
                  <p className="text-xs text-gray-600">{subcategory.desc}</p>
                </div>
                <div className="ml-4">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-sm">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}