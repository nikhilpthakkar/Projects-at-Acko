export interface ComponentDef {
  id: string;
  name: string;
  layers: string;
  priority: 'P0' | 'P0-FLEX' | 'P1';
  variants: { name: string; description: string }[];
  states: { name: string; description: string; visual: string }[];
  constructCondition: string;
  figmaFrame: string;
  contentSlots: { layer: string; construct: string; headline: string; subtext: string; ctaPrimary: string; ctaSecondary: string }[];
  errors: { id: string; error: string; message: string; severity: string }[];
  edgeCases: string[];
}

export const COMPONENTS: ComponentDef[] = [
  {
    id: 'C01', name: 'Progress Stepper', layers: 'ALL', priority: 'P0',
    variants: [{ name: 'horizontal', description: 'Single row of bars with layer labels below' }],
    states: [
      { name: 'completed', description: 'Layer already visited', visual: 'Bar: purple-600, Label: purple-400' },
      { name: 'active', description: 'Current layer', visual: 'Bar: purple-400, Label: purple-700 bold' },
      { name: 'upcoming', description: 'Not yet reached', visual: 'Bar: onyx-300, Label: onyx-400' },
    ],
    constructCondition: 'All constructs',
    figmaFrame: 'Stepper/Horizontal',
    contentSlots: [],
    errors: [],
    edgeCases: ['Number of segments varies (4-7) depending on visible layers'],
  },
  {
    id: 'C02', name: 'Coverage Card', layers: 'L1, L3, L4', priority: 'P0',
    variants: [{ name: 'view-only', description: 'Full card with SI, badge, family list' }],
    states: [
      { name: 'default', description: 'Normal display', visual: 'White card, border-onyx-300' },
      { name: 'loading', description: 'Data fetching', visual: 'Skeleton shimmer blocks' },
      { name: 'error', description: 'API failure', visual: 'Error banner shown' },
    ],
    constructCondition: 'All constructs',
    figmaFrame: 'Card/Coverage',
    contentSlots: [
      { layer: 'L1', construct: 'VANILLA', headline: 'Your coverage from [Company]', subtext: '₹5 lakh coverage for your family', ctaPrimary: 'Continue', ctaSecondary: '' },
      { layer: 'L1', construct: 'FLEX', headline: 'Your benefits wallet', subtext: '₹25,000 to build your protection', ctaPrimary: 'Continue', ctaSecondary: '' },
    ],
    errors: [{ id: 'E-L1-01', error: 'Policy data unavailable', message: 'Unable to load coverage details.', severity: 'critical' }],
    edgeCases: ['Flex: Show wallet prominently', 'Grade-based: Only eligible plans'],
  },
  {
    id: 'C03', name: 'Plan Selector', layers: 'L3', priority: 'P0',
    variants: [
      { name: 'tier-cards', description: 'MODULAR Tier Upgrade: 3 tier cards (Silver/Gold/Platinum)' },
      { name: 'view-only', description: 'MODULAR view-only (M01/M07) or FLEX Base Fixed: assigned plan, no selection' },
      { name: 'configurator', description: 'FLEX Base Variable: SI buttons + family radio options' },
    ],
    states: [
      { name: 'default', description: 'No selection', visual: 'All cards unselected' },
      { name: 'selected', description: 'User chose a tier/SI', visual: 'border-purple-600 bg-purple-50' },
      { name: 'disabled', description: 'Grade-restricted', visual: 'opacity-40 cursor-not-allowed' },
    ],
    constructCondition: 'Modular Tier Upgrade: tier-cards, Modular view-only (M01/M07): view-only, Flex Base Variable: configurator, Flex Base Fixed: view-only, Vanilla: skip',
    figmaFrame: 'PlanSelector/TierCards, PlanSelector/Configurator',
    contentSlots: [
      { layer: 'L3', construct: 'MODULAR (Tier Upgrade)', headline: 'Upgrade your plan', subtext: 'Choose a higher tier for better benefits', ctaPrimary: 'Continue', ctaSecondary: '' },
      { layer: 'L3', construct: 'MODULAR (View-only)', headline: 'Your assigned plan', subtext: 'Review your coverage details', ctaPrimary: 'Continue', ctaSecondary: '' },
      { layer: 'L3', construct: 'FLEX (Base Variable)', headline: 'Configure your coverage', subtext: 'Select Sum Insured and family coverage', ctaPrimary: 'Continue', ctaSecondary: '' },
      { layer: 'L3', construct: 'FLEX (Base Fixed)', headline: 'Your base coverage', subtext: 'Your fixed coverage from [Company]', ctaPrimary: 'Continue', ctaSecondary: '' },
    ],
    errors: [
      { id: 'E-L3-01', error: 'Selection required', message: 'Please select a plan to continue', severity: 'validation' },
      { id: 'E-L3-02', error: 'Wallet exceeded', message: 'Selections exceed wallet balance', severity: 'warning' },
      { id: 'E-L3-03', error: 'Grade restriction', message: 'Not available for your grade', severity: 'blocking' },
      { id: 'E-L3-04', error: 'Downgrade warning', message: 'Selecting a lower plan reduces your coverage', severity: 'warning' },
    ],
    edgeCases: ['Modular Tier Upgrade: Show price delta clearly', 'Modular M01/M07: View-only (no upgrade)', 'Flex Base Variable: SI + Family config', 'Flex Base Fixed: View-only + wallet for enhancements', 'Flex: Wallet meter real-time', 'Downgrade: Warn reduced coverage'],
  },
  {
    id: 'C04', name: 'Member Card', layers: 'L2, L6', priority: 'P0',
    variants: [{ name: 'compact', description: 'Avatar + name + meta + optional delete' }],
    states: [
      { name: 'view', description: 'Display mode (Self)', visual: 'No delete button' },
      { name: 'removable', description: 'Non-Self members', visual: 'Trash icon visible' },
    ],
    constructCondition: 'All constructs',
    figmaFrame: 'Card/Member',
    contentSlots: [{ layer: 'L2', construct: 'ALL', headline: 'Your covered family members', subtext: 'Review and update if needed', ctaPrimary: 'Continue', ctaSecondary: '+ Add family member' }],
    errors: [],
    edgeCases: ['Flex: Family changes affect wallet'],
  },
  {
    id: 'C05', name: 'Member Form', layers: 'L2', priority: 'P0',
    variants: [{ name: 'add', description: 'Expandable form with 4 fields' }],
    states: [
      { name: 'collapsed', description: 'Dashed add button', visual: 'border-dashed border-onyx-300' },
      { name: 'expanded', description: 'Form fields visible', visual: 'border-purple-300 bg-purple-50' },
      { name: 'error', description: 'Validation failed', visual: 'Error text below inputs' },
    ],
    constructCondition: 'All constructs',
    figmaFrame: 'Form/AddMember',
    contentSlots: [],
    errors: [
      { id: 'E-L2-01', error: 'DOB required', message: 'Date of birth is required', severity: 'validation' },
      { id: 'E-L2-02', error: 'Max dependents', message: 'Maximum dependents reached', severity: 'warning' },
      { id: 'E-L2-03', error: 'Age limit', message: 'Parent age exceeds limit (80 years)', severity: 'validation' },
      { id: 'E-L2-04', error: 'Dependent selection required', message: 'Please select which dependents to cover', severity: 'info' },
      { id: 'E-L2-05', error: 'Parent inline premium', message: 'Parents not in base — additional premium applies', severity: 'info' },
    ],
    edgeCases: ['Parent age > 80: Block', 'Max 6 members', 'Child age > 25: Block', 'Data mismatch: Dependent selection UI (EC-NEW-01)', 'Parent addition: Inline premium in L2 (EC02)'],
  },
  {
    id: 'C06', name: 'Premium Calculator', layers: 'L3, L4, L5', priority: 'P0',
    variants: [
      { name: 'inline', description: 'Compact summary bar' },
      { name: 'detailed', description: 'Full breakdown with progress bars' },
    ],
    states: [
      { name: 'calculated', description: 'Showing values', visual: 'Numbers displayed' },
      { name: 'loading', description: 'Calculating', visual: 'Shimmer skeleton' },
      { name: 'error', description: 'Calc failed', visual: 'Error banner' },
    ],
    constructCondition: 'All constructs (varies by layer)',
    figmaFrame: 'Premium/Inline, Premium/Detailed',
    contentSlots: [{ layer: 'L5', construct: 'ALL', headline: 'Your investment', subtext: 'Review your premium breakdown', ctaPrimary: 'Continue to Review', ctaSecondary: '' }],
    errors: [
      { id: 'E-L4-02', error: 'Premium calc failed', message: 'Unable to calculate premium', severity: 'critical' },
      { id: 'E-L5-03', error: 'Subsidy display', message: 'Subsidized by employer', severity: 'info' },
    ],
    edgeCases: ['All employer-paid: Skip L5', 'Flex wallet overflow: Separate consent', 'Partial: Show subsidy'],
  },
  {
    id: 'C07', name: 'Add-on Card', layers: 'L4', priority: 'P1',
    variants: [{ name: 'toggle', description: 'Card with name, description, cost, toggle' }],
    states: [
      { name: 'available', description: 'Can toggle on', visual: 'border-onyx-200, toggle OFF' },
      { name: 'selected', description: 'Toggled on', visual: 'border-purple-400 bg-purple-50, toggle ON' },
      { name: 'disabled', description: 'Eligibility failed', visual: 'opacity-40, toggle disabled' },
      { name: 'popular', description: 'With POPULAR badge', visual: 'Orange badge shown' },
    ],
    constructCondition: 'When addOns is configured',
    figmaFrame: 'Card/Addon',
    contentSlots: [{ layer: 'L4', construct: 'ALL', headline: 'Enhance your coverage', subtext: 'Add more protection', ctaPrimary: 'Continue', ctaSecondary: 'Skip enhancements' }],
    errors: [{ id: 'E-L4-01', error: 'Eligibility failed', message: 'Add-on requires base SI ≥ ₹7L', severity: 'blocking' }],
    edgeCases: ['OPD requires SI ≥ ₹5L (Flex)', 'Eligibility depends on base SI', 'Min participation badge per component'],
  },
  {
    id: 'C08', name: 'Top-up Card', layers: 'L4', priority: 'P1',
    variants: [
      { name: 'standard', description: 'Standard top-up (Vanilla)' },
      { name: 'tier-upgrade', description: 'Tier Upgrade top-up (Modular)' },
      { name: 'flex', description: 'Wallet-funded top-up (Flex)' },
    ],
    states: [
      { name: 'available', description: 'Toggle OFF', visual: 'Default card' },
      { name: 'selected', description: 'Toggle ON', visual: 'Toggle active' },
    ],
    constructCondition: 'When topUp is configured',
    figmaFrame: 'Card/TopUp',
    contentSlots: [],
    errors: [{ id: 'E-L4-03', error: 'Parental coverage flagged', message: 'Parental coverage added from L2 family config', severity: 'info' }],
    edgeCases: ['Consolidated top-up spans base+secondary', 'Parental coverage as pre-selected enhancement (EC02)'],
  },
  {
    id: 'C09', name: 'Secondary Plan Card', layers: 'L4', priority: 'P1',
    variants: [
      { name: 'single', description: 'One secondary plan option' },
      { name: 'multi-plan', description: 'Multiple secondary options' },
    ],
    states: [
      { name: 'available', description: 'Toggle OFF', visual: 'Default card' },
      { name: 'selected', description: 'Toggle ON', visual: 'Toggle active' },
    ],
    constructCondition: 'When secondary is configured',
    figmaFrame: 'Card/SecondaryPlan',
    contentSlots: [],
    errors: [],
    edgeCases: [],
  },
  {
    id: 'C10', name: 'Wallet Display', layers: 'L1, L3, L4, L5', priority: 'P0-FLEX',
    variants: [
      { name: 'banner', description: 'Full gradient bar with labels' },
      { name: 'detailed', description: 'With breakdown context' },
      { name: 'inline', description: 'Compact bar + remaining text' },
      { name: 'mini', description: 'Thin progress bar only' },
    ],
    states: [
      { name: 'full', description: 'Under budget', visual: 'White fill on purple track' },
      { name: 'partial', description: 'Partially used', visual: 'Partially filled bar' },
      { name: 'exceeded', description: 'Over wallet', visual: 'Cerise bar + overflow warning' },
    ],
    constructCondition: 'Flex only',
    figmaFrame: 'Wallet/Banner, Wallet/Inline, Wallet/Mini',
    contentSlots: [],
    errors: [
      { id: 'E-L3-02', error: 'Wallet exceeded', message: 'Selections exceed wallet balance', severity: 'warning' },
      { id: 'E-L5-02', error: 'Wallet overflow', message: 'Consent for salary deduction required', severity: 'warning' },
    ],
    edgeCases: ['Flex Base Variable: Full configurator + wallet', 'Flex Base Fixed: Wallet used for enhancements only', 'Wallet meter real-time', 'Overflow → separate consent required'],
  },
  {
    id: 'C11', name: 'Consent Checkbox', layers: 'L6', priority: 'P0',
    variants: [
      { name: 'standard', description: 'Terms and conditions' },
      { name: 'salary-deduction', description: 'Salary deduction consent' },
      { name: 'wallet-overflow', description: 'Wallet overflow acknowledgment' },
    ],
    states: [
      { name: 'unchecked', description: 'Not checked', visual: 'Empty border (onyx-300)' },
      { name: 'checked', description: 'Checked', visual: 'purple-600 fill + white checkmark' },
      { name: 'error', description: 'Required but unchecked', visual: 'cerise-500 border' },
    ],
    constructCondition: 'Standard: all. Salary: employee pays. Wallet: Flex overflow',
    figmaFrame: 'Checkbox/Consent',
    contentSlots: [{ layer: 'L6', construct: 'ALL', headline: 'Review and confirm', subtext: 'Check your selections before submitting', ctaPrimary: 'Confirm Enrollment', ctaSecondary: 'Edit selections' }],
    errors: [{ id: 'E-L6-01', error: 'Consent required', message: 'Accept terms to proceed', severity: 'validation' }],
    edgeCases: ['Pre-enrollment: "Submit Preferences" CTA', 'Drop-off: Exit modal + recovery comms (EC-NEW-03)', 'Re-enrollment: Override warning (EC-NEW-04)'],
  },
  {
    id: 'C12', name: 'Review Summary', layers: 'L6', priority: 'P0',
    variants: [{ name: 'detailed', description: 'Multiple section cards with Edit links' }],
    states: [{ name: 'editable', description: 'Edit links visible per section', visual: 'Edit text links in purple-600' }],
    constructCondition: 'All constructs',
    figmaFrame: 'Card/ReviewSummary',
    contentSlots: [],
    errors: [],
    edgeCases: ['Enhancements card hidden if none selected', 'Investment card hidden if all employer-paid'],
  },
  {
    id: 'C13', name: 'Success Screen', layers: 'POST', priority: 'P0',
    variants: [
      { name: 'confirmed', description: 'E-card ready' },
      { name: 'pending-mp', description: 'Component-level min participation pending' },
      { name: 'pending-cd', description: 'CD check in progress' },
      { name: 'preferences', description: 'Pre-enrollment submitted' },
      { name: 're-enrollment', description: 'Override confirmation for re-enrollment (EC-NEW-04)' },
    ],
    states: [
      { name: 'success', description: 'Green icon + e-card', visual: 'Green circle, e-card card' },
      { name: 'pending', description: 'Info message, no e-card', visual: 'Green icon, info text' },
    ],
    constructCondition: 'All constructs',
    figmaFrame: 'Screen/Success',
    contentSlots: [],
    errors: [
      { id: 'E-L6-02', error: 'Submission failed', message: 'Unable to submit. Please retry.', severity: 'critical' },
      { id: 'E-L6-04', error: 'Min part (component)', message: 'Component-level min participation pending', severity: 'info' },
    ],
    edgeCases: ['Pre-enrollment → "Preferences Submitted"', 'Component-level min participation per top-up/secondary/add-ons', 'Re-enrollment override (EC-NEW-04)', 'Drop-off recovery comms (EC-NEW-03)', 'Incomplete enrollment expectation (EC-NEW-02)'],
  },
  {
    id: 'C14', name: 'Tooltip/Info', layers: 'ALL', priority: 'P1',
    variants: [{ name: 'popover', description: 'Small overlay with explanation' }],
    states: [
      { name: 'closed', description: 'Hidden', visual: 'Not rendered' },
      { name: 'open', description: 'Visible popover', visual: 'Dark bg popover with arrow' },
    ],
    constructCondition: 'All constructs',
    figmaFrame: 'Tooltip/Popover',
    contentSlots: [],
    errors: [],
    edgeCases: [],
  },
  {
    id: 'C15', name: 'Error Message', layers: 'ALL', priority: 'P0',
    variants: [
      { name: 'inline', description: 'Within content flow' },
      { name: 'banner', description: 'Full-width alert' },
    ],
    states: [
      { name: 'hidden', description: 'No errors', visual: 'Not rendered' },
      { name: 'visible', description: 'Error shown', visual: 'cerise-200 bg + icon + text' },
    ],
    constructCondition: 'All constructs',
    figmaFrame: 'Message/Error',
    contentSlots: [],
    errors: [],
    edgeCases: [],
  },
  {
    id: 'C16', name: 'Loading State', layers: 'ALL', priority: 'P1',
    variants: [
      { name: 'skeleton', description: 'Shimmer blocks matching content' },
      { name: 'spinner', description: 'Circular loading indicator' },
    ],
    states: [{ name: 'loading', description: 'Animated', visual: 'Shimmer or spin animation' }],
    constructCondition: 'All constructs',
    figmaFrame: 'State/Loading',
    contentSlots: [],
    errors: [],
    edgeCases: [],
  },
  {
    id: 'C17', name: 'Comparison Table', layers: 'L3, L4', priority: 'P1',
    variants: [{ name: 'side-by-side', description: '3-column tier comparison' }],
    states: [{ name: 'interactive', description: 'Selectable columns', visual: 'Selected column highlighted' }],
    constructCondition: 'Modular only',
    figmaFrame: 'Table/Comparison',
    contentSlots: [],
    errors: [],
    edgeCases: [],
  },
];

export const PRIORITY_GROUPS = {
  P0: COMPONENTS.filter(c => c.priority === 'P0'),
  'P0-FLEX': COMPONENTS.filter(c => c.priority === 'P0-FLEX'),
  P1: COMPONENTS.filter(c => c.priority === 'P1'),
};

export function getComponent(id: string): ComponentDef | undefined {
  return COMPONENTS.find(c => c.id === id);
}
