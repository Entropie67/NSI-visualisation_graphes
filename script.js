let nodes = new vis.DataSet([]);
let edges = new vis.DataSet([]);

let container = document.getElementById('graphe');

let data = {
    nodes: nodes,
    edges: edges
};
let options = {};

let network = new vis.Network(container, data, options);

// -----------------------------------------------
// -----------------------------------------------
// -----NE touchez pas au dessus------------------
// -----------------------------------------------
// -----------------------------------------------

let matrice = [
    [0, 1, 0, 0],
    [1, 1, 1, 1],
    [0, 1, 0, 1],
    [0, 1, 1, 0]
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
                label: (i+1).toString()
            }
        ]);
    };

    /*
    edges.add(
        [
            {
                from: 1,
                to: 2,
                label: "E1",
            }
        ]
    );*/
}

// lancement de la fonction
matriceToGraphe(matrice);