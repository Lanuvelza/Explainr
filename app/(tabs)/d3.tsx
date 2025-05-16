import { View } from 'react-native'
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg'
import React, { useEffect, useState } from 'react';
import {
    forceSimulation,
    forceManyBody,
    forceCenter,
    forceLink,
    SimulationNodeDatum,
    SimulationLinkDatum,
} from 'd3-force';

// Define types
interface Node extends SimulationNodeDatum {
    id: string;
    content: string;
    x?: number;
    y?: number;
}

interface Link extends SimulationLinkDatum<Node> {
    source: string | Node;
    target: string | Node;
}

const initialNodes: Node[] = [
    // Group 1
    { id: 'A', content: 'Alpha' },
    { id: 'B', content: 'Bravo' },
    { id: 'C', content: 'Charlie' },

    // Group 2
    { id: 'X', content: 'X-ray' },
    { id: 'Y', content: 'Yankee' },
    { id: 'Z', content: 'Zulu' },
];

const initialLinks: Link[] = [
    { source: 'A', target: 'B' },
    { source: 'B', target: 'C' },

    // Group 2 links (self-contained)
    { source: 'X', target: 'Y' },
    { source: 'Y', target: 'Z' },
];

export default function D3() {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [links, setLinks] = useState<Link[]>(initialLinks);

    useEffect(() => {
        const simNodes: Node[] = initialNodes.map(d => ({ ...d }));
        const simLinks: Link[] = initialLinks.map(d => ({ ...d }));

        const simulation = forceSimulation(simNodes)
            .force('charge', forceManyBody().strength(-150))
            .force('center', forceCenter(400, 400)) // center of the SVG viewBox
            .force('link', forceLink<Node, Link>(simLinks).id((d: Node) => d.id).distance(150))
            .on('tick', () => {
                setNodes([...simNodes]);
                setLinks([...simLinks]);
            });

        return () => { simulation.stop() };
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Svg height={800} width={800}>
                {links.map((link, i) => {
                    const source = link.source as Node;
                    const target = link.target as Node;
                    return (
                        <Line
                            key={i}
                            x1={source.x}
                            y1={source.y}
                            x2={target.x}
                            y2={target.y}
                            stroke="gray"
                            strokeWidth={2}
                        />
                    );
                })}

                {nodes.map((node, i) => (
                    <React.Fragment key={i}>
                        <Circle
                            cx={node.x}
                            cy={node.y}
                            r={20}
                            fill="white"
                        />
                        <SvgText
                            x={node.x}
                            y={node.y}
                            fontSize="12"
                            fill="black"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                        >
                            {node.content}
                        </SvgText>
                    </React.Fragment>
                ))}

            </Svg>
        </View>
    );
}