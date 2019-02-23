# simple-js-ecs
A dead simple example Entity-Component-System in JS, with a Manager class.

```
// create a new System (for wagging tails on Entities that have the Animal and Tail components)
ecs.addSystem(
    new System('tail-wagger', ['animal', 'tail']);
);

// make a new Entity, a dog
let dog = ecs.createEntity('dog');

// add components to the dog
ecs.addComponentToEntity(
    game.createComponent('animal', { 'type': 'doggo', 'good_boy': 'the best' }),
    dog
);

ecs.addComponentToEntity(
    game.createComponent('tail', { 'length': 'medium', 'color': 'brown', 'bushy': 'you bet' }),
    dog
);

// the tail-wagger system will now be "subscribed" to this dog Entity, as it has all the components needed
console.log(ecs.systems[0].subscribed_to);

// get the ECS manager to process all systems, which will in turn have the tail-wagger System call process() 
// on the dog entity (implementation left as an exercise for the reader)

ecs.process();

// other things you might like to do:
ecs.deleteEntity(entity_uid);
ecs.removeComponentFromEntity(component_name, entity_uid);
ecs.pause_systems();
ecs.unpause_systems();
system.pause();
system.unpause();
```
