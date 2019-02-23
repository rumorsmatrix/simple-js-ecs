class ECSManager {

    constructor()
    {
        this.entities = [];
        this.systems = [];
        this.next_entity_uid = 0;
        this.systems_paused = false;
    }


    createEntity(name)
    {
        let this_uid = this.next_entity_uid;
        this.entities[this_uid] = new Entity(this_uid, name);
        this.next_entity_uid++;
        return this_uid;
    }

    deleteEntity(entity_uid)
    {
        for (let index in this.systems) {
            if (this.systems.hasOwnProperty(index)) {
                this.systems[index].unsubscribe(entity_uid);
            }
        }
        this.entities.splice(entity_uid, 1);
        return true;
    }


    createComponent(name, data)
    {
        let new_component = { 'name': name };
        for (let property in data) {
            if (data.hasOwnProperty(property)) {
                new_component[property] = data[property];
            }
        }
        return new_component;
    }

    addComponentToEntity(component, entity_uid)
    {
        this.entities[entity_uid].components[component.name] = component;

        // subscribe this entity to any relevant systems
        let systems = this.getSystemsForEntityComponents(Object.keys(this.entities[entity_uid].components));
        for (let index in systems) {
            if (systems.hasOwnProperty(index)) {
                systems[index].subscribe(entity_uid);
            }
        }
        return true;
    }

    removeComponentFromEntity(component_name, entity_uid)
    {
        let systems = this.getSystemsForEntityComponents(Object.keys(this.entities[entity_uid].components));
        for (let index in systems) {
            if (systems.hasOwnProperty(index)) {
                systems[index].unsubscribe(entity_uid);
            }

        }
        delete this.entities[entity_uid].components[component_name];
        return true;
    }


    addSystem(system)
    {
        // note that adding a system does not retroactively add entity subscriptions!
        // (but I don't think you should be spawning new systems after initial setup, anyway)
        if (this.systems.includes(system) === false) {
           this.systems.push(system);
            return true;
        } else {
            return false;
        }
    }

    processSystems()
    {
        // call this method whenever you want all systems to be processed; note they are called in numerical order
        if (this.systems_paused === true) return false;

        for (let i = 0; i < this.systems.length; i++) {
                this.systems[i].process();
        }
        return true;
    }

    pauseSystems()
    {
        this.systems_paused = true;
        return true;
    }

    unpauseSystems()
    {
        this.systems_paused = false;
        return true;
    }


    getSystemsForEntityComponents(component_list) // component_list is an array of component names
    {
        let interested_systems = [];
        for (let index in this.systems) {
            if (this.systems.hasOwnProperty(index)) {
                if (this.arrayContainsAnotherArray(this.systems[index].operates_on, component_list)) {
                    interested_systems.push(this.systems[index]);
                }
            }
        }
        return interested_systems;
    }


    arrayContainsAnotherArray(needle, haystack)
    {
        for (let i = 0; i < needle.length; i++){
            if(haystack.indexOf(needle[i]) === -1)
                return false;
        }
        return true;
    }

}


ecs = new ECSManager();
