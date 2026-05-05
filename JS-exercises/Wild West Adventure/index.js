function solve(input) {
    // Parse input
    const characterCount = Number(input.shift());
    const characters = {};

    for (let i = 0; i < characterCount; i++) {
        const characterInput = input.shift().split(' ');

        const name = characterInput[0];
        const hp = Number(characterInput[1]);
        const bullets = Number(characterInput[2]);

        characters[name] = { hp, bullets };
    }

    let commandLine = input.shift();
    while (commandLine != 'Ride Off Into Sunset') {
        const [command, name, ...args] = commandLine.split(' - ');

        switch (command) {
            case 'FireShot':
                const target = args[0];

                if (characters[name].bullets > 0) {
                    characters[name].bullets--;
                    console.log(`${name} has successfully hit ${target} and now has ${characters[name].bullets} bullets!`);
                } else {
                    console.log(`${name} doesn't have enough bullets to shoot at ${target}!`);
                }
                break;
            case 'TakeHit':
                const damage = Number(args[0]);
                const attacker = args[1];

                characters[name].hp -= damage;

                if (characters[name].hp > 0) {
                    console.log(`${name} took a hit for ${damage} HP from ${attacker} and now has ${characters[name].hp} HP!`);
                } else {
                    console.log(`${name} was gunned down by ${attacker}!`);
                    delete characters[name];
                }

                break;
            case 'Reload':
                const maxBulletsCout = 6;
                const bulletsReloaded = maxBulletsCout - characters[name].bullets;
                characters[name].bullets = maxBulletsCout;

                if (bulletsReloaded > 0) {
                    console.log(`${name} reloaded ${bulletsReloaded} bullets!`);
                } else {
                    console.log(`${name}'s pistol is fully loaded!`);
                }
                
                break;
            case 'PatchUp':
                const amount = Number(args[0]);

                const oldHp = characters[name].hp;
                characters[name].hp = Math.min(oldHp + amount, 100);
                const amountRecovered = characters[name].hp - oldHp;

                if (amountRecovered > 0) {
                    console.log(`${name} patched up and recovered ${amountRecovered} HP!`);
                } else {
                    console.log(`${name} is in full health!`);
                }
                break;
        }

        commandLine = input.shift();
    }

    // Print result
    for (const name in characters) {
        console.log(name);
        console.log(`  HP: ${characters[name].hp}`);
        console.log(`  Bullets: ${characters[name].bullets}`);
    }
}

solve(["2",
    "Gus 100 0",
    "Walt 100 6",
    "FireShot - Gus - Bandit",
    "TakeHit - Gus - 100 - Bandit",
    "Reload - Walt",
    "Ride Off Into Sunset"]);
