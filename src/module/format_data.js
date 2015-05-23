
module.exports = function(data) {
    var skills = data.skills;
    var root = skills[0];
    root.children = i_format(root, skills);    
    
    return root;
}

function i_format(parent_skill, data) {
    var skills = Array();
    for (var i = 0; i < data.length; i++) {
        if(data[i].parent == parent_skill.name) {
            skills.push(data[i]);
        }
    }
    if(skills.length != 0) {
        skills.forEach(function(skill) {
            skill.children = i_format(skill, data);
        });
    }
    return skills;
}

