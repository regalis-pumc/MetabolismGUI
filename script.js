// 读取 JSON
fetch("data/metabolism.json")
    .then(response => response.json())
    .then(data => {
        console.log("Loaded metabolism data:", data);

        // 将 metabolites 转换为 Cytoscape 节点
        const metaboliteNodes = data.metabolites.map(m => ({
            data: {
                id: m.id,
                label: m.name,
                type: "metabolite"
            }
        }));

        // 将 reactions 转换为节点（酶）+ 边（底物→产物）
        let reactionNodes = [];
        let reactionEdges = [];

        data.reactions.forEach(rxn => {
            // 每个反应作为一个节点（酶）
            const enzymeNodeId = `rxn_${rxn.id}`;
            reactionNodes.push({
                data: {
                    id: enzymeNodeId,
                    label: rxn.enzyme,
                    type: "enzyme"
                }
            });

            // 底物 → 酶
            rxn.substrates.forEach(sub => {
                reactionEdges.push({
                    data: {
                        id: `${sub}_to_${enzymeNodeId}`,
                        source: sub,
                        target: enzymeNodeId,
                        type: "substrate_edge"
                    }
                });
            });

            // 酶 → 产物
            rxn.products.forEach(pro => {
                reactionEdges.push({
                    data: {
                        id: `${enzymeNodeId}_to_${pro}`,
                        source: enzymeNodeId,
                        target: pro,
                        type: "product_edge"
                    }
                });
            });
        });

        // 把所有节点和边组合
        const elements = [
            ...metaboliteNodes,
            ...reactionNodes,
            ...reactionEdges
        ];

        // 初始化 Cytoscape
        const cy = cytoscape({
            container: document.getElementById("cy"),

            elements: elements,

            style: [
                {
                    selector: 'node[type="metabolite"]',
                    style: {
                        'background-color': '#4CAF50',
                        'label': 'data(label)',
                        'shape': 'round-rectangle',
                        'width': 'label',
                        'height': 'label',
                        'padding': '8px',
                        'font-size': '10px',
                        'text-valign': 'center',
                        'color': '#fff'
                    }
                },
                {
                    selector: 'node[type="enzyme"]',
                    style: {
                        'background-color': '#1976D2',
                        'label': 'data(label)',
                        'shape': 'ellipse',
                        'width': 'label',
                        'height': 'label',
                        'padding': '6px',
                        'font-size': '10px',
                        'color': '#fff'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 2,
                        'line-color': '#999',
                        'target-arrow-color': '#999',
                        'target-arrow-shape': 'triangle'
                    }
                }
            ],

            layout: {
                name: "cose",
                animate: true
            }
        });
    })
    .catch(err => {
        console.error("Error loading metabolism.json:", err);
    });
<script>
    console.log("JS is working!");
</script>
