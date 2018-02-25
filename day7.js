// singleton pattern
function Universe() {
  let instance;
  Universe = function() {
    return instance;
  };
  Universe.prototype = this;
  instance = new Universe();
  instance.constructor = Universe;
  instance.start_time = 0;
  instance.bang = 'bang!!';
  return instance;
};

//immediate
let Universe;
(function(){
  let instance;
  Universe = function Universe(){
    if (instance) {
      return instance;
    }
    instance = this;
    this.start_time = 0;
    this.bang = "big";
  };
}());

//Factory
function CarMaker() {};
CarMaker.prototype.drive = function() {
  return `VRoom, I have ${this.door} doors`;
};
CarMaker.factory = function (type) {
  let constr = type,
      newCar;
  //error if type not exist
  if (typeof CarMaker[constr] !== 'function') {
    throw {
      name: 'Error',
      message: `type ${constr} not exist`
    };
  }
  if (typeof CarMaker[constr].prototype.drive !== 'function') {
    CarMaker[constr].prototype = new CarMaker();
  }
  //create new instance
  newCar = new CarMaker[constr];
  return newCar;
};
CarMaker.Compact = function() {
  this.door = 2;
};
CarMaker.Convertible = function() {
  this.door = 4;
}
CarMaker.SUV = function() {
  this.door = 10;
}

let Compat1 = CarMaker.factory('Compact');
let conv = CarMaker.factory('Convertible');
let Suv = CarMaker.factory('SUV');


function Sales(price) {
  this.price = price || 100;
};
Sales.prototype.getPrice = function() {
  return this.price;
};
Sales.decorator = {};
Sales.decorator.fedtax = {
  getPrice: function() {
    let price = this.uber.getPrice();
    price += price * 5 / 100;
    return price;
  },
};
Sales.decorator.quebec = {
  getPrice: function() {
    let price = this.uber.getPrice();
    price += price * 7.5 / 100;
    return price;
  }
};
Sales.decorator.money = {
  getPrice: function() {
    return '$' + this.uber.getPrice().tofix(2);
  }
};
Sales.decorator.cdn = {
  getPrice: function() {
    return 'CDN$' + this.uber.getPrice().tofix(2);
  }
};
Sales.prototype.decorator = function (decorator) {
  let F = function(){},
      overrides = this.constructor.decorator[decorator],
      i, newobj;
      F.prototype = this;
      newobj = new F();
      newobj.uber = F.prototype;
      for (i in overrides) {
        if (overrides.hasOwnProperty(i)) {
          newobj[i] = oerrides[i];
        }
      }
      return newobj
};
function Sales(price) {
  this.price = price || 100;
  this.decorator_list = [];
};
Sales.decorator = {};
Sales.decorator.fedtax = {
  getPrice: function(price) {
    return price += price * 5 / 100;
  }
};
Sales.decorator.quebec = {
  getPrice: function(price) {
    return price += price * 7.5 / 100;
  }
};
Sales.decorator.money = {
  getPrice: function(price) {
    return '$' + price.toString.fixed(2);
  }
}
Sales.prototype.decorator = function(decorator) {
  this.decorator_list.push(decorator);
};
Sales.prototype.getPrice = function() {
  let price = this.price,
      i,
      max = this.decorator_list.length,
      name;
  for (i = 0; i < max; i++) {
    name = this.decorator_list[i];
    price = Sales.decorator[name].getPrice(price);
  }
  return price;
};

//data validation
let data = {
  firstName: 'Super',
  lastName: 'Man',
  age: 'unknown',
  username: 'o_0'
};

validator.config = {
  firstName: 'isNonEmpty',
  age: 'isNumber',
  username: 'isAlphaNum'
};
validator.validate(data);
if (validator.hasErrors()) {
  console.log('validation failed:' + validator.message.join("\n"));
}
validator.type.isNonEmpty = {
  validate: function(value) {
    return value !== '';
  },
  instruction: 'the value cannot be empty'
};
validator.type.isNumber = {
  validate: function(value) {
    return !isNaN(value);
  },
  instruction: 'the value must be number'
};
validator.type.isAlphaNum = {
  validate: function(value) {
    return !/[^0-9a-z]/i.test(value);
  },
  instruction: 'no special symbol'
};
let validator = {
  type: {},
  config: {},
  message: [],
  validate: function(data) {
    let i, msg,type,result_ok;
    this.message = [];
    for (i in data) {
      if (data.hasOwnProperty(i)) {
        type = this.config[i];
        checker = this.types[type];
        if (!type) {
          continue;// no need to validate
        }
        if (!checker) {
          throw {
            name: 'validation Error',
            message: 'no handle type exist for ' + type,
          };
        }
        result_ok = checker.validate(data[i]);
        if (!result_ok) {
          msg = `Invalid value for * ${i} * ${checker.instruction}`;
          this.message.push(msg);
        }
      }
    }
    return this.hasErrors();
  },
  hasErrors: function() {
    return this.message.length !== 0
  }
}

//facade method.provide an alternative interface 
let myEvent = {
  stop: function(e) {
    e.preventDefault();
    e.stopPropogation();
  },
}

//proxy pattern