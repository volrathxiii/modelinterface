
function isIterable(obj) {
    // if (obj === null || obj === undefined) return false;
    const isArray = function (a) {
        return Array.isArray(a);
    };
    
    const isObject = function (o) {
        return o === Object(o) && !isArray(o) && typeof o !== 'function';
    };
    return isArray(obj) || isObject(obj);
}

function IteratableValidate(model,data) {
    var keys = Object.keys(model);
    var result = true;
    keys.forEach((key)=>{
        if(isIterable(model[key])) {
            IteratableValidate(model[key], data[key]);
        } else {
            if(data[key].constructor !== model[key]) {
                result = false;
            }
        }
    });

    return result;
}

function Validate(model, data) {
    if(isIterable(model)) {
        return IteratableValidate(model, data);
    }else{
        if(data.constructor === model) {
            return true;
        }
    }
}

class Model {
    constructor(object) {
        Object.assign(this, object);
    }
}

class ModelInterface 
{
    constructor(object) {
        if(typeof object === 'undefined' || typeof object == 'null') throw('CreateModel failed');
        this.object = object;
    }

    Implement(data) {
        if(!Validate(this.object, data)) throw(`Invalid data: ${data}`);
        return new Model(data);
    }
}

module.exports = ModelInterface