# metabolismGUI
established as the comprehensive homework for Biochemsitry 2 course offered by Tsinghua University.
## Core Capabilities

### 🧬 1. JSON-Based Metabolic Dataset Handling
- Import, edit, validate, and export metabolic data in JSON format.
- Supports uploading and downloading structured pathway datasets.

### 🔬 2. Human Metabolism Visualization
- Interactive visualization of major human metabolic pathways.
- Displays reaction networks, metabolite interactions, and regulatory relationships.
- Includes ATP/NADH production tagging, pathway grouping, and enzyme-based highlights.

### 🔁 3. Carbon Tracing (C-Tracing)
- Simulates and visualizes carbon flow through metabolic reactions.
- Useful for pathway analysis, flux tracing, and teaching metabolic dynamics.

# json schema:
## 1 Metabolite: 
e.g. 
```json
{
  "id": "glucose",
  "name": "Glucose",
  "formula": "C6H12O6",
  "carbon_count": 6,
  "category": "carbohydrate",
  "in_pathways": ["glycolysis"],
  "notes": "Primary blood sugar"
}
```

## 2 reaction:
e.g.
```json
{
  "id": "hexokinase",
  "enzyme": "Hexokinase",
  "substrates": ["glucose", "atp"],
  "products": ["g6p", "adp"],
  "cofactors": [],
  "pathway": "glycolysis",
  "reversible": false,
  "carbon_map": {
    "glucose": { "to": "g6p", "map": [1,2,3,4,5,6] }
  },
  "location": "cytosol",
  "notes": "First committed step of glycolysis"
}
```

## 3 pathway:
e.g.
```json
{
  "id": "glycolysis",
  "name": "Glycolysis",
  "reactions": [
    "hexokinase",
    "phosphoglucose_isomerase",
   "pfk1",
    "aldolase"
  ],
  "description": "Breakdown of glucose to pyruvate",
  "organism": "human",
  "special": null
}
```

## 4 regulation:
e.g.
```json
{
  "id": "pfk1_regulation",
  "target": "pfk1",
  "activators": ["amp", "f26bp"],
  "inhibitors": ["atp", "citrate"],
  "hormonal": {
    "insulin": "activate",
    "glucagon": "inhibit"
  },
  "notes": "Major regulatory step of glycolysis"
}
```

## 5 cross-pathway links:
e.g.
```json
{
  "id": "citrate_shuttle",
  "from": "tca",
  "to": "fatty_acid_synthesis",
  "metabolite": "citrate",
  "description": "Citrate exported to cytosol to provide Acetyl-CoA and NADPH"
}
```

metabolismGUI/
metabolism-visualizer/
│
├─ index.html        
├─ script.js         
├─ style.css         
└─ data/
   └─ metabolism.json  
