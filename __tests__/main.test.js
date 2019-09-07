const ObjectInterface = require('../src/index');

test('Should create instance', async ()=>{
    function createInstance() {
        var model = {
            name: String    
        }
        return new ObjectInterface(model);
    }
    expect(createInstance).not.toThrow();
    expect(createInstance().constructor.name).toEqual('ObjectInterface');
})

test('Should not create instance', async ()=>{
    function createInstance() {
        return new ObjectInterface();
    }
    
    expect(createInstance).toThrow();
})

test('Should implement an object model', async ()=>{
    function createInstance() {
        var model = {
            name: String    
        }
        return new ObjectInterface(model).Implement({
            name: 'John Doe'
        });
    }
    expect(createInstance).not.toThrow();
    expect(createInstance().constructor.name).toEqual('Model');
})

test('Should implement an array model', async ()=>{
    function createInstance() {
        var model = [String,Number]
        return new ObjectInterface(model).Implement(["John Doe", 1000]);
    }
    expect(createInstance).not.toThrow();
    expect(createInstance().constructor.name).toEqual('Model');
})

test('Should fail implementing an invalid data', async ()=>{
    function createInstance() {
        var model = [String,String]
        return new ObjectInterface(model).Implement(["John Doe", 1000]);
    }
    expect(createInstance).toThrow();
})

test('Should implement an recursive array model', async ()=>{
    function createInstance() {
        var model = [String,Number,{"devices":Array}]
        return new ObjectInterface(model).Implement(["iOS", 1000, {"devices":["Modile","Laptop"]}]);
    }
    expect(createInstance).not.toThrow();
    expect(createInstance().constructor.name).toEqual('Model');
})

test('Should implement with simple data type', async ()=>{
    function createInstance() {
        return new ObjectInterface(String).Implement("This is a string");
    }
    expect(createInstance).not.toThrow();
    expect(createInstance().constructor.name).toEqual('Model');
})

test('Should fail with simple data type', async ()=>{
    function createInstance() {
        return new ObjectInterface(String).Implement(23.45);
    }
    expect(createInstance).toThrow();
})