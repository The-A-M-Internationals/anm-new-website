# The A&M Internationals — Complete Site-Wide Content Audit & Verification
**Prepared For:** Sijith Mathew (Leadership & Operations)  
**Scope:** Full-Site Review across ALL Pages (Careers, Make an Impact, What Sets Us Apart, Features, Finance, Methodology, Success Stories, Homepage)  
*(Note: Executive Bios and Headquarters Address are confirmed correct and have been excluded from this review).*  

**Direct Excel File:** [`Content_Review_Sijith.xlsx`](file:///C:/Users/hp/OneDrive/Desktop/Content_Review_Sijith.xlsx) *(located on your Desktop and in the project root)*  
**Direct CSV File:** [`Content_Review_Sijith.csv`](file:///C:/Users/hp/OneDrive/Desktop/Content_Review_Sijith.csv)  

---

## Instructions for Sijith

Please review the current live script / data for each section and select:
- **[ KEEP ]** &mdash; Script and figures are accurate and approved.
- **[ CHANGE SCRIPT ]** &mdash; Copy or metric needs to be updated (please write your approved revisions in the notes column).
- **[ REMOVE ]** &mdash; Section, claim, or logo should be deleted from the website.

---

### 1. Critical Cross-Page Contradictions (Discrepancies)

| ID | Section & Code Location | Current Live Script / Data | Action Question for Sijith | Sijith's Decision | Priority |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **DISC-001** | **Homepage Hero vs Make an Impact Page**<br>`HomeHero.tsx:40 vs drivingimpactdashboard.content.ts:25` | Homepage says: '150+ Clients Served'  <br>  Impact Dashboard says: '26+ Clients Served' | Homepage claims 150+ clients, but the Make an Impact page dashboard displays 26+ clients. Which number is correct, and should we unify them to 150+ (or your approved number)? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Critical** |
| **DISC-002** | **Homepage Hero vs Make an Impact Page**<br>`HomeHero.tsx:41 vs drivingimpactdashboard.content.ts:33` | Homepage says: '12+ Countries'  <br>  Impact Dashboard says: '3 Countries (UAE, India, USA)' | Homepage says 12+ countries, while Impact Dashboard lists only 3 countries (UAE, India, USA). Can we keep 12+ or should the Impact Dashboard be updated to match? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Critical** |
| **DISC-003** | **Make an Impact: Donation & Contribution Amounts**<br>`ChildWelfareImpact.content.ts:16 vs fancyCards.content.ts:10` | Child Welfare Card says: '$15M+ Impact Contributions'  <br>  Fancy Card below says: 'Total Donated: AED 42,050' | Child Welfare card displays '$15M+' contributions, while the summary card below it states 'AED 42,050'. What is the exact approved donation figure we should display? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Critical** |
| **DISC-004** | **Make an Impact: Beneficiaries Count**<br>`ChildWelfareImpact.content.ts:24 vs fancyCards.content.ts:15 & Numbers.content.ts:31` | Child Welfare Card says: '5,000+ Children Supported'  <br>  Cards below say: '120 children' | Child Welfare stat card claims '5,000+ Children Supported', but the dashboard card and Numbers section state '120 children'. Which number is accurate? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Critical** |
| **DISC-005** | **Make an Impact: Currency & Goal Conflict**<br>`ChildWelfareImpact.content.ts:44 vs Numbers.content.ts:7` | Child Welfare English says: '$1,000,000 Goal' (USD)  <br>  Arabic & Numbers say: 'AED 1,000,000' | Is our charitable fundraising goal 1,000,000 AED or 1,000,000 USD (which is 3.67M AED)? Can we unify the currency to AED across all languages? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **High** |
| **DISC-006** | **Homepage Services vs Finance Transformation Page**<br>`services.content.ts:60 vs whyChooseUs.content.ts:23` | Homepage Services says: '150+ implementations'  <br>  Finance Transformation says: '100+ successful implementations' | Homepage says 150+ implementations, while Finance Transformation page says 100+. Should we standardize on '150+ implementations' across the entire site? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **High** |
| **DISC-007** | **Homepage Hero: Lingering 'Digital Marketing'**<br>`homeHero.content.ts:14-17` | 'Technology modernisation, business transformation, and digital marketing solutions that drive measurable impact...' | The Hero description still mentions 'digital marketing solutions'. Should we change this script to 'Specialized Oracle EPM, financial consolidation, and enterprise AI automations'? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Critical** |

---

### 2. Make An Impact / CSR (Stats Cards, Donations & Beneficiaries)

| ID | Section & Code Location | Current Live Script / Data | Action Question for Sijith | Sijith's Decision | Priority |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **IMP-001** | **Make an Impact > Driving Impact Dashboard**<br>`drivingimpactdashboard.content.ts:14-21` | Script: 'From boutique hospitality brands to enterprise solutions, our work spans continents... serving clients across India, the UAE, and the United States.' | Does this introductory script reflect our current positioning? (Mentions 'boutique hospitality brands' — should we update to enterprise financial systems and Oracle EPM)? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **High** |
| **IMP-002** | **Make an Impact > Dashboard Stat Cards**<br>`drivingimpactdashboard.content.ts:28-30` | Stat: 'Projects Delivered: 40+' | Can we keep '40+ Projects Delivered', or has our completed project tally grown? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Medium** |
| **IMP-003** | **Make an Impact > Dashboard Stat Cards**<br>`drivingimpactdashboard.content.ts:36-38` | Stat: 'Industries Served: 8+' | Can we keep '8+ Industries Served'? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Low** |
| **IMP-004** | **Make an Impact > Dashboard Stat Cards**<br>`drivingimpactdashboard.content.ts:40-42` | Stat: 'Client Retention Rate: 92%' | Is the '92% Client Retention Rate' claim approved for public display? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Medium** |
| **IMP-005** | **Make an Impact > Dashboard Stat Cards**<br>`drivingimpactdashboard.content.ts:44-46` | Stat: 'Total Project Value Delivered: $1.2M+ USD' (Arabic says: 4.4M+ AED) | Can we keep '$1.2M+ USD' project value, or has total delivered project value increased (e.g. $10M+, $50M+)? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **High** |
| **IMP-006** | **Make an Impact > Dashboard Stat Cards**<br>`drivingimpactdashboard.content.ts:48-50` | Stat: 'Team Members: 15' | Can we keep 'Team Members: 15' or has our headcount changed? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Medium** |
| **IMP-007** | **Make an Impact > Dashboard Stat Cards**<br>`drivingimpactdashboard.content.ts:52-54` | Stat: 'Years of Combined Experience: 50+' | Can we keep '50+ Years Combined Experience'? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Low** |
| **IMP-008** | **Make an Impact > Dashboard Stat Cards**<br>`drivingimpactdashboard.content.ts:56-62` | Stats: 'Average Project Turnaround: 30 Days' <br> 'Client Satisfaction Score: 98%' | Are '30 Days Turnaround' and '98% Satisfaction' approved for public display? (Note: EPM enterprise projects typically take 90-180 days). | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **High** |
| **IMP-009** | **Make an Impact > Child Welfare Script**<br>`ChildWelfareImpact.content.ts:11-13` | Script: 'We contribute a portion of our revenue to trusted child-welfare trusts and orphanages, ensuring that our success helps fund education, healthcare, and essential care...' | Can we keep this exact child welfare narrative script, or should it be reworded? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Medium** |
| **IMP-010** | **Make an Impact > Partner & Percentage Claims**<br>`ChildWelfareImpact.content.ts:32-50` | Claim: '26 Verified NGO Partners' <br> 'Charitable Contribution (10%)' | Does The A&M Internationals legally commit to '10% Charitable Contribution' and '26 Verified NGO Partners'? Can we publicly keep this or adjust the script? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Critical** |

---

### 3. Careers Page (Benefits, Culture, Growth & Openings)

| ID | Section & Code Location | Current Live Script / Data | Action Question for Sijith | Sijith's Decision | Priority |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **CAR-001** | **Careers > Benefits & Perks**<br>`benefits.content.ts:16-20` | Card 1: 'Professional Growth — Sponsored certifications, mentorship programs, advanced cloud & DevSecOps exposure' | Should we change 'advanced cloud & DevSecOps exposure' to 'Oracle Cloud EPM, Essbase modeling, and enterprise financial analytics exposure'? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **High** |
| **CAR-002** | **Careers > Benefits & Perks**<br>`benefits.content.ts:22-38` | Cards 2 & 3: 'Engineering-Driven Culture — Work with global clients on real-world cloud-native systems' <br> 'Hybrid & Flexible Working — Flexible timing, remote-friendly' | Can we keep the 'Hybrid & Flexible Working' and 'remote-friendly' claims, or does our current hiring policy require on-site presence in UAE/India? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **High** |
| **CAR-003** | **Careers > Benefits & Perks**<br>`benefits.content.ts:40-56` | Cards 4 & 5: 'Competitive Compensation — Market-driven salary + performance rewards' <br> 'Work–Life Balance — Supportive leave policies and wellness culture' | Are these compensation and work-life balance scripts approved as written? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Low** |
| **CAR-004** | **Careers > Culture & Growth**<br>`cultureGrowthSection.content.ts:10-37` | Core Values: 1. Ownership ('lead & experiment'), 2. Learning ('upskilling & curiosity'), 3. Innovation ('engineer modern solutions'), 4. Transparency ('communicate openly') | Are these 4 core values (Ownership, Learning, Innovation, Transparency) approved to keep, or would you like to introduce specific values like 'Integrity', 'Client Excellence'? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Medium** |
| **CAR-005** | **Careers > Open Positions**<br>`openPositions.content.ts:19-27` | Empty State: 'No current openings — but great things are coming soon. Subscribe to stay updated on future roles and opportunities!' | Should we keep 'No current openings', or are we actively hiring (e.g. Senior Oracle EPM Consultants, FCCS Lead, Financial Data Engineers) and should list live openings? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **High** |

---

### 4. What Sets Us Apart Page (Differentiator Scripts)

| ID | Section & Code Location | Current Live Script / Data | Action Question for Sijith | Sijith's Decision | Priority |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **WSA-001** | **What Sets Us Apart > Feature #1**<br>`whatSetsUsApartList.content.ts:18-25` | '1. Global Reach, Local Understanding — With clients across India, the UAE, and the United States, we bring a perspective that few agencies of our size can match. Dubai versus Delhi versus Denver...' | This script calls our company an 'agency' and mentions 'Denver'. Should we change this to 'enterprise consultancy' and focus on global financial centers (Dubai, Riyadh, New York)? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **High** |
| **WSA-002** | **What Sets Us Apart > Feature #2**<br>`whatSetsUsApartList.content.ts:26-33` | '2. Strategy, Design, Development, and Marketing — Connected. From digital strategy and UI/UX design to web development and enterprise performance management...' | This script still mentions 'Marketing', 'UI/UX design', and 'web development'. Should we rewrite this feature to focus strictly on 'Financial Systems, EPM Architecture, and AI'? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Critical** |
| **WSA-003** | **What Sets Us Apart > Features #3 & #4**<br>`whatSetsUsApartList.content.ts:34-49` | '3. You Work Directly with Decision-Makers' <br> '4. Enterprise Thinking, Creative Execution' | Can we keep 'Work Directly with Decision-Makers' and 'Enterprise Thinking, Creative Execution'? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Medium** |
| **WSA-004** | **What Sets Us Apart > Features #5 & #6**<br>`whatSetsUsApartList.content.ts:50-65` | '5. Long-Term Partnerships Over One-Off Projects' <br> '6. Built for Modern Brands' | Feature 6 says 'Built for Modern Brands'. Should we change this to 'Built for Modern Financial Enterprises'? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Medium** |

---

### 5. Features Page (Results That Matter & Integrations Tools)

| ID | Section & Code Location | Current Live Script / Data | Action Question for Sijith | Sijith's Decision | Priority |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **FEAT-001** | **Features > Results That Matter**<br>`results.content.ts:15-26` | Stats: '87% Faster Reporting' <br> '3x Better Decision Speed' <br> '65% Time Savings' <br> '100% Data Accuracy' | Are these 4 statistical results (87%, 3x, 65%, 100%) approved to keep on the Features page, or do you have specific client benchmark figures? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **High** |
| **FEAT-002** | **Features > Seamless Integrations**<br>`apps.content.ts:19-27` | Tools Listed: Salesforce, SAP, Oracle, Microsoft Dynamics, QuickBooks, NetSuite, Workday, Tableau | Notice this list includes 'SAP' and 'QuickBooks'. Earlier you removed SAP from services. Should we remove 'SAP' and 'QuickBooks' here too and replace with Hyperion / Oracle ERP Cloud? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Critical** |
| **FEAT-003** | **Features > EPM Demo Walkthrough**<br>`epm.content.ts:10-27` | Script: 'See EPM Suite in Action — 30-minute personalized walkthrough, Custom use case demonstration, Q&A with product experts' | Can we keep the '30-minute personalized walkthrough' demo offering script? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Low** |

---

### 6. Finance Transformation & Methodology

| ID | Section & Code Location | Current Live Script / Data | Action Question for Sijith | Sijith's Decision | Priority |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **FIN-001** | **Finance Transformation > Why Choose Us**<br>`whyChooseUs.content.ts:16-50` | 1. 'Proven Track Record — 100+ successful implementations' <br> 2. 'Technical Excellence — Deep expertise in enterprise technologies' <br> 3. 'Social Impact — We donate a portion of our earnings' | Can we keep these 3 Why Choose Us pillars? (Note: Update 100+ to 150+ to match the Homepage). | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **High** |
| **FIN-002** | **Finance Transformation > Services Listings**<br>`listings.content.ts:16-120` | Service Modules: Planning & Budgeting (EPBCS), Profitability & Cost (PCMCS), Financial Consolidation & Close (FCCS), Account Reconciliation (ARCS), Narrative Reporting, EDMCS | Are the scope descriptions and tag lists for FCCS, EPBCS, ARCS, PCMCS, and Narrative Reporting approved as written? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Medium** |
| **METH-001** | **Methodology > 4-Stage Delivery Lifecycle**<br>`methodologySection.content.ts:14-120` | Lifecycle: 01. Assess ('gap analysis, milestones'), 02. Design ('blueprint, models'), 03. Deploy ('configuration, testing'), 04. Sustain ('post go-live, governance') | Is this 4-step framework (Assess -> Design -> Deploy -> Sustain) the official methodology you want presented to enterprise clients? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Medium** |
| **METH-002** | **Methodology > Partnership & Governance**<br>`partnership.content.ts & processMatter.content.tsx` | Claims: Dedicated delivery pods, SLA-backed support, weekly milestone reporting, executive steering committee | Are the SLA and weekly steering committee governance commitments approved to keep on the public website? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Medium** |

---

### 7. Clients & Success Stories (TBC Corporation & Case Studies)

| ID | Section & Code Location | Current Live Script / Data | Action Question for Sijith | Sijith's Decision | Priority |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **CLI-001** | **Homepage > Our Clients Section**<br>`OurClients.tsx & public/tbc-logo.png` | TBC Corporation (Midas, Big O Tires, Tire Kingdom) • -50%+ Faster Close • 2,000+ Retail & Wholesale Locations | Can we publicly display TBC Corporation by name and official logo under NDA, or should we anonymize to 'North American Automotive Retail Titan'? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Critical** |
| **CLI-002** | **Homepage > Success Story #1**<br>`successStory.content.ts:25-42` | 'Global Manufacturing Corp' (Automotive) • Problem: Fragmented data across 15 systems • Result: '87% Faster Reporting' | Can we keep this case anonymous as 'Global Manufacturing Corp', or should we replace it with a real named client (e.g. TBC Corporation or another automotive client)? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **High** |
| **CLI-003** | **Homepage > Success Story #2**<br>`successStory.content.ts:43-60` | 'Regional Healthcare Network' (Healthcare) • Problem: Manual compliance tracking • Result: '100% audit compliance' | Can we keep this anonymous healthcare case, or should we update the script to reflect a specific EPM healthcare client? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **High** |
| **CLI-004** | **Homepage > Success Story #3**<br>`successStory.content.ts:61-78` | 'Financial Services Leader' (Insurance) • Problem: Legacy infrastructure bottlenecks • Result: '4x Transaction Speed' | Can we keep this insurance case study, or should we feature a UAE / GCC regional banking or wealth management client? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **High** |

---

### 8. Homepage Core Metrics & Slogans

| ID | Section & Code Location | Current Live Script / Data | Action Question for Sijith | Sijith's Decision | Priority |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **HOM-001** | **Homepage > Hero Counter**<br>`HomeHero.tsx:40-42` | Stats: '150+ Clients Served' <br> '12+ Countries' <br> '10+ Years Experience' | Are these 3 primary homepage numbers (150+ clients, 12+ countries, 10+ years) approved as the definitive official baseline? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **Critical** |
| **HOM-002** | **Homepage > Slogan & Tagline**<br>`homeHero.content.ts:6-13 & Footer marquee` | Tagline: 'Elevating the World, Elegantly' | Can we keep the company slogan 'Elevating the World, Elegantly', or do you want to sharpen it to an Oracle EPM & Financial Architecture focus? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **High** |
| **HOM-003** | **Homepage > Services Cards**<br>`services.content.ts:50-65` | Finance: '40% faster close' & '150+ implementations' <br> AI: '80% routine tasks automated' & '10x faster decisions' | Are these 4 metrics on the homepage service cards approved, or should we revise any KPI figures? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **High** |
| **HOM-004** | **Homepage > About Us Section**<br>`aboutUs.content.ts:18-30` | Script: '...team of passionate cloud architects... streamline delivery workflows, enhance operational efficiency, and accelerate digital transformation.' | Can we keep this About Us narrative, or should we update 'accelerate digital transformation' to 'accelerate financial transformation & Oracle EPM excellence'? | `[ ] KEEP`<br>`[ ] CHANGE`<br>`[ ] REMOVE` | **High** |

---

