let nodes = new vis.DataSet([]);
let edges = new vis.DataSet([]);

let container = document.getElementById('graphe');

let data = {
    nodes: nodes,
    edges: edges
};
let options = {
    physics:{
        enabled: true,              // Rend actif la physique
        solver: 'forceAtlas2Based'         // Type de force 'repulsion'
    },
};

let network = new vis.Network(container, data, options);

// -----------------------------------------------
// -----------------------------------------------
// -----NE touchez pas au dessus------------------
// -----------------------------------------------
// -----------------------------------------------

// DOCUMENTATION :  https://almende.github.io/vis/docs/network/

let matrice = [
    [0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]
// Cette fonction 'transforme' une matrice m en graphe
let matriceToGraphe = m => {
    // Dans n on met la 'taille' de la matrice
    let n = m.length;
    // On fait une boucle pour créer n noeuds.
    for (let i=0; i<n; i++){
        nodes.add([
            {
                id: i,
                label: (i+1).toString(),
                color: "#DA70D6"
            }
        ]);
    }
    // Double boucle pour parcourir la matrice.
    for (let j=0; j<n; j++) {
        for (let k=0; k<n; k++){
            // Si c'est un 1 je rajoute un edge
            if (m[j][k] == 1) {
                edges.add(
                    [
                        {
                            from: j,
                            to: k,
                            color : {
                                color: "#FF0000"
                            }

                        }
                    ]
                );
            }
        }
    }
}

// lancement de la fonction
matriceToGraphe(matrice);

// Evennement au clic sur un noeud:
network.on("click", function(data)
{
    if(data.nodes.length > 0)
    {
        let nodeID = data.nodes[0];
        let clickedNode = nodes.get(nodeID);
        clickedNode.color = {
            border: '#000000',
            background: '#000000',
            highlight: {
                border: '#2B7CE9',
                background: '#D2E5FF'
            }
        }
        clickedNode.font = {
            color: '#FFF'
        }
        nodes.update(clickedNode);
        bfs(nodeID);
    }
});

const changeVisite = ID => {
    let Node = nodes.get(ID);
    Node.color = {
        background: '#000'
    }
    Node.font = {
        color: '#FFF'
    }
    nodes.update(Node);
}
const bfs = async ID => {

    // Ici nous allons dérouler l'algo bfs
    let visite = []; // Les noeuds visités
    let aVisite = [ID]; // Les noeuds à visiter.
    while (aVisite.length != 0)
    {
            ID = aVisite.shift();
            let voisins = network.getConnectedNodes(ID);
            console.log(`Noeud : ${ID}, voisins: ${voisins}, Deja visite : ${visite}`);
            await pause(ID);
            changeVisite(ID);
            for(v of voisins)
            {
                if ((visite.includes(v)) || (aVisite.includes(v)))
                {
                    console.log(`Déjà visité ${v}`);
                } else
                {
                    aVisite.push(v);
                }
        }
        visite.push(ID); // Id est visite
    }
}

const pause = id => {
    return new Promise(resolve => setTimeout(() => {
        console.log(`pause ${id} is over`);
        resolve();
    }, 1000));
}