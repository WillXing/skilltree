var buildTree = require('./module/build_tree.js');
var data = require('./skill_data/skill.json');

buildTree(
    data,
    window.innerHeight, 
    window.innerWidth
);
