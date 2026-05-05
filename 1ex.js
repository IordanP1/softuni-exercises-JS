function solve(input) {
    const charactersCount = Number(input.shift());
    const guild = {};

    for (let i = 0; i < charactersCount; i++) {
        const characterInput = input.shift().split(' ');

        const memberName = characterInput[0];
        const roleName = characterInput[1];
        const skills = characterInput[2].split(',');

        guild[memberName] = { role: roleName, skills };

    }

    let commandLine = input.shift();
    while (commandLine !== "End") {
        let parts = commandLine.split(' / ');
        let action = parts[0];

        if (action === 'Perform') {

            let name = parts[1];
            let role = parts[2];
            let skill = parts[3];

            if (guild[name] &&
                guild[name].role === role &&
                guild[name].skills.includes(skill)
            ) {
                console.log(`${name} has successfully performed the skill: ${skill}!`);
            } else {
                console.log(`${name} cannot perform the skill: ${skill}.`);

            }

        }
        if (action==='Reassign') {
            let name = parts[1];
            let newRoleName = parts[2];

            guild[name].role =newRoleName;
            console.log(`${name} has been reassigned to: ${newRoleName}`);
            
        }

        if (action==='Learn Skill') {
            let name = parts[1];
            let newSkill=parts[2];

            if (guild[name].skills.includes(newSkill)) {
                console.log(`${name} already knows the skill: ${newSkill}.`);
                
            }else{
                guild[name].skills.push(newSkill);
                console.log(`${name} has learned a new skill: ${newSkill}.`);

            }
            
        }
          commandLine = input.shift();
    }
    for(const name in guild){
        console.log(`Guild Member: ${name}, Role: ${guild[name].role}, Skills: ${guild[name].skills.sort().join(', ')}`);
        
    }

}





solve([
    "3",
    "Arthur warrior swordsmanship,shield",
    "Merlin mage fireball,teleport",
    "Gwen healer healing,alchemy",
    "Perform / Arthur / warrior / swordsmanship",
    "Perform / Merlin / warrior / fireball",
    "Learn Skill / Gwen / purification",
    "Perform / Gwen / healer / purification",
    "Reassign / Merlin / healer",
    "Perform / Merlin / healer / teleport",
    "End"
]);