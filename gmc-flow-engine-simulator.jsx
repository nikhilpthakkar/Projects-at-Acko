import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ChevronRight, ChevronDown, ChevronLeft, AlertCircle, Upload, Play, Download, Eye, List, GitBranch, FileText, Settings, Users, CreditCard, Shield, Heart, CheckCircle2, Circle, ArrowRight, ArrowLeft, Info, Search, Smartphone, Layers, Zap, X, AlertTriangle, Loader2, ToggleLeft, ToggleRight, Tag, Hash, Wallet, Star, Target, Clock, Phone, Monitor, ChevronUp, Plus, Minus, Trash2, PartyPopper, RefreshCw } from 'lucide-react';

// ============================================================================
// ACKO DESIGN SYSTEM CSS + MOBILE SIMULATOR CSS
// ============================================================================
const ackoStyles = `
  @font-face { font-family: 'Euclid Circular B'; src: url('https://pub-c050457d48794d5bb9ffc2b4649de2c1.r2.dev/Euclid%20Font/EuclidCircularB-Regular.otf') format('opentype'); font-weight: 400; }
  @font-face { font-family: 'Euclid Circular B'; src: url('https://pub-c050457d48794d5bb9ffc2b4649de2c1.r2.dev/Euclid%20Font/EuclidCircularB-Medium.otf') format('opentype'); font-weight: 500; }
  @font-face { font-family: 'Euclid Circular B'; src: url('https://pub-c050457d48794d5bb9ffc2b4649de2c1.r2.dev/Euclid%20Font/EuclidCircularB-Semibold.otf') format('opentype'); font-weight: 600; }
  @font-face { font-family: 'Euclid Circular B'; src: url('https://pub-c050457d48794d5bb9ffc2b4649de2c1.r2.dev/Euclid%20Font/EuclidCircularB-Bold.otf') format('opentype'); font-weight: 700; }
  :root {
    --purple-800:#18084A;--purple-700:#2E1773;--purple-600:#4E29BB;--purple-500:#926FF3;--purple-400:#B59CF5;--purple-300:#D1C5FA;--purple-200:#ECEBFF;--purple-100:#F8F7FD;
    --onyx-800:#0A0A0A;--onyx-700:#121212;--onyx-600:#2F2F2F;--onyx-500:#5D5D5D;--onyx-400:#B0B0B0;--onyx-300:#E7E7E7;--onyx-200:#F6F6F6;--onyx-100:#FFFFFF;
    --green-700:#1C772C;--green-600:#149A40;--green-500:#55B94D;--green-200:#DAFAD7;--green-100:#F3FFF2;
    --orange-700:#B15A08;--orange-500:#F4A024;--orange-200:#FFEDC5;--orange-100:#FFF8E7;
    --cerise-700:#981950;--cerise-500:#EC5FAB;--cerise-200:#FCE7F4;
    --blue-700:#006A97;--blue-500:#1EB7E7;--blue-200:#DEF7FF;
    --shadow-sm:0 1px 2px rgba(10,10,10,0.05);--shadow-md:0 4px 6px -1px rgba(10,10,10,0.07),0 2px 4px -2px rgba(10,10,10,0.05);--shadow-lg:0 10px 15px -3px rgba(10,10,10,0.08),0 4px 6px -4px rgba(10,10,10,0.05);
  }
  body { font-family:'Euclid Circular B',-apple-system,BlinkMacSystemFont,sans-serif; -webkit-font-smoothing:antialiased; background:var(--onyx-200); color:var(--onyx-800); }
  .acko-card { background:white; border:1px solid var(--onyx-300); border-radius:12px; transition:box-shadow 0.2s; }
  .acko-card:hover { box-shadow:var(--shadow-md); }
  .acko-btn { height:40px; border-radius:8px; font-weight:500; display:inline-flex; align-items:center; justify-content:center; transition:all 0.2s; cursor:pointer; }
  .acko-input { height:44px; border-radius:8px; border:1px solid var(--onyx-300); padding:0 16px; width:100%; font-size:14px; }
  .acko-input:focus { outline:none; border-color:var(--purple-600); box-shadow:0 0 0 2px var(--purple-200); }
  .toggle-track { width:44px; height:24px; border-radius:12px; position:relative; cursor:pointer; transition:background 0.2s; }
  .toggle-track.on { background:var(--purple-600); }
  .toggle-track.off { background:var(--onyx-300); }
  .toggle-thumb { width:20px; height:20px; border-radius:50%; background:white; position:absolute; top:2px; transition:left 0.2s; box-shadow:0 1px 3px rgba(0,0,0,0.2); }
  .toggle-track.on .toggle-thumb { left:22px; }
  .toggle-track.off .toggle-thumb { left:2px; }
`;

// ============================================================================
// POLICY COMBINATIONS DATA (v3 - 51 combos: 20V + 11M + 20F)
// ============================================================================
const POLICY_COMBINATIONS = {
  V01:{construct:'VANILLA',base:'fixed',topUp:null,secondary:null,secTopUp:null,addOns:null,basePay:'employer',topUpPay:null,secPay:null,addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:false,gradeBased:false,eCard:'yes',name:'Base only (employer-paid)'},
  V02:{construct:'VANILLA',base:'fixed',topUp:'standard',secondary:null,secTopUp:null,addOns:null,basePay:'employer',topUpPay:'employer',secPay:null,addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:false,gradeBased:false,eCard:'yes',name:'Base + Top-up (all employer)'},
  V03:{construct:'VANILLA',base:'fixed',topUp:'standard',secondary:null,secTopUp:null,addOns:null,basePay:'employer',topUpPay:'employee',secPay:null,addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Base + Top-up (employee-paid)'},
  V04:{construct:'VANILLA',base:'fixed',topUp:null,secondary:'single',secTopUp:null,addOns:null,basePay:'employer',topUpPay:null,secPay:'employer',addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:false,gradeBased:false,eCard:'yes',name:'Base + Secondary (employer)'},
  V05:{construct:'VANILLA',base:'fixed',topUp:null,secondary:'single',secTopUp:null,addOns:null,basePay:'employer',topUpPay:null,secPay:'employee',addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Base + Secondary (employee)'},
  V06:{construct:'VANILLA',base:'fixed',topUp:'standard',secondary:'single',secTopUp:null,addOns:null,basePay:'employer',topUpPay:'employee',secPay:'employee',addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Full voluntary enhancements'},
  V07:{construct:'VANILLA',base:'fixed',topUp:'standard',secondary:'single',secTopUp:'standard',addOns:null,basePay:'employer',topUpPay:'employee',secPay:'employee',addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'With secondary top-ups'},
  V08:{construct:'VANILLA',base:'fixed',topUp:null,secondary:null,secTopUp:null,addOns:'available',basePay:'employer',topUpPay:null,secPay:null,addOnPay:'employer',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:false,gradeBased:false,eCard:'yes',name:'Base + Add-ons (employer)'},
  V09:{construct:'VANILLA',base:'fixed',topUp:null,secondary:null,secTopUp:null,addOns:'available',basePay:'employer',topUpPay:null,secPay:null,addOnPay:'employee',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Base + Add-ons (employee)'},
  V10:{construct:'VANILLA',base:'fixed',topUp:'standard',secondary:null,secTopUp:null,addOns:'available',basePay:'employer',topUpPay:'employee',secPay:null,addOnPay:'employee',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Top-up + Add-ons'},
  V11:{construct:'VANILLA',base:'fixed',topUp:'standard',secondary:'single',secTopUp:null,addOns:'available',basePay:'employer',topUpPay:'employee',secPay:'employee',addOnPay:'employee',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Full voluntary stack'},
  V12:{construct:'VANILLA',base:'fixed',topUp:'standard',secondary:'single',secTopUp:'standard',addOns:'available',basePay:'employer',topUpPay:'employee',secPay:'employee',addOnPay:'employee',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Maximum configuration'},
  V13:{construct:'VANILLA',base:'fixed',topUp:'consolidated',secondary:'single',secTopUp:null,addOns:null,basePay:'employer',topUpPay:'employee',secPay:'employee',addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Consolidated top-up'},
  V14:{construct:'VANILLA',base:'fixed',topUp:'consolidated',secondary:'single',secTopUp:null,addOns:'available',basePay:'employer',topUpPay:'employee',secPay:'employee',addOnPay:'employee',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Consolidated + add-ons'},
  V15:{construct:'VANILLA',base:'fixed',topUp:'standard',secondary:null,secTopUp:null,addOns:null,basePay:'partial',topUpPay:'employee',secPay:null,addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Partial base payment'},
  V16:{construct:'VANILLA',base:'fixed',topUp:'standard',secondary:'single',secTopUp:null,addOns:null,basePay:'employer',topUpPay:'employer',secPay:'employer',addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:false,gradeBased:false,eCard:'yes',name:'All employer-paid'},
  V17:{construct:'VANILLA',base:'fixed',topUp:null,secondary:'multi',secTopUp:null,addOns:null,basePay:'employer',topUpPay:null,secPay:'employee',addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Multiple secondary options'},
  V18:{construct:'VANILLA',base:'fixed',topUp:null,secondary:'si-variants',secTopUp:null,addOns:null,basePay:'employer',topUpPay:null,secPay:'employee',addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Secondary with SI selection'},
  V19:{construct:'VANILLA',base:'fixed',topUp:'standard',secondary:null,secTopUp:null,addOns:'available',basePay:'employer',topUpPay:'partial',secPay:null,addOnPay:'partial',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Subsidized options'},
  V20:{construct:'VANILLA',base:'fixed',topUp:'standard',secondary:'single',secTopUp:'standard',addOns:'available',basePay:'employer',topUpPay:'employee',secPay:'employee',addOnPay:'employee',minPart:true,minPart_topUp:true,minPart_secondary:true,minPart_addOns:true,preEnroll:true,cdCheck:true,gradeBased:true,eCard:'pending',name:'Pre-enrollment full config'},
  M01:{construct:'MODULAR',base:'tier-selectable',topUp:null,secondary:null,secTopUp:null,addOns:null,basePay:'employer',topUpPay:null,secPay:null,addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:false,gradeBased:false,eCard:'yes',name:'View assigned tier only (no upgrade)'},
  M02:{construct:'MODULAR',base:'tier-selectable',topUp:'tier-upgrade',secondary:null,secTopUp:null,addOns:null,basePay:'employer',topUpPay:'employee',secPay:null,addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Tier upgrade'},
  M03:{construct:'MODULAR',base:'tier-selectable',topUp:'tier-upgrade',secondary:null,secTopUp:null,addOns:'available',basePay:'employer',topUpPay:'employee',secPay:null,addOnPay:'employee',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Tier upgrade + add-ons'},
  M04:{construct:'MODULAR',base:'tier-selectable',topUp:'tier-upgrade',secondary:'single',secTopUp:null,addOns:null,basePay:'employer',topUpPay:'employee',secPay:'employee',addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Modular + secondary'},
  M05:{construct:'MODULAR',base:'tier-selectable',topUp:'tier-upgrade',secondary:'single',secTopUp:null,addOns:'available',basePay:'employer',topUpPay:'employee',secPay:'employee',addOnPay:'employee',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Full modular stack'},
  M06:{construct:'MODULAR',base:'tier-selectable',topUp:'tier-upgrade',secondary:'single',secTopUp:'standard',addOns:'available',basePay:'employer',topUpPay:'employee',secPay:'employee',addOnPay:'employee',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Max modular config'},
  M07:{construct:'MODULAR',base:'tier-selectable',topUp:null,secondary:null,secTopUp:null,addOns:'available',basePay:'employer',topUpPay:null,secPay:null,addOnPay:'employee',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Modular view-only + add-ons (no tier upgrade)'},
  M08:{construct:'MODULAR',base:'tier-selectable',topUp:'tier-upgrade',secondary:null,secTopUp:null,addOns:null,basePay:'partial',topUpPay:'employee',secPay:null,addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Partial employer contribution'},
  M09:{construct:'MODULAR',base:'tier-selectable',topUp:'tier-upgrade',secondary:null,secTopUp:null,addOns:null,basePay:'employer',topUpPay:'employee',secPay:null,addOnPay:null,minPart:true,minPart_topUp:true,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'pending',name:'Modular with min participation'},
  M10:{construct:'MODULAR',base:'tier-selectable',topUp:'tier-upgrade',secondary:'single',secTopUp:null,addOns:'available',basePay:'employer',topUpPay:'employee',secPay:'employee',addOnPay:'employee',minPart:true,minPart_topUp:true,minPart_secondary:true,minPart_addOns:true,preEnroll:true,cdCheck:true,gradeBased:true,eCard:'pending',name:'Pre-enrollment modular'},
  M11:{construct:'MODULAR',base:'tier-selectable-grade',topUp:'tier-upgrade',secondary:null,secTopUp:null,addOns:null,basePay:'employer',topUpPay:'employee',secPay:null,addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:true,eCard:'conditional',name:'Grade-based tier eligibility'},
  F01:{construct:'FLEX',base:'base-variable',topUp:null,secondary:null,secTopUp:null,addOns:null,basePay:'wallet',topUpPay:null,secPay:null,addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'yes',name:'Basic wallet'},
  F02:{construct:'FLEX',base:'base-variable',topUp:null,secondary:null,secTopUp:null,addOns:'available',basePay:'wallet',topUpPay:null,secPay:null,addOnPay:'wallet',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'yes',name:'Wallet + Add-ons'},
  F03:{construct:'FLEX',base:'base-variable',topUp:null,secondary:null,secTopUp:null,addOns:null,basePay:'wallet',topUpPay:null,secPay:null,addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'SI selection'},
  F04:{construct:'FLEX',base:'base-variable',topUp:null,secondary:null,secTopUp:null,addOns:null,basePay:'wallet',topUpPay:null,secPay:null,addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Family definition'},
  F05:{construct:'FLEX',base:'base-variable',topUp:null,secondary:null,secTopUp:null,addOns:null,basePay:'wallet',topUpPay:null,secPay:null,addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'SI + Family config'},
  F06:{construct:'FLEX',base:'base-fixed',topUp:'standard',secondary:null,secTopUp:null,addOns:null,basePay:'wallet',topUpPay:'wallet-employee',secPay:null,addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Base Fixed + Flex Top-up'},
  F07:{construct:'FLEX',base:'base-fixed',topUp:null,secondary:'single',secTopUp:null,addOns:null,basePay:'wallet',topUpPay:null,secPay:'wallet-employee',addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Base Fixed + Secondary'},
  F08:{construct:'FLEX',base:'base-fixed',topUp:'standard',secondary:'single',secTopUp:null,addOns:null,basePay:'wallet',topUpPay:'wallet-employee',secPay:'wallet-employee',addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Base Fixed + Top-up + Secondary'},
  F09:{construct:'FLEX',base:'base-fixed',topUp:'standard',secondary:'single',secTopUp:null,addOns:'available',basePay:'wallet',topUpPay:'wallet-employee',secPay:'wallet-employee',addOnPay:'wallet-employee',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Full flex stack'},
  F10:{construct:'FLEX',base:'base-fixed',topUp:'standard',secondary:'single',secTopUp:'standard',addOns:'available',basePay:'wallet',topUpPay:'wallet-employee',secPay:'wallet-employee',addOnPay:'wallet-employee',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Maximum flex config'},
  F11:{construct:'FLEX',base:'base-variable',topUp:null,secondary:null,secTopUp:null,addOns:'available',basePay:'wallet',topUpPay:null,secPay:null,addOnPay:'wallet',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'yes',name:'Custom wallet'},
  F12:{construct:'FLEX',base:'base-variable',topUp:null,secondary:null,secTopUp:null,addOns:null,basePay:'wallet-employee',topUpPay:null,secPay:null,addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Upgrade beyond wallet'},
  F13:{construct:'FLEX',base:'base-variable',topUp:null,secondary:null,secTopUp:null,addOns:'available',basePay:'wallet',topUpPay:null,secPay:null,addOnPay:'wallet',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Downgrade + realloc'},
  F14:{construct:'FLEX',base:'base-variable',topUp:null,secondary:null,secTopUp:null,addOns:null,basePay:'wallet',topUpPay:null,secPay:null,addOnPay:null,minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Cover variants'},
  F15:{construct:'FLEX',base:'base-variable',topUp:null,secondary:'multi',secTopUp:null,addOns:'available',basePay:'wallet',topUpPay:null,secPay:'wallet-employee',addOnPay:'wallet-employee',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Multi secondary'},
  F16:{construct:'FLEX',base:'base-fixed',topUp:'consolidated',secondary:'single',secTopUp:null,addOns:'available',basePay:'wallet',topUpPay:'wallet-employee',secPay:'wallet-employee',addOnPay:'wallet-employee',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'conditional',name:'Consolidated top-up'},
  F17:{construct:'FLEX',base:'base-fixed',topUp:null,secondary:null,secTopUp:null,addOns:'available',basePay:'wallet',topUpPay:null,secPay:null,addOnPay:'wallet',minPart:true,minPart_topUp:false,minPart_secondary:false,minPart_addOns:true,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'pending',name:'Min participation'},
  F18:{construct:'FLEX',base:'base-fixed',topUp:'standard',secondary:'single',secTopUp:null,addOns:'available',basePay:'wallet',topUpPay:'wallet-employee',secPay:'wallet-employee',addOnPay:'wallet-employee',minPart:true,minPart_topUp:true,minPart_secondary:true,minPart_addOns:true,preEnroll:true,cdCheck:true,gradeBased:true,eCard:'pending',name:'Pre-enrollment flex'},
  F19:{construct:'FLEX',base:'base-fixed',topUp:null,secondary:null,secTopUp:null,addOns:'available',basePay:'wallet',topUpPay:null,secPay:null,addOnPay:'wallet',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:true,eCard:'conditional',name:'Grade-based wallet'},
  F20:{construct:'FLEX',base:'base-fixed',topUp:null,secondary:null,secTopUp:null,addOns:'wellness',basePay:'wallet',topUpPay:null,secPay:null,addOnPay:'wallet',minPart:false,minPart_topUp:false,minPart_secondary:false,minPart_addOns:false,preEnroll:false,cdCheck:true,gradeBased:false,eCard:'yes',name:'Wellness wallet'},
};

// ============================================================================
// UI COMPONENTS REGISTRY
// ============================================================================
const UI_COMPONENTS = {
  C01:{id:'C01',name:'Progress Stepper',layer:'ALL',priority:'P0'},C02:{id:'C02',name:'Coverage Card',layer:'L1,L3,L4',priority:'P0'},
  C03:{id:'C03',name:'Plan Selector',layer:'L3',priority:'P0'},C04:{id:'C04',name:'Member Card',layer:'L2,L6',priority:'P0'},
  C05:{id:'C05',name:'Member Form',layer:'L2',priority:'P0'},C06:{id:'C06',name:'Premium Calculator',layer:'L3,L4,L5',priority:'P0'},
  C07:{id:'C07',name:'Add-on Card',layer:'L4',priority:'P1'},C08:{id:'C08',name:'Top-up Card',layer:'L4',priority:'P1'},
  C09:{id:'C09',name:'Secondary Plan Card',layer:'L4',priority:'P1'},C10:{id:'C10',name:'Wallet Display',layer:'L1,L3,L4,L5',priority:'P0-FLEX'},
  C11:{id:'C11',name:'Consent Checkbox',layer:'L6',priority:'P0'},C12:{id:'C12',name:'Review Summary',layer:'L6',priority:'P0'},
  C13:{id:'C13',name:'Success Screen',layer:'POST',priority:'P0'},C14:{id:'C14',name:'Tooltip/Info',layer:'ALL',priority:'P1'},
  C15:{id:'C15',name:'Error Message',layer:'ALL',priority:'P0'},C16:{id:'C16',name:'Loading State',layer:'ALL',priority:'P1'},
  C17:{id:'C17',name:'Comparison Table',layer:'L3,L4',priority:'P1'},
};

// ============================================================================
// LAYER METADATA + ERRORS + EDGE CASES
// ============================================================================
const LAYER_META = {
  L0:{name:'Context & Welcome',shortName:'Welcome',question:'What am I about to do?',purpose:'Set expectations, reduce anxiety'},
  L1:{name:'Base Coverage View',shortName:'Coverage',question:'What protection do I already have?',purpose:'Show employer coverage, build trust'},
  L2:{name:'Family Configuration',shortName:'Family',question:'Who is covered?',purpose:'Capture/confirm family members'},
  L3:{name:'Plan Selection',shortName:'Plans',question:'What level of coverage do I want?',purpose:'Choose/upgrade plan configuration'},
  L4:{name:'Enhancement Options',shortName:'Enhance',question:'What additional protection?',purpose:'Offer top-ups, secondary, add-ons'},
  L5:{name:'Premium & Payment',shortName:'Payment',question:'How much will I pay?',purpose:'Show cost breakdown, payment method'},
  L6:{name:'Review & Consent',shortName:'Review',question:'Is everything correct?',purpose:'Final confirmation, legal consent'},
};

const LAYER_ERRORS = {
  L0:[{id:'E-L0-01',error:'Session expired',message:'Please refresh to continue.',severity:'critical'},{id:'E-L0-02',error:'Incomplete enrollment',message:'Complete all steps to confirm your enrollment',severity:'info'}],
  L1:[{id:'E-L1-01',error:'Policy data unavailable',message:'Unable to load coverage details.',severity:'critical'}],
  L2:[{id:'E-L2-01',error:'DOB required',message:'Date of birth is required',severity:'validation'},{id:'E-L2-02',error:'Max dependents',message:'Maximum dependents reached',severity:'warning'},{id:'E-L2-03',error:'Age limit',message:'Parent age exceeds limit (80 years)',severity:'validation'},{id:'E-L2-04',error:'Dependent selection required',message:'Please select which dependents to cover',severity:'info'},{id:'E-L2-05',error:'Parent inline premium',message:'Parents not in base — additional premium applies',severity:'info'}],
  L3:[{id:'E-L3-01',error:'Selection required',message:'Please select a plan to continue',severity:'validation'},{id:'E-L3-02',error:'Wallet exceeded',message:'Selections exceed wallet balance',severity:'warning'},{id:'E-L3-03',error:'Grade restriction',message:'Not available for your grade',severity:'blocking'},{id:'E-L3-04',error:'Downgrade warning',message:'Selecting a lower plan reduces your coverage',severity:'warning'}],
  L4:[{id:'E-L4-01',error:'Eligibility failed',message:'Add-on requires base SI ≥ ₹7L',severity:'blocking'},{id:'E-L4-02',error:'Premium calc failed',message:'Unable to calculate premium',severity:'critical'},{id:'E-L4-03',error:'Parental coverage flagged',message:'Parental coverage added from L2 family config',severity:'info'}],
  L5:[{id:'E-L5-01',error:'CD balance insufficient',message:'E-card may be delayed',severity:'warning'},{id:'E-L5-02',error:'Wallet overflow',message:'Consent for salary deduction required',severity:'warning'},{id:'E-L5-03',error:'Subsidy display',message:'Subsidized by employer',severity:'info'}],
  L6:[{id:'E-L6-01',error:'Consent required',message:'Accept terms to proceed',severity:'validation'},{id:'E-L6-02',error:'Submission failed',message:'Unable to submit. Please retry.',severity:'critical'},{id:'E-L6-03',error:'Min participation pending',message:'E-card pending threshold',severity:'info'},{id:'E-L6-04',error:'Min part (component)',message:'Component-level min participation pending',severity:'info'}],
};

const LAYER_EDGE_CASES = {
  L0:['Exception plan → Skip to e-card','Multiple packages → Show selector','Incomplete enrollment → Set expectations (EC-NEW-02)'],
  L1:['Flex: Show wallet prominently','Grade-based: Only eligible plans'],
  L2:['Parent addition: Inline premium in L2, enhance in L4 (EC02)','Flex: Family changes affect wallet','Parent age > 80: Block','Mid-flow change: Warn impact','Data mismatch: Dependent selection UI (EC-NEW-01)'],
  L3:['Modular: Tier Upgrade price delta','Modular M01/M07: View-only (no upgrade)','Flex Base Variable: SI + Family config','Flex Base Fixed: View-only + wallet for enhancements','Flex: Wallet meter real-time','Downgrade: Warn reduced coverage'],
  L4:['Add-on eligibility depends on SI','Consolidated top-up spans base+secondary','Exception plan: Skip','Parental coverage as pre-selected enhancement (EC02)','Min part badge per component'],
  L5:['All employer-paid: Skip layer','Flex wallet overflow: Separate consent','Partial: Show subsidy'],
  L6:['Pre-enrollment: "Submit Preferences"','Min participation: Per-component pending badges','CD check: E-card delay warning','Drop-off: Exit modal + recovery comms (EC-NEW-03)','Re-enrollment: Override warning (EC-NEW-04)'],
};

// ============================================================================
// FLOW ENGINE CORE LOGIC
// ============================================================================
const FlowEngine = {
  getLayerVisibility:(config)=>{
    const layers={L0:{show:true,type:'view',reason:'Always shown - Welcome'},L1:{show:true,type:'view',reason:'Always shown - Base Coverage'},L2:{show:true,type:'conditional',reason:'Family configuration'},L3:{show:false,type:'skip',reason:'VANILLA skips'},L4:{show:false,type:'skip',reason:'Enhancement Options'},L5:{show:false,type:'skip',reason:'Premium & Payment'},L6:{show:true,type:'decision',reason:'Always shown - Review & Consent'}};
    if(config.construct==='MODULAR'){layers.L3.show=true;const isViewOnly=!config.topUp||config.topUp===null;layers.L3.type=isViewOnly?'view':'decision';layers.L3.reason=isViewOnly?'View assigned tier (no upgrade)':'Tier Upgrade selection';}
    if(config.construct==='FLEX'){layers.L3.show=true;const isBaseFixed=config.base==='base-fixed';layers.L3.type=isBaseFixed?'view':'decision';layers.L3.reason=isBaseFixed?'Base Fixed — view coverage':'Base Variable — configure SI + Family';}
    if(config.topUp||config.secondary||config.addOns){layers.L4.show=true;const r=[];if(config.topUp)r.push('Top-up');if(config.secondary)r.push('Secondary');if(config.addOns)r.push('Add-ons');layers.L4.type=FlowEngine.hasEmployeePaidEnhancements(config)?'decision':'view';layers.L4.reason=`Enhancements: ${r.join(', ')}`;}
    if(FlowEngine.hasEmployeePayment(config)){layers.L5.show=true;layers.L5.type='decision';layers.L5.reason='Employee payment required';}
    layers.L2.type=config.construct==='FLEX'?'decision':'conditional';
    return layers;
  },
  hasEmployeePaidEnhancements:(c)=>['employee','wallet-employee'].includes(c.topUpPay)||['employee','wallet-employee'].includes(c.secPay)||['employee','wallet-employee'].includes(c.addOnPay),
  hasEmployeePayment:(c)=>['employee','partial','wallet-employee'].includes(c.basePay)||['employee','wallet-employee'].includes(c.topUpPay)||['employee','wallet-employee'].includes(c.secPay)||['employee','wallet-employee'].includes(c.addOnPay),
  getLayerComponents:(config,layer)=>{
    const C=UI_COMPONENTS,comps=[];
    switch(layer){
      case'L0':comps.push({...C.C01,variant:'horizontal',state:'active'});break;
      case'L1':comps.push({...C.C02,variant:'view-only',state:'default'});if(config.construct==='FLEX')comps.push({...C.C10,variant:'banner',state:'full'});break;
      case'L2':comps.push({...C.C04,variant:'compact',state:'view'},{...C.C05,variant:'add',state:'empty'});break;
      case'L3':if(config.construct==='MODULAR'){const isViewOnly=!config.topUp;comps.push({...C.C03,variant:isViewOnly?'view-only':'tier-cards',state:isViewOnly?'default':'default'});if(!isViewOnly)comps.push({...C.C17,variant:'side-by-side',state:'interactive'});}else if(config.construct==='FLEX'){const isBaseFixed=config.base==='base-fixed';comps.push({...C.C03,variant:isBaseFixed?'view-only':'configurator',state:'default'});comps.push({...C.C10,variant:isBaseFixed?'banner':'detailed',state:isBaseFixed?'full':'partial'});}comps.push({...C.C06,variant:'inline',state:'calculated'});break;
      case'L4':if(config.topUp)comps.push({...C.C08,variant:config.topUp==='tier-upgrade'?'tier-upgrade':'standard',state:'available'});if(config.secondary)comps.push({...C.C09,variant:config.secondary==='multi'?'multi-plan':'single',state:'available'});if(config.addOns)comps.push({...C.C07,variant:'toggle',state:'available'});if(config.construct==='FLEX')comps.push({...C.C10,variant:'inline',state:'partial'});break;
      case'L5':comps.push({...C.C06,variant:'detailed',state:'calculated'});if(config.construct==='FLEX')comps.push({...C.C10,variant:'detailed',state:'exceeded'});break;
      case'L6':comps.push({...C.C12,variant:'detailed',state:'editable'},{...C.C04,variant:'compact',state:'view'},{...C.C11,variant:'standard',state:'unchecked'});if(config.construct==='FLEX'&&FlowEngine.hasEmployeePayment(config))comps.push({...C.C11,variant:'wallet-overflow',state:'unchecked'});break;
    }
    comps.push({...C.C14,variant:'popover',state:'closed'},{...C.C15,variant:'inline',state:'hidden'});
    return comps;
  },
  getLayerDecision:(config)=>{
    const d={L0:'V',L1:'V',L2:'C',L3:'S',L4:'S',L5:'S',L6:'D'};
    if(config.construct==='FLEX')d.L2='D';
    if(config.construct==='MODULAR')d.L3=config.topUp?'D':'V';
    if(config.construct==='FLEX')d.L3=config.base==='base-variable'?'D':'V';
    if(config.topUp||config.secondary||config.addOns)d.L4=FlowEngine.hasEmployeePaidEnhancements(config)?'D':'V';
    if(FlowEngine.hasEmployeePayment(config))d.L5='D';
    return d;
  },
  generateTestScenarios:(config,comboId)=>{
    const scenarios=[],layers=FlowEngine.getLayerVisibility(config);
    scenarios.push({id:`${comboId}-FLOW-01`,name:'Happy Path',type:'flow',steps:Object.entries(layers).filter(([_,v])=>v.show).map(([l,v])=>({layer:l,action:v.type==='decision'?'Make selection':'View and continue',expected:`${l} renders correctly`})),priority:'P0'});
    scenarios.push({id:`${comboId}-FLOW-02`,name:'Drop-off & Resume',type:'flow',steps:[{layer:'L0-L3',action:'Complete',expected:'Draft saved'},{layer:'L4',action:'Close mid-flow',expected:'Draft persisted'},{layer:'Resume',action:'Reopen',expected:'Resume from L4'}],priority:'P1'});
    if(FlowEngine.hasEmployeePayment(config))scenarios.push({id:`${comboId}-PREMIUM-01`,name:'Premium Accuracy',type:'premium',steps:[{action:'Make selections',expected:'Premium updates real-time'},{action:'Change selection',expected:'Premium recalculates'},{action:'View breakdown',expected:'Split shown correctly'}],priority:'P0'});
    if(config.construct==='FLEX')scenarios.push({id:`${comboId}-WALLET-01`,name:'Wallet Balance',type:'wallet',steps:[{action:'View L1',expected:'Wallet shown'},{action:'Select in L3/L4',expected:'Wallet updates'},{action:'Exceed wallet',expected:'Overflow + consent'}],priority:'P0'});
    const hasMinPart=config.minPart_topUp||config.minPart_secondary||config.minPart_addOns;
    if(hasMinPart)scenarios.push({id:`${comboId}-MP-01`,name:'Min Participation (component)',type:'system',steps:[{action:'Complete enrollment',expected:'Component-level pending status'},{action:'Check e-card',expected:'Pending per component'},{action:'After rollout',expected:'E-card generated or alternate'}],priority:'P1'});
    scenarios.push({id:`${comboId}-ECARD-01`,name:'E-card Generation',type:'system',steps:[{action:'Submit',expected:hasMinPart?'Pending (component-level)':config.cdCheck?'CD check initiated':'E-card generated'},{action:'View success',expected:'Correct status'}],priority:'P0'});
    return scenarios;
  },
  getContentRequirements:(config,layer,tone)=>{
    const c={headline:'',subtext:'',cta_primary:'',cta_secondary:'',tooltips:[],anxiety_reducers:[]};
    const t=tone||({VANILLA:'info',MODULAR:'awareness',FLEX:'persuasive'}[config.construct]);
    switch(layer){
      case'L0':
        if(t==='info'){c.headline='Set up your health coverage';c.subtext='Complete enrollment in a few steps';c.anxiety_reducers=['~5 minutes'];}
        else if(t==='awareness'){c.headline="Let's set up your health coverage";c.subtext='Choose your benefits from [Company]';c.anxiety_reducers=['~5 minutes to complete','You can change selections later'];}
        else{c.headline='[Company] health insurance: Build your plan';c.subtext='Your employer has set aside ₹25,000 for your health coverage. Use it to pick the plan that fits you best.';c.anxiety_reducers=['~5 minutes to complete','You can change selections later','Wallet gives you flexibility'];}
        c.cta_primary=t==='persuasive'?'Start building your plan →':'Get Started';break;
      case'L1':
        if(t==='info'){c.headline='Your coverage';c.subtext='₹5 lakh Sum Insured';}
        else if(t==='awareness'){c.headline='Your coverage from [Company]';c.subtext=config.construct==='FLEX'?'₹25,000 wallet to build your protection':'₹5 lakh coverage for your family';}
        else{c.headline='Your benefits wallet';c.subtext='₹25,000 to build your health coverage';c.anxiety_reducers=['Amount [Company] set aside for your health benefits','Within this = no cost to you'];}
        c.cta_primary=t==='persuasive'?'Customize your plan':'Continue';c.tooltips=['Sum Insured','Floater','Cashless'];break;
      case'L2':
        if(t==='info'){c.headline='Family members';c.subtext='Review covered members';}
        else if(t==='awareness'){c.headline='Your covered family members';c.subtext='Review and update if needed';}
        else{c.headline="Who's covered?";c.subtext='Add or update family members covered under your plan';c.anxiety_reducers=['Family changes affect wallet allocation'];}
        c.cta_primary='Continue';c.cta_secondary='+ Add another member';c.tooltips=['Dependent','Relationship'];break;
      case'L3':
        if(config.construct==='MODULAR'){const isVO=!config.topUp;if(t==='info'){c.headline=isVO?'Assigned plan':'Select a tier';c.subtext=isVO?'Current plan details':'Available tiers';}else if(t==='awareness'){c.headline=isVO?'Your assigned plan':'Upgrade your plan';c.subtext=isVO?'Review your coverage details':'Choose a higher tier for better benefits';}else{c.headline=isVO?'Your assigned plan':'Unlock better protection';c.subtext=isVO?'Review your coverage details':'See how upgrading your tier expands your coverage';}}
        else if(config.construct==='FLEX'){const isBF=config.base==='base-fixed';if(t==='info'){c.headline=isBF?'Base coverage':'Configure coverage';c.subtext=isBF?'Fixed plan details':'Select SI and family';}else if(t==='awareness'){c.headline=isBF?'Your base coverage':'Configure your coverage';c.subtext=isBF?'Your fixed coverage from [Company]':'Select Sum Insured and family coverage';}else{c.headline=isBF?'Your base plan':'Configure your coverage';c.subtext=isBF?'Fully covered by your wallet':'Choose your coverage amount and who\'s covered. Selections within your wallet are free.';c.anxiety_reducers=['Compare plans side-by-side','Every choice updates your wallet in real-time'];}}
        else{if(t==='info'){c.headline='Your plan';c.subtext='Plan details';}else if(t==='awareness'){c.headline='Your plan from [Company]';c.subtext='Review your coverage details';}else{c.headline='Your plan from [Company]';c.subtext='Review your coverage details';}}
        c.cta_primary='Continue';c.tooltips=['Tier','Sum Insured'];break;
      case'L4':
        if(t==='info'){c.headline='Enhancements';c.subtext='Additional options';}
        else if(t==='awareness'){c.headline='Enhance your coverage';c.subtext=FlowEngine.hasEmployeePaidEnhancements(config)?'Add protection (employee-paid)':'Additional benefits included';}
        else{c.headline='Add extra benefits';c.subtext='Optional benefits you can add to your plan. Pick what matters to you.';c.anxiety_reducers=['Most popular choices highlighted'];}
        c.cta_primary=t==='persuasive'?'Continue to review':'Continue';c.cta_secondary=t==='persuasive'?'Skip for now':'Skip enhancements';c.tooltips=['Top-up','Secondary','Add-on'];break;
      case'L5':
        if(t==='info'){c.headline='Premium';c.subtext='Cost breakdown';}
        else if(t==='awareness'){c.headline='Your investment';c.subtext='Review your premium breakdown';}
        else{c.headline='Your cost';c.subtext=config.construct==='FLEX'&&!FlowEngine.hasEmployeePaidEnhancements(config)?'Total covered by your wallet — no cost to you':'Wallet: ₹25,000 · See your breakdown below';}
        c.cta_primary='Continue to Review';c.tooltips=['Premium','Salary Deduction'];if(t==='persuasive')c.anxiety_reducers=['Wallet covers your base','You only pay the overflow'];break;
      case'L6':
        if(t==='info'){c.headline='Confirm';c.subtext='Review selections';}
        else if(t==='awareness'){c.headline='Review and confirm';c.subtext='Check your selections before submitting';}
        else{c.headline='Review your selections';c.subtext="Here's a summary of your coverage. Review everything before confirming.";}
        c.cta_primary=config.preEnroll?'Submit Preferences':'Confirm Enrollment';c.cta_secondary=t==='persuasive'?'Go back and edit':'Edit selections';c.anxiety_reducers=t==='info'?[]:['You can update during next enrollment window'];break;
    }
    return c;
  }
};

// ============================================================================
// RFQ MATCHING ENGINE
// ============================================================================
const RFQEngine = {
  matchCombinations:(rfq, exactOnly=true)=>{
    const r=[];
    Object.entries(POLICY_COMBINATIONS).forEach(([id,config])=>{
      const{score,matches,mismatches}=RFQEngine.scoreMatch(rfq,config);
      if(exactOnly ? score===100 : score>0) r.push({comboId:id,config,score,matches,mismatches,name:config.name});
    });
    return r.sort((a,b)=>b.score-a.score);
  },
  scoreMatch:(rfq,config)=>{
    let s=0,mx=0;const m=[],mm=[];
    // Group 1: Construct Parameters
    if(rfq.construct&&rfq.construct!=='any'){mx+=20;if(rfq.construct===config.construct){s+=20;m.push(`Construct: ${config.construct}`);}else mm.push(`Construct: wanted ${rfq.construct}`);}
    if(rfq.base&&rfq.base!=='any'){mx+=10;if(rfq.base===config.base){s+=10;m.push(`Base: ${config.base}`);}else mm.push(`Base mismatch`);}
    if(rfq.topUp!=='any'){mx+=10;const w=rfq.topUp==='none'?null:rfq.topUp;if(w===null?!config.topUp:config.topUp===w){s+=10;m.push(config.topUp?`Top-up: ${config.topUp}`:'No top-up');}else mm.push(config.topUp?`Has top-up: ${config.topUp}`:'No top-up');}
    if(rfq.secondary!=='any'){mx+=10;const w=rfq.secondary==='none'?null:rfq.secondary;if(w===null?!config.secondary:config.secondary===w){s+=10;m.push(config.secondary?`Secondary: ${config.secondary}`:'No secondary');}else mm.push(config.secondary?`Has secondary: ${config.secondary}`:'No secondary');}
    if(rfq.addOns!=='any'){mx+=10;const w=rfq.addOns==='none'?null:rfq.addOns;if(w===null?!config.addOns:!!config.addOns){s+=10;m.push(config.addOns?'Add-ons: yes':'No add-ons');}else mm.push(config.addOns?'Has add-ons':'No add-ons');}
    // Group 2: Payment Variables
    if(rfq.basePay&&rfq.basePay!=='any'){mx+=10;if(rfq.basePay===config.basePay){s+=10;m.push(`Base pay: ${config.basePay}`);}else mm.push(`Base pay mismatch`);}
    if(rfq.topUpPay&&rfq.topUpPay!=='any'){mx+=5;if((rfq.topUpPay==='none'?null:rfq.topUpPay)===(config.topUpPay||null)){s+=5;m.push(`TopUp pay: ${config.topUpPay||'N/A'}`);}else mm.push('TopUp pay mismatch');}
    if(rfq.secPay&&rfq.secPay!=='any'){mx+=5;if((rfq.secPay==='none'?null:rfq.secPay)===(config.secPay||null)){s+=5;m.push(`Sec pay: ${config.secPay||'N/A'}`);}else mm.push('Sec pay mismatch');}
    if(rfq.addOnPay&&rfq.addOnPay!=='any'){mx+=5;if((rfq.addOnPay==='none'?null:rfq.addOnPay)===(config.addOnPay||null)){s+=5;m.push(`AddOn pay: ${config.addOnPay||'N/A'}`);}else mm.push('AddOn pay mismatch');}
    // Group 3: Post-Construct Modifiers
    if(rfq.minPart!=='any'){mx+=5;const w=rfq.minPart==='yes';const hasMP=config.minPart_topUp||config.minPart_secondary||config.minPart_addOns;if(w===hasMP){s+=5;m.push(`Min Part: ${w?'Yes':'No'}`);}else mm.push('Min Part mismatch');}
    [{key:'preEnroll',label:'Pre-Enrollment'},{key:'cdCheck',label:'CD Check'},{key:'gradeBased',label:'Grade-Based'}].forEach(f=>{if(rfq[f.key]!=='any'&&rfq[f.key]!==undefined){mx+=5;const w=rfq[f.key]==='yes';if(w===config[f.key]){s+=5;m.push(`${f.label}: ${w?'Yes':'No'}`);}else mm.push(`${f.label} mismatch`);}});
    return{score:mx>0?Math.round((s/mx)*100):100,matches:m,mismatches:mm};
  },
  getMatchLabel:(score)=>score===100?{label:'Exact',color:'text-green-700 bg-green-200'}:score>=75?{label:'Close',color:'text-blue-700 bg-blue-200'}:score>=50?{label:'Partial',color:'text-orange-700 bg-orange-200'}:{label:'Low',color:'text-cerise-700 bg-cerise-200'}
};

// ============================================================================
// PREMIUM CALCULATOR
// ============================================================================
const PremiumCalc = {
  SI_COSTS: {'3L':9600,'5L':12000,'7L':16800,'10L':21600,'15L':30000},
  TIER_COSTS: [12000, 18000, 26400], // Silver, Gold, Platinum
  ADDON_COSTS: {opd:2400,dental:1800,wellness:1200},
  TOPUP_COST: 4800,
  SECONDARY_COST: 9600,
  WALLET_TOTAL: 25000,
  
  calculate(state, config) {
    // Base cost
    let baseCost = 12000;
    if (config.construct === 'MODULAR') baseCost = this.TIER_COSTS[state.selectedTier] || 12000;
    else if (config.construct === 'FLEX') baseCost = this.SI_COSTS[state.selectedSI] || 12000;
    
    // Family multiplier
    const memberCount = state.members.length;
    baseCost = Math.round(baseCost * (1 + (memberCount - 1) * 0.25));
    
    // Enhancements
    const topUpCost = (state.topUpEnabled && config.topUp) ? this.TOPUP_COST : 0;
    const secondaryCost = (state.secondaryEnabled && config.secondary) ? this.SECONDARY_COST : 0;
    let addOnCost = 0;
    Object.entries(state.addOns).forEach(([key, on]) => { if (on) addOnCost += (this.ADDON_COSTS[key] || 0); });
    
    const total = baseCost + topUpCost + secondaryCost + addOnCost;
    
    // Payment split
    let employerPays, employeePays, walletUsed = 0, walletOverflow = 0;
    if (config.construct === 'FLEX') {
      walletUsed = Math.min(total, this.WALLET_TOTAL);
      walletOverflow = Math.max(0, total - this.WALLET_TOTAL);
      employerPays = walletUsed;
      employeePays = walletOverflow;
    } else if (config.basePay === 'employer' && !FlowEngine.hasEmployeePaidEnhancements(config)) {
      employerPays = total; employeePays = 0;
    } else if (config.basePay === 'partial') {
      employerPays = Math.round(baseCost * 0.7); employeePays = total - employerPays;
    } else {
      employerPays = baseCost; employeePays = topUpCost + secondaryCost + addOnCost;
    }
    
    return { baseCost, topUpCost, secondaryCost, addOnCost, total, employerPays, employeePays, walletUsed, walletOverflow, walletTotal: this.WALLET_TOTAL, walletRemaining: this.WALLET_TOTAL - walletUsed, monthlyEmployee: Math.round(employeePays / 12) };
  }
};

// ============================================================================
// EXISTING ANALYSIS COMPONENTS
// ============================================================================
const FlowDiagram = ({ layers, config }) => {
  const vis = Object.entries(layers).filter(([_,v])=>v.show);
  const color = (t) => t==='view'?'bg-blue-200 border-blue-200 text-blue-700':t==='decision'?'bg-orange-200 border-orange-200 text-orange-700':t==='conditional'?'bg-purple-200 border-purple-200 text-purple-700':'bg-onyx-200 border-onyx-200 text-onyx-500';
  const icon = (l) => ({L0:<Play size={16}/>,L1:<Shield size={16}/>,L2:<Users size={16}/>,L3:<Settings size={16}/>,L4:<Heart size={16}/>,L5:<CreditCard size={16}/>,L6:<CheckCircle2 size={16}/>}[l]||<Circle size={16}/>);
  return(
    <div className="acko-card p-6 bg-white">
      <h3 className="text-onyx-800 font-semibold mb-6 flex items-center gap-2"><GitBranch size={20} className="text-purple-600"/>Flow Diagram</h3>
      <div className="flex flex-wrap items-center gap-3">
        {vis.map(([l,d],i)=>(<React.Fragment key={l}><div className={`relative px-4 py-3 rounded-xl border-2 ${color(d.type)} transition-all hover:scale-105 cursor-pointer group min-w-[120px]`}><div className="flex items-center gap-2 mb-1">{icon(l)}<span className="font-bold text-sm">{l}</span></div><div className="text-xs font-medium">{LAYER_META[l]?.shortName}</div><div className="text-[10px] opacity-75 mt-1 uppercase tracking-wide">{d.type}</div><div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-onyx-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">{d.reason}<div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-onyx-800"/></div></div>{i<vis.length-1&&<ArrowRight className="text-onyx-400" size={20}/>}</React.Fragment>))}
      </div>
      <div className="flex gap-4 mt-6 pt-4 border-t border-onyx-200">{[['bg-blue-200','View Only'],['bg-orange-200','Decision'],['bg-purple-200','Conditional']].map(([bg,l])=>(<div key={l} className="flex items-center gap-2 text-xs text-onyx-500"><div className={`w-3 h-3 rounded ${bg}`}/><span>{l}</span></div>))}</div>
    </div>
  );
};

const ComponentChecklist = ({ config, layers }) => {
  const all = useMemo(()=>{const m=new Map();Object.entries(layers).forEach(([l,d])=>{if(d.show)FlowEngine.getLayerComponents(config,l).forEach(c=>{const k=`${c.id}-${c.variant}`;if(!m.has(k))m.set(k,{...c,layers:[l]});else m.get(k).layers.push(l);});});return Array.from(m.values());},[config,layers]);
  const groups = useMemo(()=>{const g={'P0':[],'P0-FLEX':[],'P1':[]};all.forEach(c=>(g[c.priority]||g['P1']).push(c));return g;},[all]);
  return(
    <div className="acko-card p-6 bg-white">
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-onyx-800"><List size={20} className="text-purple-600"/>Components ({all.length})</h3>
      {Object.entries(groups).map(([p,comps])=>comps.length>0&&(<div key={p} className="mb-4"><div className={`text-xs font-bold uppercase tracking-wide mb-2 ${p==='P0'?'text-cerise-700':p==='P0-FLEX'?'text-orange-700':'text-onyx-500'}`}>{p}{p==='P0-FLEX'&&' (Flex Only)'}</div><div className="space-y-2">{comps.map((c,i)=>(<div key={i} className="flex items-start gap-3 p-3 bg-onyx-100 rounded-lg"><CheckCircle2 size={18} className="text-green-600 mt-0.5 flex-shrink-0"/><div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><span className="font-medium text-onyx-800">{c.id}</span><span className="text-onyx-600">{c.name}</span></div><div className="text-xs text-onyx-500 mt-1"><span className="bg-onyx-200 px-2 py-0.5 rounded mr-2">Variant: {c.variant}</span><span className="bg-onyx-200 px-2 py-0.5 rounded mr-2">State: {c.state}</span><span className="text-onyx-400">Layers: {c.layers.join(', ')}</span></div></div></div>))}</div></div>))}
    </div>
  );
};

const TestScenarios = ({ scenarios, onRunScenario }) => {
  const [exp,setExp] = useState(null);
  const tc = (t) => ({flow:'bg-blue-200 text-blue-700',premium:'bg-green-200 text-green-700',wallet:'bg-purple-200 text-purple-700',system:'bg-orange-200 text-orange-700'}[t]||'bg-onyx-200 text-onyx-700');
  return(
    <div className="acko-card p-6 bg-white">
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-onyx-800"><FileText size={20} className="text-purple-600"/>Test Scenarios ({scenarios.length})</h3>
      <div className="space-y-3">{scenarios.map(s=>(<div key={s.id} className="border border-onyx-300 rounded-xl overflow-hidden"><button onClick={()=>setExp(exp===s.id?null:s.id)} className="w-full flex items-center justify-between p-4 hover:bg-onyx-100 transition-colors text-left"><div className="flex items-center gap-3"><span className={`px-2 py-1 rounded text-xs font-medium ${tc(s.type)}`}>{s.type.toUpperCase()}</span><span className="font-medium text-onyx-800">{s.name}</span><span className={`text-xs px-2 py-0.5 rounded ${s.priority==='P0'?'bg-cerise-200 text-cerise-700':'bg-onyx-200 text-onyx-600'}`}>{s.priority}</span></div>{exp===s.id?<ChevronDown size={18}/>:<ChevronRight size={18}/>}</button>{exp===s.id&&(<div className="px-4 pb-4 bg-onyx-100"><div className="flex items-center justify-between mb-3"><div className="text-xs font-mono text-onyx-500">{s.id}</div>{onRunScenario&&<button onClick={()=>onRunScenario(s)} className="text-xs px-3 py-1.5 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all flex items-center gap-1.5"><Play size={12}/>Run in Mobile</button>}</div><div className="space-y-2">{s.steps.map((st,i)=>(<div key={i} className="flex gap-3 text-sm"><div className="w-6 h-6 rounded-full bg-onyx-300 text-onyx-700 flex items-center justify-center text-xs font-bold flex-shrink-0">{i+1}</div><div className="flex-1"><div className="text-onyx-700">{st.layer&&<span className="font-medium text-onyx-900">[{st.layer}] </span>}{st.action}</div><div className="text-onyx-500 text-xs mt-0.5">→ {st.expected}</div></div></div>))}</div></div>)}</div>))}</div>
    </div>
  );
};

const DecisionMatrix = ({ config, layers }) => {
  const d=FlowEngine.getLayerDecision(config);
  const cs=(v)=>({V:'bg-blue-200 text-blue-700',D:'bg-orange-200 text-orange-700',S:'bg-onyx-200 text-onyx-500',C:'bg-purple-200 text-purple-700'}[v]||'bg-onyx-200 text-onyx-500');
  return(
    <div className="acko-card p-6 bg-white">
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-onyx-800"><Eye size={20} className="text-purple-600"/>Decision Matrix</h3>
      <div className="flex gap-2 mb-4">{['L0','L1','L2','L3','L4','L5','L6'].map(l=>(<div key={l} className="flex flex-col items-center"><div className="text-xs font-bold text-onyx-500 mb-1">{l}</div><div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${cs(d[l])} ${!layers[l]?.show&&'opacity-40'}`}>{d[l]}</div></div>))}<div className="flex flex-col items-center ml-4 pl-4 border-l-2 border-onyx-300"><div className="text-xs font-bold text-onyx-500 mb-1">Total</div><div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg bg-onyx-800 text-white">{Object.values(d).filter(v=>v==='D').length}</div></div></div>
      <div className="flex flex-wrap gap-4 pt-4 border-t border-onyx-300">{[['V','View'],['D','Decision'],['S','Skip'],['C','Conditional']].map(([v,l])=>(<div key={v} className="flex items-center gap-2 text-xs"><div className={`w-6 h-6 rounded flex items-center justify-center font-bold ${cs(v)}`}>{v}</div><span className="text-onyx-600">{l}</span></div>))}</div>
    </div>
  );
};

const ContentRequirements = ({ config, layers }) => (
  <div className="acko-card p-6 bg-white">
    <h3 className="font-semibold mb-4 flex items-center gap-2 text-onyx-800"><FileText size={20} className="text-purple-600"/>Content Requirements</h3>
    <div className="space-y-4">{Object.entries(layers).filter(([_,v])=>v.show).map(([l])=>{const c=FlowEngine.getContentRequirements(config,l);return(<div key={l} className="p-4 bg-onyx-100 rounded-xl"><div className="font-bold text-onyx-700 mb-2">{l}</div><div className="grid grid-cols-2 gap-3 text-sm"><div><span className="text-onyx-500">Headline:</span><div className="font-medium text-onyx-800">{c.headline}</div></div><div><span className="text-onyx-500">Subtext:</span><div className="text-onyx-700">{c.subtext}</div></div><div><span className="text-onyx-500">Primary CTA:</span><div className="inline-block px-3 py-1 bg-purple-600 text-white rounded text-xs">{c.cta_primary}</div></div>{c.cta_secondary&&<div><span className="text-onyx-500">Secondary:</span><div className="inline-block px-3 py-1 border border-onyx-300 text-onyx-700 rounded text-xs">{c.cta_secondary}</div></div>}{c.tooltips.length>0&&<div className="col-span-2"><span className="text-onyx-500">Tooltips:</span><div className="flex flex-wrap gap-1 mt-1">{c.tooltips.map((t,i)=><span key={i} className="px-2 py-0.5 bg-onyx-200 text-onyx-600 rounded text-xs">{t}</span>)}</div></div>}{c.anxiety_reducers.length>0&&<div className="col-span-2"><span className="text-onyx-500">Anxiety reducers:</span><div className="flex flex-wrap gap-1 mt-1">{c.anxiety_reducers.map((t,i)=><span key={i} className="px-2 py-0.5 bg-green-200 text-green-700 rounded text-xs flex items-center gap-1"><Info size={10}/>{t}</span>)}</div></div>}</div></div>);})}</div>
  </div>
);

const ExportPanel = ({ config, comboId, layers, scenarios }) => {
  const gen = () => { const data={comboId,config,layers,components:Object.entries(layers).filter(([_,v])=>v.show).flatMap(([l])=>FlowEngine.getLayerComponents(config,l)),scenarios,content:Object.entries(layers).filter(([_,v])=>v.show).reduce((a,[l])=>{a[l]=FlowEngine.getContentRequirements(config,l);return a;},{})};const b=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=`flow-${comboId}.json`;a.click(); };
  return(<div className="acko-card p-6 bg-gradient-to-r from-onyx-800 to-onyx-700 text-white border-none"><h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Download size={20}/>Export</h3><button onClick={gen} className="acko-btn bg-purple-600 text-white hover:bg-purple-700 px-6"><Download size={16} className="mr-2"/>Export JSON</button><p className="text-onyx-400 text-xs mt-4">Includes: config, layers, components, tests, content.</p></div>);
};

// ============================================================================
// RFQ BUILDER
// ============================================================================
const RFQBuilder = ({ onSelectCombo, onMatchResults }) => {
  const [rfq, setRfq] = useState({construct:'any',base:'any',topUp:'any',secondary:'any',addOns:'any',basePay:'any',topUpPay:'any',secPay:'any',addOnPay:'any',minPart:'any',preEnroll:'any',cdCheck:'any',gradeBased:'any'});
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [exactMode, setExactMode] = useState(true);
  const handleMatch = () => { const m = RFQEngine.matchCombinations(rfq, exactMode); setResults(m); setShowResults(true); if(onMatchResults)onMatchResults(m); };
  const resetRfq = () => {setRfq({construct:'any',base:'any',topUp:'any',secondary:'any',addOns:'any',basePay:'any',topUpPay:'any',secPay:'any',addOnPay:'any',minPart:'any',preEnroll:'any',cdCheck:'any',gradeBased:'any'});setResults(null);setShowResults(false);};
  const Sel = ({label,value,onChange,options,icon:I}) => (<div><label className="block text-xs font-medium text-onyx-500 mb-1.5 flex items-center gap-1"><I size={12}/>{label}</label><select value={value} onChange={e=>onChange(e.target.value)} className="acko-input text-sm">{options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select></div>);
  const payOpts=[{value:'any',label:'Any'},{value:'employer',label:'Employer'},{value:'employee',label:'Employee'},{value:'partial',label:'Partial'},{value:'wallet',label:'Wallet'},{value:'wallet-employee',label:'Wallet+Employee'},{value:'none',label:'None/N/A'}];
  return(
    <div className="space-y-6">
      <div className="acko-card p-6 bg-white">
        <div className="flex items-center justify-between mb-6"><h3 className="font-semibold flex items-center gap-2 text-onyx-800"><Search size={20} className="text-purple-600"/>RFQ Policy Matcher</h3><div className="flex items-center gap-4"><label className="flex items-center gap-2 cursor-pointer"><div onClick={()=>setExactMode(!exactMode)} className={`toggle-track ${exactMode?'on':'off'}`}><div className="toggle-thumb"/></div><span className="text-xs text-onyx-600">{exactMode?'Exact Match':'Explore Similar'}</span></label><button onClick={resetRfq} className="text-xs text-onyx-500 hover:text-purple-600 flex items-center gap-1"><X size={14}/>Reset</button></div></div>
        {/* Group 1: Construct Parameters */}
        <div className="mb-5"><div className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-3 flex items-center gap-2"><Layers size={14}/>Construct Parameters</div><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <Sel label="Construct" icon={Layers} value={rfq.construct} onChange={v=>setRfq(p=>({...p,construct:v}))} options={[{value:'any',label:'Any'},{value:'VANILLA',label:'Vanilla'},{value:'MODULAR',label:'Modular'},{value:'FLEX',label:'Flex'}]}/>
          <Sel label="Base Plan" icon={Shield} value={rfq.base} onChange={v=>setRfq(p=>({...p,base:v}))} options={[{value:'any',label:'Any'},{value:'fixed',label:'Fixed'},{value:'tier-selectable',label:'Tier-Selectable'},{value:'tier-selectable-grade',label:'Tier+Grade'},{value:'base-variable',label:'Base Variable'},{value:'base-fixed',label:'Base Fixed'}]}/>
          <Sel label="Top-up" icon={Shield} value={rfq.topUp} onChange={v=>setRfq(p=>({...p,topUp:v}))} options={[{value:'any',label:'Any'},{value:'none',label:'None'},{value:'standard',label:'Standard'},{value:'tier-upgrade',label:'Tier Upgrade'},{value:'consolidated',label:'Consolidated'}]}/>
          <Sel label="Secondary" icon={Users} value={rfq.secondary} onChange={v=>setRfq(p=>({...p,secondary:v}))} options={[{value:'any',label:'Any'},{value:'none',label:'None'},{value:'single',label:'Single'},{value:'multi',label:'Multiple'},{value:'si-variants',label:'SI Variants'}]}/>
          <Sel label="Sec Top-up" icon={Shield} value={rfq.secTopUp||'any'} onChange={v=>setRfq(p=>({...p,secTopUp:v}))} options={[{value:'any',label:'Any'},{value:'none',label:'None'},{value:'standard',label:'Standard'}]}/>
          <Sel label="Add-ons" icon={Heart} value={rfq.addOns} onChange={v=>setRfq(p=>({...p,addOns:v}))} options={[{value:'any',label:'Any'},{value:'none',label:'None'},{value:'available',label:'Available'},{value:'wellness',label:'Wellness'}]}/>
        </div></div>
        {/* Group 2: Payment Variables */}
        <div className="mb-5"><div className="text-xs font-bold text-green-700 uppercase tracking-wide mb-3 flex items-center gap-2"><CreditCard size={14}/>Payment Variables</div><div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Sel label="Base Paid By" icon={CreditCard} value={rfq.basePay} onChange={v=>setRfq(p=>({...p,basePay:v}))} options={payOpts}/>
          <Sel label="TopUp Paid By" icon={CreditCard} value={rfq.topUpPay} onChange={v=>setRfq(p=>({...p,topUpPay:v}))} options={payOpts}/>
          <Sel label="Secondary Paid By" icon={CreditCard} value={rfq.secPay} onChange={v=>setRfq(p=>({...p,secPay:v}))} options={payOpts}/>
          <Sel label="AddOn Paid By" icon={CreditCard} value={rfq.addOnPay} onChange={v=>setRfq(p=>({...p,addOnPay:v}))} options={payOpts}/>
        </div></div>
        {/* Group 3: Post-Construct Modifiers */}
        <div className="mb-6"><div className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-3 flex items-center gap-2"><Tag size={14}/>Post-Construct Modifiers</div><div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Sel label="Min Participation" icon={Target} value={rfq.minPart} onChange={v=>setRfq(p=>({...p,minPart:v}))} options={[{value:'any',label:"Don't Care"},{value:'yes',label:'Required'},{value:'no',label:'Not Required'}]}/>
          <Sel label="Pre-Enrollment" icon={Clock} value={rfq.preEnroll} onChange={v=>setRfq(p=>({...p,preEnroll:v}))} options={[{value:'any',label:"Don't Care"},{value:'yes',label:'Yes'},{value:'no',label:'No'}]}/>
          <Sel label="CD Check" icon={CreditCard} value={rfq.cdCheck} onChange={v=>setRfq(p=>({...p,cdCheck:v}))} options={[{value:'any',label:"Don't Care"},{value:'yes',label:'Yes'},{value:'no',label:'No'}]}/>
          <Sel label="Grade-Based" icon={Tag} value={rfq.gradeBased} onChange={v=>setRfq(p=>({...p,gradeBased:v}))} options={[{value:'any',label:"Don't Care"},{value:'yes',label:'Yes'},{value:'no',label:'No'}]}/>
        </div></div>
        <div className="flex items-center gap-4"><button onClick={handleMatch} className="acko-btn bg-purple-600 text-white hover:bg-purple-700 px-8 font-semibold"><Search size={16} className="mr-2"/>Find Matching Combinations</button><span className="text-xs text-onyx-400">{exactMode?'Showing only 100% exact matches':'Showing all matches ranked by score'}</span></div>
      </div>
      {showResults&&results&&(
        <div className="acko-card p-6 bg-white fade-in-up">
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-onyx-800"><Zap size={20} className="text-purple-600"/>{results.length} {exactMode?'Exact':''}  Match{results.length!==1?'es':''} Found</h3>
          {results.length===0?<div className="text-center py-8 text-onyx-500"><AlertCircle size={32} className="mx-auto mb-2 text-onyx-400"/><p>{exactMode?'No exact matches. Try toggling "Explore Similar" or relaxing criteria.':'No matches found. Try relaxing criteria.'}</p></div>:(
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">{results.map(r=>{const mi=RFQEngine.getMatchLabel(r.score);return(<button key={r.comboId} onClick={()=>onSelectCombo(r.comboId)} className="w-full text-left p-4 border border-onyx-300 rounded-xl hover:border-purple-400 hover:bg-purple-100 transition-all group"><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-3"><span className="font-mono font-bold text-lg text-purple-700">{r.comboId}</span><span className={`px-2 py-1 rounded text-xs font-medium ${r.config.construct==='VANILLA'?'bg-green-200 text-green-700':r.config.construct==='MODULAR'?'bg-orange-200 text-orange-700':'bg-purple-200 text-purple-700'}`}>{r.config.construct}</span></div><div className="flex items-center gap-3">{!exactMode&&<span className={`px-3 py-1 rounded-full text-xs font-bold ${mi.color}`}>{r.score}% {mi.label}</span>}<ChevronRight size={18} className="text-onyx-400 group-hover:text-purple-600"/></div></div><div className="text-sm text-onyx-600 mb-2">{r.name}</div><div className="flex flex-wrap gap-1">{r.matches.slice(0,5).map((m,i)=><span key={i} className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full">{m}</span>)}{r.mismatches.slice(0,3).map((m,i)=><span key={i} className="text-[10px] px-2 py-0.5 bg-cerise-200 text-cerise-700 rounded-full">{m}</span>)}</div></button>);})}</div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// INTERACTIVE MOBILE SIMULATOR
// ============================================================================
const Toggle = ({ on, onToggle, disabled }) => (
  <div onClick={disabled ? undefined : onToggle} className={`toggle-track ${on ? 'on' : 'off'} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}><div className="toggle-thumb" /></div>
);

const WalletBar = ({ used, total, mini }) => {
  const pct = Math.min(100, (used / total) * 100);
  const over = used > total;
  return (
    <div className={`${mini ? '' : 'bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-4 text-white'}`}>
      {!mini && <div className="flex items-center gap-2 mb-2"><Wallet size={16} /><span className="text-sm font-semibold">Wallet Balance</span></div>}
      {!mini && <div className="flex justify-between text-xs opacity-80 mb-1"><span>Used: ₹{used.toLocaleString()}</span><span>Remaining: ₹{Math.max(0, total - used).toLocaleString()}</span></div>}
      <div className={`w-full ${mini ? 'h-1.5' : 'h-2'} rounded-full ${over ? 'bg-cerise-200' : mini ? 'bg-purple-200' : 'bg-purple-400'}`}>
        <div className={`h-full rounded-full transition-all ${over ? 'bg-cerise-500' : 'bg-white'}`} style={{ width: `${Math.min(100, pct)}%` }} />
      </div>
      {over && !mini && <div className="text-xs mt-2 text-orange-200 flex items-center gap-1"><AlertTriangle size={12} />Exceeds wallet by ₹{(used - total).toLocaleString()}</div>}
    </div>
  );
};

const MobileSimulator = ({ config, layers, comboId, pendingScenario, onScenarioConsumed }) => {
  const visibleLayers = useMemo(() => Object.entries(layers).filter(([_, v]) => v.show), [layers]);
  
  // Interactive state
  const [idx, setIdx] = useState(0);
  const [members, setMembers] = useState([
    { id: 1, name: 'Employee', relation: 'Self', age: 32, gender: 'Male' },
    { id: 2, name: 'Spouse', relation: 'Spouse', age: 30, gender: 'Female' },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', relation: '', age: '', gender: '' });
  const [selectedTier, setSelectedTier] = useState(0);
  const [selectedSI, setSelectedSI] = useState('5L');
  const [selectedFamilyDef, setSelectedFamilyDef] = useState(2);
  const [topUpEnabled, setTopUpEnabled] = useState(false);
  const [secondaryEnabled, setSecondaryEnabled] = useState(false);
  const [addOns, setAddOns] = useState({ opd: false, dental: false, wellness: false });
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentSalary, setConsentSalary] = useState(false);
  const [consentWallet, setConsentWallet] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [contentTone, setContentTone] = useState({VANILLA:'info',MODULAR:'awareness',FLEX:'persuasive'}[config.construct]||'info');
  const [simulatingError, setSimulatingError] = useState(null);
  const [scenarioMode, setScenarioMode] = useState(null);
  const [scenarioStep, setScenarioStep] = useState(0);
  
  const activeLayer = visibleLayers[idx]?.[0] || 'L0';
  const layerNames = visibleLayers.map(([l]) => LAYER_META[l]?.shortName || l);
  const state = { members, selectedTier, selectedSI, selectedFamilyDef, topUpEnabled, secondaryEnabled, addOns };
  const premium = useMemo(() => PremiumCalc.calculate(state, config), [members, selectedTier, selectedSI, topUpEnabled, secondaryEnabled, addOns, config]);
  const content = useMemo(() => FlowEngine.getContentRequirements(config, activeLayer, contentTone), [config, activeLayer, contentTone]);
  const layerComps = useMemo(() => FlowEngine.getLayerComponents(config, activeLayer), [config, activeLayer]);
  const decisions = FlowEngine.getLayerDecision(config);
  
  // Reset state when config changes
  const configKey = comboId + config.construct;
  const [prevKey, setPrevKey] = useState(configKey);
  if (configKey !== prevKey) {
    setPrevKey(configKey); setIdx(0); setSubmitted(false); setConsentTerms(false); setConsentSalary(false); setConsentWallet(false); setContentTone({VANILLA:'info',MODULAR:'awareness',FLEX:'persuasive'}[config.construct]||'info'); setSimulatingError(null); setScenarioMode(null); setScenarioStep(0);
    setTopUpEnabled(false); setSecondaryEnabled(false); setAddOns({ opd: false, dental: false, wellness: false });
    setSelectedTier(0); setSelectedSI('5L'); setSelectedFamilyDef(2); setErrors({});
    setMembers([{ id: 1, name: 'Employee', relation: 'Self', age: 32, gender: 'Male' }, { id: 2, name: 'Spouse', relation: 'Spouse', age: 30, gender: 'Female' }]);
  }
  
  const validate = () => {
    const e = {};
    if (activeLayer === 'L2' && members.length === 0) e.members = 'At least one member required';
    if (activeLayer === 'L6') {
      if (!consentTerms) e.consent = 'Please accept terms and conditions';
      if (FlowEngine.hasEmployeePayment(config) && premium.employeePays > 0 && !consentSalary) e.salary = 'Please consent to salary deduction';
      if (config.construct === 'FLEX' && premium.walletOverflow > 0 && !consentWallet) e.wallet = 'Please acknowledge wallet overflow';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  
  const goNext = () => { if (activeLayer === 'L6') { if (validate()) setSubmitted(true); } else { if (validate()) setIdx(Math.min(visibleLayers.length - 1, idx + 1)); } };
  const goBack = () => { setIdx(Math.max(0, idx - 1)); setErrors({}); };
  const goToLayer = (i) => { if (i <= idx) { setIdx(i); setErrors({}); } };
  const restart = () => { setIdx(0); setSubmitted(false); setConsentTerms(false); setConsentSalary(false); setConsentWallet(false); setErrors({}); setSimulatingError(null); setScenarioMode(null); };
  
  const simulateError = (err) => {
    const layerNum = err.id.match(/E-L(\d)/)?.[1];
    if (layerNum !== undefined) {
      const targetLayer = `L${layerNum}`;
      const layerIdx = visibleLayers.findIndex(([l]) => l === targetLayer);
      if (layerIdx >= 0) setIdx(layerIdx);
    }
    setSimulatingError(err);
    setTimeout(() => setSimulatingError(null), 6000);
  };
  
  const runScenario = (scenario) => {
    setScenarioMode(scenario); setScenarioStep(0); setSubmitted(false);
    setConsentTerms(false); setConsentSalary(false); setConsentWallet(false);
    setErrors({}); setSimulatingError(null);
    if (scenario.type === 'wallet') {
      setSelectedSI('15L'); setTopUpEnabled(true); setSecondaryEnabled(true);
      setAddOns({ opd: true, dental: true, wellness: true }); setIdx(0);
    } else if (scenario.type === 'premium') {
      setTopUpEnabled(true); setSecondaryEnabled(false);
      setAddOns({ opd: true, dental: false, wellness: false }); setIdx(0);
    } else if (scenario.id?.includes('FLOW-02')) {
      setIdx(0);
    } else if (scenario.id?.includes('MP-01')) {
      setIdx(0);
    } else {
      setIdx(0);
    }
  };
  
  const advanceScenario = () => {
    if (!scenarioMode) return;
    const nextStep = scenarioStep + 1;
    if (nextStep < scenarioMode.steps.length) {
      setScenarioStep(nextStep);
      const step = scenarioMode.steps[nextStep];
      if (step.layer) {
        const li = visibleLayers.findIndex(([l]) => l === step.layer || step.layer.includes(l));
        if (li >= 0) setIdx(li);
      } else if (nextStep < visibleLayers.length) {
        setIdx(Math.min(nextStep, visibleLayers.length - 1));
      }
      if (scenarioMode.type === 'wallet' && nextStep === 2) {
        setErrors({ walletSim: 'Wallet overflow — consent required' });
      }
    } else {
      if (scenarioMode.type === 'wallet' || scenarioMode.id?.includes('ECARD')) {
        setSubmitted(true);
      }
      setScenarioMode(null); setScenarioStep(0);
    }
  };
  
  useEffect(() => {
    if (pendingScenario && !scenarioMode) {
      runScenario(pendingScenario);
      onScenarioConsumed?.();
    }
  }, [pendingScenario]);
  
  const addMember = () => {
    if (!newMember.name || !newMember.relation) { setErrors({ addForm: 'Name and relation are required' }); return; }
    if (members.length >= 6) { setErrors({ addForm: 'Maximum 6 members allowed' }); return; }
    const age = parseInt(newMember.age) || 0;
    if (newMember.relation === 'Parent' && age > 80) { setErrors({ addForm: 'Parent age cannot exceed 80 years' }); return; }
    if (newMember.relation === 'Child' && age > 25) { setErrors({ addForm: 'Child age cannot exceed 25 years' }); return; }
    setMembers([...members, { id: Date.now(), ...newMember, age }]);
    setNewMember({ name: '', relation: '', age: '', gender: '' });
    setShowAddForm(false);
    setErrors({});
  };
  
  const removeMember = (id) => { if (members.find(m => m.id === id)?.relation === 'Self') return; setMembers(members.filter(m => m.id !== id)); };
  
  const toggleAddon = (key) => {
    if (key === 'opd' && !addOns.opd && selectedSI === '3L' && config.construct === 'FLEX') {
      setErrors({ addon: 'OPD requires Sum Insured ≥ ₹5L' }); return;
    }
    setAddOns({ ...addOns, [key]: !addOns[key] }); setErrors({});
  };
  
  const ctaText = activeLayer === 'L6' ? (config.preEnroll ? 'Submit Preferences' : 'Confirm Enrollment') : activeLayer === 'L5' ? 'Continue to Review' : activeLayer === 'L0' ? 'Get Started' : 'Continue';
  const ctaDisabled = activeLayer === 'L6' && Object.keys(errors).length > 0 && (errors.consent || errors.salary || errors.wallet);
  
  // ---- RENDER SCREENS ----
  const Ann = ({ id }) => showAnnotations ? <span className="absolute -top-2 -right-2 z-10 px-1.5 py-0.5 bg-purple-600 text-white text-[9px] font-bold rounded-full annotation-pulse">{id}</span> : null;
  
  const ErrorOverlay = () => simulatingError ? (
    <div className="absolute inset-0 z-30 bg-black/10 flex items-end pointer-events-none fade-in-up">
      <div className="w-full p-4 pointer-events-auto">
        <div className={`rounded-xl p-4 shadow-lg border-2 ${simulatingError.severity === 'critical' ? 'bg-cerise-200 border-cerise-500' : simulatingError.severity === 'validation' ? 'bg-orange-100 border-orange-500' : simulatingError.severity === 'warning' ? 'bg-orange-100 border-orange-400' : simulatingError.severity === 'blocking' ? 'bg-cerise-200 border-cerise-700' : 'bg-blue-200 border-blue-500'}`}>
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className={`flex-shrink-0 mt-0.5 ${simulatingError.severity === 'critical' || simulatingError.severity === 'blocking' ? 'text-cerise-700' : simulatingError.severity === 'validation' || simulatingError.severity === 'warning' ? 'text-orange-700' : 'text-blue-700'}`} />
            <div className="flex-1">
              <div className="font-bold text-sm text-onyx-800">{simulatingError.error}</div>
              <div className="text-xs text-onyx-600 mt-0.5">{simulatingError.message}</div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white ${simulatingError.severity === 'critical' ? 'bg-cerise-700' : simulatingError.severity === 'validation' ? 'bg-orange-700' : simulatingError.severity === 'warning' ? 'bg-orange-500' : simulatingError.severity === 'blocking' ? 'bg-cerise-700' : 'bg-blue-700'}`}>{simulatingError.severity.toUpperCase()}</span>
                <span className="text-[10px] font-mono text-onyx-400">{simulatingError.id}</span>
              </div>
            </div>
            <button onClick={() => setSimulatingError(null)} className="text-onyx-400 hover:text-onyx-600"><X size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
  
  const ScenarioBanner = () => scenarioMode ? (
    <div className="px-4 py-2 bg-purple-600 text-white flex items-center justify-between">
      <div className="flex items-center gap-2"><Play size={14} /><span className="text-xs font-semibold">{scenarioMode.name}</span><span className="text-[10px] opacity-75">Step {scenarioStep + 1}/{scenarioMode.steps.length}</span></div>
      <div className="flex items-center gap-2">
        <button onClick={advanceScenario} className="text-[10px] px-2 py-1 bg-white text-purple-700 rounded font-bold">{scenarioStep >= scenarioMode.steps.length - 1 ? 'Finish' : 'Next →'}</button>
        <button onClick={() => { setScenarioMode(null); setScenarioStep(0); }} className="text-white/70 hover:text-white"><X size={14} /></button>
      </div>
    </div>
  ) : null;
  
  const renderScreen = () => {
    if (submitted) return (
      <div className="px-5 py-8 text-center space-y-4 fade-in-up">
        <div className="w-20 h-20 rounded-full bg-green-200 flex items-center justify-center mx-auto"><CheckCircle2 size={40} className="text-green-700" /></div>
        <h2 className="text-xl font-bold text-onyx-800">{(config.minPart_topUp||config.minPart_secondary||config.minPart_addOns)?'Preferences submitted':(contentTone==='persuasive'?(config.preEnroll?'Your plan is active!':'You\'re covered!'):(config.preEnroll?'Preferences Submitted!':'Enrollment Confirmed!'))}</h2>
        <p className="text-sm text-onyx-500">{(config.minPart_topUp||config.minPart_secondary||config.minPart_addOns)?'Your selections are saved. Coverage will activate once enrollment reaches the minimum threshold.':(contentTone==='persuasive'?(config.preEnroll?'Your preferences have been recorded. You\'ll be notified when enrollment opens.':config.cdCheck?'We\'re verifying a few details. Your e-card will be available once everything checks out.':'Your health insurance is active. Here\'s your e-card — save it for easy access at any hospital.'):(config.preEnroll?'Your preferences have been recorded for the upcoming policy period.':config.cdCheck?'CD balance check in progress. E-card will be generated shortly.':'Your e-card has been generated successfully!'))}</p>
        {!(config.minPart_topUp||config.minPart_secondary||config.minPart_addOns) && !config.cdCheck && !config.preEnroll && <div className="border border-green-200 rounded-xl p-4 bg-green-100"><div className="text-xs font-semibold text-green-700 mb-2">E-CARD READY</div><div className="bg-white rounded-lg p-3 border border-green-200"><div className="flex items-center gap-3"><Shield size={24} className="text-purple-600" /><div className="text-left"><div className="font-bold text-sm">ACKO Health</div><div className="text-xs text-onyx-500">Policy: GMC-{comboId}</div></div></div><div className="mt-2 text-xs text-onyx-500">UHID: UH{Date.now().toString().slice(-8)}</div></div></div>}
        {premium.employeePays > 0 && <div className="bg-onyx-100 rounded-xl p-3 text-sm text-onyx-700"><CreditCard size={16} className="inline mr-2" />₹{premium.monthlyEmployee}/month will be deducted from salary</div>}
        <button onClick={restart} className="acko-btn bg-purple-600 text-white hover:bg-purple-700 px-6 mx-auto"><RefreshCw size={16} className="mr-2" />Start Over</button>
      </div>
    );
    
    switch (activeLayer) {
      case 'L0': return (
        <div className="px-5 py-4 space-y-5 pb-2">
          <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><Shield size={16} className="text-white" /></div><span className="font-bold text-sm text-purple-800">acko health</span></div>
          <div><h2 className="text-xl font-bold text-onyx-800 leading-tight">{content.headline}</h2><p className="text-sm text-onyx-500 mt-1">{content.subtext}</p></div>
          <div className="relative bg-purple-100 rounded-xl p-4"><Ann id="C01" /><div className="text-xs font-semibold text-purple-700 mb-3 uppercase tracking-wide">What to expect</div><div className="space-y-3">{visibleLayers.map(([l], i) => (<div key={l} className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-xs font-bold">{i + 1}</div><span className="text-sm text-onyx-700">{LAYER_META[l]?.name}</span></div>))}</div></div>
          {content.anxiety_reducers.map((t, i) => <div key={i} className="flex items-center gap-2 text-xs text-green-700 bg-green-100 rounded-lg px-3 py-2"><CheckCircle2 size={14} />{t}</div>)}
        </div>
      );
      
      case 'L1': return (
        <div className="px-5 py-4 space-y-4 pb-2">
          <button onClick={goBack} className="flex items-center gap-1 text-sm text-purple-600"><ChevronLeft size={16} />Back</button>
          <div><h2 className="text-lg font-bold text-onyx-800">{content.headline}</h2><p className="text-sm text-onyx-500 mt-0.5">{content.subtext}</p></div>
          {config.construct === 'FLEX' && <div className="relative"><Ann id="C10" /><WalletBar used={0} total={PremiumCalc.WALLET_TOTAL} /></div>}
          <div className="relative border border-onyx-300 rounded-xl p-4"><Ann id="C02" /><div className="flex justify-between items-start mb-3"><div><div className="text-2xl font-bold text-onyx-800">{config.construct === 'FLEX' ? `₹${(PremiumCalc.SI_COSTS[selectedSI] || 12000).toLocaleString()}` : '₹5,00,000'}</div><div className="text-xs text-onyx-500">Sum Insured</div></div><span className="px-2 py-1 bg-blue-200 text-blue-700 rounded text-[10px] font-medium flex items-center gap-1"><Info size={10} />Floater</span></div><div className="border-t border-onyx-200 pt-3 space-y-2"><div className="text-xs font-semibold text-onyx-600 mb-1">COVERED FAMILY</div>{members.map((m, i) => <div key={i} className="flex items-center gap-2 text-sm text-onyx-700"><Users size={14} className="text-purple-500" />{m.relation}{m.name !== m.relation ? ` (${m.name})` : ''}<CheckCircle2 size={14} className="text-green-600 ml-auto" /></div>)}</div></div>
          <div className="space-y-2"><div className="text-xs font-semibold text-onyx-600">KEY BENEFITS</div>{['Cashless at 10,000+ hospitals', 'Pre & Post hospitalization', 'Day care procedures', 'Ambulance charges'].map((b, i) => <div key={i} className="flex items-center gap-2 text-sm text-onyx-700"><CheckCircle2 size={14} className="text-green-500" />{b}</div>)}</div>
        </div>
      );
      
      case 'L2': return (
        <div className="px-5 py-4 space-y-4 pb-2">
          <button onClick={goBack} className="flex items-center gap-1 text-sm text-purple-600"><ChevronLeft size={16} />Back</button>
          <div><h2 className="text-lg font-bold text-onyx-800">{content.headline}</h2><p className="text-sm text-onyx-500 mt-0.5">{content.subtext}</p></div>
          {members.map((m, i) => (
            <div key={m.id} className="relative border border-onyx-300 rounded-xl p-4">{i === 0 && <Ann id="C04" />}<div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center"><Users size={18} className="text-purple-600" /></div><div><div className="font-semibold text-sm text-onyx-800">{m.name}</div><div className="text-xs text-onyx-500">{m.relation} | {m.age} yrs | {m.gender}</div></div></div>{m.relation !== 'Self' && <button onClick={() => removeMember(m.id)} className="text-xs text-cerise-700 hover:text-cerise-500 p-1"><Trash2 size={16} /></button>}</div></div>
          ))}
          {errors.members && <div className="text-xs text-cerise-700 bg-cerise-200 rounded-lg px-3 py-2 flex items-center gap-2"><AlertCircle size={14} />{errors.members}</div>}
          {showAddForm ? (
            <div className="relative border-2 border-purple-300 rounded-xl p-4 bg-purple-50 space-y-3"><Ann id="C05" /><div className="text-sm font-semibold text-purple-700">Add Family Member</div>
              <input placeholder="Name" value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} className="acko-input text-sm" style={{ height: 40 }} />
              <select value={newMember.relation} onChange={e => setNewMember({ ...newMember, relation: e.target.value })} className="acko-input text-sm" style={{ height: 40 }}><option value="">Select Relationship</option><option>Spouse</option><option>Child</option><option>Parent</option><option>In-Law</option></select>
              <div className="flex gap-2"><input placeholder="Age" type="number" value={newMember.age} onChange={e => setNewMember({ ...newMember, age: e.target.value })} className="acko-input text-sm flex-1" style={{ height: 40 }} /><select value={newMember.gender} onChange={e => setNewMember({ ...newMember, gender: e.target.value })} className="acko-input text-sm flex-1" style={{ height: 40 }}><option value="">Gender</option><option>Male</option><option>Female</option><option>Other</option></select></div>
              {errors.addForm && <div className="text-xs text-cerise-700 flex items-center gap-1"><AlertCircle size={12} />{errors.addForm}</div>}
              <div className="flex gap-2"><button onClick={addMember} className="flex-1 bg-purple-600 text-white rounded-lg py-2 text-sm font-semibold">Add</button><button onClick={() => { setShowAddForm(false); setErrors({}); }} className="flex-1 border border-onyx-300 rounded-lg py-2 text-sm text-onyx-600">Cancel</button></div>
            </div>
          ) : (
            <button onClick={() => setShowAddForm(true)} className="w-full border-2 border-dashed border-onyx-300 rounded-xl py-4 text-sm text-purple-600 font-medium hover:border-purple-400 hover:bg-purple-50 transition-all flex items-center justify-center gap-2"><Plus size={16} />Add family member</button>
          )}
          {config.construct === 'FLEX' && <div className="flex items-center gap-2 text-xs text-orange-700 bg-orange-100 rounded-lg px-3 py-2"><AlertTriangle size={14} />Family changes affect wallet allocation</div>}
        </div>
      );
      
      case 'L3': return (
        <div className="px-5 py-4 space-y-4 pb-2">
          <button onClick={goBack} className="flex items-center gap-1 text-sm text-purple-600"><ChevronLeft size={16} />Back</button>
          <div><h2 className="text-lg font-bold text-onyx-800">{content.headline}</h2><p className="text-sm text-onyx-500 mt-0.5">{content.subtext}</p></div>
          {config.construct === 'MODULAR' && config.topUp && (
            <div className="relative space-y-3"><Ann id="C03" />
              {[{ tier: 'Silver', si: '₹3L', price: 0, features: ['Basic coverage', 'Cashless network'] }, { tier: 'Gold', si: '₹5L', price: 500, features: ['Enhanced coverage', 'Wider network', 'Room rent waiver'] }, { tier: 'Platinum', si: '₹10L', price: 1200, features: ['Premium coverage', 'Global', 'No sub-limits'] }].map((p, i) => (
                <div key={i} onClick={() => setSelectedTier(i)} className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedTier === i ? 'border-purple-600 bg-purple-50' : 'border-onyx-300 hover:border-purple-300'}`}>
                  <div className="flex justify-between items-start mb-2"><div><div className="flex items-center gap-2"><span className="font-bold text-sm">{p.tier}</span>{selectedTier === i && <span className="px-2 py-0.5 bg-purple-200 text-purple-700 rounded text-[10px] font-bold">SELECTED</span>}{i === 0 && <span className="px-2 py-0.5 bg-onyx-200 text-onyx-500 rounded text-[10px]">DEFAULT</span>}</div><div className="text-xs text-onyx-500 mt-0.5">{p.si} Sum Insured</div></div><div className={`font-bold text-sm ${i === 0 ? 'text-green-700' : 'text-orange-700'}`}>{i === 0 ? 'Included' : `+₹${p.price}/mo`}</div></div>
                  <div className="flex flex-wrap gap-1 mt-2">{p.features.map((f, j) => <span key={j} className="text-[10px] px-2 py-0.5 bg-onyx-100 text-onyx-600 rounded-full">{f}</span>)}</div>
                </div>
              ))}
            </div>
          )}
          {config.construct === 'MODULAR' && !config.topUp && (
            <div className="relative border border-onyx-300 rounded-xl p-4"><Ann id="C03" />
              <div className="text-sm font-semibold text-onyx-800 mb-1">Your Assigned Plan</div>
              <div className="text-xs text-onyx-500 mb-3">Gold — ₹5L Sum Insured</div>
              <div className="flex flex-wrap gap-1">{['Enhanced coverage','Wider network','Room rent waiver'].map((f,j)=><span key={j} className="text-[10px] px-2 py-0.5 bg-onyx-100 text-onyx-600 rounded-full">{f}</span>)}</div>
              <div className="mt-3 text-xs text-onyx-400 italic flex items-center gap-1"><Info size={12}/>This plan is assigned by your employer and cannot be changed</div>
            </div>
          )}
          {config.construct === 'FLEX' && config.base === 'base-variable' && (
            <div className="space-y-4">
              <WalletBar used={premium.walletUsed} total={PremiumCalc.WALLET_TOTAL} />
              <div className="relative border border-onyx-300 rounded-xl p-4"><Ann id="C03" /><div className="text-xs font-semibold text-onyx-600 mb-3">SELECT SUM INSURED</div><div className="flex flex-wrap gap-2">{Object.keys(PremiumCalc.SI_COSTS).map(si => (<button key={si} onClick={() => { setSelectedSI(si); setErrors({}); }} className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${selectedSI === si ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-onyx-300 text-onyx-600 hover:border-purple-300'}`}>{si}</button>))}</div>
                <div className="text-xs font-semibold text-onyx-600 mt-4 mb-3">FAMILY COVERAGE</div>
                {['Self only', 'Self + Spouse', 'Self + Family', 'Self + Family + Parents'].map((f, i) => (<div key={i} onClick={() => setSelectedFamilyDef(i)} className={`flex items-center gap-3 p-3 rounded-lg mb-2 cursor-pointer transition-all ${selectedFamilyDef === i ? 'bg-purple-50 border-2 border-purple-600' : 'border border-onyx-200 hover:border-purple-300'}`}><div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedFamilyDef === i ? 'border-purple-600' : 'border-onyx-300'}`}>{selectedFamilyDef === i && <div className="w-3 h-3 rounded-full bg-purple-600" />}</div><span className="text-sm text-onyx-700">{f}</span></div>))}
              </div>
            </div>
          )}
          {config.construct === 'FLEX' && config.base === 'base-fixed' && (
            <div className="space-y-4">
              <WalletBar used={0} total={PremiumCalc.WALLET_TOTAL} />
              <div className="relative border border-onyx-300 rounded-xl p-4"><Ann id="C02" />
                <div className="text-sm font-semibold text-onyx-800 mb-1">Your Base Coverage</div>
                <div className="text-2xl font-bold text-onyx-800">₹5,00,000</div>
                <div className="text-xs text-onyx-500 mb-2">Fixed base plan — Sum Insured</div>
                <div className="flex flex-wrap gap-1">{['Cashless at 10,000+ hospitals','Pre & Post hospitalization','Day care procedures'].map((f,j)=><span key={j} className="text-[10px] px-2 py-0.5 bg-onyx-100 text-onyx-600 rounded-full">{f}</span>)}</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-purple-700 bg-purple-100 rounded-lg px-3 py-2"><Info size={14}/>Use your wallet for enhancements in the next step</div>
            </div>
          )}
          <div className="relative bg-onyx-100 rounded-xl p-3"><Ann id="C06" /><div className="flex justify-between text-sm"><span className="text-onyx-500">Premium impact</span><span className="font-semibold text-onyx-800">{config.construct === 'FLEX' ? `₹${premium.walletUsed.toLocaleString()} from wallet` : selectedTier > 0 ? `+₹${[0, 500, 1200][selectedTier]}/month` : 'Included'}</span></div></div>
        </div>
      );
      
      case 'L4': return (
        <div className="px-5 py-4 space-y-4 pb-2">
          <button onClick={goBack} className="flex items-center gap-1 text-sm text-purple-600"><ChevronLeft size={16} />Back</button>
          <div><h2 className="text-lg font-bold text-onyx-800">{content.headline}</h2><p className="text-sm text-onyx-500 mt-0.5">{content.subtext}</p></div>
          {config.construct === 'FLEX' && <div className="relative flex items-center gap-3 bg-purple-100 rounded-xl p-3"><Ann id="C10" /><Wallet size={16} className="text-purple-600" /><div className="flex-1"><div className="text-xs text-purple-700 font-semibold">₹{premium.walletRemaining.toLocaleString()} remaining</div><WalletBar used={premium.walletUsed} total={PremiumCalc.WALLET_TOTAL} mini /></div></div>}
          {config.topUp && (
            <div className="relative border border-onyx-300 rounded-xl p-4"><Ann id="C08" /><div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-blue-200 flex items-center justify-center"><Shield size={18} className="text-blue-700" /></div><div><div className="font-semibold text-sm">Top-up Cover</div><div className="text-xs text-onyx-500">Extra ₹5L after base exhausted</div></div></div><div className="text-right"><div className="text-sm font-bold">₹{PremiumCalc.TOPUP_COST.toLocaleString()}/yr</div>{config.construct === 'FLEX' && <div className="text-[10px] text-purple-600">from wallet</div>}</div></div><div className="mt-3 flex items-center justify-between"><span className="text-xs text-onyx-600">{topUpEnabled ? 'Added' : 'Add to coverage'}</span><Toggle on={topUpEnabled} onToggle={() => setTopUpEnabled(!topUpEnabled)} /></div></div>
          )}
          {config.secondary && (
            <div className="relative border border-onyx-300 rounded-xl p-4"><Ann id="C09" /><div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-green-200 flex items-center justify-center"><Users size={18} className="text-green-700" /></div><div><div className="font-semibold text-sm">Parent Cover</div><div className="text-xs text-onyx-500">₹3L for parents</div></div></div><div className="text-sm font-bold">₹{PremiumCalc.SECONDARY_COST.toLocaleString()}/yr</div></div><div className="mt-3 flex items-center justify-between"><span className="text-xs text-onyx-600">{secondaryEnabled ? 'Added' : 'Add to coverage'}</span><Toggle on={secondaryEnabled} onToggle={() => setSecondaryEnabled(!secondaryEnabled)} /></div></div>
          )}
          {config.addOns && (
            <div className="relative space-y-3"><Ann id="C07" /><div className="text-xs font-semibold text-onyx-600">ADD-ONS</div>
              {[{ key: 'opd', name: 'OPD Cover', desc: '₹15,000/year', cost: PremiumCalc.ADDON_COSTS.opd, popular: true }, { key: 'dental', name: 'Dental & Vision', desc: '₹10,000/year', cost: PremiumCalc.ADDON_COSTS.dental }, { key: 'wellness', name: 'Wellness Program', desc: 'Health checkups', cost: PremiumCalc.ADDON_COSTS.wellness }].map(a => (
                <div key={a.key} className={`border rounded-xl p-3 transition-all ${addOns[a.key] ? 'border-purple-400 bg-purple-50' : 'border-onyx-200'}`}>
                  <div className="flex items-center justify-between">
                    <div><div className="flex items-center gap-2"><span className="font-medium text-sm">{a.name}</span>{a.popular && <span className="px-1.5 py-0.5 bg-orange-200 text-orange-700 text-[9px] font-bold rounded">POPULAR</span>}</div><div className="text-xs text-onyx-500 mt-0.5">{a.desc} | ₹{a.cost.toLocaleString()}/yr</div></div>
                    <Toggle on={addOns[a.key]} onToggle={() => toggleAddon(a.key)} />
                  </div>
                </div>
              ))}
              {errors.addon && <div className="text-xs text-cerise-700 bg-cerise-200 rounded-lg px-3 py-2 flex items-center gap-2"><AlertCircle size={14} />{errors.addon}</div>}
            </div>
          )}
          <div className="bg-onyx-100 rounded-xl p-3"><div className="flex justify-between text-sm"><span className="text-onyx-500">Enhancement total</span><span className="font-semibold">₹{(premium.topUpCost + premium.secondaryCost + premium.addOnCost).toLocaleString()}/yr</span></div></div>
        </div>
      );
      
      case 'L5': return (
        <div className="px-5 py-4 space-y-4 pb-2">
          <button onClick={goBack} className="flex items-center gap-1 text-sm text-purple-600"><ChevronLeft size={16} />Back</button>
          <div><h2 className="text-lg font-bold text-onyx-800">{content.headline}</h2><p className="text-sm text-onyx-500 mt-0.5">{content.subtext}</p></div>
          <div className="relative border border-onyx-300 rounded-xl overflow-hidden"><Ann id="C06" /><div className="bg-onyx-800 text-white p-4"><div className="text-xs opacity-70">Total Annual Premium</div><div className="text-3xl font-bold mt-1">₹{premium.total.toLocaleString()}</div><div className="text-xs opacity-70 mt-1">₹{Math.round(premium.total / 12).toLocaleString()}/month</div></div>
            <div className="p-4 space-y-4">
              <div><div className="flex justify-between text-sm mb-2"><span className="text-onyx-500">{config.construct === 'FLEX' ? 'Wallet covers' : '[Company] pays'}</span><span className="font-bold text-green-700">₹{premium.employerPays.toLocaleString()} ({Math.round(premium.employerPays / premium.total * 100)}%)</span></div><div className="w-full bg-onyx-200 rounded-full h-3"><div className="bg-green-500 rounded-full h-3 transition-all" style={{ width: `${Math.round(premium.employerPays / premium.total * 100)}%` }} /></div></div>
              {premium.employeePays > 0 && <div><div className="flex justify-between text-sm mb-2"><span className="text-onyx-500">You pay</span><span className="font-bold text-orange-700">₹{premium.employeePays.toLocaleString()} ({Math.round(premium.employeePays / premium.total * 100)}%)</span></div><div className="w-full bg-onyx-200 rounded-full h-3"><div className="bg-orange-500 rounded-full h-3 transition-all" style={{ width: `${Math.round(premium.employeePays / premium.total * 100)}%` }} /></div></div>}
              <div className="border-t border-onyx-200 pt-3"><div className="text-xs font-semibold text-onyx-600 mb-2">BREAKDOWN</div>{[['Base Coverage', premium.baseCost], premium.topUpCost > 0 && ['Top-up', premium.topUpCost], premium.secondaryCost > 0 && ['Secondary', premium.secondaryCost], premium.addOnCost > 0 && ['Add-ons', premium.addOnCost]].filter(Boolean).map(([item, cost], i) => <div key={i} className="flex justify-between text-sm py-1.5 border-b border-onyx-100 last:border-0"><span className="text-onyx-700">{item}</span><span className="font-medium">₹{cost.toLocaleString()}</span></div>)}</div>
            </div>
          </div>
          {config.construct === 'FLEX' && premium.walletOverflow > 0 && <div className="bg-orange-100 border border-orange-200 rounded-xl p-4"><div className="flex items-center gap-2 mb-1"><AlertTriangle size={16} className="text-orange-700" /><span className="font-semibold text-sm text-orange-800">Wallet Overflow</span></div><div className="text-sm text-orange-700">Exceeds wallet by <span className="font-bold">₹{premium.walletOverflow.toLocaleString()}</span></div><div className="text-xs text-orange-600 mt-1">₹{premium.monthlyEmployee}/month salary deduction</div></div>}
          {premium.employeePays > 0 && <div className="bg-onyx-100 rounded-xl p-3 flex items-center gap-3"><CreditCard size={18} className="text-onyx-500" /><div><div className="text-sm font-medium text-onyx-800">₹{premium.monthlyEmployee}/month salary deduction</div><div className="text-xs text-onyx-500">Deducted from your monthly salary</div></div></div>}
        </div>
      );
      
      case 'L6': return (
        <div className="px-5 py-4 space-y-4 pb-2">
          <button onClick={goBack} className="flex items-center gap-1 text-sm text-purple-600"><ChevronLeft size={16} />Back</button>
          <div><h2 className="text-lg font-bold text-onyx-800">{content.headline}</h2><p className="text-sm text-onyx-500 mt-0.5">{content.subtext}</p></div>
          <div className="relative space-y-3"><Ann id="C12" />
            {/* Coverage */}
            <div className="border border-onyx-200 rounded-xl p-4"><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><Shield size={16} className="text-purple-600" /><span className="font-semibold text-sm">Coverage</span></div><button onClick={() => goToLayer(visibleLayers.findIndex(([l]) => l === 'L1'))} className="text-xs text-purple-600 font-medium">Edit</button></div><div className="text-sm text-onyx-600">{config.construct === 'MODULAR' ? ['Silver', 'Gold', 'Platinum'][selectedTier] + ' Tier - ' : ''}₹{config.construct === 'FLEX' ? selectedSI : '5L'} Floater</div></div>
            {/* Family */}
            <div className="border border-onyx-200 rounded-xl p-4"><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><Users size={16} className="text-purple-600" /><span className="font-semibold text-sm">Family ({members.length})</span></div><button onClick={() => goToLayer(visibleLayers.findIndex(([l]) => l === 'L2'))} className="text-xs text-purple-600 font-medium">Edit</button></div><div className="text-sm text-onyx-600">{members.map(m => m.relation).join(', ')}</div></div>
            {/* Enhancements */}
            {(topUpEnabled || secondaryEnabled || Object.values(addOns).some(Boolean)) && <div className="border border-onyx-200 rounded-xl p-4"><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><Heart size={16} className="text-purple-600" /><span className="font-semibold text-sm">Enhancements</span></div><button onClick={() => goToLayer(visibleLayers.findIndex(([l]) => l === 'L4'))} className="text-xs text-purple-600 font-medium">Edit</button></div><div className="text-sm text-onyx-600 space-y-1">{topUpEnabled && <div>Top-up: ₹{PremiumCalc.TOPUP_COST.toLocaleString()}/yr</div>}{secondaryEnabled && <div>Secondary: ₹{PremiumCalc.SECONDARY_COST.toLocaleString()}/yr</div>}{addOns.opd && <div>OPD Cover</div>}{addOns.dental && <div>Dental & Vision</div>}{addOns.wellness && <div>Wellness Program</div>}</div></div>}
            {/* Premium */}
            {premium.employeePays > 0 && <div className="border border-onyx-200 rounded-xl p-4"><div className="flex items-center gap-2 mb-2"><CreditCard size={16} className="text-purple-600" /><span className="font-semibold text-sm">Your Investment</span></div><div className="text-sm text-onyx-600">₹{premium.monthlyEmployee}/month from salary</div>{config.construct === 'FLEX' && <div className="text-sm text-onyx-600">₹{premium.walletUsed.toLocaleString()} from wallet</div>}{premium.walletOverflow > 0 && <div className="text-xs text-orange-700 mt-1 font-semibold">+ ₹{premium.walletOverflow.toLocaleString()} overflow charge</div>}</div>}
          </div>
          {/* Consents */}
          <div className="relative space-y-3"><Ann id="C11" />
            <label onClick={() => { setConsentTerms(!consentTerms); setErrors({}); }} className="flex items-start gap-3 cursor-pointer"><div className={`w-5 h-5 border-2 rounded mt-0.5 flex-shrink-0 flex items-center justify-center transition-all ${consentTerms ? 'border-purple-600 bg-purple-600' : 'border-onyx-300'}`}>{consentTerms && <CheckCircle2 size={14} className="text-white" />}</div><span className="text-xs text-onyx-600 leading-relaxed">I agree to the terms and conditions of the group health insurance policy</span></label>
            {FlowEngine.hasEmployeePayment(config) && premium.employeePays > 0 && <label onClick={() => { setConsentSalary(!consentSalary); setErrors({}); }} className="flex items-start gap-3 cursor-pointer"><div className={`w-5 h-5 border-2 rounded mt-0.5 flex-shrink-0 flex items-center justify-center transition-all ${consentSalary ? 'border-purple-600 bg-purple-600' : errors.salary ? 'border-cerise-500' : 'border-onyx-300'}`}>{consentSalary && <CheckCircle2 size={14} className="text-white" />}</div><span className="text-xs text-onyx-600 leading-relaxed">I consent to ₹{premium.monthlyEmployee}/month salary deduction</span></label>}
            {config.construct === 'FLEX' && premium.walletOverflow > 0 && <label onClick={() => { setConsentWallet(!consentWallet); setErrors({}); }} className="flex items-start gap-3 cursor-pointer"><div className={`w-5 h-5 border-2 rounded mt-0.5 flex-shrink-0 flex items-center justify-center transition-all ${consentWallet ? 'border-purple-600 bg-purple-600' : errors.wallet ? 'border-cerise-500' : 'border-onyx-300'}`}>{consentWallet && <CheckCircle2 size={14} className="text-white" />}</div><span className="text-xs text-onyx-600 leading-relaxed">I acknowledge the wallet overflow of ₹{premium.walletOverflow.toLocaleString()}</span></label>}
          </div>
          {Object.keys(errors).length > 0 && <div className="text-xs text-cerise-700 bg-cerise-200 rounded-lg px-3 py-2 flex items-center gap-2"><AlertCircle size={14} />{Object.values(errors)[0]}</div>}
          {config.preEnroll && <div className="bg-blue-200 text-blue-700 rounded-xl p-3 text-xs flex items-center gap-2"><Info size={14} />Pre-enrollment: preferences only, not final.</div>}
          {(config.minPart_topUp||config.minPart_secondary||config.minPart_addOns) && <div className="bg-orange-100 text-orange-700 rounded-xl p-3 text-xs space-y-1">{config.minPart_topUp && <div className="flex items-center gap-2"><AlertTriangle size={14}/>Top-up: pending minimum participation</div>}{config.minPart_secondary && <div className="flex items-center gap-2"><AlertTriangle size={14}/>Secondary: pending minimum participation</div>}{config.minPart_addOns && <div className="flex items-center gap-2"><AlertTriangle size={14}/>Add-ons: pending minimum participation</div>}</div>}
        </div>
      );
      
      default: return <div className="p-5 text-onyx-500 text-center">Layer not available</div>;
    }
  };
  
  return (
    <div className="flex gap-8 items-start">
      {/* Phone + Controls */}
      <div className="flex-shrink-0">
        <div className="flex items-center justify-between mb-4 px-2" style={{ width: 375 }}>
          <div className="text-xs text-onyx-500">{activeLayer} - {LAYER_META[activeLayer]?.shortName} {submitted && '(Submitted)'}</div>
          <div className="flex items-center gap-2"><select value={contentTone} onChange={e=>setContentTone(e.target.value)} className={`px-2 py-1.5 rounded-lg text-xs font-medium border-0 cursor-pointer ${contentTone==='info'?'bg-green-200 text-green-700':contentTone==='awareness'?'bg-orange-200 text-orange-700':'bg-purple-200 text-purple-700'}`}><option value="info">Info (Vanilla)</option><option value="awareness">Awareness (Modular)</option><option value="persuasive">Persuasive (Flex)</option></select><button onClick={() => setShowAnnotations(!showAnnotations)} className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${showAnnotations ? 'bg-purple-600 text-white' : 'bg-onyx-200 text-onyx-600'}`}><Tag size={12} />{showAnnotations ? 'Hide IDs' : 'Show IDs'}</button></div>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={goBack} disabled={idx === 0 || submitted} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${idx === 0 || submitted ? 'bg-onyx-200 text-onyx-400' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}><ChevronLeft size={20} /></button>
          
          <div className="relative phone-shadow rounded-[44px]" style={{ width: 375, height: 780 }}>
            <div className="absolute inset-0 bg-onyx-800 rounded-[44px]">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-onyx-800 rounded-full z-20" />
              <div className="absolute top-[8px] bottom-[8px] left-[8px] right-[8px] bg-white rounded-[38px] overflow-hidden flex flex-col">
                {/* Status bar */}
                <div className="flex justify-between items-center px-6 pt-14 pb-2" style={{ fontSize: 12 }}>
                  <span className="font-semibold text-onyx-800">9:41</span>
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-[2px]">{[4, 6, 8, 10].map((h, i) => <div key={i} className="w-[3px] bg-onyx-800 rounded-full" style={{ height: h }} />)}</div>
                    <div className="relative w-[22px] h-[10px]"><div className="absolute inset-0 border border-onyx-800 rounded-[2px]" /><div className="absolute top-[1px] left-[1px] bottom-[1px] bg-green-600 rounded-[1px]" style={{ width: '80%' }} /><div className="absolute top-[3px] -right-[2px] w-[1.5px] h-[4px] bg-onyx-800 rounded-r-full" /></div>
                  </div>
                </div>
                
                {/* Progress stepper - clickable */}
                {!submitted && (
                  <div className="px-4 py-2 flex items-center gap-1.5">
                    {visibleLayers.map(([l], i) => (
                      <div key={l} className="flex-1 flex flex-col items-center cursor-pointer" onClick={() => goToLayer(i)}>
                        <div className={`h-1.5 w-full rounded-full transition-all ${i < idx ? 'bg-purple-600' : i === idx ? 'bg-purple-400' : 'bg-onyx-300'}`} />
                        <span className={`text-[8px] mt-1 transition-all ${i === idx ? 'text-purple-700 font-bold' : i < idx ? 'text-purple-400' : 'text-onyx-400'}`}>{layerNames[i]}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Scenario Banner */}
                <ScenarioBanner />
                {/* Scrollable content with error overlay */}
                <div className="flex-1 overflow-y-auto mobile-scroll relative">{renderScreen()}<ErrorOverlay /></div>
                
                {/* Floating CTA */}
                {!submitted && (
                  <div className="px-5 py-3 bg-white border-t border-onyx-200">
                    <button onClick={goNext} className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${activeLayer === 'L6' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'} shadow-lg`}>{ctaText}</button>
                    {activeLayer === 'L4' && <button onClick={goNext} className="w-full text-center text-xs text-onyx-500 py-2 mt-1">Skip enhancements</button>}
                  </div>
                )}
                
                {/* Home indicator */}
                <div className="flex justify-center py-2"><div className="w-[134px] h-[5px] bg-onyx-300 rounded-full" /></div>
              </div>
            </div>
          </div>
          
          <button onClick={goNext} disabled={idx === visibleLayers.length - 1 && activeLayer !== 'L6' || submitted} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${(idx === visibleLayers.length - 1 && activeLayer !== 'L6') || submitted ? 'bg-onyx-200 text-onyx-400' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}><ChevronRight size={20} /></button>
        </div>
        
        {/* Layer dots */}
        <div className="flex justify-center gap-2 mt-4">
          {visibleLayers.map(([l], i) => (
            <button key={l} onClick={() => goToLayer(i)} className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${submitted ? 'bg-green-200 text-green-700' : i === idx ? 'bg-purple-600 text-white scale-110' : i < idx ? 'bg-purple-200 text-purple-700' : 'bg-onyx-200 text-onyx-600 cursor-not-allowed'}`}>{l.replace('L', '')}</button>
          ))}
        </div>
      </div>
      
      {/* Info Panel */}
      <div className="flex-1 min-w-0 space-y-4">
        <div className="acko-card p-5 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${submitted ? 'bg-green-200 text-green-700' : decisions[activeLayer] === 'D' ? 'bg-orange-200 text-orange-700' : 'bg-blue-200 text-blue-700'}`}><span className="font-bold text-sm">{submitted ? '✓' : activeLayer}</span></div>
            <div><h3 className="font-bold text-onyx-800">{submitted ? 'Enrollment Complete' : LAYER_META[activeLayer]?.name}</h3><p className="text-xs text-onyx-500">{submitted ? `${comboId} - ${config.construct}` : LAYER_META[activeLayer]?.purpose}</p></div>
          </div>
          {!submitted && <div className="bg-purple-100 rounded-xl p-3"><div className="text-xs text-purple-600 font-semibold mb-1">CORE QUESTION</div><div className="text-sm text-purple-800 font-medium italic">"{LAYER_META[activeLayer]?.question}"</div></div>}
          {/* Live premium */}
          <div className="mt-3 bg-onyx-100 rounded-xl p-3"><div className="text-xs font-semibold text-onyx-600 mb-2">LIVE PREMIUM</div><div className="grid grid-cols-2 gap-2 text-xs"><div>Total: <span className="font-bold">₹{premium.total.toLocaleString()}/yr</span></div><div>You pay: <span className="font-bold text-orange-700">₹{premium.monthlyEmployee}/mo</span></div>{config.construct === 'FLEX' && <><div>Wallet: <span className="font-bold text-green-700">₹{premium.walletUsed.toLocaleString()}</span></div><div>Overflow: <span className={`font-bold ${premium.walletOverflow > 0 ? 'text-cerise-700' : 'text-green-700'}`}>₹{premium.walletOverflow.toLocaleString()}</span></div></>}</div></div>
        </div>
        
        <div className="acko-card p-5 bg-white">
          <h4 className="font-semibold text-sm text-onyx-800 mb-3 flex items-center gap-2"><Layers size={16} className="text-purple-600" />Active Components ({layerComps.length})</h4>
          <div className="space-y-2">{layerComps.map((c, i) => (<div key={i} className="flex items-center gap-3 p-2 bg-onyx-100 rounded-lg"><span className="px-2 py-1 bg-purple-200 text-purple-700 rounded text-[10px] font-bold">{c.id}</span><div className="flex-1 min-w-0"><div className="text-sm text-onyx-800 font-medium">{c.name}</div><div className="text-[10px] text-onyx-500">{c.variant} | {c.state}</div></div></div>))}</div>
        </div>
        
        <div className="acko-card p-5 bg-white">
          <h4 className="font-semibold text-sm text-onyx-800 mb-3 flex items-center gap-2"><AlertTriangle size={16} className="text-orange-500" />Edge Cases</h4>
          <div className="space-y-2">{(LAYER_EDGE_CASES[activeLayer] || []).map((ec, i) => (<div key={i} className="flex items-start gap-2 text-sm text-onyx-700 p-2 bg-orange-100 rounded-lg"><AlertTriangle size={14} className="text-orange-500 mt-0.5 flex-shrink-0" /><span>{ec}</span></div>))}</div>
        </div>
        
        <div className="acko-card p-5 bg-white">
          <h4 className="font-semibold text-sm text-onyx-800 mb-3 flex items-center gap-2"><AlertCircle size={16} className="text-cerise-500" />Error States</h4>
          <div className="space-y-2">{(LAYER_ERRORS[activeLayer] || []).map(err => (<div key={err.id} className={`p-2 rounded-lg transition-all ${simulatingError?.id === err.id ? 'bg-cerise-200 ring-2 ring-cerise-500' : 'bg-onyx-100'}`}><div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white ${err.severity === 'critical' ? 'bg-cerise-700' : err.severity === 'validation' ? 'bg-orange-700' : err.severity === 'warning' ? 'bg-orange-500' : err.severity === 'blocking' ? 'bg-cerise-700' : 'bg-blue-700'}`}>{err.severity}</span><span className="text-xs font-mono text-onyx-400">{err.id}</span></div><button onClick={()=>simulateError(err)} className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${simulatingError?.id === err.id ? 'bg-cerise-700 text-white' : 'bg-cerise-200 text-cerise-700 hover:bg-cerise-300'}`}><Play size={10}/>{simulatingError?.id === err.id ? 'Simulating...' : 'Simulate'}</button></div><div className="text-sm font-medium text-onyx-800 mt-1">{err.error}</div><div className="text-xs text-onyx-500">{err.message}</div></div>))}</div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CONFIG FORM + JSON UPLOAD
// ============================================================================
const ConfigForm = ({ onConfigChange }) => {
  const [cc, setCc] = useState({construct:'VANILLA',base:'fixed',topUp:null,secondary:null,addOns:null,basePay:'employer',topUpPay:null,secPay:null,addOnPay:null,minPart:false,preEnroll:false,cdCheck:false,gradeBased:false});
  const h = (f, v) => { const n = { ...cc, [f]: v }; setCc(n); onConfigChange(n, 'CUSTOM'); };
  return(
    <div className="acko-card p-6 bg-white">
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-onyx-800"><Settings size={20} className="text-purple-600"/>Custom Configuration</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div><label className="block text-xs font-medium text-onyx-500 mb-1">Construct</label><select value={cc.construct} onChange={e=>h('construct',e.target.value)} className="acko-input"><option value="VANILLA">VANILLA</option><option value="MODULAR">MODULAR</option><option value="FLEX">FLEX</option></select></div>
        <div><label className="block text-xs font-medium text-onyx-500 mb-1">Base</label><select value={cc.base} onChange={e=>h('base',e.target.value)} className="acko-input"><option value="fixed">Fixed</option><option value="tier-selectable">Tier-Selectable</option><option value="base-variable">Base Variable (Flex)</option><option value="base-fixed">Base Fixed (Flex)</option></select></div>
        <div><label className="block text-xs font-medium text-onyx-500 mb-1">Top-up</label><select value={cc.topUp||''} onChange={e=>h('topUp',e.target.value||null)} className="acko-input"><option value="">None</option><option value="standard">Standard</option><option value="tier-upgrade">Tier Upgrade (Modular)</option><option value="consolidated">Consolidated</option></select></div>
        <div><label className="block text-xs font-medium text-onyx-500 mb-1">Secondary</label><select value={cc.secondary||''} onChange={e=>h('secondary',e.target.value||null)} className="acko-input"><option value="">None</option><option value="single">Single</option><option value="multi">Multiple</option></select></div>
        <div><label className="block text-xs font-medium text-onyx-500 mb-1">Add-ons</label><select value={cc.addOns||''} onChange={e=>h('addOns',e.target.value||null)} className="acko-input"><option value="">None</option><option value="available">Available</option><option value="wellness">Wellness</option></select></div>
        <div><label className="block text-xs font-medium text-onyx-500 mb-1">Base Pay</label><select value={cc.basePay} onChange={e=>h('basePay',e.target.value)} className="acko-input"><option value="employer">Employer</option><option value="employee">Employee</option><option value="partial">Partial</option><option value="wallet">Wallet</option></select></div>
        <div className="col-span-2 md:col-span-3"><label className="block text-xs font-medium text-onyx-500 mb-2">Flags</label><div className="flex flex-wrap gap-4">{[{k:'minPart',l:'Min Participation'},{k:'preEnroll',l:'Pre-Enrollment'},{k:'cdCheck',l:'CD Check'},{k:'gradeBased',l:'Grade-Based'}].map(f=><label key={f.k} className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={cc[f.k]} onChange={e=>h(f.k,e.target.checked)} className="w-4 h-4 text-purple-600 rounded"/><span className="text-sm text-onyx-700">{f.l}</span></label>)}</div></div>
      </div>
    </div>
  );
};

const JsonUpload = ({ onConfigLoad }) => {
  const [txt, setTxt] = useState('');
  const [err, setErr] = useState(null);
  return(
    <div className="acko-card p-6 bg-white">
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-onyx-800"><Upload size={20} className="text-purple-600"/>Import JSON</h3>
      <textarea value={txt} onChange={e=>setTxt(e.target.value)} placeholder={`Paste JSON...\n${JSON.stringify(POLICY_COMBINATIONS.V11,null,2)}`} className="w-full h-48 px-4 py-3 border border-onyx-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-purple-200 focus:border-purple-600 resize-none focus:outline-none"/>
      {err&&<div className="mt-2 text-cerise-500 text-sm flex items-center gap-2"><AlertCircle size={16}/>{err}</div>}
      <button onClick={()=>{try{onConfigLoad(JSON.parse(txt),'JSON');setErr(null);}catch{setErr('Invalid JSON');}}} className="mt-4 acko-btn bg-purple-600 text-white hover:bg-purple-700 px-6">Parse & Load</button>
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================
export default function GMCFlowEngineSimulator() {
  const [selectedCombo, setSelectedCombo] = useState('V01');
  const [inputMode, setInputMode] = useState('rfq');
  const [analysisTab, setAnalysisTab] = useState('flow');
  const [customConfig, setCustomConfig] = useState(null);
  const [rfqMatches, setRfqMatches] = useState(null);
  const [pendingScenario, setPendingScenario] = useState(null);
  
  const currentConfig = useMemo(() => (inputMode === 'preset' || inputMode === 'rfq') ? POLICY_COMBINATIONS[selectedCombo] : (customConfig || POLICY_COMBINATIONS.V01), [selectedCombo, inputMode, customConfig]);
  const layers = useMemo(() => FlowEngine.getLayerVisibility(currentConfig), [currentConfig]);
  const scenarios = useMemo(() => FlowEngine.generateTestScenarios(currentConfig, selectedCombo), [currentConfig, selectedCombo]);
  
  const handleConfigChange = (config, source) => { setCustomConfig(config); if (source === 'CUSTOM' || source === 'JSON') setInputMode('form'); };
  const handleRFQSelect = useCallback((comboId) => { setSelectedCombo(comboId); setInputMode('rfq'); }, []);
  const comboGroups = useMemo(() => { const g = { VANILLA: [], MODULAR: [], FLEX: [] }; Object.entries(POLICY_COMBINATIONS).forEach(([id, config]) => g[config.construct].push({ id, ...config })); return g; }, []);
  
  return (
    <>
      <style>{ackoStyles}</style>
      <div className="min-h-screen bg-onyx-200">
        <header className="bg-onyx-100 border-b border-onyx-300 sticky top-0 z-50 shadow-sm">
          <div className="max-w-[1600px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div><h1 className="text-2xl font-bold text-onyx-800 flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center"><GitBranch className="text-white" size={22} /></div>GMC Flow Engine Simulator</h1><p className="text-onyx-500 text-sm mt-1">Interactive mobile prototype with real-time validations</p></div>
              <div className="flex items-center gap-2"><span className="text-xs text-onyx-500">Input:</span><div className="flex bg-onyx-200 rounded-lg p-1">{[{id:'rfq',label:'RFQ Match',icon:Search},{id:'preset',label:'Presets',icon:List},{id:'form',label:'Form',icon:Settings},{id:'json',label:'JSON',icon:Upload}].map(m=>(<button key={m.id} onClick={()=>setInputMode(m.id)} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-1.5 ${inputMode===m.id?'bg-white text-purple-700 shadow-sm':'text-onyx-600 hover:text-onyx-800'}`}><m.icon size={14}/>{m.label}</button>))}</div></div>
            </div>
          </div>
        </header>
        
        <main className="max-w-[1600px] mx-auto px-6 py-8">
          <div className="mb-8">
            {inputMode === 'rfq' && <RFQBuilder onSelectCombo={handleRFQSelect} onMatchResults={setRfqMatches} />}
            {inputMode === 'preset' && (
              <div className="acko-card p-6 bg-white"><h3 className="font-semibold mb-4 text-onyx-800">Select Policy Combination</h3><div className="grid grid-cols-3 gap-6">{Object.entries(comboGroups).map(([construct, combos]) => (<div key={construct}><div className={`text-sm font-bold mb-2 px-3 py-1 rounded-lg inline-block ${construct==='VANILLA'?'bg-green-200 text-green-700':construct==='MODULAR'?'bg-orange-200 text-orange-700':'bg-purple-200 text-purple-700'}`}>{construct} ({combos.length})</div><div className="space-y-1 max-h-64 overflow-y-auto pr-2">{combos.map(c=><button key={c.id} onClick={()=>setSelectedCombo(c.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedCombo===c.id?'bg-purple-100 text-purple-700 font-medium':'hover:bg-onyx-100 text-onyx-700'}`}><span className="font-mono font-bold">{c.id}</span><span className="text-onyx-500 ml-2">{c.name}</span></button>)}</div></div>))}</div></div>
            )}
            {inputMode === 'form' && <ConfigForm onConfigChange={handleConfigChange} />}
            {inputMode === 'json' && <JsonUpload onConfigLoad={handleConfigChange} />}
          </div>
          
          <div className="mb-8 p-6 bg-white border border-purple-200 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center justify-between relative z-10">
              <div><div className="text-sm text-onyx-500 mb-1">Currently Analyzing</div><div className="text-2xl font-bold text-onyx-800 flex items-center gap-3">{inputMode==='form'||inputMode==='json'?'Custom':selectedCombo}<span className={`px-3 py-1 rounded-lg text-sm font-bold ${currentConfig.construct==='VANILLA'?'bg-green-200 text-green-700':currentConfig.construct==='MODULAR'?'bg-orange-200 text-orange-700':'bg-purple-200 text-purple-700'}`}>{currentConfig.construct}</span><span className="text-lg font-normal text-onyx-500">{currentConfig.name||''}</span></div></div>
              <div className="flex gap-8"><div className="text-center"><div className="text-3xl font-bold text-purple-600">{Object.values(layers).filter(l=>l.show).length}</div><div className="text-xs text-onyx-500 font-medium uppercase tracking-wide">Layers</div></div><div className="text-center"><div className="text-3xl font-bold text-purple-600">{scenarios.length}</div><div className="text-xs text-onyx-500 font-medium uppercase tracking-wide">Tests</div></div><div className="text-center"><div className="text-3xl font-bold text-purple-600">{Object.values(FlowEngine.getLayerDecision(currentConfig)).filter(v=>v==='D').length}</div><div className="text-xs text-onyx-500 font-medium uppercase tracking-wide">Decisions</div></div></div>
            </div>
          </div>
          
          <div className="mb-6"><div className="flex bg-onyx-100 rounded-xl p-1.5 border border-onyx-300">{[{id:'flow',label:'Flow Overview',icon:GitBranch},{id:'mobile',label:'Interactive Mobile',icon:Smartphone},{id:'components',label:'Components & Tests',icon:List},{id:'content',label:'Content & Export',icon:FileText}].map(tab=>(<button key={tab.id} onClick={()=>setAnalysisTab(tab.id)} className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${analysisTab===tab.id?'bg-white text-purple-700 shadow-md':'text-onyx-600 hover:text-onyx-800'}`}><tab.icon size={16}/>{tab.label}</button>))}</div></div>
          
          <div className="tab-content">
            {analysisTab === 'flow' && <div className="space-y-8"><FlowDiagram layers={layers} config={currentConfig} /><DecisionMatrix config={currentConfig} layers={layers} /></div>}
            {analysisTab === 'mobile' && <div className="acko-card p-6 bg-white"><h3 className="font-semibold mb-6 flex items-center gap-2 text-onyx-800"><Smartphone size={20} className="text-purple-600" />Interactive Mobile Preview — {selectedCombo} ({currentConfig.construct})</h3><p className="text-sm text-onyx-500 mb-6">Click Continue to navigate, toggle add-ons, add family members, select plans. Real-time premium calculation and wallet tracking. All validations active.</p><MobileSimulator config={currentConfig} layers={layers} comboId={selectedCombo} pendingScenario={pendingScenario} onScenarioConsumed={()=>setPendingScenario(null)} /></div>}
            {analysisTab === 'components' && <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"><ComponentChecklist config={currentConfig} layers={layers} /><TestScenarios scenarios={scenarios} onRunScenario={(s)=>{setPendingScenario(s);setAnalysisTab('mobile');}} /></div>}
            {analysisTab === 'content' && <div className="space-y-8"><ContentRequirements config={currentConfig} layers={layers} /><ExportPanel config={currentConfig} comboId={inputMode==='preset'||inputMode==='rfq'?selectedCombo:'CUSTOM'} layers={layers} scenarios={scenarios} /></div>}
          </div>
        </main>
        
        <footer className="bg-onyx-100 border-t border-onyx-300 py-6 mt-12"><div className="max-w-[1600px] mx-auto px-6 text-center text-onyx-500 text-sm">GMC Flow Engine Simulator v4.1 | 51 Combinations (20V + 11M + 20F) | Error Simulation on Mobile + Scenario Playback + Content Tone Pyramid</div></footer>
      </div>
    </>
  );
}
