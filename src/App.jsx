import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Dumbbell,
  Flame,
  Droplets,
  Trophy,
  CheckCircle2,
  FileText,
  Users,
  DollarSign,
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Zap,
  UserPlus,
  RefreshCw,
  X,
  Menu,
  Search,
  Filter,
  Plus,
  Trash2,
  Apple,
  Scale,
  Sparkles,
  AlertCircle,
  LayoutDashboard,
  TrendingUp,
  Calculator,
  Utensils,
  Footprints
} from 'lucide-react';

// ==========================================
// STATIC PRESET DATA & CONSTANTS
// ==========================================
const GYM_INFO = {
  name: "INDIAN FITNESS GYM",
  tagline: "FORGE YOUR INNER TITAN",
  subTagline: "Lingasugur's Premier Athletic High-Performance Training Facility",
  address: "Main Road, Near Old Bus Stand, Lingasugur, Raichur Dist, Karnataka 584122",
  phone: "+91 98860 12345",
  whatsapp: "919886012345",
  email: "contact@indianfitnessgym-lingasugur.com",
  hours: {
    monSat: "5:00 AM – 10:00 PM (Uninterrupted)",
    sunday: "6:00 AM – 1:00 PM (Recovery & Mobility)"
  },
  established: "2019",
  totalArea: "5,500 Sq. Ft. Dual-Floor Complex"
};

const MEMBERSHIP_PLANS = [
  {
    id: "plan-monthly",
    title: "1-Month Foundation",
    duration: "1 Month",
    price: 1499,
    originalPrice: 1999,
    badge: "Flexible",
    popular: false,
    features: [
      "Full gym floor & cardio theater access",
      "Complimentary bio-metric assessment",
      "Locker & shower room access",
      "Personalized starter workout routine",
      "General trainer floor guidance"
    ]
  },
  {
    id: "plan-quarterly",
    title: "3-Month Transformation",
    duration: "3 Months",
    price: 3899,
    originalPrice: 4999,
    badge: "Popular Value",
    popular: true,
    features: [
      "All 1-Month Foundation privileges",
      "1x Dedicated 1-on-1 coach assessment",
      "Custom South-Indian macro diet chart",
      "Bi-weekly body fat & caliper tracking",
      "Steam & recovery lounge access (2x/mo)"
    ]
  },
  {
    id: "plan-halfyearly",
    title: "6-Month Hypertrophy",
    duration: "6 Months",
    price: 6999,
    originalPrice: 9499,
    badge: "Serious Lifters",
    popular: false,
    features: [
      "All Quarterly privileges",
      "Comprehensive progressive overload log",
      "Priority equipment booking slots",
      "Unlimited steam bath recovery sessions",
      "Free branded Indian Fitness Gym shaker & tee"
    ]
  },
  {
    id: "plan-annual",
    title: "Annual Elite Pro",
    duration: "12 Months",
    price: 11999,
    originalPrice: 17999,
    badge: "Best Investment",
    popular: false,
    features: [
      "365 Days 24/7 priority access",
      "Monthly 1-on-1 consultation with Coach Vikram",
      "Complete nutrition & supplement stack plan",
      "Free 30-day membership pause option",
      "Complimentary access for 1 guest / month",
      "Priority locker & steam room access"
    ]
  }
];

const TRAINERS = [
  {
    id: "coach-vikram",
    name: "Coach Vikram Singh",
    role: "Head Strength & Conditioning Coach",
    exp: "9+ Years Experience",
    specialty: "Olympic Powerlifting & Muscular Hypertrophy",
    certifications: "NSCA-CSCS, K11 Certified Master Trainer",
    photo: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&auto=format&fit=crop&q=80",
    bio: "Former Karnataka State Powerlifting Champion passionate about injury-free compound lifting and biomechanical form perfection.",
    availability: "Morning (5:30 AM – 11:30 AM)"
  },
  {
    id: "coach-priya",
    name: "Coach Priya Kulkarni",
    role: "Senior Functional Fitness & HIIT Specialist",
    exp: "6+ Years Experience",
    specialty: "Fat Loss, Mobility & Women's Strength Conditioning",
    certifications: "ACE Certified Personal Trainer, Kettlebell Level 2",
    photo: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&auto=format&fit=crop&q=80",
    bio: "Specializing in athletic metabolic conditioning, postural correction, and sustainable weight management transformations.",
    availability: "Evening (4:30 PM – 9:30 PM)"
  },
  {
    id: "coach-rajesh",
    name: "Coach Rajesh Rathod",
    role: "Physique & Nutrition Specialist",
    exp: "7+ Years Experience",
    specialty: "Classic Bodybuilding & Macro-Nutritional Planning",
    certifications: "ISSA Sports Nutrition Specialist, CPR/AED",
    photo: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80",
    bio: "Dedicated to helping everyday people achieve sub-12% body fat transformations using balanced regional Indian diets.",
    availability: "Full Day (Split Shifts)"
  }
];

const FACILITIES = [
  {
    title: "Heavy Iron & Dumbbell Arena",
    category: "Strength",
    desc: "Rubberized pro-hex and cast-iron dumbbells up to 55kg, 6 Olympic lifting platforms with bumper plates, calibrated Eleiko-grade barbells, and 4 power racks.",
    specs: "Up to 55kg dumbbells • 4 Full Power Cages • Eleiko Spec Barbells",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "Pin & Plate-Loaded Machine Park",
    category: "Hypertrophy",
    desc: "Bio-mechanically calibrated isolateral chest press, hack squat, 45-degree leg press, selectorized cable crossovers, and lat pulldown towers.",
    specs: "Hammer Strength Style • Linear Hack Squat • Dual Adjustable Pulleys",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "Cardio Endurance Deck",
    category: "Endurance",
    desc: "Commercial commercial treadmills with shock-absorption deck, air bikes, elliptical trainers, and Concept2 water rowers.",
    specs: "Motorized Incline Treadmills • Concept2 Rowers • Assault AirBikes",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "CrossFit Turf & Functional Bay",
    category: "Agility",
    desc: "25-meter indoor sprint turf, battle ropes, plyometric boxes, kettlebells from 8kg to 32kg, suspension TRX trainers, and slam balls.",
    specs: "High-density Sprint Turf • Battle Ropes • Cast Iron Kettlebells",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "Recovery & Mobility Lounge",
    category: "Wellness",
    desc: "Finnish dry wooden sauna steam room, deep-tissue massage foam roller zone, mobility bands, and hyper-clean shower suites.",
    specs: "Dry Finnish Sauna • Massage Guns • Dedicated Stretching Mats",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "Clean Nutrition & Shaker Bar",
    category: "Fuel",
    desc: "Serving chilled electrolyte water, pre-workout espressos, cold-pressed fruit juices, and 100% genuine imported whey protein isolate shakes.",
    specs: "Fresh Whey Shakes • BCAA Sips • Sugar-free Energy Boosters",
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=800&auto=format&fit=crop&q=80"
  }
];

// Helper to compute TDEE, macros, and water quota
function computeBioMetrics({ gender, age, heightCm, weightKg, activityMultiplier, goal }) {
  const h = Number(heightCm) || 175;
  const w = Number(weightKg) || 72;
  const a = Number(age) || 26;

  // Mifflin - St Jeor formula
  let bmr = (10 * w) + (6.25 * h) - (5 * a);
  bmr = gender === 'female' ? bmr - 161 : bmr + 5;

  const mult = Number(activityMultiplier) || 1.45;
  const tdee = Math.round(bmr * mult);

  let targetCalories = tdee;
  let proteinFactor = 1.8; // grams per kg

  if (goal === 'cut') {
    targetCalories = Math.max(1200, tdee - 500);
    proteinFactor = 2.0;
  } else if (goal === 'bulk') {
    targetCalories = tdee + 400;
    proteinFactor = 2.0;
  } else {
    // recomp/maintenance
    targetCalories = tdee;
    proteinFactor = 1.8;
  }

  const proteinGrams = Math.round(w * proteinFactor);
  const proteinCals = proteinGrams * 4;
  const fatCals = targetCalories * 0.25;
  const fatGrams = Math.round(fatCals / 9);
  const carbCals = Math.max(0, targetCalories - (proteinCals + fatCals));
  const carbGrams = Math.round(carbCals / 4);

  // Water quota formula: ~38ml per kg body weight + 300ml workout overhead
  const waterTargetMl = Math.round((w * 38) + 300);

  // Steps target based on fitness goal
  const stepsTarget = goal === 'cut' ? 12000 : goal === 'bulk' ? 8500 : 10000;

  // BMI
  const heightM = h / 100;
  const bmi = Number((w / (heightM * heightM)).toFixed(1));

  return {
    bmr: Math.round(bmr),
    tdee,
    targetCalories,
    proteinGrams,
    fatGrams,
    carbGrams,
    waterTargetMl,
    stepsTarget,
    bmi
  };
}

// Helper to generate dynamic, weight-calibrated workout splits
function generateWorkoutSplits(weightKg, goal) {
  const w = Number(weightKg) || 72;
  const isCut = goal === 'cut';
  const isBulk = goal === 'bulk';

  // Biomechanically scaled target weights based on bodyweight ratios
  const squatWeight = Math.round((w * (isBulk ? 1.3 : isCut ? 1.05 : 1.15)) / 2.5) * 2.5;
  const benchWeight = Math.round((w * (isBulk ? 1.0 : isCut ? 0.75 : 0.85)) / 2.5) * 2.5;
  const deadliftWeight = Math.round((w * (isBulk ? 1.5 : isCut ? 1.25 : 1.35)) / 2.5) * 2.5;
  const dumbbellPressWeight = Math.round((w * (isBulk ? 0.36 : isCut ? 0.28 : 0.32)) / 2) * 2;
  const legPressWeight = Math.round((w * (isBulk ? 2.4 : isCut ? 1.8 : 2.1)) / 10) * 10;
  const latPulldownWeight = Math.round((w * (isBulk ? 0.8 : isCut ? 0.65 : 0.7)) / 5) * 5;

  return {
    push: [
      {
        id: "p1",
        exercise: "Barbell Incline Bench Press",
        sets: isCut ? "4 Sets" : isBulk ? "4 Sets (Heavy)" : "4 Sets",
        reps: isCut ? "12-15 Reps" : isBulk ? "6-8 Reps" : "8-10 Reps",
        targetWeight: `${benchWeight} kg`,
        completed: true
      },
      {
        id: "p2",
        exercise: "Flat Dumbbell Press",
        sets: "3 Sets",
        reps: isCut ? "12-15 Reps" : isBulk ? "8-10 Reps" : "10-12 Reps",
        targetWeight: `${dumbbellPressWeight} kg/hand`,
        completed: true
      },
      {
        id: "p3",
        exercise: "Standing Cable Flyes (Peak Squeeze)",
        sets: "3 Sets",
        reps: isCut ? "15-20 Reps" : "12-15 Reps",
        targetWeight: `${Math.round(w * 0.2)} kg/side`,
        completed: false
      },
      {
        id: "p4",
        exercise: "Overhead Dumbbell Shoulder Press",
        sets: "4 Sets",
        reps: isCut ? "12-15 Reps" : isBulk ? "6-8 Reps" : "8-10 Reps",
        targetWeight: `${Math.round(dumbbellPressWeight * 0.7)} kg/hand`,
        completed: false
      },
      {
        id: "p5",
        exercise: "Triceps Rope Pushdowns",
        sets: "4 Sets",
        reps: isCut ? "15-20 Reps" : "12-15 Reps",
        targetWeight: `${Math.round(w * 0.35)} kg`,
        completed: false
      }
    ],
    pull: [
      {
        id: "pl1",
        exercise: "Conventional Deadlifts",
        sets: isBulk ? "4 Sets (Heavy Compound)" : "4 Sets",
        reps: isCut ? "10-12 Reps" : isBulk ? "5-6 Reps" : "6-8 Reps",
        targetWeight: `${deadliftWeight} kg`,
        completed: false
      },
      {
        id: "pl2",
        exercise: "Wide-Grip Lat Pulldowns",
        sets: "4 Sets",
        reps: isCut ? "12-15 Reps" : isBulk ? "8-10 Reps" : "10-12 Reps",
        targetWeight: `${latPulldownWeight} kg`,
        completed: false
      },
      {
        id: "pl3",
        exercise: "Chest-Supported T-Bar Rows",
        sets: "3 Sets",
        reps: isCut ? "12-15 Reps" : "10-12 Reps",
        targetWeight: `${Math.round(w * 0.6)} kg`,
        completed: false
      },
      {
        id: "pl4",
        exercise: "Incline Dumbbell Bicep Curls",
        sets: "4 Sets",
        reps: isCut ? "15 Reps" : "10-12 Reps",
        targetWeight: `${Math.round(w * 0.16)} kg/hand`,
        completed: false
      },
      {
        id: "pl5",
        exercise: "Face Pulls (Rear Delts & Posture)",
        sets: "3 Sets",
        reps: "15-20 Reps",
        targetWeight: `${Math.round(w * 0.28)} kg`,
        completed: false
      }
    ],
    legs: [
      {
        id: "w1",
        exercise: "Barbell Back Squats",
        sets: isBulk ? "4 Sets (Heavy)" : "4 Sets",
        reps: isCut ? "12-15 Reps" : isBulk ? "6-8 Reps" : "8-10 Reps",
        targetWeight: `${squatWeight} kg`,
        completed: true
      },
      {
        id: "w2",
        exercise: "Romanian Deadlifts (RDL)",
        sets: "3 Sets",
        reps: isCut ? "12-15 Reps" : "10-12 Reps",
        targetWeight: `${Math.round(squatWeight * 0.85)} kg`,
        completed: true
      },
      {
        id: "w3",
        exercise: "45° Leg Press",
        sets: "4 Sets",
        reps: isCut ? "15-20 Reps" : "10-12 Reps",
        targetWeight: `${legPressWeight} kg`,
        completed: true
      },
      {
        id: "w4",
        exercise: "Standing Calf Raises",
        sets: "4 Sets",
        reps: "15-20 Reps",
        targetWeight: `${Math.round(w * 0.7)} kg`,
        completed: false
      },
      {
        id: "w5",
        exercise: "Hanging Leg Raises / Core",
        sets: "3 Sets",
        reps: "15 Reps",
        targetWeight: "Bodyweight",
        completed: false
      }
    ],
    core: [
      {
        id: "c1",
        exercise: "Hanging Leg Raises",
        sets: "4 Sets",
        reps: "15-20 Reps",
        targetWeight: "Bodyweight",
        completed: false
      },
      {
        id: "c2",
        exercise: "Cable Woodchoppers",
        sets: "3 Sets",
        reps: "15 Reps/side",
        targetWeight: `${Math.round(w * 0.22)} kg`,
        completed: false
      },
      {
        id: "c3",
        exercise: isCut ? "Assault AirBike Tabata Intervals" : "Assault AirBike Sprints",
        sets: isCut ? "8 Rounds" : "5 Rounds",
        reps: isCut ? "20s Work / 10s Rest" : "30s Work / 30s Rest",
        targetWeight: "Max Aerobic Power",
        completed: false
      },
      {
        id: "c4",
        exercise: "Plank to Push-Up",
        sets: "3 Sets",
        reps: isCut ? "15 Reps" : "12 Reps",
        targetWeight: "Bodyweight",
        completed: false
      }
    ]
  };
}

// Initial Member Dataset
const INITIAL_ACTIVE_MEMBER = {
  id: "IFG-2024-884",
  name: "Rahul Sharma",
  phone: "+91 94480 88219",
  email: "rahul.sharma@example.com",
  gender: "male",
  age: 26,
  height: 176, // cm
  weight: 74.5, // kg
  plan: "Annual Elite Pro",
  startDate: "15 Jan 2026",
  expiryDate: "14 Jan 2027",
  daysRemaining: 68,
  coach: "Coach Vikram Singh",
  emergencyContact: "+91 98450 11223 (Sunil Sharma - Father)",
  goal: "bulk", // 'cut' | 'maintain' | 'bulk'
  activityLevel: 1.55,
  dailyCaloriesTarget: 2650,
  caloriesLogged: 1380,
  waterTargetMl: 3200,
  waterLoggedMl: 2250,
  stepsLogged: 7420,
  stepsTarget: 10000,
  macrosTarget: { protein: 155, carbs: 320, fats: 65 },
  macrosLogged: { protein: 98, carbs: 175, fats: 38 },
  measurements: {
    chest: 41.2,
    waist: 32.5,
    arms: 15.2
  },
  measurementsHistory: [
    { date: "1 Feb 2026", chest: 41.2, waist: 32.5, arms: 15.2 },
    { date: "15 Jan 2026", chest: 40.8, waist: 33.0, arms: 14.8 }
  ],
  todayMeals: [
    { id: "m-1", name: "3 Boiled Eggs & Whole Wheat Toast", cals: 320, protein: 21 },
    { id: "m-2", name: "Whey Isolate Shake (1 Scoop with Water)", cals: 130, protein: 25 },
    { id: "m-3", name: "Brown Rice, Dal Tadka & Paneer Bhurji", cals: 650, protein: 36 },
    { id: "m-4", name: "Roasted Chana & Sprouted Moong", cals: 280, protein: 16 }
  ],
  weightHistory: [
    { date: "Today", weight: 74.5, change: "+0.2 kg" },
    { date: "2 days ago", weight: 74.3, change: "0.0 kg" },
    { date: "Last week", weight: 73.8, change: "+0.5 kg" },
    { date: "2 weeks ago", weight: 73.1, change: "+0.7 kg" }
  ],
  todayWorkout: [
    { id: "w1", exercise: "Barbell Back Squats", sets: "4 Sets", reps: "8-10 Reps", targetWeight: "90 kg", completed: true },
    { id: "w2", exercise: "Romanian Deadlifts (RDL)", sets: "3 Sets", reps: "10-12 Reps", targetWeight: "80 kg", completed: true },
    { id: "w3", exercise: "45° Leg Press", sets: "4 Sets", reps: "12-15 Reps", targetWeight: "160 kg", completed: true },
    { id: "w4", exercise: "Standing Calf Raises", sets: "4 Sets", reps: "15-20 Reps", targetWeight: "50 kg", completed: false },
    { id: "w5", exercise: "Hanging Leg Raises", sets: "3 Sets", reps: "15 Reps", targetWeight: "Bodyweight", completed: false }
  ]
};

const INITIAL_MEMBERS_DIRECTORY = [
  {
    id: "IFG-2024-884",
    name: "Rahul Sharma",
    phone: "+91 94480 88219",
    plan: "Annual Elite Pro",
    status: "Active",
    expiry: "14 Jan 2027",
    weight: 74.5,
    gender: "Male",
    trainer: "Coach Vikram"
  },
  {
    id: "IFG-2024-712",
    name: "Sneha Patil",
    phone: "+91 98860 44321",
    plan: "3-Month Transformation",
    status: "Active",
    expiry: "28 Feb 2027",
    weight: 58.0,
    gender: "Female",
    trainer: "Coach Priya"
  },
  {
    id: "IFG-2024-541",
    name: "Basavaraj Biradar",
    phone: "+91 99011 55678",
    plan: "6-Month Hypertrophy",
    status: "Active",
    expiry: "12 May 2027",
    weight: 82.3,
    gender: "Male",
    trainer: "Coach Vikram"
  },
  {
    id: "IFG-2024-309",
    name: "Amit Deshmukh",
    phone: "+91 97400 99881",
    plan: "1-Month Foundation",
    status: "Expired",
    expiry: "02 Nov 2026",
    weight: 88.0,
    gender: "Male",
    trainer: "Coach Rajesh"
  },
  {
    id: "IFG-2024-998",
    name: "Kavitha Nayak",
    phone: "+91 88840 22345",
    plan: "Annual Elite Pro",
    status: "Active",
    expiry: "30 Oct 2027",
    weight: 62.5,
    gender: "Female",
    trainer: "Coach Priya"
  }
];

export default function App() {
  // Navigation & Role states
  // Roles: 'visitor' | 'member' | 'trainer' | 'admin'
  const [currentRole, setCurrentRole] = useState('visitor');
  // Tabs: 'home' | 'facilities' | 'plans' | 'trainers' | 'member-portal' | 'admin'
  const [currentTab, setCurrentTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRoleChange = (role) => {
    setCurrentRole(role);
    if (role === 'visitor') setCurrentTab('home');
    else if (role === 'member') setCurrentTab('member-portal');
    else if (role === 'trainer') setCurrentTab('trainers');
    else if (role === 'admin') setCurrentTab('admin');
  };

  // Member Hub Sub-tabs: 'dashboard' | 'workouts' | 'diet' | 'calculators' | 'progress' | 'water-activity'
  const [memberSubTab, setMemberSubTab] = useState('dashboard');
  const [activeWorkoutSplit, setActiveWorkoutSplit] = useState('legs');
  const [dietPlanType, setDietPlanType] = useState('veg');

  // Active Member & Members List
  const [activeMember, setActiveMember] = useState(INITIAL_ACTIVE_MEMBER);
  const [membersList, setMembersList] = useState(INITIAL_MEMBERS_DIRECTORY);

  // Dedicated Dashboard Bio-Metric Input State
  const [dashboardBio, setDashboardBio] = useState({
    weight: INITIAL_ACTIVE_MEMBER.weight,
    height: INITIAL_ACTIVE_MEMBER.height,
    age: INITIAL_ACTIVE_MEMBER.age,
    gender: INITIAL_ACTIVE_MEMBER.gender,
    goal: INITIAL_ACTIVE_MEMBER.goal,
    activity: INITIAL_ACTIVE_MEMBER.activityLevel
  });

  // Live real-time computation preview for dashboard inputs
  const liveDashboardPreview = useMemo(() => {
    return computeBioMetrics({
      gender: dashboardBio.gender,
      age: dashboardBio.age,
      heightCm: dashboardBio.height,
      weightKg: dashboardBio.weight,
      activityMultiplier: dashboardBio.activity,
      goal: dashboardBio.goal
    });
  }, [dashboardBio]);

  // Master Automated Sync: Updates all tabs whenever dashboard details change
  const updateBioAndSyncAll = (updatedFields, triggerToast = false) => {
    const nextBio = { ...dashboardBio, ...updatedFields };
    setDashboardBio(nextBio);

    const w = Number(nextBio.weight);
    const h = Number(nextBio.height);
    const a = Number(nextBio.age);

    if (w && w >= 30 && w <= 250 && h && h >= 100 && h <= 240) {
      const computed = computeBioMetrics({
        gender: nextBio.gender,
        age: a,
        heightCm: h,
        weightKg: w,
        activityMultiplier: nextBio.activity,
        goal: nextBio.goal
      });

      const newWorkoutSplits = generateWorkoutSplits(w, nextBio.goal);
      const weightDiff = (w - activeMember.weight).toFixed(1);
      const changeStr = Number(weightDiff) === 0 ? "0.0 kg" : Number(weightDiff) > 0 ? `+${weightDiff} kg` : `${weightDiff} kg`;

      const weightHistoryEntry = {
        date: "Today (Auto-Sync)",
        weight: w,
        change: changeStr
      };

      setActiveMember((prev) => ({
        ...prev,
        weight: w,
        height: h,
        age: a,
        gender: nextBio.gender,
        goal: nextBio.goal,
        activityLevel: nextBio.activity,
        dailyCaloriesTarget: computed.targetCalories,
        waterTargetMl: computed.waterTargetMl,
        stepsTarget: computed.stepsTarget,
        macrosTarget: {
          protein: computed.proteinGrams,
          carbs: computed.carbGrams,
          fats: computed.fatGrams
        },
        todayWorkout: newWorkoutSplits.legs,
        weightHistory: Number(weightDiff) !== 0 ? [weightHistoryEntry, ...prev.weightHistory.slice(0, 4)] : prev.weightHistory
      }));

      // Automatically sync Health Calculators tab
      setCalcBmiInput({ height: h, weight: w });
      setCalcTdeeInput({
        gender: nextBio.gender,
        age: a,
        height: h,
        weight: w,
        activity: nextBio.activity,
        goal: nextBio.goal
      });

      if (triggerToast) {
        showToast(`⚡ Auto-Synced across all tabs! Workouts, diet macros, hydration & calculators updated for ${w}kg (${nextBio.goal.toUpperCase()}).`);
      }
    }
  };

  // Master Auto-Calibration & Sync button handler
  const handleAutoCalibrateAll = (e) => {
    if (e) e.preventDefault();
    updateBioAndSyncAll({}, true);
  };

  // Modals
  const [selectedPlanForModal, setSelectedPlanForModal] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  // Custom meal input state
  const [newMealName, setNewMealName] = useState("");
  const [newMealCals, setNewMealCals] = useState("");
  const [newMealProtein, setNewMealProtein] = useState("");

  // Weight logging state
  const [newWeightInput, setNewWeightInput] = useState("");

  // Body tape measurements input state
  const [measureInputs, setMeasureInputs] = useState({ chest: "", waist: "", arms: "" });

  // Interactive Health Calculators State
  const [calcBmiInput, setCalcBmiInput] = useState({ height: activeMember.height, weight: activeMember.weight });
  const [calcTdeeInput, setCalcTdeeInput] = useState({
    gender: activeMember.gender,
    age: activeMember.age,
    height: activeMember.height,
    weight: activeMember.weight,
    activity: activeMember.activityLevel,
    goal: activeMember.goal
  });

  // Dynamic workout splits calibrated to the active member's weight and goal
  const currentWorkoutSplits = useMemo(() => {
    const baseSplits = generateWorkoutSplits(activeMember.weight, activeMember.goal);
    return {
      ...baseSplits,
      legs: activeMember.todayWorkout && activeMember.todayWorkout.length > 0 ? activeMember.todayWorkout : baseSplits.legs
    };
  }, [activeMember.weight, activeMember.goal, activeMember.todayWorkout]);

  // Toast Notification System
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3800);
  };
  // Quick Steps Log
  const logSteps = (count) => {
    setActiveMember((prev) => ({
      ...prev,
      stepsLogged: prev.stepsLogged + count
    }));
    showToast(`👟 Logged +${count.toLocaleString()} steps!`);
  };

  // Tape Measurement Log
  const handleLogMeasurements = (e) => {
    e.preventDefault();
    if (!measureInputs.chest && !measureInputs.waist && !measureInputs.arms) {
      showToast("Please enter at least one measurement.", "error");
      return;
    }
    const updatedMeasurements = {
      chest: measureInputs.chest ? parseFloat(measureInputs.chest) : activeMember.measurements.chest,
      waist: measureInputs.waist ? parseFloat(measureInputs.waist) : activeMember.measurements.waist,
      arms: measureInputs.arms ? parseFloat(measureInputs.arms) : activeMember.measurements.arms
    };
    const newRecord = {
      date: "Today",
      ...updatedMeasurements
    };
    setActiveMember((prev) => ({
      ...prev,
      measurements: updatedMeasurements,
      measurementsHistory: [newRecord, ...prev.measurementsHistory]
    }));
    setMeasureInputs({ chest: "", waist: "", arms: "" });
    showToast("Body measurements logged successfully!");
  };

  // Sync Health Calculator Results with Profile
  const handleApplyCalcToProfile = () => {
    const computed = computeBioMetrics({
      gender: calcTdeeInput.gender,
      age: calcTdeeInput.age,
      heightCm: calcTdeeInput.height,
      weightKg: calcTdeeInput.weight,
      activityMultiplier: calcTdeeInput.activity,
      goal: calcTdeeInput.goal
    });

    setActiveMember((prev) => ({
      ...prev,
      height: calcTdeeInput.height,
      weight: calcTdeeInput.weight,
      gender: calcTdeeInput.gender,
      age: calcTdeeInput.age,
      goal: calcTdeeInput.goal,
      activityLevel: calcTdeeInput.activity,
      dailyCaloriesTarget: computed.targetCalories,
      waterTargetMl: computed.waterTargetMl,
      macrosTarget: {
        protein: computed.proteinGrams,
        carbs: computed.carbGrams,
        fats: computed.fatGrams
      }
    }));
    setDashboardBio({
      weight: calcTdeeInput.weight,
      height: calcTdeeInput.height,
      age: calcTdeeInput.age,
      gender: calcTdeeInput.gender,
      goal: calcTdeeInput.goal,
      activity: calcTdeeInput.activity
    });
    showToast("Applied calculated targets to your active profile!");
  };

  // Computed standalone BMI from calculator state
  const computedBmi = useMemo(() => {
    const h = Number(calcBmiInput.height) / 100;
    const w = Number(calcBmiInput.weight);
    if (!h || !w) return { bmi: 0, category: "N/A", color: "text-neutral-400" };
    const val = Number((w / (h * h)).toFixed(1));
    let cat = "Normal (Healthy)";
    let color = "text-emerald-400";
    if (val < 18.5) {
      cat = "Underweight";
      color = "text-sky-400";
    } else if (val >= 25 && val < 29.9) {
      cat = "Overweight";
      color = "text-amber-400";
    } else if (val >= 30) {
      cat = "Obese";
      color = "text-red-400";
    }
    const minHealthyWeight = (18.5 * h * h).toFixed(1);
    const maxHealthyWeight = (24.9 * h * h).toFixed(1);
    return { bmi: val, category: cat, color, minWeight: minHealthyWeight, maxWeight: maxHealthyWeight };
  }, [calcBmiInput]);

  // Computed standalone TDEE from calculator state
  const computedTdee = useMemo(() => {
    return computeBioMetrics({
      gender: calcTdeeInput.gender,
      age: calcTdeeInput.age,
      heightCm: calcTdeeInput.height,
      weightKg: calcTdeeInput.weight,
      activityMultiplier: calcTdeeInput.activity,
      goal: calcTdeeInput.goal
    });
  }, [calcTdeeInput]);

  // Workout splits mock data
  const WORKOUT_SPLITS = {
    push: [
      { id: "p1", exercise: "Barbell Incline Bench Press", sets: "4 Sets", reps: "8-10 Reps", targetWeight: "70 kg", completed: true },
      { id: "p2", exercise: "Flat Dumbbell Press", sets: "3 Sets", reps: "10-12 Reps", targetWeight: "26 kg/hand", completed: true },
      { id: "p3", exercise: "Standing Cable Flyes", sets: "3 Sets", reps: "12-15 Reps", targetWeight: "15 kg/side", completed: false },
      { id: "p4", exercise: "Overhead Dumbbell Shoulder Press", sets: "4 Sets", reps: "8-10 Reps", targetWeight: "20 kg/hand", completed: false },
      { id: "p5", exercise: "Triceps Rope Pushdowns", sets: "4 Sets", reps: "12-15 Reps", targetWeight: "25 kg", completed: false }
    ],
    pull: [
      { id: "pl1", exercise: "Conventional Deadlifts", sets: "4 Sets", reps: "6-8 Reps", targetWeight: "110 kg", completed: false },
      { id: "pl2", exercise: "Wide-Grip Lat Pulldowns", sets: "4 Sets", reps: "10-12 Reps", targetWeight: "55 kg", completed: false },
      { id: "pl3", exercise: "Chest-Supported T-Bar Rows", sets: "3 Sets", reps: "10-12 Reps", targetWeight: "45 kg", completed: false },
      { id: "pl4", exercise: "Incline Dumbbell Bicep Curls", sets: "4 Sets", reps: "12 Reps", targetWeight: "12.5 kg/hand", completed: false },
      { id: "pl5", exercise: "Face Pulls (Rear Delts)", sets: "3 Sets", reps: "15-20 Reps", targetWeight: "20 kg", completed: false }
    ],
    legs: activeMember.todayWorkout,
    core: [
      { id: "c1", exercise: "Hanging Leg Raises", sets: "4 Sets", reps: "15 Reps", targetWeight: "Bodyweight", completed: false },
      { id: "c2", exercise: "Cable Woodchoppers", sets: "3 Sets", reps: "15 Reps/side", targetWeight: "17.5 kg", completed: false },
      { id: "c3", exercise: "Assault AirBike Sprints", sets: "5 Rounds", reps: "30s Work / 30s Rest", targetWeight: "Max Effort", completed: false },
      { id: "c4", exercise: "Plank to Push-Up", sets: "3 Sets", reps: "12 Reps", targetWeight: "Bodyweight", completed: false }
    ]
  };

  // Onboarding Registration Form State
  const [onboardData, setOnboardData] = useState({
    name: "",
    phone: "",
    gender: "male",
    age: 25,
    height: 175,
    weight: 72,
    goal: "bulk",
    activity: 1.55
  });

  const liveCalculations = useMemo(() => {
    return computeBioMetrics({
      gender: onboardData.gender,
      age: onboardData.age,
      heightCm: onboardData.height,
      weightKg: onboardData.weight,
      activityMultiplier: onboardData.activity,
      goal: onboardData.goal
    });
  }, [onboardData]);

  // Hydration Quick Log
  const logWater = (amountMl) => {
    setActiveMember((prev) => {
      const newAmt = Math.min(prev.waterTargetMl * 1.5, prev.waterLoggedMl + amountMl);
      return { ...prev, waterLoggedMl: newAmt };
    });
    showToast(`💧 Logged +${amountMl}ml of water!`);
  };

  const resetWater = () => {
    setActiveMember((prev) => ({ ...prev, waterLoggedMl: 0 }));
    showToast("Water log reset for today.", "info");
  };

  // Real Meal & Food Logger
  const handleAddCustomMeal = (e) => {
    e.preventDefault();
    if (!newMealName.trim() || !newMealCals) {
      showToast("Please enter a meal name and calories.", "error");
      return;
    }
    const cals = Number(newMealCals) || 0;
    const protein = Number(newMealProtein) || 0;
    const carbs = Math.round((cals * 0.45) / 4);
    const fats = Math.round((cals * 0.25) / 9);

    const newMeal = {
      id: `m-${Date.now()}`,
      name: newMealName.trim(),
      cals,
      protein
    };

    setActiveMember((prev) => ({
      ...prev,
      caloriesLogged: prev.caloriesLogged + cals,
      macrosLogged: {
        protein: prev.macrosLogged.protein + protein,
        carbs: prev.macrosLogged.carbs + carbs,
        fats: prev.macrosLogged.fats + fats
      },
      todayMeals: [newMeal, ...prev.todayMeals]
    }));

    setNewMealName("");
    setNewMealCals("");
    setNewMealProtein("");
    showToast(`Added "${newMeal.name}" (+${cals} kcal, +${protein}g P)`);
  };

  const handleDeleteMeal = (mealId) => {
    const mealToDelete = activeMember.todayMeals.find((m) => m.id === mealId);
    if (!mealToDelete) return;

    setActiveMember((prev) => ({
      ...prev,
      caloriesLogged: Math.max(0, prev.caloriesLogged - mealToDelete.cals),
      macrosLogged: {
        ...prev.macrosLogged,
        protein: Math.max(0, prev.macrosLogged.protein - mealToDelete.protein)
      },
      todayMeals: prev.todayMeals.filter((m) => m.id !== mealId)
    }));
    showToast(`Removed "${mealToDelete.name}" from daily log`);
  };

  // Quick Food Presets
  const logQuickPreset = (foodName, cals, protein) => {
    const newMeal = {
      id: `m-${Date.now()}`,
      name: foodName,
      cals,
      protein
    };
    setActiveMember((prev) => ({
      ...prev,
      caloriesLogged: prev.caloriesLogged + cals,
      macrosLogged: {
        ...prev.macrosLogged,
        protein: prev.macrosLogged.protein + protein
      },
      todayMeals: [newMeal, ...prev.todayMeals]
    }));
    showToast(`Logged ${foodName} (+${cals} kcal, +${protein}g P)`);
  };

  // Real Weight Logger
  const handleLogWeight = (e) => {
    e.preventDefault();
    const w = parseFloat(newWeightInput);
    if (!w || w < 30 || w > 250) {
      showToast("Please enter a valid weight (30-250 kg).", "error");
      return;
    }
    const diff = (w - activeMember.weight).toFixed(1);
    const changeStr = diff > 0 ? `+${diff} kg` : `${diff} kg`;

    const newRecord = {
      date: "Today",
      weight: w,
      change: changeStr
    };

    const recalced = computeBioMetrics({
      gender: activeMember.gender,
      age: activeMember.age,
      heightCm: activeMember.height,
      weightKg: w,
      activityMultiplier: activeMember.activityLevel,
      goal: activeMember.goal
    });

    const newSplits = generateWorkoutSplits(w, activeMember.goal);

    setActiveMember((prev) => ({
      ...prev,
      weight: w,
      dailyCaloriesTarget: recalced.targetCalories,
      waterTargetMl: recalced.waterTargetMl,
      stepsTarget: recalced.stepsTarget,
      macrosTarget: {
        protein: recalced.proteinGrams,
        carbs: recalced.carbGrams,
        fats: recalced.fatGrams
      },
      todayWorkout: newSplits.legs,
      weightHistory: [newRecord, ...prev.weightHistory.slice(0, 4)]
    }));

    setDashboardBio((prev) => ({ ...prev, weight: w }));
    setCalcBmiInput({ height: activeMember.height, weight: w });
    setCalcTdeeInput((prev) => ({ ...prev, weight: w }));

    setNewWeightInput("");
    showToast(`Logged weigh-in: ${w} kg! Workouts, diet macros & hydration auto-updated.`);
  };

  // Toggle Workout Exercise Complete
  const toggleExercise = (exId) => {
    setActiveMember((prev) => ({
      ...prev,
      todayWorkout: prev.todayWorkout.map((ex) => (ex.id === exId ? { ...ex, completed: !ex.completed } : ex))
    }));
  };

  // Membership Renewal
  const handleRenewMember = (memberId) => {
    setMembersList((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          return { ...m, status: "Active", expiry: "30 Nov 2027" };
        }
        return m;
      })
    );
    showToast(`Membership renewed successfully for ${memberId}!`);
  };

  // Enquiry Submissions
  const [enquiryForm, setEnquiryForm] = useState({ name: "", phone: "", interest: "General Gym Membership", message: "" });
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.phone) {
      showToast("Please provide your name and phone number.", "error");
      return;
    }
    setEnquirySuccess(true);
    showToast("Enquiry submitted! Our front desk team in Lingasugur will call you shortly.");
    setTimeout(() => {
      setEnquirySuccess(false);
      setEnquiryForm({ name: "", phone: "", interest: "General Gym Membership", message: "" });
    }, 4000);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0c] text-neutral-100 font-sans selection:bg-orange-500 selection:text-white">
      {/* ============================================================== */}
      {/* 1. TOP PERSONA & DEMO ROLE BAR                                 */}
      {/* ============================================================== */}
      <aside aria-label="Demo Role Switcher" className="bg-[#121319] border-b border-neutral-800 text-xs px-3 sm:px-4 py-1.5 sm:py-2 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold text-neutral-300 uppercase text-[10px] sm:text-[11px] hidden sm:inline">
              Persona:
            </span>
            <span className="font-semibold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 text-[10px] sm:text-xs whitespace-nowrap">
              {currentRole === 'visitor' && 'Visitor (Lingasugur)'}
              {currentRole === 'member' && 'Member: Rahul'}
              {currentRole === 'trainer' && 'Coach Vikram'}
              {currentRole === 'admin' && 'Admin Console'}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => handleRoleChange('visitor')}
              className={`px-2 sm:px-2.5 py-1 rounded text-[11px] sm:text-xs font-medium transition whitespace-nowrap ${
                currentRole === 'visitor' ? 'bg-orange-500 text-white shadow' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              Visitor
            </button>
            <button
              onClick={() => handleRoleChange('member')}
              className={`px-2 sm:px-2.5 py-1 rounded text-[11px] sm:text-xs font-medium transition whitespace-nowrap ${
                currentRole === 'member' ? 'bg-orange-500 text-white shadow' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              Member
            </button>
            <button
              onClick={() => handleRoleChange('trainer')}
              className={`px-2 sm:px-2.5 py-1 rounded text-[11px] sm:text-xs font-medium transition whitespace-nowrap ${
                currentRole === 'trainer' ? 'bg-orange-500 text-white shadow' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              Coach
            </button>
            <button
              onClick={() => handleRoleChange('admin')}
              className={`px-2 sm:px-2.5 py-1 rounded text-[11px] sm:text-xs font-medium transition whitespace-nowrap ${
                currentRole === 'admin' ? 'bg-lime-500 text-black font-bold shadow' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* 2. MAIN HEADER & BRAND NAVIGATION                              */}
      {/* ============================================================== */}
      <header className="border-b border-neutral-800/80 bg-[#0a0a0c]/90 backdrop-blur-md sticky top-[33px] sm:top-[37px] z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition transform shrink-0">
              <div className="w-full h-full bg-[#0a0a0c] rounded-[10px] flex items-center justify-center">
                <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 group-hover:rotate-12 transition transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-black text-base sm:text-xl tracking-wider text-white">INDIAN</span>
                <span className="font-black text-base sm:text-xl tracking-wider text-orange-500">FITNESS</span>
                <span className="text-[10px] sm:text-xs font-extrabold px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  GYM
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-neutral-400 tracking-widest font-semibold uppercase">
                Lingasugur • Karnataka
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => setCurrentTab('home')}
              className={`px-3.5 py-2 rounded-lg transition ${
                currentTab === 'home' ? 'text-orange-500 bg-orange-500/10 font-bold' : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentTab('facilities')}
              className={`px-3.5 py-2 rounded-lg transition ${
                currentTab === 'facilities' ? 'text-orange-500 bg-orange-500/10 font-bold' : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              Facilities
            </button>
            <button
              onClick={() => setCurrentTab('plans')}
              className={`px-3.5 py-2 rounded-lg transition ${
                currentTab === 'plans' ? 'text-orange-500 bg-orange-500/10 font-bold' : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              Plans & Pricing
            </button>
            <button
              onClick={() => setCurrentTab('trainers')}
              className={`px-3.5 py-2 rounded-lg transition ${
                currentTab === 'trainers' ? 'text-orange-500 bg-orange-500/10 font-bold' : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              Coaches
            </button>

            <div className="h-5 w-px bg-neutral-800 mx-2"></div>

            <button
              onClick={() => { setCurrentTab('member-portal'); setCurrentRole('member'); }}
              className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
                currentTab === 'member-portal' ? 'text-orange-400 bg-orange-500/15 font-bold border border-orange-500/30' : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              Member Hub
            </button>

            <button
              onClick={() => { setCurrentTab('admin'); setCurrentRole('admin'); }}
              className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
                currentTab === 'admin' ? 'text-lime-400 bg-lime-500/15 font-bold border border-lime-500/30' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-lime-400" />
              Admin
            </button>
          </nav>

          {/* Right Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedPlanForModal(MEMBERSHIP_PLANS[1])}
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 active:scale-95 transition"
            >
              <Zap className="w-4 h-4" />
              Join Gym
            </button>

            <a
              href={`https://wa.me/${GYM_INFO.whatsapp}?text=Hi%20Indian%20Fitness%20Gym%20Lingasugur,%20I%20want%20to%20know%20more%20about%20gym%20membership`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-emerald-400 border border-neutral-700 transition"
              title="WhatsApp Front Desk"
            >
              <MessageSquare className="w-5 h-5" />
            </a>

            {/* Mobile menu hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0d0e14] border-b border-neutral-800 px-4 pt-2 pb-6 space-y-2">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-neutral-800">
              <button
                onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-lg bg-neutral-900 text-left font-medium text-sm text-neutral-200"
              >
                🏠 Home
              </button>
              <button
                onClick={() => { setCurrentTab('facilities'); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-lg bg-neutral-900 text-left font-medium text-sm text-neutral-200"
              >
                🏋️ Facilities
              </button>
              <button
                onClick={() => { setCurrentTab('plans'); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-lg bg-neutral-900 text-left font-medium text-sm text-neutral-200"
              >
                💳 Plans & Pricing
              </button>
              <button
                onClick={() => { setCurrentTab('trainers'); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-lg bg-neutral-900 text-left font-medium text-sm text-neutral-200"
              >
                🥋 Coaches
              </button>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => { setCurrentTab('member-portal'); setCurrentRole('member'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold text-sm flex items-center justify-center gap-2"
              >
                Member Dashboard & Health
              </button>
              <button
                onClick={() => { setCurrentTab('admin'); setCurrentRole('admin'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl bg-lime-500/20 text-lime-400 border border-lime-500/30 font-bold text-sm flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" /> Owner & Admin Console
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================== */}
      {/* 3. ACTIVE TAB CONTENT ROUTER                                   */}
      {/* ============================================================== */}
      <main>
        {/* TAB: HOME */}
        {currentTab === 'home' && (
          <div>
            {/* HERO SECTION */}
            <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-[#0e0f14] via-[#0a0a0c] to-[#0a0a0c]">
              {/* Background ambient orbs */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[220px] sm:h-[350px] bg-orange-600/15 blur-[100px] sm:blur-[140px] pointer-events-none rounded-full"></div>
              <div className="absolute top-1/2 right-0 w-[240px] sm:w-[400px] h-[200px] sm:h-[300px] bg-lime-500/10 blur-[90px] sm:blur-[120px] pointer-events-none rounded-full"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Lingasugur's Most Advanced Fitness Facility
                    </div>

                    <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
                      TRANSFORM <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-lime-400">
                        BODY & MIND.
                      </span>
                    </h1>

                    <p className="text-sm sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
                      World-class strength equipment, heavy Olympic barbells, certified coaches, and custom bio-metric nutrition protocols built for real athletic performance.
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                      <button
                        onClick={() => setSelectedPlanForModal(MEMBERSHIP_PLANS[1])}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-orange-500/25 active:scale-95 transition flex items-center justify-center gap-2"
                      >
                        <Zap className="w-4 h-4 fill-current" />
                        Join Now • Start Today
                      </button>

                      <button
                        onClick={() => setCurrentTab('plans')}
                        className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-bold text-xs sm:text-sm uppercase tracking-wider transition text-center"
                      >
                        Explore Plans
                      </button>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-neutral-800/80">
                      <div>
                        <p className="text-xl sm:text-3xl font-black text-white">5,500</p>
                        <p className="text-[10px] sm:text-xs text-neutral-400 font-medium">Sq. Ft. Dual Floor</p>
                      </div>
                      <div>
                        <p className="text-xl sm:text-3xl font-black text-orange-500">55 KG</p>
                        <p className="text-[10px] sm:text-xs text-neutral-400 font-medium">Heavy Dumbbells</p>
                      </div>
                      <div>
                        <p className="text-xl sm:text-3xl font-black text-lime-400">5:00 AM</p>
                        <p className="text-[10px] sm:text-xs text-neutral-400 font-medium">Early Bird Open</p>
                      </div>
                    </div>
                  </div>

                  {/* Hero Image Collage */}
                  <div className="lg:col-span-5 relative mt-4 lg:mt-0">
                    <div className="relative mx-auto max-w-md lg:max-w-none">
                      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 group">
                        <img
                          src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=900&auto=format&fit=crop&q=80"
                          alt="Indian Fitness Gym Lingasugur Interior"
                          className="w-full h-64 sm:h-[460px] object-cover object-center group-hover:scale-105 transition duration-700 brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                        {/* Floating Badge */}
                        <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#121319]/90 backdrop-blur-md border border-neutral-700/60 shadow-xl flex items-center justify-between">
                          <div className="flex items-center gap-2.5 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                              <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <div>
                              <p className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">Certified Trainers</p>
                              <p className="text-[10px] sm:text-[11px] text-neutral-400">NSCA & ACE Coaching</p>
                            </div>
                          </div>
                          <span className="text-[10px] sm:text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-emerald-500/20">
                            Open Now
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FACILITIES SNAPSHOT */}
            <section className="py-20 bg-[#0a0a0c] border-t border-neutral-800/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-orange-500">World-Class Equipment</span>
                    <h2 className="text-3xl sm:text-4xl font-black uppercase text-white">Engineered For Gains</h2>
                  </div>
                  <button
                    onClick={() => setCurrentTab('facilities')}
                    className="text-xs font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 flex items-center gap-1.5 self-start md:self-auto"
                  >
                    View All 6 Training Zones <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {FACILITIES.slice(0, 3).map((f, idx) => (
                    <div
                      key={idx}
                      className="group rounded-2xl overflow-hidden bg-[#121319] border border-neutral-800 hover:border-orange-500/40 transition duration-300 shadow-lg flex flex-col"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={f.image}
                          alt={f.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[11px] font-bold uppercase text-orange-400 border border-orange-500/30">
                          {f.category}
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition">{f.title}</h3>
                          <p className="text-xs text-neutral-400 mt-2 line-clamp-3 leading-relaxed">{f.desc}</p>
                        </div>
                        <p className="text-[11px] font-semibold text-neutral-300 pt-2 border-t border-neutral-800/80">
                          ⚡ {f.specs}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* MEMBERSHIP PREVIEW BANNER */}
            <section className="py-20 bg-gradient-to-r from-[#171822] via-[#121319] to-[#1a120d] border-y border-neutral-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <span className="text-xs font-black uppercase tracking-widest text-orange-500">Transparent & Affordable</span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase text-white">Membership Built For Real Commitment</h2>
                <p className="text-neutral-300 max-w-2xl mx-auto text-sm sm:text-base">
                  No hidden sign-up charges. No lock-in contracts. Get full access to high-performance weights, locker rooms, steam bath, and smart turnstile access.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => setCurrentTab('plans')}
                    className="px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/30 transition"
                  >
                    View All Plans & Special Discounts
                  </button>
                  <button
                    onClick={() => setSelectedPlanForModal(MEMBERSHIP_PLANS[0])}
                    className="px-7 py-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 font-bold text-xs uppercase tracking-wider transition"
                  >
                    Get 1-Day Trial Pass
                  </button>
                </div>
              </div>
            </section>

            {/* LOCATION & GOOGLE MAPS / CONTACT HIGHLIGHT */}
            <section className="py-20 bg-[#0a0a0c]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Lingasugur Location</span>
                      <h2 className="text-3xl font-black uppercase text-white">Visit Our Training Floor</h2>
                    </div>

                    <div className="space-y-4 text-sm text-neutral-300">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-white">Indian Fitness Gym</p>
                          <p className="text-xs text-neutral-400 mt-0.5">{GYM_INFO.address}</p>
                          <p className="text-[11px] text-orange-400/90 font-medium mt-1">Prime landmark: 2 mins walk from Lingasugur Old Bus Stand</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-white">Operating Hours</p>
                          <p className="text-xs text-neutral-400">Monday – Saturday: {GYM_INFO.hours.monSat}</p>
                          <p className="text-xs text-neutral-400">Sunday: {GYM_INFO.hours.sunday}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-white">Direct Front Desk Desk</p>
                          <p className="text-xs text-neutral-400">{GYM_INFO.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href={`https://wa.me/${GYM_INFO.whatsapp}?text=Hello,%20I%20want%20to%20visit%20Indian%20Fitness%20Gym%20in%20Lingasugur`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Interactive Map Visual */}
                  <div className="lg:col-span-7">
                    <div className="rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl relative min-h-[380px] flex flex-col justify-between p-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase text-orange-400">Interactive Location Guide</span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-lime-500/10 text-lime-400 border border-lime-500/20 font-semibold">
                            Full Parking Available
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-white">Lingasugur Main Road Hub</h4>
                        <p className="text-xs text-neutral-400">
                          Accessible by private vehicle and public transit with dedicated 2-wheeler and car parking right outside the gym premises.
                        </p>
                      </div>

                      <div className="my-6 rounded-2xl bg-[#121319] p-5 border border-neutral-800 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-400">Distance from KSRTC Bus Stand</span>
                          <span className="font-bold text-white">450 Meters (~2 mins)</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-400">Distance from Court Circle</span>
                          <span className="font-bold text-white">800 Meters</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-400">Backup Generator</span>
                          <span className="font-bold text-emerald-400">100% Uninterrupted Power</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-neutral-400">Latitude: 16.1558° N, Longitude: 76.5746° E</span>
                        <a
                          href="https://maps.google.com/?q=Lingasugur,Karnataka"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-orange-400 text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          Open in Google Maps <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB: FACILITIES */}
        {currentTab === 'facilities' && (
          <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500">Dual Floor Architecture</span>
              <h1 className="text-4xl font-black uppercase text-white">Six Elite Training Zones</h1>
              <p className="text-neutral-400 text-sm">
                Every square foot of Indian Fitness Gym in Lingasugur is purpose-built with shock-absorbing commercial rubber flooring, high airflow industrial fans, and precision gym machinery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FACILITIES.map((facility, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl overflow-hidden bg-[#121319] border border-neutral-800 hover:border-orange-500/40 transition duration-300 shadow-xl flex flex-col group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-xs font-bold uppercase text-orange-400 border border-orange-500/30">
                      {facility.category}
                    </div>
                  </div>

                  <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition">
                        {facility.title}
                      </h3>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {facility.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-800 space-y-3">
                      <div className="text-[11px] font-semibold text-orange-400/90 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" /> {facility.specs}
                      </div>

                      <button
                        onClick={() => setSelectedPlanForModal(MEMBERSHIP_PLANS[1])}
                        className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-orange-500 hover:text-white text-neutral-200 text-xs font-bold uppercase tracking-wider transition"
                      >
                        Enroll in this Zone
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PLANS & PRICING */}
        {currentTab === 'plans' && (
          <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500">Transparent Subscriptions</span>
              <h1 className="text-4xl font-black uppercase text-white">Membership Plans & Pricing</h1>
              <p className="text-neutral-400 text-sm">
                Join Lingasugur's elite fitness community. Transparent, no-hidden-cost pricing with automatic bio-metric onboarding calculated immediately upon enrollment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MEMBERSHIP_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-7 flex flex-col justify-between transition duration-300 relative shadow-xl ${
                    plan.popular
                      ? 'bg-gradient-to-b from-[#1b1c28] to-[#121319] border-2 border-orange-500 shadow-orange-500/10'
                      : 'bg-[#121319] border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-extrabold uppercase tracking-wider shadow">
                      Most Popular
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">{plan.duration}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                        {plan.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white">{plan.title}</h3>

                    <div className="pt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-white">₹{plan.price.toLocaleString()}</span>
                        <span className="text-sm text-neutral-500 line-through">₹{plan.originalPrice.toLocaleString()}</span>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-medium mt-0.5">
                        Save ₹{(plan.originalPrice - plan.price).toLocaleString()} • All Inclusive
                      </p>
                    </div>

                    <ul className="space-y-2.5 pt-4 border-t border-neutral-800 text-xs text-neutral-300">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => setSelectedPlanForModal(plan)}
                      className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition ${
                        plan.popular
                          ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 active:scale-95'
                          : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                      }`}
                    >
                      Join With This Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Student & Special Discount Banner */}
            <div className="rounded-3xl p-8 bg-gradient-to-r from-neutral-900 via-[#14151e] to-neutral-900 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold text-lime-400 uppercase tracking-widest">Lingasugur Student & Armed Forces Offer</span>
                <h3 className="text-2xl font-black text-white">Flat 15% OFF with Valid College ID</h3>
                <p className="text-xs text-neutral-400 max-w-xl">
                  Available for students of V.C.B College, Government First Grade College Lingasugur, and active armed forces personnel. Bring your valid ID to the front desk.
                </p>
              </div>
              <button
                onClick={() => setSelectedPlanForModal(MEMBERSHIP_PLANS[0])}
                className="px-6 py-3.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-black font-extrabold text-xs uppercase tracking-wider transition shrink-0"
              >
                Claim Student Discount
              </button>
            </div>
          </div>
        )}

        {/* TAB: COACHES */}
        {currentTab === 'trainers' && (
          <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500">Master Mentorship</span>
              <h1 className="text-4xl font-black uppercase text-white">Certified Personal Coaches</h1>
              <p className="text-neutral-400 text-sm">
                Trained in anatomy, progressive biomechanics, and nutrition science. Our coaches guide you away from gym injuries and towards lifelong strength.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TRAINERS.map((coach) => (
                <div
                  key={coach.id}
                  className="rounded-3xl overflow-hidden bg-[#121319] border border-neutral-800 hover:border-orange-500/40 transition duration-300 shadow-xl flex flex-col group"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={coach.photo}
                      alt={coach.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-bold uppercase text-orange-400 border border-orange-500/30">
                      {coach.exp}
                    </div>
                  </div>

                  <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition">
                        {coach.name}
                      </h3>
                      <p className="text-xs font-bold text-orange-400">{coach.role}</p>
                      <p className="text-xs text-neutral-300 pt-1 leading-relaxed">{coach.bio}</p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-neutral-800 text-xs">
                      <div>
                        <span className="text-neutral-500 block text-[10px] uppercase font-bold">Specialty</span>
                        <span className="text-neutral-200 font-medium">{coach.specialty}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[10px] uppercase font-bold">Credentials</span>
                        <span className="text-lime-400 font-semibold">{coach.certifications}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[10px] uppercase font-bold">Floor Timing</span>
                        <span className="text-neutral-300">{coach.availability}</span>
                      </div>

                      <a
                        href={`https://wa.me/${GYM_INFO.whatsapp}?text=Hi,%20I%20want%20to%20book%20a%20personal%20training%20trial%20with%20${encodeURIComponent(coach.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-orange-500 hover:text-white text-orange-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> Book Consultation
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: FITNESS SUITE (MEMBER-EXCLUSIVE) */}
        {currentTab === 'tools' && (
          currentRole === 'visitor' ? (
            <div className="py-24 max-w-2xl mx-auto px-4 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto text-orange-400">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase text-white">Member-Exclusive Fitness Suite</h2>
                <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Our advanced BMI calculators, TDEE Calorie Engine, Karnataka Macro Meal Planners, and Workout Routines are reserved for active Indian Fitness Gym members.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => setCurrentTab('plans')}
                  className="px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition"
                >
                  Explore Membership Plans
                </button>
                <button
                  onClick={() => handleRoleChange('member')}
                  className="px-6 py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs uppercase tracking-wider transition"
                >
                  Log In As Member (Rahul)
                </button>
              </div>
            </div>
          ) : (
            <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-orange-500">Live Computational Engine</span>
                <h1 className="text-4xl font-black uppercase text-white">Athletic Health & Fitness Suite</h1>
                <p className="text-neutral-400 text-sm">
                  Interactive body metrics calculators, Indian diet meal planners, workout routines, and hydration trackers.
                </p>
              </div>

              {/* TDEE & Macro Calculator Widget */}
              <div className="rounded-3xl p-8 bg-[#121319] border border-neutral-800 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                  <div>
                    <h3 className="text-xl font-black text-white uppercase flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-500" /> Daily Caloric Expenditure & Macro Split
                    </h3>
                    <p className="text-xs text-neutral-400">Using the clinical Mifflin-St Jeor formula adapted for weightlifting.</p>
                  </div>
                  <span className="text-xs font-bold text-lime-400 bg-lime-500/10 px-3 py-1 rounded-full border border-lime-500/20">
                    Calculated for: {activeMember.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase">Daily Calorie Target</span>
                    <p className="text-2xl font-black text-orange-500 mt-1">{activeMember.dailyCaloriesTarget} kcal</p>
                    <span className="text-[10px] text-neutral-500">Goal: {activeMember.goal.toUpperCase()}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase">Protein Target</span>
                    <p className="text-2xl font-black text-white mt-1">{activeMember.macrosTarget.protein}g</p>
                    <span className="text-[10px] text-emerald-400">~2.0g/kg bodyweight</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase">Carbohydrates</span>
                    <p className="text-2xl font-black text-white mt-1">{activeMember.macrosTarget.carbs}g</p>
                    <span className="text-[10px] text-neutral-500">Energy & Glycogen</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase">Healthy Fats</span>
                    <p className="text-2xl font-black text-white mt-1">{activeMember.macrosTarget.fats}g</p>
                    <span className="text-[10px] text-neutral-500">Hormonal Balance</span>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => { setCurrentTab('member-portal'); setMemberSubTab('dashboard'); }}
                    className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-orange-400 text-xs font-bold flex items-center gap-2 transition"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" /> Edit Details in Member Dashboard
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {/* TAB: MEMBER PORTAL */}
        {currentTab === 'member-portal' && (
          <div className="py-6 sm:py-8 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
            {/* Top Member Welcome Banner */}
            <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-8 bg-gradient-to-r from-[#171822] via-[#121319] to-[#1c120e] border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-bold border border-emerald-500/30">
                    Active Membership
                  </span>
                  <span className="text-[10px] sm:text-xs text-neutral-400 font-mono">ID: {activeMember.id}</span>
                </div>
                <h1 className="text-xl sm:text-4xl font-black text-white">Welcome back, {activeMember.name}!</h1>
                <p className="text-xs sm:text-sm text-neutral-300">
                  {activeMember.plan} • <span className="text-orange-400 font-bold">{activeMember.daysRemaining} days remaining</span> (Expires {activeMember.expiryDate})
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowReceiptModal(activeMember)}
                  className="px-3.5 py-2 sm:py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs flex items-center gap-1.5 border border-neutral-700 transition"
                >
                  <FileText className="w-3.5 h-3.5" /> Tax Receipt
                </button>
              </div>
            </div>

            {/* SIX DEDICATED MEMBER SUB-TABS NAVIGATION */}
            <div className="bg-[#121319] p-1.5 rounded-2xl border border-neutral-800 flex items-center gap-1 overflow-x-auto scrollbar-none shadow-lg -mx-2 px-2 sm:mx-0 sm:px-1.5 touch-pan-x">
              <button
                onClick={() => setMemberSubTab('dashboard')}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 whitespace-nowrap transition shrink-0 ${
                  memberSubTab === 'dashboard'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> My Dashboard
              </button>

              <button
                onClick={() => setMemberSubTab('workouts')}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 whitespace-nowrap transition shrink-0 ${
                  memberSubTab === 'workouts'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <Dumbbell className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Workout Plans
              </button>

              <button
                onClick={() => setMemberSubTab('diet')}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 whitespace-nowrap transition shrink-0 ${
                  memberSubTab === 'diet'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Diet & Nutrition
              </button>

              <button
                onClick={() => setMemberSubTab('calculators')}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 whitespace-nowrap transition shrink-0 ${
                  memberSubTab === 'calculators'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Health Calculators
              </button>

              <button
                onClick={() => setMemberSubTab('progress')}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 whitespace-nowrap transition shrink-0 ${
                  memberSubTab === 'progress'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Progress Tracker
              </button>

              <button
                onClick={() => setMemberSubTab('water-activity')}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 whitespace-nowrap transition shrink-0 ${
                  memberSubTab === 'water-activity'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <Droplets className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Water & Activity
              </button>
            </div>

            {/* ========================================================= */}
            {/* 1. MY DASHBOARD VIEW                                      */}
            {/* ========================================================= */}
            {memberSubTab === 'dashboard' && (
              <div className="space-y-6 sm:space-y-8">
                {/* INTERACTIVE BIO-METRIC CALIBRATION & AUTOMATION ENGINE */}
                <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#181926] via-[#121319] to-[#15110d] border-2 border-orange-500/40 shadow-2xl relative space-y-4 sm:space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 border-b border-neutral-800 pb-3 sm:pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 shrink-0" />
                        <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wide">
                          Bio-Metrics & Automation
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[9px] sm:text-[10px] font-bold uppercase">
                          Real-Time
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-neutral-300">
                        Update your weight and goals. All workouts, meal plans, calculators and hydration will instantly sync.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] text-neutral-400">Calibrated Weight:</span>
                      <span className="text-xs sm:text-sm font-black text-orange-400 bg-neutral-900 px-2.5 sm:px-3 py-1 rounded-xl border border-neutral-800">
                        {activeMember.weight} kg
                      </span>
                    </div>
                  </div>

                  {/* Input Form Controls */}
                  <form onSubmit={handleAutoCalibrateAll} className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      <div>
                        <label className="text-[10px] sm:text-[11px] font-bold text-neutral-300 uppercase block mb-1">
                          Weight (kg)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={dashboardBio.weight}
                          onChange={(e) => updateBioAndSyncAll({ weight: Number(e.target.value) })}
                          className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] sm:text-[11px] font-bold text-neutral-300 uppercase block mb-1">
                          Height (cm)
                        </label>
                        <input
                          type="number"
                          value={dashboardBio.height}
                          onChange={(e) => updateBioAndSyncAll({ height: Number(e.target.value) })}
                          className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] sm:text-[11px] font-bold text-neutral-300 uppercase block mb-1">
                          Age (Years)
                        </label>
                        <input
                          type="number"
                          value={dashboardBio.age}
                          onChange={(e) => updateBioAndSyncAll({ age: Number(e.target.value) })}
                          className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] sm:text-[11px] font-bold text-neutral-300 uppercase block mb-1">
                          Gender
                        </label>
                        <select
                          value={dashboardBio.gender}
                          onChange={(e) => updateBioAndSyncAll({ gender: e.target.value })}
                          className="w-full px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs font-bold text-white focus:outline-none focus:border-orange-500"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      <div>
                        <label className="text-[10px] sm:text-[11px] font-bold text-neutral-300 uppercase block mb-1">
                          Primary Fitness Goal
                        </label>
                        <select
                          value={dashboardBio.goal}
                          onChange={(e) => updateBioAndSyncAll({ goal: e.target.value })}
                          className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs font-bold text-white focus:outline-none focus:border-orange-500"
                        >
                          <option value="bulk">Muscle Hypertrophy / Bulking (+400 kcal & Heavy Loads)</option>
                          <option value="cut">Fat Loss & Caloric Deficit (-500 kcal & High Density)</option>
                          <option value="maintain">Body Recomposition / Maintenance (TDEE Balance)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] sm:text-[11px] font-bold text-neutral-300 uppercase block mb-1">
                          Weekly Training Frequency
                        </label>
                        <select
                          value={dashboardBio.activity}
                          onChange={(e) => updateBioAndSyncAll({ activity: Number(e.target.value) })}
                          className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs font-bold text-white focus:outline-none focus:border-orange-500"
                        >
                          <option value={1.375}>Light (1-2 gym days/week)</option>
                          <option value={1.55}>Moderate (3-5 gym days/week)</option>
                          <option value={1.725}>Intense Lifter (6 days/week heavy progressive overload)</option>
                        </select>
                      </div>
                    </div>

                    {/* Real-time automated calculation readout banner */}
                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0e0f14] border border-neutral-800 space-y-2">
                      <div className="flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] gap-1">
                        <span className="font-bold text-lime-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 fill-current" /> Live Computation (Auto-Synced)
                        </span>
                        <span className="text-neutral-400">
                          BMI: <strong className="text-white">{liveDashboardPreview.bmi}</strong> ({liveDashboardPreview.bmi < 18.5 ? 'Underweight' : liveDashboardPreview.bmi <= 24.9 ? 'Healthy' : 'Overweight'})
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-900 border border-neutral-800/80">
                          <span className="text-[9px] sm:text-[10px] text-neutral-400 block font-semibold uppercase">Daily Calories</span>
                          <span className="text-sm sm:text-base font-black text-orange-400">{liveDashboardPreview.targetCalories} kcal</span>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-900 border border-neutral-800/80">
                          <span className="text-[9px] sm:text-[10px] text-neutral-400 block font-semibold uppercase">Protein Quota</span>
                          <span className="text-sm sm:text-base font-black text-emerald-400">{liveDashboardPreview.proteinGrams}g</span>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-900 border border-neutral-800/80">
                          <span className="text-[9px] sm:text-[10px] text-neutral-400 block font-semibold uppercase">Water Target</span>
                          <span className="text-sm sm:text-base font-black text-sky-400">{liveDashboardPreview.waterTargetMl} ml</span>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-900 border border-neutral-800/80">
                          <span className="text-[9px] sm:text-[10px] text-neutral-400 block font-semibold uppercase">Daily Steps</span>
                          <span className="text-sm sm:text-base font-black text-white">{liveDashboardPreview.stepsTarget.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 active:scale-95 transition"
                    >
                      <Zap className="w-4 h-4 fill-current" /> Save & Auto-Sync All Tabs
                    </button>
                  </form>
                </div>

                {/* 4 Metric Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                  <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#121319] border border-neutral-800">
                    <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase">Today's Calories</span>
                    <p className="text-lg sm:text-2xl font-black text-orange-400 mt-1">{activeMember.caloriesLogged} / {activeMember.dailyCaloriesTarget}</p>
                    <span className="text-[10px] sm:text-[11px] text-neutral-500">kcal ({Math.round((activeMember.caloriesLogged / activeMember.dailyCaloriesTarget) * 100)}%)</span>
                  </div>
                  <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#121319] border border-neutral-800">
                    <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase">Daily Hydration</span>
                    <p className="text-lg sm:text-2xl font-black text-sky-400 mt-1">{activeMember.waterLoggedMl} / {activeMember.waterTargetMl}</p>
                    <span className="text-[10px] sm:text-[11px] text-neutral-500">ml consumed</span>
                  </div>
                  <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#121319] border border-neutral-800">
                    <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase">Workout Status</span>
                    <p className="text-lg sm:text-2xl font-black text-emerald-400 mt-1">
                      {activeMember.todayWorkout.filter(w => w.completed).length} / {activeMember.todayWorkout.length}
                    </p>
                    <span className="text-[10px] sm:text-[11px] text-neutral-500">Exercises finished</span>
                  </div>
                  <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#121319] border border-neutral-800">
                    <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase">Body Weight</span>
                    <p className="text-lg sm:text-2xl font-black text-white mt-1">{activeMember.weight} kg</p>
                    <span className="text-[10px] sm:text-[11px] text-emerald-400 font-semibold">BMI: {(activeMember.weight / Math.pow(activeMember.height / 100, 2)).toFixed(1)}</span>
                  </div>
                </div>

                {/* Dashboard Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Quick Action Cards */}
                  <div className="lg:col-span-8 space-y-6">
                    {/* Quick Workout Preview */}
                    <div className="p-6 rounded-3xl bg-[#121319] border border-neutral-800 space-y-4">
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                        <div className="flex items-center gap-2">
                          <Dumbbell className="w-5 h-5 text-orange-500" />
                          <h3 className="font-bold text-white text-base">Today's Training Schedule</h3>
                        </div>
                        <button
                          onClick={() => setMemberSubTab('workouts')}
                          className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
                        >
                          View Full Routine <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2">
                        {activeMember.todayWorkout.slice(0, 3).map((w) => (
                          <div
                            key={w.id}
                            onClick={() => toggleExercise(w.id)}
                            className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between cursor-pointer text-xs"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded border flex items-center justify-center ${w.completed ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-neutral-600'}`}>
                                {w.completed && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <span className={w.completed ? 'line-through text-neutral-400' : 'text-white font-medium'}>
                                {w.exercise}
                              </span>
                            </div>
                            <span className="text-[11px] text-neutral-400">{w.sets} • {w.reps}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Diet & Protein Progress */}
                    <div className="p-6 rounded-3xl bg-[#121319] border border-neutral-800 space-y-4">
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                        <div className="flex items-center gap-2">
                          <Flame className="w-5 h-5 text-orange-500" />
                          <h3 className="font-bold text-white text-base">Nutrition & Protein Intake</h3>
                        </div>
                        <button
                          onClick={() => setMemberSubTab('diet')}
                          className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
                        >
                          Log Meals <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-neutral-400">Total Calories</span>
                            <span className="font-bold text-white">{activeMember.caloriesLogged} / {activeMember.dailyCaloriesTarget} kcal</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                            <div
                              className="h-full bg-orange-500 rounded-full"
                              style={{ width: `${Math.min(100, (activeMember.caloriesLogged / activeMember.dailyCaloriesTarget) * 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-neutral-400">Protein Target</span>
                            <span className="font-bold text-emerald-400">{activeMember.macrosLogged.protein} / {activeMember.macrosTarget.protein}g</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${Math.min(100, (activeMember.macrosLogged.protein / activeMember.macrosTarget.protein) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Coach & Announcements */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Coach Card */}
                    <div className="p-6 rounded-3xl bg-[#121319] border border-neutral-800 space-y-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={TRAINERS[0].photo}
                          alt={activeMember.coach}
                          className="w-12 h-12 rounded-2xl object-cover border border-orange-500/40"
                        />
                        <div>
                          <span className="text-[10px] text-orange-400 uppercase font-black">Personal Coach</span>
                          <h4 className="text-sm font-bold text-white">{activeMember.coach}</h4>
                          <p className="text-[10px] text-neutral-400">Head Strength Coach • Lingasugur</p>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/${GYM_INFO.whatsapp}?text=Hi%20${encodeURIComponent(activeMember.coach)},%20this%20is%20${encodeURIComponent(activeMember.name)}.%20I%20have%20a%20question%20about%20my%20workout.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-orange-500 hover:text-white text-orange-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-neutral-700 transition"
                      >
                        <MessageSquare className="w-4 h-4" /> Message Coach
                      </a>
                    </div>

                    {/* Gym Announcements */}
                    <div className="p-6 rounded-3xl bg-[#121319] border border-neutral-800 space-y-3">
                      <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-lime-400" /> Lingasugur Gym Notice Board
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800/80">
                          <p className="font-semibold text-white">Sunday Mobility & Steam</p>
                          <p className="text-[11px] text-neutral-400 mt-0.5">Sauna and deep foam rolling sessions open 6:00 AM – 1:00 PM.</p>
                        </div>
                        <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800/80">
                          <p className="font-semibold text-white">New Olympic Barbells Arrived</p>
                          <p className="text-[11px] text-neutral-400 mt-0.5">Dual knurling calibrated barbells added to rack #3 and #4.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 2. WORKOUT PLANS VIEW                                     */}
            {/* ========================================================= */}
            {memberSubTab === 'workouts' && (
              <div className="space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-neutral-800 pb-3 sm:pb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-black text-white uppercase flex items-center gap-2">
                        <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" /> Workout Programs
                      </h2>
                      <span className="text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase">
                        {activeMember.weight}kg • {activeMember.goal.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">
                      Target loads and repetitions have been mathematically adjusted for your bodyweight.
                    </p>
                  </div>

                  {/* Split Selector Buttons */}
                  <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-xl border border-neutral-800 overflow-x-auto max-w-full scrollbar-none touch-pan-x">
                    <button
                      onClick={() => setActiveWorkoutSplit('push')}
                      className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold whitespace-nowrap transition ${activeWorkoutSplit === 'push' ? 'bg-orange-500 text-white' : 'text-neutral-400 hover:text-white'}`}
                    >
                      Push Day
                    </button>
                    <button
                      onClick={() => setActiveWorkoutSplit('pull')}
                      className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold whitespace-nowrap transition ${activeWorkoutSplit === 'pull' ? 'bg-orange-500 text-white' : 'text-neutral-400 hover:text-white'}`}
                    >
                      Pull Day
                    </button>
                    <button
                      onClick={() => setActiveWorkoutSplit('legs')}
                      className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold whitespace-nowrap transition ${activeWorkoutSplit === 'legs' ? 'bg-orange-500 text-white' : 'text-neutral-400 hover:text-white'}`}
                    >
                      Legs & Quads
                    </button>
                    <button
                      onClick={() => setActiveWorkoutSplit('core')}
                      className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold whitespace-nowrap transition ${activeWorkoutSplit === 'core' ? 'bg-orange-500 text-white' : 'text-neutral-400 hover:text-white'}`}
                    >
                      Core & HIIT
                    </button>
                  </div>
                </div>

                {/* Workout Exercise List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentWorkoutSplits[activeWorkoutSplit].map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (activeWorkoutSplit === 'legs') {
                          toggleExercise(item.id);
                        } else {
                          showToast(`Marked ${item.exercise} for ${activeWorkoutSplit.toUpperCase()} session.`);
                        }
                      }}
                      className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                        item.completed
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-neutral-300'
                          : 'bg-[#121319] border-neutral-800 hover:border-neutral-700 text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center font-bold text-xs text-orange-400">
                          0{idx + 1}
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${item.completed ? 'line-through text-neutral-400' : 'text-white'}`}>
                            {item.exercise}
                          </p>
                          <p className="text-xs text-neutral-400">
                            {item.sets} • {item.reps} {item.targetWeight && `• Calibrated Target: ${item.targetWeight}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-900 text-neutral-400'}`}>
                          {item.completed ? 'Completed' : 'Tap to Mark'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Workout Coaching Note */}
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-neutral-300 space-y-1">
                    <p className="font-bold text-white">Coach Vikram's Overload Principle ({activeMember.goal.toUpperCase()} Mode):</p>
                    <p className="text-neutral-400">
                      {activeMember.goal === 'cut'
                        ? "Caloric Deficit Phase: Focus on maintaining heavy mechanical tension with shorter 60-75s rest intervals and controlled eccentric tempos."
                        : activeMember.goal === 'bulk'
                        ? "Hypertrophy Surplus Phase: Prioritize progressive overload on main compound lifts with 90-120s rest periods. When you hit top reps on all sets, add 2.5kg next week."
                        : "Athletic Recomposition: Balanced compound strength and functional conditioning with steady progressive volume."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 3. DIET & NUTRITION VIEW                                  */}
            {/* ========================================================= */}
            {memberSubTab === 'diet' && (
              <div className="space-y-8">
                {/* Calories & Macro Bar */}
                <div className="p-6 rounded-3xl bg-[#121319] border border-neutral-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                    <div>
                      <h3 className="font-bold text-white text-lg">Daily Calories & Macronutrient Progress</h3>
                      <p className="text-xs text-neutral-400">Target calibrated automatically for {activeMember.weight}kg bodyweight.</p>
                    </div>
                    <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                      Goal: {activeMember.goal.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-neutral-300">Calories</span>
                        <span className="text-orange-400">{activeMember.caloriesLogged} / {activeMember.dailyCaloriesTarget} kcal</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{ width: `${Math.min(100, (activeMember.caloriesLogged / activeMember.dailyCaloriesTarget) * 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-neutral-300">Protein</span>
                        <span className="text-emerald-400">{activeMember.macrosLogged.protein} / {activeMember.macrosTarget.protein}g</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${Math.min(100, (activeMember.macrosLogged.protein / activeMember.macrosTarget.protein) * 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-neutral-300">Carbs & Healthy Fats</span>
                        <span className="text-sky-400">{activeMember.macrosLogged.carbs}g C • {activeMember.macrosLogged.fats}g F</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                        <div className="h-full bg-sky-500 rounded-full w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custom Food Logger & Quick Staples */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-6 p-6 rounded-3xl bg-[#121319] border border-neutral-800 space-y-4">
                    <h3 className="font-bold text-white text-base">Log Food / Meal</h3>
                    <form onSubmit={handleAddCustomMeal} className="space-y-3">
                      <input
                        type="text"
                        placeholder="Meal name (e.g., 2 Jowar Roti & Dal)"
                        value={newMealName}
                        onChange={(e) => setNewMealName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          placeholder="Calories (kcal)"
                          value={newMealCals}
                          onChange={(e) => setNewMealCals(e.target.value)}
                          className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none"
                        />
                        <input
                          type="number"
                          placeholder="Protein (grams)"
                          value={newMealProtein}
                          onChange={(e) => setNewMealProtein(e.target.value)}
                          className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition"
                      >
                        <Plus className="w-4 h-4" /> Add Food to Today's Log
                      </button>
                    </form>

                    <div className="space-y-2 pt-2 border-t border-neutral-800">
                      <span className="text-[11px] font-semibold text-neutral-400 block">Or Quick-Log Staples:</span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => logQuickPreset("1 Scoop Whey Protein", 130, 25)}
                          className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs border border-neutral-800 transition"
                        >
                          + Whey Scoop (25g P)
                        </button>
                        <button
                          type="button"
                          onClick={() => logQuickPreset("3 Boiled Eggs", 210, 18)}
                          className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs border border-neutral-800 transition"
                        >
                          + 3 Boiled Eggs (18g P)
                        </button>
                        <button
                          type="button"
                          onClick={() => logQuickPreset("100g Paneer Salad", 260, 18)}
                          className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs border border-neutral-800 transition"
                        >
                          + 100g Paneer (18g P)
                        </button>
                        <button
                          type="button"
                          onClick={() => logQuickPreset("150g Chicken Breast", 250, 45)}
                          className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs border border-neutral-800 transition"
                        >
                          + Chicken Breast (45g P)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Logged Meals List */}
                  <div className="lg:col-span-6 p-6 rounded-3xl bg-[#121319] border border-neutral-800 space-y-3">
                    <h3 className="font-bold text-white text-base">Meals Logged Today ({activeMember.todayMeals.length})</h3>
                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {activeMember.todayMeals.map((meal) => (
                        <div
                          key={meal.id}
                          className="p-3 rounded-xl bg-neutral-900 border border-neutral-800/80 flex items-center justify-between text-xs"
                        >
                          <div>
                            <p className="font-semibold text-white">{meal.name}</p>
                            <p className="text-[11px] text-neutral-400">
                              {meal.cals} kcal • <span className="text-emerald-400 font-medium">{meal.protein}g Protein</span>
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteMeal(meal.id)}
                            className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Structured Regional Indian Diet Blueprint */}
                <div className="p-6 rounded-3xl bg-[#121319] border border-neutral-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Apple className="w-5 h-5 text-emerald-400" />
                      <div>
                        <h3 className="font-bold text-white text-base">Karnataka Athletic Meal Schedule</h3>
                        <p className="text-xs text-neutral-400">Meal portions automatically distributed from your {activeMember.dailyCaloriesTarget} kcal target.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
                      <button
                        onClick={() => setDietPlanType('veg')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${dietPlanType === 'veg' ? 'bg-emerald-600 text-white' : 'text-neutral-400 hover:text-white'}`}
                      >
                        100% Vegetarian
                      </button>
                      <button
                        onClick={() => setDietPlanType('nonveg')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${dietPlanType === 'nonveg' ? 'bg-orange-600 text-white' : 'text-neutral-400 hover:text-white'}`}
                      >
                        Non-Vegetarian
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
                      <span className="text-orange-400 font-bold uppercase text-[10px]">Meal 1 • Breakfast (8:30 AM)</span>
                      <p className="font-bold text-white">{dietPlanType === 'veg' ? 'Oats, Chia Seeds & Sprouted Moong' : '3 Boiled Eggs, 2 Toast & Banana'}</p>
                      <p className="text-neutral-400 text-[11px]">
                        ~{Math.round(activeMember.macrosTarget.protein * 0.25)}g Protein • ~{Math.round(activeMember.dailyCaloriesTarget * 0.25)} kcal
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
                      <span className="text-orange-400 font-bold uppercase text-[10px]">Meal 2 • Lunch (1:30 PM)</span>
                      <p className="font-bold text-white">{dietPlanType === 'veg' ? '2 Jowar Roti, Dal Tadka & Paneer Bhurji' : 'Brown Rice, Chicken Curry & Salad'}</p>
                      <p className="text-neutral-400 text-[11px]">
                        ~{Math.round(activeMember.macrosTarget.protein * 0.35)}g Protein • ~{Math.round(activeMember.dailyCaloriesTarget * 0.35)} kcal
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
                      <span className="text-orange-400 font-bold uppercase text-[10px]">Meal 3 • Pre-Workout (5:00 PM)</span>
                      <p className="font-bold text-white">Black Coffee, 1 Banana & Roasted Chana</p>
                      <p className="text-neutral-400 text-[11px]">
                        ~{Math.round(activeMember.macrosTarget.protein * 0.15)}g Protein • ~{Math.round(activeMember.dailyCaloriesTarget * 0.15)} kcal
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
                      <span className="text-orange-400 font-bold uppercase text-[10px]">Meal 4 • Dinner (8:30 PM)</span>
                      <p className="font-bold text-white">{dietPlanType === 'veg' ? 'Soya Chunks Curry, Roti & Curd' : 'Grilled Fish or Chicken with Veggies'}</p>
                      <p className="text-neutral-400 text-[11px]">
                        ~{Math.round(activeMember.macrosTarget.protein * 0.25)}g Protein • ~{Math.round(activeMember.dailyCaloriesTarget * 0.25)} kcal
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 4. HEALTH CALCULATORS VIEW                                */}
            {/* ========================================================= */}
            {memberSubTab === 'calculators' && (
              <div className="space-y-8">
                {/* 1. BMI CALCULATOR */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#121319] border border-neutral-800 space-y-5">
                  <div className="border-b border-neutral-800 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white text-lg flex items-center gap-2">
                        <Scale className="w-5 h-5 text-orange-500" /> Body Mass Index (BMI) Clinical Calculator
                      </h3>
                      <p className="text-xs text-neutral-400">Evaluates weight status relative to height.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Height (cm)</label>
                      <input
                        type="number"
                        value={calcBmiInput.height}
                        onChange={(e) => setCalcBmiInput({ ...calcBmiInput, height: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={calcBmiInput.weight}
                        onChange={(e) => setCalcBmiInput({ ...calcBmiInput, weight: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-neutral-400">Calculated BMI Score:</span>
                      <p className="text-3xl font-black text-white mt-0.5">
                        {computedBmi.bmi} <span className={`text-base font-bold ${computedBmi.color}`}>({computedBmi.category})</span>
                      </p>
                    </div>
                    <div className="text-xs text-neutral-400">
                      <span className="font-bold text-white block">Healthy Weight Range for {calcBmiInput.height}cm:</span>
                      <span>{computedBmi.minWeight} kg – {computedBmi.maxWeight} kg</span>
                    </div>
                  </div>
                </div>

                {/* 2. TDEE & CALORIE CALCULATOR */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#121319] border border-neutral-800 space-y-5">
                  <div className="border-b border-neutral-800 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white text-lg flex items-center gap-2">
                        <Flame className="w-5 h-5 text-orange-500" /> TDEE & Daily Caloric Requirement Calculator
                      </h3>
                      <p className="text-xs text-neutral-400">Uses the Mifflin-St Jeor equation calibrated for lifting frequencies.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Gender</label>
                      <select
                        value={calcTdeeInput.gender}
                        onChange={(e) => setCalcTdeeInput({ ...calcTdeeInput, gender: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Age</label>
                      <input
                        type="number"
                        value={calcTdeeInput.age}
                        onChange={(e) => setCalcTdeeInput({ ...calcTdeeInput, age: Number(e.target.value) })}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Height (cm)</label>
                      <input
                        type="number"
                        value={calcTdeeInput.height}
                        onChange={(e) => setCalcTdeeInput({ ...calcTdeeInput, height: Number(e.target.value) })}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={calcTdeeInput.weight}
                        onChange={(e) => setCalcTdeeInput({ ...calcTdeeInput, weight: Number(e.target.value) })}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Activity Level</label>
                      <select
                        value={calcTdeeInput.activity}
                        onChange={(e) => setCalcTdeeInput({ ...calcTdeeInput, activity: Number(e.target.value) })}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                      >
                        <option value={1.375}>Light (1-2 gym days/wk)</option>
                        <option value={1.55}>Moderate (3-5 gym days/wk)</option>
                        <option value={1.725}>Intense (6 days/wk heavy lifting)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Fitness Target</label>
                      <select
                        value={calcTdeeInput.goal}
                        onChange={(e) => setCalcTdeeInput({ ...calcTdeeInput, goal: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                      >
                        <option value="bulk">Muscle Hypertrophy / Bulk (+400 kcal)</option>
                        <option value="cut">Fat Loss Deficit (-500 kcal)</option>
                        <option value="maintain">Body Recomposition / Maintenance (TDEE)</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400">Maintenance TDEE</span>
                        <p className="text-xl font-bold text-white mt-0.5">{computedTdee.tdee} kcal</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400">Target Calories</span>
                        <p className="text-xl font-bold text-orange-400 mt-0.5">{computedTdee.targetCalories} kcal</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400">Daily Protein</span>
                        <p className="text-xl font-bold text-emerald-400 mt-0.5">{computedTdee.proteinGrams}g</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400">Water Quota</span>
                        <p className="text-xl font-bold text-sky-400 mt-0.5">{computedTdee.waterTargetMl} ml</p>
                      </div>
                    </div>

                    <button
                      onClick={handleApplyCalcToProfile}
                      className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition"
                    >
                      Apply These Calculated Targets to My Active Profile
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 5. PROGRESS TRACKER VIEW                                  */}
            {/* ========================================================= */}
            {memberSubTab === 'progress' && (
              <div className="space-y-8">
                {/* 1. Morning Weigh-in Logger */}
                <div className="p-6 rounded-3xl bg-[#121319] border border-neutral-800 space-y-4">
                  <div className="border-b border-neutral-800 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white text-lg flex items-center gap-2">
                        <Scale className="w-5 h-5 text-orange-500" /> Body Weight Trend Log
                      </h3>
                      <p className="text-xs text-neutral-400">Log morning weigh-ins before breakfast for peak accuracy.</p>
                    </div>
                  </div>

                  <form onSubmit={handleLogWeight} className="flex gap-2">
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g. 74.8"
                      value={newWeightInput}
                      onChange={(e) => setNewWeightInput(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition"
                    >
                      Log Weigh-in
                    </button>
                  </form>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Historical Weigh-in Log
                    </span>
                    <div className="space-y-1.5">
                      {activeMember.weightHistory.map((rec, i) => (
                        <div key={i} className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
                          <span className="text-neutral-400">{rec.date}</span>
                          <span className="font-bold text-white">{rec.weight} kg</span>
                          <span className={`text-[11px] font-semibold ${rec.change.startsWith('+') ? 'text-orange-400' : 'text-emerald-400'}`}>
                            {rec.change}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Tape Measurements Tracker */}
                <div className="p-6 rounded-3xl bg-[#121319] border border-neutral-800 space-y-4">
                  <div className="border-b border-neutral-800 pb-3">
                    <h3 className="font-bold text-white text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-lime-400" /> Body Circumference Measurements
                    </h3>
                    <p className="text-xs text-neutral-400">Track chest, waist, and arms inches across training blocks.</p>
                  </div>

                  <form onSubmit={handleLogMeasurements} className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <input
                      type="number"
                      step="0.1"
                      placeholder={`Chest (current: ${activeMember.measurements.chest}")`}
                      value={measureInputs.chest}
                      onChange={(e) => setMeasureInputs({ ...measureInputs, chest: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                    />
                    <input
                      type="number"
                      step="0.1"
                      placeholder={`Waist (current: ${activeMember.measurements.waist}")`}
                      value={measureInputs.waist}
                      onChange={(e) => setMeasureInputs({ ...measureInputs, waist: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                    />
                    <input
                      type="number"
                      step="0.1"
                      placeholder={`Arms (current: ${activeMember.measurements.arms}")`}
                      value={measureInputs.arms}
                      onChange={(e) => setMeasureInputs({ ...measureInputs, arms: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                    />
                    <button
                      type="submit"
                      className="py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-lime-400 font-bold text-xs uppercase tracking-wider border border-neutral-700 transition"
                    >
                      Save Tape Log
                    </button>
                  </form>

                  <div className="grid grid-cols-3 gap-3 text-center pt-2">
                    <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                      <span className="text-[10px] uppercase font-bold text-neutral-400">Chest Circumference</span>
                      <p className="text-2xl font-black text-white mt-1">{activeMember.measurements.chest}"</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                      <span className="text-[10px] uppercase font-bold text-neutral-400">Waist Circumference</span>
                      <p className="text-2xl font-black text-white mt-1">{activeMember.measurements.waist}"</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                      <span className="text-[10px] uppercase font-bold text-neutral-400">Arm / Bicep Size</span>
                      <p className="text-2xl font-black text-white mt-1">{activeMember.measurements.arms}"</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 6. WATER & ACTIVITY VIEW                                  */}
            {/* ========================================================= */}
            {memberSubTab === 'water-activity' && (
              <div className="space-y-8">
                {/* 1. Water Hydration Station */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#121319] border border-neutral-800 space-y-5">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                        <Droplets className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white uppercase">Daily Water Hydration Tracker</h3>
                        <p className="text-xs text-neutral-400">Calibrated to 38ml/kg bodyweight + workout overhead</p>
                      </div>
                    </div>
                    <button
                      onClick={resetWater}
                      className="text-xs text-neutral-500 hover:text-neutral-300 transition"
                    >
                      Reset Daily Log
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-neutral-300">Hydration Progress</span>
                      <span className="text-sky-400">{activeMember.waterLoggedMl} / {activeMember.waterTargetMl} ml</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-neutral-900 overflow-hidden border border-neutral-800">
                      <div
                        className="h-full bg-gradient-to-r from-sky-600 to-cyan-400 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (activeMember.waterLoggedMl / activeMember.waterTargetMl) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[11px] text-neutral-500">
                      <span>{Math.max(0, activeMember.waterTargetMl - activeMember.waterLoggedMl)} ml remaining</span>
                      <span>{Math.round((activeMember.waterLoggedMl / activeMember.waterTargetMl) * 100)}% of quota</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <button
                      onClick={() => logWater(250)}
                      className="py-3 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-sky-500/40 text-center transition"
                    >
                      <span className="block text-xs font-bold text-white">+250 ml</span>
                      <span className="text-[10px] text-neutral-400">Standard Glass</span>
                    </button>
                    <button
                      onClick={() => logWater(500)}
                      className="py-3 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-sky-500/40 text-center transition"
                    >
                      <span className="block text-xs font-bold text-white">+500 ml</span>
                      <span className="text-[10px] text-neutral-400">Protein Shaker</span>
                    </button>
                    <button
                      onClick={() => logWater(1000)}
                      className="py-3 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-sky-500/40 text-center transition"
                    >
                      <span className="block text-xs font-bold text-white">+1,000 ml</span>
                      <span className="text-[10px] text-neutral-400">1L Gym Sipper</span>
                    </button>
                  </div>
                </div>

                {/* 2. Daily Steps & Non-Exercise Activity (NEAT) */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#121319] border border-neutral-800 space-y-5">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <Footprints className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white uppercase">Daily Step & Cardio Counter</h3>
                        <p className="text-xs text-neutral-400">Track daily NEAT activity and cardio endurance.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-neutral-300">Daily Steps</span>
                      <span className="text-emerald-400">{activeMember.stepsLogged.toLocaleString()} / {activeMember.stepsTarget.toLocaleString()} steps</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-neutral-900 overflow-hidden border border-neutral-800">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-lime-400 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (activeMember.stepsLogged / activeMember.stepsTarget) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[11px] text-neutral-500">
                      <span>Approx. {Math.round(activeMember.stepsLogged * 0.04)} kcal burned via walking</span>
                      <span>{Math.round((activeMember.stepsLogged / activeMember.stepsTarget) * 100)}% achieved</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => logSteps(1000)}
                      className="flex-1 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-bold text-white transition"
                    >
                      +1,000 Steps (Walk)
                    </button>
                    <button
                      onClick={() => logSteps(2500)}
                      className="flex-1 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-bold text-white transition"
                    >
                      +2,500 Steps (Treadmill Run)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: ADMIN CONSOLE */}
        {currentTab === 'admin' && (
          <div className="py-6 sm:py-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
            {/* Admin Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4 sm:pb-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-lime-400">Lingasugur Branch Operations</span>
                <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">Owner & Gym Console</h1>
                <p className="text-xs text-neutral-400 mt-1">Subscriptions, trainer floor schedules, revenue analytics, and CRM leads.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddMemberModal(true)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow transition"
                >
                  <UserPlus className="w-4 h-4" /> Add New Member
                </button>
              </div>
            </div>

            {/* Live KPI Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              <div className="p-4 sm:p-6 rounded-2xl bg-[#121319] border border-neutral-800">
                <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase">Active Members</span>
                <p className="text-2xl sm:text-3xl font-black text-white mt-1">342</p>
                <span className="text-[10px] sm:text-[11px] text-emerald-400 font-semibold">+18 this month</span>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl bg-[#121319] border border-neutral-800">
                <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase">New Enquiries</span>
                <p className="text-2xl sm:text-3xl font-black text-orange-500 mt-1">24</p>
                <span className="text-[10px] sm:text-[11px] text-emerald-400 font-semibold">+6 consultations</span>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl bg-[#121319] border border-neutral-800">
                <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase">Revenue (Demo)</span>
                <p className="text-2xl sm:text-3xl font-black text-lime-400 mt-1">₹3,48,500</p>
                <span className="text-[10px] sm:text-[11px] text-neutral-400">GST Billing</span>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl bg-[#121319] border border-neutral-800">
                <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase">Expiring Plans</span>
                <p className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">7</p>
                <span className="text-[10px] sm:text-[11px] text-amber-400/90 font-semibold">Alerts sent</span>
              </div>
            </div>

            {/* Member Directory Table */}
            <div className="rounded-3xl bg-[#121319] border border-neutral-800 overflow-hidden shadow-xl">
              <div className="p-6 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase">Member Subscription Directory</h3>
                  <p className="text-xs text-neutral-400">Manage memberships, renew plans, and generate downloadable tax receipts.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">{membersList.length} registered lifters</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-neutral-900/80 text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                    <tr>
                      <th className="py-3.5 px-6">Member ID / Name</th>
                      <th className="py-3.5 px-6">Phone</th>
                      <th className="py-3.5 px-6">Subscribed Plan</th>
                      <th className="py-3.5 px-6">Expiry</th>
                      <th className="py-3.5 px-6">Status</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {membersList.map((m) => (
                      <tr key={m.id} className="hover:bg-neutral-800/30 transition">
                        <td className="py-4 px-6">
                          <p className="font-bold text-white">{m.name}</p>
                          <span className="text-[10px] text-neutral-500 font-mono">{m.id}</span>
                        </td>
                        <td className="py-4 px-6">{m.phone}</td>
                        <td className="py-4 px-6 font-medium text-neutral-200">{m.plan}</td>
                        <td className="py-4 px-6">{m.expiry}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            m.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {m.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => setShowReceiptModal(m)}
                            className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-[11px]"
                          >
                            Receipt
                          </button>
                          {m.status === 'Expired' && (
                            <button
                              onClick={() => handleRenewMember(m.id)}
                              className="px-2.5 py-1 rounded bg-orange-500 hover:bg-orange-600 text-white font-bold text-[11px]"
                            >
                              Renew Plan
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Trainer Floor Roster & CRM */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 rounded-3xl p-6 bg-[#121319] border border-neutral-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-400" /> Trainer Floor Roster & Schedules
                  </h4>
                  <span className="text-xs text-neutral-400">3 Coaches On-Duty</span>
                </div>

                <div className="space-y-3">
                  {TRAINERS.map((coach) => (
                    <div key={coach.id} className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-white">{coach.name}</p>
                        <p className="text-[10px] text-neutral-400">{coach.role} • {coach.availability}</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        Assigned
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/${GYM_INFO.whatsapp}?text=Admin%20Floor%20Roster%20Update`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-orange-400 text-xs font-bold flex items-center justify-center gap-2 border border-neutral-700 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Broadcast Floor Update
                </a>
              </div>

              {/* Front Desk Enquiry Submissions CRM */}
              <div className="lg:col-span-6 rounded-3xl p-6 bg-[#121319] border border-neutral-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Phone className="w-4 h-4 text-lime-400" /> Prospective Member Enquiries (CRM)
                  </h4>
                  <span className="text-xs text-neutral-400">Lingasugur Leads</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">Anand Kumar (KSRTC Road)</p>
                      <p className="text-[10px] text-neutral-400">Interested in 3-Month Transformation + Personal Training</p>
                    </div>
                    <a
                      href={`https://wa.me/919448088219?text=Hello%20Anand,%20calling%20from%20Indian%20Fitness%20Gym%20Lingasugur%20regarding%20your%20membership%20enquiry.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px]"
                    >
                      WhatsApp
                    </a>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">Mallikarjun G. (Mudgal Cross)</p>
                      <p className="text-[10px] text-neutral-400">Interested in Early Morning 5:30 AM Batches</p>
                    </div>
                    <a
                      href={`https://wa.me/919448088219?text=Hello%20Mallikarjun,%20calling%20from%20Indian%20Fitness%20Gym%20Lingasugur.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px]"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* 4. MODALS (ENROLLMENT WITH BIO-METRICS, RECEIPT, RECALIBRATE)  */}
      {/* ============================================================== */}
      {/* 4. MODALS (ENROLLMENT WITH BIO-METRICS, QR, RECEIPT)           */}
      {/* ============================================================== */}

      {/* A. PLAN ENROLLMENT & BIO-METRIC ONBOARDING MODAL */}
      {selectedPlanForModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#121319] border border-neutral-700 rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-2xl my-auto max-h-[92vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedPlanForModal(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                New Member Registration & Bio-Metric Onboarding
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Join with {selectedPlanForModal.title}
              </h3>
              <p className="text-xs text-neutral-400">
                Demo Price: ₹{selectedPlanForModal.price.toLocaleString()} for {selectedPlanForModal.duration}
              </p>
            </div>

            {/* Inputs: Bio-metrics */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Suresh Pujari"
                    value={onboardData.name}
                    onChange={(e) => setOnboardData({ ...onboardData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+91 9XXXX XXXXX"
                    value={onboardData.phone}
                    onChange={(e) => setOnboardData({ ...onboardData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">Gender</label>
                  <select
                    value={onboardData.gender}
                    onChange={(e) => setOnboardData({ ...onboardData, gender: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">Age</label>
                  <input
                    type="number"
                    value={onboardData.age}
                    onChange={(e) => setOnboardData({ ...onboardData, age: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={onboardData.height}
                    onChange={(e) => setOnboardData({ ...onboardData, height: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={onboardData.weight}
                    onChange={(e) => setOnboardData({ ...onboardData, weight: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">Fitness Objective</label>
                  <select
                    value={onboardData.goal}
                    onChange={(e) => setOnboardData({ ...onboardData, goal: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                  >
                    <option value="bulk">Muscle Hypertrophy / Bulking (+400 kcal)</option>
                    <option value="cut">Fat Loss & Caloric Deficit (-500 kcal)</option>
                    <option value="maintain">Body Recomposition / Maintenance (TDEE)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">Training Frequency</label>
                  <select
                    value={onboardData.activity}
                    onChange={(e) => setOnboardData({ ...onboardData, activity: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                  >
                    <option value={1.375}>Light (1-2 gym sessions/week)</option>
                    <option value={1.55}>Moderate (3-5 sessions/week)</option>
                    <option value={1.725}>Intense Lifter (6 days/week)</option>
                  </select>
                </div>
              </div>

              {/* Automatic Calculation Preview */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-[10px] font-bold text-lime-400 uppercase tracking-wider block">
                  ⚡ Automatic Bio-Metric Calculation Preview
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded bg-neutral-900">
                    <span className="text-[10px] text-neutral-400">BMI</span>
                    <p className="font-bold text-white">{liveCalculations.bmi}</p>
                  </div>
                  <div className="p-2 rounded bg-neutral-900">
                    <span className="text-[10px] text-neutral-400">Target Calories</span>
                    <p className="font-bold text-orange-400">{liveCalculations.targetCalories} kcal</p>
                  </div>
                  <div className="p-2 rounded bg-neutral-900">
                    <span className="text-[10px] text-neutral-400">Daily Protein</span>
                    <p className="font-bold text-emerald-400">{liveCalculations.proteinGrams}g</p>
                  </div>
                  <div className="p-2 rounded bg-neutral-900">
                    <span className="text-[10px] text-neutral-400">Water Target</span>
                    <p className="font-bold text-sky-400">{liveCalculations.waterTargetMl} ml</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  const newMember = {
                    ...activeMember,
                    name: onboardData.name || "Demo Lifter",
                    phone: onboardData.phone || "+91 94480 00000",
                    gender: onboardData.gender,
                    age: onboardData.age,
                    height: onboardData.height,
                    weight: onboardData.weight,
                    goal: onboardData.goal,
                    activityLevel: onboardData.activity,
                    plan: selectedPlanForModal.title,
                    dailyCaloriesTarget: liveCalculations.targetCalories,
                    caloriesLogged: 0,
                    waterTargetMl: liveCalculations.waterTargetMl,
                    waterLoggedMl: 0,
                    macrosTarget: {
                      protein: liveCalculations.proteinGrams,
                      carbs: liveCalculations.carbGrams,
                      fats: liveCalculations.fatGrams
                    },
                    macrosLogged: { protein: 0, carbs: 0, fats: 0 }
                  };
                  setActiveMember(newMember);
                  setDashboardBio({
                    weight: onboardData.weight,
                    height: onboardData.height,
                    age: onboardData.age,
                    gender: onboardData.gender,
                    goal: onboardData.goal,
                    activity: onboardData.activity
                  });
                  setCalcBmiInput({ height: onboardData.height, weight: onboardData.weight });
                  setCalcTdeeInput({
                    gender: onboardData.gender,
                    age: onboardData.age,
                    height: onboardData.height,
                    weight: onboardData.weight,
                    activity: onboardData.activity,
                    goal: onboardData.goal
                  });
                  setSelectedPlanForModal(null);
                  setCurrentRole('member');
                  setCurrentTab('member-portal');
                  showToast(`Welcome ${newMember.name}! All your tabs have been automatically calibrated.`);
                }}
                className="w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition active:scale-95"
              >
                Complete Enrollment & Launch Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* B. TAX INVOICE & RECEIPT MODAL */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#121319] border border-neutral-700 rounded-2xl sm:rounded-3xl max-w-md w-full p-5 sm:p-7 space-y-5 sm:space-y-6 shadow-2xl relative text-left max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setShowReceiptModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-neutral-800 pb-4 space-y-1">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                Official Tax Invoice / Receipt
              </span>
              <h3 className="text-xl font-black text-white">INDIAN FITNESS GYM</h3>
              <p className="text-[11px] text-neutral-400">{GYM_INFO.address}</p>
              <p className="text-[10px] text-neutral-500 font-mono">GSTIN: 29AABCU9603R1ZM</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Billed To:</span>
                <span className="font-bold text-white">{showReceiptModal.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Member ID:</span>
                <span className="font-mono text-neutral-300">{showReceiptModal.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Subscribed Package:</span>
                <span className="font-bold text-neutral-200">{showReceiptModal.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Valid Until:</span>
                <span className="font-bold text-emerald-400">{showReceiptModal.expiry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Payment Mode:</span>
                <span className="text-neutral-300">UPI / Cash / Card (Success)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex justify-between items-center text-sm font-bold">
              <span className="text-neutral-300">Total Paid (Inclusive of GST):</span>
              <span className="text-xl font-black text-orange-500">₹11,999</span>
            </div>

            <button
              onClick={() => {
                showToast("Receipt downloaded successfully!");
                setShowReceiptModal(null);
              }}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition"
            >
              Download PDF Receipt
            </button>
          </div>
        </div>
      )}

      {/* C. ADD NEW MEMBER MODAL (ADMIN) */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#121319] border border-neutral-700 rounded-2xl sm:rounded-3xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setShowAddMemberModal(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-lime-400 uppercase tracking-widest">Admin Desk</span>
              <h3 className="text-xl font-black text-white mt-1">Register New Gym Member</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Anand Gowda"
                  id="adminNewName"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Mobile</label>
                <input
                  type="tel"
                  placeholder="+91 9XXXX XXXXX"
                  id="adminNewPhone"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Select Plan</label>
                <select
                  id="adminNewPlan"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                >
                  <option>Annual Elite Pro</option>
                  <option>6-Month Hypertrophy</option>
                  <option>3-Month Transformation</option>
                  <option>1-Month Foundation</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                const nameInput = document.getElementById('adminNewName')?.value || "New Lifter";
                const phoneInput = document.getElementById('adminNewPhone')?.value || "+91 98860 00000";
                const planInput = document.getElementById('adminNewPlan')?.value || "3-Month Transformation";

                const newEntry = {
                  id: `IFG-2026-${Math.floor(100 + Math.random() * 900)}`,
                  name: nameInput,
                  phone: phoneInput,
                  plan: planInput,
                  status: "Active",
                  expiry: "30 Apr 2027",
                  weight: 70,
                  gender: "Male",
                  trainer: "Coach Vikram"
                };

                setMembersList([newEntry, ...membersList]);
                setShowAddMemberModal(false);
                showToast(`New member ${nameInput} registered successfully!`);
              }}
              className="w-full py-3 rounded-xl bg-lime-500 hover:bg-lime-400 text-black font-extrabold text-xs uppercase tracking-wider transition"
            >
              Confirm Registration
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. FOOTER                                                      */}
      {/* ============================================================== */}
      <footer className="bg-[#070709] border-t border-neutral-800 text-neutral-400 text-xs py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-orange-500" />
                <span className="font-black text-white text-base">INDIAN FITNESS GYM</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Lingasugur's elite performance center. Dedicated to compound strength, muscle hypertrophy, and sustainable fitness lifestyles.
              </p>
              <p className="text-[11px] text-orange-400/90 font-medium">
                ⚡ Uninterrupted training with 100% full power backup.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Quick Navigation</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setCurrentTab('home')} className="hover:text-orange-400 transition">Home & Overview</button></li>
                <li><button onClick={() => setCurrentTab('facilities')} className="hover:text-orange-400 transition">Facility Zones</button></li>
                <li><button onClick={() => setCurrentTab('plans')} className="hover:text-orange-400 transition">Plans & Pricing</button></li>
                <li><button onClick={() => setCurrentTab('trainers')} className="hover:text-orange-400 transition">Certified Coaches</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Client Portals</h4>
              <ul className="space-y-2">
                <li><button onClick={() => { setCurrentTab('member-portal'); setCurrentRole('member'); }} className="hover:text-orange-400 transition">Member Dashboard</button></li>
                <li><button onClick={() => { setCurrentTab('admin'); setCurrentRole('admin'); }} className="hover:text-lime-400 transition">Owner & Admin Dashboard</button></li>
                <li><button onClick={() => setSelectedPlanForModal(MEMBERSHIP_PLANS[0])} className="hover:text-orange-400 transition">Student Special Discounts</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Front Desk Contact</h4>
              <p className="text-xs text-neutral-300">{GYM_INFO.address}</p>
              <p className="text-xs text-neutral-300">Phone: {GYM_INFO.phone}</p>
              <p className="text-xs text-neutral-300">Hours: 5:00 AM – 10:00 PM</p>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <p>© {new Date().getFullYear()} INDIAN FITNESS GYM • Lingasugur, Karnataka. All rights reserved.</p>
            <p>Designed for Athletic Excellence & High Performance.</p>
          </div>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* 6. TOAST NOTIFICATION CONTAINER                                */}
      {/* ============================================================== */}
      {toast.show && (
        <aside
          aria-live="polite"
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-neutral-900 border border-neutral-700 text-white text-xs shadow-2xl transition"
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="font-medium text-[11px] sm:text-xs">{toast.message}</span>
        </aside>
      )}
    </div>
  );
}