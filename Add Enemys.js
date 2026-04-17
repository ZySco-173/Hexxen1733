async function spawnHiddenSmartFolder() {
    // --- KONFIGURATION ---
    const folderName = "Name des Ordners"; 
    const zoneName = "SpawnZone"; 
    // Name der Zeichenebene mit der Spawnzone (muss als Text-Drawing angelegt sein)
    // ---------------------

    const folder = game.folders.find(f => f.name === folderName && f.type === "Actor");
    if (!folder) return ui.notifications.error(`Ordner "${folderName}" wurde nicht gefunden!`);

    const actorsInFolder = folder.contents.sort((a, b) => a.name.localeCompare(b.name));
    if (actorsInFolder.length === 0) return ui.notifications.error(`Der Ordner "${folderName}" ist leer!`);

    const drawing = canvas.drawings.placeables.find(d => d.document.text === zoneName);
    if (!drawing) return ui.notifications.error(`Zone "${zoneName}" nicht gefunden!`);

    let actorOptions = actorsInFolder.map(a => `<option value="${a.id}">${a.name} [${a.type === 'npcLeader' ? 'BOSS' : 'MOB'}]</option>`).join("");

    new Dialog({
        title: `Hidden Spawner: ${folderName}`,
        content: `
            <form style="padding: 5px;">
                <div class="form-group" style="margin-bottom: 10px;">
                    <label>Gegner wählen:</label>
                    <select id="actorId" style="width: 100%;">${actorOptions}</select>
                </div>
                <div class="form-group" style="display: flex; gap: 10px; margin-bottom: 10px;">
                    <label>Anzahl Gegner:</label>
                    <input type="number" id="nEnemies" value="5" style="width: 60px;">
                </div>
                <div class="form-group" style="display: flex; gap: 10px;">
                    <label>Anzahl Spieler:</label>
                    <input type="number" id="nPlayers" value="4" style="width: 60px;">
                </div>
                <p style="font-size: 0.8em; color: #d63031; margin-top: 10px; text-align: center;">
                    <i class="fas fa-eye-slash"></i> <b>Gegner erscheinen unsichtbar</b>
                </p>
                <hr>
            </form>`,
        buttons: {
            spawn: {
                icon: '<i class="fas fa-ghost"></i>',
                label: "Unsichtbar beschwören",
                callback: async (html) => {
                    const selectedId = html.find('#actorId').val();
                    const count = parseInt(html.find('#nEnemies').val());
                    const players = parseInt(html.find('#nPlayers').val());
                    
                    const selectedActor = game.actors.get(selectedId);
                    const isBoss = selectedActor.type === "npcLeader";
                    
                    await executeHiddenSpawn(selectedActor, drawing, count, players, isBoss);
                }
            }
        },
        default: "spawn"
    }).render(true);
}

async function executeHiddenSpawn(actor, drawing, count, players, isBoss) {
    const { x, y } = drawing.document;
    const { width, height } = drawing.document.shape;
    const tokensToCreate = [];

    const baseHP = actor.system.health?.max || 15;
    const hpBonus = isBoss ? (baseHP * players - baseHP) : 0;

    for (let i = 0; i < count; i++) {
        const rX = x + Math.random() * (width - canvas.grid.size);
        const rY = y + Math.random() * (height - canvas.grid.size);
        const pos = canvas.grid.getSnappedPosition(rX, rY);

        const tokenDoc = await actor.getTokenDocument({
            x: pos.x, 
            y: pos.y, 
            hidden: true, // Hier wird die Unsichtbarkeit erzwungen
            actorLink: false,
            disposition: CONST.TOKEN_DISPOSITIONS.HOSTILE
        });
        tokensToCreate.push(tokenDoc.toObject());
    }

    const createdTokens = await canvas.scene.createEmbeddedDocuments("Token", tokensToCreate);

    // HP-Korrektur (maxMod) für Bosse
    if (isBoss && hpBonus > 0) {
        setTimeout(async () => {
            for (let tDoc of createdTokens) {
                const token = canvas.tokens.get(tDoc.id);
                if (token) {
                    await token.actor.update({ 
                        "system.health.maxMod": hpBonus 
                    });
                    const newMax = token.actor.system.health.max;
                    await token.actor.update({ "system.health.value": newMax });
                }
            }
        }, 300);
    }

    ui.notifications.info(`${count}x ${actor.name} unsichtbar platziert.`);
}

spawnHiddenSmartFolder();