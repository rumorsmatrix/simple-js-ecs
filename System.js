class System {

    constructor(name = '', operates_on_list = [])
    {
        this.name = name;
        this.operates_on = operates_on_list;
        this.subscribed_to = [];
        this.paused = false;
    }

    subscribe(entity_uid)
    {
        // todo: in theory I could check the entity against the operates_on list for this system to make sure
        // it's an entity that this system can handle; the ECSManager *should* have done this already, though

        if (this.subscribed_to.includes(entity_uid) === false) {
            this.subscribed_to.push(entity_uid);
            return true;
        } else {
            return false;
        }
    }

    unsubscribe(entity_uid)
    {
        let index = this.subscribed_to.indexOf(entity_uid);
        if (index !== -1) {
            this.subscribed_to.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    process()
    {
        if (this.paused === true) return false;

        for (let index in this.subscribed_to) {
            this.processEntity(this.subscribed_to[index]);
        }
        return true;
    }

    processEntity(entity_uid)
    {
        // each system should implement this method itself
        console.log('processing entity UID: ' + entity_uid);
        return false;
    }

    pause()
    {
        this.paused = true;
        return true;
    }

    unpause()
    {
        this.paused = false;
        return true;
    }

}