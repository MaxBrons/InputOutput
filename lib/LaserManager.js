class LaserManager {
    constructor() {
        this.entities = [];
        this.lasers = [];
    }
    initialize() {
        for (let i = 0; i < 100; i++) {
            this.lasers.push(new Laser("img/laser-blue-1.png", new Vector2D(100, 100), 3, new Vector2D(50, 50), "sound/sfx-laser1.ogg", null, false));
        }
    }

    update() {
        if (this.lasers.length > 0) {
            this.lasers.forEach((e) => {
                if (e.active)
                    e.draw(context);
            });
        }
    }

    addDrawablePositionObject(entity) {
        this.entities.push(entity);
    }

    spawnLaser(entity, source, rotated) {
        let ent = this.getEntity(entity);
        let laser = this.getLaser();
        if(laser && ent){
            laser.active = true;
            laser.rotated = rotated;
            laser.source = source;
            laser.position = new Vector2D(ent.position.x, ent.position.y - laser.image.height);
        }
    }

    getEntity(entity) {
        if (this.entities.length > 0) {
            let ent = this.entities.find((e)=>e==entity);
            return ent;
        }
    }

    getLaser() {
        if (this.lasers.length > 0) {
            let laser = this.lasers.find((e) => !e.active);
            return laser;
        }
    }
}

