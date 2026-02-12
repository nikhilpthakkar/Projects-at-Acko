import React, { useState, useMemo, useCallback } from 'react';
import { ChevronRight, ChevronDown, ChevronLeft, AlertCircle, Upload, Play, Download, Eye, List, GitBranch, FileText, Settings, Users, CreditCard, Shield, Heart, CheckCircle2, Circle, ArrowRight, ArrowLeft, Info, Search, Smartphone, Layers, Zap, X, AlertTriangle, Loader2, ToggleLeft, ToggleRight, Tag, Hash, Wallet, Star, Target, Clock, Phone, Monitor, ChevronUp } from 'lucide-react';

// ============================================================================
// ACKO DESIGN SYSTEM CSS + MOBILE SIMULATOR CSS
// ============================================================================
const ackoStyles = `
  @font-face {
    font-family: 'Euclid Circular B';
    src: url('https://pub-c050457d48794d5bb9ffc2b4649de2c1.r2.dev/Euclid%20Font/EuclidCircularB-Regular.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Euclid Circular B';
    src: url('https://pub-c050457d48794d5bb9ffc2b4649de2c1.r2.dev/Euclid%20Font/EuclidCircularB-Medium.otf') format('opentype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Euclid Circular B';
    src: url('https://pub-c050457d48794d5bb9ffc2b4649de2c1.r2.dev/Euclid%20Font/EuclidCircularB-Semibold.otf') format('opentype');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Euclid Circular B';
    src: url('https://pub-c050457d48794d5bb9ffc2b4649de2c1.r2.dev/Euclid%20Font/EuclidCircularB-Bold.otf') format('opentype');
    font-weight: 700;
    font-style: normal;
  }

  :root {
    --purple-800: #18084A;
    --purple-700: #2E1773;
    --purple-600: #4E29BB;
    --purple-500: #926FF3;
    --purple-400: #B59CF5;
    --purple-300: #D1C5FA;
    --purple-200: #ECEBFF;
    --purple-100: #F8F7FD;
    --onyx-800: #0A0A0A;
    --onyx-700: #121212;
    --onyx-600: #2F2F2F;
    --onyx-500: #5D5D5D;
    --onyx-400: #B0B0B0;
    --onyx-300: #E7E7E7;
    --onyx-200: #F6F6F6;
    --onyx-100: #FFFFFF;
    --green-700: #1C772C;
    --green-600: #149A40;
    --green-500: #55B94D;
    --green-200: #DAFAD7;
    --green-100: #F3FFF2;
    --orange-700: #B15A08;
    --orange-500: #F4A024;
    --orange-200: #FFEDC5;
    --orange-100: #FFF8E7;
    --cerise-700: #981950;
    --cerise-500: #EC5FAB;
    --cerise-200: #FCE7F4;
    --blue-700: #006A97;
    --blue-500: #1EB7E7;
    --blue-200: #DEF7FF;
    --shadow-sm: 0 1px 2px rgba(10, 10, 10, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(10, 10, 10, 0.07), 0 2px 4px -2px rgba(10, 10, 10, 0.05);
    --shadow-lg: 0 10px 15px -3px rgba(10, 10, 10, 0.08), 0 4px 6px -4px rgba(10, 10, 10, 0.05);
  }

  body {
    font-family: 'Euclid Circular B', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
    background-color: var(--onyx-200);
    color: var(--onyx-800);
  }

  .acko-card {
    background: white;
    border: 1px solid var(--onyx-300);
    border-radius: 12px;
    transition: box-shadow 0.2s ease;
  }
  
  .acko-card:hover {
    box-shadow: var(--shadow-md);
  }

  .acko-btn {
    height: 40px;
    border-radius: 8px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    cursor: pointer;
  }

  .acko-input {
    height: 48px;
    border-radius: 8px;
    border: 1px solid var(--onyx-300);
    padding: 0 16px;
    width: 100%;
  }

  .acko-input:focus {
    outline: none;
    border-color: var(--purple-600);
    box-shadow: 0 0 0 2px var(--purple-200);
  }
`;

// ============================================================================
// POLICY COMBINATIONS DATA (All 52 validated combinations)
// ============================================================================
const POLICY_COMBINATIONS = {
  V01: { construct: 'VANILLA', base: 'fixed', topUp: null, secondary: null, secTopUp: null, addOns: null, basePay: 'employer', topUpPay: null, secPay: null, addOnPay: null, minPart: false, preEnroll: false, cdCheck: false, gradeBased: false, name: 'Base only (employer-paid)' },
  V02: { construct: 'VANILLA', base: 'fixed', topUp: 'standard', secondary: null, secTopUp: null, addOns: null, basePay: 'employer', topUpPay: 'employer', secPay: null, addOnPay: null, minPart: false, preEnroll: false, cdCheck: false, gradeBased: false, name: 'Base + Top-up (all employer)' },
  V03: { construct: 'VANILLA', base: 'fixed', topUp: 'standard', secondary: null, secTopUp: null, addOns: null, basePay: 'employer', topUpPay: 'employee', secPay: null, addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Base + Top-up (employee-paid)' },
  V04: { construct: 'VANILLA', base: 'fixed', topUp: null, secondary: 'single', secTopUp: null, addOns: null, basePay: 'employer', topUpPay: null, secPay: 'employer', addOnPay: null, minPart: false, preEnroll: false, cdCheck: false, gradeBased: false, name: 'Base + Secondary (employer)' },
  V05: { construct: 'VANILLA', base: 'fixed', topUp: null, secondary: 'single', secTopUp: null, addOns: null, basePay: 'employer', topUpPay: null, secPay: 'employee', addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Base + Secondary (employee)' },
  V06: { construct: 'VANILLA', base: 'fixed', topUp: 'standard', secondary: 'single', secTopUp: null, addOns: null, basePay: 'employer', topUpPay: 'employee', secPay: 'employee', addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Full voluntary enhancements' },
  V07: { construct: 'VANILLA', base: 'fixed', topUp: 'standard', secondary: 'single', secTopUp: 'standard', addOns: null, basePay: 'employer', topUpPay: 'employee', secPay: 'employee', addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'With secondary top-ups' },
  V08: { construct: 'VANILLA', base: 'fixed', topUp: null, secondary: null, secTopUp: null, addOns: 'available', basePay: 'employer', topUpPay: null, secPay: null, addOnPay: 'employer', minPart: false, preEnroll: false, cdCheck: false, gradeBased: false, name: 'Base + Add-ons (employer)' },
  V09: { construct: 'VANILLA', base: 'fixed', topUp: null, secondary: null, secTopUp: null, addOns: 'available', basePay: 'employer', topUpPay: null, secPay: null, addOnPay: 'employee', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Base + Add-ons (employee)' },
  V10: { construct: 'VANILLA', base: 'fixed', topUp: 'standard', secondary: null, secTopUp: null, addOns: 'available', basePay: 'employer', topUpPay: 'employee', secPay: null, addOnPay: 'employee', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Top-up + Add-ons' },
  V11: { construct: 'VANILLA', base: 'fixed', topUp: 'standard', secondary: 'single', secTopUp: null, addOns: 'available', basePay: 'employer', topUpPay: 'employee', secPay: 'employee', addOnPay: 'employee', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Full voluntary stack' },
  V12: { construct: 'VANILLA', base: 'fixed', topUp: 'standard', secondary: 'single', secTopUp: 'standard', addOns: 'available', basePay: 'employer', topUpPay: 'employee', secPay: 'employee', addOnPay: 'employee', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Maximum configuration' },
  V13: { construct: 'VANILLA', base: 'fixed', topUp: 'consolidated', secondary: 'single', secTopUp: null, addOns: null, basePay: 'employer', topUpPay: 'employee', secPay: 'employee', addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Consolidated top-up' },
  V14: { construct: 'VANILLA', base: 'fixed', topUp: 'consolidated', secondary: 'single', secTopUp: null, addOns: 'available', basePay: 'employer', topUpPay: 'employee', secPay: 'employee', addOnPay: 'employee', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Consolidated + add-ons' },
  V15: { construct: 'VANILLA', base: 'fixed', topUp: 'standard', secondary: null, secTopUp: null, addOns: null, basePay: 'partial', topUpPay: 'employee', secPay: null, addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Partial base payment' },
  V16: { construct: 'VANILLA', base: 'fixed', topUp: 'standard', secondary: 'single', secTopUp: null, addOns: null, basePay: 'employer', topUpPay: 'employer', secPay: 'employer', addOnPay: null, minPart: false, preEnroll: false, cdCheck: false, gradeBased: false, name: 'All employer-paid' },
  V17: { construct: 'VANILLA', base: 'fixed', topUp: null, secondary: 'multi', secTopUp: null, addOns: null, basePay: 'employer', topUpPay: null, secPay: 'employee', addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Multiple secondary options' },
  V18: { construct: 'VANILLA', base: 'fixed', topUp: null, secondary: 'si-variants', secTopUp: null, addOns: null, basePay: 'employer', topUpPay: null, secPay: 'employee', addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Secondary SI variants' },
  V19: { construct: 'VANILLA', base: 'fixed', topUp: 'standard', secondary: null, secTopUp: null, addOns: 'available', basePay: 'employer', topUpPay: 'partial', secPay: null, addOnPay: 'partial', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Subsidized options' },
  V20: { construct: 'VANILLA', base: 'fixed', topUp: null, secondary: null, secTopUp: null, addOns: null, basePay: 'employer', topUpPay: null, secPay: null, addOnPay: null, minPart: true, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Min participation' },
  V21: { construct: 'VANILLA', base: 'fixed', topUp: 'standard', secondary: 'single', secTopUp: 'standard', addOns: 'available', basePay: 'employer', topUpPay: 'employee', secPay: 'employee', addOnPay: 'employee', minPart: true, preEnroll: true, cdCheck: true, gradeBased: true, name: 'Pre-enrollment full config' },
  
  M01: { construct: 'MODULAR', base: 'tiered', topUp: null, secondary: null, secTopUp: null, addOns: null, basePay: 'employer', topUpPay: null, secPay: null, addOnPay: null, minPart: false, preEnroll: false, cdCheck: false, gradeBased: false, name: 'View tiers only' },
  M02: { construct: 'MODULAR', base: 'tiered', topUp: 'modular', secondary: null, secTopUp: null, addOns: null, basePay: 'employer', topUpPay: 'employee', secPay: null, addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Tier upgrade' },
  M03: { construct: 'MODULAR', base: 'tiered', topUp: 'modular', secondary: null, secTopUp: null, addOns: 'available', basePay: 'employer', topUpPay: 'employee', secPay: null, addOnPay: 'employee', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Tier + Add-ons' },
  M04: { construct: 'MODULAR', base: 'tiered', topUp: 'modular', secondary: 'single', secTopUp: null, addOns: null, basePay: 'employer', topUpPay: 'employee', secPay: 'employee', addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Tier + Secondary' },
  M05: { construct: 'MODULAR', base: 'tiered', topUp: 'modular', secondary: 'single', secTopUp: null, addOns: 'available', basePay: 'employer', topUpPay: 'employee', secPay: 'employee', addOnPay: 'employee', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Full modular' },
  M06: { construct: 'MODULAR', base: 'tiered', topUp: 'modular', secondary: 'single', secTopUp: 'standard', addOns: 'available', basePay: 'employer', topUpPay: 'employee', secPay: 'employee', addOnPay: 'employee', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Maximum modular' },
  M07: { construct: 'MODULAR', base: 'tiered', topUp: null, secondary: null, secTopUp: null, addOns: 'available', basePay: 'employer', topUpPay: null, secPay: null, addOnPay: 'employee', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Tier + Add-ons only' },
  M08: { construct: 'MODULAR', base: 'tiered', topUp: 'modular', secondary: null, secTopUp: null, addOns: null, basePay: 'partial', topUpPay: 'employee', secPay: null, addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Partial employer' },
  M09: { construct: 'MODULAR', base: 'tiered', topUp: 'modular', secondary: null, secTopUp: null, addOns: null, basePay: 'employer', topUpPay: 'employee', secPay: null, addOnPay: null, minPart: true, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Min participation' },
  M10: { construct: 'MODULAR', base: 'tiered', topUp: 'modular', secondary: 'single', secTopUp: null, addOns: 'available', basePay: 'employer', topUpPay: 'employee', secPay: 'employee', addOnPay: 'employee', minPart: true, preEnroll: true, cdCheck: true, gradeBased: true, name: 'Pre-enrollment modular' },
  M11: { construct: 'MODULAR', base: 'tiered-grade', topUp: 'modular', secondary: null, secTopUp: null, addOns: null, basePay: 'employer', topUpPay: 'employee', secPay: null, addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: true, name: 'Grade-based tiers' },
  
  F01: { construct: 'FLEX', base: 'wallet', topUp: null, secondary: null, secTopUp: null, addOns: null, basePay: 'wallet', topUpPay: null, secPay: null, addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Basic wallet' },
  F02: { construct: 'FLEX', base: 'wallet', topUp: null, secondary: null, secTopUp: null, addOns: 'available', basePay: 'wallet', topUpPay: null, secPay: null, addOnPay: 'wallet', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Wallet + Add-ons' },
  F03: { construct: 'FLEX', base: 'wallet-si', topUp: null, secondary: null, secTopUp: null, addOns: null, basePay: 'wallet', topUpPay: null, secPay: null, addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'SI selection' },
  F04: { construct: 'FLEX', base: 'wallet-family', topUp: null, secondary: null, secTopUp: null, addOns: null, basePay: 'wallet', topUpPay: null, secPay: null, addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Family definition' },
  F05: { construct: 'FLEX', base: 'wallet-si-family', topUp: null, secondary: null, secTopUp: null, addOns: null, basePay: 'wallet', topUpPay: null, secPay: null, addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'SI + Family config' },
  F06: { construct: 'FLEX', base: 'wallet', topUp: 'standard', secondary: null, secTopUp: null, addOns: null, basePay: 'wallet', topUpPay: 'wallet-employee', secPay: null, addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Wallet + Top-up' },
  F07: { construct: 'FLEX', base: 'wallet', topUp: null, secondary: 'single', secTopUp: null, addOns: null, basePay: 'wallet', topUpPay: null, secPay: 'wallet-employee', addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Wallet + Secondary' },
  F08: { construct: 'FLEX', base: 'wallet', topUp: 'standard', secondary: 'single', secTopUp: null, addOns: null, basePay: 'wallet', topUpPay: 'wallet-employee', secPay: 'wallet-employee', addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Wallet + Both' },
  F09: { construct: 'FLEX', base: 'wallet', topUp: 'standard', secondary: 'single', secTopUp: null, addOns: 'available', basePay: 'wallet', topUpPay: 'wallet-employee', secPay: 'wallet-employee', addOnPay: 'wallet-employee', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Full flex' },
  F10: { construct: 'FLEX', base: 'wallet', topUp: 'standard', secondary: 'single', secTopUp: 'standard', addOns: 'available', basePay: 'wallet', topUpPay: 'wallet-employee', secPay: 'wallet-employee', addOnPay: 'wallet-employee', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Maximum flex' },
  F11: { construct: 'FLEX', base: 'wallet-custom', topUp: null, secondary: null, secTopUp: null, addOns: 'available', basePay: 'wallet', topUpPay: null, secPay: null, addOnPay: 'wallet', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Custom wallet' },
  F12: { construct: 'FLEX', base: 'wallet-upgrade', topUp: null, secondary: null, secTopUp: null, addOns: null, basePay: 'wallet-employee', topUpPay: null, secPay: null, addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Upgrade beyond wallet' },
  F13: { construct: 'FLEX', base: 'wallet-downgrade', topUp: null, secondary: null, secTopUp: null, addOns: 'available', basePay: 'wallet', topUpPay: null, secPay: null, addOnPay: 'wallet', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Downgrade + realloc' },
  F14: { construct: 'FLEX', base: 'wallet-covers', topUp: null, secondary: null, secTopUp: null, addOns: null, basePay: 'wallet', topUpPay: null, secPay: null, addOnPay: null, minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Cover variants' },
  F15: { construct: 'FLEX', base: 'wallet', topUp: null, secondary: 'multi', secTopUp: null, addOns: 'available', basePay: 'wallet', topUpPay: null, secPay: 'wallet-employee', addOnPay: 'wallet-employee', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Multi secondary' },
  F16: { construct: 'FLEX', base: 'wallet', topUp: 'consolidated', secondary: 'single', secTopUp: null, addOns: 'available', basePay: 'wallet', topUpPay: 'wallet-employee', secPay: 'wallet-employee', addOnPay: 'wallet-employee', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Consolidated' },
  F17: { construct: 'FLEX', base: 'wallet', topUp: null, secondary: null, secTopUp: null, addOns: 'available', basePay: 'wallet', topUpPay: null, secPay: null, addOnPay: 'wallet', minPart: true, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Min participation' },
  F18: { construct: 'FLEX', base: 'wallet', topUp: 'standard', secondary: 'single', secTopUp: null, addOns: 'available', basePay: 'wallet', topUpPay: 'wallet-employee', secPay: 'wallet-employee', addOnPay: 'wallet-employee', minPart: true, preEnroll: true, cdCheck: true, gradeBased: true, name: 'Pre-enrollment flex' },
  F19: { construct: 'FLEX', base: 'wallet-grade', topUp: null, secondary: null, secTopUp: null, addOns: 'available', basePay: 'wallet', topUpPay: null, secPay: null, addOnPay: 'wallet', minPart: false, preEnroll: false, cdCheck: true, gradeBased: true, name: 'Grade-based wallet' },
  F20: { construct: 'FLEX', base: 'wallet-wellness', topUp: null, secondary: null, secTopUp: null, addOns: 'wellness', basePay: 'wallet', topUpPay: null, secPay: null, addOnPay: 'wallet', minPart: false, preEnroll: false, cdCheck: true, gradeBased: false, name: 'Wellness wallet' },
};

// ============================================================================
// UI COMPONENTS REGISTRY
// ============================================================================
const UI_COMPONENTS = {
  C01: { id: 'C01', name: 'Progress Stepper', layer: 'ALL', priority: 'P0' },
  C02: { id: 'C02', name: 'Coverage Card', layer: 'L1,L3,L4', priority: 'P0' },
  C03: { id: 'C03', name: 'Plan Selector', layer: 'L3', priority: 'P0' },
  C04: { id: 'C04', name: 'Member Card', layer: 'L2,L6', priority: 'P0' },
  C05: { id: 'C05', name: 'Member Form', layer: 'L2', priority: 'P0' },
  C06: { id: 'C06', name: 'Premium Calculator', layer: 'L3,L4,L5', priority: 'P0' },
  C07: { id: 'C07', name: 'Add-on Card', layer: 'L4', priority: 'P1' },
  C08: { id: 'C08', name: 'Top-up Card', layer: 'L4', priority: 'P1' },
  C09: { id: 'C09', name: 'Secondary Plan Card', layer: 'L4', priority: 'P1' },
  C10: { id: 'C10', name: 'Wallet Display', layer: 'L1,L3,L4,L5', priority: 'P0-FLEX' },
  C11: { id: 'C11', name: 'Consent Checkbox', layer: 'L6', priority: 'P0' },
  C12: { id: 'C12', name: 'Review Summary', layer: 'L6', priority: 'P0' },
  C13: { id: 'C13', name: 'Success Screen', layer: 'POST', priority: 'P0' },
  C14: { id: 'C14', name: 'Tooltip/Info', layer: 'ALL', priority: 'P1' },
  C15: { id: 'C15', name: 'Error Message', layer: 'ALL', priority: 'P0' },
  C16: { id: 'C16', name: 'Loading State', layer: 'ALL', priority: 'P1' },
  C17: { id: 'C17', name: 'Comparison Table', layer: 'L3,L4', priority: 'P1' },
};

// ============================================================================
// LAYER METADATA
// ============================================================================
const LAYER_META = {
  L0: { name: 'Context & Welcome', shortName: 'Welcome', icon: 'Play', question: 'What am I about to do and how long will it take?', purpose: 'Set expectations, reduce anxiety, explain what\'s coming' },
  L1: { name: 'Base Coverage View', shortName: 'Coverage', icon: 'Shield', question: 'What protection do I already have?', purpose: 'Show what employer provides, build trust' },
  L2: { name: 'Family Configuration', shortName: 'Family', icon: 'Users', question: 'Who is covered and are details correct?', purpose: 'Capture/confirm family members' },
  L3: { name: 'Plan Selection', shortName: 'Plans', icon: 'Settings', question: 'What level of coverage do I want?', purpose: 'Choose/upgrade base plan configuration' },
  L4: { name: 'Enhancement Options', shortName: 'Enhance', icon: 'Heart', question: 'What additional protection do I want?', purpose: 'Offer top-ups, secondary plans, add-ons' },
  L5: { name: 'Premium & Payment', shortName: 'Payment', icon: 'CreditCard', question: 'How much will I pay and how?', purpose: 'Show total cost, payment breakdown' },
  L6: { name: 'Review & Consent', shortName: 'Review', icon: 'CheckCircle2', question: 'Is everything correct?', purpose: 'Final confirmation, legal consent' },
};

// ============================================================================
// LAYER ERROR STATES & EDGE CASES
// ============================================================================
const LAYER_ERRORS = {
  L0: [{ id: 'E-L0-01', error: 'Session expired', message: 'Your session has expired. Please refresh to continue.', severity: 'critical' }],
  L1: [{ id: 'E-L1-01', error: 'Policy data unavailable', message: 'Unable to load your coverage details. Please try again.', severity: 'critical' }],
  L2: [
    { id: 'E-L2-01', error: 'DOB required', message: 'Date of birth is required for all family members', severity: 'validation' },
    { id: 'E-L2-02', error: 'Relationship required', message: 'Please select the relationship for this member', severity: 'validation' },
    { id: 'E-L2-03', error: 'Max dependents reached', message: 'Maximum number of dependents has been reached', severity: 'warning' },
    { id: 'E-L2-04', error: 'Age limit exceeded', message: 'Parent age exceeds the coverage age limit (65 years)', severity: 'validation' },
  ],
  L3: [
    { id: 'E-L3-01', error: 'Plan selection required', message: 'Please select a plan tier to continue', severity: 'validation' },
    { id: 'E-L3-02', error: 'Wallet exceeded', message: 'Your selections exceed the wallet balance. Additional ₹X will be deducted from salary.', severity: 'warning' },
    { id: 'E-L3-03', error: 'Grade restriction', message: 'This plan tier is not available for your grade level', severity: 'blocking' },
  ],
  L4: [
    { id: 'E-L4-01', error: 'Eligibility failed', message: 'This add-on requires base SI of ₹7L or above', severity: 'blocking' },
    { id: 'E-L4-02', error: 'Dependent not eligible', message: 'Selected dependent is not eligible for secondary plan', severity: 'validation' },
    { id: 'E-L4-03', error: 'Premium calculation failed', message: 'Unable to calculate premium. Please try again.', severity: 'critical' },
  ],
  L5: [
    { id: 'E-L5-01', error: 'CD balance insufficient', message: 'Corporate deposit is insufficient. E-card generation may be delayed.', severity: 'warning' },
    { id: 'E-L5-02', error: 'Wallet overflow', message: 'Selections exceed wallet by ₹X. Consent for salary deduction required.', severity: 'warning' },
  ],
  L6: [
    { id: 'E-L6-01', error: 'Consent required', message: 'Please accept the terms and conditions to proceed', severity: 'validation' },
    { id: 'E-L6-02', error: 'Submission failed', message: 'Unable to submit enrollment. Please try again.', severity: 'critical' },
    { id: 'E-L6-03', error: 'Min participation pending', message: 'Enrollment recorded. E-card will be generated once minimum participation is met.', severity: 'info' },
  ],
};

const LAYER_EDGE_CASES = {
  L0: ['Exception plan employee → Skip to e-card display', 'Multiple packages → Show package selector first'],
  L1: ['Flex: Show wallet balance prominently', 'Grade-based: Show only eligible plan details'],
  L2: ['Flex: Family changes affect wallet allocation', 'Parent age > 65: Block with message', 'Mid-flow family change: Warn about impact on selections'],
  L3: ['Modular: Show price delta between tiers clearly', 'Flex: Wallet meter must update in real-time', 'Downgrade: Warn about reduced coverage'],
  L4: ['Add-on eligibility depends on base SI', 'Consolidated top-up spans base + secondary', 'Employee on exception plan: Skip enhancements'],
  L5: ['All employer-paid: Skip this layer entirely', 'Flex wallet overflow: Separate consent needed', 'Partial payment: Show employer subsidy clearly'],
  L6: ['Pre-enrollment: CTA says "Submit Preferences" not "Confirm"', 'Min participation: Show pending status warning', 'CD check: Warn about possible e-card delay'],
};

// ============================================================================
// FLOW ENGINE CORE LOGIC
// ============================================================================
const FlowEngine = {
  getLayerVisibility: (config) => {
    const layers = {
      L0: { show: true, type: 'view', reason: 'Always shown - Welcome & Context' },
      L1: { show: true, type: 'view', reason: 'Always shown - Base Coverage View' },
      L2: { show: true, type: 'conditional', reason: 'Family configuration' },
      L3: { show: false, type: 'skip', reason: 'Plan Selection - VANILLA skips' },
      L4: { show: false, type: 'skip', reason: 'Enhancement Options' },
      L5: { show: false, type: 'skip', reason: 'Premium & Payment' },
      L6: { show: true, type: 'decision', reason: 'Always shown - Review & Consent' },
    };
    
    if (config.construct === 'MODULAR' || config.construct === 'FLEX') {
      layers.L3.show = true;
      layers.L3.type = 'decision';
      layers.L3.reason = config.construct === 'MODULAR' 
        ? 'Tier selection available' 
        : 'Wallet configuration available';
    }
    
    const hasEnhancements = config.topUp || config.secondary || config.addOns;
    if (hasEnhancements) {
      layers.L4.show = true;
      const reasons = [];
      if (config.topUp) reasons.push('Top-up');
      if (config.secondary) reasons.push('Secondary');
      if (config.addOns) reasons.push('Add-ons');
      layers.L4.type = FlowEngine.hasEmployeePaidEnhancements(config) ? 'decision' : 'view';
      layers.L4.reason = `Enhancements: ${reasons.join(', ')}`;
    }
    
    if (FlowEngine.hasEmployeePayment(config)) {
      layers.L5.show = true;
      layers.L5.type = 'decision';
      layers.L5.reason = 'Employee payment required';
    }
    
    layers.L2.type = config.construct === 'FLEX' ? 'decision' : 'conditional';
    
    return layers;
  },
  
  hasEmployeePaidEnhancements: (config) => {
    return config.topUpPay === 'employee' || 
           config.topUpPay === 'wallet-employee' ||
           config.secPay === 'employee' || 
           config.secPay === 'wallet-employee' ||
           config.addOnPay === 'employee' || 
           config.addOnPay === 'wallet-employee';
  },
  
  hasEmployeePayment: (config) => {
    return config.basePay === 'employee' || 
           config.basePay === 'partial' ||
           config.basePay === 'wallet-employee' ||
           config.topUpPay === 'employee' ||
           config.topUpPay === 'wallet-employee' ||
           config.secPay === 'employee' ||
           config.secPay === 'wallet-employee' ||
           config.addOnPay === 'employee' ||
           config.addOnPay === 'wallet-employee';
  },
  
  getLayerComponents: (config, layer) => {
    const components = [];
    
    switch(layer) {
      case 'L0':
        components.push({ ...UI_COMPONENTS.C01, variant: 'horizontal', state: 'active' });
        break;
      case 'L1':
        components.push({ ...UI_COMPONENTS.C02, variant: 'view-only', state: 'default' });
        if (config.construct === 'FLEX') {
          components.push({ ...UI_COMPONENTS.C10, variant: 'banner', state: 'full' });
        }
        break;
      case 'L2':
        components.push({ ...UI_COMPONENTS.C04, variant: 'compact', state: 'view' });
        components.push({ ...UI_COMPONENTS.C05, variant: 'add', state: 'empty' });
        break;
      case 'L3':
        if (config.construct === 'MODULAR') {
          components.push({ ...UI_COMPONENTS.C03, variant: 'tier-cards', state: 'default' });
          components.push({ ...UI_COMPONENTS.C17, variant: 'side-by-side', state: 'interactive' });
        } else if (config.construct === 'FLEX') {
          components.push({ ...UI_COMPONENTS.C03, variant: 'configurator', state: 'default' });
          components.push({ ...UI_COMPONENTS.C10, variant: 'detailed', state: 'partial' });
        }
        components.push({ ...UI_COMPONENTS.C06, variant: 'inline', state: 'calculated' });
        break;
      case 'L4':
        if (config.topUp) {
          components.push({ ...UI_COMPONENTS.C08, variant: config.topUp === 'modular' ? 'modular' : 'standard', state: 'available' });
        }
        if (config.secondary) {
          components.push({ ...UI_COMPONENTS.C09, variant: config.secondary === 'multi' ? 'multi-plan' : 'single', state: 'available' });
        }
        if (config.addOns) {
          components.push({ ...UI_COMPONENTS.C07, variant: 'toggle', state: 'available' });
        }
        if (config.construct === 'FLEX') {
          components.push({ ...UI_COMPONENTS.C10, variant: 'inline', state: 'partial' });
        }
        break;
      case 'L5':
        components.push({ ...UI_COMPONENTS.C06, variant: 'detailed', state: 'calculated' });
        if (config.construct === 'FLEX') {
          components.push({ ...UI_COMPONENTS.C10, variant: 'detailed', state: 'exceeded' });
        }
        break;
      case 'L6':
        components.push({ ...UI_COMPONENTS.C12, variant: 'detailed', state: 'editable' });
        components.push({ ...UI_COMPONENTS.C04, variant: 'compact', state: 'view' });
        components.push({ ...UI_COMPONENTS.C11, variant: 'standard', state: 'unchecked' });
        if (config.construct === 'FLEX' && FlowEngine.hasEmployeePayment(config)) {
          components.push({ ...UI_COMPONENTS.C11, variant: 'wallet-overflow', state: 'unchecked' });
        }
        break;
    }
    
    components.push({ ...UI_COMPONENTS.C14, variant: 'popover', state: 'closed' });
    components.push({ ...UI_COMPONENTS.C15, variant: 'inline', state: 'hidden' });
    
    return components;
  },
  
  getLayerDecision: (config, layer) => {
    const decisions = {
      L0: 'V', L1: 'V', L2: 'C', L3: 'S', L4: 'S', L5: 'S', L6: 'D',
    };
    
    if (config.construct === 'FLEX') { decisions.L2 = 'D'; }
    if (config.construct === 'MODULAR' || config.construct === 'FLEX') { decisions.L3 = 'D'; }
    if (config.topUp || config.secondary || config.addOns) {
      decisions.L4 = FlowEngine.hasEmployeePaidEnhancements(config) ? 'D' : 'V';
    }
    if (FlowEngine.hasEmployeePayment(config)) { decisions.L5 = 'D'; }
    
    return decisions;
  },
  
  generateTestScenarios: (config, comboId) => {
    const scenarios = [];
    const layers = FlowEngine.getLayerVisibility(config);
    
    scenarios.push({
      id: `${comboId}-FLOW-01`, name: 'Happy Path - Complete Flow', type: 'flow',
      steps: Object.entries(layers).filter(([_, v]) => v.show).map(([layer, v]) => ({
        layer, action: v.type === 'decision' ? 'Make selection and continue' : 'View and continue',
        expected: `${layer} renders correctly with all components`
      })),
      priority: 'P0'
    });
    
    scenarios.push({
      id: `${comboId}-FLOW-02`, name: 'Drop-off at L4 and Resume', type: 'flow',
      steps: [
        { layer: 'L0-L3', action: 'Complete layers', expected: 'Draft saved' },
        { layer: 'L4', action: 'Close app mid-selection', expected: 'Draft persisted' },
        { layer: 'Resume', action: 'Open app again', expected: 'Resume from L4 with selections intact' }
      ],
      priority: 'P1'
    });
    
    if (FlowEngine.hasEmployeePayment(config)) {
      scenarios.push({
        id: `${comboId}-PREMIUM-01`, name: 'Premium Calculation Accuracy', type: 'premium',
        steps: [
          { action: 'Make selections', expected: 'Premium updates in real-time' },
          { action: 'Change selection', expected: 'Premium recalculates correctly' },
          { action: 'View breakdown', expected: 'Employer/Employee split shown correctly' }
        ],
        priority: 'P0'
      });
    }
    
    if (config.construct === 'FLEX') {
      scenarios.push({
        id: `${comboId}-WALLET-01`, name: 'Wallet Balance Display', type: 'wallet',
        steps: [
          { action: 'View L1', expected: 'Wallet balance shown prominently' },
          { action: 'Make selections in L3/L4', expected: 'Wallet usage updates' },
          { action: 'Exceed wallet', expected: 'Overflow amount shown, consent required' }
        ],
        priority: 'P0'
      });
    }
    
    if (config.minPart) {
      scenarios.push({
        id: `${comboId}-MP-01`, name: 'Min Participation Handling', type: 'system',
        steps: [
          { action: 'Complete enrollment', expected: 'Pending status shown' },
          { action: 'Check e-card', expected: 'E-card blocked with explanation' },
          { action: 'After rollout decision', expected: 'E-card generated or alternate plan assigned' }
        ],
        priority: 'P1'
      });
    }
    
    scenarios.push({
      id: `${comboId}-ECARD-01`, name: 'E-card Generation', type: 'system',
      steps: [
        { action: 'Submit enrollment', expected: config.minPart ? 'Pending status' : (config.cdCheck ? 'CD check initiated' : 'E-card generated') },
        { action: 'View success screen', expected: 'Correct status message shown' }
      ],
      priority: 'P0'
    });
    
    return scenarios;
  },
  
  getContentRequirements: (config, layer) => {
    const content = { headline: '', subtext: '', cta_primary: '', cta_secondary: '', tooltips: [], anxiety_reducers: [] };
    const constructCopy = {
      VANILLA: { verb: 'Review', noun: 'coverage' },
      MODULAR: { verb: 'Choose', noun: 'tier' },
      FLEX: { verb: 'Build', noun: 'coverage' }
    };
    const copy = constructCopy[config.construct];
    
    switch(layer) {
      case 'L0':
        content.headline = `Let's set up your health coverage`;
        content.subtext = config.construct === 'FLEX' ? `You have a benefits wallet to customize your protection` : `${copy.verb} your benefits from [Company]`;
        content.cta_primary = 'Get Started';
        content.anxiety_reducers = ['~5 minutes to complete', 'You can change selections later'];
        break;
      case 'L1':
        content.headline = config.construct === 'FLEX' ? 'Your benefits wallet' : 'Your coverage from [Company]';
        content.subtext = config.construct === 'FLEX' ? '₹[X] to build your protection' : '₹[X] lakh coverage for your family';
        content.cta_primary = 'Continue';
        content.tooltips = ['Sum Insured', 'Floater', 'Cashless'];
        break;
      case 'L2':
        content.headline = 'Your covered family members';
        content.subtext = 'Review and update if needed';
        content.cta_primary = 'Continue';
        content.cta_secondary = '+ Add family member';
        content.tooltips = ['Dependent', 'Relationship'];
        break;
      case 'L3':
        content.headline = config.construct === 'MODULAR' ? 'Upgrade your plan' : 'Configure your coverage';
        content.subtext = config.construct === 'MODULAR' ? 'Choose a higher tier for better benefits' : 'Select Sum Insured and family coverage';
        content.cta_primary = 'Continue';
        content.tooltips = ['Tier', 'Sum Insured', 'Family Definition'];
        content.anxiety_reducers = ['Compare plans side-by-side'];
        break;
      case 'L4':
        content.headline = 'Enhance your coverage';
        content.subtext = FlowEngine.hasEmployeePaidEnhancements(config) ? 'Add more protection (employee-paid)' : 'Additional benefits included';
        content.cta_primary = 'Continue';
        content.cta_secondary = 'Skip enhancements';
        content.tooltips = ['Top-up', 'Secondary Plan', 'Add-on'];
        content.anxiety_reducers = ['Most popular choices highlighted'];
        break;
      case 'L5':
        content.headline = 'Your investment';
        content.subtext = 'Review your premium breakdown';
        content.cta_primary = 'Continue to Review';
        content.tooltips = ['Premium', 'Salary Deduction'];
        if (config.construct === 'FLEX') { content.anxiety_reducers = ['Wallet covers: ₹[X]', 'You pay: ₹[Y]']; }
        break;
      case 'L6':
        content.headline = 'Review and confirm';
        content.subtext = 'Check your selections before submitting';
        content.cta_primary = config.preEnroll ? 'Submit Preferences' : 'Confirm Enrollment';
        content.cta_secondary = 'Edit selections';
        content.anxiety_reducers = ['You can update during next enrollment window'];
        break;
    }
    return content;
  }
};

// ============================================================================
// RFQ MATCHING ENGINE
// ============================================================================
const RFQEngine = {
  matchCombinations: (rfq) => {
    const results = [];
    Object.entries(POLICY_COMBINATIONS).forEach(([id, config]) => {
      const { score, matches, mismatches } = RFQEngine.scoreMatch(rfq, config);
      if (score > 0) {
        results.push({ comboId: id, config, score, matches, mismatches, name: config.name });
      }
    });
    return results.sort((a, b) => b.score - a.score);
  },
  
  scoreMatch: (rfq, config) => {
    let score = 0;
    let maxScore = 0;
    const matches = [];
    const mismatches = [];
    
    // Construct type (25 pts)
    if (rfq.construct && rfq.construct !== 'any') {
      maxScore += 25;
      if (rfq.construct === config.construct) {
        score += 25;
        matches.push(`Construct: ${config.construct}`);
      } else {
        mismatches.push(`Construct: wanted ${rfq.construct}, got ${config.construct}`);
      }
    }
    
    // Top-up (15 pts)
    if (rfq.topUp !== 'any') {
      maxScore += 15;
      const wantsTopUp = rfq.topUp === 'yes';
      const hasTopUp = !!config.topUp;
      if (wantsTopUp === hasTopUp) {
        score += 15;
        matches.push(hasTopUp ? `Top-up: ${config.topUp}` : 'No top-up needed');
      } else {
        mismatches.push(wantsTopUp ? 'Missing top-up' : 'Has unwanted top-up');
      }
    }
    
    // Secondary (15 pts)
    if (rfq.secondary !== 'any') {
      maxScore += 15;
      const wantsSecondary = rfq.secondary === 'yes';
      const hasSecondary = !!config.secondary;
      if (wantsSecondary === hasSecondary) {
        score += 15;
        matches.push(hasSecondary ? `Secondary: ${config.secondary}` : 'No secondary needed');
      } else {
        mismatches.push(wantsSecondary ? 'Missing secondary plan' : 'Has unwanted secondary');
      }
    }
    
    // Add-ons (10 pts)
    if (rfq.addOns !== 'any') {
      maxScore += 10;
      const wantsAddOns = rfq.addOns === 'yes';
      const hasAddOns = !!config.addOns;
      if (wantsAddOns === hasAddOns) {
        score += 10;
        matches.push(hasAddOns ? 'Add-ons available' : 'No add-ons needed');
      } else {
        mismatches.push(wantsAddOns ? 'Missing add-ons' : 'Has unwanted add-ons');
      }
    }
    
    // Payment model (15 pts)
    if (rfq.paymentModel && rfq.paymentModel !== 'any') {
      maxScore += 15;
      const hasEmployeePay = FlowEngine.hasEmployeePayment(config);
      if (rfq.paymentModel === 'employer-only' && !hasEmployeePay) {
        score += 15;
        matches.push('All employer-paid');
      } else if (rfq.paymentModel === 'employee-involved' && hasEmployeePay) {
        score += 15;
        matches.push('Employee payment included');
      } else if (rfq.paymentModel === 'wallet' && config.basePay?.includes('wallet')) {
        score += 15;
        matches.push('Wallet-based payment');
      } else {
        mismatches.push(`Payment: wanted ${rfq.paymentModel}`);
      }
    }
    
    // System flags (5 pts each = 20 pts)
    const flags = [
      { key: 'minPart', label: 'Min Participation' },
      { key: 'preEnroll', label: 'Pre-Enrollment' },
      { key: 'cdCheck', label: 'CD Balance Check' },
      { key: 'gradeBased', label: 'Grade-Based' },
    ];
    
    flags.forEach(flag => {
      if (rfq[flag.key] !== 'any' && rfq[flag.key] !== undefined) {
        maxScore += 5;
        const wantsFlag = rfq[flag.key] === 'yes';
        if (wantsFlag === config[flag.key]) {
          score += 5;
          matches.push(`${flag.label}: ${wantsFlag ? 'Yes' : 'No'}`);
        } else {
          mismatches.push(`${flag.label}: wanted ${wantsFlag ? 'Yes' : 'No'}`);
        }
      }
    });
    
    const finalScore = maxScore > 0 ? Math.round((score / maxScore) * 100) : 100;
    return { score: finalScore, matches, mismatches };
  },
  
  getMatchLabel: (score) => {
    if (score >= 90) return { label: 'Excellent Match', color: 'text-green-700 bg-green-200' };
    if (score >= 75) return { label: 'Good Match', color: 'text-blue-700 bg-blue-200' };
    if (score >= 60) return { label: 'Partial Match', color: 'text-orange-700 bg-orange-200' };
    return { label: 'Low Match', color: 'text-cerise-700 bg-cerise-200' };
  }
};

// ============================================================================
// REACT COMPONENTS - EXISTING
// ============================================================================

const FlowDiagram = ({ layers, config }) => {
  const visibleLayers = Object.entries(layers).filter(([_, v]) => v.show);
  
  const getLayerColor = (type) => {
    switch(type) {
      case 'view': return 'bg-blue-200 border-blue-200 text-blue-700';
      case 'decision': return 'bg-orange-200 border-orange-200 text-orange-700';
      case 'conditional': return 'bg-purple-200 border-purple-200 text-purple-700';
      default: return 'bg-onyx-200 border-onyx-200 text-onyx-500';
    }
  };
  
  const getLayerIcon = (layer) => {
    switch(layer) {
      case 'L0': return <Play size={16} />;
      case 'L1': return <Shield size={16} />;
      case 'L2': return <Users size={16} />;
      case 'L3': return <Settings size={16} />;
      case 'L4': return <Heart size={16} />;
      case 'L5': return <CreditCard size={16} />;
      case 'L6': return <CheckCircle2 size={16} />;
      default: return <Circle size={16} />;
    }
  };
  
  return (
    <div className="acko-card p-6 bg-white">
      <h3 className="text-onyx-800 font-semibold mb-6 flex items-center gap-2">
        <GitBranch size={20} className="text-purple-600" />
        Flow Diagram
      </h3>
      <div className="flex flex-wrap items-center gap-3">
        {visibleLayers.map(([layer, data], index) => (
          <React.Fragment key={layer}>
            <div className={`relative px-4 py-3 rounded-xl border-2 ${getLayerColor(data.type)} transition-all hover:scale-105 cursor-pointer group min-w-[120px]`}>
              <div className="flex items-center gap-2 mb-1">
                {getLayerIcon(layer)}
                <span className="font-bold text-sm">{layer}</span>
              </div>
              <div className="text-xs font-medium">{LAYER_META[layer]?.shortName}</div>
              <div className="text-[10px] opacity-75 mt-1 uppercase tracking-wide">{data.type}</div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-onyx-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                {data.reason}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-onyx-800"></div>
              </div>
            </div>
            {index < visibleLayers.length - 1 && <ArrowRight className="text-onyx-400" size={20} />}
          </React.Fragment>
        ))}
      </div>
      <div className="flex gap-4 mt-6 pt-4 border-t border-onyx-200">
        {[['bg-blue-200', 'View Only'], ['bg-orange-200', 'Decision Required'], ['bg-purple-200', 'Conditional']].map(([bg, label]) => (
          <div key={label} className="flex items-center gap-2 text-xs text-onyx-500">
            <div className={`w-3 h-3 rounded ${bg}`}></div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ComponentChecklist = ({ config, layers }) => {
  const allComponents = useMemo(() => {
    const componentMap = new Map();
    Object.entries(layers).forEach(([layer, data]) => {
      if (data.show) {
        FlowEngine.getLayerComponents(config, layer).forEach(comp => {
          const key = `${comp.id}-${comp.variant}`;
          if (!componentMap.has(key)) { componentMap.set(key, { ...comp, layers: [layer] }); }
          else { componentMap.get(key).layers.push(layer); }
        });
      }
    });
    return Array.from(componentMap.values());
  }, [config, layers]);
  
  const groupedByPriority = useMemo(() => {
    const groups = { 'P0': [], 'P0-FLEX': [], 'P1': [] };
    allComponents.forEach(comp => {
      const p = comp.priority || 'P1';
      (groups[p] || groups['P1']).push(comp);
    });
    return groups;
  }, [allComponents]);
  
  return (
    <div className="acko-card p-6 bg-white">
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-onyx-800">
        <List size={20} className="text-purple-600" />
        Component Checklist ({allComponents.length})
      </h3>
      {Object.entries(groupedByPriority).map(([priority, components]) => (
        components.length > 0 && (
          <div key={priority} className="mb-4">
            <div className={`text-xs font-bold uppercase tracking-wide mb-2 ${priority === 'P0' ? 'text-cerise-700' : priority === 'P0-FLEX' ? 'text-orange-700' : 'text-onyx-500'}`}>
              {priority} {priority === 'P0-FLEX' && '(Flex Only)'}
            </div>
            <div className="space-y-2">
              {components.map((comp, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-onyx-100 rounded-lg hover:bg-onyx-200 transition-colors">
                  <CheckCircle2 size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-onyx-800">{comp.id}</span>
                      <span className="text-onyx-600">{comp.name}</span>
                    </div>
                    <div className="text-xs text-onyx-500 mt-1">
                      <span className="bg-onyx-200 px-2 py-0.5 rounded mr-2">Variant: {comp.variant}</span>
                      <span className="bg-onyx-200 px-2 py-0.5 rounded mr-2">State: {comp.state}</span>
                      <span className="text-onyx-400">Layers: {comp.layers.join(', ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

const TestScenarios = ({ scenarios }) => {
  const [expandedScenario, setExpandedScenario] = useState(null);
  const getTypeColor = (type) => {
    switch(type) {
      case 'flow': return 'bg-blue-200 text-blue-700';
      case 'premium': return 'bg-green-200 text-green-700';
      case 'wallet': return 'bg-purple-200 text-purple-700';
      case 'system': return 'bg-orange-200 text-orange-700';
      default: return 'bg-onyx-200 text-onyx-700';
    }
  };
  
  return (
    <div className="acko-card p-6 bg-white">
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-onyx-800">
        <FileText size={20} className="text-purple-600" />
        Test Scenarios ({scenarios.length})
      </h3>
      <div className="space-y-3">
        {scenarios.map((scenario) => (
          <div key={scenario.id} className="border border-onyx-300 rounded-xl overflow-hidden">
            <button onClick={() => setExpandedScenario(expandedScenario === scenario.id ? null : scenario.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-onyx-100 transition-colors text-left">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(scenario.type)}`}>{scenario.type.toUpperCase()}</span>
                <span className="font-medium text-onyx-800">{scenario.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${scenario.priority === 'P0' ? 'bg-cerise-200 text-cerise-700' : 'bg-onyx-200 text-onyx-600'}`}>{scenario.priority}</span>
              </div>
              {expandedScenario === scenario.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            {expandedScenario === scenario.id && (
              <div className="px-4 pb-4 bg-onyx-100">
                <div className="text-xs font-mono text-onyx-500 mb-3">{scenario.id}</div>
                <div className="space-y-2">
                  {scenario.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3 text-sm">
                      <div className="w-6 h-6 rounded-full bg-onyx-300 text-onyx-700 flex items-center justify-center text-xs font-bold flex-shrink-0">{idx + 1}</div>
                      <div className="flex-1">
                        <div className="text-onyx-700">{step.layer && <span className="font-medium text-onyx-900">[{step.layer}] </span>}{step.action}</div>
                        <div className="text-onyx-500 text-xs mt-0.5">→ {step.expected}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const DecisionMatrix = ({ config, layers }) => {
  const decisions = FlowEngine.getLayerDecision(config, null);
  const getCellStyle = (value) => {
    switch(value) {
      case 'V': return 'bg-blue-200 text-blue-700';
      case 'D': return 'bg-orange-200 text-orange-700';
      case 'S': return 'bg-onyx-200 text-onyx-500';
      case 'C': return 'bg-purple-200 text-purple-700';
      default: return 'bg-onyx-200 text-onyx-500';
    }
  };
  
  return (
    <div className="acko-card p-6 bg-white">
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-onyx-800">
        <Eye size={20} className="text-purple-600" />Decision Matrix
      </h3>
      <div className="overflow-x-auto">
        <div className="flex gap-2 mb-4">
          {['L0','L1','L2','L3','L4','L5','L6'].map(layer => (
            <div key={layer} className="flex flex-col items-center">
              <div className="text-xs font-bold text-onyx-500 mb-1">{layer}</div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${getCellStyle(decisions[layer])} ${!layers[layer]?.show && 'opacity-40'}`}>{decisions[layer]}</div>
            </div>
          ))}
          <div className="flex flex-col items-center ml-4 pl-4 border-l-2 border-onyx-300">
            <div className="text-xs font-bold text-onyx-500 mb-1">Total</div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg bg-onyx-800 text-white">{Object.values(decisions).filter(v => v === 'D').length}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 pt-4 border-t border-onyx-300">
        {[['V','View Only'],['D','Decision'],['S','Skip'],['C','Conditional']].map(([v,l]) => (
          <div key={v} className="flex items-center gap-2 text-xs">
            <div className={`w-6 h-6 rounded flex items-center justify-center font-bold ${getCellStyle(v)}`}>{v}</div>
            <span className="text-onyx-600">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContentRequirements = ({ config, layers }) => {
  const visibleLayers = Object.entries(layers).filter(([_, v]) => v.show);
  return (
    <div className="acko-card p-6 bg-white">
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-onyx-800">
        <FileText size={20} className="text-purple-600" />Content Requirements
      </h3>
      <div className="space-y-4">
        {visibleLayers.map(([layer]) => {
          const content = FlowEngine.getContentRequirements(config, layer);
          return (
            <div key={layer} className="p-4 bg-onyx-100 rounded-xl">
              <div className="font-bold text-onyx-700 mb-2">{layer}</div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-onyx-500">Headline:</span><div className="font-medium text-onyx-800">{content.headline}</div></div>
                <div><span className="text-onyx-500">Subtext:</span><div className="text-onyx-700">{content.subtext}</div></div>
                <div><span className="text-onyx-500">Primary CTA:</span><div className="inline-block px-3 py-1 bg-purple-600 text-white rounded text-xs">{content.cta_primary}</div></div>
                {content.cta_secondary && <div><span className="text-onyx-500">Secondary CTA:</span><div className="inline-block px-3 py-1 border border-onyx-300 text-onyx-700 rounded text-xs">{content.cta_secondary}</div></div>}
                {content.tooltips.length > 0 && <div className="col-span-2"><span className="text-onyx-500">Tooltips:</span><div className="flex flex-wrap gap-1 mt-1">{content.tooltips.map((t, i) => <span key={i} className="px-2 py-0.5 bg-onyx-200 text-onyx-600 rounded text-xs">{t}</span>)}</div></div>}
                {content.anxiety_reducers.length > 0 && <div className="col-span-2"><span className="text-onyx-500">Anxiety reducers:</span><div className="flex flex-wrap gap-1 mt-1">{content.anxiety_reducers.map((t, i) => <span key={i} className="px-2 py-0.5 bg-green-200 text-green-700 rounded text-xs flex items-center gap-1"><Info size={10} /> {t}</span>)}</div></div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ExportPanel = ({ config, comboId, layers, scenarios }) => {
  const generateExport = () => {
    const data = {
      comboId, config, layers,
      components: Object.entries(layers).filter(([_, v]) => v.show).flatMap(([layer]) => FlowEngine.getLayerComponents(config, layer)),
      scenarios,
      contentRequirements: Object.entries(layers).filter(([_, v]) => v.show).reduce((acc, [layer]) => { acc[layer] = FlowEngine.getContentRequirements(config, layer); return acc; }, {})
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flow-engine-${comboId}.json`;
    a.click();
  };
  
  return (
    <div className="acko-card p-6 bg-gradient-to-r from-onyx-800 to-onyx-700 text-white border-none">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Download size={20} />Export Configuration</h3>
      <button onClick={generateExport} className="acko-btn bg-purple-600 text-white hover:bg-purple-700 px-6"><Download size={16} className="mr-2" />Export JSON</button>
      <p className="text-onyx-400 text-xs mt-4">Export includes: Flow config, layer visibility, components, test scenarios, and content requirements.</p>
    </div>
  );
};

// ============================================================================
// NEW COMPONENT: RFQ BUILDER
// ============================================================================
const RFQBuilder = ({ onSelectCombo, onMatchResults }) => {
  const [rfq, setRfq] = useState({
    construct: 'any',
    topUp: 'any',
    secondary: 'any',
    addOns: 'any',
    paymentModel: 'any',
    minPart: 'any',
    preEnroll: 'any',
    cdCheck: 'any',
    gradeBased: 'any',
  });
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  
  const handleChange = (field, value) => {
    setRfq(prev => ({ ...prev, [field]: value }));
  };
  
  const handleMatch = () => {
    const matched = RFQEngine.matchCombinations(rfq);
    setResults(matched);
    setShowResults(true);
    if (onMatchResults) onMatchResults(matched);
  };
  
  const handleReset = () => {
    setRfq({ construct: 'any', topUp: 'any', secondary: 'any', addOns: 'any', paymentModel: 'any', minPart: 'any', preEnroll: 'any', cdCheck: 'any', gradeBased: 'any' });
    setResults(null);
    setShowResults(false);
  };
  
  const SelectField = ({ label, value, onChange, options, icon }) => (
    <div>
      <label className="block text-xs font-medium text-onyx-500 mb-1.5 flex items-center gap-1">{icon}{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="acko-input text-sm">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
  
  return (
    <div className="space-y-6">
      <div className="acko-card p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold flex items-center gap-2 text-onyx-800">
            <Search size={20} className="text-purple-600" />
            RFQ Policy Matcher
          </h3>
          <button onClick={handleReset} className="text-xs text-onyx-500 hover:text-purple-600 transition-colors flex items-center gap-1">
            <X size={14} /> Reset
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <SelectField label="Construct Type" icon={<Layers size={12} />} value={rfq.construct} onChange={(v) => handleChange('construct', v)}
            options={[{ value: 'any', label: 'Any Construct' }, { value: 'VANILLA', label: 'VANILLA - Fixed Base' }, { value: 'MODULAR', label: 'MODULAR - Tiered' }, { value: 'FLEX', label: 'FLEX - Wallet' }]} />
          
          <SelectField label="Top-up Coverage" icon={<Shield size={12} />} value={rfq.topUp} onChange={(v) => handleChange('topUp', v)}
            options={[{ value: 'any', label: 'Don\'t Care' }, { value: 'yes', label: 'Yes, need top-up' }, { value: 'no', label: 'No top-up needed' }]} />
          
          <SelectField label="Secondary Plan" icon={<Users size={12} />} value={rfq.secondary} onChange={(v) => handleChange('secondary', v)}
            options={[{ value: 'any', label: 'Don\'t Care' }, { value: 'yes', label: 'Yes, need secondary' }, { value: 'no', label: 'No secondary needed' }]} />
          
          <SelectField label="Add-ons" icon={<Heart size={12} />} value={rfq.addOns} onChange={(v) => handleChange('addOns', v)}
            options={[{ value: 'any', label: 'Don\'t Care' }, { value: 'yes', label: 'Yes, want add-ons' }, { value: 'no', label: 'No add-ons needed' }]} />
          
          <SelectField label="Payment Model" icon={<CreditCard size={12} />} value={rfq.paymentModel} onChange={(v) => handleChange('paymentModel', v)}
            options={[{ value: 'any', label: 'Any Payment' }, { value: 'employer-only', label: 'All Employer-Paid' }, { value: 'employee-involved', label: 'Employee Pays Some' }, { value: 'wallet', label: 'Wallet-Based' }]} />
          
          <SelectField label="Min Participation" icon={<Target size={12} />} value={rfq.minPart} onChange={(v) => handleChange('minPart', v)}
            options={[{ value: 'any', label: 'Don\'t Care' }, { value: 'yes', label: 'Required' }, { value: 'no', label: 'Not Required' }]} />
          
          <SelectField label="Pre-Enrollment" icon={<Clock size={12} />} value={rfq.preEnroll} onChange={(v) => handleChange('preEnroll', v)}
            options={[{ value: 'any', label: 'Don\'t Care' }, { value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
          
          <SelectField label="Grade-Based" icon={<Tag size={12} />} value={rfq.gradeBased} onChange={(v) => handleChange('gradeBased', v)}
            options={[{ value: 'any', label: 'Don\'t Care' }, { value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
        </div>
        
        <button onClick={handleMatch} className="acko-btn bg-purple-600 text-white hover:bg-purple-700 px-8 font-semibold">
          <Search size={16} className="mr-2" /> Find Matching Combinations
        </button>
      </div>
      
      {/* Results */}
      {showResults && results && (
        <div className="acko-card p-6 bg-white fade-in-up">
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-onyx-800">
            <Zap size={20} className="text-purple-600" />
            {results.length} Matching Combinations Found
          </h3>
          
          {results.length === 0 ? (
            <div className="text-center py-8 text-onyx-500">
              <AlertCircle size={32} className="mx-auto mb-2 text-onyx-400" />
              <p>No exact matches found. Try relaxing some criteria.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {results.map((result) => {
                const matchInfo = RFQEngine.getMatchLabel(result.score);
                return (
                  <button key={result.comboId} onClick={() => onSelectCombo(result.comboId)}
                    className="w-full text-left p-4 border border-onyx-300 rounded-xl hover:border-purple-400 hover:bg-purple-100 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-lg text-purple-700">{result.comboId}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          result.config.construct === 'VANILLA' ? 'bg-green-200 text-green-700' :
                          result.config.construct === 'MODULAR' ? 'bg-orange-200 text-orange-700' :
                          'bg-purple-200 text-purple-700'
                        }`}>{result.config.construct}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${matchInfo.color}`}>{result.score}% - {matchInfo.label}</span>
                        <ChevronRight size={18} className="text-onyx-400 group-hover:text-purple-600 transition-colors" />
                      </div>
                    </div>
                    <div className="text-sm text-onyx-600 mb-2">{result.name}</div>
                    <div className="flex flex-wrap gap-1">
                      {result.matches.slice(0, 4).map((m, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full">{m}</span>
                      ))}
                      {result.mismatches.slice(0, 2).map((m, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 bg-cerise-200 text-cerise-700 rounded-full">{m}</span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// NEW COMPONENT: MOBILE PHONE SIMULATOR
// ============================================================================

// Annotation badge component
const AnnotationBadge = ({ id, show }) => {
  if (!show) return null;
  return (
    <span className="absolute -top-2 -right-2 z-10 px-1.5 py-0.5 bg-purple-600 text-white text-[9px] font-bold rounded-full annotation-pulse">
      {id}
    </span>
  );
};

// Phone status bar
const PhoneStatusBar = () => (
  <div className="flex justify-between items-center px-6 pt-14 pb-2" style={{ fontSize: '12px' }}>
    <span className="font-semibold text-onyx-800">9:41</span>
    <div className="flex items-center gap-1.5">
      <div className="flex gap-[2px]">
        {[4,6,8,10].map((h,i) => <div key={i} className="w-[3px] bg-onyx-800 rounded-full" style={{ height: `${h}px` }} />)}
      </div>
      <div className="w-[15px] h-[10px] flex items-center gap-[1px]">
        <div className="flex-1 flex items-end gap-[1px]">{[3,5,7].map((h,i) => <div key={i} className="w-[2px] bg-onyx-800 rounded-full" style={{ height: `${h}px` }} />)}</div>
      </div>
      <div className="relative w-[22px] h-[10px]">
        <div className="absolute inset-0 border border-onyx-800 rounded-[2px]" />
        <div className="absolute top-[1px] left-[1px] bottom-[1px] bg-green-600 rounded-[1px]" style={{ width: '80%' }} />
        <div className="absolute top-[3px] -right-[2px] w-[1.5px] h-[4px] bg-onyx-800 rounded-r-full" />
      </div>
    </div>
  </div>
);

// Mobile progress stepper
const MobileProgressStepper = ({ totalSteps, currentStep, layerNames }) => (
  <div className="px-4 py-3 flex items-center gap-1.5">
    {Array.from({ length: totalSteps }, (_, i) => (
      <div key={i} className="flex-1 flex flex-col items-center">
        <div className={`h-1 w-full rounded-full transition-all ${i < currentStep ? 'bg-purple-600' : i === currentStep ? 'bg-purple-400' : 'bg-onyx-300'}`} />
        <span className={`text-[8px] mt-1 ${i === currentStep ? 'text-purple-700 font-bold' : 'text-onyx-400'}`}>
          {layerNames[i] || `Step ${i + 1}`}
        </span>
      </div>
    ))}
  </div>
);

// Individual mobile screen renderers
const MobileScreenL0 = ({ config, content, showAnnotations }) => {
  const layerVisibility = FlowEngine.getLayerVisibility(config);
  const steps = Object.entries(layerVisibility).filter(([_, v]) => v.show);
  const constructLabel = { VANILLA: 'Review and confirm', MODULAR: 'Choose and confirm', FLEX: 'Build and confirm' };
  
  return (
    <div className="px-5 py-4 space-y-5">
      {/* Logo area */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
          <Shield size={16} className="text-white" />
        </div>
        <span className="font-bold text-sm text-purple-800">acko health</span>
      </div>
      
      {/* Headline */}
      <div className="relative">
        <AnnotationBadge id="Content" show={showAnnotations} />
        <h2 className={`text-xl font-bold text-onyx-800 leading-tight ${showAnnotations ? 'border-2 border-dashed border-blue-400 rounded p-1' : ''}`}>
          {content.headline}
        </h2>
        <p className="text-sm text-onyx-500 mt-1">{content.subtext}</p>
      </div>
      
      {/* What to expect */}
      <div className={`relative bg-purple-100 rounded-xl p-4 ${showAnnotations ? 'border-2 border-dashed border-purple-400' : ''}`}>
        <AnnotationBadge id="C01" show={showAnnotations} />
        <div className="text-xs font-semibold text-purple-700 mb-3 uppercase tracking-wide">What to expect</div>
        <div className="space-y-3">
          {steps.map(([layer], i) => (
            <div key={layer} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-xs font-bold">{i + 1}</div>
              <span className="text-sm text-onyx-700">{LAYER_META[layer]?.name || layer}</span>
            </div>
          ))}
        </div>
        <div className="text-xs text-purple-600 mt-3 font-medium">{constructLabel[config.construct]}</div>
      </div>
      
      {/* Anxiety reducers */}
      <div className="space-y-2">
        {content.anxiety_reducers.map((text, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-green-700 bg-green-100 rounded-lg px-3 py-2">
            <CheckCircle2 size={14} /> {text}
          </div>
        ))}
      </div>
      
      {/* CTA */}
      <div className={`relative ${showAnnotations ? 'border-2 border-dashed border-orange-400 rounded-xl' : ''}`}>
        <AnnotationBadge id="CTA" show={showAnnotations} />
        <div className="bg-purple-600 text-white text-center py-4 rounded-xl font-semibold text-base shadow-lg">
          {content.cta_primary}
        </div>
      </div>
    </div>
  );
};

const MobileScreenL1 = ({ config, content, showAnnotations }) => (
  <div className="px-5 py-4 space-y-4">
    <button className="flex items-center gap-1 text-sm text-purple-600"><ChevronLeft size={16} />Back</button>
    
    <div className="relative">
      <AnnotationBadge id="Content" show={showAnnotations} />
      <h2 className={`text-lg font-bold text-onyx-800 ${showAnnotations ? 'border-2 border-dashed border-blue-400 rounded p-1' : ''}`}>{content.headline}</h2>
      <p className="text-sm text-onyx-500 mt-0.5">{content.subtext}</p>
    </div>
    
    {/* Wallet Display - Flex only */}
    {config.construct === 'FLEX' && (
      <div className={`relative bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-4 text-white ${showAnnotations ? 'border-2 border-dashed border-orange-400' : ''}`}>
        <AnnotationBadge id="C10" show={showAnnotations} />
        <div className="flex items-center gap-2 mb-2"><Wallet size={18} /><span className="font-semibold text-sm">Benefits Wallet</span></div>
        <div className="text-2xl font-bold">₹25,000</div>
        <div className="w-full bg-purple-400 rounded-full h-2 mt-2"><div className="bg-white rounded-full h-2" style={{ width: '100%' }} /></div>
        <div className="text-xs mt-1 opacity-80">Available to allocate</div>
      </div>
    )}
    
    {/* Coverage Card */}
    <div className={`relative border border-onyx-300 rounded-xl p-4 ${showAnnotations ? 'border-2 border-dashed border-purple-400' : ''}`}>
      <AnnotationBadge id="C02" show={showAnnotations} />
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="text-2xl font-bold text-onyx-800">₹5,00,000</div>
          <div className="text-xs text-onyx-500">Sum Insured</div>
        </div>
        <span className="px-2 py-1 bg-blue-200 text-blue-700 rounded text-[10px] font-medium flex items-center gap-1"><Info size={10} />Floater</span>
      </div>
      <div className="border-t border-onyx-200 pt-3 space-y-2">
        <div className="text-xs font-semibold text-onyx-600 mb-1">COVERED FAMILY</div>
        {['Self', 'Spouse', '2 Children'].map((m, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-onyx-700">
            <Users size={14} className="text-purple-500" />{m}<CheckCircle2 size={14} className="text-green-600 ml-auto" />
          </div>
        ))}
      </div>
    </div>
    
    {/* Key Benefits */}
    <div className="space-y-2">
      <div className="text-xs font-semibold text-onyx-600">KEY BENEFITS</div>
      {['Cashless at 10,000+ hospitals', 'Pre & Post hospitalization', 'Day care procedures', 'Ambulance charges'].map((b, i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-onyx-700"><CheckCircle2 size={14} className="text-green-500" />{b}</div>
      ))}
    </div>
    
    <div className="bg-purple-600 text-white text-center py-3.5 rounded-xl font-semibold text-sm">{content.cta_primary}</div>
  </div>
);

const MobileScreenL2 = ({ config, content, showAnnotations }) => (
  <div className="px-5 py-4 space-y-4">
    <button className="flex items-center gap-1 text-sm text-purple-600"><ChevronLeft size={16} />Back</button>
    
    <div>
      <h2 className="text-lg font-bold text-onyx-800">{content.headline}</h2>
      <p className="text-sm text-onyx-500 mt-0.5">{content.subtext}</p>
    </div>
    
    {/* Member Cards */}
    {[
      { name: 'Nikhil Thakkar', relation: 'Self', age: '32 yrs', gender: 'Male' },
      { name: 'Priya Thakkar', relation: 'Spouse', age: '30 yrs', gender: 'Female' },
      { name: 'Aryan Thakkar', relation: 'Child', age: '5 yrs', gender: 'Male' },
    ].map((member, i) => (
      <div key={i} className={`relative border border-onyx-300 rounded-xl p-4 ${showAnnotations ? 'border-2 border-dashed border-purple-400' : ''}`}>
        <AnnotationBadge id="C04" show={showAnnotations && i === 0} />
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Users size={18} className="text-purple-600" />
            </div>
            <div>
              <div className="font-semibold text-sm text-onyx-800">{member.name}</div>
              <div className="text-xs text-onyx-500">{member.relation} | {member.age} | {member.gender}</div>
            </div>
          </div>
          <button className="text-xs text-purple-600 font-medium">Edit</button>
        </div>
      </div>
    ))}
    
    {/* Add member */}
    <div className={`relative ${showAnnotations ? 'border-2 border-dashed border-green-400 rounded-xl' : ''}`}>
      <AnnotationBadge id="C05" show={showAnnotations} />
      <button className="w-full border-2 border-dashed border-onyx-300 rounded-xl py-4 text-sm text-purple-600 font-medium hover:border-purple-400 hover:bg-purple-50 transition-all flex items-center justify-center gap-2">
        <span className="text-lg">+</span> Add family member
      </button>
    </div>
    
    {config.construct === 'FLEX' && (
      <div className="flex items-center gap-2 text-xs text-orange-700 bg-orange-100 rounded-lg px-3 py-2">
        <AlertTriangle size={14} /> Family changes may affect your wallet allocation
      </div>
    )}
    
    <div className="bg-purple-600 text-white text-center py-3.5 rounded-xl font-semibold text-sm">{content.cta_primary}</div>
  </div>
);

const MobileScreenL3 = ({ config, content, showAnnotations }) => (
  <div className="px-5 py-4 space-y-4">
    <button className="flex items-center gap-1 text-sm text-purple-600"><ChevronLeft size={16} />Back</button>
    
    <div>
      <h2 className="text-lg font-bold text-onyx-800">{content.headline}</h2>
      <p className="text-sm text-onyx-500 mt-0.5">{content.subtext}</p>
    </div>
    
    {/* Modular: Tier cards */}
    {config.construct === 'MODULAR' && (
      <div className={`relative space-y-3 ${showAnnotations ? 'border-2 border-dashed border-purple-400 rounded-xl p-2' : ''}`}>
        <AnnotationBadge id="C03" show={showAnnotations} />
        {[
          { tier: 'Silver', si: '₹3L', price: '₹0/mo', current: true, features: ['Basic coverage', 'Cashless network'] },
          { tier: 'Gold', si: '₹5L', price: '+₹500/mo', current: false, features: ['Enhanced coverage', 'Wider network', 'Room rent waiver'] },
          { tier: 'Platinum', si: '₹10L', price: '+₹1,200/mo', current: false, features: ['Premium coverage', 'Global coverage', 'No sub-limits'] },
        ].map((plan, i) => (
          <div key={i} className={`border-2 rounded-xl p-4 transition-all cursor-pointer ${plan.current ? 'border-purple-600 bg-purple-50' : 'border-onyx-300 hover:border-purple-400'}`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{plan.tier}</span>
                  {plan.current && <span className="px-2 py-0.5 bg-purple-200 text-purple-700 rounded text-[10px] font-bold">CURRENT</span>}
                </div>
                <div className="text-xs text-onyx-500 mt-0.5">{plan.si} Sum Insured</div>
              </div>
              <div className="text-right">
                <div className={`font-bold text-sm ${plan.current ? 'text-green-700' : 'text-orange-700'}`}>{plan.price}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {plan.features.map((f, j) => <span key={j} className="text-[10px] px-2 py-0.5 bg-onyx-100 text-onyx-600 rounded-full">{f}</span>)}
            </div>
            <div className={`mt-3 text-center py-2 rounded-lg text-xs font-semibold ${plan.current ? 'bg-purple-600 text-white' : 'bg-onyx-200 text-onyx-700'}`}>
              {plan.current ? 'Selected' : 'Select Plan'}
            </div>
          </div>
        ))}
        <button className="w-full text-center text-xs text-purple-600 font-medium py-2">Compare plans side-by-side</button>
      </div>
    )}
    
    {/* Flex: Wallet configurator */}
    {config.construct === 'FLEX' && (
      <div className="space-y-4">
        <div className={`relative bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-4 text-white ${showAnnotations ? 'border-2 border-dashed border-orange-400' : ''}`}>
          <AnnotationBadge id="C10" show={showAnnotations} />
          <div className="flex items-center gap-2 mb-2"><Wallet size={16} /><span className="text-sm font-semibold">Wallet Balance</span></div>
          <div className="flex justify-between items-end">
            <div><div className="text-xs opacity-70">Used</div><div className="text-lg font-bold">₹18,000</div></div>
            <div className="text-right"><div className="text-xs opacity-70">Remaining</div><div className="text-lg font-bold">₹7,000</div></div>
          </div>
          <div className="w-full bg-purple-400 rounded-full h-2 mt-2"><div className="bg-white rounded-full h-2" style={{ width: '72%' }} /></div>
        </div>
        
        <div className={`relative border border-onyx-300 rounded-xl p-4 ${showAnnotations ? 'border-2 border-dashed border-purple-400' : ''}`}>
          <AnnotationBadge id="C03" show={showAnnotations} />
          <div className="text-xs font-semibold text-onyx-600 mb-3">SELECT SUM INSURED</div>
          <div className="flex flex-wrap gap-2">
            {['₹3L', '₹5L', '₹7L', '₹10L', '₹15L'].map((si, i) => (
              <button key={i} className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${i === 1 ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-onyx-300 text-onyx-600'}`}>{si}</button>
            ))}
          </div>
          
          <div className="text-xs font-semibold text-onyx-600 mt-4 mb-3">FAMILY COVERAGE</div>
          {['Self only', 'Self + Spouse', 'Self + Family', 'Self + Family + Parents'].map((fam, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg mb-2 cursor-pointer transition-all ${i === 2 ? 'bg-purple-50 border-2 border-purple-600' : 'border border-onyx-200 hover:border-purple-300'}`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${i === 2 ? 'border-purple-600' : 'border-onyx-300'}`}>
                {i === 2 && <div className="w-3 h-3 rounded-full bg-purple-600" />}
              </div>
              <span className="text-sm text-onyx-700">{fam}</span>
            </div>
          ))}
        </div>
      </div>
    )}
    
    {/* Premium impact */}
    {(config.construct === 'MODULAR' || config.construct === 'FLEX') && (
      <div className={`relative bg-onyx-100 rounded-xl p-3 ${showAnnotations ? 'border-2 border-dashed border-green-400' : ''}`}>
        <AnnotationBadge id="C06" show={showAnnotations} />
        <div className="flex justify-between text-sm">
          <span className="text-onyx-500">Premium impact</span>
          <span className="font-semibold text-onyx-800">{config.construct === 'FLEX' ? '₹18,000 from wallet' : '+₹500/month'}</span>
        </div>
      </div>
    )}
    
    <div className="bg-purple-600 text-white text-center py-3.5 rounded-xl font-semibold text-sm">{content.cta_primary}</div>
  </div>
);

const MobileScreenL4 = ({ config, content, showAnnotations }) => (
  <div className="px-5 py-4 space-y-4">
    <button className="flex items-center gap-1 text-sm text-purple-600"><ChevronLeft size={16} />Back</button>
    
    <div>
      <h2 className="text-lg font-bold text-onyx-800">{content.headline}</h2>
      <p className="text-sm text-onyx-500 mt-0.5">{content.subtext}</p>
    </div>
    
    {/* Flex wallet reminder */}
    {config.construct === 'FLEX' && (
      <div className={`relative flex items-center gap-3 bg-purple-100 rounded-xl p-3 ${showAnnotations ? 'border-2 border-dashed border-orange-400' : ''}`}>
        <AnnotationBadge id="C10" show={showAnnotations} />
        <Wallet size={18} className="text-purple-600" />
        <div className="flex-1">
          <div className="text-xs text-purple-700 font-semibold">Wallet: ₹7,000 remaining</div>
          <div className="w-full bg-purple-200 rounded-full h-1.5 mt-1"><div className="bg-purple-600 rounded-full h-1.5" style={{ width: '28%' }} /></div>
        </div>
      </div>
    )}
    
    {/* Top-up card */}
    {config.topUp && (
      <div className={`relative border border-onyx-300 rounded-xl p-4 ${showAnnotations ? 'border-2 border-dashed border-purple-400' : ''}`}>
        <AnnotationBadge id="C08" show={showAnnotations} />
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-200 flex items-center justify-center"><Shield size={18} className="text-blue-700" /></div>
            <div>
              <div className="font-semibold text-sm">Top-up Cover</div>
              <div className="text-xs text-onyx-500">Extra ₹5L after base exhausted</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-onyx-800">{config.construct === 'FLEX' ? '₹2,000' : '₹200/mo'}</div>
            {config.construct === 'FLEX' && <div className="text-[10px] text-purple-600">from wallet</div>}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between bg-onyx-100 rounded-lg p-2">
          <span className="text-xs text-onyx-600">Add to coverage</span>
          <div className="w-10 h-6 bg-purple-600 rounded-full relative cursor-pointer"><div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" /></div>
        </div>
        {config.topUpPay === 'employee' || config.topUpPay === 'wallet-employee' ? (
          <div className="text-[10px] text-orange-600 mt-2 flex items-center gap-1"><AlertTriangle size={10} />Employee-paid</div>
        ) : (
          <div className="text-[10px] text-green-600 mt-2 flex items-center gap-1"><CheckCircle2 size={10} />Employer-paid</div>
        )}
      </div>
    )}
    
    {/* Secondary plan card */}
    {config.secondary && (
      <div className={`relative border border-onyx-300 rounded-xl p-4 ${showAnnotations ? 'border-2 border-dashed border-purple-400' : ''}`}>
        <AnnotationBadge id="C09" show={showAnnotations} />
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-200 flex items-center justify-center"><Users size={18} className="text-green-700" /></div>
            <div>
              <div className="font-semibold text-sm">Parent Cover</div>
              <div className="text-xs text-onyx-500">₹3L for parents</div>
            </div>
          </div>
          <div className="text-sm font-bold text-onyx-800">{config.construct === 'FLEX' ? '₹4,000' : '₹400/mo'}</div>
        </div>
        <div className="mt-3 flex items-center justify-between bg-onyx-100 rounded-lg p-2">
          <span className="text-xs text-onyx-600">Add to coverage</span>
          <div className="w-10 h-6 bg-onyx-300 rounded-full relative cursor-pointer"><div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" /></div>
        </div>
      </div>
    )}
    
    {/* Add-on cards */}
    {config.addOns && (
      <div className={`relative space-y-3 ${showAnnotations ? 'border-2 border-dashed border-purple-400 rounded-xl p-2' : ''}`}>
        <AnnotationBadge id="C07" show={showAnnotations} />
        <div className="text-xs font-semibold text-onyx-600">ADD-ONS</div>
        {[
          { name: 'OPD Cover', desc: '₹15,000/year', price: '₹100/mo', popular: true },
          { name: 'Dental & Vision', desc: '₹10,000/year', price: '₹75/mo', popular: false },
          { name: 'Wellness Program', desc: 'Health checkups', price: '₹50/mo', popular: false },
        ].map((addon, i) => (
          <div key={i} className="border border-onyx-200 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{addon.name}</span>
                  {addon.popular && <span className="px-1.5 py-0.5 bg-orange-200 text-orange-700 text-[9px] font-bold rounded">POPULAR</span>}
                </div>
                <div className="text-xs text-onyx-500 mt-0.5">{addon.desc}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{addon.price}</div>
                <div className="w-8 h-5 bg-onyx-300 rounded-full relative mt-1 cursor-pointer"><div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" /></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
    
    {/* Skip option */}
    <button className="w-full text-center text-sm text-onyx-500 py-2 hover:text-purple-600 transition-colors">{content.cta_secondary}</button>
    <div className="bg-purple-600 text-white text-center py-3.5 rounded-xl font-semibold text-sm">{content.cta_primary}</div>
  </div>
);

const MobileScreenL5 = ({ config, content, showAnnotations }) => (
  <div className="px-5 py-4 space-y-4">
    <button className="flex items-center gap-1 text-sm text-purple-600"><ChevronLeft size={16} />Back</button>
    
    <div>
      <h2 className="text-lg font-bold text-onyx-800">{content.headline}</h2>
      <p className="text-sm text-onyx-500 mt-0.5">{content.subtext}</p>
    </div>
    
    {/* Premium Breakdown */}
    <div className={`relative border border-onyx-300 rounded-xl overflow-hidden ${showAnnotations ? 'border-2 border-dashed border-purple-400' : ''}`}>
      <AnnotationBadge id="C06" show={showAnnotations} />
      <div className="bg-onyx-800 text-white p-4">
        <div className="text-xs opacity-70">Total Annual Premium</div>
        <div className="text-3xl font-bold mt-1">₹24,000</div>
        <div className="text-xs opacity-70 mt-1">₹2,000/month</div>
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-onyx-500">[Company] pays</span>
            <span className="font-bold text-green-700">₹18,000 (75%)</span>
          </div>
          <div className="w-full bg-onyx-200 rounded-full h-3"><div className="bg-green-500 rounded-full h-3" style={{ width: '75%' }} /></div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-onyx-500">You pay</span>
            <span className="font-bold text-orange-700">₹6,000 (25%)</span>
          </div>
          <div className="w-full bg-onyx-200 rounded-full h-3"><div className="bg-orange-500 rounded-full h-3" style={{ width: '25%' }} /></div>
        </div>
        
        <div className="border-t border-onyx-200 pt-3">
          <div className="text-xs font-semibold text-onyx-600 mb-2">BREAKDOWN</div>
          {[['Base Coverage', '₹12,000', 'Employer'], ['Top-up', '₹6,000', 'Employee'], ['Add-ons', '₹6,000', 'Employee']].map(([item, cost, payer], i) => (
            <div key={i} className="flex justify-between text-sm py-1.5 border-b border-onyx-100 last:border-0">
              <span className="text-onyx-700">{item}</span>
              <div className="text-right">
                <span className="font-medium">{cost}</span>
                <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded ${payer === 'Employer' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{payer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    {/* Flex wallet overflow */}
    {config.construct === 'FLEX' && (
      <div className={`relative bg-orange-100 border border-orange-200 rounded-xl p-4 ${showAnnotations ? 'border-2 border-dashed border-orange-400' : ''}`}>
        <AnnotationBadge id="C10" show={showAnnotations} />
        <div className="flex items-center gap-2 mb-2"><AlertTriangle size={16} className="text-orange-700" /><span className="font-semibold text-sm text-orange-800">Wallet Overflow</span></div>
        <div className="text-sm text-orange-700">Your selections exceed the wallet by <span className="font-bold">₹3,000</span></div>
        <div className="text-xs text-orange-600 mt-1">This amount will be deducted from your salary (₹250/month)</div>
      </div>
    )}
    
    {/* Salary deduction info */}
    <div className="bg-onyx-100 rounded-xl p-3 flex items-center gap-3">
      <CreditCard size={18} className="text-onyx-500" />
      <div>
        <div className="text-sm font-medium text-onyx-800">₹500/month salary deduction</div>
        <div className="text-xs text-onyx-500">Deducted from your monthly salary</div>
      </div>
    </div>
    
    <div className="bg-purple-600 text-white text-center py-3.5 rounded-xl font-semibold text-sm">{content.cta_primary}</div>
  </div>
);

const MobileScreenL6 = ({ config, content, showAnnotations }) => (
  <div className="px-5 py-4 space-y-4">
    <button className="flex items-center gap-1 text-sm text-purple-600"><ChevronLeft size={16} />Back</button>
    
    <div>
      <h2 className="text-lg font-bold text-onyx-800">{content.headline}</h2>
      <p className="text-sm text-onyx-500 mt-0.5">{content.subtext}</p>
    </div>
    
    {/* Review sections */}
    <div className={`relative ${showAnnotations ? 'border-2 border-dashed border-purple-400 rounded-xl p-2' : ''}`}>
      <AnnotationBadge id="C12" show={showAnnotations} />
      
      {[
        { title: 'Your Coverage', items: [`₹5L ${config.construct === 'MODULAR' ? 'Gold Tier' : ''} Floater`, 'Cashless at 10,000+ hospitals'], icon: <Shield size={16} /> },
        { title: 'Family Members', items: ['Self, Spouse, 2 Children', config.secondary ? '+ Parents (Secondary)' : null].filter(Boolean), icon: <Users size={16} /> },
        config.topUp || config.secondary || config.addOns ? { title: 'Enhancements', items: [config.topUp ? 'Top-up: ₹5L' : null, config.addOns ? 'OPD: ₹15K' : null, config.secondary ? 'Parent Cover: ₹3L' : null].filter(Boolean), icon: <Heart size={16} /> } : null,
        FlowEngine.hasEmployeePayment(config) ? { title: 'Your Investment', items: ['₹500/month from salary', config.construct === 'FLEX' ? '₹18,000 from wallet' : null].filter(Boolean), icon: <CreditCard size={16} /> } : null,
      ].filter(Boolean).map((section, i) => (
        <div key={i} className="border border-onyx-200 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-purple-600">{section.icon}</span>
              <span className="font-semibold text-sm text-onyx-800">{section.title}</span>
            </div>
            <button className="text-xs text-purple-600 font-medium">Edit</button>
          </div>
          {section.items.map((item, j) => (
            <div key={j} className="text-sm text-onyx-600 py-0.5">{item}</div>
          ))}
        </div>
      ))}
    </div>
    
    {/* Consent checkboxes */}
    <div className={`relative space-y-3 ${showAnnotations ? 'border-2 border-dashed border-green-400 rounded-xl p-2' : ''}`}>
      <AnnotationBadge id="C11" show={showAnnotations} />
      <label className="flex items-start gap-3 cursor-pointer">
        <div className="w-5 h-5 border-2 border-onyx-300 rounded mt-0.5 flex-shrink-0 flex items-center justify-center">
          <CheckCircle2 size={14} className="text-purple-600" />
        </div>
        <span className="text-xs text-onyx-600 leading-relaxed">I agree to the terms and conditions of the group health insurance policy</span>
      </label>
      {FlowEngine.hasEmployeePayment(config) && (
        <label className="flex items-start gap-3 cursor-pointer">
          <div className="w-5 h-5 border-2 border-onyx-300 rounded mt-0.5 flex-shrink-0" />
          <span className="text-xs text-onyx-600 leading-relaxed">I consent to the salary deduction for my selected coverage</span>
        </label>
      )}
      {config.construct === 'FLEX' && FlowEngine.hasEmployeePayment(config) && (
        <label className="flex items-start gap-3 cursor-pointer">
          <div className="w-5 h-5 border-2 border-onyx-300 rounded mt-0.5 flex-shrink-0" />
          <span className="text-xs text-onyx-600 leading-relaxed">I acknowledge the wallet overflow amount will be deducted from salary</span>
        </label>
      )}
    </div>
    
    {config.preEnroll && (
      <div className="bg-blue-200 text-blue-700 rounded-xl p-3 text-xs flex items-center gap-2">
        <Info size={14} /> This is a pre-enrollment. Your preferences will be used to finalize the policy.
      </div>
    )}
    
    {config.minPart && (
      <div className="bg-orange-100 text-orange-700 rounded-xl p-3 text-xs flex items-center gap-2">
        <AlertTriangle size={14} /> Your enrollment is pending minimum participation. E-card will be generated once threshold is met.
      </div>
    )}
    
    <div className="bg-purple-600 text-white text-center py-4 rounded-xl font-semibold text-base shadow-lg">{content.cta_primary}</div>
    
    <div className="text-center">
      <button className="text-sm text-purple-600 font-medium">{content.cta_secondary}</button>
    </div>
    
    {content.anxiety_reducers.map((text, i) => (
      <div key={i} className="text-center text-xs text-onyx-400">{text}</div>
    ))}
  </div>
);

// Error state overlay for mobile screens
const MobileErrorOverlay = ({ layer, config }) => {
  const errors = LAYER_ERRORS[layer] || [];
  if (errors.length === 0) return null;
  
  return (
    <div className="px-5 py-4 space-y-3">
      <div className="bg-cerise-200 rounded-xl p-3 flex items-center gap-2">
        <AlertCircle size={18} className="text-cerise-700" />
        <span className="text-sm font-semibold text-cerise-700">Error States for {layer}</span>
      </div>
      {errors.map((err) => (
        <div key={err.id} className={`border rounded-xl p-3 ${
          err.severity === 'critical' ? 'border-cerise-500 bg-cerise-200' :
          err.severity === 'validation' ? 'border-orange-500 bg-orange-100' :
          err.severity === 'warning' ? 'border-orange-200 bg-orange-100' :
          'border-blue-200 bg-blue-200'
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              err.severity === 'critical' ? 'bg-cerise-700 text-white' :
              err.severity === 'validation' ? 'bg-orange-700 text-white' :
              err.severity === 'warning' ? 'bg-orange-500 text-white' :
              'bg-blue-700 text-white'
            }`}>{err.severity.toUpperCase()}</span>
            <span className="text-xs font-mono text-onyx-500">{err.id}</span>
          </div>
          <div className="font-medium text-sm text-onyx-800">{err.error}</div>
          <div className="text-xs text-onyx-600 mt-1">{err.message}</div>
        </div>
      ))}
    </div>
  );
};

// Loading state for mobile screens
const MobileLoadingState = () => (
  <div className="px-5 py-4 space-y-4">
    <div className="skeleton-shimmer h-6 w-3/4 rounded" />
    <div className="skeleton-shimmer h-4 w-1/2 rounded" />
    <div className="skeleton-shimmer h-32 w-full rounded-xl" />
    <div className="skeleton-shimmer h-24 w-full rounded-xl" />
    <div className="skeleton-shimmer h-20 w-full rounded-xl" />
    <div className="skeleton-shimmer h-12 w-full rounded-xl" />
  </div>
);

// Main Mobile Simulator Component
const MobileSimulator = ({ config, layers, comboId }) => {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [viewState, setViewState] = useState('default'); // default, error, loading
  const [showAnnotations, setShowAnnotations] = useState(false);
  
  const visibleLayers = useMemo(() => Object.entries(layers).filter(([_, v]) => v.show), [layers]);
  const activeLayer = visibleLayers[activeLayerIndex]?.[0] || 'L0';
  const activeLayerData = visibleLayers[activeLayerIndex]?.[1];
  const layerNames = visibleLayers.map(([l]) => LAYER_META[l]?.shortName || l);
  
  const content = useMemo(() => FlowEngine.getContentRequirements(config, activeLayer), [config, activeLayer]);
  const layerComponents = useMemo(() => FlowEngine.getLayerComponents(config, activeLayer), [config, activeLayer]);
  const decisions = FlowEngine.getLayerDecision(config, null);
  
  const renderScreen = () => {
    if (viewState === 'loading') return <MobileLoadingState />;
    if (viewState === 'error') return <MobileErrorOverlay layer={activeLayer} config={config} />;
    
    const props = { config, content, showAnnotations };
    switch(activeLayer) {
      case 'L0': return <MobileScreenL0 {...props} />;
      case 'L1': return <MobileScreenL1 {...props} />;
      case 'L2': return <MobileScreenL2 {...props} />;
      case 'L3': return <MobileScreenL3 {...props} />;
      case 'L4': return <MobileScreenL4 {...props} />;
      case 'L5': return <MobileScreenL5 {...props} />;
      case 'L6': return <MobileScreenL6 {...props} />;
      default: return <div className="p-5 text-onyx-500 text-center">Layer not available</div>;
    }
  };
  
  return (
    <div className="flex gap-8 items-start">
      {/* Phone Frame */}
      <div className="flex-shrink-0">
        {/* Controls above phone */}
        <div className="flex items-center justify-between mb-4 px-2" style={{ width: '375px' }}>
          <div className="flex gap-1">
            {[['default', 'Normal', Monitor], ['error', 'Errors', AlertTriangle], ['loading', 'Loading', Loader2]].map(([state, label, Icon]) => (
              <button key={state} onClick={() => setViewState(state)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${viewState === state ? 'bg-purple-600 text-white' : 'bg-onyx-200 text-onyx-600 hover:bg-onyx-300'}`}>
                <Icon size={12} />{label}
              </button>
            ))}
          </div>
          <button onClick={() => setShowAnnotations(!showAnnotations)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${showAnnotations ? 'bg-purple-600 text-white' : 'bg-onyx-200 text-onyx-600 hover:bg-onyx-300'}`}>
            <Tag size={12} />{showAnnotations ? 'Hide IDs' : 'Show IDs'}
          </button>
        </div>
        
        {/* Phone + Nav arrows */}
        <div className="flex items-center gap-3">
          <button onClick={() => setActiveLayerIndex(Math.max(0, activeLayerIndex - 1))}
            disabled={activeLayerIndex === 0}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeLayerIndex === 0 ? 'bg-onyx-200 text-onyx-400' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}>
            <ChevronLeft size={20} />
          </button>
          
          <div className="relative phone-shadow rounded-[44px]" style={{ width: '375px', height: '780px' }}>
            {/* Phone bezel */}
            <div className="absolute inset-0 bg-onyx-800 rounded-[44px]">
              {/* Dynamic Island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-onyx-800 rounded-full z-20" />
              
              {/* Screen */}
              <div className="absolute top-[8px] bottom-[8px] left-[8px] right-[8px] bg-white rounded-[38px] overflow-hidden flex flex-col">
                <PhoneStatusBar />
                <MobileProgressStepper totalSteps={visibleLayers.length} currentStep={activeLayerIndex} layerNames={layerNames} />
                
                {/* Screen content */}
                <div className="flex-1 overflow-y-auto mobile-scroll">
                  {renderScreen()}
                </div>
                
                {/* Home indicator */}
                <div className="flex justify-center py-2">
                  <div className="w-[134px] h-[5px] bg-onyx-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          
          <button onClick={() => setActiveLayerIndex(Math.min(visibleLayers.length - 1, activeLayerIndex + 1))}
            disabled={activeLayerIndex === visibleLayers.length - 1}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeLayerIndex === visibleLayers.length - 1 ? 'bg-onyx-200 text-onyx-400' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}>
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Layer dots */}
        <div className="flex justify-center gap-2 mt-4">
          {visibleLayers.map(([l], i) => (
            <button key={l} onClick={() => setActiveLayerIndex(i)}
              className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${i === activeLayerIndex ? 'bg-purple-600 text-white scale-110' : 'bg-onyx-200 text-onyx-600 hover:bg-onyx-300'}`}>
              {l.replace('L', '')}
            </button>
          ))}
        </div>
      </div>
      
      {/* Info Panel */}
      <div className="flex-1 min-w-0 space-y-4">
        {/* Layer Info */}
        <div className="acko-card p-5 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              activeLayerData?.type === 'view' ? 'bg-blue-200 text-blue-700' :
              activeLayerData?.type === 'decision' ? 'bg-orange-200 text-orange-700' :
              'bg-purple-200 text-purple-700'
            }`}>
              <span className="font-bold text-sm">{activeLayer}</span>
            </div>
            <div>
              <h3 className="font-bold text-onyx-800">{LAYER_META[activeLayer]?.name}</h3>
              <p className="text-xs text-onyx-500">{activeLayerData?.reason}</p>
            </div>
          </div>
          <div className="bg-purple-100 rounded-xl p-3">
            <div className="text-xs text-purple-600 font-semibold mb-1">CORE QUESTION</div>
            <div className="text-sm text-purple-800 font-medium italic">"{LAYER_META[activeLayer]?.question}"</div>
          </div>
          <div className="mt-3 flex gap-2">
            <span className={`px-2 py-1 rounded text-xs font-bold ${
              decisions[activeLayer] === 'V' ? 'bg-blue-200 text-blue-700' :
              decisions[activeLayer] === 'D' ? 'bg-orange-200 text-orange-700' :
              decisions[activeLayer] === 'S' ? 'bg-onyx-200 text-onyx-500' :
              'bg-purple-200 text-purple-700'
            }`}>
              {decisions[activeLayer] === 'V' ? 'View Only' : decisions[activeLayer] === 'D' ? 'Decision Required' : decisions[activeLayer] === 'S' ? 'Skipped' : 'Conditional'}
            </span>
            <span className="px-2 py-1 rounded text-xs bg-onyx-200 text-onyx-600">{LAYER_META[activeLayer]?.purpose}</span>
          </div>
        </div>
        
        {/* Active Components */}
        <div className="acko-card p-5 bg-white">
          <h4 className="font-semibold text-sm text-onyx-800 mb-3 flex items-center gap-2"><Layers size={16} className="text-purple-600" />Active Components ({layerComponents.length})</h4>
          <div className="space-y-2">
            {layerComponents.map((comp, i) => (
              <div key={i} className="flex items-center gap-3 p-2 bg-onyx-100 rounded-lg">
                <span className="px-2 py-1 bg-purple-200 text-purple-700 rounded text-[10px] font-bold">{comp.id}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-onyx-800 font-medium">{comp.name}</div>
                  <div className="text-[10px] text-onyx-500">Variant: {comp.variant} | State: {comp.state}</div>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  comp.priority === 'P0' ? 'bg-cerise-200 text-cerise-700' :
                  comp.priority === 'P0-FLEX' ? 'bg-orange-200 text-orange-700' :
                  'bg-onyx-200 text-onyx-600'
                }`}>{comp.priority}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Edge Cases */}
        <div className="acko-card p-5 bg-white">
          <h4 className="font-semibold text-sm text-onyx-800 mb-3 flex items-center gap-2"><AlertTriangle size={16} className="text-orange-500" />Edge Cases & Exceptions</h4>
          <div className="space-y-2">
            {(LAYER_EDGE_CASES[activeLayer] || []).map((ec, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-onyx-700 p-2 bg-orange-100 rounded-lg">
                <AlertTriangle size={14} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <span>{ec}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Error States */}
        <div className="acko-card p-5 bg-white">
          <h4 className="font-semibold text-sm text-onyx-800 mb-3 flex items-center gap-2"><AlertCircle size={16} className="text-cerise-500" />Possible Error States</h4>
          <div className="space-y-2">
            {(LAYER_ERRORS[activeLayer] || []).map((err) => (
              <div key={err.id} className="p-2 bg-onyx-100 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white ${
                    err.severity === 'critical' ? 'bg-cerise-700' :
                    err.severity === 'validation' ? 'bg-orange-700' :
                    err.severity === 'warning' ? 'bg-orange-500' :
                    'bg-blue-700'
                  }`}>{err.severity}</span>
                  <span className="text-xs font-mono text-onyx-400">{err.id}</span>
                </div>
                <div className="text-sm font-medium text-onyx-800 mt-1">{err.error}</div>
                <div className="text-xs text-onyx-500 mt-0.5">{err.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CONFIG FORM (existing, kept for Form input mode)
// ============================================================================
const ConfigForm = ({ onConfigChange }) => {
  const [customConfig, setCustomConfig] = useState({
    construct: 'VANILLA', base: 'fixed', topUp: null, secondary: null, addOns: null,
    basePay: 'employer', topUpPay: null, secPay: null, addOnPay: null,
    minPart: false, preEnroll: false, cdCheck: false, gradeBased: false
  });
  
  const handleChange = (field, value) => {
    const newConfig = { ...customConfig, [field]: value };
    setCustomConfig(newConfig);
    onConfigChange(newConfig, 'CUSTOM');
  };
  
  return (
    <div className="acko-card p-6 bg-white">
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-onyx-800"><Settings size={20} className="text-purple-600" />Custom Configuration</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div><label className="block text-xs font-medium text-onyx-500 mb-1">Construct</label><select value={customConfig.construct} onChange={(e) => handleChange('construct', e.target.value)} className="acko-input"><option value="VANILLA">VANILLA</option><option value="MODULAR">MODULAR</option><option value="FLEX">FLEX</option></select></div>
        <div><label className="block text-xs font-medium text-onyx-500 mb-1">Base Plan</label><select value={customConfig.base} onChange={(e) => handleChange('base', e.target.value)} className="acko-input"><option value="fixed">Fixed</option><option value="tiered">Tiered</option><option value="wallet">Wallet</option><option value="wallet-si">Wallet + SI</option><option value="wallet-family">Wallet + Family</option></select></div>
        <div><label className="block text-xs font-medium text-onyx-500 mb-1">Top-up</label><select value={customConfig.topUp || ''} onChange={(e) => handleChange('topUp', e.target.value || null)} className="acko-input"><option value="">None</option><option value="standard">Standard</option><option value="modular">Modular</option><option value="consolidated">Consolidated</option></select></div>
        <div><label className="block text-xs font-medium text-onyx-500 mb-1">Secondary</label><select value={customConfig.secondary || ''} onChange={(e) => handleChange('secondary', e.target.value || null)} className="acko-input"><option value="">None</option><option value="single">Single</option><option value="multi">Multiple</option><option value="si-variants">SI Variants</option></select></div>
        <div><label className="block text-xs font-medium text-onyx-500 mb-1">Add-ons</label><select value={customConfig.addOns || ''} onChange={(e) => handleChange('addOns', e.target.value || null)} className="acko-input"><option value="">None</option><option value="available">Available</option><option value="wellness">Wellness</option></select></div>
        <div><label className="block text-xs font-medium text-onyx-500 mb-1">Base Payment</label><select value={customConfig.basePay} onChange={(e) => handleChange('basePay', e.target.value)} className="acko-input"><option value="employer">Employer</option><option value="employee">Employee</option><option value="partial">Partial</option><option value="wallet">Wallet</option><option value="wallet-employee">Wallet + Employee</option></select></div>
        <div className="col-span-2 md:col-span-3">
          <label className="block text-xs font-medium text-onyx-500 mb-2">System Flags</label>
          <div className="flex flex-wrap gap-4">
            {[{ key: 'minPart', label: 'Min Participation' }, { key: 'preEnroll', label: 'Pre-Enrollment' }, { key: 'cdCheck', label: 'CD Balance Check' }, { key: 'gradeBased', label: 'Grade-Based' }].map(flag => (
              <label key={flag.key} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={customConfig[flag.key]} onChange={(e) => handleChange(flag.key, e.target.checked)} className="w-4 h-4 text-purple-600 rounded" />
                <span className="text-sm text-onyx-700">{flag.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const JsonUpload = ({ onConfigLoad }) => {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState(null);
  
  return (
    <div className="acko-card p-6 bg-white">
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-onyx-800"><Upload size={20} className="text-purple-600" />Import JSON</h3>
      <textarea value={jsonText} onChange={(e) => setJsonText(e.target.value)}
        placeholder={`Paste JSON config here...\n\n${JSON.stringify(POLICY_COMBINATIONS.V11, null, 2)}`}
        className="w-full h-48 px-4 py-3 border border-onyx-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-purple-200 focus:border-purple-600 resize-none focus:outline-none" />
      {error && <div className="mt-2 text-cerise-500 text-sm flex items-center gap-2"><AlertCircle size={16} />{error}</div>}
      <button onClick={() => { try { onConfigLoad(JSON.parse(jsonText), 'JSON'); setError(null); } catch { setError('Invalid JSON'); } }}
        className="mt-4 acko-btn bg-purple-600 text-white hover:bg-purple-700 px-6">Parse & Load</button>
    </div>
  );
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
export default function GMCFlowEngineSimulator() {
  const [selectedCombo, setSelectedCombo] = useState('V01');
  const [inputMode, setInputMode] = useState('rfq'); // 'rfq', 'preset', 'form', 'json'
  const [analysisTab, setAnalysisTab] = useState('flow'); // 'flow', 'mobile', 'components', 'content'
  const [customConfig, setCustomConfig] = useState(null);
  const [rfqMatches, setRfqMatches] = useState(null);
  
  const currentConfig = useMemo(() => {
    if (inputMode === 'preset' || inputMode === 'rfq') {
      return POLICY_COMBINATIONS[selectedCombo];
    }
    return customConfig || POLICY_COMBINATIONS.V01;
  }, [selectedCombo, inputMode, customConfig]);
  
  const layers = useMemo(() => FlowEngine.getLayerVisibility(currentConfig), [currentConfig]);
  const scenarios = useMemo(() => FlowEngine.generateTestScenarios(currentConfig, selectedCombo), [currentConfig, selectedCombo]);
  
  const handleConfigChange = (config, source) => {
    setCustomConfig(config);
    if (source === 'CUSTOM' || source === 'JSON') { setInputMode('form'); }
  };
  
  const handleRFQSelect = useCallback((comboId) => {
    setSelectedCombo(comboId);
    setInputMode('rfq');
  }, []);
  
  const comboGroups = useMemo(() => {
    const groups = { VANILLA: [], MODULAR: [], FLEX: [] };
    Object.entries(POLICY_COMBINATIONS).forEach(([id, config]) => {
      groups[config.construct].push({ id, ...config });
    });
    return groups;
  }, []);
  
  return (
    <>
      <style>{ackoStyles}</style>
      <div className="min-h-screen bg-onyx-200">
        {/* Header */}
        <header className="bg-onyx-100 border-b border-onyx-300 sticky top-0 z-50 shadow-sm">
          <div className="max-w-[1600px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-onyx-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
                    <GitBranch className="text-white" size={22} />
                  </div>
                  GMC Flow Engine Simulator
                </h1>
                <p className="text-onyx-500 text-sm mt-1">RFQ-driven policy flow analysis with mobile UI preview</p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-onyx-500">Input:</span>
                <div className="flex bg-onyx-200 rounded-lg p-1">
                  {[
                    { id: 'rfq', label: 'RFQ Match', icon: Search },
                    { id: 'preset', label: 'Presets', icon: List },
                    { id: 'form', label: 'Form', icon: Settings },
                    { id: 'json', label: 'JSON', icon: Upload },
                  ].map(mode => (
                    <button key={mode.id} onClick={() => setInputMode(mode.id)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-1.5 ${
                        inputMode === mode.id ? 'bg-white text-purple-700 shadow-sm' : 'text-onyx-600 hover:text-onyx-800'
                      }`}>
                      <mode.icon size={14} />{mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="max-w-[1600px] mx-auto px-6 py-8">
          {/* Input Section */}
          <div className="mb-8">
            {inputMode === 'rfq' && (
              <RFQBuilder onSelectCombo={handleRFQSelect} onMatchResults={setRfqMatches} />
            )}
            
            {inputMode === 'preset' && (
              <div className="acko-card p-6 bg-white">
                <h3 className="font-semibold mb-4 text-onyx-800">Select Policy Combination</h3>
                <div className="grid grid-cols-3 gap-6">
                  {Object.entries(comboGroups).map(([construct, combos]) => (
                    <div key={construct}>
                      <div className={`text-sm font-bold mb-2 px-3 py-1 rounded-lg inline-block ${
                        construct === 'VANILLA' ? 'bg-green-200 text-green-700' :
                        construct === 'MODULAR' ? 'bg-orange-200 text-orange-700' :
                        'bg-purple-200 text-purple-700'
                      }`}>{construct} ({combos.length})</div>
                      <div className="space-y-1 max-h-64 overflow-y-auto pr-2">
                        {combos.map(combo => (
                          <button key={combo.id} onClick={() => setSelectedCombo(combo.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                              selectedCombo === combo.id ? 'bg-purple-100 text-purple-700 font-medium' : 'hover:bg-onyx-100 text-onyx-700'
                            }`}>
                            <span className="font-mono font-bold">{combo.id}</span>
                            <span className="text-onyx-500 ml-2">{combo.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {inputMode === 'form' && <ConfigForm onConfigChange={handleConfigChange} />}
            {inputMode === 'json' && <JsonUpload onConfigLoad={handleConfigChange} />}
          </div>
          
          {/* Current Selection Banner */}
          <div className="mb-8 p-6 bg-white border border-purple-200 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <div className="text-sm text-onyx-500 mb-1">Currently Analyzing</div>
                <div className="text-2xl font-bold text-onyx-800 flex items-center gap-3">
                  {inputMode === 'form' || inputMode === 'json' ? 'Custom Configuration' : selectedCombo}
                  <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                    currentConfig.construct === 'VANILLA' ? 'bg-green-200 text-green-700' :
                    currentConfig.construct === 'MODULAR' ? 'bg-orange-200 text-orange-700' :
                    'bg-purple-200 text-purple-700'
                  }`}>{currentConfig.construct}</span>
                  <span className="text-lg font-normal text-onyx-500">{currentConfig.name || ''}</span>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="text-center"><div className="text-3xl font-bold text-purple-600">{Object.values(layers).filter(l => l.show).length}</div><div className="text-xs text-onyx-500 font-medium uppercase tracking-wide">Layers</div></div>
                <div className="text-center"><div className="text-3xl font-bold text-purple-600">{scenarios.length}</div><div className="text-xs text-onyx-500 font-medium uppercase tracking-wide">Test Cases</div></div>
                <div className="text-center"><div className="text-3xl font-bold text-purple-600">{Object.values(FlowEngine.getLayerDecision(currentConfig, null)).filter(v => v === 'D').length}</div><div className="text-xs text-onyx-500 font-medium uppercase tracking-wide">Decisions</div></div>
              </div>
            </div>
          </div>
          
          {/* Analysis Tabs */}
          <div className="mb-6">
            <div className="flex bg-onyx-100 rounded-xl p-1.5 border border-onyx-300">
              {[
                { id: 'flow', label: 'Flow Overview', icon: GitBranch },
                { id: 'mobile', label: 'Mobile Preview', icon: Smartphone },
                { id: 'components', label: 'Components & Tests', icon: List },
                { id: 'content', label: 'Content & Export', icon: FileText },
              ].map(tab => (
                <button key={tab.id} onClick={() => setAnalysisTab(tab.id)}
                  className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                    analysisTab === tab.id ? 'bg-white text-purple-700 shadow-md' : 'text-onyx-600 hover:text-onyx-800'
                  }`}>
                  <tab.icon size={16} />{tab.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="tab-content">
            {analysisTab === 'flow' && (
              <div className="space-y-8">
                <FlowDiagram layers={layers} config={currentConfig} />
                <DecisionMatrix config={currentConfig} layers={layers} />
              </div>
            )}
            
            {analysisTab === 'mobile' && (
              <div className="acko-card p-6 bg-white">
                <h3 className="font-semibold mb-6 flex items-center gap-2 text-onyx-800">
                  <Smartphone size={20} className="text-purple-600" />
                  Mobile UI Preview — {selectedCombo} ({currentConfig.construct})
                </h3>
                <MobileSimulator config={currentConfig} layers={layers} comboId={selectedCombo} />
              </div>
            )}
            
            {analysisTab === 'components' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ComponentChecklist config={currentConfig} layers={layers} />
                <TestScenarios scenarios={scenarios} />
              </div>
            )}
            
            {analysisTab === 'content' && (
              <div className="space-y-8">
                <ContentRequirements config={currentConfig} layers={layers} />
                <ExportPanel config={currentConfig} comboId={inputMode === 'preset' || inputMode === 'rfq' ? selectedCombo : 'CUSTOM'} layers={layers} scenarios={scenarios} />
              </div>
            )}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-onyx-100 border-t border-onyx-300 py-6 mt-12">
          <div className="max-w-[1600px] mx-auto px-6 text-center text-onyx-500 text-sm">
            GMC Flow Engine Simulator v2.0 | All 52 combinations | RFQ Matching + Mobile Preview + Flow Analysis
          </div>
        </footer>
      </div>
    </>
  );
}
